import React from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Link from "next/link";

const Registry = () => {
  return (
    <div className="bg-gray-50 text-black min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Fatimaz Gift Registry</h1>
          <p className="text-gray-600 mt-3 text-lg">
            Celebrate special moments by creating or finding a registry
          </p>
        </div>

        {/* Create or Find Registry */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-4">🎁 Create a Registry</h2>
            <p className="text-gray-600 mb-4">
              Plan the perfect gift list for your special event — be it a wedding, birthday, or baby arrival.
            </p>
            <Link href="/company/registry-create">
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg">
                Create Registry
              </button>
            </Link>
          </div>

          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-2xl font-semibold mb-4">🔍 Find a Registry</h2>
            <p className="text-gray-600 mb-4">
              Search for a friend's or family member's registry by name or email.
            </p>
            <Link href="/registry/find">
              <button className="bg-black hover:bg-gray-800 text-white font-semibold px-6 py-2 rounded-lg">
                Find Registry
              </button>
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">Why Create a Registry on Fatimaz?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl mb-2">💡</p>
              <h3 className="text-lg font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-gray-600 text-sm">
                Get automatic product recommendations based on your occasion.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl mb-2">🚚</p>
              <h3 className="text-lg font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600 text-sm">
                Friends and family can send gifts directly to your door.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <p className="text-4xl mb-2">🎉</p>
              <h3 className="text-lg font-semibold mb-2">Perfect for Any Event</h3>
              <p className="text-gray-600 text-sm">
                Whether it’s a wedding, baby shower, or housewarming — we’ve got you covered.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registry;
