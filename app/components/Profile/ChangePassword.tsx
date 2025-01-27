import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

type Props = {};

const ChangePassword: FC<Props> = (Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [show, setShow] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
    // if (oldPassword === "" || newPassword === "" || confirmPassword === "") {
    //   toast.error("Please fill all the fields");
    // }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not Match");
    } else {
      await updatePassword({ oldPassword, newPassword });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div className="w-full 800px:px-5 800px:pl-0">
      <div className="w-full flex flex-col items-center  dark:bg-slate-700 bg-slate-400 py-14 px-5 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="block text-2xl 800px:text-[32px] text-center text-black dark:text-white font-[500] mb-6">
          Change Password
        </h1>
        {/* <div className="w-full"> */}
        <form
          onSubmit={passwordChangeHandler}
          aria-required
          className="w-full mt-4"
        >
          <div className="flex flex-col gap-4 max-w-md mx-auto mt-4">
            {/* Full Name Input */}
            <div className="w-full relative mb-1">
              <label
                className="block dark:text-gray-400 text-black"
                htmlFor="email"
              >
                Enter your old password
              </label>
              <input
                type={!show ? "password" : "text"}
                className={`${styles.input} w-full p-3 rounded border border-gray-600 bg-slate-800 text-white`}
                required
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
            </div>

            {/* Email Input */}
            <div className="w-full relative mb-1">
              <label className="block dark:text-gray-400 text-black">
                Enter your new password
              </label>
              <input
                type={!show ? "password" : "text"}
                className={`${styles.input} w-full p-3 rounded border border-gray-600 bg-slate-800 text-gray-500`}
                required
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
            </div>

            <div className="w-full relative mb-1">
              <label className="block dark:text-gray-400 text-black ">
                Enter your confirm password
              </label>
              <input
                type={!show ? "password" : "text"}
                className={`${styles.input} w-full p-3 rounded border border-gray-600 bg-slate-800 text-gray-500`}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {!show ? (
                <AiOutlineEyeInvisible
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(true)}
                />
              ) : (
                <AiOutlineEye
                  className="absolute bottom-3 right-2 z-1 cursor-pointer"
                  size={20}
                  onClick={() => setShow(false)}
                />
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 mt-4 bg-[#37a39a] text-white font-semibold rounded-lg hover:bg-[#2f8a7f] transition duration-300"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
