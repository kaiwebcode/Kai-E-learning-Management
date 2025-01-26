import React, { FC, useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { MdOutlineOndemandVideo } from "react-icons/md";

// Define the type for video items
type VideoItem = {
  _id: string;
  title: string;
  videoLength: number;
  videoSection: string;
};

// Define props for the component
type Props = {
  data: VideoItem[];
  activeVideo?: number;
  setActiveVideo?: (videoIndex: number) => void;
  isDemo?: boolean;
};

const CourseContentList: FC<Props> = ({ data, activeVideo, setActiveVideo, isDemo }) => {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set<string>());

  // Extract unique video sections
  const videoSections = Array.from(new Set(data.map((item) => item.videoSection)));

  let totalCount = 0; // Keeps track of the total video count across sections

  const toggleSection = (section: string) => {
    const updatedSections = new Set(visibleSections);
    if (updatedSections.has(section)) {
      updatedSections.delete(section);
    } else {
      updatedSections.add(section);
    }
    setVisibleSections(updatedSections);
  };

  return (
    <div className={`mt-6 w-full ${!isDemo && "sticky top-24 left-0 z-30 ml-[-30px]"}`}>
      {videoSections.map((section) => {
        const isSectionVisible = visibleSections.has(section);

        // Filter videos belonging to the current section
        const sectionVideos = data.filter((item) => item.videoSection === section);

        const sectionVideoCount = sectionVideos.length;
        const sectionVideoLength = sectionVideos.reduce((total, video) => total + video.videoLength, 0);
        const sectionStartIndex = totalCount; // Starting index of the section's videos
        totalCount += sectionVideoCount; // Update the total count for the next section

        const sectionContentHours = (sectionVideoLength / 60).toFixed(2);

        return (
          <div
            key={section}
            className={`${!isDemo && " mb-6 dark:border-gray-600 lg:pb-8 border md:p-6 p-4 border-slate-600 rounded-md lg:px-8"}`}
          >
            {/* Section Header */}
            <div className="flex justify-between items-center mt-2">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">{section}</h2>
              <button
                onClick={() => toggleSection(section)}
                className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
              >
                {isSectionVisible ? <BsChevronUp size={20} /> : <BsChevronDown size={20} />}
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {sectionVideoCount} Lessons ·{" "}
              {sectionVideoLength < 60 ? sectionVideoLength : sectionContentHours}{" "}
              {sectionVideoLength > 60 ? "hours" : "minutes"}
            </p>

            {/* Videos List */}
            {isSectionVisible && (
              <div className="mt-3">
                {sectionVideos.map((video, index) => {
                  const videoIndex = sectionStartIndex + index;
                  const videoContentLength = (video.videoLength / 60).toFixed(2);
                  const isActive = videoIndex === activeVideo;

                  return (
                    <div
                      key={video._id}
                      className={`p-4 rounded-lg cursor-pointer transition-all border border-slate-600  ${
                        isActive
                          ? "bg-blue-100 dark:bg-slate-800"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => !isDemo && setActiveVideo?.(videoIndex)}
                    >
                      <div className="flex items-start">
                        <MdOutlineOndemandVideo size={25} className="text-blue-500 mr-4" />
                        <div>
                          <h3 className="text-md font-medium text-gray-800 dark:text-gray-100">
                            {video.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {video.videoLength > 60 ? videoContentLength : video.videoLength}{" "}
                            {video.videoLength > 60 ? "hours" : "minutes"}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
