import Ratings from '@/app/utils/Ratings';
import Link from 'next/link';
import React, { FC } from 'react';
import { AiOutlineUnorderedList } from 'react-icons/ai';

type Props = {
    item: any;
    isProfile?: boolean;
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
    return (
        <Link href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`} passHref>
            <div className="w-full min-h-[40vh] lg:min-h-[50vh] min-w-[40vh] gap-36 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow rounded-lg p-3">
                {/* Course Thumbnail */}
                <div className="w-full  overflow-hidden mb-4 mt-2">
                    <img
                        src={item.thumbnail.url}
                        alt="Course thumbnail"
                        className="w-full  object-contain rounded-lg  transition-transform hover:scale-105"
                    />
                </div>

                {/* Course Title */}
                <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100 truncate mb-2">
                    {item.name}
                </h1>

                {/* Ratings and Students */}
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                    <Ratings rating={item.ratings} />
                    <span>
                        {item.purchased} Students
                    </span>
                </div>

                {/* Price and Lectures */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gray-800 dark:text-gray-100">
                            {item.price === 0 ? "Free" : `$${item.price}`}
                        </span>
                        {item.estimatedPrice && item.price !== item.estimatedPrice && (
                            <span className="line-through text-sm text-gray-500 dark:text-gray-400">
                                ${item.estimatedPrice}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                        <AiOutlineUnorderedList size={20} />
                        <span>{item.courseData?.length} Lectures</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseCard;
