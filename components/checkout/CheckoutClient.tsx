"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { checkoutSchema } from "@/lib/validation";
import { ShippingDetails, BillingDetails } from "@/types";
import ShippingForm from "./ShippingForm";
import BillingForm from "./BillingForm";
import OrderSummary from "./OrderSummary";
import Button from "@/components/ui/Button";
import { ZodError } from "zod";

type FormErrors = {
  shipping: Partial<Record<keyof ShippingDetails, string>>;
  billing: Partial<Record<keyof BillingDetails, string>>;
};

export default function CheckoutClient() {
  const { items, clearCart } = useCart();

  const [shipping, setShipping] = useState<ShippingDetails>({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [billing, setBilling] = useState<BillingDetails>({
    sameAsShipping: true,
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    shipping: {},
    billing: {},
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleShippingChange = (field: keyof ShippingDetails, value: string) => {
    setShipping((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors.shipping[field]) {
      setErrors((prev) => ({
        ...prev,
        shipping: { ...prev.shipping, [field]: undefined },
      }));
    }
  };

  const handleBillingChange = (field: keyof BillingDetails, value: string | boolean) => {
    setBilling((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (field !== "sameAsShipping" && errors.billing[field as keyof BillingDetails]) {
      setErrors((prev) => ({
        ...prev,
        billing: { ...prev.billing, [field]: undefined },
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({ shipping: {}, billing: {} });

    try {
      const formData = {
        shipping,
        billing,
      };

      // Validate with Zod
      checkoutSchema.parse(formData);

      // If validation passes, show success
      alert(
        "Order placed successfully! 🎉\n\nThank you for your order. This is a demo, so no actual order was placed."
      );
      clearCart();
    } catch (error) {
      if (error instanceof ZodError) {
        const newErrors: FormErrors = { shipping: {}, billing: {} };

        error.issues.forEach((err) => {
          const path = err.path;
          if (path.length >= 2) {
            const section = path[0] as string;
            const field = path[1] as string;
            if (section === "shipping") {
              (newErrors.shipping as Record<string, string>)[field] = err.message;
            } else if (section === "billing") {
              (newErrors.billing as Record<string, string>)[field] = err.message;
            }
          }
        });

        setErrors(newErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 rounded-full bg-foreground/5 flex items-center justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-foreground/30"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Your cart is empty
        </h2>
        <p className="text-foreground/60 mb-6 max-w-md">
          Looks like you haven&apos;t added any stickers yet. Browse our collection to
          find the perfect Octocat stickers for you!
        </p>
        <Link href="/products">
          <Button variant="primary" size="lg">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Order Summary - Shows first on mobile */}
        <div className="lg:col-span-5 lg:order-2">
          <div className="lg:sticky lg:top-8">
            <OrderSummary />
          </div>
        </div>

        {/* Forms */}
        <div className="lg:col-span-7 lg:order-1 space-y-8">
          {/* Shipping Form */}
          <div className="bg-background rounded-xl border border-foreground/10 p-6">
            <ShippingForm
              values={shipping}
              onChange={handleShippingChange}
              errors={errors.shipping}
            />
          </div>

          {/* Billing Form */}
          <div className="bg-background rounded-xl border border-foreground/10 p-6">
            <BillingForm
              values={billing}
              onChange={handleBillingChange}
              errors={errors.billing}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              "Place Order"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
