import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subTitle);
      setImage(data?.layout?.banner?.image?.url || null);
    }
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error, refetch]);

  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };

  return (
    <div className="flex flex-col lg:flex-row pl-8 lg:ml-0 items-center w-full p-4 lg:mt-20 mt-5 md:p-8 lg:space-x-8">
      {/* Background Animation */}
      {/* <div className="absolute top-20 lg:top-auto h-[30vh] sm:h-[40vh] lg:h-[500px] lg:w-[500px] xl:h-[700px] xl:w-[700px] hero_animation rounded-full left-1/2 transform -translate-x-1/2 lg:left-48 lg:translate-x-0"></div> */}

      {/* Image Section */}
      <div className="flex justify-center items-center w-full lg:w-1/2 relative">
        {image && (
          <img
            src={image}
            alt="Banner"
            className="max-w-full h-auto object-contain rounded-md "
          />
        )}
        <input
          type="file"
          id="banner"
          accept="image/*"
          onChange={handleUpdate}
          className="hidden"
        />
        <label htmlFor="banner" className="absolute bottom-4 right-4">
          <AiOutlineCamera className="text-white text-2xl cursor-pointer bg-black bg-opacity-50 p-2 rounded-full" />
        </label>
      </div>

      {/* Text Section */}
      <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full lg:w-1/2 mt-10 lg:mt-0">
        <textarea
          className="text-black dark:text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold resize-none outline-none w-full bg-transparent placeholder-gray-400 p-2"
          placeholder="Improve Your Online Learning Experience Better Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={2}
        />
        <textarea
          className="mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-base lg:text-lg resize-none outline-none w-full bg-transparent placeholder-gray-400 p-2"
          placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          rows={3}
        />
        <button
          className={`mt-6 px-4 sm:px-6 py-2 text-sm sm:text-lg rounded-lg ${
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? "bg-green-500 text-white cursor-pointer"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subTitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? handleEdit
              : undefined
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditHero;
