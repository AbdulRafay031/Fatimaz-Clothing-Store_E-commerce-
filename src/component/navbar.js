// Navbar.js
import React, { useState } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
// import { Link, NavLink } from 'react-router-dom'
// import { useAuth } from '../context/auth';
// import { Badge } from "antd";
import { FaShoppingCart } from "react-icons/fa";
// import { useSelector } from 'react-redux';

const Navbar = () => {
  const router = useRouter();


  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [opensearch, setOpensearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  }

  const toggleSearchMenu = () => {
    setOpensearch(!opensearch);
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };

  return (
    <nav className="bg-black text-white sticky top-0 w-full z-10">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

      {/* Burger menu for mobile */}
      <div className="md:hidden">
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          onClick={toggleMobileMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" viewBox="0 0 17 14">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="flex lg:w-auto ">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="h-8"
          alt="Flowbite Logo"
        />
        <span className="self-center text-2xl font-semibold whitespace-nowrap px-2">
          FATIMAZ
        </span>
      </div>

      {/* Cart for mobile */}
      <div className="md:hidden md:order-3">
        <Link href="/Cart">
          <div className="block py-2 px-3 bg-black rounded hover:border hover:border-white hover:rounded-none flex items-center border border-transparent hover:border-white cursor-pointer duration-300">
            <img
              className="w-auto h-6 mr-2"
              src="/cartimg.png"
              alt="cartImg"
            />
            <p className="text-xs text-white font-bold">Cart</p>
          </div>
        </Link>
      </div>

      <div className="hidden lg:flex lg:w-auto lg:flex-grow justify-center items-center">

        {/* Input search box--------------- For large screen */}
        <div className="relative hidden lg:block lg:w-1/2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search icon</span>
          </div>

          {/* Search input field */}
          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search..."
          />
        </div>

        {/* Sign in and Sign up links */}
        <ul className="hidden lg:flex lg:space-x-4 lg:items-center lg:ml-4">
          <li>
            <Link href="/SignIn">
              <div className="block py-2 px-3 bg-black rounded hover:border hover:border-white hover:rounded-none">
                Sign In
              </div>
            </Link>
          </li>
          <li>
            <Link href="/SignUp">
              <div className="block py-2 px-3 bg-black rounded hover:border hover:border-white hover:rounded-none">
                Sign Up
              </div>
            </Link>
          </li>
          <li>
            <Link href="/Cart">
              <div className="block py-2 px-3 bg-black rounded hover:border hover:border-white hover:rounded-none flex items-center border border-transparent hover:border-white cursor-pointer duration-300">
                <img
                  className="w-auto h-6 mr-2"
                  src="/cartimg.png"
                  alt="cartImg"
                />
                <p className="text-xs text-white font-bold">Cart</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>

     
    </div>

    {/* Mobile menu and search */}
    <div
      className="bg-black items-center justify-between w-full md:flex md:w-auto md:order-2"
      id="navbar-search"
    >
      {/* Search for small screen */}
      
        <div className="relative mt-6 md:hidden">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>

          <input
            type="text"
            id="search-navbar"
            className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 outline-none"
            placeholder="Search..."
          />
        </div>
      

      {openMobileMenu && (
        <ul className="md:flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-black">
          <li>
            <Link href="/">
              <div className="block py-2 px-3 bg-black rounded">
                Home
              </div>
            </Link>
          </li>
          <li>
            <Link href="/Signin">
              <div className="block py-2 px-3 bg-black rounded">
                Sign In
              </div>
            </Link>
          </li>
          <li>
            <Link href="/Signup">
              <div className="block py-2 px-3 bg-black rounded">
                Sign Up
              </div>
            </Link>
          </li>
        </ul>
      )}
    </div>
 

  
   
  <nav className="bg-gray-900 text-white border-gray-200 dark:bg-gray-900">
  <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-2 sm:p-4">
   
    {/* Right side with categories */}
    <div id="mega-menu" className="items-center justify-between w-full md:flex md:w-auto md:order-1">
      <ul className="flex flex-row overflow-x-auto mt-2 sm:mt-4 font-medium md:flex-row md:mt-0 md:space-x-4 rtl:space-x-reverse">
        <li>
          <Link href="/">
            <div className="whitespace-nowrap block py-1 sm:py-2 px-2 sm:px-3 text-base text-gray-200 border border-transparent hover:border-white hover:text-white 
            hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 
            md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Home</div>
          </Link>
        </li>
        <li>
          <Link href="#">
            <div className="whitespace-nowrap block py-1 sm:py-2 px-2 sm:px-3 text-base text-gray-200 border border-transparent hover:border-white hover:text-white 
            hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 
            md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Customer Service</div>
          </Link>
        </li>
        <li>
          <Link href="#">
            <div className="whitespace-nowrap block py-1 sm:py-2 px-2 sm:px-3 text-base text-gray-200 border border-transparent hover:border-white 
            hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 
            dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Registry</div>
          </Link>
        </li>
        <li>
          <Link href="#">
            <div className="whitespace-nowrap block py-1 sm:py-2 px-2 sm:px-3 text-base text-gray-200 border border-transparent hover:border-white 
            hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500
             dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Gift Cards</div>
          </Link>
        </li>
        <li>
        <div className="whitespace-nowrap block py-1 sm:py-2 px-2 sm:px-3 text-base text-gray-200 border border-transparent hover:border-white 
            hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500
             dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">
          <Link href="/seller/Seller">
           Seller
          </Link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</nav>



    


  </nav >
    
  );
};

export default Navbar;
