import { motion } from "framer-motion";
import { Github, ExternalLink, Hand, Sparkles } from "lucide-react";

const repos = [
  {
    icon: Hand,
    title: "Air Drawing",
    description:
      "Real-time computer vision app that lets users draw in the air using hand tracking and gesture recognition. Built with Python and OpenCV.",
    tags: ["Python", "OpenCV", "Computer Vision", "Hand Tracking"],
    github: "https://github.com/oussamarca/Air-drawing",
    demo: null,
    color: "from-emerald-500/20 to-cyan-500/10",
  },
  {
    icon: Sparkles,
    title: "Oil Kamo Website",
    description:
      "Premium brand website for Oil Kamo, presenting oil products with elegant visuals and a conversion-driven customer journey.",
    tags: ["React", "Tailwind CSS", "Brand Website"],
    github: "https://github.com/oussamarca",
    demo: "https://oil-kamo.vercel.app/",
    color: "from-amber-500/20 to-orange-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const GithubProjects = () => {
  return (
    <section id="github" className="py-24 relative scroll-mt-24">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-4">
            <Github className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Open Source</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">GitHub Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of repositories — feel free to explore the code.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {repos.map((repo) => (
            <motion.div
              key={repo.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              className="group relative"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${repo.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="relative glass-hover rounded-2xl h-full p-6 flex flex-col border border-border/40 hover:border-primary/40 transition-colors duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 bg-gradient-subtle rounded-xl flex items-center justify-center">
                    <repo.icon className="w-5 h-5 text-primary" />
                  </div>
                  <a
                    href={repo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${repo.title} on GitHub`}
                    className="w-9 h-9 rounded-full border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gradient transition-all duration-300">
                  {repo.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {repo.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {repo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs bg-secondary/80 rounded-full text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2">
                  <a
                    href={repo.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-border/60 text-sm text-foreground hover:bg-secondary/60 hover:border-primary/50 transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  {repo.demo && (
                    <a
                      href={repo.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-[hsl(210,100%,65%)] to-[hsl(270,80%,60%)] text-primary-foreground text-sm font-medium hover:scale-[1.02] transition-transform"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
