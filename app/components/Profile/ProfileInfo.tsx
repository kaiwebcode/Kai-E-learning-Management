import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import avatarIcons from "../../../public/avatar.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import toast from "react-hot-toast";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editProfile, { isSuccess: success, error: editError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
      toast.success("Profile updated successfully!");
    }
    if (error || editError) {
      console.error(error);
      toast.error("Failed to update profile.");
    }
  }, [isSuccess, error, success, editError]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("Profile updated with name:", name);
    if (name !== "") {
      await editProfile({
        name: name,
      });
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-slate-700 py-20 px-5 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Avatar Section */}
      <div className="relative w-36 h-36">
        <Image
          src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcons}
          alt="User Avatar"
          width={128}
          height={128}
          className="w-full h-full object-cover border-4 border-[#37a39a] rounded-full"
        />
        <input
          type="file"
          id="avatar"
          className="hidden"
          onChange={imageHandler}
          accept="image/png, image/jpg, image/jpeg, image/webp"
        />
        <label htmlFor="avatar">
          <div className="absolute bottom-0 right-0 w-8 h-8 bg-gray-700 text-white flex items-center justify-center rounded-full cursor-pointer">
            <AiOutlineCamera size={20} />
          </div>
        </label>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="w-full mt-6">
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          {/* Full Name Input */}
          <div>
            <label className="block text-gray-300 ">Full Name</label>
            <input
              type="text"
              className={`${styles.input} w-full p-3 rounded border border-gray-600 bg-slate-800 text-white`}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-gray-300 ">Email Address</label>
            <input
              type="text"
              className={`${styles.input} w-full p-3 rounded border border-gray-600 bg-slate-800 text-gray-500`}
              required
              readOnly
              value={user?.email}
            />
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
  );
};

export default ProfileInfo;
