import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { useRouter } from "next/router";

export default function PrivacyPolicy() {
  const router = useRouter();
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-black">Privacy Policy</h1>
        <p className="mb-4 text-gray-700">
          At <strong>Fatimaz</strong>, we are committed to protecting your personal information and your right to privacy. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit or make a purchase from our website.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Personal information such as name, email, phone number, shipping address, and payment details.</li>
          <li>Account credentials when you register (email and password).</li>
          <li>Order history, product preferences, and communication data.</li>
          <li>Usage data through cookies and analytics tools.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>To process and fulfill your orders.</li>
          <li>To communicate with you about your account, orders, or promotions.</li>
          <li>To improve and personalize your shopping experience.</li>
          <li>To detect and prevent fraud or abuse.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Cookies and Tracking</h2>
        <p className="text-gray-700">
          We use cookies to understand how you interact with our website, remember your preferences, and improve our services. You can control cookie settings in your browser at any time.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Sharing Your Information</h2>
        <p className="text-gray-700">
          We do not sell your personal information. We may share data with:
        </p>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Payment processors (e.g., Stripe, PayPal) to complete transactions.</li>
          <li>Shipping partners to deliver your orders.</li>
          <li>Analytics services like Google Analytics.</li>
          <li>Legal authorities if required by law.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Access, update, or delete your personal data at any time.</li>
          <li>Opt out of marketing emails via unsubscribe links.</li>
          <li>Request that we stop processing your data under certain conditions.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Security</h2>
        <p className="text-gray-700">
          We use secure technologies and best practices to protect your data from unauthorized access, disclosure, or misuse.
        </p>

     

        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to This Policy</h2>
        <p className="text-gray-700">
          We may update this Privacy Policy from time to time. We encourage you to review it periodically. Changes are effective once posted.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Contact Us</h2>
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
