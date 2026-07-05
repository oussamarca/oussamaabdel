import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Sun, Moon } from "lucide-react";

const navLinks = [{
  name: "Services",
  href: "#skills"
}, {
  name: "\u00a0Projects",
  href: "#projects"
}, {
  name: "Contact",
  href: "#contact"
}];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const initialLight = savedTheme === "light" || (!savedTheme && prefersLight);
    setIsLightMode(initialLight);
    if (initialLight) {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isLightMode;
    setIsLightMode(next);
    if (next) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  return <motion.nav initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.6,
    ease: "easeOut"
  }} className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "bg-transparent py-6"}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.a href="#" className="text-2xl font-bold text-gradient" whileHover={{
        scale: 1.05
      }} whileTap={{
        scale: 0.95
      }}>

      </motion.a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => <motion.a key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors duration-300" whileHover={{
          y: -2
        }}>
              {link.name}
            </motion.a>)}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={isLightMode ? "Switch to dark mode" : "Switch to light mode"}
            className="p-2.5 rounded-full border border-border bg-secondary/50 text-muted-foreground hover:text-foreground hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)] transition-all duration-300"
          >
            {isLightMode ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[hsl(210,100%,65%)] to-[hsl(270,80%,60%)] text-primary-foreground font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] active:scale-95"
          >
            Get in Touch
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-foreground" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && <motion.div initial={{
      opacity: 0,
      y: -20
    }} animate={{
      opacity: 1,
      y: 0
    }} exit={{
      opacity: 0,
      y: -20
    }} className="md:hidden glass mt-4 mx-6 p-6 rounded-xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => <a key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
                {link.name}
              </a>)}
            <button
              type="button"
              onClick={() => {
                toggleTheme();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border bg-transparent text-muted-foreground font-semibold text-sm transition-all duration-300 hover:text-foreground hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
            >
              {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
              {isLightMode ? "Dark Mode" : "Light Mode"}
            </button>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                setIsMobileMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-2 block text-center px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(210,100%,65%)] to-[hsl(270,80%,60%)] text-primary-foreground font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)]"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>}
    </motion.nav>;
};