import { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "@/lib/i18n";
import { Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { lang, t, switchLang } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: `/${lang}`, label: t("الرئيسية", "Home") },
    { to: `/${lang}/about`, label: t("من نحن", "About") },
    { to: `/${lang}/portfolio`, label: t("أعمالنا", "Portfolio") },
    { to: `/${lang}/blog`, label: t("المدونة", "Blog") },
    { to: `/${lang}/contact`, label: t("تواصل معنا", "Contact") },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to={`/${lang}`} className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary-foreground">
              <span className="text-gradient-gold">Web</span>
              <span className="text-primary-foreground">Egypt</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-primary-foreground/80 hover:text-accent transition-colors text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={switchLang}
              className="flex items-center gap-1.5 text-primary-foreground/80 hover:text-accent transition-colors text-sm"
            >
              <Globe className="w-4 h-4" />
              {lang === "ar" ? "EN" : "عربي"}
            </button>
            <Link
              to={`/${lang}/contact`}
              className="gradient-gold text-accent-foreground px-5 py-2 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity shadow-gold"
            >
              {t("احصل على عرض سعر", "Get a Quote")}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary border-t border-primary-foreground/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="text-primary-foreground/80 hover:text-accent transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <button
                onClick={() => { switchLang(); setIsOpen(false); }}
                className="flex items-center gap-2 text-primary-foreground/80 hover:text-accent transition-colors py-2"
              >
                <Globe className="w-4 h-4" />
                {lang === "ar" ? "English" : "عربي"}
              </button>
              <Link
                to={`/${lang}/contact`}
                onClick={() => setIsOpen(false)}
                className="gradient-gold text-accent-foreground px-5 py-3 rounded-lg font-semibold text-center"
              >
                {t("احصل على عرض سعر", "Get a Quote")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
