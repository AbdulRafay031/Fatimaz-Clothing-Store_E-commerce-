import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Admin-navbar";
import Footer from "../../component/footer";
import DashboardNavbar from "../../component/Dash-navbar"

const ConfirmedOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/order/Get");
      const delivered = res.data.filter((order) => order.status === "delivered");
      setOrders(delivered);
    } catch (error) {
      console.error("Error fetching confirmed orders:", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />
      <DashboardNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Confirmed Deliveries: {orders.length}</h2>
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded shadow bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Customer Info</h3>
              <p><strong>Name:</strong> {order.customer.name}</p>
              <p><strong>Email:</strong> {order.customer.email}</p>
              <p><strong>Phone:</strong> {order.customer.phone}</p>
              <p><strong>Address:</strong> {order.customer.address}</p>
              <p><strong>Total:</strong> Rs {order.totalAmount}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

              <h4 className="mt-4 font-semibold">Products:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {order.cartItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center bg-white p-2 rounded shadow-sm">
                    <img src={item.image} className="w-20 h-20 object-cover rounded" />
                    <div>
                      <p><strong>{item.name}</strong></p>
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
};

export default ConfirmedOrders;
