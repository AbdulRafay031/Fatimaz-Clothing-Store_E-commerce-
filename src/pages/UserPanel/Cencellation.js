// pages/UserPanel/Cancelled-Order.js
"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Navbar from "../../component/Up-navbar";
import Footer from "../../component/footer"

export default function CancelledOrders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.email) return;
      const res = await axios.get(`/api/order/user-cancelled?email=${session.user.email}`);
      setOrders(res.data);
    };

    fetchOrders();
  }, [session]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <section className="max-w-4xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-black">
          Cancelled Orders: {orders.length}
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600">No cancelled orders found.</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="mb-6 border p-4 rounded-lg shadow">
              <h3 className="font-bold mb-2 text-black">Order #{index + 1}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-black">
                {order.cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-gray-100 p-2 rounded-lg">
                    <img src={item.image} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <p className="font-semibold text-black">{item.name}</p>
                      <p className="text-sm">Rs {item.price} × {item.quantity}</p>
                      <p className="text-sm">Size: {item.size}</p>
                      <p className="text-sm">Color: {item.color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </section>
      <Footer />
    </div>
  );
}
