"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef, ReactNode } from "react";
import { Product, CartItem, Coupon } from "@/types";
import { validateCoupon, calculateDiscount, FREE_SHIPPING_THRESHOLD } from "@/lib/coupons";

const CART_STORAGE_KEY = "octodeco-cart";
const COUPON_STORAGE_KEY = "octodeco-coupon";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isLoaded: boolean;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string; coupon?: Coupon };
  removeCoupon: () => void;
  discount: number;
  total: number;
  qualifiesForFreeShipping: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  // Load cart from localStorage using lazy initialization (client-side only)
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            return parsedCart;
          }
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
      }
    }
    return [];
  });
  
  // Load applied coupon from localStorage
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
        if (savedCoupon) {
          const parsedCoupon = JSON.parse(savedCoupon);
          // Validate the loaded coupon to ensure it's a valid coupon code
          if (parsedCoupon && parsedCoupon.code) {
            return validateCoupon(parsedCoupon.code);
          }
        }
      } catch (error) {
        console.error("Failed to load coupon from localStorage:", error);
      }
    }
    return null;
  });
  
  // Track if cart has been initialized - starts false to match SSR, becomes true after hydration
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Track whether we should skip saving to localStorage (true on first render)
  const shouldSkipSave = useRef(true);
  const shouldSkipCouponSave = useRef(true);
  
  // Mark as loaded after hydration (runs once on mount to signal completion of client-side initialization)
  // This is an exception to the set-state-in-effect rule: we're not deriving state or syncing with external systems,
  // but rather tracking component lifecycle for SSR hydration compatibility
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage whenever items change (skip on initial mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (shouldSkipSave.current) {
        shouldSkipSave.current = false;
        return;
      }
      
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error);
      }
    }
  }, [items]);

  // Save coupon to localStorage whenever it changes (skip on initial mount)
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (shouldSkipCouponSave.current) {
        shouldSkipCouponSave.current = false;
        return;
      }
      
      try {
        if (appliedCoupon) {
          localStorage.setItem(COUPON_STORAGE_KEY, JSON.stringify(appliedCoupon));
        } else {
          localStorage.removeItem(COUPON_STORAGE_KEY);
        }
      } catch (error) {
        console.error("Failed to save coupon to localStorage:", error);
      }
    }
  }, [appliedCoupon]);

  const addItem = useCallback((product: Product, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...currentItems, { product, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.product.id !== productId)
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    const coupon = validateCoupon(code);
    
    if (!coupon) {
      return {
        success: false,
        message: "Invalid coupon code",
      };
    }
    
    setAppliedCoupon(coupon);
    return {
      success: true,
      message: `Coupon applied! You saved ${coupon.discountPercent}%`,
      coupon,
    };
  }, []);

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  // Calculate discount if a coupon is applied
  const discount = appliedCoupon ? calculateDiscount(subtotal, appliedCoupon) : 0;
  
  // Calculate final total after discount
  const total = subtotal - discount;
  
  // Check if order qualifies for free shipping (based on post-discount total)
  const qualifiesForFreeShipping = total >= FREE_SHIPPING_THRESHOLD;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isLoaded,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discount,
        total,
        qualifiesForFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
