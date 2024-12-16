"use client";

import { FC, useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, Typography, IconButton } from "@mui/material";
import {
  HomeOutlined as HomeIcon,
  Menu as MenuIcon,
  PersonOutline as ProfileIcon,
  ExitToApp as LogoutIcon,
} from "@mui/icons-material";
import {
  HomeOutlinedIcon,
  GroupsIcon,
  OndemandVideoIcon,
  VideoCallIcon,
  WebIcon,
  QuizIcon,
  WysiwygIcon,
  ManageHistoryIcon,
  BarChartOutlinedIcon,
  ReceiptOutlinedIcon,
  MapOutlinedIcon,
  PeopleOutlinedIcon,
  ExitToAppIcon,
} from "./Icon";
import avatarDefault from "../../../../public/avatar.png";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ItemProps {
  title: string;
  to: string;
  icon: JSX.Element;
  selected: string;
  setSelected: (value: string) => void;
}

const Item: FC<ItemProps> = ({ title, to, icon, selected, setSelected }) => (
  <MenuItem
    active={selected === title}
    onClick={() => setSelected(title)}
    icon={icon}
    className="hover:!bg-[#f0f0f0] dark:hover:!bg-[#2e3b55]"
  >
    <Link href={to}>
      <Typography className="!text-[13px] font-medium">{title}</Typography>
    </Link>
  </MenuItem>
);

const AdminSidebar: FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const logoutHandler = async () => {
    // Cookies.remove("accessToken");
    // Cookies.remove("refreshToken");
    // window.location.reload();
  };

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          backgroundColor: theme === "dark" ? "#1f2937" : "#ffffff",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-menu-item": {
          color: theme === "dark" ? "#d1d5db" : "#111827",
        },
        "& .pro-menu-item.active": {
          color: "#4f46e5",
        },
      }}
    >
      {/* Overlay for smaller screens */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-[900] bg-black bg-opacity-50 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <ProSidebar
        collapsed={isCollapsed}
        breakPoint="lg"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          zIndex: 1000,
        }}
      >
        {/* Sidebar Header */}
        <Menu>
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuIcon /> : undefined}
            style={{ margin: "10px 0" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  component="div"
                  className="font-bold text-[#4f46e5] uppercase"
                >
                  <div className="text-3xl font-bold dark:text-white text-black">
                    ELearning
                  </div>
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuIcon className="text-black dark:text-[#ffffffc1] ml-2" />
                </IconButton>
              </Box>
            )}
          </MenuItem>
        </Menu>

        {/* User Info */}
        {!isCollapsed && (
          <Box textAlign="center" mb={3}>
            <Image
              alt="User Avatar"
              src={user?.avatar?.url || avatarDefault}
              width={80}
              height={80}
              className="rounded-full mx-auto"
            />
            <Typography
              className="mt-2 text-lg font-medium"
              component="div" // Fix: Change from default "p" to "div"
            >
              <div className="text-xl pt-2">{user?.name || "Admin"}</div>
            </Typography>

            <Typography
              variant="caption"
              className="text-gray-500 capitalize"
              component="div" // Fix: Change from default "p" to "div"
            >
              <div className="text-2xl pt-2">
                - {user?.role || "Admin Role"}
              </div>
            </Typography>
          </Box>
        )}

        {/* Sidebar Menu */}
        <Menu iconShape="circle">
          {/* Render Items */}
          <Item
            title="Dashboard"
            to="/admin"
            icon={<HomeIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />

          <Typography
            variant="h5"
            sx={{ m: "15px 0 1px 20px" }}
            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400]  pt-2"
          >
            {!isCollapsed && "Data"}
          </Typography>
          <Item
            title="Users"
            to="/admin/users"
            icon={<GroupsIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />

          <Item
            title="Invoices"
            to="/admin/invoices"
            icon={
              <ReceiptOutlinedIcon className="text-black dark:text-white" />
            }
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h5"
            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] pt-2"
            sx={{ m: "15px 0 5px 20px" }}
          >
            {!isCollapsed && "Content"}
          </Typography>
          <Item
            title="Create Course"
            to="/admin/create-course"
            icon={<VideoCallIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Live Courses"
            to="/admin/courses"
            icon={<OndemandVideoIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h5"
            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] pt-2"
            sx={{ m: "15px 0 5px 20px" }}
          >
            {!isCollapsed && "Customization"}
          </Typography>
          <Item
            title="Hero"
            to="/admin/hero"
            icon={<WebIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="FAQ"
            to="/admin/faq"
            icon={<QuizIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Categories"
            to="/admin/categories"
            icon={<WysiwygIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h5"
            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] pt-2"
            sx={{ m: "15px 0 5px 20px" }}
          >
            {!isCollapsed && "Controllers"}
          </Typography>
          <Item
            title="Manage Team"
            to="/admin/team"
            icon={<PeopleOutlinedIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h6"
            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] pt-2"
            sx={{ m: "15px 0 5px 20px" }}
          >
            {!isCollapsed && "Analytics"}
          </Typography>
          <Item
            title="Courses Analytics"
            to="/admin/courses-analytics"
            icon={
              <BarChartOutlinedIcon className="text-black dark:text-white" />
            }
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Orders Analytics"
            to="/admin/orders-analytics"
            icon={<MapOutlinedIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Users Analytics"
            to="/admin/users-analytics"
            icon={<ManageHistoryIcon className="text-black dark:text-white" />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h6"
            className="!text-[18px] text-black dark:text-[#ffffffc1] capitalize !font-[400] pt-2"
            sx={{ m: "15px 0 5px 20px" }}
          >
            {!isCollapsed && "Extras"}
          </Typography>
          <div onClick={logoutHandler}>
            <Item
              title="Logout"
              to="/"
              icon={<ExitToAppIcon className="text-black dark:text-white" />}
              selected={selected}
              setSelected={setSelected}
            />
          </div>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default AdminSidebar;
