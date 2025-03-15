import { IoWallet } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast"; 
import { useUserStore } from "../store/useUserStore";

const Banner = () => {
  const navigate = useNavigate();
  const{walletBalance}=useUserStore()
 
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  let amiAdmin = "STUDENT"
  if(userData["role"] === "ADMIN"){
    amiAdmin = "ADMIN";
  }

  const handleOnClick = (e: string) => {
    if (e === "Home") navigate("/");
    if (e === "About") navigate("/about");
    if (e === "Contact us") navigate("/contact");
    if (e === "Course") navigate(`/category/webdev`);
  };
  const handleCopy = () => {
    if (userData["referralCode"]) {
      navigator.clipboard.writeText(userData["referralCode"]);
      toast.success("Referral code copied to clipboard!");
    }
  };

 
  return (
    <div>
     
      <div className="bg-black w-full ">
        <div className="max-w-7xl mx-auto h-14 text-white  items-center justify-between px-4 hidden md:flex">
         
          <div className="flex gap-2 md:gap-6">
            {["Home", "Course", "Contact us", "About"].map((item, index) => (
              <div
                key={index}
                className="relative px-2 md:px-4 py-2 text-base md:text-lg font-medium transition-all duration-300 hover:scale-110 hover:underline underline-offset-8 decoration-2 cursor-pointer flex items-center justify-center whitespace-nowrap"
                onClick={() => handleOnClick(`${item}`)}
              >
                {item}
                <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-300 hover:w-full"></div>
              </div>
            ))}
            {amiAdmin =="ADMIN" &&
            <div className="pt-2  px-2 md:px-4 py-2 text-base md:text-lg font-medium transition-all duration-300 hover:scale-110 hover:underline underline-offset-8 decoration-2 cursor-pointer flex items-center justify-center whitespace-nowrap"
             onClick={()=>navigate("/dashboard")}
            >Dashboard</div>}
          </div>
          

         
          <div className="flex items-center gap-4">
            <div
              className="relative px-4 py-2 text-lg font-medium transition-all duration-300 hover:scale-110 cursor-pointer flex items-center justify-center"
              onClick={() => navigate("/user-Wallet")}
            >
              <div className="flex items-center gap-1">
                {/* @ts-ignore */}
                <MdCurrencyRupee className="text-lg" />
                <span>{walletBalance}.00</span>
              </div>
              {/* @ts-ignore */}
              <div className="pl-1">
                <IoWallet className="" />
              </div>
              <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-300 hover:w-full"></div>
            </div>
          </div>
        </div>
      </div>

   
        <div className="w-full bg-[#DC9814] flex items-center">
          <div className="h-12 flex space-x-2 items-center text-white font-semibold px-4 max-w-5xl mx-auto">
            <span className="text-sm md:text-base">
              🎉 Refer & Earn! Share with friends and get <strong>20% instant reward </strong> on every course they buy.
            </span>

          
            {userData["referralCode"] && (
              <div className="flex items-center  bg-white text-[#DC9814] px-3 py-1 rounded-md text-sm font-bold hover:bg-opacity-90 transition-all">
                <span className="text-red-600 font-semibold pr-1">{userData["referralCode"]}</span>
                <FaRegCopy
                  className="cursor-pointer hover:text-red-500 transition-transform transform hover:scale-110"
                  onClick={handleCopy}
                />
              </div>
            )}
          </div>
        </div>
    
    </div>
  );
};

export default Banner;
