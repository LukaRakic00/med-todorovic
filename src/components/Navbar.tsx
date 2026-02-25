import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoWide from "@/assets/logo-wide.png";

const navItems = [
  { label: "Početna", path: "/" },
  { label: "O nama", path: "/o-nama" },
  { label: "Proizvodi", path: "/proizvodi" },
  { label: "Galerija", path: "/galerija" },
  { label: "Blog", path: "/blog" },
  { label: "Kontakt", path: "/kontakt" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-foreground/90 backdrop-blur-md border-b border-primary/20">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 min-w-0 shrink">
          <img src={logoWide} alt="Pčelarstvo Logo" className="h-8 md:h-10 max-w-[180px] md:max-w-none object-contain" />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium tracking-wide uppercase transition-colors hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary"
                  : "text-primary-foreground/80"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary-foreground"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-foreground/95 backdrop-blur-md border-b border-primary/20"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs font-medium tracking-wide uppercase py-2 px-2 rounded transition-colors hover:text-primary hover:bg-primary/10 ${
                    location.pathname === item.path
                      ? "text-primary bg-primary/5"
                      : "text-primary-foreground/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
