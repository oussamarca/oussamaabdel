import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © 2024 <span className="text-gradient font-semibold">Oussama.AI</span> — AI Developer Portfolio
          </p>
          <p className="text-muted-foreground text-sm">
            Building the future, one algorithm at a time.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
