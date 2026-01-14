"use client";

import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import CouponInput from "./CouponInput";

export default function OrderSummary() {
  const { items, subtotal, appliedCoupon, discount, total, qualifiesForFreeShipping } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="bg-foreground/5 rounded-xl p-6 space-y-6">
      <h2 className="text-xl font-semibold text-foreground tracking-tight">
        Order Summary
      </h2>

      {items.length === 0 ? (
        <p className="text-foreground/60 text-sm">Your cart is empty</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center gap-4 pb-4 border-b border-foreground/10 last:border-0 last:pb-0"
              >
                {/* Thumbnail */}
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-foreground/10 flex-shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                  {/* Quantity badge */}
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-octodeco-purple text-white text-xs font-medium rounded-full flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>

                {/* Item details */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-foreground/60">
                    {formatPrice(item.product.price)} × {item.quantity}
                  </p>
                </div>

                {/* Line total */}
                <p className="text-sm font-medium text-foreground">
                  {formatPrice(item.product.price * item.quantity)}
                </p>
              </div>
            ))}
          </div>

          {/* Coupon Code Section */}
          <div className="pt-4 border-t border-foreground/10">
            <CouponInput />
          </div>

          {/* Totals */}
          <div className="space-y-3 pt-4 border-t border-foreground/10">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Subtotal</span>
              <span className="text-foreground">{formatPrice(subtotal)}</span>
            </div>
            {appliedCoupon && discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-foreground/60">
                  Discount ({appliedCoupon.discountPercent}%)
                </span>
                <span className="text-green-600 font-medium">
                  -{formatPrice(discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Shipping</span>
              <span className="text-foreground">
                {qualifiesForFreeShipping ? (
                  <span className="text-green-600 font-medium">Free</span>
                ) : (
                  "Calculated at next step"
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-semibold pt-3 border-t border-foreground/10">
              <span className="text-foreground">Total</span>
              <span className="text-octodeco-purple">{formatPrice(total)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
