import React, { FC, useEffect, useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      toast.error((updateError as any).data.message);
    }
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully!");
      setOpen(false);
    }
    if (deleteError) {
      toast.error((deleteError as any).data.message);
    }
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  const rows: {
    id: string;
    name: string;
    email: string;
    role: string;
    courses: number;
    created_at: string;
  }[] = [];

  if (isTeam) {
    data?.users
      .filter((user: any) => user.role === "admin")
      .forEach((user: any) => {
        rows.push({
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          courses: user.courses.length,
          created_at: format(user.createdAt),
        });
      });
  } else {
    data?.users.forEach((user: any) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user.courses.length,
        created_at: format(user.createdAt),
      });
    });
  }

  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };

  const handleDelete = async () => {
    await deleteUser(userId);
  };

  return (
    <div className="ml-10 p-2 md:px-10">
      {isLoading ? (
        <Loader />
      ) : (
        <Box className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4">
          {isTeam && (
            <div className="flex justify-end mb-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={() => setActive(!active)}
              >
                Add New Member
              </button>
            </div>
          )}
          <div>
            <Table className="w-full min-w-[600px]">
              <TableHeader>
                <TableRow className="bg-gray-100 dark:bg-gray-800">
                  <TableHead className="p-4">ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Courses</TableHead>
                  <TableHead>Joined At</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <TableCell className="p-4">{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.courses}</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell className="flex space-x-2">
                      <button
                        onClick={() => {
                          setOpen(true);
                          setUserId(row.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <AiOutlineDelete size={20} />
                      </button>
                      <a href={`mailto:${row.email}`} className="text-blue-500 hover:text-blue-700">
                        <AiOutlineMail size={20} />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Add User Modal */}
          {active && (
            <Modal open={active} onClose={() => setActive(false)}>
              <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg w-96">
                  <h2 className="text-lg font-semibold mb-4">Add New Member</h2>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="w-full p-2 border rounded-md mb-4"
                  />
                  <select
                    className="w-full p-2 border rounded-md mb-4"
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition"
                    onClick={handleSubmit}
                  >
                    Submit
                  </button>
                </div>
              </Box>
            </Modal>
          )}

          {/* Delete Confirmation Modal */}
          {open && (
            <Modal open={open} onClose={() => setOpen(false)}>
              <Box className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg w-96">
                  <h2 className="text-xl font-semibold mb-8">
                    Are you sure you want to delete this user?
                  </h2>
                  <div className="flex justify-between ">
                    <button
                      className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
