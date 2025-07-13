// pages/products.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../component/Layout";
import Product from "../component/product";
import Navbar from "../component/navbar"

const ProductsPage = () => {
  const router = useRouter();
  const { category } = router.query;

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilteredProducts = async () => {
      setLoading(true);
      try {
        const url = category
          ? `/api/product/products?category=${encodeURIComponent(category)}`
          : `/api/product/products`;

        const response = await axios.get(url);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (router.isReady) {
      fetchFilteredProducts();
    }
  }, [category, router.isReady]);

  return (
    <Layout>
      <Navbar />
      <div className="px-6 mt-10">
        <h1 className="text-3xl font-bold text-center mb-6">
          {category ? `${category} Products` : "All Products"}
        </h1>

        {loading ? (
          <p className="text-center">Loading products...</p>
        ) : (
          <Product searchResults={filteredProducts} />
        )}
      </div>
    </Layout>
  );
};

export default ProductsPage;
