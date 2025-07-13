"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Navbar from "../../component/Up-navbar";
import Footer from "../../component/footer";

export default function CurrentOrders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    if (!session?.user?.email) return;
    const res = await axios.get(
      `/api/order/user-orders?email=${session.user.email}`
    );
    const current = res.data.filter((order) => order.status === "pending");
    setOrders(current);
  };

  const cancelOrder = async (id) => {
    try {
      await axios.put("/api/order/cencel", { id });
      fetchOrders(); // Refresh list after cancel
    } catch (err) {
      alert("Failed to cancel order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [session]);

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold text-center mb-6">
          Current Orders ({orders.length})
        </h2>
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="border rounded-lg p-4 bg-gray-50 shadow"
            >
              <p className="mb-2">
                <strong>Total:</strong> Rs {order.totalAmount}
              </p>
              <p className="mb-2">
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                {order.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-center bg-white p-2 rounded shadow-sm"
                  >
                    <img
                      src={item.image}
                      className="w-20 h-20 object-cover rounded"
                      alt={item.name}
                    />
                    <div>
                      <p>
                        <strong>{item.name}</strong>
                      </p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p>Price: Rs {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 🕒 Show cancel button only within 48 hours */}
              {(() => {
                const orderTime = new Date(order.createdAt).getTime();
                const now = new Date().getTime();
                const hoursDiff = (now - orderTime) / (1000 * 60 * 60); // ms → hours

                if (hoursDiff <= 48) {
                  return (
                    <button
                      onClick={() => cancelOrder(order._id)}
                      className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel Order
                    </button>
                  );
                } else {
                  return (
                    <p className="mt-4 text-gray-500 italic">
                      Cancellation window closed
                    </p>
                  );
                }
              })()}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
