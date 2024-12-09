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
import { redirect } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

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

  // useEffect(() => {
  //   if (isSuccess) {
  //     toast.success("Login Successfully!");
  //     setOpen(false);
  //     // redirect("/admin");
  //   }
  //   if (error) {
  //     if ("data" in error) {
  //       const errorData = error as any;
  //       toast.error(errorData.data.message);
  //     }
  //   }
  // }, [isSuccess, error]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full p-6">
      <h1 className={`${styles.title}`}>Login with Kai-Learning</h1>
      <form onSubmit={handleSubmit}>
        <div className="pt-8">
          <label className={`${styles.label}`} htmlFor="email">
            Enter your Email
          </label>
          <input
            type="email"
            name=""
            value={values.email}
            onChange={handleChange}
            id="email"
            placeholder="loginmail@gmail.com"
            className={`${errors.email && touched.email && "border-red-500"} ${
              styles.input
            }`}
          />
          {errors.email && touched.email && (
            <span className="text-red-500 pt-2 block">{errors.email}</span>
          )}
          <div className="w-full mt-8 relative mb-1">
            <label className={`${styles.label}`} htmlFor="email">
              Enter your password
            </label>
            <input
              type={!show ? "password" : "text"}
              name="password"
              value={values.password}
              onChange={handleChange}
              id="password"
              placeholder="password!@%"
              className={`${
                errors.password && touched.password && "border-red-500"
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
      <h5 className="flex items-center justify-center my-3">Or Join with</h5>
      <div className="flex items-center justify-center my-3">
        <FcGoogle
          size={30}
          className="cursor-pointer mr-2"
          onClick={() => signIn("google")}
        />
        <AiFillGithub
          size={30}
          className="cursor-pointer ml-2"
          onClick={() => signIn("github")}
        />
      </div>
      <h5>
        For the first time do sign up{" "}
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
