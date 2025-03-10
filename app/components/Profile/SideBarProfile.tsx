import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import Link from "next/link";

type Props = {
  user: any;
  active: number;
  avatar: string | null;
  setActive: (active: number) => void;
  logOutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  avatar,
  setActive,
  logOutHandler,
}) => {
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center gap-x-2 px-3 py-4  cursor-pointer ${
          active === 1
            ? "dark:bg-slate-800 bg-white"
            : "bg-transparent hover:bg-slate-600 duration-300"
        }`}
        onClick={() => setActive(1)}
      >
        <img
          src={
            user.avatar || avatar ? user.avatar.url || avatar : avatarDefault
          }
          alt=""
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer object-cover rounded-full"
        />
        <h5 className="800px:block hidden text-black dark:text-white">
          My Account
        </h5>
      </div>
      <div
        className={`w-full flex items-center px-3 gap-x-2 py-4 cursor-pointer ${
          active === 2
            ? "dark:bg-slate-800 bg-white"
            : "bg-transparent hover:bg-slate-600 duration-300"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className="dark:text-white text-black" />
        <h5 className="800px:block hidden dark:text-white text-black">Change Password</h5>
      </div>
      <div
        className={`w-full flex items-center px-3 gap-x-2 py-4 cursor-pointer ${
          active === 3
            ? "dark:bg-slate-800 bg-white"
            : "bg-transparent hover:bg-slate-600 duration-300"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className="dark:text-white text-black" />
        <h5 className="800px:block hidden dark:text-white text-black">Enrolled Courses</h5>
      </div>
      {user.role === "admin" && (
        <Link
          className={`w-full flex items-center px-3 gap-x-2 py-4 cursor-pointer ${
            active === 6
              ? "dark:bg-slate-800 bg-white"
              : "bg-transparent hover:bg-slate-600 duration-300"
          }`}
          // onClick={() => setActive(6)}
          href={"/admin"}
        >
          <MdOutlineAdminPanelSettings
            size={20}
            className="dark:text-white text-black"
          />
          <h5 className="800px:block hidden dark:text-white text-black">Admin Dashboard</h5>
        </Link>
      )}
      <div
        className={`w-full flex items-center px-3 gap-x-2 py-4 cursor-pointer ${
          active === 4
            ? "dark:bg-slate-800 bg-white"
            : "bg-transparent hover:bg-slate-600 duration-300"
        }`}
        onClick={() => logOutHandler()}
      >
        <AiOutlineLogout size={20} className="dark:text-white text-black" />
        <h5 className="800px:block hidden dark:text-white text-black">Log Out</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
