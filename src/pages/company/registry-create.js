import React from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { Sparkles } from "lucide-react";
import Link from "next/link";

const RegistryCreateComingSoon = () => {
  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center px-6 py-20">
        <div className="text-center max-w-2xl">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full shadow-lg animate-pulse">
              <Sparkles className="text-green-700 w-10 h-10" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Create Your Registry — Coming Soon!
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            We’re working on something exciting. Soon you’ll be able to create gift registries for weddings, baby showers, birthdays, and more right here on Fatimaz.
          </p>
          <Link href="/company/registry">
            <button className="mt-4 px-6 py-3 bg-green-700 text-white rounded-full font-semibold hover:bg-green-800 transition">
              Go Back to Registry Home
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default RegistryCreateComingSoon;
