import { styles } from "@/app/styles/style";
import React, { FC } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  const handlePrerequisitesChange = (index: number, value: string) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill the fields to proceed to the next step!");
    }
  };

  return (
    <div className="w-full px-4 md:px-8 lg:px-12 lg:pt-28 pb-8 m-auto mt-10">
      {/* Benefits Section */}
      <div className="mb-10 lg:mb-20">
        <label
          className={`${styles.label} text-lg md:text-xl font-semibold`}
          htmlFor="benefits"
        >
          What are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-4 my-2">
            <input
              type="text"
              name="Benefit"
              placeholder="You will be able to build a full stack LMS Platform..."
              required
              className={`${styles.input} w-full p-2 md:p-3 rounded border`}
              value={benefit.title}
              onChange={(e) => handleBenefitChange(index, e.target.value)}
            />
            <AiOutlinePlusCircle
              className="text-2xl text-[#37a39a] cursor-pointer hover:text-[#2e8b83]"
              onClick={handleAddBenefit}
            />
          </div>
        ))}
      </div>

      {/* Prerequisites Section */}
      <div className="mb-8 ">
        <label
          className={`${styles.label} text-lg md:text-xl font-semibold`}
          htmlFor="prerequisites"
        >
          What are the prerequisites for starting this course?
        </label>
        <br />
        {prerequisites.map((prerequisite: any, index: number) => (
          <div key={index} className="flex items-center gap-4 my-2">
            <input
              type="text"
              name="Prerequisite"
              placeholder="You need basic knowledge of MERN stack"
              required
              className={`${styles.input} w-full p-2 md:p-3 rounded border`}
              value={prerequisite.title}
              onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            />
            <AiOutlinePlusCircle
              className="text-2xl text-[#37a39a] cursor-pointer hover:text-[#2e8b83]"
              onClick={handleAddPrerequisites}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="w-full flex flex-col md:flex-row items-center pt-4 justify-between gap-3">
        <div
          className="w-full md:w-1/3 flex items-center justify-center h-[40px] bg-[#37a39a] text-white rounded-lg cursor-pointer hover:bg-[#2e8b83] transition duration-300"
          onClick={prevButton}
        >
          Prev
        </div>
        <div
          className="w-full md:w-1/3 flex items-center justify-center h-[40px] bg-[#37a39a] text-white rounded-lg cursor-pointer hover:bg-[#2e8b83] transition duration-300"
          onClick={handleOptions}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
