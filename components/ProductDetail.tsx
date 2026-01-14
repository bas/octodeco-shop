"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types";
import { useCart } from "@/contexts/CartContext";
import Button from "@/components/ui/Button";
import { ArrowLeft, Minus, Plus, ShoppingCart, Check } from "lucide-react";

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1 && value <= 99) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-octodeco-purple/5">
      <div className="container mx-auto px-4 py-12">
        {/* Back Link */}
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-octodeco-purple transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to products</span>
        </Link>

        {/* Product Detail Grid */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="relative aspect-square bg-gradient-to-br from-octodeco-purple/10 to-octodeco-pink/10 rounded-3xl overflow-hidden shadow-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-8"
              priority
            />
            {product.featured && (
              <span className="absolute top-4 right-4 bg-octodeco-pink text-white text-sm font-semibold px-3 py-1.5 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-3xl font-bold text-octodeco-purple">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-octodeco-purple hover:text-octodeco-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  min="1"
                  max="99"
                  value={quantity}
                  onChange={handleInputChange}
                  className="w-16 h-10 text-center border-2 border-gray-200 rounded-lg font-medium focus:border-octodeco-purple focus:outline-none"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= 99}
                  className="w-10 h-10 rounded-lg border-2 border-gray-200 flex items-center justify-center hover:border-octodeco-purple hover:text-octodeco-purple transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full md:w-auto min-w-[200px]"
            >
              {added ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Added to Cart!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </>
              )}
            </Button>

            {/* Product Features */}
            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-octodeco-purple" />
                  Premium vinyl material
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-octodeco-purple" />
                  Weather-resistant & waterproof
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-octodeco-purple" />
                  Officially licensed design
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-octodeco-purple" />
                  Easy peel-and-stick application
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
