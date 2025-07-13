import { useEffect, useState } from "react";
import { useCart } from "../component/CartContext";
import Link from "next/link";
import Nav from "../component/navbar";
import Footer from "../component/footer";
import connectDB from "../lib/mongodb";
import Product from "../models/Product";
import CheckoutButton from "../component/CheckoutBtn";

export default function AddToCartPage({ relatedProducts }) {
  const { cartItems } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.price) || 0),
    0
  );

  return (
    <div>
      <Nav />
      <div className="max-w-7xl mx-auto p-4 mt-6 text-black">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side: Cart Items */}
          <div className="flex-1 border rounded shadow p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">Products in Cart ✅</h2>
            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 border p-2 rounded shadow-sm"
                  >
                    <img
                      src={item.frontImages?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="w-28 h-28 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p>Size: {item.availableSize || "N/A"}</p>
                      <p>Color: Default</p>
                      <p>Price: RS {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No items in cart</p>
            )}
          </div>

          {/* Right Side: Checkout Summary */}
          <div className="w-full lg:w-1/3 border rounded shadow p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
            <p className="mb-2 text-lg">
              Subtotal:{" "}
              <span className="font-semibold">RS.{subtotal.toFixed(2)}</span>
            </p>
            <div className="flex flex-col gap-2">
              <Link
                href="/cart"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-center"
              >
                Go to Cart
              </Link>
              <CheckoutButton />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl sm:text-4xl font-bold mb-6 text-black text-center">
            Related Products
          </h2>
          {relatedProducts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <Link href={`/displayproduct/${item._id}`} key={item._id}>
                  <div className="border p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer">
                    <img
                      src={item.frontImages?.[0] || "/placeholder.png"}
                      alt={item.name}
                      className="w-full h-40 object-contain mb-2"
                    />
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.category}
                    </p>
                    <p className="font-bold">
                      {item.onSale === "Yes" && item.dropPrice ? (
                        <>
                          <span className="text-red-500 line-through mr-2">
                            RS {item.price}
                          </span>
                          <span className="text-green-600">
                            RS {item.dropPrice}
                          </span>
                        </>
                      ) : (
                        <>RS {item.price}</>
                      )}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No related products found.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  await connectDB();

  try {
    const relatedProducts = await Product.find().limit(8).lean();

    const sanitized = relatedProducts.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
      createdAt: prod.createdAt?.toString() || null,
      updatedAt: prod.updatedAt?.toString() || null,
    }));

    return {
      props: {
        relatedProducts: sanitized,
      },
    };
  } catch (error) {
    console.error("Error fetching related products:", error);
    return {
      props: {
        relatedProducts: [],
      },
    };
  }
}
