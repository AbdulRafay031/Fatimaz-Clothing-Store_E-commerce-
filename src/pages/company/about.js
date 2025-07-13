import React from "react";
import Image from "next/image";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { useRouter } from "next/router";

const about = () => {
const router = useRouter();

  return (
    <div className="bg-white min-h-full">
      <Navbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-black mb-6">About Us</h1>
        <div className="flex justify-center">
          <Image
            src="/logo5.jpg"
            width={800}
            height={500}
            className="h-96"
            alt="Fatimaz Logo"
          />
        </div>
        <p className="text-lg text-gray-700 mb-6">
          Founded in <strong>2011</strong>,{" "}
          <span className="text-green-700 font-semibold">Fatimaz</span> began as
          a humble boutique at <strong>Shop #90, Shama Shopping Centre</strong>.
          Over the years, we’ve blossomed into a recognized fashion brand,
          celebrated for our blend of modern elegance and traditional charm.
        </p>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          <Image
            src="/about3.webp"
            alt="Fatimaz Clothing"
            width={200}
            height={200}
            className="w-full h-64 object-cover rounded-xl shadow-md"
          />
          <p className="text-base text-gray-600">
            Our collections are crafted for every woman — confident, graceful,
            and expressive. Whether you’re choosing an outfit for a casual day
            out or a celebration, Fatimaz offers timeless designs made with
            premium fabrics and fine tailoring.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
          <p className="text-base text-gray-600">
            At <span className="text-green-700 font-medium">Fatimaz</span>,
            fashion is more than clothing — it’s a form of self-expression.
            That’s why we are committed to delivering not just style, but also
            comfort, quality, and confidence with every outfit.
          </p>
          <Image
            src="/about2.jpg"
            alt="Fatimaz Fashion Studio"
            width={200}
            height={200}
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />
        </div>

        <h2 className="text-2xl font-semibold text-black mb-2">
          Join the Fatimaz Community
        </h2>
        <p className="text-base text-gray-600 mb-2">
          Discover fashion that fits your life. Follow us, shop with us, and
          step into a world where elegance meets everyday style.
        </p>
        <p className="italic text-green-700">
          Fatimaz — your style, our passion.
        </p>
        <div className="flex justify-center mt-6">
          <button
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
            onClick={() => router.push("/company/fatimaz-community")} // 👈 redirect to community page
          >
            Join Fatimaz Community
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default about;
