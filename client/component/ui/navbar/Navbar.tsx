"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { routes } from "@/utils/routes";
import { navigation } from "@/constant";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-sm nav-background">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link
              href={routes.HOME}
              className="text-xl font-bold hover:scale-110 transition-all duration-200 text-white"
            >
              PostFlow
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-white rounded-md text-base font-medium hover:scale-110 transition-all duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <Link href={routes.REGISTER}>
              <button className="text-white cursor-pointer hover:scale-110 transition-all duration-200">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-navbar-text hover:text-navbar-text-hover"
            >
              {isOpen ? (
                <X className="h-6 w-6" stroke="white" />
              ) : (
                <Menu className="h-6 w-6" stroke="white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col gap-y-2 px-2 pt-2 pb-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 rounded-md text-base font-medium text-white hover:scale-110 transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="px-3 py-2 text-center gradient-button rounded-2xl">
              <Link href={routes.REGISTER}>Get Started</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
