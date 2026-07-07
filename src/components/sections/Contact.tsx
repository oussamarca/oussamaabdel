import { motion, useInView } from "framer-motion";
import { Mail, Linkedin, Send, CheckCircle, MessageCircle, Github } from "lucide-react";
import { useRef, useState, FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const WHATSAPP_NUMBER = "212629162012";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const validateForm = (data: { name: string; email: string; message: string }): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  else if (data.name.trim().length > 100) errors.name = "Name must be under 100 characters";
  if (!data.email.trim()) errors.email = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = "Invalid email address";
  else if (data.email.trim().length > 255) errors.email = "Email must be under 255 characters";
  if (!data.message.trim()) errors.message = "Message is required";
  else if (data.message.trim().length > 1000) errors.message = "Message must be under 1000 characters";
  return errors;
};

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSending(true);
    try {
      // Save to backend (best-effort; don't block email on DB error)
      await supabase.from("contact").insert([
        { name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() },
      ]);

      // Send email via secure edge function (Resend)
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      });

      if (error || !data?.success) {
        toast.error("Failed to send your message. Please try again.");
        setSending(false);
        return;
      }

      setSent(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      toast.success("Your message has been sent successfully.");
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const openWhatsApp = () => {
    const text = `New message from portfolio:\n\nName: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const inputClasses =
    "w-full bg-secondary/50 border border-border rounded-xl px-5 py-3.5 text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-300 focus:border-primary/60 focus:shadow-[0_0_20px_hsl(var(--primary)/0.15)] focus:bg-secondary/70";

  const errorClass = "border-destructive/60 focus:border-destructive/80";

  return (
    <section id="contact" className="py-28 relative scroll-mt-24" ref={sectionRef}>
      <div className="absolute inset-0 grid-pattern opacity-20" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/8 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-accent/6 rounded-full blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <span className="text-5xl mb-5 block">🚀</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-gradient">Let's Work Together</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Have a project in mind or want to collaborate? Feel free to reach out.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="max-w-xl mx-auto"
        >
          <div className="glass rounded-2xl p-8 md:p-10">
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-foreground">Message Sent!</h3>
                <p className="text-muted-foreground mb-6">
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="text-primary hover:underline underline-offset-4 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    maxLength={100}
                    className={`${inputClasses} ${errors.name ? errorClass : ""}`}
                  />
                  {errors.name && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-sm mt-1.5">
                      {errors.name}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    maxLength={255}
                    className={`${inputClasses} ${errors.email ? errorClass : ""}`}
                  />
                  {errors.email && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-sm mt-1.5">
                      {errors.email}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    maxLength={1000}
                    rows={5}
                    className={`${inputClasses} resize-none ${errors.message ? errorClass : ""}`}
                  />
                  {errors.message && (
                    <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-destructive text-sm mt-1.5">
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                <div className="flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-[hsl(210,100%,65%)] to-[hsl(270,80%,60%)] text-primary-foreground font-semibold text-base transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_35px_hsl(var(--primary)/0.4)] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {sending ? (
                      <span className="inline-block w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                    {sending ? "Sending..." : "Send Message"}
                  </button>

                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border border-border bg-transparent text-foreground font-semibold text-base transition-all duration-300 hover:bg-secondary/50 hover:border-green-500/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)] active:scale-[0.98]"
                  >
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    Contact via WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <a
              href="https://mail.google.com/mail/?view=cm&to=oussamaabdel889@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-transparent text-muted-foreground font-medium text-sm transition-all duration-300 hover:text-foreground hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
            >
              <Mail className="w-4 h-4" />
              oussamaabdel889@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/oussama-abdel-jebbar-8784b037b/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-transparent text-muted-foreground font-medium text-sm transition-all duration-300 hover:text-foreground hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
            >
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a
              href="https://github.com/oussamarca"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-transparent text-muted-foreground font-medium text-sm transition-all duration-300 hover:text-foreground hover:border-primary/40 hover:shadow-[0_0_15px_hsl(var(--primary)/0.15)]"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
