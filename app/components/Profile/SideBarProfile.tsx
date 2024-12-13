import Image from "next/image";
import React, { FC } from "react";
import avatarDefault from "../../../public/avatar.png";
import { RiLockPasswordLine } from "react-icons/ri";

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
        <Image
          src={user.avatar || avatar ? user.avatar || avatar : avatarDefault}
          alt=""
          className="w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
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
        <RiLockPasswordLine size={20} fill="#fff" />
        <h5 className="800px:block hidden">Change Password</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
