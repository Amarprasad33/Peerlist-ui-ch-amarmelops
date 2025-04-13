'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
// import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid';
// import { ArrowPathIcon } from '@heroicons/react/24/outline';

const STATUS = {
  ANALYZING: 'analyzing',
  SAFE: 'safe',
  WARNING: 'warning',
};

const statusStyles = {
  analyzing: 'bg-blue-100 text-blue-600',
  safe: 'bg-green-100 text-green-600',
  warning: 'bg-red-100 text-red-600',
};

// const icons = {
//   analyzing: <ArrowPathIcon className="h-5 w-5 animate-spin" />,
//   safe: <CheckCircleIcon className="h-5 w-5" />,
//   warning: <ExclamationTriangleIcon className="h-5 w-5" />,
// };
// Analyzing - Done - Analyzing - Warning 


export default function FluidState() {
    const [status, setStatus] = useState(STATUS.ANALYZING);

  // Simulate state changes
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   setStatus(STATUS.SAFE);
    //   setTimeout(() => setStatus(STATUS.WARNING), 3000);
    // }, 3000);
    const sequence = [STATUS.ANALYZING, STATUS.SAFE, STATUS.ANALYZING, STATUS.WARNING];
    let step = 0;

    const interval = setInterval(() => {
        setStatus(sequence[step]);
        step = (step + 1) % sequence.length;
    }, 2500); // Adjust timing as needed

    return () => clearInterval(interval);

    // return () => clearTimeout(timer);
  }, []);

  const jerkAnimation = {
    initial: { x: -20 },
    animate: {
      x: [0, -5, 5, -4, 4, -2, 2, 0], // quick shakes
      transition: { duration: 0.6, ease: 'easeInOut', delay: 0.4 }
    }
  };

  const isAnalyzing = status === STATUS.ANALYZING;

  return (
    <div className="relative h-full w-full flex items-center justify-center">
        <div className="w-[30rem] h-64 rounded-3xl flex items-center justify-center border border-zinc-300">
            <div
                className={`inline-flex items-center px-5 py-2 rounded-full font-medium transition-all duration-300 gap-2 ${status === STATUS.SAFE && 'bg-[#d9f4e4] text-[#37c470]'} ${status === STATUS.ANALYZING && 'bg-[#e5f3ff] text-[#4dafff]'} ${status === STATUS.WARNING && 'bg-[#ffe2e2] text-[#ff3f3f]'}`}
                >
                <AnimatePresence mode="wait">
                    <motion.div className='flex gap-1'>
                        {/* {icons[status]} */}
                        {status === STATUS.ANALYZING && <motion.div 
                            role="status" className='z-20'
                            initial={{x: -20}}
                            animate={{x: 0}}
                            transition={{ duration: 0.4 }}
                        >
                            <svg aria-hidden="true" className="inline w-4 h-4 text-gray-200 animate-spin dark:text-[#c5e4ff] fill-[#54b2ff]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </motion.div>}
                        {status === STATUS.WARNING && <motion.div
                                variants={jerkAnimation}
                                initial="initial"
                                animate="animate"
                                className="inline-block"
                            >
                                <svg className='mt-[3px]' width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1.72502 18C1.54168 18 1.37502 17.9543 1.22502 17.863C1.07502 17.7717 0.958349 17.6507 0.875016 17.5C0.791683 17.3493 0.746016 17.1867 0.738016 17.012C0.730016 16.8373 0.775683 16.6667 0.875016 16.5L10.125 0.5C10.225 0.333333 10.3543 0.208333 10.513 0.125C10.6717 0.0416667 10.834 0 11 0C11.166 0 11.3287 0.0416667 11.488 0.125C11.6473 0.208333 11.7763 0.333333 11.875 0.5L21.125 16.5C21.225 16.6667 21.271 16.8377 21.263 17.013C21.255 17.1883 21.209 17.3507 21.125 17.5C21.041 17.6493 20.9243 17.7703 20.775 17.863C20.6257 17.9557 20.459 18.0013 20.275 18H1.72502ZM11 15C11.2833 15 11.521 14.904 11.713 14.712C11.905 14.52 12.0007 14.2827 12 14C11.9993 13.7173 11.9033 13.48 11.712 13.288C11.5207 13.096 11.2833 13 11 13C10.7167 13 10.4793 13.096 10.288 13.288C10.0967 13.48 10.0007 13.7173 10 14C9.99935 14.2827 10.0953 14.5203 10.288 14.713C10.4807 14.9057 10.718 15.0013 11 15ZM11 12C11.2833 12 11.521 11.904 11.713 11.712C11.905 11.52 12.0007 11.2827 12 11V8C12 7.71667 12.192 3.69133 12 3.5C11.808 3.30867 11.2827 3.00067 11 3C10.7173 2.99933 10.192 3.30733 10 3.5C9.73026 3.77067 10 7.718 10 8V11C10 11.2833 10.096 11.521 10.288 11.713C10.48 11.905 10.7173 12.0007 11 12Z" fill="#FF3F3F"/>
                                </svg>
                            </motion.div>
                        }
                        {status === STATUS.SAFE && <motion.svg 
                            className='mt-[3px]' width="18" height="18" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                            initial={{x: -10}}
                            animate={{x: 0}}
                            transition={{ duration: 0.4 }}
                        >
                            <g clipPath="url(#clip0_28_4)">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 7.5C0 5.51088 0.790176 3.60322 2.1967 2.1967C3.60322 0.790176 5.51088 0 7.5 0C9.48912 0 11.3968 0.790176 12.8033 2.1967C14.2098 3.60322 15 5.51088 15 7.5C15 9.48912 14.2098 11.3968 12.8033 12.8033C11.3968 14.2098 9.48912 15 7.5 15C5.51088 15 3.60322 14.2098 2.1967 12.8033C0.790176 11.3968 0 9.48912 0 7.5ZM7.072 10.71L11.39 5.312L10.61 4.688L6.928 9.289L4.32 7.116L3.68 7.884L7.072 10.71Z" fill="#34C759"/>
                            </g>
                                <defs>
                                    <clipPath id="clip0_28_4">
                                    <rect width="15" height="15" fill="white"/>
                                    </clipPath>
                                </defs>
                            </motion.svg>
                        }
                        <motion.div
                            key={status}
                            initial={{ x: status === STATUS.ANALYZING ? -35 : 35, opacity: 0.7 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: status === STATUS.ANALYZING ? 35 : -35, opacity: 0.7 }}
                            transition={{ duration: 0.4 }}
                            className="flex items-center gap-1 ml-1 w-fit overflow-hidden"
                            >
                            <span className='font-semibold'>
                                {status === STATUS.ANALYZING
                                ? 'Analyzing Transaction'
                                : status === STATUS.SAFE
                                ? 'Transaction Safe'
                                : 'Transaction Warning'}
                            </span>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    </div>
  );
}