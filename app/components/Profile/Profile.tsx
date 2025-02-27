"use client";

import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard from "../Course/CourseCard";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [courses, setCourses] = useState([])
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});


  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const [active, setActive] = useState(1);

  const logOutHandler = async () => {
    // console.log("");
    setLogout(true);
    await signOut();
    // redirect("/");
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.screenY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }

  useEffect(() => {
    if (data) {
      const filteredCourses = user.courses
        .map((userCourse: any) =>
          data.courses.find((course: any) => course._id === userCourse._id)
        )
        .filter((course: any) => course !== undefined);
      setCourses(filteredCourses)
    }
  }, [data])

  return (
    <div className="w-[98%] lg:w-[85%] mt-7 flex mx-auto h-screen">
      <div
        className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-opacity-90 bg-white border dark:border-[#ffffff1d] border-[#00000037] rounded-[5px] shadow-sm dark:shadow-sm mt-[80px] mb-[80px] sticky ${scroll ? "top-[120px]" : "top-[30px]"
          }`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full p-1 mt-10 flex justify-center">
          <div className="w-full max-w-5xl ">
            <ProfileInfo user={user} avatar={avatar} />
          </div>
        </div>
      )}
      {active === 2 && (
        <div className="w-full p-1 mt-10 flex justify-center">
          <div className="w-full max-w-5xl ">
            <ChangePassword />
          </div>
        </div>
      )}


      {
        active === 3 && (
          <div className="w-full pl-1 md:pl-20 lg:pl-20 px-2 800px:px-10 800px:pl-8 min-h-screen pb-40 overflow-y-auto">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-6 mt-20">
              {courses && courses.length > 0 ? (
                courses.map((item: any, index: number) => (
                  <CourseCard item={item} key={index} isProfile={true} />
                ))
              ) : (
                <h1 className="text-center text-[18px] w-full col-span-full">
                  You don't have any courses...
                </h1>
              )}
            </div>
          </div>
        )
      }

    </div>
  );
};

export default Profile;
