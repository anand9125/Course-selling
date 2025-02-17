import { useEffect, useState } from "react";
import { IoWallet } from "react-icons/io5";
import { MdCurrencyRupee } from 'react-icons/md';
import { useNavigate } from "react-router-dom";


const Banner = () => {
  const navigate  = useNavigate()
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleOnClick = (e:any) => {
    if(e=="Home")navigate("/")
    if(e=="About")navigate("/about")
    if(e=="Contact us")navigate("/contact")
    if(e=="Course")navigate(`/category/`)
    
  }
    // Update screen size dynamically
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth <  1024);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
  return (
    <div>
  
      <div className="bg-black w-full ">
        <div className="max-w-7xl  mx-auto h-14  text-white flex items-center justify-between px-4  hidden md:flex">
          {/* Left Part */}
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
          </div>

          {/* Right Part */}
          <div className="flex items-center gap-4">
            
            <div
              className="relative px-4 py-2 text-lg font-medium transition-all duration-300 hover:scale-110 hover: decoration-2 cursor-pointer flex items-center justify-center"
              onClick={()=>navigate("/user-Wallet")}
                >
                <div className="flex items-center gap-1">
                    {/* @ts-ignore */}
                  <MdCurrencyRupee className="text-lg" />
                  <span >0.00</span>
                </div>
                  {/* @ts-ignore */}
                  <div className="pl-1">
                  <IoWallet  className=""/>
                  </div>
                  
              <div className="absolute left-0 bottom-0 w-0 h-[3px] bg-white transition-all duration-300 hover:w-full"></div>
            </div>
          </div>
        </div>
      </div>

        <div className="">
             {!isMobile &&(
              <div className="w-full bg-[#DC9814]">
              <div className="h-10 flex justify-between items-center text-white font-semibold lg:gap-2 px-4 max-w-5xl mx-auto">
                <span className="text-sm md:text-base">
                🎉 Refer & Earn! Share with friends and get <strong>20% reward</strong> on every course they buy. (Referral Code: <strong>YOURCODE</strong>)
                </span>
                <button className="bg-white text-[#DC9814] px-3 py-1 rounded-md text-sm font-bold hover:bg-opacity-90 transition-all">
                  Share Now
                </button>
              </div>
            </div>
            )}
          
            {isMobile && (
                  <div className="w-full bg-[#DC9814]">
                  <div className="h-10 flex justify-between items-center text-white font-semibold lg:gap-2 px-4 max-w-5xl mx-auto">
                    <span className="text-sm md:text-base">
                    🎉 Refer & Earn! Share with friends and get <strong>20% reward</strong> on every course they buy. 
                    <div className="flex justify-center">
                    (Referral Code: <strong>YOURCODE</strong>)
                    </div>
                    </span>
                    <button className="bg-white text-[#DC9814] px-3 py-1 rounded-md text-sm font-bold hover:bg-opacity-90 transition-all">
                      Share Now
                    </button>
                  </div>
                </div>
              )}
        </div>

    </div>
  );
};

export default Banner;