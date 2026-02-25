const BeeKeepingTradition = () => {
  return (
    <section className="py-24 bg-foreground relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="honey-gradient w-full h-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream mb-6">
            25 GODINA BAVLJENJA <span className="text-primary">PČELARSTVOM</span>
          </h2>

          <div className="space-y-6 text-cream/80 font-body leading-relaxed text-lg">
            <div>
              <h3 className="font-display text-2xl font-semibold text-primary mb-3">
                MED SA ŠUMOVITIH PLANINA I CVETNE RAVNICE
              </h3>
              <p>
                Livadski med sakupljamo na Zlatiboru, Tari i Povlenu. Na bagrem se selimo u
                područje Šumadije i oko reke Drine. Kada je u pitanju suncokret idemo u Banat
                i Bačku, pored Dunava.
              </p>
            </div>

            <p>
              Kada se sezona završi, zimujemo u rejonu Zlatibora, Tare i Povlena. Svaka lokacija
              donosi jedinstvene karakteristike našem medu — od boje, kroz miris, do nutritivne vrednosti.
            </p>

            <p className="text-cream/60 italic">
              Bavljenja pčelarstvom nije samo kuća pčela, već način života usmeren ka održivosti
              i poštovanju prirode koja nas hrani.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeeKeepingTradition;
