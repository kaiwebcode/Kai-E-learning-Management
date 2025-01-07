'use client';

import CourseContent from '@/app/components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

interface PageProps {
    params: {
        id: string; // Ensure `id` is explicitly typed
    };
}

const Page = ({ params }: PageProps) => {
    const { id } = params; // Destructure `id` from `params`
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const router = useRouter();

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.some((item: any) => item._id === id);
            if (!isPurchased) {
                router.push('/'); // Redirect if the course is not purchased
            }
        }

        if (error) {
            router.push('/'); // Redirect if there is an error
        }
    }, [data, error, id, router]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={id} user={data?.user} />
                </div>
            )}
        </>
    );
};

export default Page;
