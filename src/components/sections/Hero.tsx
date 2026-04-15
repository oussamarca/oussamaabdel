import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles } from "lucide-react";
import { Typewriter } from "@/components/ui/typewriter";
import profilePhoto from "@/assets/profile-photo.png";
export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 dot-pattern opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      
      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex justify-center">
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50 animate-pulse-glow" />
              {/* Animated rotating border */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-spin opacity-75" style={{ animationDuration: '3s' }} />
              <div className="absolute -inset-0.5 rounded-full bg-background" />
              <img
                src={profilePhoto}
                alt="Oussama Abdeljebbar"
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover object-top glow-primary" />
              
            </div>
          </motion.div>

          {/* Badge */}
          







          

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            
            Hi, I'm{" "}
            <span className="text-gradient">Oussama</span>
            <motion.span
              animate={{ rotate: [0, 20, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block ml-2">
              
              👋
            </motion.span>
          </motion.h1>

          {/* Subtitle */}
          <Typewriter
            texts={[
            "I design and develop modern websites and build intelligent automation systems powered by Artificial Intelligence. By combining web design, development, and AI technologies, I create smart digital solutions that automate workflows, improve productivity, and help businesses grow faster."]
            }
            className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed"
            speed={25}
            delay={800} />
          

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4">
            
            <Button variant="hero" size="xl" className="group" asChild>
              <a href="#work">
                View My Work
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button variant="hero-outline" size="xl" asChild>
              <a href="#about">
                <Brain className="w-5 h-5" />
                About Me
              </a>
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2">
            
            









            
          </motion.div>
        </div>
      </div>
    </section>);

};