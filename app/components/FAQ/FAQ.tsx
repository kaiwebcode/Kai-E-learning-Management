import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {};

function FAQ({ }: Props) {
    const { data, isLoading } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true,
    });
    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setQuestions(data.layout.faq);
        }
    }, [data]);

    const toggleQuestion = (id: string) => {
        setActiveQuestion((prevActiveQuestion) => (prevActiveQuestion === id ? null : id));
    };

    return (
        <div className='my-24'>
            <div className='w-[90%] 800px:w-[80%] m-auto'>
                <h1 className={`${styles.title} 800px:text-[40px]`}>
                    Frequently Asked Questions
                </h1>
                <div className='mt-8'>
                    <dl className='space-y-8'>
                        {questions.map((q) => (
                            <div 
                                key={q._id} 
                                className={`${
                                    q._id !== questions[0]?._id ? "border-t" : ""
                                } border-gray-200 pt-6`}
                            >
                                <dt className='text-lg'>
                                    <button 
                                        className='flex items-start justify-between w-full text-left focus:outline-none'
                                        onClick={() => toggleQuestion(q._id)}
                                    >
                                        <span className='font-medium text-black dark:text-white'>
                                            {q.question}
                                        </span>
                                        <span className='ml-6 flex-shrink-0'>
                                            {activeQuestion === q._id ? (
                                                <HiMinus className='h-6 w-6 text-black dark:text-white' />
                                            ) : (
                                                <HiPlus className='h-6 w-6 text-black dark:text-white' />
                                            )}
                                        </span>
                                    </button>
                                </dt>
                                {activeQuestion === q._id && (
                                    <dd className='mt-2 pr-12'>
                                        <p className='text-base text-black dark:text-white'>
                                            {q.answer}
                                        </p>
                                    </dd>
                                )}
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}

export default FAQ;
