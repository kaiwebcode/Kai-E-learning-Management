"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer/footer";

type Props = {};

const Page = (props: Props) => {
    const searchParams = useSearchParams();
    const search = searchParams?.get("title");

    const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
    const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        if (!data) return;

        let filteredCourses = data.courses;

        if (category !== "All") {
            filteredCourses = filteredCourses.filter(
                (item: any) => item.categories === category
            );
        }

        if (search) {
            filteredCourses = filteredCourses.filter((item: any) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setCourses(filteredCourses);
    }, [data, category, search]);

    const categories = categoriesData?.layout.categories;

    return (
        <div className="min-h-screen flex flex-col">
            <div className="w-full sticky top-0 z-50 dark:bg-slate-900 bg-white shadow-md">
                <Header
                    activeItem={1}
                    open={open}
                    setOpen={setOpen}
                    route={route}
                    setRoute={setRoute}
                />
            </div>
            <div className="w-[90%] mx-auto mt-4 flex-grow">
                <Heading
                    title="All courses - ELearning"
                    description="Elearning is a programming community."
                    keywords="programming community, coding skills, insights, collaboration, growth"
                />
                <br />
                <div className="w-full flex items-center flex-wrap">
                    <div
                        className={`h-[35px] ${category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                            } m-3 px-3 rounded-[30px] flex items-center justify-center cursor-pointer`}
                        onClick={() => setCategory("All")}
                    >
                        All
                    </div>
                    {categories &&
                        categories.map((item: any, index: number) => (
                            <div key={index}>
                                <div
                                    className={`h-[35px] ${category === item.title ? "bg-[crimson]" : "bg-[#5050cb]"
                                        } m-3 px-3 rounded-[30px] flex items-center justify-center cursor-pointer`}
                                    onClick={() => setCategory(item.title)}
                                >
                                    {item.title}
                                </div>
                            </div>
                        ))}
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
                        <SkeletonCourseCard />
                        <SkeletonCourseCard />
                        <SkeletonCourseCard />
                        <SkeletonCourseCard />
                    </div>
                ) : (
                    <>
                        {courses.length === 0 && (
                            <p className={`${styles.label} justify-center flex items-center mt-20`}>
                                {search
                                    ? "No courses found!"
                                    : "No courses found in this category. Please try another one!"}
                            </p>
                        )}
                        <br />
                        <br />
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-10">
                            {courses.map((item: any, index: number) => (
                                <div key={index} className="relative transform transition duration-500 hover:scale-105">
                                    <CourseCard item={item} key={index} />
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

// Skeleton Loader for Course Card
function SkeletonCourseCard() {
    return (
        <div className="bg-gray-200 dark:bg-gray-700 p-4 rounded-lg animate-pulse">
            <div className="h-40 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="mt-4 h-6 w-3/4 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
            <div className="mt-2 h-4 w-1/2 bg-gray-300 dark:bg-gray-600 rounded-md"></div>
        </div>
    );
}

export const dynamic = "force-dynamic";

export default Page;
