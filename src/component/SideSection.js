const SideSection = () => {
  const categories = [
    "Electronics",
    "Clothing",
    "Shoes",
    "Books",
    "Home & Kitchen",
    "Sports",
    "Beauty",
    "Toys & Games",
  ];

  return (
    <div
      className="p-3 rounded-lg shadow-lg bg-cover bg-center"
      style={{
        backgroundImage: `url('/bacground.jpg')`, 
      }}
    >
      <h2 className="text-xl font-semibold mb-1 text-black">Categories</h2>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className="py-2 transition duration-300 ease-in-out transform hover:translate-x-2"
          >
            <a href="#" className="text-black hover:text-black-500">
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideSection;
