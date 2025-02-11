import React from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

interface CodeBlockProps {
  position: string;
  heading: React.ReactNode;
  subheading: React.ReactNode;
  ctabtn1: React.ReactNode;
  ctabtn2: React.ReactNode;
  codeblock: string;
  backgroudGradient: string;
  codeColor: string;
}

const CodeBlocks2: React.FC<CodeBlockProps> = ({
  position,
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codeblock,
  backgroudGradient,
  codeColor,
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-10 flex-wrap px-2  lg:px-12`}>


      {/* Section 2 */}
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // className="lg:text-2xl sm:text-xs font-extrabold tracking-tight"
        className="relative bg-gray-900 shadow-[0_0_20px_0] shadow-[#67d4fc] text-white rounded-lg overflow-hidden lg:w-[500px] w-full"
      >

        <div>
          {/* Background Gradient */}
          <div className="absolute inset-0 z-[-1]">
            <div className={`${backgroudGradient} w-full h-full opacity-70`}></div>
          </div>

          {/* Animated Number Lines */}
          <div className="flex">
            <div className="w-12 text-center bg-gray-800 text-gray-500 py-4 flex flex-col font-mono ">
              {Array.from({ length: 11 }).map((_, idx) => (
                <p key={idx} className="animate-fade-in">{idx + 1}</p>
              ))}
            </div>

            {/* Code Content */}
            <div className={`flex-1 p-4 font-mono text-xs lg:text-sm ${codeColor}`}>
              <TypeAnimation
                sequence={[codeblock, 2000, ""]}
                repeat={Infinity}
                cursor={true}
                style={{
                  whiteSpace: "pre-line",
                  display: "block",
                  overflowX: "hidden",
                }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </motion.h2>
      {/* Section 1 */}
      <div className="flex flex-col gap-8 lg:w-[50%]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="lg:text-2xl sm:text-xs font-extrabold tracking-tight"
        >
          {heading}
          <div className="text-gray-600 dark:text-gray-300 font-medium text-md lg:text-lg pt-6">
            {subheading}
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        // className="lg:text-2xl sm:text-xs font-extrabold tracking-tight"
        >
          <div className="flex gap-4">{ctabtn1}{ctabtn2}</div>
        </motion.h2>
      </div>
    </div>
  );
};

export default CodeBlocks2;
