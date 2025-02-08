"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useDeleteCourseMutation, useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import Link from "next/link";
import Loader from "../../Loader/Loader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, TrashIcon } from "lucide-react";

interface CourseRow {
  id: string;
  title: string;
  ratings: number;
  purchased: number;
  created_at: string;
}

const AllCourses = () => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const { isLoading, data, refetch } = useGetAllCoursesQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const rows: CourseRow[] = data?.courses.map((item: any) => ({
    id: item._id,
    title: item.name,
    ratings: item.ratings,
    purchased: item.purchased,
    created_at: format(item.createdAt),
  })) || [];

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      if ("data" in error) {
        toast.error((error as any).data.message);
      }
    }
  }, [isSuccess, error, refetch]);

  const handleDelete = async () => {
    await deleteCourse(courseId);
  };

  return (
    <div className=" w-full p-4">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-6">

          <div className="overflow-x-auto">
            <Table className="min-w-full rounded-lg shadow-lg">
              <TableHeader>
                <TableRow className="bg-gray-200 dark:bg-gray-800">
                  <TableHead className="p-4">ID</TableHead>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Ratings</TableHead>
                  <TableHead>Purchased</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                    <TableCell className="p-4">{row.id}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.ratings}</TableCell>
                    <TableCell>{row.purchased}</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell className="flex justify-center space-x-3">
                      {/* 
                    <Link href={`/admin/edit-course/${row.id}`} className="text-blue-500 hover:text-blue-700">
                    <FiEdit2 size={20} />
                    </Link>
                    <button
                    onClick={() => {
                      setOpen(true);
                        setCourseId(row.id);
                      }}
                      className="text-red-500 hover:text-red-700"
                      >
                      <AiOutlineDelete size={20} />
                      </button> */}
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                          <Button className="h-8 w-8 p-0 bg-transparent hover:text-white text-black dark:text-gray-200 dark:hover:bg-slate-600">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-100 dark:bg-gray-800">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-700 dark:bg-gray-600" />
                          <DropdownMenuItem
                            className="flex items-center gap-2 hover:dark:bg-gray-700"
                            onClick={() => {
                              setOpen(true);
                              setCourseId(row.id);
                            }}
                          >
                            <TrashIcon className="h-4 w-4 text-muted-foreground" />
                            Delete
                          </DropdownMenuItem>
                          <Link href={`/admin/edit-course/${row.id}`} className="flex gap-2 hover:dark:bg-gray-700">
                            <DropdownMenuItem className=" hover:dark:bg-gray-700">
                              <FiEdit2 size={16} /> Edit
                            </DropdownMenuItem>
                          </Link>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dark:bg-slate-800 ">
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this course? This action cannot be undone.</p>
          <DialogFooter className="flex justify-end lg:space-x-2 gap-y-3">
            <Button variant="outline" className="dark:bg-white dark:text-black" onClick={() => setOpen(false)}>Cancel</Button>
            <Button className="bg-red-600 text-white hover:bg-red-500" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllCourses;
