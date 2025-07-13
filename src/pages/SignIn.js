import React, { useState, useEffect } from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import Layout from "@/component/Layout";
import Link from "next/link";
import Eyebtn from "../component/Eyebtn";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Navbar from "../component/navbar";

const Login = () => {
  const { data: session } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setShowEye] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const eyeToggle = (e) => {
    e.preventDefault();
    setShowEye(!showEye);
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn("google", { redirect: false });
      if (result?.ok) {
        toast.success("Sign in successfully!");
      } else {
        toast.error("Google sign-in failed");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: router.query.callbackUrl || "/",
    });

    if (result.ok) {
      toast.success("Sign in successful");
      router.push(result.url || "/");
    } else {
      toast.error("Invalid email or password");
    }
  };

  if (!isClient) {
    return null;
  }

  if (session) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20 md:py-6 bg-gray-100 rounded lg:px-8">
          <div className="text-center">
            <h3 className="text-3xl font-extrabold text-gray-900 mb-6">
              Signed in as {session.user.email}
            </h3>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-sky-600 text-white rounded"
            >
              Go Back
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Navbar />
      <div className="py-20 md:py-6 bg-gray-100 flex flex-col justify-center px-2 rounded lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="flex flex-col mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <div className="font-medium text-blue-600 hover:text-blue-500">
              <Link href="/SignUp">Create an account</Link>
            </div>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSignIn}>
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

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
              <div>
                <span>
                  <button
                    onClick={handleGoogleSignIn}
                    type="button"
                    className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in with Google
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
