// src/components/ShowButtons.js
import { useRouter } from "next/router";

const ShowButtons = () => {
  const router = useRouter();

  const categories = [
    "All",
    "Baba Suit",
    "Baby Suit",
    "Boys Pants",
    "Girls Pants",
    "Fancy Frock",
    "Boys T-shirt",
    "Boys Shirt",
    "lehenga",
    "Garara",
  ];

  const handleClick = (category) => {
    const query =
      category === "All" ? "" : `?category=${encodeURIComponent(category)}`;
    router.push(`/products${query}`);
  };

  return (
    <div className="flex flex-col items-center mt-6">
      <div className="w-full h-1 bg-black mb-4" />
      <div className="flex flex-wrap items-center gap-3">
        {categories.map((item, index) => (
          <button
            key={index}
            className="text-black border border-black px-6 py-2 rounded-md shadow hover:bg-gray-100 transition-all duration-200"
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="w-full h-1 bg-black mt-6" />
    </div>
  );
};

export default ShowButtons;
