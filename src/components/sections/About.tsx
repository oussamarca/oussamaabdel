import { motion } from "framer-motion";
import { Brain, Target, Lightbulb, Rocket } from "lucide-react";

const highlights = [
{
  icon: Brain,
  title: "AI-First Mindset",
  description: "Every solution I build starts with one question: how can AI make this smarter?"
},
{
  icon: Target,
  title: "Problem Solver",
  description: "I thrive on breaking down complex challenges into intelligent, automated systems."
},
{
  icon: Lightbulb,
  title: "Continuous Learner",
  description: "Always exploring the latest in LLMs, AI agents, and automation frameworks."
},
{
  icon: Rocket,
  title: "Results-Driven",
  description: "I focus on delivering measurable impact — faster workflows, lower costs, better outcomes."
}];


export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-20 bg-primary-foreground rounded-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">About Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">






          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {highlights.map((item, index) =>
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-hover p-6 rounded-2xl text-center group">
            
              <div className="w-12 h-12 bg-gradient-subtle rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>);

};