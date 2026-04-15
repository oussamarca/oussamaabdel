import { motion } from "framer-motion";

const techCategories = [
  {
    title: "Languages",
    items: ["Python", "JavaScript", "C/C++"],
  },
  {
    title: "AI Frameworks",
    items: ["PyTorch"],
  },
  {
    title: "Data",
    items: ["SQL"],
  },
  {
    title: "Deployment",
    items: ["Docker", "FastAPI"],
  },
  {
    title: "Cloud & Tools",
    items: ["Git", "Linux", "APIs"],
  },
  {
    title: "AI Automation",
    items: ["n8n", "Make", "Zapier"],
  },
];

export const TechStack = () => {
  return (
    <section className="py-24 relative overflow-hidden">
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
            <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The tools and technologies I use to bring AI projects to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 lg:gap-12"
        >
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="glass p-6 rounded-2xl min-w-[200px]"
            >
              <h3 className="text-primary font-semibold mb-4 text-center">{category.title}</h3>
              <div className="flex flex-col gap-2">
                {category.items.map((item) => (
                  <motion.span
                    key={item}
                    whileHover={{ x: 5 }}
                    className="text-muted-foreground hover:text-foreground transition-colors cursor-default text-center"
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
