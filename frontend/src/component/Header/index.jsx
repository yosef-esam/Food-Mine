import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import Search from "../Search";

const NAV_LINKS = [
  { label: "Home", href: "/", type: "route" },
  { label: "Menu", href: "#featured", type: "anchor" },
  { label: "Categories", href: "#categories", type: "anchor" },
  { label: "Offers", href: "#offer", type: "anchor" },
  { label: "About Us", href: "#how-it-works", type: "anchor" },
  { label: "Contact", href: "#how-it-works", type: "anchor" },
];

function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAnchor = (e, href) => {
    if (location.pathname !== "/") return;
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b transition-shadow duration-300 ${
        scrolled ? "shadow-md border-gray-200" : "shadow-sm border-gray-100"
      }`}
      style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.06, rotate: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200 overflow-hidden">
                <img src="/icons/logo.png" alt="" className="w-full h-full object-contain" />
              </div>
            </motion.div>
            <h1 className="text-xl font-bold text-gray-900">
              Food<span className="text-orange-500">Hub</span>
            </h1>
          </Link>

          {/* Center Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === "/" && location.pathname === "/";
              const commonClasses = `relative text-sm font-semibold transition-colors duration-200 ${
                isActive ? "text-orange-500" : "text-gray-600 hover:text-orange-500"
              }`;
              const content = (
                <>
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                    />
                  )}
                </>
              );
              return link.type === "route" ? (
                <Link key={link.label} to={link.href} className={commonClasses}>
                  {content}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchor(e, link.href)}
                  className={commonClasses}
                >
                  {content}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen((v) => !v)}
              className="p-2.5 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors duration-200"
              title="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
              </svg>
            </motion.button>

            {/* Cart */}
            <motion.div whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.92 }} className="relative">
              <Link
                to="/cart"
                className="relative p-2.5 block text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors duration-200"
                title="Cart"
              >
                <motion.svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={cart.TotalCount > 0 ? { rotate: [0, -12, 10, -6, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  key={cart.TotalCount}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                </motion.svg>
                <AnimatePresence>
                  {cart.TotalCount > 0 && (
                    <motion.span
                      key={cart.TotalCount}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {cart.TotalCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>

            {/* User Menu */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link to="/profile" className="hidden sm:flex items-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
                  >
                    <span className="text-white text-sm font-semibold">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </span>
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={logout}
                  className="hidden sm:inline-flex px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors duration-200 text-sm font-medium"
                >
                  Logout
                </motion.button>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors duration-200 text-sm font-semibold"
                >
                  Login
                </Link>
              </motion.div>
            )}

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}>
              <a
                href="#featured"
                onClick={(e) => handleAnchor(e, "#featured")}
                className="inline-flex px-4 sm:px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-200 text-sm font-semibold shadow-lg hover:shadow-xl"
              >
                Order Now
              </a>
            </motion.div>
          </div>
        </div>

        {/* Expandable search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="pb-4 pt-1 max-w-xl">
                <Search placeholder="Search dishes or restaurants..." />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}

export default Header;
