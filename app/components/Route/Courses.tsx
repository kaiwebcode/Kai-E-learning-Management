import React, { useEffect, useState } from 'react';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import CourseCard from '../Course/CourseCard';

type Props = {};

function Courses({}: Props) {
    const { data, isLoading } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        if (data?.courses) {
            // Sort by creation date (assuming there's a 'createdAt' field) and take only 3 courses
            const sortedCourses = [...data.courses].sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            ).slice(0, 3);
            setCourses(sortedCourses);
        }
    }, [data]);

    if (isLoading) {
        return (
            <div className="w-[90%] md:w-[80%] mx-auto pb-16">
                <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white text-gray-800 leading-tight pb-10">
                    Expand Your Career
                    <br />
                    <span className="text-gradient">Opportunities</span> With Our Courses
                </h1>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    <SkeletonCourseCard />
                    <SkeletonCourseCard />
                    <SkeletonCourseCard />
                </div>
            </div>
        );
    }

    return (
        <div className="w-[90%] md:w-[80%] mx-auto pb-16">
            <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-bold dark:text-white text-gray-800 leading-tight pb-10">
                Expand Your Career
                <br />
                <span className="text-gradient">Opportunities</span> With Our Courses
            </h1>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                {courses.length > 0 ? (
                    courses.map((item: any, index: number) => (
                        <div
                            key={index}
                            className="relative transform transition duration-500 hover:scale-105"
                        >
                            <CourseCard item={item} />
                        </div>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-600 dark:text-gray-400">
                        No courses available at the moment.
                    </p>
                )}
            </div>
        </div>
    );
}

function SkeletonCourseCard() {
    return (
        <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg animate-pulse">
            <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="mt-4 h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="mt-2 h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
    );
}

export default Courses;
