'use client';

import CourseContent from '@/app/components/Course/CourseContent';
import Loader from '@/app/components/Loader/Loader';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { useRouter } from 'next/navigation'; // Use `useRouter` for client-side navigation
import React, { useEffect } from 'react';

type Props = {
    params: {
        id: string; // Define the expected type for `id`
    };
};

const Page = ({ params }: Props) => {
    const { id } = params; // Destructure `id` from `params`
    const { isLoading, error, data } = useLoadUserQuery(undefined, {});
    const router = useRouter(); // Use `useRouter` instead of `redirect`

    useEffect(() => {
        if (data) {
            const isPurchased = data.user.courses.find((item: any) => item._id === id);
            if (!isPurchased) {
                router.push('/'); // Use `router.push` for navigation
            }
        }

        if (error) {
            router.push('/');
        }
    }, [data, error, id, router]);

    return (
        <>
            {isLoading ? (
                <Loader />
            ) : (
                <div>
                    <CourseContent id={id} user={data.user} />
                </div>
            )}
        </>
    );
};

export default Page;
