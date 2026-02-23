import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="hero-overlay absolute inset-0" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block text-primary font-body text-sm uppercase tracking-[0.3em] mb-4">
            Tradicija · Kvalitet · Priroda
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight mb-6"
        >
          Zlato iz <br />
          <span className="text-primary">prirode</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-cream/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10"
        >
          Porodično pčelarstvo sa dugom tradicijom. Proizvodimo najčistiji med
          sa netaknutih livada i šuma Srbije.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button asChild size="lg" className="text-base px-8 py-6 font-body">
            <Link to="/proizvodi">Naši proizvodi</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="text-base px-8 py-6 font-body border border-cream/30 text-cream bg-transparent hover:bg-cream/10 hover:text-cream"
          >
            <Link to="/kontakt">Kontaktirajte nas</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
