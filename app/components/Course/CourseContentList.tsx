import React, { FC, useState } from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

type Props = {
    data: any;
    activeVideo?: number;
    setActiveVideo?: any;
    isDemo?:boolean;
}

const CourseContentList: FC<Props> = (props: Props) => {
    const [visibleSections, setVisibleSections] = useState<Set<string>>(
        new Set<string>()
    );

    // Find unique video Section

    const videoSection: string[] = [
        ...new Set<string>(props.data?.map((item: any) => item.videoSection))
    ]

    let totalCount: number = 0;

    const toggleSection = (section: string) => {
        const newVisibleSections = new Set(visibleSections);
        if (newVisibleSections.has(section)) {
            newVisibleSections.delete(section);
        } else {
            newVisibleSections.add(section);
        }
        setVisibleSections(newVisibleSections)
    }

    return (
        // <div className={`mt-[15px] w-full ${!props.isDemo && 'ml-[-30px] min-h-screen sticky top-24 left-0 z-30'}`}>
        //     {videoSections.map((section: string, sectionIndex: number) => {
        //         const isSectionVisible = visibleSections.has(section);

        //         // Filter video by section
        //         const sectionVideos: any[] = props.data.filter(
        //             (item:any) => item.videoSection === section
        //         );

        //         const sectionVideoCount: number = sectionVideos.length; //Number of videos in the current section
        //         const sectionVideoLength: number = sectionVideos.reduce(
        //             (totalLength: number,  item: any) => totalLength + item.videoLength,
        //             0
        //         );

        //         const sectionStartIndex: number = totalCount; //Start index of videos the current section
        //         totalCount += sectionVideoCount; //update the total count of videos

        //         const sectionContentHours: number = sectionVideoLength / 60;

        //         return (
        //             <div className={`${!props.isDemo && 'border-b border-[#ffffff8e] pb-2'}`} key={section}>
        //                 <div className='w-full flex'>
        //                     {/* Render video */}

        //                     <div className='w-full flex justify-between items-center'>
        //                         <h2 className='text-[22px] text-black dark:text-white'> 
        //                             {section}
        //                         </h2>
        //                         <button>
        //                             {isSectionVisible? (
        //                                 <BsChevronUp size={20}/>
        //                             ) : (
        //                                 <BsChevronDown size={20}/>
        //                             )} 
        //                         </button>
        //                     </div>
        //                 </div>
        //                 <h5 className='text-black dark:text-white'>
        //                     {sectionVideoCount} Lessons {" "}
        //                     {sectionVideoLength < 60
        //                     ? sectionVideoLength
        //                     : sectionContentHours.toFixed(2)}{" "}
        //                     {sectionVideoLength > 60 ? "hours" : "minutes"}
        //                 </h5>
        //                 <br />
        //                 {isSectionVisible && (
        //                     <div className='w-full'>
        //                         {/* {sectionVideos.map((item: any, index: number) => {

        //                         })} */}
        //                     </div>
        //                 )}
        //             </div>

        //         )
        //     })}
        // </div>
        <div>
            Yoo
        </div>
    )
}

export default CourseContentList