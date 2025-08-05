import Link from "next/link";
import { navigation } from "@/constant";

export const Footer = () => {
  return (
    <footer className="bg-gray-200 rounded-t-2xl">
      <div className="container">
        <div className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-navbar-text">
                PostFlow
              </h3>
              <p className="text-sm text-muted-foreground">
                Beautiful, responsive navbar built with Tailwind CSS
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-navbar-text">
                Quick Links
              </h4>

              <div className="flex flex-col gap-y-2">
                {navigation.map(({ name, href }) => (
                  <Link
                    href={href}
                    key={name}
                    className="text-sm text-muted-foreground hover:text-navbar-text-hover transition-colors"
                  >
                    {name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-navbar-text">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>@postflow.com</p>
                <p>+91 62014 48872</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-navbar-border">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2024 NavBuilder. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-navbar-text-hover transition-colors"
                >
                  Privacy Policy
                </a>
                <a
                  href="#"
                  className="text-sm text-muted-foreground hover:text-navbar-text-hover transition-colors"
                >
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
