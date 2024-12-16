// CreateCourse.tsx
"use client";
import React, { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";

const CreateCourse = () => {
  const [active, setActive] = useState(0); // Track active step
  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    categories: "",
    demoUrl: "",
    thumbnail: "",
  });

  const handleSubmit = async () => {
    const data = { ...courseInfo };
    console.log(data); // Simulate API call
  };

  return (
    <div className="flex flex-col pl-3 pt-10 pr-1 lg:flex-row w-full min-h-screen ">
      {/* Main Content */}
      {/* <div className="lg:w-[20%] p-4 h-auto lg:h-screen">
        <CourseOptions active={active} setActive={setActive} />
      </div> */}
      <div className="flex-grow p-1 bg-slate-600 rounded-lg mb-20">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
      </div>

      {/* Sidebar Options */}
      <div className="lg:w-[20%] pl-6 h-auto lg:h-screen">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourse;
