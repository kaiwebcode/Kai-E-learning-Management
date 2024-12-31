import { styles } from '@/app/styles/style'
import Image from 'next/image'
import React from 'react'
import ReviewCard from "../Review/ReviewCard"

type Props = {}

export const reviews = [
    {
        name: "Gene Bates",
        avatar: "https://avatar.iran.liara.run/public",
        profession: "Student | Cambridge university",
        comment:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione tempora quaerat sed et cupiditate, beatae velit error laborum quasi maiores, ipsam quae laboriosam perferendis exercitationem veritatis? Omnis distinctio labore natus! Est, laudantium obcaecati labore alias iure rem omnis. Esse, placeat. Labore autem consequuntur voluptatum natus possimus doloribus ipsam magni debitis inventore repellendus! Pariatur nemo veniam perferendis reiciendis adipisci, distinctio voluptate." 
    },
    {
        name: "Gene Bates",
        avatar: "https://avatar.iran.liara.run/public",
        profession: "Student | Cambridge university",
        comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem quas libero. Deleniti necessitatibus laboriosam quibusdam. Minima ad obcaecati error in? Cumque sapiente voluptatibus reprehenderit doloremque perspiciatis quasi atque quaerat Necessitatibus officia numquam alias accusamus assumenda quia et asperiores tempora! Autem, rem? Reiciendis eaque commodi repudiandae fuga"
    }, {
        name: "Gene Bates",
        avatar: "https://avatar.iran.liara.run/public",
        profession: "Student | Cambridge university",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, esse? In perferendis corporis, reiciendis iusto autem nam odio ipsum ab quod illum."
    }, {
        name: "Gene Bates",
        avatar: "https://avatar.iran.liara.run/public",
        profession: "Student | Cambridge university",
        comment:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, esse? In perferendis corporis, reiciendis iusto autem nam odio ipsum ab quod illum."
    }, {
        name: "Gene Bates",
        avatar: "https://avatar.iran.liara.run/public",
        profession: "Student | Cambridge university",
        comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem quas libero. Deleniti necessitatibus laboriosam quibusdam. Minima ad obcaecati error in? Cumque sapiente voluptatibus reprehenderit doloremque perspiciatis quasi atque quaerat Necessitatibus officia numquam alias accusamus assumenda quia et asperiores tempora! Autem, rem? Reiciendis eaque commodi repudiandae fuga, ea temporibus quisquam animi tempora quod est praesentium nisi quis maiores quos expedita?"
    }, {
        name: "Gene Bates",
        avatar: "https://avatar.iran.liara.run/public",
        profession: "Student | Cambridge university",
        comment:
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto voluptatem quas libero. Deleniti necessitatibus laboriosam quibusdam. Minima ad obcaecati error in? Cumque sapiente voluptatibus reprehenderit doloremque perspiciatis quasi atque quaerat Necessitatibus officia numquam alias accusamus assumenda quia et asperiores tempora! Autem, rem? Reiciendis eaque commodi repudiandae fuga, ea temporibus quisquam animi tempora quod est praesentium nisi quis maiores quos expedita?"
    },
]

function Reviews({ }: Props) {
    return (
        <div className='w-[90%] 800px:w-[85%] m-auto'>
            <div className='w-full 800px:flex items-center'>
                <div className='800px:w-[50%] w-full'>
                    <Image
                        src={require("../../../public/business-img.png")}
                        alt='business'
                        width={700}
                        height={700} />
                </div>
                <div className='800px:w-[50%] w-full'>
                    <h3 className={`${styles.title} 800px:!text-[40px]`}>
                        Our Students Are <span className='text-gradient'>Our Strength</span>
                        <br/> See What They Say About Us
                    </h3>
                    <br />
                    <p className={styles.label}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse officia nam aperiam saepe culpa! Beatae eos vitae enim eligendi exercitationem, dolorem error cupiditate ex aliquam rem voluptatibus, magni, ipsum veritatis?
                        Ipsa porro quasi fugiat dolore numquam doloremque dignissimos suscipit qui velit voluptatum animi iste nostrum, soluta necessitatibus quam illum tempore ab dolorum, officiis pariatur, fuga autem beatae eaque! Iste, est!
                    </p>
                    <br />
                    <br />
                        </div>
                        </div>
                    <div className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 
                    
                    '>
                        {/* md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px] */}
                        {reviews && 
                        reviews.map((i, index) => <ReviewCard item={i} key={index} />)}
                    </div>

        </div>
    )
}

export default Reviews