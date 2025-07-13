import React, { useState } from "react";
import Layout from "@/component/Layout";
import Link from "next/link";
import Eyebtn from "@/component/Eyebtn";
import { useRouter } from "next/router";
import axios from "axios";
import Navbar from "../../component/navbar"

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const eyeToggle = (e) => {
    e.preventDefault();
    setShowEye(!showEye);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/admin/signin", {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      router.push("/admin/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Layout>
        <Navbar />
      <div className="py-20 md:py-6 bg-gray-100 flex flex-col justify-center px-2 rounded lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in
          </h2>
          <div className="flex flex-col mt-2 text-center text-sm text-gray-600 max-w">
            <p>Or</p>
            <Link
              href="/"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Go to Home
            </Link>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username Field */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={showEye ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                  />
                  <Eyebtn showEye={showEye} eyeToggle={eyeToggle} />
                </div>
              </div>

              {/* Error message */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignIn;
