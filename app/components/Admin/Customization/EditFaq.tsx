import { styles } from "@/app/styles/style";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import Loader from "../../Loader/Loader";

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

  const toggleQuestion = (id: any) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

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
        question: "",
        answer: "",
      },
    ]);
  };

  // Function to check if the FAQ arrays are unchanged
  const areQuestionsUnchanged = (
    originalQuestions: any[],
    newQuestions: any[]
  ) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (
      !areQuestionsUnchanged(data.layout.faq, questions) &&
      !isAnyQuestionEmpty(questions)
    ) {
      await editLayout({
        type: "FAQ",
        faq: questions,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] max-w-5xl mx-auto lg:mt-[120px] mt-3 px-2">
          <div className="mt-8 space-y-6">
            <dl className="space-y-8">
              {questions.map((q: any) => (
                <div
                  key={q._id}
                  className={`${
                    q._id !== questions[0]?._id && "border-t"
                  } border-gray-200 pt-6`}
                >
                  <dt className="text-lg">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
                      <input
                        className={`${styles.input} w-full md:w-auto flex-grow border-none dark:bg-gray-800 bg-gray-100 p-2`}
                        value={q.question}
                        onChange={(e: any) =>
                          handleQuestionChange(q._id, e.target.value)
                        }
                        placeholder="Add your question..."
                      />
                      <button
                        className="mt-2 md:mt-0 ml-0 md:ml-4"
                        onClick={() => toggleQuestion(q._id)}
                      >
                        {q.active ? (
                          <HiMinus className="h-6 w-6 dark:text-white text-black" />
                        ) : (
                          <HiPlus className="h-6 w-6 dark:text-white text-black" />
                        )}
                      </button>
                    </div>
                  </dt>
                  {q.active && (
                    <dd className="mt-4 space-y-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center">
                        <input
                          className={`${styles.input} w-full md:w-auto flex-grow border-none dark:bg-gray-800 bg-gray-100 p-2`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          placeholder="Add your answer..."
                        />
                        <AiOutlineDelete
                          className="mt-2 md:mt-0 ml-0 md:ml-4 text-red-500 text-lg cursor-pointer"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        />
                      </div>
                    </dd>
                  )}
                </div>
              ))}
            </dl>
            <button
              className="flex items-center mt-4 text-blue-500 hover:text-blue-600"
              onClick={newFaqHandler}
            >
              <IoMdAddCircleOutline className="mr-2 text-xl" />
              Add Question
            </button>
          </div>
          <button
            className={`${
              areQuestionsUnchanged(data.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-green-500 text-white hover:bg-green-600"
            } fixed bottom-12 right-12 px-4 py-2 rounded-lg shadow-md`}
            onClick={
              areQuestionsUnchanged(data.layout.faq, questions) ||
              isAnyQuestionEmpty(questions)
                ? () => null
                : handleEdit
            }
          >
            Save
          </button>
        </div>
      )}
    </>
  );
};

export default EditFaq;
