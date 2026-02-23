import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import aboutImg from "@/assets/about-beekeeper.jpg";

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title="O nama" subtitle="Upoznajte našu porodicu i tradiciju" />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.img
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              src={aboutImg}
              alt="Pčelar"
              className="rounded-xl shadow-xl w-full object-cover aspect-[4/5]"
            />
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Naša <span className="text-primary">priča</span>
              </h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Pčelarstvo u našoj porodici traje više od dve decenije. Ono što je počelo kao 
                  hobi i ljubav prema prirodi, danas je preraslo u ozbiljan posao kojim se ponosimo.
                </p>
                <p>
                  Naše košnice nalaze se na čistim livadama i u šumama daleko od zagađenja, 
                  što garantuje da svaka kap meda koji proizvode naše pčele bude potpuno prirodna.
                </p>
                <p>
                  Verujemo da je kvalitet ono što nas izdvaja. Zato ne žurimo sa proizvodnjom - 
                  svaki tegla meda prolazi stroge kontrole kvaliteta pre nego što dođe do vas.
                </p>
                <p>
                  Naš cilj je jednostavan: doneti vam ukus čiste prirode direktno na vaš sto.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-10">
                {[
                  { value: "25+", label: "Godina iskustva" },
                  { value: "200+", label: "Košnica" },
                  { value: "100%", label: "Prirodno" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-primary font-display text-3xl font-bold">{stat.value}</div>
                    <div className="text-muted-foreground text-xs mt-1 font-body">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;
