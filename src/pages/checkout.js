// pages/checkout.js
import { useCart } from "../component/CartContext";
import { useRouter } from "next/router";
import Nav from "../component/navbar";
import Footer from "../component/footer";
import { useEffect, useState } from "react";

export default function Checkout() {
  const { cartItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleProceedToPay = () => {
    router.push("/order-summary");
  };

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto p-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>

        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">Product Summary</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2">
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p>RS {item.price * item.quantity}</p>
            </div>
          ))}
          <p className="text-right font-bold mt-2">Subtotal: RS {subtotal}</p>
        </div>

        <button
          onClick={handleProceedToPay}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Proceed to Pay
        </button>
      </div>
      <Footer />
    </div>
  );
}
