import React from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Image from "next/image";
import { Gift, Mail, ShoppingCart } from "lucide-react";
import Link from "next/link";

const giftCards = [
  {
    id: 1,
    amount: 300,
    image: "/1.png",
    purpose: "New Arrival Variety",
  },
  {
    id: 2,
    amount: 400,
    image: "/3.png",
    purpose: "Seasonal Collection",
  },
  {
    id: 3,
    amount: 500,
    image: "/4.png",
    purpose: "Wedding & Event Picks",
  },
  {
    id: 4,
    amount: 600,
    image: "/5.png",
    purpose: "Festive Gift Surprise",
  },
  {
    id: 5,
    amount: 700,
    image: "/2.png",
    purpose: "Birthday Present",
  },
  {
    id: 6,
    amount: 800,
    image: "/6.png",
    purpose: "Mother's Day Special",
  },
  {
    id: 7,
    amount: 850,
    image: "/7.png",
    purpose: "New Baby Welcome",
  },
  {
    id: 8,
    amount: 900,
    image: "/8.png",
    purpose: "Eid Collection",
  },
  {
    id: 9,
    amount: 950,
    image: "/9.png",
    purpose: "Ramzan Collection",
  },
  {
    id: 10,
    amount: 1000,
    image: "/10.png",
    purpose: "Any Occasion",
  },
];

const GiftCardPage = () => {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />

      {/* Header Section */}
      <section className="text-center py-12 px-4 bg-gradient-to-r from-green-50 to-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <Gift className="text-green-600 w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Fatimaz Gift Cards</h1>
          <p className="text-gray-600 text-lg">
            Gift fashion for every occasion. Choose from beautifully designed
            cards, delivered instantly via email.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {giftCards.map((card) => (
          <div
            key={card.id}
            className="border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
          >
            <div className="relative w-full h-48">
              <Image
                src={card.image}
                alt={`Gift Card ₨${card.amount}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-green-800">
                ₨{card.amount} - {card.purpose}
              </h3>
              <p className="text-gray-500 text-sm mt-1 mb-4">
                Send via email for a personal surprise!
              </p>
              <Link href="/company/gift-buynow" passHref>
                <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded-full font-medium flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Buy Now
                </button>
              </Link>
            </div>
          </div>
        ))}
      </section>

      {/* Purpose Description */}
      <section className="bg-gray-50 py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Why Choose a Fatimaz Gift Card?
        </h2>
        <ul className="text-gray-600 max-w-xl mx-auto space-y-3 text-left text-base">
          <li>
            🎁 Perfect for birthdays, weddings, baby showers, Eid, and holidays
          </li>
          <li>📩 Email instantly or download & print beautifully</li>
          <li>
            💃 Redeemable on all fashion categories — women, kids, and baby
          </li>
          <li>🛒 No expiry — your style, your time</li>
        </ul>
      </section>

      <Footer />
    </div>
  );
};

export default GiftCardPage;
