import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const Product = ({ searchResults }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/product/products");
        setProducts(response.data);
      } catch (error) {
        toast.error("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    if (Array.isArray(searchResults)) {
      if (searchResults.length > 0) {
        setProducts(searchResults);
        setLoading(false);
      } else {
        fetchProducts(); // Search cleared
      }
    } else {
      fetchProducts(); // Initial render
    }
  }, [searchResults]);

  if (loading) {
    return <div className="text-5xl mb-4">🛒</div>;
  }

  if (!products || products.length === 0) {
    return <p className="text-center mt-10">No products to display.</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Products For You
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            href={`/displayproduct/product/${product._id}`}
            key={product._id}
          >
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
              {Array.isArray(product.frontImages) &&
              product.frontImages.length > 0 ? (
                <img
                  src={product.frontImages[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-1">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {product.description}
                </p>
                <p className="text-red-500 font-bold mb-2">
                  Rs.{product.price}
                </p>
                {product.onSale === "Yes" && (
                  <p className="text-gray-400 line-through text-sm mb-2">
                    Rs.{product.dropPrice}
                  </p>
                )}
                <div className="flex items-center">
                  <span className="text-yellow-500 font-bold text-sm mr-2">
                    ★ 4.5
                  </span>
                  <span className="text-gray-500 text-sm">(88 reviews)</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Product;
