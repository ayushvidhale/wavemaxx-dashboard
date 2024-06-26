"use client";

import Link from "next/link";
import React, { useState } from "react";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function JoinPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const result = await signIn("credentials", {
        redirect: false,
        name,
        password,
      });

      if (result.error) {
        // Handle error here, e.g., show an error message
        console.log(result.error);
        toast.error(result.error);
      } else {
        // On successful login, redirect to the home page or dashboard
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full ">
      <div className=" bg-gray-200 relative dark:bg-gray-950 min-h-screen flex flex-wrap items-center justify-center">
        <img
          src="/cover.jpg"
          alt="hero_cover"
          className="w-full h-screen object-cover top-0 left-0 absolute z-0 rounded-xl"
        />
        <div className="flex bg-white border z-20 rounded-lg shadow-lg sm:w-full min-w-max md:w-1/3 ">
          <div className="w-full p-8 ">
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
              SCADA Login
            </h2>
            {/* <p className="text-sm text-gray-600 text-center">
              Monitoring 15,000 units across 3 locations, 24/7 in the cloud.
            </p> */}

            <form onSubmit={submitHandler}>
              <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  User Name
                </label>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mt-4">
                <div className="flex justify-between">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  {/* <a
                    href="#"
                    className="text-xs cursor-not-allowed text-gray-500"
                  >
                    Forget Password?
                  </a> */}
                </div>
                <input
                  className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-8">
                <button
                  type="submit"
                  className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600"
                >
                  Login
                </button>
              </div>
            </form>

            {/* <div className="grid gap-4 items-center w-full justify-center mb-4 mt-2">
              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="flex items-center w-full justify-center mt-4 text-white rounded-lg shadow-md bg-gray-50 hover:bg-gray-100"
              >
                <div className="pl-4 py-3">
                  <svg className="h-6 w-6" viewBox="0 0 40 40">
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#FFC107"
                    />
                    <path
                      d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                      fill="#FF3D00"
                    />
                    <path
                      d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                      fill="#4CAF50"
                    />
                    <path
                      d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                      fill="#1976D2"
                    />
                  </svg>
                </div>
                <h1 className="pr-4 py-3 text-center text-gray-600 font-bold">
                  Continue with Google
                </h1>
              </button>

              <button
                onClick={handleGitHubSignIn}
                type="button"
                className="flex items-center w-full justify-center mt-4 text-white rounded-lg shadow-md bg-gray-50 hover:bg-gray-100"
              >
                <div className="pl-4 py-3">
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <h1 className="pr-4 py-3 text-center text-gray-600 font-bold">
                  Continue with GitHub
                </h1>
              </button>
            </div> */}

            {/* <div className="mt-8 flex items-center justify-between">
              <span className="border-b w-1/5 md:w-1/4"></span>
              <div className="text-xs flex text-gray-500 uppercase">
                Don't have an account?{" "}
                <Link href="/register" className=" font-extrabold">
                  <i>Register</i>
                </Link>
              </div>
              <span className="border-b w-1/5 md:w-1/4"></span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
