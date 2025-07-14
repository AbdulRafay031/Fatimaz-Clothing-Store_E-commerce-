import Image from "next/image";
import { toast } from "react-toastify";
import connectDB from "../../lib/mongodb";
import Product from "../../models/Product";
import mongoose from "mongoose";
import Nav from "../../component/navbar";
import Footer from "../../component/footer";
import { useState, useEffect } from "react";
import { useCart } from "../../component/CartContext";
import { useRouter } from "next/router";

export default function ProductDetails({ product, relatedProducts }) {
  const [selectedProduct, setSelectedProduct] = useState(product);
  const [mainImage, setMainImage] = useState(product?.frontImages?.[0] || "");
  const [userSize, setUserSize] = useState("");
  const [userColor, setUserColor] = useState("");
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    setMainImage(selectedProduct?.frontImages?.[0] || "");
  }, [selectedProduct]);

  if (!selectedProduct)
    return <p className="text-center mt-10 text-lg">Product not found</p>;

  return (
    <div>
      <Nav />
      <div className="p-4 sm:p-6 max-w-7xl mx-auto ">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-row lg:flex-col gap-4 justify-center lg:justify-start">
            {selectedProduct.frontImages?.slice(0, 4).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumb ${index}`}
                onClick={() => setMainImage(img)}
                className={`w-16 h-16 sm:w-20 sm:h-20 object-cover border-2 rounded-md cursor-pointer ${
                  mainImage === img ? "border-blue-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          <div className="flex-1">
            <div className="border rounded-lg overflow-hidden mb-4 sm:mb-6">
              <img
                src={mainImage}
                alt="Main"
                className="w-full h-64 sm:h-[400px] object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-black dark:text-white mb-6 text-center">
                PRODUCT DETAILS
              </h1>
              <h2 className="text-xl sm:text-3xl font-bold">
                {selectedProduct.name}
              </h2>
              <p className="text-black dark:text-white">
                Category : {selectedProduct.category}
              </p>
              <p className="text-black dark:text-white">
                ProductDetails : {selectedProduct.description}
              </p>
              <p className="text-black dark:text-white">
                Product Size : {selectedProduct.availableSize}
              </p>

              <label
                htmlFor="userSize"
                className="block text-black dark:text-white font-medium mb-1"
              >
                Mention Your Size:
              </label>
              <input
                type="text"
                id="userSize"
                name="userSize"
                placeholder="According to above size"
                value={userSize}
                onChange={(e) => setUserSize(e.target.value)}
                className="w-full text-black px-4 py-2 border"
              />

              <p className="text-black dark:text-white">
                Choose Product Color according to images
              </p>
              <label
                htmlFor="color"
                className="block text-black dark:text-white font-medium mb-1"
              >
                Mentioned your color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                placeholder="According to image color"
                value={userColor}
                onChange={(e) => setUserColor(e.target.value)}
                className="w-full text-black px-4 py-2 border"
              />

              <div className="text-lg sm:text-xl font-semibold text-black dark:text-white">
                {selectedProduct.onSale === "Yes" &&
                selectedProduct.dropPrice ? (
                  <>
                    <span className="text-red-600 line-through mr-2">
                      Rs. {selectedProduct.price}
                    </span>
                    <span>Rs. {selectedProduct.dropPrice}</span>
                    <span className="text-green-600 text-sm ml-2">
                      (
                      {Math.round(
                        (1 -
                          parseFloat(selectedProduct.dropPrice) /
                            parseFloat(selectedProduct.price)) *
                          100
                      )}
                      % off)
                    </span>
                  </>
                ) : (
                  <span>Rs. {selectedProduct.price}</span>
                )}
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <div className="border rounded-lg p-6 shadow-lg bg-white sticky top-20">
              <h2 className="text-xl font-semibold mb-4 text-black">
                Delivery & Payment
              </h2>
              <ul className="text-gray-700 space-y-2 text-sm sm:text-base">
                <li>✔ delivery in 5-7 business days</li>
                <li>✔ Cash on Delivery available</li>
                <li>✔ 1-Day Return Policy after delivery</li>
              </ul>
              <div className="flex flex-col gap-4 mt-6">
                <button
                  onClick={() => {
                    addToCart({
                      ...selectedProduct,
                      userSize,
                      userColor,
                    });
                    router.push("/addToCart");
                  }}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-10 mb-10">
        <h2 className="text-2xl sm:text-4xl lg:text-6xl font-bold text-black dark:text-white mb-6 text-center">
          Related Products
        </h2>
        {relatedProducts?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  setSelectedProduct(item);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="border p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
              >
                <img
                  src={item.frontImages?.[0] || "/placeholder.png"}
                  alt={item.name}
                  className="w-full h-40 object-contain mb-2"
                />
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                <p className="font-bold">
                  {item.onSale === "Yes" && item.dropPrice ? (
                    <>
                      <span className="text-red-500 line-through mr-2">
                        Rs. {item.price}
                      </span>
                      <span className="text-green-600">
                        Rs. {item.dropPrice}
                      </span>
                    </>
                  ) : (
                    <>Rs. {item.price}</>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No related products found.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return { notFound: true };
  }

  await connectDB();

  try {
    const product = await Product.findById(id).lean();
    if (!product) {
      return {
        notFound: true,
      };
    }

    product._id = product._id.toString();
    if (product.createdAt) product.createdAt = product.createdAt.toString();
    if (product.updatedAt) product.updatedAt = product.updatedAt.toString();

    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: product._id },
    })
      .limit(4)
      .lean();

    const sanitizedRelated = relatedProducts.map((prod) => ({
      ...prod,
      _id: prod._id.toString(),
      createdAt: prod.createdAt?.toString() || null,
      updatedAt: prod.updatedAt?.toString() || null,
    }));

    return {
      props: { product, relatedProducts: sanitizedRelated },
    };
  } catch (error) {
    console.error("SSR Fetch Error:", error);
    return {
      notFound: true,
    };
  }
}
