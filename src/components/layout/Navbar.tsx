"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useAuthStore } from "@/lib/stores/authStore";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const { logout, isLoggingOut, user } = useAuth();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  if (!hasHydrated) return null;

  const isActive = (href: string) => (pathname === href ? "text-green-700 font-medium" : "text-gray-700 hover:text-green-700");

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="border-b bg-white">
      <nav className="container mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* LOGO */}
        <Link href="/" className="text-lg font-semibold text-green-700">
          WeRent
        </Link>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/products" className={isActive("/products")}>
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/wishlist" className={isActive("/wishlist")}>
                Wishlist
              </Link>

              <Link href="/orders" className={isActive("/orders")}>
                Orders
              </Link>

              <Link href="/cart" className={isActive("/cart")}>
                Cart
              </Link>

              <Link href="/profile" className="text-gray-700 hover:text-green-700">
                {user?.name?.split(" ")[0]}
              </Link>

              <button onClick={handleLogout} disabled={isLoggingOut} className="text-gray-700 hover:text-red-500 disabled:opacity-50">
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className={isActive("/login")}>
                Login
              </Link>

              <Link href="/register" className="text-green-700 font-medium">
                Register
              </Link>
            </>
          )}
        </div>

        {/* BURGER / X BUTTON */}
        <button onClick={() => setOpen(!open)} className="md:hidden relative w-6 h-6">
          <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? "rotate-45" : "-translate-y-2"}`}></span>

          <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? "opacity-0" : ""}`}></span>

          <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-gray-700 transition-all duration-300 ${open ? "-rotate-45" : "translate-y-2"}`}></span>
        </button>
      </nav>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden fixed inset-0 top-14 z-40 bg-white px-4 py-4 space-y-3 text-sm">
          <Link href="/products" onClick={() => setOpen(false)} className={`block ${isActive("/products")}`}>
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link href="/wishlist" onClick={() => setOpen(false)} className={`block ${isActive("/wishlist")}`}>
                Wishlist
              </Link>

              <Link href="/orders" onClick={() => setOpen(false)} className={`block ${isActive("/orders")}`}>
                Orders
              </Link>

              <Link href="/cart" onClick={() => setOpen(false)} className={`block ${isActive("/cart")}`}>
                Cart
              </Link>

              <Link href="/profile" onClick={() => setOpen(false)} className="block pt-2 border-t text-gray-700 hover:text-green-700">
                {user?.name?.split(" ")[0]}{" "}
              </Link>

              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                disabled={isLoggingOut}
                className="w-full text-left text-red-500 disabled:opacity-50"
              >
                {isLoggingOut ? "Logging out..." : "Logout"}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className={`block ${isActive("/login")}`}>
                Login
              </Link>

              <Link href="/register" onClick={() => setOpen(false)} className="block text-green-700 font-medium">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
