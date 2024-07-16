// pages/index.js

import React from 'react';

import Layout from '../component/Layout';
import HeroSection from '@/component/HeroSection';
import SideSection from '@/component/SideSection';
import Product from '@/component/product';

function HomePage() {

    return (
       
   <Layout>
<div className="flex flex-col lg:flex-row justify-center items-center">
  {/* Left Section (Sidebar) */}
  <div className="w-full lg:w-1/4 px-4 lg:px-8 mb-4 lg:mb-0">
    <div className="hidden lg:block">
      <SideSection />
    </div>
  </div>

  {/* Right Section (Main Content) */}
  <div className="w-full lg:w-3/4 px-4 lg:px-8">
    <div className="container mx-auto mt-2">
      {/* Show only on mobile screens */}
      <h1 className="text-3xl font-bold mb-4 text-center lg:hidden">Featured Products</h1>
      <HeroSection />
    </div>
  </div>
</div>

<div>
 <Product/>
</div>

   </Layout>
          
        
    );
}

export default HomePage;
