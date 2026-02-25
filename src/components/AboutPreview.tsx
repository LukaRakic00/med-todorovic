import aboutImg from "@/assets/about-beekeeper.jpg";

const AboutPreview = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="relative">
              <img
                src={aboutImg}
                alt="Pčelar pregleda saće"
                className="rounded-lg shadow-2xl w-full object-cover aspect-square"
              />
              <div className="absolute -bottom-5 -right-5 honey-gradient text-primary-foreground font-display text-2xl md:text-3xl font-bold px-8 py-5 rounded-2xl shadow-2xl border-2 border-primary-foreground/20 ring-4 ring-primary/30">
                25+ godina
              </div>
            </div>
          </div>

          <div>
            <span className="text-primary font-body text-sm uppercase tracking-[0.2em]">
              PRODAJA DOMAĆEG MEDA I MEDA SA DODACIMA
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-6">
              Ojačajte svoj organizam <br />i pronađite svoju kombinaciju
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Kombinujemo prirodni med sa voćem, orašastim plodovima i začinima. Pogledajte našu ponudu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
