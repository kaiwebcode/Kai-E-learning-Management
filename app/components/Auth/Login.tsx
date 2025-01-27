"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  refetch?: any;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please enter your email!"),
  password: Yup.string().required("Please enter your password!").min(6),
});

const Login: FC<Props> = ({ setRoute, setOpen, refetch }) => {
  const [show, setShow] = useState(false);
  const [login, { isSuccess, error }] = useLoginMutation();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successfully!");
      setOpen(false);
      refetch();
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full p-4 lg:p-6">
      <h1 className={`${styles.title}`}>Login with Kai-ELearning</h1>
      <form onSubmit={handleSubmit}>
        <div className="pt-6">
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
          <div className="w-full mt-8 relative mb-1">
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
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
          <div className="w-full mt-8">
            <input type="submit" value="Login" className={`${styles.button}`} />
          </div>
          <br />
        </div>
      </form>
      <br />
      <h5 className="flex items-center justify-center mb-3">Or login with</h5>
      <div className="flex items-center justify-center my-3 gap-5 pb-3">
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
      <h5>
        New to Kai-Learning?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setRoute("Sign-up")}
        >
          Click Here
        </span>
      </h5>
    </div>
  );
};

export default Login;
