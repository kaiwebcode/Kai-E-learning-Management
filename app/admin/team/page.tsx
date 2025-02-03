"use client";

import DashboardHero from "@/app/components/Admin/DashboardHero";
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import AllUsers from "../../components/Admin/Users/AllUsers";

type Props = {};

function page({}: Props) {
  return (
    <div>
      <AdminProtected>
        <Heading
          title="Elearning - Admin"
          description="ELearning is a platform for students to learn and get help from teachers"
          keywords="Prograaming,MERN,Redux,Machine Learning"
        />
        <div className="flex ">
          <div className="1500px:w-[16%] ">
            <AdminSidebar />
          </div>
          <div className="pl-0 lg:pl-12 w-[100%] h-screen"> 
            <DashboardHero />
            <AllUsers isTeam={true} />
          </div>
        </div>
      </AdminProtected>
    </div>
  );
}

export default page;
