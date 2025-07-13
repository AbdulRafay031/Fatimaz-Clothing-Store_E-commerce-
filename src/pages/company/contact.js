import React, { useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "../../component/navbar";
import Footer from "../../component/footer";

const ContactUs = () => {
  const form = useRef();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/community/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        form.current.reset();
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="px-4 py-20 flex flex-col items-center">
        <div className="text-center mb-10" data-aos="fade-up">
          <h1 className="text-sm uppercase tracking-wide font-semibold text-gray-700">
            Get in Touch
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold mt-2">
            Contact Fatimaz Team
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Whether you have a question about your order, need help with sizing,
            or just want to say hi — we’re here for you.
          </p>
        </div>

        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 md:p-10 max-w-2xl w-full"
          data-aos="zoom-in"
        >
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              placeholder="+92 300 1234567"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              name="message"
              rows="5"
              placeholder="Type your message..."
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ContactUs;
