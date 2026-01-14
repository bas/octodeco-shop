"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { X } from "lucide-react";

export default function CouponInput() {
  const { appliedCoupon, applyCoupon, removeCoupon } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");

  const handleApplyCoupon = () => {
    // Clear previous messages
    setError("");

    // Validate empty input
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      return;
    }

    const result = applyCoupon(couponCode);

    if (result.success) {
      setCouponCode("");
    } else {
      setError(result.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    setError("");
    setCouponCode("");
  };

  const handleInputChange = (value: string) => {
    setCouponCode(value);
    // Clear error when user starts typing
    setError("");
  };

  return (
    <div className="space-y-3">
      {appliedCoupon ? (
        // Show applied coupon
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div>
            <p className="text-sm font-medium text-green-800">
              Coupon Applied: {appliedCoupon.code}
            </p>
            <p className="text-xs text-green-600">
              {appliedCoupon.discountPercent}% off
            </p>
          </div>
          <button
            type="button"
            onClick={handleRemoveCoupon}
            className="text-green-600 hover:text-green-800 transition-colors p-1"
            aria-label="Remove coupon"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        // Show coupon input form
        <>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => handleInputChange(e.target.value)}
              className="flex-1"
              aria-label="Coupon code"
            />
            <Button
              type="button"
              onClick={handleApplyCoupon}
              variant="outline"
              size="md"
              className="whitespace-nowrap"
            >
              Apply
            </Button>
          </div>
          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  );
}
