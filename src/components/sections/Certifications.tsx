import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, X, ZoomIn } from "lucide-react";
import { useState } from "react";
import n8nCertificate from "@/assets/certificates/n8n-basics-certificate.jpg";

const certifications = [
  {
    title: "n8n Basics: Triggers, APIs, and Logic Nodes",
    issuer: "SYNRA",
    date: "January 2, 2026",
    duration: "1 hour",
    credentialId: "SYNRA-L228RMJT",
    image: n8nCertificate,
    verifyUrl: "#",
  },
];

export const Certifications = () => {
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  return (
    <>
      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative max-w-4xl w-full glass rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <img
                src={selectedCert.image}
                alt={`${selectedCert.title} Certificate`}
                className="w-full h-auto"
              />
              
              <div className="p-6 border-t border-border">
                <h3 className="text-xl font-semibold mb-2">{selectedCert.title}</h3>
                <p className="text-primary mb-2">{selectedCert.issuer}</p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span>Issued: {selectedCert.date}</span>
                  <span>Duration: {selectedCert.duration}</span>
                  <span className="font-mono">ID: {selectedCert.credentialId}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="certifications" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-5xl mb-6 block">🏆</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and continuous learning achievements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.credentialId}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass rounded-2xl overflow-hidden group"
            >
              {/* Certificate Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={cert.image}
                  alt={`${cert.title} Certificate`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Award className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-primary mb-3">{cert.issuer}</p>
                
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                  <span className="px-2 py-1 rounded-md bg-muted/50">
                    {cert.date}
                  </span>
                  <span className="px-2 py-1 rounded-md bg-muted/50">
                    {cert.duration}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-mono">{cert.credentialId}</span>
                  <button
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};
