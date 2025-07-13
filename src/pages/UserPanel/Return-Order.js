// pages/UserPanel/Return-Order.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Up-navbar";
import Footer from "../../component/footer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReturnOrder = () => {
  const [orders, setOrders] = useState([]);
  const [returnData, setReturnData] = useState({});

  const fetchDeliveredOrders = async () => {
    try {
      const res = await axios.get("/api/order/Get");
      const deliveredOrders = res.data.filter(
        (order) => order.status === "delivered"
      );
      setOrders(deliveredOrders);
    } catch (error) {
      console.error("Error fetching delivered orders:", error);
    }
  };

  const handleReturn = async (orderId, product, reason) => {
    if (!reason.trim()) {
      toast.error("Please enter a reason for return.");
      return;
    }
    try {
      const res = await axios.post("/api/order/return", {
        orderId,
        product,
        reason,
      });
      if (res.data.success) {
        toast.success(
          "Return request is in progress. You may be charged Rs. 200 for return service."
        );
        setReturnData((prev) => ({
          ...prev,
          [product._id]: "submitted",
        }));
      } else {
        toast.error("Failed to send return request.");
      }
    } catch (err) {
      toast.error("Error sending return request.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchDeliveredOrders();
  }, []);

  const isReturnable = (createdAt) => {
    const now = new Date();
    const orderTime = new Date(createdAt);
    const hoursDiff = (now - orderTime) / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-4">Returnable Orders</h2>
        <div className="grid gap-6">
          {orders.map((order, index) => (
            <div key={index} className="border p-4 rounded shadow bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Customer Info</h3>
              <p>
                <strong>Name:</strong> {order.customer.name}
              </p>
              <p>
                <strong>Email:</strong> {order.customer.email}
              </p>
              <p>
                <strong>Phone:</strong> {order.customer.phone}
              </p>
              <p>
                <strong>Address:</strong> {order.customer.address}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <h4 className="mt-4 font-semibold">Products:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {order.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-center bg-white p-2 rounded shadow-sm"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex flex-col gap-1 w-full">
                      <p className="font-semibold">{item.name}</p>
                      <p>Qty: {item.quantity}</p>
                      <p>Size: {item.size}</p>
                      <p>Color: {item.color}</p>
                      <p>Price: Rs {item.price}</p>
                      {isReturnable(order.createdAt) ? (
                        returnData[item._id] === "submitted" ? (
                          <span className="text-green-600 font-medium mt-2">
                            Return request submitted
                          </span>
                        ) : !returnData[item._id] ? (
                          <button
                            onClick={() =>
                              setReturnData((prev) => ({
                                ...prev,
                                [item._id]: true,
                              }))
                            }
                            className="bg-red-600 text-white px-3 py-1 rounded mt-2 hover:bg-red-700"
                          >
                            Return
                          </button>
                        ) : (
                          <div className="mt-2">
                            <label className="block text-sm">
                              Reason for Return
                            </label>
                            <input
                              type="text"
                              onChange={(e) =>
                                setReturnData((prev) => ({
                                  ...prev,
                                  [`reason-${item._id}`]: e.target.value,
                                }))
                              }
                              value={returnData[`reason-${item._id}`] || ""}
                              className="border px-2 py-1 w-full mt-1 mb-2"
                            />
                            <button
                              onClick={() =>
                                handleReturn(
                                  order._id,
                                  item,
                                  returnData[`reason-${item._id}`] || ""
                                )
                              }
                              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                              Submit
                            </button>
                            <p className="text-xs text-gray-600 mt-1">
                              * If approved, Rs. 200 will be charged for return
                              service.
                            </p>
                          </div>
                        )
                      ) : (
                        <span className="text-gray-500 mt-2">
                          Return timing is closed
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-center" />
    </div>
  );
};

export default ReturnOrder;
