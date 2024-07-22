import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <nav className="bg-black shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                &#9776;
              </button>
            </div>
            <div className="absolute inset-y-0 left-12 flex items-center sm:left-0">
              {/* Animated Logo */}
              <div className="flex items-center">
                <img
                  src="/logo-1.webp"
                  className="h-8 mr-2"
                  alt="Flowbite Logo"
                />
                <span className="text-2xl font-bold whitespace-nowrap text-white">
                  FATIMAZ
                </span>
              </div>
            </div>
            <div className="hidden sm:flex flex-1 items-center justify-center">
              <div className="flex space-x-4">
                <Link href="/admin/Addnewproduct">
                  <div className="text-white hover:bg-sky-700 block px-3 py-2 rounded-md text-base font-medium">
                    Add New Product
                  </div>
                </Link>
                <Link href="/admin/Manageproduct">
                  <div className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                    Manage Product
                  </div>
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Link href="/">
                <div className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  Logout
                </div>
              </Link>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden bg-black"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link href="/admin/Addnewproduct">
                  <div className="text-white hover:bg-sky-700 block px-3 py-2 rounded-md text-base font-medium">
                    Add New Product
                  </div>
                </Link>
                <Link href="/admin/Manageproduct">
                  <div className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                    Manage Product
                  </div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative top-0 transform -translate-y-1/4">
        <div className="flex items-center justify-center h-20 sm:h-60 md:h-80 lg:h-76">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-gray-800 text-center animate-flicker">
            <span className="letter-border">F</span>
            <span className="letter-border">A</span>
            <span className="letter-border">T</span>
            <span className="letter-border">I</span>
            <span className="letter-border">M</span>
            <span className="letter-border">A</span>
            <span className="letter-border">Z</span>
          </h1>
        </div>
        <style jsx>{`
          @keyframes flicker {
            0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% {
              opacity: 1;
              color: sky-300;
              text-shadow: 0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.9), 0 0 40px rgba(255, 255, 255, 0.8), 0 0 50px rgba(255, 255, 255, 0.7);
            }
            20%, 21.999%, 63%, 63.999%, 65%, 69.999% {
              opacity: 0.4;
              color: #f0f0f0;
              text-shadow: none;
            }
          }

          .animate-flicker {
            animation: flicker 2s infinite;
          }

          .letter-border {
            display: inline-block;
            -webkit-text-stroke: 1px black;
            text-stroke: 1px black;
          }
        `}</style>
        <div>
          <h1>Welcome to the dashboard</h1>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
