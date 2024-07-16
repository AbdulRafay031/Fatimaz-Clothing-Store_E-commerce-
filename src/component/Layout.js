import React from 'react'
import Navbar from './navbar';
import Footer from './footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Layout = ({children}) => {
  return (
    <>
    <div>
   
    <Navbar/>
    <div className='h-auto'>
    <ToastContainer />
    {children}
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default Layout;