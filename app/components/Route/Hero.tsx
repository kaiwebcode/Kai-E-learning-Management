import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import { FC, useState } from "react";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { motion } from "framer-motion";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHeroDataQuery("Banner", {});
  const [search, setSearch] = useState("");
  const router = useRouter();


  const handleSearch = () => {
    if (search === "") {
      return
    } else {
      router.push(`/courses?title=${search}`);
    }
  }

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" }}
          // className="h-full lg:h-screen"
          >

            <div className="flex flex-col 1000px:flex-row items-center justify-between h-screen px-6 1000px:px-10 relative overflow-hidden pb-20 mt-8 lg:mt-0 lg:pt-4">
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
                    <img
                      src={data?.layout?.banner?.image?.url || null}
                      alt="Hero Banner"
                      width={400}
                      height={400}
                      className="object-contain w-full h-full rounded-full"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Text Content */}
              <div className="w-full 1000px:w-1/2 flex gap-y-1 lg:gap-y-6 flex-col items-center 1000px:items-start mt-10 1000px:mt-0 text-center 1000px:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.0, ease: "easeIn", delay: 0.8 }}

                >

                  <h1 className="text-3xl 1000px:text-5xl font-bold dark:text-white text-gray-800 leading-snug">
                    {data?.layout?.banner?.title}
                  </h1>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: "easeIn", delay: 1 }}
                >
                  <p className="text-base 1000px:text-lg text-gray-600 dark:text-gray-400 mt-4 max-w-[400px] 1000px:max-w-[600px]">
                    {data?.layout?.banner.subTitle}
                  </p>
                </motion.div>

                <div className="w-[70%] h-[50px] bg-transparent relative mt-4">
                  <input
                    type="search"
                    placeholder="Search Courses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffff] rounded-[5px] p-2 w-full h-full outline-none "
                  />
                  <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]"
                    onClick={handleSearch}>
                    <BiSearch className="text-white " size={25} />
                  </div>
                </div>
                <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-lg transition-all duration-300">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )
      }
    </>
  );
};

export default Hero;
