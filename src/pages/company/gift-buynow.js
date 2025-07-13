import React from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { BadgeDollarSign, Truck, Gift } from "lucide-react";

const GiftBuyCard = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* Header */}
      <div className="text-center py-16 px-4 bg-gradient-to-r from-green-100 to-white">
        <div className="max-w-3xl mx-auto">
          <Gift className="mx-auto text-green-600 w-12 h-12 mb-4" />
          <h1 className="text-4xl font-bold mb-2">Buy Fatimaz Gift Card</h1>
          <p className="text-gray-600 text-lg">
            Surprise your loved ones with fashion-forward gift cards. Easy & safe purchase with Cash on Delivery!
          </p>
        </div>
      </div>

      {/* Info Section */}
      <section className="max-w-4xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-start">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">How to Buy</h2>
          <p className="text-gray-700">
            At Fatimaz, we believe in convenience. That’s why you can purchase gift cards using{" "}
            <span className="font-semibold text-green-700">Cash on Delivery</span>.
          </p>
          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Select your desired gift card.</li>
            <li>Place any product order from our store.</li>
            <li>Your gift card will be delivered with your order.</li>
            <li>Pay cash at the time of delivery — simple!</li>
          </ul>
        </div>

        <div className="bg-green-50 rounded-lg p-6 shadow-md space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <BadgeDollarSign className="text-green-700 w-5 h-5" />
            Payment Method
          </h3>
          <p className="text-gray-700">💵 <strong>Cash on Delivery</strong> only. No online payment required.</p>

          <h3 className="text-lg font-semibold flex items-center gap-2 mt-6">
            <Truck className="text-green-700 w-5 h-5" />
            Delivery Info
          </h3>
          <p className="text-gray-700">
            The gift card will be delivered alongside any regular order. Please place an order to receive the card.
          </p>
        </div>
      </section>

      {/* CTA */}
      <div className="text-center py-12 bg-white">
        <h2 className="text-2xl font-bold mb-4">Ready to Surprise Someone?</h2>
        <p className="text-gray-600 mb-6">Explore our products, place an order, and your gift card will arrive with it!</p>
        <a
          href="/"
          className="inline-block bg-green-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-800 transition"
        >
          Start Shopping
        </a>
      </div>

      <Footer />
    </div>
  );
};

export default GiftBuyCard;
