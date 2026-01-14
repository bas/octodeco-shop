import { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "All Stickers | Octodeco",
  description: "Browse our complete collection of licensed Octocat stickers. Find the perfect sticker for your laptop, notebook, or anywhere you want to show your GitHub pride.",
};

export default function ProductsPage() {
  const products = getAllProducts();

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-octodeco-purple/5">
      <div className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            All <span className="text-octodeco-purple">Stickers</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our complete collection of {products.length} unique Octocat stickers. 
            Each one is made with premium vinyl for lasting quality.
          </p>
        </div>

        {/* Products Grid */}
        <ProductGrid products={products} />
      </div>
    </main>
  );
}
