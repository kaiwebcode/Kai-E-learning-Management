import { styles } from '@/app/styles/style';
import CoursePlayer from '@/app/utils/CoursePlayer';
import Image from 'next/image';
import React, { useState } from 'react'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai';

type Props = {
    data: any;
    id: string;
    activeVideo: number;
    user: any;
    refetch: any;
    setActiveVideo: (activeVideo: number) => void;
}

const CourseContentMedia = ({ data, id, user, activeVideo, setActiveVideo }: Props) => {
    const [activeBar, setactiveBar] = useState(0);
    const [question, setQuestion] = useState("");
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(1);
    const [answer, setAnswer] = useState("");
    const [questionId, setQuestionId] = useState("");
    const [reply, setReply] = useState("");
    const [reviewId, setReviewId] = useState("");
    const [isReviewReply, setIsReviewReply] = useState(false);

    const isReviewExists = data?.reviews?.find(
        (item: any) => item.user._id === user._id
    );

    return (
        <div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
            <CoursePlayer title={data[activeVideo]?.title} videoUrl={data[activeVideo]?.videoUrl} />

            <div className='w-full flex items-center justify-between my-3'>
                <div
                    className={`${styles.button
                        } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() =>
                        setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
                    }
                >
                    <AiOutlineArrowLeft className="mr-2" />
                    Prev Lesson
                </div>
                <div
                    className={`${styles.button
                        } !w-[unset] text-white  !min-h-[40px] !py-[unset] ${data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
                        }`}
                    onClick={() =>
                        setActiveVideo(
                            data && data.length - 1 === activeVideo
                                ? activeVideo
                                : activeVideo + 1
                        )
                    }
                >
                    Next Lesson
                    <AiOutlineArrowRight className="ml-2" />
                </div>
            </div>
            <h1 className="pt-2 text-[25px] font-[600] dark:text-white text-black ">
                {data[activeVideo].title}
            </h1>
            <br />
            <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-[bg-slate-700] rounded shadow-inner">
                {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
                    <h5
                        key={index}
                        className={`800px:text-[20px] cursor-pointer ${activeBar === index
                            ? "text-red-500"
                            : "dark:text-white text-black"
                            }`}
                        onClick={() => setactiveBar(index)}
                    >
                        {text}
                    </h5>
                ))}
            </div>
            <br />
            {activeBar === 0 && (
                <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black">
                    {data[activeVideo]?.description}
                </p>
            )}

            {activeBar === 1 && (
                <div>
                    {data[activeVideo]?.links.map((item: any, index: number) => (
                        <div className="mb-5" key={index}>
                            <h2 className="800px:text-[20px] 800px:inline-block dark:text-white text-black">
                                {item.title && item.title + " :"}
                            </h2>
                            <a
                                className="inline-block text-[#4395c4] 800px:text-[20px] 800px:pl-2"
                                href={item.url}
                            >
                                {item.url}
                            </a>
                        </div>
                    ))}
                </div>
            )}


            {activeBar === 2 && (
                <>
                    <div className='w-full flex'>
                        <Image
                            src={
                                user.avatar
                                    ? user.avatar.url
                                    : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                        <textarea
                            name=""
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            id=""
                            cols={40}
                            rows={5}
                            placeholder="Write your question..."
                            className="outline-none bg-transparent ml-3 border dark:text-white text-black border-[#0000001d] dark:border-[#ffffff57] 800px:w-full p-2 rounded w-[90%] 800px:text-[18px] font-Poppins"
                        ></textarea>
                    </div>
                    <div className="w-full flex justify-end">
                        <div
                            className=
                            {`${styles.button
                                } !w-[120px] !h-[40px] text-[18px] mt-5 
            //     questionCreationLoading && "cursor-not-allowed"
            //   }`}
                        //   onClick={questionCreationLoading ? () => {} : handleQuestion}
                        >
                            Submit
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
                    <div>
                        {/* <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              questionId={questionId}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            /> */}
                    </div>
                </>
            )}

            {
                activeBar === 3 && (
                    <div className='w-full'>
                        <>
                            {
                                !isReviewExists && (
                                    <>
                                        <div className='flex w-full'>

                                            <Image
                                                src={
                                                    user.avatar
                                                        ? user.avatar.url
                                                        : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                                                }
                                                width={50}
                                                height={50}
                                                alt=""
                                                className="w-[50px] h-[50px] rounded-full object-cover"
                                            />
                                            <div className='w-full'>
                                                <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black ">
                                                    Give a Rating <span className="text-red-500">*</span>
                                                </h5>
                                                <div className="flex w-full ml-2 pb-3">
                                                    {[1, 2, 3, 4, 5].map((i) =>
                                                        rating >= i ? (
                                                            <AiFillStar
                                                                key={i}
                                                                className="mr-1 cursor-pointer"
                                                                color="rgb(246,186,0)"
                                                                size={25}
                                                                onClick={() => setRating(i)}
                                                            />
                                                        ) : (
                                                            <AiOutlineStar
                                                                key={i}
                                                                className="mr-1 cursor-pointer"
                                                                color="rgb(246,186,0)"
                                                                size={25}
                                                                onClick={() => setRating(i)}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                                <textarea
                                                    name=""
                                                    value={review}
                                                    onChange={(e) => setReview(e.target.value)}
                                                    id=""
                                                    cols={40}
                                                    rows={5}
                                                    placeholder="Write your comment..."
                                                    className="outline-none bg-transparent 800px:ml-3 dark:text-white text-black border border-[#00000027] dark:border-[#ffffff57] w-[95%] 800px:w-full p-2 rounded text-[18px] font-Poppins"
                                                ></textarea>
                                            </div>
                                        </div>

                                        <div className="w-full flex justify-end">
                                            <div
                                                className={`${styles.button
                                                    } !w-[120px] !h-[40px] text-[18px] mt-5 800px:mr-0 mr-2
                                                    }`}
                                            // onClick={
                                            //     reviewCreationLoading ? () => { } : handleReviewSubmit
                                            // }
                                            >
                                                Submit
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                        </>
                    </div>
                )
            }
        </div>
    )
}

export default CourseContentMedia