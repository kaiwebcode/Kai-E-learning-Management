import React, { FC, useState } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import { styles } from "../../../../app/styles/style";
import Ratings from "../../../../app/utils/Ratings";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { Loader2 } from "lucide-react";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdit?: boolean;
};

const CoursePreview: FC<Props> = ({
  courseData,
  handleCourseCreate,
  setActive,
  active,
  isEdit,
}) => {
  const [loading, setLoading] = useState(false);
  const dicountPercentenge =
    ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) *
    100;

  const discountPercentengePrice = dicountPercentenge.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };

  const createCourse = async () => {
    setLoading(true);
    await handleCourseCreate(); // Wait for the course creation process
    setLoading(false);
  };


  return (
    <div className="w-[84%] m-auto py-1 mb-5">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title} />
        </div>

        {/* Price and Discount */}
        <div className="flex items-center flex-wrap gap-2 pt-5">
          <h1 className="text-[25px]">{courseData?.price === 0 ? "Free" : `${courseData?.price}$`}</h1>
          <h5 className="text-[20px] line-through opacity-80">{courseData?.estimatedPrice}$</h5>
          <h4 className="text-[22px]">{discountPercentengePrice}% Off</h4>
        </div>

        {/* Buy Now Button */}
        <div className="flex items-center my-3">
          <div
            className={`${styles.button} !w-[180px] font-Poppins !bg-[crimson] cursor-not-allowed`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>

        {/* Discount Code */}
        <div className="flex items-center flex-wrap gap-3 my-3">
          <input
            type="text"
            placeholder="Discount code..."
            className={`${styles.input} w-full max-w-[300px] !mt-0`}
          />
          <div className={`${styles.button} !w-[120px] font-Poppins cursor-pointer`}>
            Apply
          </div>
        </div>

        {/* Course Features */}
        <p className="pb-1">• Source code included</p>
        <p className="pb-1">• Full lifetime access</p>
        <p className="pb-1">• Certificate of completion</p>
        <p className="pb-3 800px:pb-1">• Premium Support</p>
      </div>

      {/* Course Details */}
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className="text-[25px] font-Poppins font-[600]">{courseData?.name}</h1>
          <div className="flex items-center justify-between pt-3 flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Students</h5>
          </div>

          <h1 className="text-[25px] font-Poppins font-[600] pt-5">
            What you will learn from this course?
          </h1>
          {courseData?.benefits?.map((item: any, index: number) => (
            <div className="w-full flex items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item.title}</p>
            </div>
          ))}

          <h1 className="text-[25px] font-Poppins font-[600] pt-5">
            What are the prerequisites for starting this course?
          </h1>
          {courseData?.prerequisites?.map((item: any, index: number) => (
            <div className="w-full flex items-center py-2" key={index}>
              <div className="w-[15px] mr-1">
                <IoCheckmarkDoneOutline size={20} />
              </div>
              <p className="pl-2">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Course Description */}
        <div className="w-full pt-5">
          <h1 className="text-[25px] font-Poppins font-[600]">Course Details</h1>
          <p className="text-[18px] mt-2 whitespace-pre-line">{courseData?.description}</p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex items-center justify-between gap-3 flex-wrap mt-8">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-[#fff] rounded cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className={`w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-[#fff] rounded cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ''
            }`}
          onClick={!loading ? createCourse : undefined}
        >
          {loading ? <Loader2 className="animate-spin" size={20} /> : isEdit ? "Update" : "Create"}
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
