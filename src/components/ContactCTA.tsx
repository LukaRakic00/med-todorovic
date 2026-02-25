import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ContactCTA = () => {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="honey-gradient w-full h-full" />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-6">
            Želite da naručite <span className="text-primary">naš med</span>?
          </h2>
          <p className="text-cream/70 font-body text-lg max-w-xl mx-auto mb-10">
            Javite nam se i rado ćemo vam pomoći da odaberete pravi med za vas i vašu porodicu.
          </p>
          <Button asChild size="lg" className="text-base px-10 py-6 font-body">
            <Link to="/kontakt">Pošaljite poruku</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
