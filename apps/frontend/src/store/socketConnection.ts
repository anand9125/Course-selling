import { io, Socket } from "socket.io-client";
import { socketUrl } from "../lib/backendUrl";
interface JwtPayload {
    userId: string;  // Assuming userId is a string in the decoded token
    iat: number;     // Issued at timestamp (optional)
    exp: number;     // Expiration timestamp (optional)
  }
import { jwtDecode } from "jwt-decode";
const token = localStorage.getItem('jwt');
let userIdData:string|null=null;
if (token) {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      userIdData = decodedToken.userId; 
      console.log(userIdData ,"I am userid"); // Contains the userId of the user
      console.log(decodedToken ,"i am token")
      console.log(decodedToken); // Contains the payload of the JWT
    } catch (error) {
      console.error('Invalid token', error);
    }
  }
  console.log(userIdData ,"I am userid")



const socket: Socket = io(socketUrl, { 
    query: {
      userId: userIdData
    },
    autoConnect: false
  });
  
  setTimeout(() => {
        if (socket.connected) {
          console.log("WebSocket is connected");
        } else {
          console.log("WebSocket is not connected");
        }
      
  }, 1000); 

  if(localStorage.getItem("jwt")){
  socket.connect();
  }
    
  
  // Log when connected
   socket.on("connect", () => {
   console.log("hey buddy i am connected");
  });
   
 

  socket.on("disconnect", () => {
    console.log("Disconnected from WebSocket server");
  });



export default socket;
