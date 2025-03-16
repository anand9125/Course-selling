import { Queue } from "bullmq";
export const paymentQueue = new Queue("paymentQueue", {  
    connection: {
        host: "172.31.34.237",  // Choose the correct Redis server IP
        port: 6379  
    }
});
paymentQueue.client.then(client => {
    client.ping()
        .then(() => console.log("✅ Connected to Redis!"))
        .catch(err => console.error("❌ Redis Connection Failed:", err));
}).catch(err => {
    console.error("❌ Failed to initialize Redis client:", err);
});

//initializes a BullMQ queue named "paymentQueue" and connects it to a Redis instance running on localhost:6379