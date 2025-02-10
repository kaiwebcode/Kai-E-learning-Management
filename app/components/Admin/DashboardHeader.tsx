"use client";

import { ThemeSwitcher } from "@/app/utils/ThemeSwitcher";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetAllNotificationsQuery,
  useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import socketIO from "socket.io-client";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen?: (value: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetAllNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotificationStatus, { isSuccess }] =
    useUpdateNotificationStatusMutation();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [audio] = useState<any>(
    typeof window !== "undefined" &&
    new Audio(
      "https://res.cloudinary.com/dkg6jv4l0/video/upload/v1716750964/notification_jvwqd0.mp3"
    )
  );

  const playNotificationSound = () => {
    audio.play();
  };

  useEffect(() => {
    if (data) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess, audio]);

  useEffect(() => {
    socketId.on("newNotification", () => {
      refetch();
      playNotificationSound();
    });
  }, [refetch, playNotificationSound]);

  const handleNotificationStatusChange = async (id: string) => {
    await updateNotificationStatus(id);
  };

  return (
    <div className="w-full flex items-center justify-end md:justify-end p-4 md:px-6 lg:px-4">
      <ThemeSwitcher />
      <DropdownMenu>

        <DropdownMenuTrigger asChild className="flex items-center">
          <div
            className="relative cursor-pointer ml-4"
            onClick={() => setOpen?.(!open)}
          >
            <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
            <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
              {notifications && notifications.length}
            </span>
          </div>
        </DropdownMenuTrigger>

        {/* {open && ( */}

        <DropdownMenuContent className="absolute lg:right-1 top-0 right-0 overflow-y-scroll   md:right-3 w-[270px] md:w-[350px] max-h-[60vh] shadow-lg rounded-lg bg-white dark:bg-gray-900 border dark:border-gray-700">
        <div className="w-full sticky top-0 z-50 dark:bg-slate-900 bg-white ">
          <h5 className="text-center text-lg font-semibold py-2.5 border-b dark:border-gray-700">
            Notifications
          </h5>
        </div>
          <ScrollArea  >
            {notifications.length > 0 ? (
              notifications.map((item: any, index: number) => (
                <DropdownMenuItem key={index} className="dark:bg-slate-900 ">

                  <div
                    key={index}
                    className="w-full gap-2 p-2.5 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200"
                  >
                    <div className="flex justify-between">
                      <p className="text-xs md:text-sm lg:text-base text-black dark:text-white">
                        {item.title}
                      </p>
                      <span
                        className="text-xs md:text-sm lg:text-sm text-blue-500 cursor-pointer"
                        onClick={() => handleNotificationStatusChange(item._id)}
                      >
                        Mark as read
                      </span>
                    </div>
                    <p className="text-xs md:text-sm lg:text-sm text-black dark:text-slate-400">
                      {item.message}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-100 mt-1">
                      {format(item.createdAt)}
                    </p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <p className="text-center text-gray-500 py-6">No new notifications</p>
            )}
          </ScrollArea>
        </DropdownMenuContent>
        {/* )} */}
      </DropdownMenu>
    </div>
  );
};

export default DashboardHeader;
