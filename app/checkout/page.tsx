import { Metadata } from "next";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout | Octodeco",
  description: "Complete your order for Octocat stickers",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Checkout
          </h1>
          <p className="mt-2 text-foreground/60">
            Complete your order and get your stickers delivered
          </p>
        </div>

        {/* Checkout Form */}
        <CheckoutClient />
      </div>
    </main>
  );
}
