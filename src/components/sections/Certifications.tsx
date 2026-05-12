import { motion, AnimatePresence } from "framer-motion";
import { Award, X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import n8nCertificate from "@/assets/certificates/n8n-basics-certificate.jpg";
import agileAiCertificate from "@/assets/certificates/agile-in-ai-development.png";
import agileAllerViteCertificate from "@/assets/certificates/agile-bootcamp-aller-vite.png";
import ranadabSoftSkillsCertificate from "@/assets/certificates/ranadab-soft-skills.png";

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
  {
    title: "Agile in AI Development",
    issuer: "Agile B Darija",
    date: "March 6, 2026",
    duration: "Workshop",
    credentialId: "AGILE-BOOTCAMP-AI-2026",
    image: agileAiCertificate,
    verifyUrl: "#",
  },
  {
    title: 'L\'Agile, ce n\'est pas "aller vite"',
    issuer: "Agile B Darija",
    date: "March 13, 2026",
    duration: "Workshop",
    credentialId: "AGILE-BOOTCAMP-AV-2026",
    image: agileAllerViteCertificate,
    verifyUrl: "#",
  },
  {
    title: "L'Agilité : la compétence clé du futur",
    issuer: "Agile B Darija",
    date: "March 11, 2026",
    duration: "Workshop",
    credentialId: "RANADAB-SOFT-SKILLS-2026",
    image: ranadabSoftSkillsCertificate,
    verifyUrl: "#",
  },
];

export const Certifications = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const isOpen = selectedIndex !== null;
  const selectedCert = isOpen ? certifications[selectedIndex] : null;

  const close = useCallback(() => setSelectedIndex(null), []);
  const next = useCallback(
    () => setSelectedIndex((i) => (i === null ? i : (i + 1) % certifications.length)),
    []
  );
  const prev = useCallback(
    () =>
      setSelectedIndex((i) =>
        i === null ? i : (i - 1 + certifications.length) % certifications.length
      ),
    []
  );

  // Keyboard nav + scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, close, next, prev]);

  return (
    <>
      <AnimatePresence>
        {isOpen && selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-background/70 backdrop-blur-md"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={selectedCert.title}
          >
            {/* Close */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
              aria-label="Close"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-11 h-11 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background hover:scale-105 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous certificate"
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background hover:scale-105 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next certificate"
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-background/60 backdrop-blur-md border border-border/50 flex items-center justify-center text-foreground hover:bg-background hover:scale-105 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image + caption */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCert.credentialId}
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 24 }}
                className="relative max-w-6xl w-full flex flex-col items-center gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative max-h-[78vh] w-auto overflow-hidden rounded-2xl shadow-2xl ring-1 ring-border/40 bg-background/30">
                  <img
                    src={selectedCert.image}
                    alt={`${selectedCert.title} Certificate`}
                    className="block max-h-[78vh] w-auto h-auto object-contain"
                  />
                </div>
                <div className="text-center px-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground">
                    {selectedCert.title}
                  </h3>
                  <p className="text-sm text-primary mt-1">
                    {selectedCert.issuer} · {selectedCert.date}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {selectedIndex! + 1} / {certifications.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.button
                type="button"
                key={cert.credentialId}
                onClick={() => setSelectedIndex(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group text-left glass rounded-2xl overflow-hidden border border-border/40 shadow-lg hover:shadow-2xl hover:border-primary/40 transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-muted/30">
                  <img
                    src={cert.image}
                    alt={`${cert.title} Certificate`}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 text-sm font-medium">
                      <ZoomIn className="w-4 h-4 text-primary" />
                      <span>View Certificate</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">{cert.title}</h3>
                  <p className="text-sm text-primary mb-3">{cert.issuer}</p>

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground mb-4">
                    <span className="px-2 py-1 rounded-md bg-muted/50">{cert.date}</span>
                    <span className="px-2 py-1 rounded-md bg-muted/50">{cert.duration}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="font-mono truncate">{cert.credentialId}</span>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
