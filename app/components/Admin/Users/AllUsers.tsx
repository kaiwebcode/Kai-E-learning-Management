import React, { FC, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useTheme } from "next-themes";
import { format } from "timeago.js";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserRoleMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, TrashIcon } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AiOutlineMail } from "react-icons/ai";
import { Box, Modal } from "@mui/material";

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
  const [updateUserRole, { error: updateError, isSuccess }] = useUpdateUserRoleMutation();
  const { isLoading, data, refetch } = useGetAllUsersQuery({}, { refetchOnMountOrArgChange: true });
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] = useDeleteUserMutation({});
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    if (updateError) toast.error((updateError as any).data.message);
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
    if (deleteError) toast.error((deleteError as any).data.message);
  }, [updateError, isSuccess, deleteSuccess, deleteError]);

  // **Fix: Ensure users are unique**
  const usersSet = new Set();

  const rows = (data?.users || [])
    .filter((user: any) => {
      if (usersSet.has(user._id)) return false;
      usersSet.add(user._id);
      return isTeam ? user.role === "admin" : true;
    })
    .map((user: any) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      courses: user.courses.length,
      created_at: format(user.createdAt),
    }));

  const handleSubmit = async () => await updateUserRole({ email, role });
  const handleDelete = async () => await deleteUser(userId);

  const filteredRows = rows.filter((user: any) =>
    user.name.toLowerCase().includes(filterValue.toLowerCase()) ||
    user.email.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="ml-10 p-2 md:px-10">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-4">
          {isTeam && (
            <div className="flex justify-end">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                onClick={() => setActive(!active)}
              >
                Add New Member
              </button>
            </div>
          )}
          <div className="flex items-center py-3">
            <Input
              placeholder="Email Search..."
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="max-w-xs border border-gray-500"
            />
          </div>
          <Table>
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
              {filteredRows.length > 0 ? (
                filteredRows.map((row: any) => (
                  <TableRow key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <TableCell className="p-4">{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.courses}</TableCell>
                    <TableCell>{row.created_at}</TableCell>
                    <TableCell className="flex space-x-2">
                      <DropdownMenu>
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
                              setUserId(row.id);
                            }}
                          >
                            <TrashIcon className="h-4 w-4 text-muted-foreground" />
                            Delete
                          </DropdownMenuItem>
                          <DropdownMenuItem className=" hover:dark:bg-gray-700">
                            <a href={`mailto:${row.email}`} className="flex gap-2">
                              <AiOutlineMail size={20} />
                              Email
                            </a>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <TableCell colSpan={7} className="text-center py-10">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

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
              <select className="w-full p-2 border rounded-md mb-4" onChange={(e) => setRole(e.target.value)}>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </Box>
        </Modal>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="dark:bg-slate-800 ">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this user? This action cannot be undone.</p>
          <DialogFooter className="flex justify-end space-x-2">
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AllUsers;
