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
        <span className="inline-block text-primary font-body text-sm uppercase tracking-[0.3em] mb-4">
            Tradicija · Kvalitet · Priroda
          </span>

        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-cream leading-tight mb-6">
          Zlato iz <br />
          <span className="text-primary">prirode</span>
        </h1>

        <p className="text-cream/80 font-body text-lg md:text-xl max-w-2xl mx-auto mb-10">
          Porodično pčelarstvo sa dugom tradicijom. Proizvodimo najčistiji med
          sa netaknutih livada i šuma Srbije.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
