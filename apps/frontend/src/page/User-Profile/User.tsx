import { Input } from '../../componets/InputBox'
import React, { useState } from 'react'

function User() {
    const[name,setName]=useState("")
    const[email,setEmail]=useState("")
    const[collageName,setCollageName]=useState("")
    const[branch,setBranch]=useState("")
    const[year,setYear]=useState("")

    const handleSubmit=(e:any)=>{
        e.preventDefault()
        console.log(name,email,collageName,branch,year)
    }
  return (
    <div className="pt-6 ">
     <div className="max-w-6xl mx-auto pl-5 pr-5  bg-gray-100  rounded-md">
        <div className=' lg:flex justify-center lg:space-x-3 '>
            <div className="w-full">
            <Input placeholder={"Username"} label={"Name"} onChange={(e)=>{setName(e.target.value)}} type={"text"}></Input>
            </div>
            <div className="w-full">
            <Input placeholder={"Email"} label={"Email"} onChange={(e)=>{setEmail(e.target.value)}} type={"text"}></Input>
            </div>
        </div>
        <div>
            <div className="w-full">
               <Input placeholder={"Collage Name"} label={"Collage Name"} onChange={(e)=>{setCollageName(e.target.value)}} type={"text"}></Input>
            </div>
            <div>
                <div className="w-full">
                <Input placeholder={"Branch"} label={"Branch"} onChange={(e)=>{setBranch(e.target.value)}} type={"text"}></Input>
                </div>
                <div className="w-full">
                <Input placeholder={"Year"} label={"Year"} onChange={(e)=>{setYear(e.target.value)}} type={"text"}></Input>
                </div>
            </div>
        </div>
        <div>
            <div className='flex justify-center items-center pt-7 pb-5'>
                <button
                 className="bg-indigo-600 text-white px-6 py-3 rounded-lg transform hover:scale-105 hover:opacity-90 hover:shadow-xl transition-all duration-300 ease-in-out"
                 onClick={(e)=>handleSubmit(e)}>
                    Submit Details
                </button>
            </div>
        </div>
     </div>
  </div>

  )
}

export default User

// label,placeholder,onChange,type