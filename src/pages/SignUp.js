"use client";
import { React, useState } from "react";
import Layout from "../component/Layout";
import Link from "next/link";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Eyebtn from "../component/Eyebtn";


const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showEye, setShowEye] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    const name = e.target[2].value;
    const address = e.target[3].value;
    const phone = e.target[4].value;
    
  
  
  if (!isValidEmail(email)) {
    setError("Email is invalid");
    return;
  }

  if (!password || password.length < 8) {
    setError("Password is invalid");
    return;
  }

  try {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
       name,
       address,
       phone,
      }),
    });
    if (res.status === 400) {
      setError("This email is already registered");
    }
    if (res.status === 200) {
      setError("");
      router.push("/");
    }
  } catch (error) {
    setError("Error, try again");
    console.log(error);
  }
};
const eyeToggle = (e) => {
  e.preventDefault();
  setShowEye(!showEye)
}


  return (
    <Layout>
      <>
        <div className="py-20 md:py-6 bg-gray-50 flex flex-col justify-center px-4 lg:px-8">
          {/* main heading */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Create a new account
            </h2>
            <p className="flex flex-col mt-2 text-center text-sm leading-5 text-gray-500 max-w">
              Or
              <div
                className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150"
              >
                <Link href='/SignIn'>
                login to your account
                </Link>
              </div>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form
                method="POST"
                // action="#"
                onSubmit={handleSubmit}
                >

                {/* name field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5  text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5  text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      id="email"
                      name="email"
                      placeholder="user@example.com"
                      type="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                {/* password */}
                <div className="mt-6">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-5 text-gray-700"
                  >
                    Password
                  </label>

                  <div className="mt-1 rounded-md shadow-sm relative">
                    <input
                      id="password"
                      name="password"
                      type={showEye ? "text" : "password"}
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Eyebtn showEye={showEye} eyeToggle={eyeToggle} />
                  </div>
                </div>

                {/* phone field  */}
                <div className="mt-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-5  text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="phone"
                      name="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0317.."
                      type="num"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>

                  {/* address field */}
                  <div className="mt-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-5  text-gray-700"
                    >
                      Address
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="brohi@xyz.com"
                        type="text"
                        required
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                      />
                    </div>
                  </div>
                </div>

                {/* create account btn */}
                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
                    >
                      Create account
                    </button>
                    {/* <p className="text-red-600 text-[16px] mb-4">{error && error}</p> */}
                  </span>
                </div>

              </form>

            </div>
          </div>
        </div>
      </>
    </Layout>
  );
};

export default SignUp;
