import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { useState } from 'react'
import Loader from '../Loader/Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from "./CourseContentMedia";
import Header from '../Header';
import CourseContentList from './CourseContentList';

type Props = {
    id: string;
    user: any;
}

const CourseContent = ({ id, user }: Props) => {
    const { data: contentData, isLoading, refetch } = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState('Login')
    const data = contentData?.content;

    const [activeVideo, setActiveVideo] = useState(0);
    return (
        <>
            {
                isLoading ? (
                    <Loader />
                ) : (
                    <>
                        <Header activeItem={1} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
                        <div className="w-full grid 800px:grid-cols-10">
                            <Heading
                                title={data[activeVideo]?.title}
                                description="anything"
                                keywords={data[activeVideo]?.tags}
                            />
                            <div className="col-span-3  lg:col-span-7">
                                <CourseContentMedia
                                    data={data}
                                    id={id}
                                    activeVideo={activeVideo}   
                                    setActiveVideo={setActiveVideo}
                                    user={user}
                                    refetch={refetch}
                                />
                            </div>
                            <div className="pl-12 lg:pl-0 md:pl-12 col-span-3 mb-6 lg:mb-0 md:mb-6">
                                <CourseContentList
                                    setActiveVideo={setActiveVideo}
                                    data={data}
                                    activeVideo={activeVideo}
                                />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default CourseContent