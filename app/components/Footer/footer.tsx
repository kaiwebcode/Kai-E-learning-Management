import Link from 'next/link'
import React from 'react'

type Props = {}

const footer = ({ }: Props) => {
    return (
        <footer className='bg-slate-800 pb-4 border border-[#0000000e] dark:border-[#ffffff1e] mt-6'>
            <div className='pt-11' />
            <br />
            <div className='w-[95%] 800px:w-full 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4'>
                    <div className='space-y-3'>
                        <h3 className='text-[25px] font-[700] text-white dark:text-white'>About</h3>
                        <ul className='space-y-4'>
                            <li>
                                <Link href="/about"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    Our Story
                                </Link>
                            </li>
                            <li>
                                <Link href="/policy"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='space-y-3'>
                        <h3 className='text-[25px] font-[700] text-white dark:text-white'>
                            Quick Links
                        </h3>
                        <ul className='space-y-3'>
                            <li>
                                <Link href="/courses"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    My Account
                                </Link>
                            </li>
                            <li>
                                <Link href="/profile"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    Enrolled Courses
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='space-y-3'>
                        <h3 className='text-[25px] font-[700] text-white dark:text-white'>
                            Social Links
                        </h3>
                        <ul className='space-y-4'>
                            <li>
                                <Link href="https://www.linkedin.com/in/kaif-qureshi-06b5782a7/"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    Linkedin
                                </Link>
                            </li>

                            <li>
                                <Link href="https://www.instagram.com/Kaif.__q/#"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="https://www.github.com/kaiwebcode"
                                    className='text-base text-white dark:text-gray-300 dark:hover:text-white'
                                >
                                    github
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='space-y-1'>
                        <h3 className='text-[25px] font-[700] text-white dark:text-white pb-2'>
                            Contact Info
                        </h3>
                        <p className=' text-white dark:text-gray-300 dark:hover:text-white pb-2'>
                            Call Us:- 911-911-911-911
                        </p>
                        <p className=' text-white dark:text-gray-300 dark:hover:text-white pb-2'>
                            Address: India, Maharashtra, Mumbai
                        </p>
                        <p className=' text-white dark:text-gray-300 dark:hover:text-white pb-2'>
                            Mail Us:
                            kaifqureshi.pr@gmail.com
                        </p>
                    </div>
                </div>
                <br />
                <div className='w-full h-[1px] bg-[#ffffff3b] my-4'></div>
                <p className='text-center text-white dark:text-white my-6'>
                    Copyright © 2023 Kai-ELearning | All Rights Reserved
                </p>
            </div>
        </footer>
    )
}

export default footer