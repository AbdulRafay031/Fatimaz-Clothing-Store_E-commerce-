// components/SearchBar.js
import { useState, useEffect } from "react";

const SearchBar = ({ onResultsChange }) => {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim() !== "") {
        fetch(`/api/product/search?query=${query}`)
          .then((res) => res.json())
          .then((data) => {
            onResultsChange(data); // pass data up
          })
          .catch((err) => console.error("Search error:", err));
      } else {
        onResultsChange([]); 
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 ps-10 text-sm text-black border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search..."
      />
      <div className="absolute inset-y-0 left-0 flex items-center ps-3 pointer-events-none">
        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 20 20">
          <path d="M19 19l-4-4m0-7a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
        </svg>
      </div>
    </div>
  );
};

export default SearchBar;
