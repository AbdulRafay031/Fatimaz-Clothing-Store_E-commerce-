"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Navbar from "../../component/Up-navbar";
import Footer from "../../component/footer"

export default function UserRemainingOrders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!session?.user?.email) return;
    const res = await axios.get(`/api/order/user-orders?email=${session.user.email}`);
    const remaining = res.data.filter(order => order.status !== "delivered" && order.status !== "cancelled");
    setOrders(remaining);
  };

  useEffect(() => {
    fetchOrders();
  }, [session]);

  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6 text-black">
        <h2 className="text-2xl font-bold text-center mb-6">Remaining Orders: {orders.length}</h2>

        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded-lg shadow bg-gray-50">
              <p className="mb-2 text-sm text-gray-500">Date: {new Date(order.createdAt).toLocaleString()}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {order.cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 bg-white p-2 rounded shadow-sm">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p>Price: Rs {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
