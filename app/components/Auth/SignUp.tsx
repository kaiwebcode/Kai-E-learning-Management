"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiFillGithub, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { styles } from "../../../app/styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
  name: Yup.string().required("Please enter your name!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Signup: FC<Props> = ({ setRoute }) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration successfully";
      toast.success(message);
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
    setIsLoading(false);
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      // setRoute("Verification")
      setIsLoading(true);
      const data = {
        name,
        email,
        password,
      };
      console.log(data);
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full lg:p-6 p-4">
      <h1 className={`${styles.title}`}>Join to Kai-ELearning</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 pt-4">
          <label className={`${styles.label}`} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name=""
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Enter your Name"
            className={`${errors.name && touched.name && "border-red-500"} ${styles.input
              }`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-2 block">{errors.name}</span>
          )}
        </div>
        <label className={`${styles.label}`} htmlFor="email">
          Email Address
        </label>
        <input
          type="email"
          name=""
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your Email"
          className={`${errors.email && touched.email && "border-red-500"} ${styles.input
            }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full py-4 relative">
          <label className={`${styles.label}`} htmlFor="password">
            Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your Password"
            className={`${errors.password && touched.password && "border-red-500"
              } ${styles.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-6 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-6 right-2 z-1 cursor-pointer"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-2 block">{errors.password}</span>
        )}
        <div className="w-full mt-3">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 transition duration-200 ${isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="spinner border-2 border-t-transparent border-white rounded-full w-5 h-5 mx-auto animate-spin"></div>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <br />
      </form>
      <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-slate-400 after:border-t after:border-border">
        <span className="relative z-10 bg-background px-2 text-muted-foreground dark:bg-slate-900">
          Or Continue with
        </span>
      </div>
      <div className="flex items-center justify-center mt-3 gap-5 pb-2">
        <Button className="w-full dark:bg-white bg-slate-400"
          onClick={() => signIn("google")}>
          <FcGoogle
            size={50}
            className="cursor-pointer"
            onClick={() => signIn("google")}
          />
        </Button>
        <Button className="w-full dark:bg-white bg-slate-400"
          onClick={() => signIn("github")}>
          <AiFillGithub
            size={50}
            className="cursor-pointer"
            onClick={() => signIn("github")}
          />
        </Button>
      </div>
      <br />
      <h5>
        Already have an Account?
        <span
          className="text-blue-500 cursor-pointer pl-1"
          onClick={() => setRoute("Login")}
        >
          Click here!
        </span>
      </h5>
    </div>
  );
};

export default Signup;
