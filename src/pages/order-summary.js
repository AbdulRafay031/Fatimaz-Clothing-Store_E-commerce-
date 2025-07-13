import { useCart } from "../component/CartContext";
import Nav from "../component/navbar";
import Footer from "../component/footer";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useUser } from "../component/UserContext";

export default function OrderSummary() {
  const { cartItems } = useCart();
  const user = useUser();
  const [isMounted, setIsMounted] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedAddress, setUpdatedAddress] = useState("");
  const [updatedPhone, setUpdatedPhone] = useState("");
  const [deliveryOption, setDeliveryOption] = useState("standard");
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    const fetchUser = async () => {
      if (!user?.email) return;
      const res = await axios.get(`/api/users/get?email=${user.email}`);
      setCustomerInfo(res.data);
      setUpdatedAddress(res.data.address);
      setUpdatedPhone(res.data.phoneNumber);
    };

    fetchUser();
  }, [user]);

  if (!isMounted) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleUpdate = async () => {
    try {
      await axios.put("/api/users/update", {
        email: user.email,
        address: updatedAddress,
        phoneNumber: updatedPhone,
      });
      setCustomerInfo({
        ...customerInfo,
        address: updatedAddress,
        phoneNumber: updatedPhone,
      });
      setEditing(false);
      alert("Info updated successfully");
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update info");
    }
  };

  const handlePlaceOrder = async () => {
    if (!user?.email) {
      alert("User not found or not logged in.");
      return;
    }

    try {
      await axios.post("/api/order", {
        cartItems: cartItems.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.frontImages?.[0] || "",
          size: item.userSize || "N/A",
          color: item.userColor || "N/A",
          _id: item._id,
        })),
        totalAmount: subtotal,
        userEmail: user.email,
        deliveryOption,
      });

      alert("Order placed Successfully");
      router.push("/success");
    } catch (error) {
      console.error("Order email failed", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div>
      <Nav />
      <div className="max-w-4xl mx-auto p-4 text-black">
        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

        {/* 📦 Payment Option */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold mb-2">Payment Option</h3>
          <div className="flex items-center gap-2">
            <input type="radio" name="payment" checked readOnly />
            <label>Cash on Delivery (COD)</label>
          </div>
        </div>

        {/* 👤 Customer Info Section */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold mb-2">Customer Info</h3>

          {editing ? (
            <>
              <p>
                <strong>Name:</strong> {customerInfo?.fullname}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                <input
                  type="text"
                  className="border px-2 py-1 w-full"
                  value={updatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                />
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <input
                  type="text"
                  className="border px-2 py-1 w-full"
                  value={updatedPhone}
                  onChange={(e) => setUpdatedPhone(e.target.value)}
                />
              </p>
              <button
                onClick={handleUpdate}
                className="mt-2 bg-green-600 text-white px-4 py-1 rounded"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <p>
                <strong>Name:</strong> {customerInfo?.fullname}
              </p>
              <p>
                <strong>Address:</strong> {customerInfo?.address}
              </p>
              <p>
                <strong>Phone:</strong> {customerInfo?.phoneNumber}
              </p>
              <button
                onClick={() => setEditing(true)}
                className="mt-2 bg-blue-600 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
            </>
          )}
        </div>

        {/* 🛒 Cart Items */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold mb-2">Product Details</h3>
          {cartItems.map((item, index) => (
            <div key={index} className="flex gap-4 border-b py-2 items-center">
              <img
                src={item.frontImages?.[0] || "/placeholder.png"}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <p>{item.name}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="ml-auto font-medium">
                RS {item.price * item.quantity}
              </p>
            </div>
          ))}
          <p className="text-right font-bold mt-2">Total: RS {subtotal}</p>
        </div>

        {/* 🚚 Delivery Options */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-semibold mb-2">Delivery Option</h3>
          <select
            value={deliveryOption}
            onChange={(e) => setDeliveryOption(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="fast">Fast Delivery (2-3 days)</option>
            <option value="standard">Standard Delivery (5-7 days)</option>
          </select>
        </div>

        {/* ✅ Place Order Button */}
        <div className="text-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
