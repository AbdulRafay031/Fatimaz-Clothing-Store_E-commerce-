import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../component/Admin-navbar";
import Footer from "../../component/footer";
import DashboardNavbar from "../../component/Dash-navbar";

export default function AdminReturns() {
  const [returns, setReturns] = useState([]);
  const [confirmedCount, setConfirmedCount] = useState(0);

  const fetchReturns = async () => {
    try {
      const res = await axios.get("/api/order/get-returns");
      setReturns(res.data);

      const confirmed = res.data.filter(
        (item) => item.status === "confirmed"
      ).length;
      setConfirmedCount(confirmed);
    } catch (err) {
      console.error("Error fetching returns:", err);
    }
  };

  const handleAction = async (returnId, action) => {
    try {
      await axios.put("/api/order/handle-return", { returnId, action });
      fetchReturns();
    } catch (err) {
      console.error("Error updating return:", err);
    }
  };

  useEffect(() => {
    fetchReturns();
  }, []);

  return (
    <div className="bg-white min-h-screen text-black">
      <Navbar />
      <DashboardNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-2">All Return Requests</h2>
        <p className="text-lg text-green-700 font-medium mb-6">
          Return Confirmed: {confirmedCount}
        </p>

        <div className="grid gap-6">
          {returns.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded shadow bg-gray-100"
            >
              {/* Product Details */}
              <div className="flex items-center gap-4">
                <img
                  src={item.product?.image}
                  alt={item.product?.name}
                  className="w-24 h-24 rounded object-cover border"
                />
                <div>
                  <p>
                    <strong>Product:</strong> {item.product.name}
                  </p>
                  <p>
                    <strong>Color:</strong> {item.product.color}
                  </p>
                  <p>
                    <strong>Size:</strong> {item.product.size}
                  </p>
                  <p>
                    <strong>Price:</strong> Rs {item.product.price}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.product.quantity}
                  </p>
                </div>
              </div>

              {/* Order Info */}
              <p className="mt-3">
                <strong>Order ID:</strong> {item.orderId}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    item.status === "confirmed"
                      ? "text-green-600"
                      : item.status === "declined"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {item.status}
                </span>
              </p>
              <p>
                <strong>Reason:</strong> {item.reason}
              </p>

              {/* Customer Info */}
              {item.customer && (
                <div className="mt-3">
                  <h4 className="font-semibold">Customer Info:</h4>
                  <p>
                    <strong>Name:</strong> {item.customer.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {item.customer.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {item.customer.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {item.customer.address}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2 mt-3">
                {item.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAction(item._id, "accepted")}
                      className="bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleAction(item._id, "declined")}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Decline
                    </button>
                  </>
                )}
                {item.status === "accepted" && (
                  <button
                    onClick={() => handleAction(item._id, "confirmed")}
                    className="bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Confirm Return Order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
