
import { useEffect } from 'react'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import MessageSkeleton from './Skelton/MessageSkeleton'
import { useChatStore } from '../store/useChatStore'
import { useRecoilValue } from 'recoil'
import { dataAtom, uploadPicAtom } from '../Recoil/dataAtom'
import { formatMessageTime } from '../lib/formatMessage'

function ChatContainer() {
    
    const{message,getMessage,isMessageLoading,selectedUser,set} = useChatStore()
    const userData = useRecoilValue(dataAtom)
    const profilePic = localStorage.getItem('profilePic')
    
    
    useEffect(()=>{
      getMessage(selectedUser.id)
    },[selectedUser])

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