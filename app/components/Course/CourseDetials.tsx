import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Ratings from '@/app/utils/Ratings';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoCheckmarkDoneOutline, IoCloseOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';
import { format } from 'timeago.js';
import CourseContentList from "../Course/CourseContentList"
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Image from 'next/image';
import { VscVerifiedFilled } from 'react-icons/vsc';

type Props = {
    data: any;
    stripePromise: any;
    clientSecret: string;
    setRoute: any;
    setOpen: any;
};

const CourseDetails = ({ data, stripePromise,
    clientSecret,
    setRoute,
    setOpen: openAuthModal }: Props) => {
    const { data: userData, refetch } = useLoadUserQuery(undefined, {});
    const [user, setUser] = useState<any>();
    // const user = userData?.user;
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setUser(userData?.user);
    }, [userData]);

    const discountPercentange =
        ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

    const discountPercentangePrice = discountPercentange.toFixed(0);

    const isPurchased =
        user && user?.courses?.find((item: any) => item._id === data._id);

    const handleOrder = (e: any) => {
        if (user) {
            setOpen(true);
        } else {
            setRoute("Login");
            openAuthModal(true);
        }
    };

    return (
        <div>
            <div className="w-[90%] 800px:w-[90%] m-auto py-5">
                <div className="w-full flex flex-col-reverse 800px:flex-row">
                    <div className="w-full 800px:w-[65%] 800px:pr-5">
                        <h1 className="text-[25px] font-[600] text-black dark:text-white">
                            {data.name}
                        </h1>
                        <div className="flex items-center justify-between pt-3">
                            <div className="flex items-center">
                                <Ratings rating={data.ratings} />
                                <h5 className="text-black dark:text-white">
                                    {data.reviews?.length} Reviews
                                </h5>
                            </div>
                            <h5 className="text-black dark:text-white">
                                {data.purchased} Students
                            </h5>
                        </div>
                        <br />
                        <h1 className='text-[25px] font-[600] text-black dark:text-white'>
                            What you will learn from this course?
                        </h1>
                        <div>
                            {data.benefits?.map((item: any, index: number) => (
                                <div className='w-full flex 800px:items-center py-2' key={index}>
                                    <div className='w-[15px] mr-1'>
                                        <IoCheckmarkDoneOutline size={20} className='text-black dark:text-white' />
                                    </div>
                                    <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                                </div>
                            ))}
                            <br />
                            <br />
                        </div>
                        <h1 className='text-[25px] font-[600] text-black dark:text-white'>
                            What are the prerequisites for starting this course?
                        </h1>
                        {data.prerequisites?.map((item: any, index: number) => (
                            <div className='w-full flex 800px:items-center py-2' key={index}>
                                <div className='w-[15px] mr-1'>
                                    <IoCheckmarkDoneOutline size={20} className='text-black dark:text-white' />
                                </div>
                                <p className='pl-2 text-black dark:text-white'>{item.title}</p>
                            </div>
                        ))}
                        <br />
                        <br />
                        <div>
                            <h1 className='text-[25px] font-[600] text-black dark:text-white'>
                                Course Overview
                            </h1>
                            {/* Course content list */}
                            <CourseContentList data={data?.courseData} isDemo={true} />
                        </div>
                        <br />
                        <br />
                        {/* Course description */}
                        <div className='w-full'>
                            <h1 className='text-[25px] font-[600] text-black dark:text-white'>
                                Course details
                            </h1>
                            <p className='text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white'>
                                {data.description}
                            </p>
                        </div>
                        <br />
                        <br />
                        <div className='w-full'>
                            <div className='800px:flex items-center'>
                                <Ratings rating={data?.ratings} />
                                <div className='mb-2 800px:mb-[unset]' />
                                <h5 className='text-[25px] text-black dark:text-white'>
                                    {Number.isInteger(data?.ratings)
                                        ? data?.ratings.toFixed(1)
                                        : data?.ratings.toFixed(2)}{""}
                                    Course Rating * {data?.reviews?.length} Reviews

                                </h5>
                            </div>
                            <br />
                            {(
                                data?.reviews && [...data.reviews].reverse()
                            ).map((item: any, index: number) => (
                                <div className='w-full pb-4' key={index}>
                                    <div className='flex'>
                                        <div className='w-[50px] h-[50px]'>
                                            <div className='w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer'>
                                                <h1 className='uppercase text-[18px] text-black dark:text-white'>
                                                    {item.user.name.slice(0, 2)}
                                                </h1>
                                            </div>
                                        </div>
                                        <div className='hidden 800px:block pl-2 '>
                                            <div className='flex items-center'>
                                                <h5 className='text-[18px] pr-2 text-black dark:text-white'>{item.user.name}</h5>
                                                <Ratings rating={item.rating} />
                                            </div>
                                            <p className='text-black dark:text-white'>
                                                {item.comment}
                                            </p>
                                            <small className='text-[#000000d1] dark:text-[#ffffff83]'>
                                                {format(item.createdAt)}
                                            </small>
                                        </div>
                                        <div className='pl-2 flex 800px:hidden items-center'>
                                            <h5 className='text-[18px] pr-2 text-black dark:text-white'>
                                                {item.user.name}
                                            </h5>
                                            <Ratings rating={item.rating} />
                                        </div>

                                    </div>
                                    {item.commentReplies.map((i: any, index: number) => (
                                        <div className="w-full flex 800px:ml-16 my-5" key={index}>
                                            <div className="w-[50px] h-[50px]">
                                                <Image
                                                    src={
                                                        i.user.avatar
                                                            ? i.user.avatar.url
                                                            : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                                    }
                                                    width={50}
                                                    height={50}
                                                    alt=""
                                                    className="w-[50px] h-[50px] rounded-full object-cover"
                                                />
                                            </div>
                                            <div className="pl-2">
                                                <div className="flex items-center">
                                                    <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                                                    <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                                                </div>
                                                <p>{i.comment}</p>
                                                <small className="text-[#ffffff83]">
                                                    {format(i.createdAt)} •
                                                </small>
                                            </div>
                                        </div>

                                    ))}
                                    <div className='w-full h-[1px] bg-[#ffffff3b] my-4'></div>
                                </div>

                            ))}

                        </div>

                    </div>
                    {/* Course Video */}
                    <div className='w-full 800px:w-[35%] relative'>
                        <div className='sticky top-[100px] left-0 z-50 w-full'>
                            <CoursePlayer
                                videoUrl={data?.demoUrl}
                                title={data?.title} />
                            <div className='flex items-center'>
                                <h1 className='pt-5 text-[25px] text-black dark:text-white'>
                                    {data.price === 0 ? "Free" : data.price + "$"}
                                </h1>
                                <h6 className='pl-1 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white'>
                                    {data.estimatedPrice}$
                                </h6>
                                <h4 className='pl-5 pt-4 text-black dark:text-white'>
                                    {discountPercentangePrice}% OFF
                                </h4>
                            </div>
                            <div className='flex items-center'>
                                {isPurchased ? (
                                    <Link
                                        className={`${styles.button} !w-[180px] my-3 cursor-pointer !bg-[crimson]`}
                                        href={`/course-access/${data._id}`}>
                                        Enter to Course
                                    </Link>
                                ) : (
                                    <div
                                        className={`${styles.button} !w-[180px] my-3 cursor-pointer !bg-[crimson]`}
                                        onClick={handleOrder}
                                    >
                                        Buy Now {data.price}$
                                    </div>
                                )}
                            </div>
                            <br />
                            <div className='pb-3'>
                                <p className='pb-1 text-black dark:text-white'>• Source code include</p>
                                <p className='pb-1 text-black dark:text-white'>• Full lifetime access</p>
                                <p className='pb-1 text-black dark:text-white'>• Certificate of completion</p>
                                <p className='pb-1 800px:pb-1 text-black dark:text-white'>• Premium Support</p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>

            <>
                {open && (
                    <div className="w-full h-screen  bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center">
                        <div className="w-[500px] min-h-[500px] dark:bg-slate-600 bg-slate-200 rounded-xl shadow p-3">
                            <div className="w-full flex justify-end ">
                                <IoCloseOutline
                                    size={40}
                                    className="text-black dark:text-white cursor-pointer"
                                    onClick={() => setOpen(false)}
                                />
                            </div>
                            <div className="w-full ">
                                {stripePromise && clientSecret && (
                                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                                        <CheckOutForm setOpen={setOpen} data={data} user={user} refetch={refetch} />
                                    </Elements>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </>

        </div>
    );
};

export default CourseDetails;
