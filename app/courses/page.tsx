"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from '../components/Footer/footer'

type Props = {};

const Page = (props: Props) => {
    const searchParams = useSearchParams(); // Used for dynamic filtering
    const search = searchParams?.get("title"); // Extract search query

    const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
    const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const [courses, setCourses] = useState([]);
    const [category, setCategory] = useState("All");

    // Handle filtering of courses
    useEffect(() => {
        if (!data) return;

        let filteredCourses = data.courses;

        // Filter by category
        if (category !== "All") {
            filteredCourses = filteredCourses.filter(
                (item: any) => item.categories === category
            );
        }

        // Filter by search
        if (search) {
            filteredCourses = filteredCourses.filter((item: any) =>
                item.name.toLowerCase().includes(search.toLowerCase())
            );
        }

        setCourses(filteredCourses);
    }, [data, category, search]);

    const categories = categoriesData?.layout.categories;

    return (
        <div>
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <div className="w-full sticky top-0 z-50 dark:bg-slate-900 bg-white shadow-[0_0_20px_0] shadow-[#67befca7]">

                        <Header
                            activeItem={1}
                            open={open}
                            setOpen={setOpen}
                            route={route}
                            setRoute={setRoute}
                        />
                    </div>
                    <div className="w-[90%] m-auto 800px:grid-cols-10 mt-4">
                        <Heading
                            title="All courses - ELearning"
                            description="Elearning is a programming community."
                            keywords="programming community, coding skills, insights, collaboration, growth"
                        />
                        <br />
                        {/* Categories */}
                        <div className="w-full flex items-center flex-wrap ">
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
                                            className={`h-[35px] ${category === item.title
                                                ? "bg-[crimson]"
                                                : "bg-[#5050cb]"
                                                } m-3 px-3 rounded-[30px] flex items-center justify-center cursor-pointer`}
                                            onClick={() => setCategory(item.title)}
                                        >
                                            {item.title}
                                        </div>
                                    </div>
                                ))}
                        </div>
                        {/* No courses found */}
                        {courses && courses.length === 0 && (
                            <p
                                className={`${styles.label} justify-center h-screen flex items-center `}
                            >
                                {search
                                    ? "No courses found!"
                                    : "No courses found in this category. Please try another one!"}
                            </p>
                        )}
                        <br />
                        <br />
                        {/* Display Courses */}
                        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-10 border-0 h-screen">
                            {courses &&
                                courses.map((item: any, index: number) => (
                                    <div
                                    key={index}
                                    className="relative transform transition duration-500 hover:scale-105"
                                  >
                                    <CourseCard item={item} key={index} />
                                  </div>
                                ))}
                        </div>
                    </div>
                    <Footer />
                </>
            )}
        </div>
    );
};

// Force dynamic rendering
export const dynamic = "force-dynamic";

export default Page;
