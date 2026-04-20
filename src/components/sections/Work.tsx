import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Bot, Workflow, MessageSquare, Coffee } from "lucide-react";

const projects = [
  {
    icon: Coffee,
    title: "Café 38 Concept",
    description: "A full-featured website for an artisanal café in Ourika — interactive menu, photo gallery, reviews, and contact system with a warm, inviting design.",
    tags: ["React", "Tailwind CSS", "Web Design"],
    color: "from-amber-500/20 to-orange-500/10",
    result: "Complete digital presence driving foot traffic and online engagement.",
    url: "https://cafe-38-concept.vercel.app/",
    preview: "/images/cafe-38-preview.jpg",
  },
  {
    icon: Coffee,
    title: "Don Camillo Website",
    description: "Designed and launched a polished website experience for Don Camillo, highlighting brand identity, key offerings, and contact flow for customer engagement.",
    tags: ["React", "Tailwind CSS", "UI/UX"],
    color: "from-orange-500/20 to-red-500/10",
    result: "Improved online visibility and helped drive more qualified customer inquiries.",
    url: "https://don-camillo-pearl.vercel.app/",
    preview: "/images/don-camillo-preview.png",
  },
  {
    icon: Coffee,
    title: "La Datte d'Or",
    description: "Built a premium brand website for La Datte d'Or, showcasing products, visual storytelling, and a conversion-focused customer journey.",
    tags: ["React", "Tailwind CSS", "Brand Website"],
    color: "from-amber-500/20 to-yellow-500/10",
    result: "Strengthened brand credibility and increased customer engagement through a polished online presence.",
    url: "https://desert-palette-project.vercel.app/",
    preview: "/images/datte-dor-preview.png",
  },
  {
    icon: Coffee,
    title: "Oil Kamo",
    description: "Crafted a sleek brand website for Oil Kamo, presenting premium oil products with elegant visuals and a smooth, conversion-driven customer journey.",
    tags: ["React", "Tailwind CSS", "Brand Website"],
    color: "from-emerald-500/20 to-green-500/10",
    result: "Elevated brand presence and provided a polished platform to attract and convert new customers.",
    url: "https://oil-kamo.vercel.app/",
    preview: "/images/oil-kamo-preview.png",
  },
  {
    icon: Bot,
    title: "AI-Powered Customer Support Agent",
    description: "Built an AI-powered customer support automation system capable of receiving user messages, detecting intent, and generating contextual responses using AI models. The workflow integrates automation logic, AI APIs, and response formatting to handle common support inquiries efficiently.",
    tags: ["n8n", "AI APIs", "Webhooks", "Automation", "Gemini"],
    color: "from-blue-500/20 to-cyan-500/10",
    result: "Automates repetitive customer inquiries and helps teams respond faster and more efficiently.",
    preview: "/images/ai-support-workflow.png",
  },
  {
    icon: Workflow,
    title: "AI Automation Workflow System",
    description: "Designed and implemented an AI-powered automation workflow using n8n that integrates AI agents, scheduled triggers, and Google Sheets. The system processes data, executes automated tasks, and updates information dynamically through connected services and APIs.",
    tags: ["n8n", "AI Agents", "Google Sheets", "APIs", "Automation"],
    color: "from-orange-500/20 to-amber-500/10",
    result: "Automates repetitive data processing tasks and improves operational efficiency by reducing manual work.",
    preview: "/images/ai-n8n-workflow.png",
  },
  {
    icon: MessageSquare,
    title: "AI Knowledge Base Chatbot with RAG",
    description: "Developed an AI-powered chatbot using Retrieval-Augmented Generation (RAG) to answer user questions based on stored documents. The system processes files, generates embeddings, stores them in a Pinecone vector database, and retrieves relevant information during conversations to generate accurate responses.",
    tags: ["RAG", "Pinecone", "Gemini", "Vector Database", "Telegram Bot"],
    color: "from-purple-500/20 to-violet-500/10",
    result: "Enables intelligent question-answering based on internal knowledge sources, improving information access and response accuracy.",
    preview: "/images/ai-sales-chatbot-workflow.png",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
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

export const Work = () => {
  const websiteProjects = projects.slice(0, 3);
  const automationProjects = projects.slice(3);

  const renderProjectGrid = (projectList: typeof projects) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {projectList.map((project) => (
        <motion.div
          key={project.title}
          variants={itemVariants}
          className="group relative"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className="relative glass-hover rounded-2xl h-full overflow-hidden flex flex-col">
            {/* Header - Preview image or icon */}
            {"preview" in project && project.preview ? (
              <div className="relative h-44 sm:h-48 md:h-52 lg:h-48 xl:h-52 overflow-hidden bg-muted/30 flex items-center justify-center">
                <img
                  src={project.preview}
                  alt={`${project.title} preview`}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                {"url" in project && project.url && (
                  <motion.a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="absolute top-3 right-3 w-9 h-9 bg-background/70 backdrop-blur-md border border-border/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-foreground" />
                  </motion.a>
                )}
              </div>
            ) : (
              <div className="relative h-36 overflow-hidden flex items-center justify-center bg-gradient-to-br from-muted/50 to-muted/20">
                <project.icon className="w-12 h-12 text-primary/40 group-hover:text-primary/60 transition-colors duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-gradient-subtle rounded-lg flex items-center justify-center shrink-0">
                  <project.icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-gradient transition-all duration-300 leading-tight">
                  {project.title}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Result */}
              <div className="glass px-4 py-3 rounded-xl mb-4">
                <p className="text-xs font-medium text-primary">📈 Impact</p>
                <p className="text-sm text-foreground mt-1">{project.result}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-0.5 text-xs bg-secondary/80 rounded-full text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Visit link for projects with URLs */}
            {"url" in project && project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 border-t border-border/50 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <span>Visit Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );

  return (
    <section id="work" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real-world AI and automation solutions delivering measurable business impact.
          </p>
        </motion.div>

        <div className="space-y-14">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient">Website Projects</span>
            </h3>
            {renderProjectGrid(websiteProjects)}
          </div>

          <div>
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="text-gradient">AI Automation Projects</span>
            </h3>
            {renderProjectGrid(automationProjects)}
          </div>
        </div>
      </div>
    </section>
  );
};
