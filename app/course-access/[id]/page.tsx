"use client"

import CourseContent from '@/app/components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { redirect } from 'next/navigation';
import React, { use, useEffect } from 'react'

type Props = {
    params: any;
    user: any;
}


const page = ({ params }: { params: Promise<{ id: string }> }) => {
    const resolvedParams = use(params);
    const { isLoading, error, data } = useLoadUserQuery(undefined, {})

    useEffect(() => {

        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === resolvedParams.id);
            if (!isPurchased) {
                redirect("/");
            }
        }
        if (error) {
            redirect("/")
        }

    }, [data, error])

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={resolvedParams.id} user={data.user} />
                </div>
            )}
        </>
    )
}

export default page