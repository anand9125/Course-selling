import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import toast from "react-hot-toast";
import { useUserStore } from "../../store/useUserStore";
import Swal from "sweetalert2";
import axios from "axios";
import { userEndPoint } from "../../config";
interface RedeemPopupProps {
  setPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}
export const RedeemPopupCard: React.FC<RedeemPopupProps> = ({ setPopUp }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
   const { walletBalance } = useUserStore();
     const{userWalletBalance}=useUserStore()
    const userDetails= JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setPopUp(false);
  };

  const handleRedeem = async() => {
    if (!/^\d{10}$/.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    }
     if(!userData.id){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You are not signed in!",
            footer: '<a href="/user-Profile" style="color: #007bff; font-weight: bold; text-decoration: underline;">Sign in here before proceeding to checkout</a>',
          });   
          return;
        }
    // @ts-ignore
    if (walletBalance >= 10) {
      try {
        await axios.post(`${userEndPoint}/user/postEmail`, {
          email: userData.email,
          phoneNumber: phoneNumber,
          walletBalance: walletBalance,
          name: userData.name,
        });
        await Swal.fire({
          title: "🎉 Success!",
          text: "Your balance will be added to your bank account shortly.",
          icon: "success",
          confirmButtonText: "OK"
        });
        await axios.post(`${userEndPoint}/user/removeBalance/${userData.id}`);
        await userWalletBalance(userDetails.id);
        
      } catch (error) {
        console.error("Error processing balance withdrawal:", error);
        Swal.fire({
          title: "⚠️ Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    } else {
      Swal.fire({
        title: "⚠️ Insufficient Balance!",
        text: "Your wallet balance must be at least ₹10 to withdraw.",
        icon: "warning",
        confirmButtonText: "OK"
      });
    }   
  }

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full relative"
        >
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>

        
          <h2 className="text-2xl font-semibold text-gray-900 text-center mb-3">
            Redeem Your Reward
          </h2>

          <p className="text-sm text-gray-600 text-center mb-4">
            Enter your mobile number to redeem your reward. Make sure it's correct to avoid any issues.
          </p>


          <label htmlFor="phone" className="text-gray-700 font-medium block mb-2">
            Enter your mobile number:
          </label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="e.g. 9876543210"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC9814] text-gray-700 text-lg mb-3"
            maxLength={10}
          />
          <p className="text-xs text-gray-500 text-center mb-4">
            * Reward processing may take up to 24 hours. You'll receive an SMS confirmation once completed.
          </p>

    
          <button
            onClick={handleRedeem}
            className="w-full bg-[#DC9814] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all text-lg font-medium"
          >
            Claim Reward
          </button>
        </motion.div>
      </div>
    )
  );
};
