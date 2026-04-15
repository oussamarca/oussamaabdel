import { motion } from "framer-motion";
import { Bot, Workflow, MessageSquare, Cpu, BrainCircuit, Zap } from "lucide-react";

const services = [
  {
    icon: Zap,
    title: "AI Automation",
    description: "End-to-end intelligent automation that eliminates repetitive tasks, reduces human error, and accelerates your operations.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation with n8n",
    description: "Custom n8n workflows that connect your tools, automate processes, and keep your business running on autopilot.",
  },
  {
    icon: BrainCircuit,
    title: "AI Agents Development",
    description: "Autonomous AI agents that reason, plan, and execute complex tasks — from research to customer support.",
  },
  {
    icon: MessageSquare,
    title: "Chatbots Using LLMs",
    description: "Intelligent conversational chatbots powered by large language models that understand context and deliver real value.",
  },
  {
    icon: Cpu,
    title: "Machine Learning Solutions",
    description: "Custom ML models for prediction, classification, and data analysis — tailored to your specific business challenges.",
  },
  {
    icon: Bot,
    title: "LLM Integration",
    description: "Seamless integration of GPT, Claude, and other LLMs into your existing products and workflows for smarter experiences.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const WhatIDo = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            I help startups and businesses leverage AI to automate workflows,
            build intelligent systems, and scale faster with less effort.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="glass-hover p-8 rounded-2xl group cursor-pointer"
            >
              <div className="w-14 h-14 bg-gradient-subtle rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
