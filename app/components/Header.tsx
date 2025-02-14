import Link from "next/link";
import { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import Login from ".././components/Auth/Login";
import { ThemeSwitcher } from "../utils/ThemeSwitcher";
import CustomModal from "../utils/CustomModal";
import { HiOutlineMenu, HiOutlineUserCircle } from "react-icons/hi";
import Signup from "./Auth/SignUp";
import Verification from "./Auth/Verification";
import { useSelector } from "react-redux";
import Image from "next/image";
import avatar from "../../public/avatar.png";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  route: string;
  setRoute: (route: string) => void;
};

const Header: FC<Props> = ({ activeItem, setOpen, route, open, setRoute }) => {
  const [active, setActive] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  // const { user } = useSelector((state: any) => state.auth);
  const { data: userData, isLoading, refetch } = useLoadUserQuery(undefined, {})
  const { data } = useSession();
  const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  // console.log(data);

  useEffect(() => {
    // Perform social login if the user is not logged in but session data exists
    if (!isLoading) {
      if (!userData) {
        if (data) {
          socialAuth({
            email: data?.user?.email,
            name: data?.user?.name,
            avatar: data?.user?.image,
          });
          refetch()
        }
      }
      if (data === null) {
        if (isSuccess) {
          toast.success("Login Successfully");
        }
      }
      if (data === null && !isLoading && !userData) {
        setLogout(true)
      }
    }

  }, [data, userData, isLoading, socialAuth]);

  // useEffect(() => {
  //   // Display toast after successful social login
  //   if (data === null) {
  //     if (isSuccess) {
  //       toast.success("Login Successfully");
  //     }
  //     if (data === null) {
  //       setLogout(true);
  //     }
  //   }
  //   if (error) {
  //     toast.error("An error occurred during login");
  //   }
  // }, [isSuccess, error]);

  // if (typeof window !== "undefined") {
  //   window.addEventListener("scroll", () => {
  //     if (window.scrollY > 85) {
  //       setActive(true);
  //     } else {
  //       setActive(false);
  //     }
  //   });
  // }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      {
        setOpenSidebar(false);
      }
    }
  };

  // console.log(user);

  return (

    <div className="w-full relative">

      <div
        className={`${active
          ? "dark:bg-opacity-50 bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-black fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] transition-500 duration-500"
          : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow"
          }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full">
          <div className="w-full h-[80px] flex items-center justify-between p-3">
            {/* <div>
              <Link
                href={"/"}
                className={`text-[30px] font-Poppins font-[500] text-black dark:text-white`}
              >
                KAI-ELearning
              </Link>
            </div> */}
            <div className="text-center text-3xl font-[700] text-primary">
              <a href="/">
                Kai-ELearning
              </a>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              {/* only for mobile */}
              <div className="800px:hidden">
                <HiOutlineMenu
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              <div className="pl-2">
                {userData ? (
                  <Link href="/profile">
                    <Image
                      src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                      alt="user image"
                      className="w-[30px] h-[30px] rounded-full cursor-pointer object-cover"
                      width={30}
                      height={30}
                      style={{ border: activeItem === 5 ? "2px solid #ffc107" : "none" }}
                    />
                  </Link>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="hidden 800px:block cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {/* mobile sidebar */}
        {openSidebar && (
          <div
            className="fixed w-full h-screen top-0 left-0 z-[99999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id="screen"
          >
            <div className="w-[70%] fixed z-[99999999] h-screen bg-white dark:bg-slate-900 dark:bg-opacity-90 top-0 right-0">
              <NavItems activeItem={activeItem} isMobile={true} />
              {userData ? (
                <Link href="/profile">
                  <Image
                    src={userData?.user.avatar ? userData.user.avatar.url : avatar}
                    alt="user image"
                    className="w-[30px] h-[30px] ml-5 rounded-full cursor-pointer object-cover"
                    width={30}
                    height={30}
                    style={{ border: activeItem === 5 ? "2px solid #ffc107" : "none" }}
                  />
                </Link>
              ) : (
                <HiOutlineUserCircle
                  size={25}
                  className=" 800px:block ml-5 cursor-pointer dark:text-white text-black"
                  onClick={() => setOpen(true)}
                />
              )}
              <br />
              <br />
              {/* <p className="text-[16px] px-2 pl-5 text-black dark:text-white">
                Copyright &copy; 2024 Kai-ELearning
              </p> */}
            </div>
          </div>
        )}
      </div>
      {
        route === "Login" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Login}
                refetch={refetch}
              />
            )}
          </>
        )
      }
      {
        route === "Sign-up" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Signup}
              />
            )}
          </>
        )
      }
      {
        route === "Verification" && (
          <>
            {open && (
              <CustomModal
                open={open}
                setOpen={setOpen}
                setRoute={setRoute}
                activeItem={activeItem}
                component={Verification}
              />
            )}
          </>
        )
      }
    </div >

  );
};

export default Header;
