'use client';

import React from "react";
import { use } from "react"; // Import the `use` API
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from "../../../../app/utils/Heading";
import DashboardHeader from "../../../../app/components/Admin/DashboardHeader";
import EditCourse from "../../../components/Admin/Course/EditCourse";

type Params = {
  params: Promise<{ id: string }>; // Define `params` as a Promise if it must be awaited.
};

const Page = ({ params }: Params) => {
  // Use the `use` API to unwrap the `params` promise.
  const { id } = use(params);

  return (
    <div>
      <Heading
        title="Elearning - Admin"
        description="ELearning is a platform for students to learn and get help from teachers"
        keywords="Programming, MERN, Redux, Machine Learning"
      />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
          <AdminSidebar />
        </div>
        <div className="w-[85%]">
          <DashboardHeader />
          <EditCourse id={id} />
        </div>
      </div>
    </div>
  );
};

export default Page;
