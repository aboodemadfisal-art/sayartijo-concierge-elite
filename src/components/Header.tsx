import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Crown } from "lucide-react";

const navLinks = [
  { label: "Collections", href: "/#collections" },
  { label: "Showrooms", href: "/#fleet" },
  { label: "Concierge", href: "/#concierge" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-glass border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-primary" />
          <span className="font-display text-xl tracking-wider text-foreground">
            SAYARTI<span className="text-primary">JO</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/car/1"
            className="px-5 py-2 text-sm font-body tracking-wider uppercase bg-primary text-primary-foreground rounded-sm hover:bg-primary/90 transition-colors duration-300"
          >
            Book Now
          </Link>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-body tracking-widest uppercase text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <Link
                to="/car/1"
                onClick={() => setMobileOpen(false)}
                className="mt-2 px-5 py-3 text-sm text-center font-body tracking-wider uppercase bg-primary text-primary-foreground rounded-sm"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
