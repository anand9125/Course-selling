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
            from: "ultimatcourses@coursehubb.store",
            replyTo: "coursehubb.store@gmail.com",
            to: "coursehubb.store@gmail.com",
            subject: "⚠️ Course Link Missing",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #d9534f;">⚠️ Course Link Missing</h2>
                <p>Dear Admin,</p>
                <p>The course links for the following Course IDs are missing:</p>
                <p><strong>${purchasedCourseIds.join(", ")}</strong></p>
                <p>Please update the database and send the link to: <strong>${purchaseData.user.email}</strong>.</p>
                <p>Thank you.</p>
              </div>`
          });
      
          await resend.emails.send({
            from: "ultimatcourses@coursehubb.store",
            replyTo: "coursehubb.store@gmail.com",
            to: purchaseData.user.email,
            subject: "✅ Payment Received - Course Link Pending",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #007bff;">✅ Payment Received</h2>
                <p>Dear ${purchaseData.user.name},</p>
                <p>We have received your payment successfully. Your course links will be provided within 30 minutes.</p>
                <p>For any queries, please contact us at <a href="mailto:coursehubb.store@gmail.com">coursehubb.store@gmail.com</a>.</p>
                <p>Best regards,<br><strong>CourseHubb Team</strong></p>
              </div>`
          });
          
        } else {
          console.log("✅ Course link available, sending confirmation email...");
      
          const courseLinks = purchaseData.courses
            .map((c) => `${c.course.title}: ${c.course.CourseLink}`)
            .join("\n");
      
          
          await resend.emails.send({
            from: "ultimatcourses@coursehubb.store",
            replyTo: "coursehubb.store@gmail.com",
            to: purchaseData.user.email,
            subject: "🎉 Course Access Granted",
            html: `
              <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #28a745;">🎉 Course Access Granted</h2>
                <p>Dear ${purchaseData.user.name},</p>
                <p>Congratulations! Your payment has been received, and you can now access your courses.</p>
                ${courseLinks}
                <p>Enjoy your learning!</p>
                <p>Best regards,<br><strong>CourseHubb Team</strong></p>
              </div>`
          });;
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
              from: "ultimatcourses@coursehubb.store",
              replyTo: "coursehubb.store@gmail.com",
              to: referredUser.email,
              subject: "🎉 Referral Reward Earned!",
              html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                  <h2 style="color: #ffc107;">🎉 Referral Reward Earned!</h2>
                  <p>Dear ${referredUser.name},</p>
                  <p>You have earned a ₹30 reward for referring ${purchaseData.user.name}!</p>
                  <p>Your reward has been credited to your wallet. Claim the money or apply it towards your next course.</p>
                  <p><a href="https://coursehubb.store" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Explore More</a></p>
                  <p>Best regards,<br><strong>CourseHubb Team</strong></p>
                </div>`
            });
        }
      }} catch (error: any) {
        console.error("❌ Error processing job:", error);
      
        
        await resend.emails.send({
          from: "ultimatcourses@coursehubb.store",
          replyTo: "coursehubb.store@gmail.com",
          to: "coursehubb.store@gmail.com",
          subject: "🚨 Error While Processing Payment",
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #d9534f;">🚨 Error While Processing Payment</h2>
              <p>An error occurred while processing a payment job.</p>
              <p><strong>Error Details:</strong> ${error.message}</p>
              <p>Please check the system logs for more information.</p>
            </div>`
        });
      }
      
      console.log(`✅ Job ${job.id} processed successfully.`);
      
   },
  {
    connection: {
      host: "172.31.34.237",  // Choose the correct Redis server IP
      port: 6379  
  }
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



