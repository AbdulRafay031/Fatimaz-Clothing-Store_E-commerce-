"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Up-navbar";
import Footer from "../../component/footer"

export default function DeliveredOrders() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        if (!session?.user?.email) return;
        const res = await axios.get(`/api/order/user-orders?email=${session.user.email}`);
        const delivered = res.data.filter(order => order.status === "delivered");
        setOrders(delivered);
      } catch (error) {
        console.error("Failed to fetch delivered orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredOrders();
  }, [session?.user?.email]);

  return (
    <div className=" bg-white min-h-screen text-black">
      <Navbar />
      <h1 className="text-2xl font-bold text-center mb-6 text-black">
        Delivered Orders ({orders.length})
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-yellow-600 font-medium">Delivery is in progress.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="border rounded-lg p-4 mb-6 shadow">
            <h2 className="text-lg font-semibold mb-2 text-green-600">Delivery Confirmed</h2>
            {order.cartItems.map((item, index) => (
              <div key={index} className="flex items-center border p-3 rounded-md mb-2 bg-gray-50">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <p><strong>Name:</strong> {item.name}</p>
                  <p><strong>Price:</strong> Rs {item.price}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Size:</strong> {item.size}</p>
                  <p><strong>Color:</strong> {item.color}</p>
                </div>
              </div>
            ))}
          </div>
        ))
      )}
      <Footer />
    </div>
  );
}
