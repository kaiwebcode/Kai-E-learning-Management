import React, { useEffect, useState } from 'react';
import { useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi';
import CourseCard from '../Course/CourseCard';

type Props = {};

function Courses({}: Props) {
    const { data, isLoading } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses] = useState<any[]>([]);

    useEffect(() => {
        if (data?.courses) {
            setCourses(data.courses);
        }
    }, [data]);

    if (isLoading) {
        return <div className="text-center mt-10">Loading courses...</div>;
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

export default Courses;
