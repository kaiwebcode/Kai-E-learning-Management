"use client";

import { FC, useState } from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";

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
      <Header open={open} setOpen={setOpen} activeItem={activeItem} setRoute={setRoute} route={route}/>
      <Hero />
    </div>
  );
};

export default Home;
