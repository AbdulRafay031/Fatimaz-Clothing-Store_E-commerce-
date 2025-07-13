import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaUserCircle } from "react-icons/fa";
import { useCart } from "./CartContext";
import SearchBar from "./SearchBar";

const Navbar = ({ onSearchResultsChange = () => {} }) => {
  const { cartCount } = useCart();
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const toggleMobileMenu = () => setOpenMobileMenu(!openMobileMenu);
  return (
    <nav className="bg-black text-white sticky top-0 w-full z-10">
      {/* Top Nav */}
      <div className="max-w-screen-xl mx-auto flex justify-between items-center p-4">
        {/* Left: Toggle + Logo (Mobile) */}
        <div className="flex items-center lg:hidden space-x-4">
          {/* Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-gray-400 hover:bg-gray-700 rounded focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 17 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Image
              src="/logo13.png"
              width={150}
              height={50}
              className="h-16 w-auto"
              alt="Fatimaz Logo"
            />
            {/* <span className="text-2xl font-semibold">FATIMAZ</span> */}
          </div>
        </div>

        {/* Right: Auth & Cart (Desktop Only) */}
        <div className="hidden lg:flex items-center justify-between w-full px-4">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2 shrink-0">
            <Image
              src="/logo13.png"
              width={150}
              height={50}
              className="h-16 w-auto"
              alt="Fatimaz Logo"
              priority
            />
          </div>

          {/* Center: Search Bar */}
          <div className="flex-grow mx-12">
            <SearchBar onResultsChange={onSearchResultsChange} />
          </div>

          {/* Right: Auth & Cart */}
          <div className="flex items-center space-x-4 shrink-0">
            {status === "authenticated" ? (
              <>
                <button
                  onClick={() => router.push("/UserPanel/account")}
                  className="text-3xl text-blue-400 hover:text-blue-600"
                  title="Account"
                >
                  <FaUserCircle />
                </button>
                <button
                  onClick={() => signOut()}
                  className="py-2 px-3 rounded hover:border hover:border-white"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/SignIn"
                  className="py-2 px-3 rounded hover:border hover:border-white"
                >
                  Sign In
                </Link>
                <Link
                  href="/SignUp"
                  className="py-2 px-3 rounded hover:border hover:border-white"
                >
                  Sign Up
                </Link>
              </>
            )}

            <Link href="/cart" className="relative">
              <img src="/cartimg.png" alt="Cart" className="h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Right: Cart + User (Mobile Only) */}
        <div className="flex lg:hidden items-center space-x-4">
          <Link href="/cart" className="relative">
            <img src="/cartimg.png" alt="Cart" className="h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          {status === "authenticated" && (
            <button
              onClick={() => router.push("/UserPanel/account")}
              className="text-2xl text-blue-400 hover:text-blue-600"
              title="Account"
            >
              <FaUserCircle />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-2">
        <SearchBar onResultsChange={onSearchResultsChange} />
      </div>

      {/* Mobile Dropdown Menu */}
      {openMobileMenu && (
        <div className="bg-black px-4 pb-4 lg:hidden space-y-2">
          <Link href="/" className="block py-2 px-3 hover:bg-gray-700 rounded">
            Home
          </Link>

          {status === "authenticated" ? (
            <>
              <button
                onClick={() => router.push("/account")}
                className="block w-full text-left py-2 px-3 hover:bg-gray-700 rounded"
              >
                Account
              </button>
              <button
                onClick={() => signOut()}
                className="block w-full text-left py-2 px-3 hover:bg-gray-700 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/SignIn"
                className="block py-2 px-3 hover:bg-gray-700 rounded"
              >
                Sign In
              </Link>
              <Link
                href="/SignUp"
                className="block py-2 px-3 hover:bg-gray-700 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}

      {/* Category Bar */}
      <div className="bg-gray-900 text-white border-t">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex space-x-4 overflow-x-auto">
          {[
            { label: "Home", href: "/" },
            { label: "Customer Service", href: "/company/customer-service" },
            { label: "Registry", href: "company/registry" },
            { label: "Gift Cards", href: "/company/giftcard" },
            { label: "Seller", href: "/seller/Seller" },
          ].map((item, i) => (
            <Link href={item.href} key={i}>
              <span className="text-sm whitespace-nowrap py-1 px-3 rounded hover:bg-gray-700 border border-transparent hover:border-white transition duration-300 cursor-pointer">
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
