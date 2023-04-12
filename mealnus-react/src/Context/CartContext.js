import { createContext } from "react";
import usePersistedState from "./usePersistedState";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = usePersistedState("cart", []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};