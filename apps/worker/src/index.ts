import { Worker } from "bullmq";  //imports the Worker class from BullMQ, which is responsible for processing queued jobs.

console.log('Starting payment worker...');

const worker = new Worker(  //BullMQ worker that listens to the "paymentQueue" queue 
  "paymentQueue",
  async (job) => {
    console.log(`Processing job ID: ${job.id}`);
    console.log("Job Data:", job.data);
    
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    console.log(`✅ Job ${job.id} processed successfully.`);
  },
  {
    connection: {  //Connection to Redis which running on 6379
      host: "localhost",
      port: 6379
    }
  }
);

// Error handling
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