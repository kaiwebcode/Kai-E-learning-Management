"use client";

import { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses"
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/FAQ/FAQ"
import Footer from "./components/Footer/footer"

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
      <div className="w-full sticky top-0 z-50 dark:bg-slate-900 bg-white">
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route}/>
      </div>
      {/* </div> */}
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
