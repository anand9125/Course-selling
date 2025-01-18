import { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './Skelton/MessageSkeleton'
import { useChatStore } from '../store/useChatStore'
import { useRecoilValue } from 'recoil'
import { dataAtom } from '../Recoil/dataAtom'
import { formatMessageTime } from '../lib/formatMessage'
import { useRef } from 'react'
function ChatContainer() {
    
    const{message,getMessage,isMessageLoading,selectedUser, 
      subscribeTomessages,unsubscribeTomessages
    } = useChatStore()

    const userData = useRecoilValue(dataAtom)
    const profilePic = localStorage.getItem('profilePic')
     
    const messageEndRef = useRef<HTMLDivElement  | null>(null);
//a useeffect whenever got new message scroll qucikly
  //  useRef is a React hook that allows you to persist a reference to a DOM element or a mutable value across 
  // //renders without causing re-renders when the reference or value changes. if refrence change its will also changes dosenot matter do you have done rerender or not
      
    useEffect(()=>{  
      if(messageEndRef.current && message){
      messageEndRef.current?.scrollIntoView({ behavior:'smooth' }) //messageRef the element you want to scroll to
     }},[message])


    useEffect(()=>{
      getMessage(selectedUser.id)

      subscribeTomessages();

      return()=>unsubscribeTomessages();

    },[selectedUser,subscribeTomessages,unsubscribeTomessages])

    if(isMessageLoading){
        return<div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    }
    // useEffect(() => {
    //   const fetchMessages = async () => {
    //     console.log("dsfsdfsdfsdfsdf")
    //     try {
    //       const res = await axios.get(`${backendUrl}/messages/${selectedUser.id}`);
    //    console.log(res,"dfgdfgdsfgdfgdsfgdddgddfgdf")
    //       set({message:res.data});
    //       set({ message: res.data });
    //     } catch (error) {
    //       toast.error("Failed to fetch messages");
    //     }
    //   };
    //   if (selectedUser) {
    //     fetchMessages();
    //   }
    // }, [selectedUser]);
   
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader></ChatHeader>
        <div className='flex-1 overflow-auto p-4 space-y-4'>
          {message.map((msg) => (
          <div
            key={msg.id}
            className={`chat ${msg.senderId === userData.id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              {/* Render avatar based on whether the message sender is the current user or selectedUser */}
              <div className="size-10 rounded-full border">
                <img
                  src={
                    msg.senderId === userData.id
                      ? profilePic||userData.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="Profile Pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-45 ml-1">
                {/* Format and display the time */}
                { formatMessageTime(msg.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {msg.image && (
                <img
                  src={msg.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {msg.text && <p>{msg.text}</p>}
            </div>
          </div>
        ))}
        </div>
      <MessageInput ></MessageInput>

    </div>
  )
}

export default ChatContainer