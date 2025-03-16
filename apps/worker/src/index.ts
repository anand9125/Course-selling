import { Worker } from "bullmq"; // Imports the Worker class from BullMQ
import { prismaClient } from "@repo/db/src";
import { Resend } from "resend";

console.log("🚀 Starting payment worker...");

const resend = new Resend("re_TdcBvneT_5DbUwu19BWBNR3MJ6CEUxB7o"); // Resend API key

const worker = new Worker(
  "paymentQueue",
  async (job) => {
    console.log(`🔄 Processing job ID: ${job.id}`);
    console.log("📦 Job Data:", job.data);

      try {
        const purchaseData = await prismaClient.purchase.findUnique({
          where: {
            merchantOrderId: job.data,
          },
          include: {    //courses refers to entries in the PurchaseCourse table 
            courses: {  
              include: {
                course: true,     // fetch actual course details.
              },
            },
            user: true,  
          },
        });
      
        if (!purchaseData) {
          console.error(`❌ No purchase found for order ID: ${job.data}`);
          return;
        }
      
        const purchasedCourseIds = purchaseData.courses.map((c) => c.course.courseId);
        console.log("📚 Purchased Course IDs:", purchasedCourseIds);
        const isCourseLinkMissing = purchaseData.courses  //If at least one course has a missing CourseLink, .some() returns true, making isCourseLinkMissing true.
        .some((c) => !c.course.CourseLink); //This checks if at least one CourseLink is missing.
      
        if (isCourseLinkMissing) {
          console.log("⚠️ Course link missing, notifying admin and user...");
      
          await resend.emails.send({
            from: "anand.chaudhary@coursehubb.store",
            replyTo: "coursehubb.store@gmail.com",
            to: "akdon9936@gmail.com",
            subject: "⚠️ Course Link Missing",
            text: `Dear Admin,\n\nThe course links for the following Course IDs are missing:\n\n${purchasedCourseIds.join(", ")}\n\nPlease update the database and send the link to: ${purchaseData.user.email}.\n\nThank you.`,
          });
      
          await resend.emails.send({
            from: "anand.chaudhary@coursehubb.store",
            replyTo: "coursehubb.store@gmail.com",
            to: purchaseData.user.email,
            subject: "✅ Payment Received - Course Link Pending",
            text: `Dear ${purchaseData.user.name},\n\nWe have received your payment successfully. Your course links will be provided within 30 minutes.\n\nFor any queries, please contact us at coursehubb.store@gmail.com.\n\nBest regards,\nCourseHubb Team`,
          });
        } else {
          console.log("✅ Course link available, sending confirmation email...");
      
          const courseLinks = purchaseData.courses
            .map((c) => `${c.course.title}: ${c.course.CourseLink}`)
            .join("\n");
      
          await resend.emails.send({
            from: "anand.chaudhary@coursehubb.store",
            replyTo: "coursehubb.store@gmail.com",
            to: purchaseData.user.email,
            subject: "🎉 Course Access Granted",
            text: `Dear ${purchaseData.user.name},\n\nCongratulations! Your payment has been received, and you can now access your courses.\n\n${courseLinks}\n\nEnjoy your learning!\n\nBest regards,\nCourseHubb Team`,
          });
        }
      
       
        if (purchaseData.user.referredById) {
          console.log(`🏆 Processing referral reward for user ID: ${purchaseData.user.referredById}`);
      
          const referredUser = await prismaClient.user.findUnique({
            where: { id: purchaseData.user.referredById },
          });
      
          if (referredUser) {
            await prismaClient.user.update({
              where: { id: referredUser.id },
              data: { walletBalance: { increment: 30 } },
            });
            console.log(referredUser.email)
            await resend.emails.send({
              from: "anand.chaudhary@coursehubb.store",
              replyTo: "coursehubb.store@gmail.com",
              to: referredUser.email,
              subject: "🎉 Referral Reward Earned!",
              text: `Dear ${referredUser.name},\n\nYou have earned a ₹30 reward for referring ${purchaseData.user.name}!\n\nYour reward has been credited to your wallet. Claim the money or apply it towards your next course.\n\nClick here to explore more: https://coursehubb.store\n\nBest regards,\nCourseHubb Team`,
            });
          }
        }
      } catch (error: any) {
        console.error("❌ Error processing job:", error);
      
        await resend.emails.send({
          from: "anand.chaudhary@coursehubb.store",
          replyTo: "coursehubb.store@gmail.com",
          to: "akdon9936@gmail.com",
          subject: "🚨 Error While Processing Payment",
          text: `An error occurred while processing a payment job.\n\nError Details: ${error.message}\n\nPlease check the system logs for more information.`,
        });
      }
      
      console.log(`✅ Job ${job.id} processed successfully.`);
      
   },
  {
    connection: {
      host: "172.31.34.237",   // # Use the EC2 private IP
      port: 6379,
    },
  }
);




worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed successfully`);
});
//This event triggers when a job is successfully processed
worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});

worker.on("error", (err) => {
  console.error("Worker error:", err);
});

// Keep the worker process running
process.on('SIGTERM', async () => {
  await worker.close();
});

console.log('Worker is running and waiting for jobs...');



