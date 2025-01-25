"use client"

import React, { FC, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile"
import { useSelector } from "react-redux";
import Footer from '../components/Footer/footer'

type Props = {};

const page: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state:any) => state.auth)

  // console.log(user.name)

  return (  
    <div className="min-h-screen">
      <Protected>
        <Heading
          title={`${user.name}`}
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programing, MERN, Redux, Machine Learning "
        />
        
        <div className="w-full sticky top-0 z-50 dark:bg-slate-900 bg-white shadow-[0_0_30px_0] shadow-[#67befca7]">
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />
          </div>
        <Profile user={user} />
        <Footer />
      </Protected>
    </div>
  );
};

export default page;
