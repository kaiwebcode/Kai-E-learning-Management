"use client";

import React from "react";
import Heading from "../utils/Heading";
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar";
import AdminProtected from "../hooks/adminProtected";
import DashboardHero from "../components/Admin/DashboardHero";

type Props = {};

const Page = (props: Props) => {
  return (
    <div >
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="Elearning is a platform for students to learn and get help from teachers"
          keywords="Programming, MERN, Redux, Machine Learning"
        />
        <div className="flex ">
          <div className="1500px:w-[16%]">
          <AdminSidebar />
          </div>
          <div className="lg:w-[95%] w-[100] md:w-[100%] lg:pl-20 pl-2 ">
            <DashboardHero isDashboard={true}/>
          </div>
        </div>
      </AdminProtected>
    </div>
  );
};

export default Page;
