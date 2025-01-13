import { backendUrl } from "../lib/backendUrl"

//we will store some  messages and user
import {create} from "zustand" //Zustand state management library used to create a store for managing the application's state.
import toast from "react-hot-toast"
import axios from "axios"
interface MessageData {
    id: string;
    senderId: string;
    receiverId: string;
    text?: string;
    image?: string;
    createdAt: Date;
  }
interface User {
    id: string;
    username:string;
    fullName:string;
    profilePic: string;
    createdAt: string;
    sentMessage:Array<MessageData>;
   receivedMessages:Array<MessageData>
}

interface ChatStore{
    message:MessageData[];
    users:Array<User>,
    selectedUser :any,
    isUserLoading :boolean,
    isMessageLoading :boolean,
    getUser:()=>void,
    getMessage:(userId:string)=>void
    sendMessage:(messageData:any)=>void,
    setSelectedUser:(selectedUser:any)=>void ,//it is a function that return void
    set:(state:any)=>void
}

const token =localStorage.getItem('jwt') 
console.log(backendUrl +"hii")
// The create function initializes the store, and set is a function used to update the store's state. state is our case mesg ,user ,selectedUser....
//Here we will use zustand to manage our state
export const useChatStore = create<ChatStore>((set,get)=>({ // This defines a Zustand store that can be used across your React application.
    message:[], //empty array where the messages will be stored 
    users:[], //empty array where the users will be stored. it's empty, but once the users are fetched, they will be stored here
    selectedUser :null, // set to null, this state holds the currently selected user
    isUserLoading :false, //loading state to indicate whether the user data is currently being fetched
    isMessageLoading :false,
//all the above are state
    getUser:async()=>{//getUser function
        set({isUserLoading:true}); // Updates isUserLoading to true before the fetch to indicate that the data is loading.
        try{
           
            const response = await axios.get(`${backendUrl}/users`, {
                headers: {
                  'Authorization':token // Include the JWT token in the Authorization header
                }});
            console.log(response,"hii")
            set({users:response.data});
           
        
        }
        catch(err){
            toast.error("Failed to get users")
        }finally{
            set({isUserLoading:false});  //reset isUserLoading to false, indicating the fetch is complete.
        } 
    },
    getMessage:async(userId:string)=>{
     set({isUserLoading:true});
     try{
        const res = await axios.get(`${backendUrl}/messages/${userId}`, {
            headers: {
              'Authorization':token // Include the JWT token in the Authorization header
            }})
            set({ message: Array.isArray(res.data) ? res.data : [res.data] });

            console.log(res.data,"I am message");
     }catch(err){
        toast.error("Failed to get messages")
     }finally{
        set({isUserLoading:false});
     }
    },
    sendMessage: async(messageData)=>{
        const{selectedUser,message}=get();
        try{
            const res = await axios.post(`${backendUrl}/send/${selectedUser.id}`, messageData, {
                headers: {
                  'Authorization':token
                }
            });

            
            set({message:[...message,res.data]});
        }catch (error){
            toast.error("Failed to send message")
        }

    },
    //todo :optimized this one later
    setSelectedUser:(selectedUser:any)=>set({
        selectedUser
    }),//setSelectedUser is a function that will update the selectedUser state with the help of set
    set:(state:any)=>set(state) //making a set function so that we can update any state
}))