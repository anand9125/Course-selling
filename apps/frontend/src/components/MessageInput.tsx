import { Image, Send, X } from "lucide-react";

import { useState } from 'react'
import { useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import toast from "react-hot-toast";
function MessageInput() {
    const [text,setText]=useState("")
    const[imagePreview,setImagePreview] = useState<string | null>(null)
    const{sendMessage}=useChatStore()

    const handleImageChange=(e: React.ChangeEvent<HTMLInputElement>)=>{

        try{
          const file = e.target.files?.[0]; //is a property of the ChangeEvent
          if (!file) {
             toast.error("No image selected")
             return;
          }
          if (!file.type.startsWith('image/')) {
            console.error("Please select an image file");
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
        catch(error){
          toast.error("Error while image uploading");
        }
       
    
    }
    const removeImage=()=>{
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value = ""
    }

    const handleSendMessage=async(e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault(); // prevent the default behavior so that it doesn't refresh the page
      if(!text.trim() && !imagePreview) return;
     
      try{
        await sendMessage({
          text:text.trim(),
          image: imagePreview,
        })
        //clear the form
        setText("")
        setImagePreview(null)
        if(fileInputRef.current) fileInputRef.current.value =""
      }
      catch(error){
        toast.error("Error while sending message");
      }
    }
    const fileInputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="p-4 w-full">
    {imagePreview && (
      <div className="mb-3 flex items-center gap-2">
        <div className="relative">
          <img
            src={imagePreview}
            alt="Preview"
            className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
          />
          <button
            onClick={removeImage}
            className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
            flex items-center justify-center"
            type="button"
          >
            <X className="size-3" />
          </button>
        </div>
      </div>
    )}

    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
      <div className="flex-1 flex gap-2">
        <input
          type="text"
          className="w-full input input-bordered rounded-lg input-sm sm:input-md"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef} 
        //   allows you to reference this element in your component, so you can programmatically trigger its behavior.

          onChange={handleImageChange}
        />
          {/* this input should be hidden becuase its looks ugly 
          but oncle be click the button behind clinking button we are calling this input which is hidden */}
        <button
          type="button"
          className={`hidden sm:flex btn btn-circle
                   ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Image size={20} />
        </button>
      {/* //  button that, when clicked, will trigger the file input to open the file picker. */}
      {/* When the button is clicked, it calls fileInputRef.current?.click(), which triggers the file input's click method, effectively opening the file selection */}

      </div>
      <button
        type="submit"
        className="btn btn-sm btn-circle"
        disabled={!text.trim() && !imagePreview}
      >
        <Send size={22} />
      </button>
    </form>
  </div>
  )
}

export default MessageInput