// components/HeroSection.js
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const HeroSection = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/banner");
        const data = await res.json();
        if (data?.images) setImages(data.images);
      } catch (err) {
        console.error("Failed to fetch banner images", err);
      }
    };
    fetchImages();
  }, []);

  return (
    <div className="w-full">
      <Carousel
        showArrows
        autoPlay
        infiniteLoop
        showThumbs={false}
        interval={4000}
        transitionTime={700}
        stopOnHover
        emulateTouch
        swipeable
        className="rounded-none"
      >
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] object-cover"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HeroSection;
