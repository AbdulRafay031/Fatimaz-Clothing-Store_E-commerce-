import React, { useState } from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <div className="h-auto bg-white">
          <ToastContainer />
          
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && typeof child.type !== "string") {
              return React.cloneElement(child);
            }
            return child;
          })}
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
