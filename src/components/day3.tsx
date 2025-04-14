"use client"
import { motion, useAnimation } from "motion/react";
import { useEffect, useState } from "react";

export default function AnimatedCheckbox() {
  
  const checkBoxTexts = ["Wake Up", "Question Self Existence", "Complete Peerlist UI Challenge"]

  return (
    <div className="w-full min-h-screen flex justify-center items-center ">
        <div className="w-[30rem] h-64 rounded-3xl flex items-center justify-center border border-zinc-300"> 
            <div className="flex flex-col gap-1">
                {checkBoxTexts.map((text, idx) => (
                <AnimatedCheckboxComponent 
                    key={idx}
                    displayText={text}
                />
                ))}
            </div>
        </div>
    </div>
  );
}

function AnimatedCheckboxComponent({ displayText }: { displayText: string }) {

  const [checked, setChecked] = useState(false);
  const [initialChecked, setInitialChecked] = useState(false);
  const borderControls = useAnimation();
  const boxControls = useAnimation();
  const tickControls = useAnimation();
  const lineControls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    // console.log('checked-->', checked)
    ToggleCheck();
  }, [checked])


  const handleToggle = async () => {
    setChecked((prev) => !prev);
    setInitialChecked(true);
  };

  async function ToggleCheck() {
    if(initialChecked){
      if(checked){
        // Start seq.
        await borderControls.start({
          pathLength: !checked ? 1 : 0,
          transition: { duration: 0.2, ease: "easeInOut" },
        });
        await boxControls.start({
          scale: !checked ? 0 : 1,
          transition: { duration: 0.2, ease: "easeOut" },
        });
        tickControls.start({
          pathLength: !checked ? 0 : 1,
          opacity: 1,
          transition: { duration: 0.2, ease: "easeInOut" },
        });
        lineControls.start({
          width: '100%',
          transition: { duration: 0.2, ease: "easeInOut" },
        })
        textControls.start({
          x: checked? [0, 4, 0] : [0, -4, 0],
          // transition: { delay: checked? 0.3 : 0 }
        })
      }else{
        lineControls.start({
          width: 0,
          transition: { duration: 0.2, ease: "easeInOut" },
        })
        textControls.start({
          x: checked? [0, 4, 0] : [0, -4, 0]
        })
        await tickControls.start({
          pathLength: 0,
          opacity: 0,
          transition: { duration: 0.2, ease: "easeInOut" },
        });
        await boxControls.start({
          scale: 0,
          transition: { duration: 0.1, ease: "easeOut" },
        });
      
        await borderControls.start({
          pathLength: 1,
          transition: { duration: 0.4, ease: "easeInOut" },
        });
      }
    }
  }

  return (
    <div
      className="hover:bg-zinc-100 cursor-pointer flex items-center px-[10px] py-2 rounded-lg w-fit"
      onClick={handleToggle}
    >
      <div style={{ position: "relative", width: 24, height: 24 }}>
        {/* Border animation */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <motion.rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="5"
            ry="5"
            stroke="#9f9fa9"
            strokeWidth="2"
            initial={{ pathLength: 1 }}
            animate={borderControls}
          />
        </svg>

        {/* Blue box scaling in */}
        <motion.div
          initial={{ scale: 0 }}
          animate={boxControls}
          className="absolute top-[2px] left-[2px] w-[20px] h-[20px] bg-[#267BFF] rounded-[5px] flex justify-center items-center"
        >
          {/* Checkmark tick path */}
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d="M1 5L4.5 8.5L11 2"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={tickControls}
            />
          </svg>
        </motion.div>
      </div>

      <motion.span
        className="ml-2 relative font-medium"
        style={{
          color: checked ? "#999" : "#444",
          userSelect: 'none'
          // textDecoration: checked ? "line-through" : "none",
          // transition: "all 0.3s ease",
        }}
        initial={{x: 0}}
        animate={textControls}
        transition={{
          duration: 0.4, ease: 'easeOut'
        }}
      >
        {displayText}
        <motion.span
          className="absolute left-0 top-1/2 h-[2px] bg-[#999] pointer-events-none"
          initial={{ width: 0 }}
          animate={lineControls}
          style={{ transform: "translateY(-50%)" }}
        />
      </motion.span>
    </div>
  )
  
}