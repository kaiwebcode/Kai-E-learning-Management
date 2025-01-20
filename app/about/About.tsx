import React from 'react'
import { styles } from '../styles/style'
import BannerImage1 from "../../public/aboutus1.webp"
import BannerImage2 from "../../public/aboutus2.webp"
import BannerImage3 from "../../public/aboutus3.webp"
import Image from 'next/image'
import Quote from '../components/About/Quote'
import FoundingStory from "../../public/FoundingStory.png"
import StatsComponent from '../components/About/Stats'
import LearningGrid from '../components/About/LearningGrid'
import HighlightText from '../components/About/HighlightText'

type Props = {}

const About = ({ }: Props) => {
    return (
        <div className='text-black dark:text-white'>
            <div className='mx-auto text-white'>
                <section className='bg-richblack-700 w-10/12 mx-auto '>
                    <div className='relative mx-auto flex w-11/12 max-w-maxContent dark:text-white text-black flex-col justify-between gap-10 text-center '>
                        <header className='mx-auto py-20 text-4xl font-semibold lg:w-[70%]'>
                            Driving Innovation in Online Education for a
                            <br />
                            <HighlightText text={"Brighter Future"} />
                            {/* <span className='text-blue-400'>Brighter Future</span> */}
                            <p className='mx-auto mt-3 text-center text-base font-medium text-richblack-300 lg:w-[95%]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
                        </header>
                        <div className='sm:h-[70px] lg:h-[150px]'></div>
                        <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] translate-y-[30%] grid-cols-3 gap-3 lg:gap-5'>
                            <Image src={BannerImage1} width={400} height={400} alt='BannerImage1' />
                            <Image src={BannerImage2} width={400} height={400} alt='BannerImage1' />
                            <Image src={BannerImage3} width={400} height={400} alt='BannerImage1' />

                        </div>
                    </div>
                </section>

                {/* section 2 */}

                <section className='border-b border-richblack-700'>
                    <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
                        <div className='h-[100px] '></div>
                        <Quote />
                    </div>
                </section>

                {/* section 3 */}

                <section className='dark:text-white text-black'>
                    <div className='mx-auto flex w-10/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
                        {/* foudning story wala div */}
                        <div className='flex flex-col items-center gap-10 lg:flex-row justify-between '>
                            {/* founding story left box */}
                            <div className='mt-24 flex lg:w-[50%] flex-col gap-12'>
                                <h1 className='bg-gradient-to-br from-[#833AB4] via-[#FD1D1D] to-[#FCB045] bg-clip-text text-5xl font-semibold text-transparent lg:w-[70%] '>Our Founding Story</h1>

                                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                            </div>
                            {/* foudning story right box */}
                            <div>
                                <Image className='shadow-[0_0_20px_0] shadow-[#FC6767] mt-12' src={FoundingStory}
                                    width={500} height={500} alt='foundingstory' />
                            </div>
                        </div>

                        {/* vision and mission wala parent div */}
                        <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                            {/* left box */}
                            <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                                <h1 className='bg-gradient-to-b from-[#FF512F] to-[#F09819] bg-clip-text text-4xl font-semibold text-transparent lg:w-[70%] '>Our Vision</h1>
                                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                            </div>

                            {/* right box */}
                            <div className='my-24 flex lg:w-[40%] flex-col gap-10'>
                                <h1 className='bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] text-transparent bg-clip-text text-4xl font-semibold lg:w-[70%] '>
                                    Our Mission
                                </h1>
                                <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* section 4 */}
                <StatsComponent />

                <section className='mx-auto p-2 flex flex-col items-center justify-between gap-5 mb-[140px]'>
                    <LearningGrid />
                </section>

            </div>
        </div>
    )
}

export default About