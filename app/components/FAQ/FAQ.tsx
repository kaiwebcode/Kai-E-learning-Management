import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { styles } from "@/app/styles/style";

type Props = {};

const FAQ = ({ }: Props) => {
    const { data, isLoading } = useGetHeroDataQuery("FAQ", {
        refetchOnMountOrArgChange: true,
    });
    const [questions, setQuestions] = useState<any[]>([]);

    useEffect(() => {
        if (data) {
            setQuestions(data.layout.faq);
        }
    }, [data]);

    return (
        <div className="mx-3 lg:mx-0 py-20">
            <div className="w-full 800px:w-[80%] max-w-6xl mx-auto">
                <h1 className={`${styles.title} text-center text-4xl 800px:text-4xl font-bold mb-8`}>
                    Frequently Asked Questions
                </h1>
                <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                    {isLoading ? (
                        <p className="text-center text-black dark:text-white">Loading FAQs...</p>
                    ) : (
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {questions.map((q) => (
                                <AccordionItem
                                    key={q._id}
                                    value={q._id}
                                    className="bg-slate-700 text-white rounded-lg shadow-lg"
                                >
                                    <AccordionTrigger className="flex justify-between items-center py-4 px-6 text-lg font-semibold text-gray-100 bg-slate-700 rounded-t-lg transition-colors">
                                        <span>{q.question}</span>
                                        <span className="ml-4 text-gray-200">
                                            {q._id === questions[0]}
                                        </span>
                                    </AccordionTrigger>
                                    <AccordionContent className="py-4 px-6 bg-slate-800 rounded-b-lg text-base text-gray-300">
                                        {q.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FAQ;
