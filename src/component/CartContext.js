import { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
  };

const updateQuantity = (productId, newQuantity) => {
  setCartItems((prevItems) => {
    if (newQuantity <= 0) {
      // 🗑️ Remove item from cart
      return prevItems.filter((item) => item._id !== productId);
    }

    return prevItems.map((item) =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
  });
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
