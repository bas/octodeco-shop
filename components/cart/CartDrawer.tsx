"use client";

import { useEffect } from "react";
import { X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, itemCount } = useCart();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-background shadow-2xl z-[101] transform transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-foreground/10">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-octodeco-purple" />
              <h2 className="text-lg font-bold">Your Cart</h2>
              {itemCount > 0 && (
                <span className="bg-octodeco-purple/10 text-octodeco-purple text-xs font-semibold px-2 py-0.5 rounded-full">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-foreground/10 rounded-lg transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-foreground/30" />
                </div>
                <h3 className="text-lg font-medium text-foreground/70 mb-1">
                  Your cart is empty
                </h3>
                <p className="text-sm text-foreground/50">
                  Add some awesome stickers to get started!
                </p>
              </div>
            ) : (
              <div className="py-2">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="px-4 pb-4">
            <CartSummary onClose={onClose} />
          </div>
        </div>
      </div>
    </>
  );
}
