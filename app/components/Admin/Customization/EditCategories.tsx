import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/style";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import { toast } from "react-hot-toast";

type Props = {};

const EditCategories = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();
  const [categories, setCategories] = useState<any>([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("Categories updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error, refetch]);

  const handleCategoriesAdd = (id: any, value: string) => {
    setCategories((prevCategory: any) =>
      prevCategory.map((i: any) => (i._id === id ? { ...i, title: value } : i))
    );
  };

  const newCategoriesHandler = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory: any) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (
    originalCategories: any[],
    newCategories: any[]
  ) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories: any[]) => {
    return categories.some((q) => q.title === "");
  };

  const editCategoriesHandler = async () => {
    if (
      !areCategoriesUnchanged(data.layout.categories, categories) &&
      !isAnyCategoryTitleEmpty(categories)
    ) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-16 pl-5 pr-2 md:pr-3  lg:pr-4  pb-10">
          <h1 className="text-3xl font-semibold text-center mb-8">Edit Categories</h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 lg:p-4 flex flex-col space-y-4"
              >
                <input
                  className="bg-gray-100 dark:bg-gray-700 rounded-md p-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={item.title}
                  onChange={(e) => handleCategoriesAdd(item._id, e.target.value)}
                  placeholder="Enter category title..."
                />
                <button
                  className="flex justify-center items-center text-red-500 hover:text-red-600"
                  onClick={() =>
                    setCategories((prevCategory: any) =>
                      prevCategory.filter((i: any) => i._id !== item._id)
                    )
                  }
                >
                  <AiOutlineDelete className="text-xl" />
                  <span className="ml-2">Delete</span>
                </button>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center space-y-4 mt-10">
            <button
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
              onClick={newCategoriesHandler}
            >
              <IoMdAddCircleOutline className="mr-2 text-xl" />
              Add Category
            </button>
            <button
              className={`px-6 py-2 text-white rounded-lg shadow ${
                areCategoriesUnchanged(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
              onClick={
                areCategoriesUnchanged(data.layout.categories, categories) ||
                isAnyCategoryTitleEmpty(categories)
                  ? () => null
                  : editCategoriesHandler
              }
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
