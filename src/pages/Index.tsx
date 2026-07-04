import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { WhatIDo } from "@/components/sections/WhatIDo";
import { Work } from "@/components/sections/Work";
import { TechStack } from "@/components/sections/TechStack";
import { Certifications } from "@/components/sections/Certifications";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <WhatIDo />
      <Work />
      <TechStack />
      <Certifications />
      <Philosophy />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
