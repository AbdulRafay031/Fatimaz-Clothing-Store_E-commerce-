import React, { useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Layout from '@/component/Layout';
import Link from 'next/link';
import {FcGoogle} from 'react-icons/fc'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEye, setshoweye] = useState(false);
 
  //context
  // const [auth, setAuth] = useAuth();

  // const navigate = useNavigate();
  // const location = useLocation();

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("https://backend-xxjx.onrender.com/api/v1/auth/login", {
  //       email,
  //       password,
  //     });

  //     if (res.data.success) {
        
  //       setAuth({
  //         ...auth,
  //         user: res.data.user,
  //         token: res.data.token
  //       })
        
  //       toast.success(res.data.message);
  //       localStorage.setItem('userdata', JSON.stringify(res.data));
  //       navigate(location.state || "/");

  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   }
  //   catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  const eyeToggle = (e) => {
    e.preventDefault();
    setshoweye(!showEye)
  }


  return (
    <Layout>
      <div className="py-20 md:py-6 bg-gray-100 flex flex-col justify-center px-2 rounded lg:px-8">

        {/* main heading */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="flex flex-col mt-2 text-center text-sm text-gray-600 max-w">
            Or
            <div className="font-medium text-blue-600 hover:text-blue-500">
              <Link href='/SignUp'>
              Create an account
              </Link>
            </div>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">

            <form className="space-y-6" 
            // action="#"
            //  method="POST"
            //   onSubmit={handleSubmit}
              >

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

              {/* forget pass */}
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* sign in btn   */}
              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Sign in
                </button>
              </div>

             
            </form>

          </div>
        </div>
      </div>

    </Layout>
  )
}

export default Login

