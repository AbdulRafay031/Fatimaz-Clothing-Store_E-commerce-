import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { useRouter } from "next/router";

export default function TermsAndConditions() {
    const router = useRouter();
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">
          Terms & Conditions
        </h1>

        <p className="mb-4 text-gray-700">
          Welcome to <strong>Fatimaz</strong>. These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing this website, you accept these terms in full.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Use of Website</h2>
        <p className="text-gray-700">
          You agree to use this website only for lawful purposes. You may not use it in any way that could harm, disable, or impair our services or interfere with others’ use.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Account Registration</h2>
        <p className="text-gray-700">
          You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Orders & Payments</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>All orders are subject to availability and confirmation of the order price.</li>
          <li>Payment must be made in full before the order is processed and shipped.</li>
          <li>We reserve the right to refuse any order at our sole discretion.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Shipping & Delivery</h2>
        <p className="text-gray-700">
          We aim to deliver products within the estimated timeframes, but delays may occur. We are not liable for any late deliveries due to external factors.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Returns & Refunds</h2>
        <p className="text-gray-700">
          Please review our <a href="/company/return-policy" className="text-green-700 underline">Return Policy</a> for detailed information on returns, exchanges, and refunds.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>
        <p className="text-gray-700">
          All content on this site, including logos, images, and designs, is the property of Fatimaz and protected by copyright laws. You may not use or reproduce any content without our written permission.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
        <p className="text-gray-700">
          Fatimaz shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use or inability to use our services or products.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Modifications</h2>
        <p className="text-gray-700">
          We reserve the right to change these terms at any time. Updated terms will be posted on this page. Continued use of our site after changes means you accept the new terms.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">9. Governing Law</h2>
        <p className="text-gray-700">
          These Terms are governed by the laws of Pakistan. Any disputes shall be subject to the jurisdiction of the courts of Pakistan.
        </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>
        <p className="text-gray-700">
          If you have questions or concerns about this Privacy Policy, you can contact us.
        </p>
         <div className="flex justify-center mt-6">
          <button
            className="bg-green-700 hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300"
            onClick={() => router.push("/company/contact")} 
          >
            Contact Us
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
