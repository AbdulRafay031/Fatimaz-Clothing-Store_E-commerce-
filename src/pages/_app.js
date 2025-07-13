import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "../component/CartContext";
import { UserProvider } from "../component/UserContext"; 

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <UserProvider>
        <CartProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </CartProvider>
      </UserProvider>
    </SessionProvider>
  );
}
