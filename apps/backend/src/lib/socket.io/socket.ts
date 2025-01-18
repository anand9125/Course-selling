import { Server } from "socket.io";  // To create a new Socket.IO instance
import http from "http";
import express from "express";  // Correct spelling of 'express'

const app = express();

const server = http.createServer(app);  // Creating an HTTP server that integrates with the Express application

const io = new Server(server, { //create a new instance of a Socket.IO server and attaches it to an existing HTTP server 
  cors: {
    origin: "http://localhost:5173",  // Replace with your client’s URL
    credentials: true  // If you need to send cookies
  }
});
   export function getReciverSocketId(userId:string){
    return userSocketMap[userId]
   }
   //implementing somthing called onLine user so that as soon as somoneone come to online everone knows
   //use to store onLine user
   const userSocketMap: { [key: string]: string } = {};//here we will store the onLine user since this is object we will store like  this {userId:socketId}
   const userId: string[] = ["user1", "user2"];
   io.on('connection', (socket) => {  // Correct event name is 'connection'
     console.log(`${socket.id} - A user connected`);  // Log when a user connects
   
     const userId: string = socket.handshake.query.userId as string //handshake is the process during which the client establishes a connection to the server. It contains metadata about the connection, 
    // including information such as the query parameters that were sent by the client when it connected.
     console.log(userId,"i am userId")
     if(userId ){ 
         userSocketMap[userId] = socket.id; //store user IDs as keys and their corresponding socket.id as values.in the obejct
        //so that we map over the userId and socket.id for which user is online which is not
    }
    console.log(Object.keys(userSocketMap),"hii i am ")
    //io.emit ()This method broadcasts an event to all connected clients.
    io.emit("getOnlineUser",Object.keys(userSocketMap) ); //getOnlineUser": This is the name of the event being emitted All connected clients that listen for this event ("getOnlineUser") will receive the data sent with it.
    //This means that all clients will be notified with the event "getOnlineUser" Object.keys: This method returns an array of the keys from the userSocketMap object.
    
  socket.on('disconnect', () => {
    console.log(`${socket.id} - A user disconnected`);  // Log when a user disconnects
    delete userSocketMap[userId];
    io.emit("getOnlineUser",Object.keys(userSocketMap) ); //getOnlineUser": This is the name of the event being emitted All connected clients that listen for this event ("getOnlineUser") will receive the data sent with it.
  });
});

export { io, server, app };
