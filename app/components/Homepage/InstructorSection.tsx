import React from 'react';
import Instructor from '../../../public/Instructor.8b4c4f204053f0dfe844.png';
import { FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import HighlightText from '../About/HighlightText';
import { Button } from '@/components/ui/button';
import { motion } from "framer-motion";


const InstructorSection = () => {
  return (
    <div className="mt-32 px-4 lg:mx-20 md:flex-col md:px-12">
      <div className="flex flex-col md:flex-row gap-16 items-center justify-center">
        {/* Image Section */}

        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full md:w-[50%] md:mr-4 rounded-lg
        shadow-[0_0_30px_0] shadow-[#67d4fc] text-white overflow-hidden lg:w-[500px] "
        >
          <Image
            src={Instructor}
            alt="Instructor"
            className="
            rounded-lg"
          // shadow-white shadow-[-0.5rem_-0.5rem_0_0]
          />

        </motion.h2>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:w-[50%] flex flex-col gap-10 text-center md:text-left"
        >

          <div >
            {/* Title */}
            <div className="text-3xl md:text-4xl font-semibold">
              Become an{' '}
              <HighlightText text="Instructor" />
            </div>

            {/* Description */} 
            <p className="font-medium text-[16px] md:text-lg text-richblack-300 py-6">
              Instructors from around the world teach millions of students on Kai-Elearning.
              We provide the tools and skills to teach what you love.
            </p>

            {/* Button */}
            <div className="w-fit mx-auto md:mx-0">
              <Button>
                <div className="flex flex-row gap-2 items-center">
                  Start Learning Today
                  <FaArrowRight />
                </div>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default InstructorSection;
