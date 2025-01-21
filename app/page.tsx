"use client";

import { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses"
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer/footer"
import CodeBlocks from "./components/Homepage/CodeBlocks";
import CodeBlocks2 from "./components/Homepage/CodeBlocks2";

interface Props {

}

const Home: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  // const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Heading
        title="KAI-LEARNING"
        description="Elearning is a platform for students to learn and get help from teachers"
        keywords="Programing, MERN, Redux, Machine Learning "
      />
      {/* <div className=" sticky top-0 dark:bg-slate-900 z-[-10]"> */}
      <div className="w-full sticky top-0 z-50 dark:bg-slate-900 bg-white shadow-xl">
        <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route} />
      </div>
      {/* </div> */}
      <Hero />
      <div className=" lg:mx-10 ">
        <CodeBlocks
          position="flex-col lg:flex-row items-center "
          heading={
            <h1 className="text-3xl lg:text-5xl font-bold text-center lg:text-left text-gray-800 dark:text-white">
              Learn Effectively with KAI-LEARNING
            </h1>
          }
          subheading={
            <p className="text-lg lg:text-xl text-center lg:text-left text-gray-600 dark:text-gray-300">
              Master the art of programming with our comprehensive tutorials and interactive examples.
            </p>
          }
          ctabtn1={
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Start Learning
            </button>
          }
          ctabtn2={
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
              Read More
            </button>
          }
          codeblock={`<!DOCTYPE html>
            <html>
              <head>
                <title>kai-Elearning</title>
                <style>
                  body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
                </style>
              </head>
              <body>
                <h1><a href="/">Welcome to My Website</a></h1>
                <p>This is a simple HTML example with inline CSS.</p>
              </body> </html>`}
          backgroudGradient="bg-gradient-to-r from-blue-500 to-purple-600"
          codeColor="text-white"

        />
      </div>
      <Courses />
      <div className=" mx-3">
        <CodeBlocks2
          position="flex-col lg:flex-row items-center "
          heading={
            <h1 className="text-3xl lg:text-5xl font-bold text-center lg:text-left text-gray-800 dark:text-white">
              Start coding in seconds
            </h1>
          }
          subheading={
            <p className="text-lg lg:text-xl text-center lg:text-left text-gray-600 dark:text-gray-300">
              Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson.
            </p>
          }
          ctabtn1={
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
              Start Learning
            </button>
          }
          ctabtn2={
            <button className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
              Read More
            </button>
          }
          codeblock={`<!DOCTYPE html>
            <html>
              <head>
                <title>Kai-Elaerning</title>
                <style>
                  body { font-family: Arial, sans-serif; background-color: #f4f4f4; }
                </style>
              </head>
              <body>
                <h1><a href="/">Welcome to My Website</a></h1>
                <p>This is a simple HTML example with inline CSS.</p>
              </body> </html>`}
          backgroudGradient="bg-gradient-to-r from-blue-500 to-purple-600"
          codeColor="text-white"

        />
      </div>
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
