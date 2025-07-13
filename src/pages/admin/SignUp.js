import { React, useState } from "react";
import Layout from "@/component/Layout";
import Link from "next/link";
import Eyebtn from "@/component/Eyebtn";
import { useRouter } from "next/router";
import Navbar from "../../component/navbar"

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);
  const router = useRouter();

  const eyeToggle = (e) => {
    e.preventDefault();
    setShowEye(!showEye);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        router.push("/admin/Signin");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error signing up admin:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <Layout>
       <Navbar />
      <div className="py-20 md:py-6 bg-gray-50 flex flex-col justify-center px-4 lg:px-8">
        {/* Heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create a new account as an Admin
          </h2>
          <p className="flex flex-col mt-2 text-center text-sm text-gray-500">
            -OR-
            <span>Already have an account</span>
            <Link
              href="/admin/SignIn"
              className="font-medium text-blue-600 hover:text-blue-500 transition ease-in-out duration-150"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              {/* Username */}
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
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="adminuser"
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm sm:text-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showEye ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
                  />
                  <Eyebtn showEye={showEye} eyeToggle={eyeToggle} />
                </div>
              </div>

              {/* Submit */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 transition duration-150 ease-in-out"
                >
                  Create account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SignUp;
