import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

const EditFaq = (props: Props) => {
  const { data, isLoading, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess: layoutSuccess, error }] =
    useEditLayoutMutation();

  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestions(data.layout.faq);
    }
    if (layoutSuccess) {
      refetch();
      toast.success("FAQ updated successfully");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, layoutSuccess, error]);

  const handleQuestionChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      {
        _id: Date.now().toString(),
        question: "",
        answer: "",
      },
    ]);
  };

  const handleEdit = async () => {
    await editLayout({
      type: "FAQ",
      faq: questions,
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] max-w-5xl mx-auto lg:mt-[50px] mt-3">
          <h1
            className={`${styles.title} text-center text-4xl font-bold mb-8`}
          >
            Edit Frequently Asked Questions
          </h1>
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {questions.map((q) => (
                <AccordionItem key={q._id} value={q._id}>
                  <AccordionTrigger className="flex justify-between items-center py-4 px-6 text-lg font-semibold text-gray-100 bg-slate-700 rounded-t-lg transition-colors">
                    <input
                      className="bg-transparent border-none outline-none text-white w-full"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(q._id, e.target.value)}
                      placeholder="Add your question..."
                    />
                    <AiOutlineDelete
                      className="text-red-500 cursor-pointer mr-2 w-5 h-5"
                      onClick={() =>
                        setQuestions((prev) => prev.filter((item) => item._id !== q._id))
                      }
                    />
                  </AccordionTrigger>
                  <AccordionContent className="py-4 px-6 bg-slate-800 rounded-b-lg text-base text-gray-300">
                    <input
                      className="bg-transparent border-none outline-none text-white w-full"
                      value={q.answer}
                      onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                      placeholder="Add your answer..."
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <button
              className="flex items-center mt-4 text-blue-500 hover:text-blue-600"
              onClick={newFaqHandler}
            >
              <IoMdAddCircleOutline className="mr-2 text-xl" /> Add Question
            </button>
          </div>
          <button
            className="bg-green-500 text-white hover:bg-green-600 fixed bottom-12 right-12 px-4 py-2 rounded-lg shadow-md"
            onClick={handleEdit}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default EditFaq;
