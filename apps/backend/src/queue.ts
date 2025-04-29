import { Queue } from "bullmq";
export const paymentQueue = new Queue("paymentQueue", {  
        connection: {
            host: "172.31.28.161",  // Your Redis server IP
            port: 6379,             // Default Redis port
        }
});
paymentQueue.client.then(client => {
    client.ping()
        .then(() => console.log("✅ Connected to Redis!"))
        .catch(err => console.error("❌ Redis Connection Failed:", err));
}).catch(err => {
    console.error("❌ Failed to initialize Redis client:", err);
});

