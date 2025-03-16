import { Queue } from "bullmq";
export const paymentQueue = new Queue("paymentQueue", {  //Creates a new BullMQ queue named "paymentQueue
    connection: {
    host: "172.31.34.237 172.17.0.1",//localhost
    port: 6379   //
    }
});


//initializes a BullMQ queue named "paymentQueue" and connects it to a Redis instance running on localhost:6379