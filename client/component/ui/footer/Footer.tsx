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
                Pingora
              </h3>
              <p className="text-sm text-muted-foreground">
                Pingora is a community platform where you can connect, share
                posts, like, comment, and engage with others. Join now to be
                part of the conversation
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
                <p>@pingora.com</p>
                <p>+91 62014 48872</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 pt-6 border-t border-navbar-border">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-sm text-muted-foreground">
                © 2024 Pingora. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-navbar-text-hover transition-colors"
                >
                  Privacy Policy
                </Link>
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-navbar-text-hover transition-colors"
                >
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
