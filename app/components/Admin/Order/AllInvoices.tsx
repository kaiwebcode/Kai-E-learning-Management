"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { format } from "timeago.js";
import { AiOutlineMail } from "react-icons/ai";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Box } from "@mui/material";
import Loader from "../../Loader/Loader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: usersData } = useGetAllUsersQuery({});
  const { data: coursesData } = useGetAllCoursesQuery({});
  const [orderData, setOrderData] = useState<any>([]);
  const [filterValue, setFilterValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPage = 12; // Number of rows per page

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

  const filteredOrders = orderData.filter((item: any) =>
    item.userName?.toLowerCase().includes(filterValue.toLowerCase()) ||
    item.userEmail?.toLowerCase().includes(filterValue.toLowerCase()) ||
    item.courseTitle?.toLowerCase().includes(filterValue.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / rowsPerPage);
  const paginatedOrders = filteredOrders.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  return (
    <div className={!isDashboard ? "mt-[10px] mb-16" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-4">
          <Box height={isDashboard ? "46vh" : "80vh"} component="div" sx={{ overflowY: "auto" }} overflow={"hidden"}>
            <div className="flex items-center py-3">
              <Input
                placeholder="Email Search..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                className="max-w-xs border border-gray-500 w-[95%]"
              />
            </div>
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
                {paginatedOrders.length > 0 ? (
                  paginatedOrders.map((item: any) => (
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
                  ))
                ) : (
                  <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <TableCell colSpan={6} className="text-center py-10">
                      No users found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>

          {/* Pagination controls */}
          <div className="flex items-center justify-end space-x-2 pt-5">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
              disabled={currentPage === 0}
              className="dark:bg-slate-800 hover:dark:bg-slate-600"
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {currentPage + 1} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={currentPage >= totalPages - 1}
              className="dark:bg-slate-800 hover:dark:bg-slate-600"
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllInvoices;
