import { Queue } from "bullmq";
export const paymentQueue = new Queue("paymentQueue", {  //Creates a new BullMQ queue named "paymentQueue
    connection: {
    host: "localhost",
    port: 6379   //
    }
});


//initializes a BullMQ queue named "paymentQueue" and connects it to a Redis instance running on localhost:6379