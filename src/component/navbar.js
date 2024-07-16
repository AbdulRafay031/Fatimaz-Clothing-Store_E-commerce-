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

  const handleRegistrationClick = () => {
    router.push('/registration/registration');
  };

  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [opensearch, setOpensearch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [auth, setAuth] = useAuth();

  const toggleMobileMenu = () => {
    setOpenMobileMenu(!openMobileMenu);
  }

  const toggleSearchMenu = () => {
    setOpensearch(!opensearch);
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: ''
    })
    localStorage.removeItem('userdata')
  }
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const toggleMobileSearch = () => {
    setMobileSearchOpen(!mobileSearchOpen);
  };
  // const item = useSelector((state) => (state.cart))

  return (
    <nav className="bg-black text-white sticky top-0 z-10">
    <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-2">
  
      {/* Logo and Name */}
      <div className="flex items-center">
        <img
          src="/logo-1.webp"
          className="h-8 mr-2"
          alt="Flowbite Logo"
        />
        <span className="text-2xl font-bold whitespace-nowrap">
          FATIMAZ
        </span>
      </div>
  
      {/* Search Bar */}
    <div className='md:hidden'>
              <button
                type="button"
                data-collapse-toggle="navbar-search"
                aria-controls="navbar-search"
                aria-expanded="false"
                className="text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 rounded-lg text-sm p-2.5 me-1"
                onClick={toggleSearchMenu}
              >
                <svg
                  className="w-5 h-5"
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
                <span className="sr-only">Search</span>
              </button>
            </div>

            {/* input search box */}
            <div className="relative hidden md:block w-[50%]">
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

              {/* search input field */}
              <input
                type="text"
                id="search-navbar"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
      
  
      {/* Sign In, Sign Up, Cart Icons */}
      
      <div className="flex items-center space-x-4">
        {/* Sign In */}

        <div className="flex items-center border border-transparent hover:border-white cursor-pointer duration-300">
        <Link href='/SignIn'>
          signin
        </Link>
        </div>
  
        {/* Sign Up */}
     
      <div
        className="flex items-center border border-transparent hover:border-white cursor-pointer duration-300">
         <Link href='/SignUp'>
         Signup
         </Link>
        </div>
        
        {/* Cart */}
        <div className="flex items-center">
          <Link
            href={"/"}
            className="flex items-center border border-transparent hover:border-white cursor-pointer duration-300"
          >
            <img
              className="w-auto h-8 mr-2"
              src="/cartimg.png"
              alt="cartImg"
            />
            <p className="text-xs text-white font-bold">Cart</p>
          </Link>
        </div>
      </div>
  
     
     
    </div>
  
   
  <nav className="bg-gray-900 text-white border-gray-200 dark:bg-gray-900">
  <div className="flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4">
   
    {/* Right side with categories */}
    <div id="mega-menu" className="items-center justify-between w-full md:flex md:w-auto md:order-1">
      <ul className="flex flex-row overflow-x-auto mt-4 font-medium md:flex-row md:mt-0 md:space-x-4 rtl:space-x-reverse">
        <li>
          <Link href="#">
            <div className="block py-2 px-3 text-base text-gray-200 border border-transparent hover:border-white hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Mens</div>
          </Link>
        </li>
        <li>
          <Link href="#">
            <div className="block py-2 px-3 text-base text-gray-200 border border-transparent hover:border-white hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Womens</div>
          </Link>
        </li>
        <li>
          <Link href="#">
            <div className="block py-2 px-3 text-base text-gray-200 border border-transparent hover:border-white hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Electronics</div>
          </Link>
        </li>
        <li>
          <Link href="#">
            <div className="block py-2 px-3 text-base text-gray-200 border border-transparent hover:border-white hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Home Appliances</div>
          </Link>
        </li>
        <li>
          <Link href="#">
            <div className="block py-2 px-3 text-base text-gray-200 border border-transparent hover:border-white hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Furnitures</div>
          </Link>
        </li>
        <li>
          <Link href="#">
            <div className="block py-2 px-3 text-base text-gray-200 border border-transparent hover:border-white hover:text-white hover:bg-gray-700 md:hover:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:hover:bg-transparent dark:border-gray-700 transition duration-300">Mobiles</div>
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>


    


  </nav >
    
  );
};

export default Navbar;
