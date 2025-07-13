import React from "react";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import Link from "next/link";

const CustomerService = () => {
  const helpTopics = [
    {
      title: "Track Your Order",
      description: "Find out the status of your recent order.",
      href: "/UserPanel/Current-Order",
      icon: "📦",
    },
    {
      title: "Return or Replace Items",
      description: "Return or exchange items within 24 hours.",
      href: "/UserPanel/return",
      icon: "🔄",
    },
    {
      title: "Payment Issues",
      description: "Having trouble with payment? Let us help.",
      href: "/company/contact",
      icon: "💳",
    },
    {
      title: "Account Settings",
      description: "Update your personal details and preferences.",
      href: "/UserPanel/account",
      icon: "👤",
    },
    {
      title: "Report a Problem",
      description: "Something went wrong? We’ll fix it.",
      href: "/company/contact",
      icon: "❗",
    },
    {
      title: "Contact Customer Support",
      description: "Reach out to our team via email or phone.",
      href: "/company/contact",
      icon: "☎️",
    },
  ];

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Welcome to Fatimaz Customer Service</h1>
          <p className="text-gray-600 mt-2">
            How can we help you today?
          </p>
        </div>

        {/* Help Topics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {helpTopics.map((topic, index) => (
            <Link key={index} href={topic.href}>
              <div className="bg-white border hover:shadow-xl transition-all duration-200 rounded-xl p-6 cursor-pointer">
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-lg font-semibold mb-1">{topic.title}</h3>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <p className="font-semibold">Q: How long does delivery take?</p>
              <p className="text-gray-700">A: Orders are usually delivered in 3–5 business days.</p>
            </div>
            <div>
              <p className="font-semibold">Q: Can I return items after 24 hours?</p>
              <p className="text-gray-700">A: No. Returns are only allowed within 24 hours of delivery.</p>
            </div>
            <div>
              <p className="font-semibold">Q: What payment methods are supported?</p>
              <p className="text-gray-700">A: Cash on Delivery, Easypaisa, JazzCash, and debit/credit cards.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CustomerService;
