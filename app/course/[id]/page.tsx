"use client";
import React, { use } from "react";
import CourseDetailsPage from "../../components/Course/CourseDetailsPage";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
    // Use `React.use` to unwrap the promise
    const resolvedParams = use(params);

    return (
        <div>
            <CourseDetailsPage id={resolvedParams.id} />
        </div>
    );
};

export default Page;
