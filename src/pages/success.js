import Nav from "../component/navbar";
import Footer from "../component/footer";


export default function SuccessPage() {
  return (
    <div>
      <Nav />
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <h1 className="text-3xl font-bold text-green-700 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your order. A confirmation email has been sent.
        </p>
        <a
          href="/"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Back to Home
        </a>
      </div>
      <Footer />
    </div>
  );
}
