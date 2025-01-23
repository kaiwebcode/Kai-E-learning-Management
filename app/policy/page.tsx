"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Footer from '../components/Footer/footer'
import Header from '../components/Header'
import Policy from "./Policy"

type Props = {}

const Page = ({ }: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(3);
    const [route, setRoute] = useState("Login");

    return (
        <div >
            <Heading
                title='Policy - Kai-Learning'
                description='Kai-Learning is a learning management system for helping programmers.'
                keywords='programing, mern'
            />
            <div className="w-full sticky top-0 z-50 dark:bg-slate-900 bg-white shadow-xl">
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
                </div>
            <Policy />
            <Footer />
        </div>
    )
}

export default Page