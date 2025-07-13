import { useState } from "react";
import axios from "axios";

export default function AddBannerImg() {
  const [images, setImages] = useState([null, null, null, null]);

  const handleChange = (index, file) => {
    const newImages = [...images];
    newImages[index] = file;
    setImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.some(img => !img)) return alert("All 4 images are required");

    const formData = new FormData();
    images.forEach(img => formData.append("images", img));

    try {
      await axios.post("/api/banner/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Banner uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl mb-4 font-bold">Upload 4 Banner Images</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {images.map((img, i) => (
          <input
            key={i}
            type="file"
            accept="image/*"
            onChange={(e) => handleChange(i, e.target.files[0])}
            className="w-full border p-2 rounded"
          />
        ))}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
