import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-700/50 bg-zinc-900">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo and branding */}
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-octodeco-purple to-octodeco-pink bg-clip-text text-2xl font-bold text-transparent">
                Octodeco
              </span>
            </Link>
            <p className="mt-2 text-sm text-zinc-400">
              Premium licensed Octocat stickers
            </p>
          </div>

          {/* Navigation links */}
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Products
            </Link>
            <Link
              href="/checkout"
              className="text-sm font-medium text-zinc-300 transition-colors hover:text-white"
            >
              Checkout
            </Link>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-zinc-700/50 pt-8">
          <p className="text-center text-sm text-zinc-400">
            © {currentYear} Octodeco. All rights reserved. Octocat is a trademark of GitHub, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
