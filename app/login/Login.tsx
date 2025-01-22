// "use client";
// import React, { FC, useEffect, useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import {
//   AiFillGithub,
//   AiOutlineEye,
//   AiOutlineEyeInvisible,
// } from "react-icons/ai";
// import { useLoginMutation } from "@/redux/features/auth/authApi";
// import { toast } from "react-hot-toast";
// import { FcGoogle } from "react-icons/fc";
// import { signIn } from "next-auth/react";
// import { styles } from "../styles/style";
// import { redirect } from "next/navigation";
// import Image from "next/image";
// import Student from "../../public/login.5eeb0b81544a40330d4b.webp";
// import frameImg from "../../public/frame.png";
// import Header from "../components/Header";
// import Link from "next/link";

// type Props = {

//   setRoute: (route: string) => void; // Required

// };

// const schema = Yup.object().shape({
//   email: Yup.string()
//     .email("Invalid email!")
//     .required("Please enter your email!"),
//   password: Yup.string().required("Please enter your password!").min(6),
// });

// const Login: FC<Props> = ({ setRoute }) => {
//   const [show, setShow] = useState(false);
//   const [login, { isSuccess, error }] = useLoginMutation();
//   const formik = useFormik({
//     initialValues: { email: "", password: "" },
//     validationSchema: schema,
//     onSubmit: async ({ email, password }) => {
//       await login({ email, password });
//     },
//   });

//   useEffect(() => {
//     if (isSuccess) {
//       toast.success("Login Successfully!");
//       redirect("/");
//     }
//     if (error) {
//       if ("data" in error) {
//         const errorData = error as any;
//         toast.error(errorData.data.message);
//       }
//     }
//   }, [isSuccess, error]);

//   const { errors, touched, values, handleChange, handleSubmit } = formik;

//   return (
//     <>
//       {/* <Header /> */}
//       <div>
//         <div className="flex flex-col md:flex-row w-full min-h-screen items-center justify-center p-6">
//           <div className="w-full md:w-1/2 p-6 lg:pr-20">
//             <h1 className={`${styles.title} text-center md:text-left`}>
//               Login with Kai-Learning
//             </h1>
//             <form onSubmit={handleSubmit} className="mt-8">
//               <div className="mb-6">
//                 <label className={`${styles.label}`} htmlFor="email">
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={values.email}
//                   onChange={handleChange}
//                   id="email"
//                   placeholder="Enter Your Email"
//                   className={`${errors.email && touched.email && "border-red-500"} ${
//                     styles.input
//                   }`}
//                 />
//                 {errors.email && touched.email && (
//                   <span className="text-red-500 pt-2 block">{errors.email}</span>
//                 )}
//               </div>
//               <div className="relative mb-6">
//                 <label className={`${styles.label}`} htmlFor="password">
//                 Password
//                 </label>
//                 <input
//                   type={!show ? "password" : "text"}
//                   name="password"
//                   value={values.password}
//                   onChange={handleChange}
//                   id="password"
//                   placeholder="Enter Your Password"
//                   className={`${
//                     errors.password && touched.password && "border-red-500"
//                   } ${styles.input}`}
//                 />
//                 {!show ? (
//                   <AiOutlineEyeInvisible
//                     className="absolute bottom-3 right-2 z-1 cursor-pointer"
//                     size={20}
//                     onClick={() => setShow(true)}
//                   />
//                 ) : (
//                   <AiOutlineEye
//                     className="absolute bottom-3 right-2 z-1 cursor-pointer"
//                     size={20}
//                     onClick={() => setShow(false)}
//                   />
//                 )}
//                 {errors.password && touched.password && (
//                   <span className="text-red-500 pt-2 block">{errors.password}</span>
//                 )}
//               </div>
//               <div className="w-full">
//                 <input type="submit" value="Login" className={`${styles.button}`} />
//               </div>
//             </form>
//             <h5 className="flex items-center justify-center my-4">Or Join with</h5>
//             <div className="flex items-center justify-center gap-4">
//               <FcGoogle
//                 size={30}
//                 className="cursor-pointer"
//                 onClick={() => signIn("google")}
//               />
//               <AiFillGithub
//                 size={30}
//                 className="cursor-pointer"
//                 onClick={() => signIn("github")}
//               />
//             </div>
//             <p className="text-center mt-4">
//               For the first time, do sign up{" "}
//               <Link href="/signup">
//               <span
//                 className="text-blue-500 cursor-pointer"
//                 // onClick={() => setRoute("Sign-up")}
//               >
//                 Click Here
//               </span>
//                 </Link>
//             </p>
//           </div>
//           <div className="relative mx-auto w-11/12 max-w-[450px] md:mx-0 hidden lg:block">
//           <Image
//               src={frameImg}
//               alt="Students"
//               width={558}
//               height={504}
//               priority
//               className="mx-auto"
//             />
//             <Image
//               src={Student}
//               alt="Students"
//               width={558}
//               height={504}
//               priority
//               className="absolute -top-4 right-4 z-10"
//             />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

import React from 'react'

function Login() {
  return (
    <div>Login</div>
  )
}

export default Login