import { Queue } from "bullmq";
export const paymentQueue = new Queue("paymentQueue", {  
    connection: {
        host: "190.152.145.92",  // Choose the correct Redis server IP
        port: 28069  
    }
});
paymentQueue.client.then(client => {
    client.ping()
        .then(() => console.log("✅ Connected to Redis!"))
        .catch(err => console.error("❌ Redis Connection Failed:", err));
}).catch(err => {
    console.error("❌ Failed to initialize Redis client:", err);
});

//initializes a BullMQ queue named "paymentQueue" and connects it to a Redis instance running on localhost:

