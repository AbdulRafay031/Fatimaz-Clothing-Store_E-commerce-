"use client";
import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Eyebtn from "../component/Eyebtn";
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import Navbar from "../component/navbar";

const SignUp = () => {
  const { data: session, status } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [showEye, setShowEye] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      toast.success("Signed in successfully!");
      // Perform additional actions if needed
    } else if (status === "unauthenticated") {
      toast.error("Failed to sign in.");
    }
  }, [status]);

  const eyeToggle = (e) => {
    e.preventDefault();
    setShowEye(!showEye);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      fullname: name,
      email: email,
      password: password,
      phoneNumber: phone,
      address: address,
    };

    // console.log("Sending user data:", userData);

    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("User registered successfully");
        router.push("/SignIn");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  if (!isClient) {
    return null;
  }

  if (status === "authenticated") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 md:py-6 bg-gray-100 rounded lg:px-8">
          <div className="text-center">
            <h4 className="text-3xl font-extrabold text-gray-900 mb-6">
              Signed in as {session.user.email}
            </h4>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-sky-600 text-white rounded"
            >
              Sign out
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <div className="py-20 md:py-6 bg-gray-50 flex flex-col justify-center px-4 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
            Create a new account
          </h2>
          <div className="flex flex-col mt-2 text-center text-sm leading-5 text-gray-500 max-w">
            <p>Or</p>
            <div className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
              <Link href="/SignIn">login to your account</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form method="POST" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-5 text-gray-700"
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

              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-5 text-gray-700"
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

              <div className="mt-6">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-5 text-gray-700"
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
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium leading-5 text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Street, City, Country"
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="mt-6">
                  <span className="block w-full rounded-md shadow-sm">
                    <button
                      type="submit"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    >
                      Sign up
                    </button>
                  </span>
                </div>
                <div>
                  <span>
                    <button
                      onClick={() => signIn("google")}
                      type="button"
                      className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition duration-150 ease-in-out"
                    >
                      Sign in with Google
                    </button>
                  </span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
