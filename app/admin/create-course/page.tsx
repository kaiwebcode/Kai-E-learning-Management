"use client";
import React from "react";
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../app/utils/Heading";
import CreateCourse from "../../components/Admin/Course/CreateCourse";
import DashboardHeader from "../../../app/components/Admin/DashboardHeader";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Prograaming,MERN,Redux,Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] ">
          <AdminSidebar />
        </div>
        <div className="w-[100%] lg:pl-20 pl-3 pr-2 md:pl-10 md:pr-8">
          <DashboardHeader />
          <CreateCourse />  
        </div>
      </div>
    </div>
  );
};

export default page;
