import { MdCurrencyRupee } from "react-icons/md";

const AlertBanner = () => {
    return (
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-lg font-semibold py-2 px-6 text-center shadow-xl flex justify-center items-center gap-3">
      <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-xl font-semibold py-4 px-8 text-center shadow-md rounded-sm flex items-center justify-center gap-2">
  🚨 <span>Create profile and get 20</span>  
        <MdCurrencyRupee className="text-2xl" />  
        <span>instant reward!</span> 🚀
      </div>
    </div>
    
    );
  };
  
  export default AlertBanner;
  