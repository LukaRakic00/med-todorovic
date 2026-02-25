import { Sparkles } from "lucide-react";

const fullText = (
  <>
    <p className="mb-4">
      Med je blagodet koju čovečanstvo već vekovima koristi. Poklon koji nam pruža naša priroda. Koristite ga kao hranu svakodnevno, a ne samo u trenucima malaksalosti i prehlade.
    </p>
    <p className="mb-4">
      Od daleke Afrike preko Bliskog Istoka do rodne nam Srbije — voće, orašasti plodovi, semenke i začini koji utiču na smanjenje holesterola u kombinaciji sa medom povećavaju nivo vitamina i minerala. Naši proizvodi su pažljivo birani i prerađeni da zadrže prirodnu vrednost.
    </p>
    <p>
      Bavimo se pčelarstvom više od 25 godina. Sakupljamo livadski med sa Zlatibora, Tare i Povlena, a bagrem i suncokret prate sezonske selidbe košnica. Posvećenost kvalitetu i tradiciji čini svaki naš proizvod posebnim.
    </p>
  </>
);

const cards = [
  { title: "Uradite danas bar jednu pravu stvar", delay: 0.1 },
  { title: "Ojačajte svoj organizam", delay: 0.2 },
  { title: "Pronađite svoju kombinaciju", delay: 0.3 },
];

const KeyLessons = () => {
  return (
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-foreground mb-4">
          Ključne lekcije
        </h2>
        <p className="text-center text-muted-foreground font-body text-lg mb-16 max-w-2xl mx-auto">
          Tri stuba našeg pristupa pčelarstvu i zdravlju
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="group relative bg-gradient-to-b from-card to-secondary/30 border border-border rounded-2xl p-8 text-left shadow-lg transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-2 hover:border-primary/40 overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-colors duration-300 group-hover:bg-primary/10" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/15 text-primary group-hover:bg-primary/25 transition-colors duration-300">
                    <Sparkles size={24} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    {card.title}
                  </h3>
                </div>
                <div className="h-px w-16 bg-primary/40 mb-6" />
                <div className="text-muted-foreground font-body text-[18px] leading-relaxed">
                  {fullText}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyLessons;
