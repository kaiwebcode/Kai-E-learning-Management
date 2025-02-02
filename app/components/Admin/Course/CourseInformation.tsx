import { styles } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Categories", {});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (data) {
      setCategories(data.layout.categories);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-[90%] lg:w-[100%]  mx-auto my-10 lg:mt-20 md:p-3 md:mr-4 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Name */}
        <div>
          <label htmlFor="name" className={`${styles.label}`}>
            Course Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            placeholder="MERN stack LMS platform with Next.js 13"
            className={`${styles.input}`}
          />
        </div>

        {/* Course Description */}
        <div className="mb-5">
          <label htmlFor="description" className={`${styles.label}`}>
            Course Description
          </label>
          <textarea
            id="description"
            cols={30}
            rows={8}
            placeholder="Write something amazing..."
            className={`${styles.input} !h-min !py-2`}
            value={courseInfo.description}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>

        {/* Course Price and Estimated Price */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="price" className={`${styles.label}`}>
              Course Price
            </label>
            <input
              type="number"
              id="price"
              required
              value={courseInfo.price}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
              placeholder="29"
              className={`${styles.input}`}
            />
          </div>

          <div>
            <label htmlFor="estimatedPrice" className={`${styles.label}`}>
              Estimated Price (Optional)
            </label>
            <input
              type="number"
              id="estimatedPrice"
              value={courseInfo.estimatedPrice}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
              placeholder="79"
              className={`${styles.input}`}
            />
          </div>
        </div>

        {/* Course Tags and Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="tags" className={`${styles.label}`}>
              Course Tags
            </label>
            <input
              type="text"
              id="tags"
              required
              value={courseInfo.tags}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              placeholder="MERN, Next 13, Socket.io, Tailwind CSS, LMS"
              className={`${styles.input}`}
            />
          </div>

          <div>
            <label htmlFor="categories" className={`${styles.label}`}>
              Course Categories
            </label>
            <select
              id="categories"
              value={courseInfo.category}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, categories: e.target.value })
              }
              className={`${styles.input}` }
              // className="w-full text-black dark:text-white border rounded h-[40px] px-2 outline-none mt-[10px] font-Poppins"
            >
              <option value="" className="dark:bg-slate-700 dark:text-white">Select Category</option>
              {categories.map((item: any) => (
                <option value={item.title} key={item._id} className="dark:bg-slate-700 dark:text-white">
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Course Level and Demo URL */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label htmlFor="level" className={`${styles.label}`}>
              Course Level
            </label>
            <input
              type="text"
              id="level"
              required
              value={courseInfo.level}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
              placeholder="Beginner / Intermediate / Expert"
              className={`${styles.input}`}
            />
          </div>

          <div>
            <label htmlFor="demoUrl" className={`${styles.label}`}>
              Demo URL
            </label>
            <input
              type="text"
              id="demoUrl"
              required
              value={courseInfo.demoUrl}
              onChange={(e: any) =>
                setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
              }
              placeholder="https://example.com/demo"
              className={`${styles.input}`}
            />
          </div>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <input
            type="file"
            accept="image/*"
            id="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] border dark:border-white border-gray-300 p-3 flex items-center justify-center ${
              dragging ? "bg-blue-500 text-white" : "bg-transparent"
            } cursor-pointer`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <img
                src={courseInfo.thumbnail}
                alt="Thumbnail"
                className="max-h-full w-full object-cover rounded-md"
              />
            ) : (
              <span className="text-gray-700 dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <input
            type="submit"
            value="Next"
            className="w-full lg:w-[180px] h-[40px] bg-[#37a39a] text-center text-white rounded-md mt-4 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
};

export default CourseInformation;
