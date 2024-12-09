import Image from "next/image";
import { FC } from "react";

// type Props = {};

const Hero = () => {
  return (
    <div className="flex flex-col 1000px:flex-row items-center justify-between h-screen px-6 1000px:px-10 relative overflow-hidden py-16">
      {/* Left Side: Image with Animated Circle */}
      <div className="relative flex justify-center items-center w-full 1000px:w-1/2">
        {/* Main Circle */}
        {/* you can remove hero_animtion */}
        <div className="relative w-[300px] h-[300px] 1000px:w-[600px] 1000px:h-[600px] rounded-full bg-gradient-to-r from-blue-900 via-purple-600 to-pink-500 flex justify-center items-center">
          {/* Orbiting Objects */}
          <div className="absolute w-[90%] h-[90%] rounded-full flex items-center justify-center animate-spin-slow">
            <div className="absolute w-[50px] h-[50px] bg-white dark:bg-black rounded-full top-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-[50px] h-[50px] bg-white dark:bg-black rounded-full bottom-0 left-1/2 transform -translate-x-1/2"></div>
            <div className="absolute w-[50px] h-[50px] bg-white dark:bg-black rounded-full left-0 top-1/2 transform -translate-y-1/2"></div>
            <div className="absolute w-[50px] h-[50px] bg-white dark:bg-black rounded-full right-0 top-1/2 transform -translate-y-1/2"></div>
          </div>

          {/* Inner Image */}
          <div className="absolute w-[85%] h-[85%] p-5 flex items-center justify-center rounded-full bg-white dark:bg-black z-10">
            <Image
              src={require("../../../public/banner-img-1.png")}
              alt="Hero Banner"
              className="object-contain w-full h-full rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full 1000px:w-1/2 flex gap-y-1 lg:gap-y-6 flex-col items-center 1000px:items-start mt-10 1000px:mt-0 text-center 1000px:text-left">
        <h1 className="text-3xl 1000px:text-5xl font-bold dark:text-white text-gray-800 leading-snug">
          Improve Your Online Learning Experience Instantly
        </h1>
        <p className="text-base 1000px:text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-[400px] 1000px:max-w-[600px]">
          Discover how our platform can make learning faster, more engaging, and
          accessible for everyone. Start your journey today!
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg transition-all duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
