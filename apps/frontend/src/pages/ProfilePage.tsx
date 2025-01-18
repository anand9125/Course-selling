import { useState } from "react";

import { Camera, Mail, User } from "lucide-react";
import {  useRecoilValue, useSetRecoilState } from "recoil";
import { dataAtom, uploadPicAtom } from "../Recoil/dataAtom";
import axios from "axios";
import { backendUrl } from "../lib/backendUrl";
import toast from "react-hot-toast";
const token =localStorage.getItem('jwt') 
const ProfilePage = () => {
   const userData = useRecoilValue(dataAtom)
  const setProfilePic = useSetRecoilState(uploadPicAtom)
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  

   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]; //is a property of the ChangeEvent
      if (!file) {
       toast.error("No images selected");
        return;
      }
  
      // Validate file type
      if (!file.type.startsWith('image/')) {
        console.error("Please select an image file");
        return;
      }
  
      // Create FormData once
      const formData = new FormData(); //FormData is a web API that provides a way to construct a set of key/value pairs representing form fields and their values.
      formData.append("profilePic", file);//append(key, value) method adds a new field to the FormData object. The key is the name of the form field, and value can be a file, blob, or string.
  
      // Show preview of the image
      const reader = new FileReader(); // JavaScript API  allows you to asynchronously read the contents of files
      reader.onload = (event) => {   //onload event handler is triggered when the file reading operation is successfully completed.
        const base64Image = event.target?.result;  //event object contains information about the file read operation,event.target refers to the FileReader instance
        if (typeof base64Image === "string") { //result is a property of the FileReader instance that holds the content of the file once it has been read.
          setSelectedImg(base64Image);
          
        }
      };
      reader.readAsDataURL(file); //readAsDataURL(file) method reads the content of the file and  // Convert the file to a base64 string
      // {
      //   headers: {
      //     'Authorization':token // Include the JWT token in the Authorization header
      //   }}  
      // Upload the image
      const response=  await axios.put(
        `${backendUrl}/update-profile`,
        formData,
        {
          withCredentials: true,
          headers: { 
            'Authorization':token 
          }
        }
      )
      
     console.log(response.data.updatedUser.profilePic)
     localStorage.setItem("profilePic",response.data.updatedUser.profilePic)
     setProfilePic(response.data.updatedUser.profilePic)
    //   if (response.data.profilePic) {
    //    (response.data.profilePic);
    //     console.log(setProfilePic)
        
    //     // You might want to show a success message to the user
    //   }
      console.log("hii i am authenticated")
  
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Upload failed:", error.response?.data?.message || "Network error");
        // You might want to show an error message to the user
      } else {
        console.error("Upload failed:", error);
      }
    }
  };
   
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
   
                src={selectedImg||localStorage.getItem("profilePic")|| "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              { "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{userData.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{userData.username}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{userData.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;