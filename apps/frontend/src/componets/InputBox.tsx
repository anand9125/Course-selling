
export const Input =({label,placeholder,onChange,type}:{label:string,placeholder:string,onChange:(e:any)=>void,type?:"text"|"password"})=>{
    return <div>
       <div className="text-sm pb-2 pt-2">
          *<label htmlFor="">{label}</label>
       </div>
        <input className="  border rounded px-3 py-2 min-w-full border-black" type={type} placeholder={placeholder} onChange={onChange} />
    </div>
}