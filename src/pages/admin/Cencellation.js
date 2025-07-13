"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Admin-navbar";
import Footer from "../../component/footer";
import DashboardNavbar from "../../component/Dash-navbar"

export default function AdminCancelledOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchCancelledOrders = async () => {
      const res = await axios.get("/api/admin/cancelled");
      setOrders(res.data);
    };

    fetchCancelledOrders();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white min-h-screen text-black">
        <Navbar />
        <DashboardNavbar />
      <h1 className="text-2xl font-bold text-center text-black mb-6">
        Cancelled Orders ({orders.length})
      </h1>

      {orders.map((order) => (
        <div key={order._id} className="border rounded-lg p-4 mb-6 shadow">
          <h2 className="text-lg font-semibold mb-2 text-red-600">Cancelled Order</h2>

          <div className="mb-4">
            <h3 className="font-semibold text-black">Customer Info:</h3>
            <p><strong>Name:</strong> {order.customer.name}</p>
            <p><strong>Email:</strong> {order.customer.email}</p>
            <p><strong>Phone:</strong> {order.customer.phone}</p>
            <p><strong>Address:</strong> {order.customer.address}</p>
          </div>

          <div>
            <h3 className="font-semibold text-black">Products:</h3>
            {order.cartItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center border p-3 rounded-md mb-2 bg-gray-50"
              >
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
        </div>
      ))}
      <Footer />
    </div>
  );
}
