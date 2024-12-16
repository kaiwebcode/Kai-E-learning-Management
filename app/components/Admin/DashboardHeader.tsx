"use client";

import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import React, { FC } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";

type Props = {
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  return (
    <div className="w-full flex items-center justify-end md:justify-end p-4 md:px-6 lg:px-8">
      <div className="flex items-center">
        <ThemeSwitcher />
        <div
          className="relative cursor-pointer ml-4"
          onClick={() => setOpen?.(!open)}
        >
          <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
          <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
            3
          </span>
        </div>
      </div>

      {open && (
        <div className="absolute top-14 right-4 md:right-8 w-[70%] md:w-[350px] max-h-[60vh] overflow-y-scroll py-2 px-1 md:px-2 lg:px-2 border dark:border-[#ffffff0c] border-[#0000001a] dark:bg-[#111C43] bg-white shadow-lg rounded-lg z-50">
          <h5 className="text-center text-lg font-bold text-black dark:text-white">
            Notifications
          </h5>
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="dark:bg-[#2d3a4e] bg-[#f1f1f1] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#e0e0e0] p-3 rounded-md my-2"
            >
              <div className="flex justify-between">
                <p className="text-xs md:text-sm lg:text-sm text-black dark:text-white">
                  New Question Received
                </p>
                <p className="text-xs md:text-sm lg:text-sm text-blue-500 cursor-pointer">
                  Mark as read
                </p>
              </div>
              <p className="text-xs md:text-sm lg:text-sm text-black dark:text-white">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                5 days ago
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
