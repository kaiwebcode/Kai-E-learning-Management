"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Footer from '../components/Footer/footer'
import Header from '../components/Header'
import Policy from "./Policy"

type Props = {}

const page = ({ }: Props) => {
    const [open, setOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(2);
    const [route, setRoute] = useState("Login");

    return (
        <div >
            <Heading
                title='Policy - Kai-Learning'
                description='Kai-Learning is a learning management system for helping programmers.'
                keywords='programing, mern'
            />
            <Header
                open={open}
                setOpen={setOpen}
                activeItem={activeItem}
                setRoute={setRoute}
                route={route}
            />
            <Policy />
            <Footer />
        </div>
    )
}

export default page