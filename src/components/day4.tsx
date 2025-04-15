import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PricingToggle = () => {
  const [isPremium, setIsPremium] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="relative bg-white border border-[#e6e6e6] p-1 rounded-full shadow-lg w-[20rem] flex justify-center">
        {/* Toggle background */}
        <motion.div
            className={`absolute top-[3px] left-0 h-[90%] rounded-full bg-black`}
            initial={{
                width: '50%',
                x: '3%'
            }}
            animate={{
                x: isPremium ? "97%" : "3%",
                width: isPremium ? "50%" : "50%",
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
        />

        {/* Toggle buttons */}
        <div className="relative flex items-center gap-12">
          <button
            className={`px-8 py-3 rounded-full text-sm font-medium relative z-10 ${
              !isPremium ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setIsPremium(false)}
          >
            Free
          </button>
          <button
            className={`px-8 py-3 rounded-full text-sm font-medium relative z-10 ${
              isPremium ? "text-white" : "text-gray-600"
            }`}
            onClick={() => setIsPremium(true)}
          >
            Premium
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default PricingToggle;