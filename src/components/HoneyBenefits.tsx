import { Heart, Zap, Shield } from "lucide-react";

const benefits = [
  { icon: Heart, title: "Imunitet", desc: "Prirodno jača odbranu organizma." },
  { icon: Zap, title: "Energija", desc: "Brza i prirodna energija bez šećera." },
  { icon: Shield, title: "Antioksidansi", desc: "Bogat vitaminima i mineralima." },
];

const HoneyBenefits = () => {
  return (
    <section className="py-24 bg-background section-warm">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-foreground mb-12">
          Zašto med?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {benefits.map((b) => (
            <div key={b.title} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <b.icon size={28} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">{b.title}</h3>
              <p className="text-muted-foreground font-body text-sm">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HoneyBenefits;
