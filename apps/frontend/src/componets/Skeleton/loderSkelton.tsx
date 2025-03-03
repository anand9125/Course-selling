import { motion } from "framer-motion";

const FancyLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <motion.div
        className="w-12 h-12 border-[5px] border-transparent border-t-blue-500 border-r-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />
    </div>
  );
};

export default FancyLoader;

