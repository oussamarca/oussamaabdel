import { motion } from "framer-motion";

const techCategories = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "SQL", "C/C++"],
  },
  {
    title: "Cloud & DevOps",
    items: ["Azure", "Azure DevOps", "GitHub", "Docker", "Linux"],
  },
  {
    title: "AI & Data",
    items: ["OpenCV", "Machine Learning", "Generative AI", "AI Agents", "Computer Vision"],
  },
  {
    title: "Automation",
    items: ["n8n", "APIs", "Workflow Automation"],
  },
];

export const TechStack = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden scroll-mt-24">
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Skills & Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The languages, tools and frameworks I use to ship real products.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              whileHover={{ y: -4 }}
              className="glass-hover p-6 rounded-2xl border border-border/40 hover:border-primary/40 transition-colors duration-300"
            >
              <h3 className="text-primary font-semibold mb-4 text-center text-lg">
                {category.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {category.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 text-sm rounded-full bg-secondary/60 border border-border/40 text-foreground hover:border-primary/50 hover:bg-secondary transition-colors cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
