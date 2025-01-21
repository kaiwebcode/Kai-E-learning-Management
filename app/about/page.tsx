"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Footer from '../components/Footer/footer'
import Header from '../components/Header'
import About from "./About"

type Props = {}

const Page = ({ }: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
    const [route, setRoute] = useState("Login");

    return (
        <div >
            <Heading
                title='About us - Kai-Learning'
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
            <About />
            <br />
            <br />
            <Footer />
        </div>
    )
}

export default Page