// components/Sidebar.js

const SideSection = () => {
    // Example categories (you can fetch from API or use static data)
    const categories = [
      'Electronics',
      'Clothing',
      'Shoes',
      'Books',
      'Home & Kitchen',
      'Sports',
      'Beauty',
      'Toys & Games',
    ];
  
    return (
      <div className="bg-gray-100 p-3 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-1">Categories</h2>
        <ul>
          {categories.map((category, index) => (
            <li key={index} className="py-2">
              <a href="#" className="text-gray-800 hover:text-blue-600">{category}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default SideSection;
  