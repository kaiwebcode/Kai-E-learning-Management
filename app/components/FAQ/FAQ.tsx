import { styles } from '@/app/styles/style';
import { useGetHeroDataQuery } from '@/redux/features/layout/layoutApi';
import React, { useEffect, useState } from 'react';
import { HiMinus, HiPlus } from 'react-icons/hi';

type Props = {};

const FAQ = ({ }: Props) => {
    const { data, isLoading } = useGetHeroDataQuery('FAQ', {
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
        setActiveQuestion((prevActiveQuestion) =>
            prevActiveQuestion === id ? null : id
        );
    };

    return (
        <div className=" mx-3 lg:mx-0 py-20">
            <div className="w-[100%] 800px:w-[80%] max-w-4xl mx-auto ">
                <h1 className={`${styles.title} text-center text-4xl 800px:text-4xl font-bold mb-8`}>
                    Frequently Asked Questions
                </h1>
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    <dl className="space-y-6">
                        {isLoading ? (
                            <p className="text-center text-black dark:text-white">
                                Loading FAQs...
                            </p>
                        ) : (
                            questions.map((q) => (
                                <div
                                    key={q._id}
                                    className={`${q._id !== questions[0]?._id ? 'border-t' : ''
                                        } border-gray-200 dark:border-gray-700 pt-4`}
                                >
                                    <dt className="text-lg">
                                        <button
                                            className="flex items-start justify-between w-full text-left focus:outline-none"
                                            onClick={() => toggleQuestion(q._id)}
                                        >
                                            <span className="font-medium text-gray-800 dark:text-gray-100">
                                                {q.question}
                                            </span>
                                            <span className="ml-4 flex-shrink-0">
                                                {activeQuestion === q._id ? (
                                                    <HiMinus className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                                                ) : (
                                                    <HiPlus className="h-6 w-6 text-gray-800 dark:text-gray-100" />
                                                )}
                                            </span>
                                        </button>
                                    </dt>
                                    {activeQuestion === q._id && (
                                        <dd className="mt-2 pr-4">
                                            <p className="text-base text-gray-700 dark:text-gray-300">
                                                {q.answer}
                                            </p>
                                        </dd>
                                    )}
                                </div>
                            ))
                        )}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
