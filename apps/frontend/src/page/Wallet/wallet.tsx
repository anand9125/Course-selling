import { MdCurrencyRupee } from "react-icons/md";
import { IoIosWallet } from "react-icons/io";
import { FaShareAlt } from "react-icons/fa";
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";
import { RedeemPopupCard } from "./RedeemPopup";

function Wallet() {
  const { walletBalance } = useUserStore();
  const [popUp, setPopUp] = useState<boolean>(false);

  const handleRedeem = () => {
    setPopUp(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-lg shadow-xl border border-gray-200">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">
        Your Wallet
      </h2>

      {/* Wallet Balance Display */}
      <div className="flex items-center justify-between bg-gray-100 p-5 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          <IoIosWallet className="w-12 h-12 text-gray-600" />
          <div>
            <p className="text-lg text-gray-700 font-semibold">Available Balance</p>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <MdCurrencyRupee className="text-3xl text-indigo-600 mr-1" />
              {walletBalance}.00
            </h2>
          </div>
        </div>
        <button 
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
          onClick={handleRedeem}
        >
          Redeem Now
        </button>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gray-300 my-6"></div>

      {/* Referral Section */}
      <div className="bg-yellow-50 p-6 rounded-lg shadow-md flex flex-col items-center">
        <FaShareAlt className="w-10 h-10 text-yellow-500 mb-2" />
        <h3 className="text-xl font-bold text-gray-800">
          Refer & Earn 20% Reward!
        </h3>
        <p className="text-sm text-gray-600 text-center mt-2">
          Invite your friends to buy a course, and you'll earn 
          <span className="font-semibold text-yellow-600 pr-1"> 20% of their purchase</span> 
          in your wallet.
        </p>
        <button 
          className="mt-4 bg-yellow-500 text-white px-6 py-3 rounded-lg hover:scale-105 hover:opacity-90 hover:shadow-lg transition-all duration-300 ease-in-out"
          onClick={() => alert("Share referral link!")}
        >
          Share Your Referral Code
        </button>
      </div>

     

      {/* Redeem Popup */}
      {popUp && <RedeemPopupCard setPopUp={setPopUp} />}
    </div>
  );
}

export default Wallet;

