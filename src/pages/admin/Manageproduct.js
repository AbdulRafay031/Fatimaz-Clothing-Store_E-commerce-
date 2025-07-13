import React, { useEffect, useState } from "react";
import Footer from "@/component/footer";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

const Manageproduct = () => {
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product/products");
        setProducts(response.data);
      } catch (error) {
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

const handleUpdate = async () => {
  const { id } = router.query;

  try {
    const res = await fetch(`/api/product/${id}`, {
      method: 'PUT',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.ok) {
      toast.success('Updated successfully!');
      // Handle further actions, like redirect or state update
    } else {
      toast.error('Update failed!');
    }
  } catch (error) {
    toast.error('Something went wrong!');
  }
};



  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/product/${id}`);
      setProducts(products.filter((p) => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="mt-10">
      {/* Navbar */}
      <nav className="bg-black shadow">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                &#9776;
              </button>
            </div>
            <div className="absolute inset-y-0 left-12 flex items-center sm:left-0">
              <div className="flex items-center">
                <img src="/logo-1.webp" className="h-8 mr-2" alt="Logo" />
                <span className="text-2xl font-bold text-white">FATIMAZ</span>
              </div>
            </div>
            <div className="hidden sm:flex flex-1 items-center justify-center">
              <div className="flex space-x-4">
                <Link
                  href="/admin/Addnewproduct"
                  className="text-white hover:bg-sky-700 px-3 py-2 rounded-md text-base font-medium"
                >
                  Add New Product
                </Link>
                <Link
                  href="/admin/Manageproduct"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-base font-medium"
                >
                  Manage Product
                </Link>
              </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <Link
                href="/"
                className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden bg-black"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  href="/admin/Addnewproduct"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Add New Product
                </Link>
                <Link
                  href="/admin/Manageproduct"
                  className="text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Manage Product
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Product Grid */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Product</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg shadow-lg overflow-hidden"
            >
              {product.frontImages?.length > 0 ? (
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
                {product.onSale === "Yes" && (
                  <span className="bg-red-500 text-white px-2 py-1 text-xs rounded-md">
                    SALE
                  </span>
                )}
                <h3 className="text-xl font-bold mt-2">${product.price}</h3>
                {product.onSale === "Yes" && product.dropPrice && (
                  <h3 className="text-red-500 font-bold">
                    ${product.dropPrice} ( -
                    {Math.round(
                      (1 -
                        parseFloat(product.dropPrice) /
                          parseFloat(product.price)) *
                        100
                    )}
                    % off)
                  </h3>
                )}
                <p className="text-gray-700 mt-2">{product.description}</p>

               

                <div className="mt-4 flex justify-between">
                  <Link href={`/admin/Addnewproduct?id=${product._id}`}>
                  <button
                    onClick={() => handleUpdate(product)}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                  >
                    Update
                  </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Manageproduct;
