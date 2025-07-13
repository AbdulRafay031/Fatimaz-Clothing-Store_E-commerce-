import { useCart } from "../component/CartContext";
import Nav from "../component/navbar";
import Footer from "../component/footer";
import { useRouter } from "next/router";
import CheckoutButton from "../component/CheckoutBtn"

export default function CartPage() {
  const { cartItems, updateQuantity } = useCart();
  const router = useRouter();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );



  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto p-4 mt-6 flex flex-col lg:flex-row gap-8">
        {/* Left: Products */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 mb-6 border-b pb-4 items-center"
            >
              <img
                src={item.frontImages?.[0]}
                className="w-24 h-24 object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">RS {item.price}</p>
                <div className="mt-2">
                  <div className="mt-2">
                    <div className="flex items-center border rounded-full w-fit px-3 py-1 border-black">
                      {/* Left Side: - or 🗑️ */}
                      {item.quantity > 1 ? (
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="text-lg px-2 hover:text-red-600"
                        >
                          -
                        </button>
                      ) : (
                        <button
                          onClick={() => updateQuantity(item._id, 0)}
                          className="text-lg px-2 text-red-600 hover:text-red-800"
                          title="Remove Item"
                        >
                          🗑️
                        </button>
                      )}

                      {/* Quantity */}
                      <span className="mx-4 font-semibold">
                        {item.quantity}
                      </span>

                      {/* Right Side: + */}
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="text-lg px-2 hover:text-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-bold">RS {item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Right: Subtotal */}
        <div className="w-full lg:w-1/3 border p-4 rounded shadow h-fit">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          <p className="text-lg mb-2">Subtotal: RS {subtotal}</p>
         <CheckoutButton />
        </div>
      </div>
      <Footer />
    </div>
  );
}
