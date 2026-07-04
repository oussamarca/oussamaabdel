import { motion } from "framer-motion";
import { Shield, Lightbulb, Zap, Target } from "lucide-react";

const principles = [
  { icon: Shield, label: "Ethical" },
  { icon: Lightbulb, label: "Explainable" },
  { icon: Zap, label: "Efficient" },
  { icon: Target, label: "Impactful" },
];

export const Philosophy = () => {
  return (
    <section id="philosophy" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass p-10 md:p-14 rounded-3xl relative overflow-hidden"
          >
            {/* Decorative gradient orbs */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <span className="text-6xl md:text-7xl mb-6 block">🚀</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Philosophy</h2>
              <blockquote className="text-xl md:text-2xl text-muted-foreground italic mb-10 leading-relaxed">
                "Artificial Intelligence is not just about automation, 
                it's about <span className="text-gradient font-semibold not-italic">amplifying human potential</span>."
              </blockquote>
              
              <p className="text-muted-foreground mb-8">
                I focus on building AI systems that are:
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                {principles.map((principle, index) => (
                  <motion.div
                    key={principle.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 * index }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex items-center gap-2 bg-secondary/50 px-5 py-3 rounded-xl"
                  >
                    <principle.icon className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">{principle.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
