import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { useRouter } from "next/router";

export default function ReturnPolicy() {
    const router = useRouter();
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center text-green-700">
          Return & Refund Policy
        </h1>

        <p className="mb-4 text-gray-700">
          At <strong>Fatimaz</strong>, customer satisfaction is our priority. However, due to the nature of our business, <strong>returns are only accepted within 24 hours</strong> of delivery. We do not accept returns after this window.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Return Window</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Returns must be requested <strong>within 24 hours</strong> of the delivery time.</li>
          <li>Requests made after 24 hours of delivery <strong>will not be accepted</strong> under any circumstances.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">2. Return Eligibility</h2>
        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li>Item must be in unused and original condition with all tags and packaging intact.</li>
          <li>A valid order ID or proof of purchase must be provided.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">3. Refunds</h2>
        <p className="text-gray-700">
          Once your return is approved and we receive the item in original condition, a refund will be issued to your original payment method within 5–7 business days.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Return Shipping</h2>
        <p className="text-gray-700">
          Return shipping costs are the responsibility of the customer unless the item is damaged or incorrect.
        </p>

           <h2 className="text-2xl font-semibold mt-8 mb-4">5. Contact Us</h2>
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
