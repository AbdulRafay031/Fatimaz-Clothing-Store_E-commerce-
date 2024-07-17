
import { React, useState } from "react"
import Layout from "@/component/Layout";
import Link from "next/link";
import Eyebtn from "@/component/Eyebtn";

const SignUpSeller = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [shopname, setShopname] = useState(""); 
  const [category, setCategory] = useState("clothes");
  const [showEye, setShowEye] = useState(false);

  const categories = ["clothes", "electronics", "furniture", "home appliances", "groceries"];

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // logic
  };

  const eyeToggle = (e) => {
    e.preventDefault();
    setShowEye(!showEye);
  };

  return (
    <Layout>
      <>
        <div className="py-20 md:py-6 bg-gray-50 flex flex-col justify-center px-4 lg:px-8">
          {/* main heading */}
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
              Create a new account as a Seller
            </h2>
            <p className="flex flex-col mt-2 text-center text-sm leading-5 text-gray-500 max-w">
              -OR-
              <p>Already have an account</p>
              <div className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline transition ease-in-out duration-150">
                <Link href='/seller/Signin'>
                  Login 
                </Link>
              </div>
            </p>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit}>

                {/* name field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium leading-5 text-gray-700">
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
                  <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
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
                  <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
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
                  <label htmlFor="phone" className="block text-sm font-medium leading-5 text-gray-700">
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
                </div>

                {/* address field */}
                <div className="mt-6">
                  <label htmlFor="address" className="block text-sm font-medium leading-5 text-gray-700">
                    Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="address"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="123 Street, City"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                {/* shopname field */}
                <div className="mt-6">
                  <label htmlFor="shopname" className="block text-sm font-medium leading-5 text-gray-700">
                    Shop Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      id="shopname"
                      name="shopname"
                      value={shopname}
                      onChange={(e) => setShopname(e.target.value)}
                      placeholder="My Shop"
                      type="text"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    />
                  </div>
                </div>

                {/* product category dropdown */}
                <div className="mt-6">
                  <label htmlFor="category" className="block text-sm font-medium leading-5 text-gray-700">
                    Product Category
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <select
                      id="category"
                      name="category"
                      value={category}
                      onChange={handleCategoryChange}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
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

export default SignUpSeller;
