"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { routes } from "@/utils/routes";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", href: routes.HOME },
    { name: "Login", href: routes.LOGIN },
    { name: "Register", href: routes.REGISTER },
    { name: "profile", href: routes.USER },
  ];

  return (
    <nav className="border-b border-navbar-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-xl font-bold text-navbar-text hover:text-navbar-text-hover transition-colors"
            >
              NavBuilder
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-navbar-text hover:text-navbar-text-hover px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-muted/50"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <Link href={routes.REGISTER} className="cursor-pointer">
              <button>Get Started</button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navbar-text hover:text-navbar-text-hover"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-navbar-mobile-bg border-t border-navbar-border">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-navbar-text hover:text-navbar-text-hover block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 hover:bg-muted/50"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 pt-4">
              <Link href="/register">
                <button className="w-full">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
