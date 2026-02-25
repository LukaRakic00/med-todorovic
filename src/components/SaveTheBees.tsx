const SaveTheBees = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Preuzmimo Odgovornost — <span className="text-primary">Sačuvajmo Pčele</span>
          </h2>

          <div className="space-y-6 text-muted-foreground font-body leading-relaxed text-lg">
            <p>
              <span className="font-semibold text-foreground">Svaki treći zalogaj čoveka zavisi od pčela i njihovog oprašivanja.</span>
              {" "}A šta kada bi vam rekli da pčele izumiru većom brzinom nego što mnogi misle?
            </p>

            <p>
              Smatra se da će se čitava priroda promeniti i da ćemo ostati bez mnogih vrsta voća
              i povrća bez kojih ne bismo mogli da zamislimo svakodnevnu ishranu.
            </p>

            <div className="bg-primary/10 border-l-4 border-primary p-6 rounded-lg italic">
              <p className="text-foreground font-semibold mb-2">
                Ajnštajn je govorio:
              </p>
              <p>
                „Kada bi pčele nestale, čoveku bi ostalo četiri godine života"
              </p>
            </div>

            <div className="mt-8 p-6 bg-card border border-border rounded-xl">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Šta možemo da uradimo?
              </h3>
              <p>
                Kupovinom meda podržavate poljoprivrednike i pčelare u svom kraju. Jedino zajedničkom
                borbom na lokalnom nivou možemo doprineti globalnom poboljšanju. Preuzmimo odgovornost
                dok ne bude prekasno — sačuvajmo prirodu za naše unuke i njihovu decu!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaveTheBees;
