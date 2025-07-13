// pages/index.js
import React, { useState } from "react";
import Layout from "../component/Layout";
import HeroSection from "@/component/HeroSection";
import Product from "../component/product";
import ShowButtons from "@/component/showButtons";
import Navbar from "../component/navbar";
import axios from "axios";

function HomePage() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = async (category) => {
    try {
      const url = category
        ? `/api/product/products?category=${category}`
        : `/api/product/products`;

      console.log("Fetching products from:", url); // Add this log

      const response = await axios.get(url);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  return (
    <Layout>
      <Navbar onSearchResultsChange={setSearchResults} />

      <div className="w-auto">
        <HeroSection />
      </div>

      <ShowButtons onCategorySelect={handleCategorySelect} />
      <Product searchResults={searchResults} />
    </Layout>
  );
}

export default HomePage;
