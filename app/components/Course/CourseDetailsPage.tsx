"use client";
import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../../components/Footer/footer";
import CourseDetails from "./CourseDetials";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/orders/ordersApi";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetCourseDetailsQuery(id);
  const { data: config } = useGetStripePublishablekeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const { data: userData } = useLoadUserQuery(undefined, {});
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data?.course) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  // Handle loading or invalid data
  if (isLoading || !data || !data.course) {
    return <Loader />;
  }

  return (
    <div>
      <Heading
        title={`${data.course.name} - ELearning`}
        description="Elearning is a programming community which is developed by KAI for helping programmers"
        keywords={data.course.tags}
      />
      <div className="w-full sticky top-0 z-50 dark:bg-slate-900 bg-white shadow-[0_0_30px_0] shadow-[#67befca7]">
        <Header
          route={route}
          setRoute={setRoute}
          open={open}
          setOpen={setOpen}
          activeItem={1}
        />
      </div>

      {stripePromise && (
        <CourseDetails
          data={data.course}
          stripePromise={stripePromise}
          clientSecret={clientSecret}
          setRoute={setRoute}
          setOpen={setOpen}
        />
      )}

      <Footer />
    </div>
  );
};

export default CourseDetailsPage;
