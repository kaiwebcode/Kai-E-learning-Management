"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../../components/Footer/footer"
import CourseDetails from "./CourseDetials";


type Props = {
    id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
    const [route, setRoute] = useState("Login");
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useGetCourseDetailsQuery(id);


    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <div >
                        <Heading
                            title={data.course.name + " - ELearning"}
                            description={"Elearning is a programming community which is developed by KAI for helping programmers"}
                            keywords={data?.course?.tags}
                        />
                        <Header
                            route={route}
                            setRoute={setRoute}
                            open={open}
                            setOpen={setOpen}
                            activeItem={1} />
                        {/* <div className="my-20 grid items-center justify-center ">
                            <h1>Course Details Page</h1>
                            <p>Course ID: {id}</p>
                        </div> */}

                        <CourseDetails data={data.course} />
                        <Footer />
                    </div>

                )
            }
        </>
    );
};

export default CourseDetailsPage;
