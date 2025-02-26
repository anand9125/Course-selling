import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
export default function PopupCard() {
  const [isOpen, setIsOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user") || "{}");
  useEffect(() => {
    setIsOpen(true);
  }, []);
  const handleCopy = () => {
    if (userData["referralCode"]) {
      navigator.clipboard.writeText(userData["referralCode"]);
      toast.success("Referral code copied to clipboard!");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white p-6 rounded-2xl shadow-xl max-w-sm w-full relative"
        >
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
          >
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-xl font-bold text-gray-800">Welcome! 🎉</h2>
          <p className="text-gray-600 mt-2">
          Share with friends and get 20% reward on every course they buy.
          <strong className="flex items-center"><span>RefrelCode :</span>
            <span>
            {userData["referralCode"] && (
                        <div className="flex items-center  bg-white text-[#DC9814] px-3 py-1 rounded-md text-sm font-bold hover:bg-opacity-90 transition-all">
                          <span className="text-red-600 font-semibold pr-1">{userData["referralCode"]}</span>
                          <FaRegCopy
                            className="cursor-pointer hover:text-red-500 transition-transform transform hover:scale-110"
                            onClick={handleCopy}
                          />
                        </div>
              )}
            </span>
            </strong>
          </p>

          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 bg-[#DC9814] text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-all"
          >
            Claim Now
          </button>
        </motion.div>
      </div>
    )
  );
}
