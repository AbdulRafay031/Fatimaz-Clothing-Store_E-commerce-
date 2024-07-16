import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
const HeroSection = () => {
    return (
        <div className="w-screen-md mx-auto ">
        <Carousel
          showArrows
          autoPlay
          infiniteLoop
          className="rounded-lg shadow-lg"
          style={{  maxWidth: '1400px', maxHeight: '400px', margin: ' auto' }} 
          showThumbs={false}
        >
          <div>
            <img src="/banner-2.jpg" alt="Product 1" className="object-cover w-full h-64 sm:h-80 lg:h-96" />
            <p className="legend">Product 1</p>
          </div>
          <div>
            <img src="/banner-3.jpg" alt="Product 2" className="object-cover w-full h-64 sm:h-80 lg:h-96" />
            <p className="legend">Product 2</p>
          </div>
          <div>
            <img src="/banner-4.jpg" alt="Product 3" className="object-cover w-full h-64 sm:h-80 lg:h-96" />
            <p className="legend">Product 3</p>
          </div>
        </Carousel>
      </div>
      );
    };
    

export default HeroSection