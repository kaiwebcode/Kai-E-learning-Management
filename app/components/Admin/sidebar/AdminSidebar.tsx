"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";
import {
  LayoutDashboard,
  Users,
  FileText,
  VideoIcon,
  Video,
  Globe,
  BarChart3,
  BarChart2,
  BarChart,
  HelpCircle,
  Folder,
  LogOut,
  Menu,
} from "lucide-react";
import { FaUsersCog } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@/components/ui/dialog";
import avatarDefault from "../../../../public/avatar.png";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import { useLogOutQuery } from "@/redux/features/auth/authApi";

interface SidebarItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (value: string) => void;
}

const SidebarItem: FC<SidebarItemProps> = ({ title, to, icon, selected, setSelected }) => (
  <Link href={to} onClick={() => setSelected(title)}>
    <Button
      variant={selected === title ? "default" : "ghost"}
      className="w-full flex justify-start gap-2 text-base px-4 py-2"
    >
      {icon}
      {title}
    </Button>
  </Link>
);

const AdminSidebar: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const [logout, setLogout] = useState(false);
  const { theme } = useTheme();
  const { } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const logoutHandler = async () => {
    // Handle logout logic
    setLogout(true);
    await signOut();
    // Cookies.remove("accessToken");
    // Cookies.remove("refreshToken");
    // window.location.reload();
    // redirect("/")
  };

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="fixed top-4 left-4 z-50 lg:hidden bg-slate-800">
            <Menu className="h-6 w-6 " />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 p-4 overflow-y-auto bg-white dark:bg-gray-900">
          <DialogTitle className="sr-only">Admin Sidebar</DialogTitle>
          <SidebarContent user={user} selected={selected} setSelected={setSelected} logoutHandler={logoutHandler} />
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 h-screen py-4 px-3 border-r shadow-sm fixed top-0 left-0 bg-white dark:bg-gray-900 lg:overflow-y-auto sm:overflow-y-hidden">
        <SidebarContent user={user} selected={selected} setSelected={setSelected} logoutHandler={logoutHandler} />
      </aside>
    </>
  );
};

const SidebarContent: FC<{ user: any; selected: string; setSelected: (value: string) => void; logoutHandler: () => void }> = ({
  user,
  selected,
  setSelected,
  logoutHandler,
}) => (
  <div className="flex flex-col h-full">
    {/* Logo */}
    <div className="text-center text-2xl font-bold text-primary">
      <a href="/">
        Kai <br /> ELearning
      </a>
    </div>

    {/* User Info */}
    <div className="text-center my-4">
      <Image
        alt="User Avatar"
        src={user?.avatar?.url || avatarDefault}
        width={80}
        height={80}
        className="rounded-full mx-auto"
      />
      <div className="mt-2 text-lg font-medium">{user?.name || "Admin"}</div>
      <div className="text-sm text-muted-foreground">{user?.role || "Admin Role"}</div>
    </div>

    {/* Sidebar Menu */}
    <nav className="flex flex-col  gap-1 flex-grow">
      <SidebarItem title="Dashboard" to="/admin" icon={<LayoutDashboard />} selected={selected} setSelected={setSelected} />

      <div className="py-4">
        <h2 className="text-2xl flex pl-4 font-semibold pb-1">Data</h2>
        <SidebarItem title="Users" to="/admin/users" icon={<Users />} selected={selected} setSelected={setSelected} />
        <SidebarItem title="Invoices" to="/admin/invoices" icon={<FileText />} selected={selected} setSelected={setSelected} />
      </div>

      <div className="py-4">
        <h2 className="text-2xl flex pl-4 font-semibold pb-1">Content</h2>
        <SidebarItem title="Create Course" to="/admin/create-course" icon={<VideoIcon />} selected={selected} setSelected={setSelected} />
        <SidebarItem title="Live Courses" to="/admin/courses" icon={<Video />} selected={selected} setSelected={setSelected} />
      </div>

      <div className="py-4">
        <h2 className="text-2xl flex pl-4 font-semibold pb-1">Customization</h2>
        <SidebarItem title="Hero" to="/admin/hero" icon={<Globe />} selected={selected} setSelected={setSelected} />
        <SidebarItem title="FAQ" to="/admin/faq" icon={<HelpCircle />} selected={selected} setSelected={setSelected} />
        <SidebarItem title="Categories" to="/admin/categories" icon={<Folder />} selected={selected} setSelected={setSelected} />
      </div>

      <div className="py-4">
        <h2 className="text-2xl flex pl-4 font-semibold pb-1">Controllers</h2>
        <SidebarItem title="Manage Team" to="/admin/team" icon={<FaUsersCog />} selected={selected} setSelected={setSelected} />
      </div>

      <div className="py-4">
        <h2 className="text-2xl flex pl-4 font-semibold pb-1">Data Analytics</h2>
        <SidebarItem title="Courses Analytics" to="/admin/courses-analytics" icon={<BarChart3 />} selected={selected} setSelected={setSelected} />
        <SidebarItem title="Orders Analytics" to="/admin/orders-analytics" icon={<BarChart />} selected={selected} setSelected={setSelected} />
        <SidebarItem title="Users Analytics" to="/admin/users-analytics" icon={<BarChart2 />} selected={selected} setSelected={setSelected} />
      </div>

    </nav>

    {/* Logout */}
    <div className="pb-6 ">
      <Button variant="destructive" className="w-full flex justify-start gap-2" onClick={logoutHandler}>
        <LogOut />
        Logout
      </Button>
    </div>
  </div>
);

export default AdminSidebar;
