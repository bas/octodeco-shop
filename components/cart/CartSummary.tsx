"use client";

import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/ui/Button";

interface CartSummaryProps {
  onClose?: () => void;
}

export default function CartSummary({ onClose }: CartSummaryProps) {
  const { subtotal, clearCart, items } = useCart();

  return (
    <div className="border-t border-foreground/10 pt-4 space-y-4">
      {/* Subtotal */}
      <div className="flex justify-between text-sm">
        <span className="text-foreground/70">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>

      {/* Shipping Note */}
      <p className="text-xs text-foreground/50 text-center">
        Shipping calculated at checkout
      </p>

      {/* Total */}
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span className="bg-gradient-to-r from-octodeco-purple to-octodeco-pink bg-clip-text text-transparent">
          ${subtotal.toFixed(2)}
        </span>
      </div>

      {/* Actions */}
      <div className="space-y-2">
        <Link href="/checkout" className="block" onClick={onClose}>
          <Button className="w-full" size="lg" disabled={items.length === 0}>
            Proceed to Checkout
          </Button>
        </Link>
        {items.length > 0 && (
          <Button
            variant="ghost"
            className="w-full text-foreground/60"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        )}
      </div>
    </div>
  );
}
