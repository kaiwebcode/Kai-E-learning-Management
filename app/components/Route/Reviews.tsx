import { styles } from '@/app/styles/style'
import Image from 'next/image'
import React from 'react'
import ReviewCard from "../Review/ReviewCard"

type Props = {}

export const reviews = [
    {
        name: "Alex Johnson",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Software Engineer | Google",
        comment:
            "Incredible experience! Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium, fuga quod nesciunt officiis veritatis impedit quibusdam deserunt dolore pariatur."
    },
    {
        name: "Sophia Lee",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Digital Marketer | HubSpot",
        comment:
            "Absolutely fantastic service! Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, repellat quibusdam! Fuga temporibus voluptatibus id quo deleniti animi distinctio vitae."
    },
    {
        name: "Michael Brown",
        avatar: "https://randomuser.me/api/portraits/men/3.jpg",
        profession: "Freelance Writer",
        comment:
            "Highly recommend! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae, excepturi? Culpa, nemo! Voluptatum eos hic necessitatibus officia quibusdam fugit."
    },
    {
        name: "Emily Davis",
        avatar: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "UI/UX Designer | Canva",
        comment:
            "The quality is unmatched. Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci suscipit sapiente, eligendi quasi fugiat optio iste accusantium veniam aliquid dolore."
    },
    {
        name: "Chris Evans",
        avatar: "https://randomuser.me/api/portraits/men/5.jpg",
        profession: "Entrepreneur",
        comment:
            "Will definitely come back! Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores quidem earum quos, debitis atque molestiae nulla voluptate non dolorem."
    },
    {
        name: "Amelia Clarke",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
        profession: "Product Manager | Slack",
        comment:
            "Superb attention to detail! Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic recusandae dolores inventore molestias pariatur veritatis dignissimos nobis rem repellendus!"
    }
];


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