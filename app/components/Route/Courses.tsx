import { useGetAllCoursesQuery, useGetUsersAllCoursesQuery } from '@/redux/features/courses/coursesApi'
import React, { useEffect, useState } from 'react'
import CourseCard from '../Course/CourseCard';


type Props = {}

function Courses({ }: Props) {
    const { data, isLoading } = useGetUsersAllCoursesQuery({});
    const [courses, setCourses] = useState<any[]>([])

    useEffect(() => {
        setCourses(data?.courses);
    }, [data])

    // console.log(data)
    return (
        <div>
            <div className={`w-[90%] 800px:w-[80%] m-auto mt-10`}>
                <h1 className='text-center text-[25px] leading-[35px] sm:text-3xl lg:text-4xl dark:text-white 800px:!leading-[60px] text-[#000] font-[700] tracking-tight'>
                    Expand Your Career <s/>
                    <span className='text-gradient'>
                        Opportunity
                    </span> <br />
                     With Our Courses
                </h1>
                <br />
                <br />
                <div className='grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
                    {courses &&
                        courses.map((item: any, index: number) => (
                            <CourseCard
                                item={item}
                                key={index}
                            // setRoute={setRoute}
                            // setOpen={setOpen} 
                            />
                        ))}
                </div>

            </div>

        </div>
    )
}

export default Courses