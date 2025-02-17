import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

export default function PopupCard() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

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
          Share with friends and get 20% reward on every course they buy. <strong>RefrelCode</strong>.
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
