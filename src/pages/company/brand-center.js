import Navbar from "../../component/navbar";
import Footer from "../../component/footer";
import { BadgeCheck } from "lucide-react";

const brands = [
  "Hello mum",
  "Children Choice",
  "Baby Choice",
  "Mishkat Creation",
  "Six Bro",
  "Double One",
  "Cendrella",
  "Golden Arrow",
  "Golden Classic",
  "College Jeans",
  "Dua",
  "Robinhood",
  "UK Polo",
  "Artistic Polo",
  "Alibaba",
  "Baby Zone",
  "Baby Doll",
];

const colors = [
  "bg-red-100 text-red-700",
  "bg-green-100 text-green-700",
  "bg-blue-100 text-blue-700",
  "bg-yellow-100 text-yellow-700",
  "bg-purple-100 text-purple-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
  "bg-indigo-100 text-indigo-700",
];

export default function BrandCenter() {
  return (
    <div className="bg-white text-black min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-black mb-10">
          Fatimaz Brand Center
        </h1>
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Explore the top brands we partner with — from stylish kids' wear to
          luxury collections. Trusted by families across Pakistan.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {brands.map((brand, index) => (
            <div
              key={index}
              className={`p-6 rounded-2xl shadow-md flex flex-col items-center justify-center text-center transition transform hover:scale-105 duration-300 ${
                colors[index % colors.length]
              }`}
            >
              <BadgeCheck className="w-8 h-8 mb-2" />
              <h3 className="text-lg font-bold">{brand}</h3>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
