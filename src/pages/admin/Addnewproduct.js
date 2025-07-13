import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Footer from "@/component/footer";

const AddProduct = () => {
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    subCategory: "",
    onSale: "No",
    availableSize: "",
    color:"",
    dropPrice: "",
    images: [],
  });

  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const { id } = router.query;
      if (!id) return;

      setIsUpdate(true);

      try {
        const res = await fetch(`/api/product/${id}`);
        const data = await res.json();
        if (res.ok) {
          setFormData({
            name: data.name,
            price: data.price,
            description: data.description,
            category: data.category,
            subCategory: data.subCategory,
            onSale: data.onSale,
            availableSize: data.availableSize,
            color: data.color,
            dropPrice: data.dropPrice,
            images: data.images,
          });
        } else {
          toast.error("Failed to load product data");
        }
      } catch (error) {
        toast.error("Something went wrong");
        console.error(error);
      }
    };

    fetchProduct();
  }, [router.query]); // Ensure router.query is not changing unexpectedly

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setFormData((prev) => ({ ...prev, category: selectedCategory }));

    if (selectedCategory === "Baba Suit") {
      setSubCategories([
        "Zero Baba Suit",
        "S, M, L Baba Suit",
        "1, 2 Baba Suit",
        "20, 22, 24 Baba Suit",
      ]);
    } else if (selectedCategory === "Baby Suit") {
      setSubCategories([
        "1, 2 Baby Suit",
        "S, M, L Baby Suit",
        "24, 26, 28 Baby Suit",
        "30, 32, 34 Baby Suit",
        "36, 38, 40 Baby Suit",
      ]);
    } else if (selectedCategory === "Fancy Frock") {
      setSubCategories([
        "18 to 22",
        "24 to 28",
        "30 to 34",
        "36 to 40",
        "Free Size",
        "Ladies",
      ]);
    } else {
      setSubCategories([]);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileUpload = async (e, imageType) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("/api/cloudnary/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          uploadedUrls.push(data.url);
        } else {
          toast.error("Upload failed");
          console.error("Upload error:", data);
        }
      } catch (err) {
        toast.error("Upload failed");
        console.error("Unexpected error:", err);
      }
    }

    // Ensure that prev.images is an array
    setFormData((prev) => ({
      ...prev,
      images: prev.images
        ? [...prev.images, ...uploadedUrls]
        : [...uploadedUrls], // If prev.images is undefined, initialize it as an empty array
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { id } = router.query;
    const method = isUpdate ? "PUT" : "POST";
    const url = isUpdate ? `/api/product/${id}` : "/api/product/products";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(
          isUpdate
            ? "Product updated successfully"
            : "Product added successfully"
        );
        router.push("/admin/Manageproduct");
      } else {
        toast.error(result.message || "Submission failed");
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error:", error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mt-10">
      {/* NAVIGATION BAR */}
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
                <img src="/logo-1.webp" className="h-8 mr-2" alt="Fatimaz" />
                <span className="text-2xl font-bold whitespace-nowrap text-white">
                  FATIMAZ
                </span>
              </div>
            </div>
            <div className="hidden sm:flex flex-1 items-center justify-center">
              <div className="flex space-x-4">
                <Link
                  href="/admin/Addnewproduct"
                  className="text-white hover:bg-sky-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Add New Product
                </Link>
                <Link
                  href="/admin/Manageproduct"
                  className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
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
                  className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Add New Product
                </Link>
                <Link
                  href="/admin/Manageproduct"
                  className="text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Manage Product
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* PRODUCT FORM */}
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {isUpdate ? "Update Product" : "Add New Product"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* IMAGE INPUTS */}
          <div>
            <label className="block text-gray-700">Front Images:</label>
            <input
              type="file"
              name="frontImages"
              multiple
              onChange={(e) => handleFileUpload(e, "frontImages")}
              className="block w-full mt-1 text-sm text-gray-500"
            />

            <label className="block text-gray-700 mt-4">Backside Images:</label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(e, "backImages")}
              className="block w-full mt-1 text-sm text-gray-500"
            />
            <label className="block text-gray-700 mt-4">
              Full View Images:
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => handleFileUpload(e, "fullImages")}
              className="block w-full mt-1 text-sm text-gray-500"
            />
          </div>

          {/* PRODUCT NAME */}
          <div>
            <label className="block text-gray-700">Product Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-gray-700">Category:</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Baba Suit">Baba Suit</option>
              <option value="Baby Suit">Baby Suit</option>
              <option value="Boys Pants">Boys Pants</option>
              <option value="Girls Pants">Girls Pants</option>
              <option value="Fancy Frock">Fancy Frock</option>
              <option value="Boys T-shirt">Boys T-shirt</option>
              <option value="Boys Shirt">Boys Shirt</option>
              <option value="lehenga">Lehenga</option>
              <option value="Garara">Garara</option>
            </select>
          </div>

          {/* SUB CATEGORY */}
          {subCategories.length > 0 && (
            <div>
              <label className="block text-gray-700">Sub Category:</label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((sub, index) => (
                  <option key={index} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* PRICE */}
          <div>
            <label className="block text-gray-700">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DROP PRICE */}
          <div>
            <label className="block text-gray-700">Drop Price:</label>
            <input
              type="number"
              name="dropPrice"
              value={formData.dropPrice}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SIZE */}
          <div>
            <label className="block text-gray-700">Available Size:</label>
            <input
              type="text"
              name="availableSize"
              value={formData.availableSize}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* COLOR FIELD */}
          <div className="mt-4">
            <label className="block text-gray-700">Add Color:</label>
            <input
              type="text"
              name="color"
              placeholder="e.g. red, #00ff00"
              value={formData.color}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* SALE STATUS */}
          <div>
            <label className="block text-gray-700">On Sale:</label>
            <select
              name="onSale"
              value={formData.onSale}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
          >
            {isUpdate ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>

      {/* Footer if needed */}
      <Footer />
    </div>
  );
};

export default AddProduct;
