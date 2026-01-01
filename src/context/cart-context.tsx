"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { toast } from "sonner";
import debounce from "lodash.debounce";
import { syncLocalCart } from "@/services/api/cart";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export interface CartItem {
  id: number;
  productId: number;
  name: string;
  title: string;
  price: number;
  image: string;
  images?: string[];
  category?: string;
  exclusivity: "Exclusive Print" | "Non-Exclusive Print";
  color?: string;
  colorCode?: string;
  size: string;
  quantity: number;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "quantity">) => void;
  removeFromCart: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: number) => boolean;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Failed to load cart", err);
      }
    }
    setHasLoadedCart(true);
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event: any, session: any) => {
        const user = session?.user || null;
        setAuthUser(user);

        if (event === "SIGNED_OUT" || !user) {
          setCart([]);
          if (typeof window !== "undefined") {
            localStorage.removeItem("cart");
          }
        } else if (user && cart.length > 0) {
          const payload = cart.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          }));
          syncLocalCart(payload as any).catch((err) =>
            console.error("Cart sync failed", err)
          );
        }
      }
    );

    return () => authListener.subscription.unsubscribe();
  }, []);

  const syncCartDebounced = debounce(async (cartToSync: CartItem[]) => {
    if (!authUser || !cartToSync.length) return;
    try {
      const payload = cartToSync.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      }));
      await syncLocalCart(payload as any);
    } catch (err) {
      console.error("Failed to sync cart", err);
    }
  }, 2000);

  useEffect(() => {
    if (!hasLoadedCart || typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(cart));
    syncCartDebounced(cart);
  }, [cart, hasLoadedCart, authUser, syncCartDebounced]);

  const addToCart = (item: Omit<CartItem, "id" | "quantity">) => {
    const existingItem = cart.find((ci) => ci.productId === item.productId);
    if (existingItem) {
      setCart((prev) =>
        prev.map((ci) =>
          ci.productId === item.productId
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        )
      );
      toast.success("Updated quantity in cart!", {
        description: `${item.name} quantity increased`,
      });
    } else {
      const newItem: CartItem = { ...item, id: Date.now(), quantity: 1 };
      setCart((prev) => [...prev, newItem]);
      toast.success("Added to cart!", {
        description: `${item.name} has been added to your cart`,
      });
    }
  };

  const removeFromCart = (itemId: number) => {
    const item = cart.find((ci) => ci.id === itemId);
    setCart((prev) => prev.filter((ci) => ci.id !== itemId));
    if (item)
      toast.success("Removed from cart", {
        description: `${item.name} has been removed`,
      });
  };

  const updateQuantity = (itemId: number, quantity: number) => {
    if (quantity < 1) return removeFromCart(itemId);
    setCart((prev) =>
      prev.map((ci) => (ci.id === itemId ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    if (cart.length > 0) {
      setCart([]);
      toast.success("Cart cleared");
    }
  };

  const getCartTotal = () =>
    cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const getCartCount = () =>
    cart.reduce((count, item) => count + item.quantity, 0);
  const isInCart = (productId: number) =>
    cart.some((item) => item.productId === productId);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
