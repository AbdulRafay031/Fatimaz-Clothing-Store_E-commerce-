import React, { useState } from "react";
import Layout from "@/component/Layout";
import Link from "next/link";
import Eyebtn from "@/component/Eyebtn";
import { useRouter } from "next/router";
import axios from 'axios';

const LoginSeller = () => {
  const [email, setEmail] = useState("");
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
      const response = await axios.post('/api/seller/signin', {
        email,
        password
      });

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token);

      // Redirect to the dashboard after successful login
      router.push('/admin/dashboard');
      
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    }
  };


  return (
    <Layout>
      <div className="py-20 md:py-6 bg-gray-100 flex flex-col justify-center px-2 rounded lg:px-8">
        {/* main heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in as a Seller
          </h2>
          <p className="flex flex-col mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <div className="font-medium text-blue-600 hover:text-blue-500">
              <Link href="/">Go to Home</Link>
            </div>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password field */}
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
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 sm:text-sm"
                    placeholder="Enter your password"
                  />
                  <Eyebtn showEye={showEye} eyeToggle={eyeToggle} />
                </div>
              </div>

              {/* Forgot password link */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Sign in button */}
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

export default LoginSeller;
