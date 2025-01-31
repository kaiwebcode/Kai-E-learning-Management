"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { format } from "timeago.js";
import { AiOutlineMail } from "react-icons/ai";
// import { Loader } from "@/components/ui/loader";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import Loader from "../../Loader/Loader";
import { Box } from "@mui/material";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme, setTheme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const temp = data.orders.map((item: any) => {
        const user = usersData?.users.find((user: any) => user._id === item.userId);
        const course = coursesData?.courses.find((course: any) => course._id === item.courseId);
        return {
          id: item._id,
          userName: user?.name,
          userEmail: user?.email,
          courseTitle: course?.name,
          price: `$${course?.price}`,
          createdAt: format(item.createdAt),
        };
      });
      setOrderData(temp);
    }
  }, [data, usersData, coursesData]);

  return (
    <div className={!isDashboard ? "mt-[10px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4">
          <Box
            // m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            component="div"
            sx={{ overflowY: "auto" }}
            overflow={"hidden"}
          >
            <Table className="w-full min-w-[600px]">
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <TableHead className="p-4">ID</TableHead>
                  <TableHead>Name</TableHead>
                  {!isDashboard && <TableHead>Email</TableHead>}
                  {!isDashboard && <TableHead>Course Title</TableHead>}
                  <TableHead>Price</TableHead>
                  {isDashboard ? <TableHead>Created At</TableHead> : <TableHead>Email</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderData.map((item: any) => (
                  <TableRow key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                    <TableCell className="p-4">{item.id}</TableCell>
                    <TableCell>{item.userName}</TableCell>
                    {!isDashboard && <TableCell>{item.userEmail}</TableCell>}
                    {!isDashboard && <TableCell>{item.courseTitle}</TableCell>}
                    <TableCell>{item.price}</TableCell>
                    {isDashboard ? (
                      <TableCell>{item.createdAt}</TableCell>
                    ) : (
                      <TableCell>
                        <a href={`mailto:${item.userEmail}`} className="text-blue-500 hover:underline">
                          <AiOutlineMail size={20} />
                        </a>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </div>
      )}
    </div>
  );
};

export default AllInvoices;
