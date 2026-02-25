import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoIcon from "@/assets/logo-icon.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src={logoIcon} alt="Logo" className="h-16 mb-4" />
            <p className="text-sm leading-relaxed font-body">
              Porodično pčelarstvo sa dugom tradicijom. Proizvodimo najkvalitetniji med
              sa netaknutih livada i šuma Srbije.
            </p>
          </div>

          <div>
            <h4 className="font-display text-primary text-lg mb-4">Navigacija</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Početna", path: "/" },
                { label: "O nama", path: "/o-nama" },
                { label: "Proizvodi", path: "/proizvodi" },
                { label: "Galerija", path: "/galerija" },
                { label: "Blog", path: "/blog" },
                { label: "Kontakt", path: "/kontakt" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-sm hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-primary text-lg mb-4">Kontakt</h4>
            <div className="flex flex-col gap-3 text-sm">
              <a
                href="tel:+381642299266"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Phone size={16} className="text-primary shrink-0" />
                <span>+381 64 2299 266</span>
              </a>
              <a
                href="mailto:vasilijetodorovic983@gmail.com"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail size={16} className="text-primary shrink-0" />
                <span>vasilijetodorovic983@gmail.com</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary shrink-0" />
                <span>Srbija</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-divider mt-12 mb-6" />
        <div className="text-center space-y-3">
          <a
            href="https://lukarakic.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-5 py-3 rounded-xl bg-primary/25 border-2 border-primary/50 text-primary font-display font-bold text-base hover:bg-primary/35 hover:border-primary transition-all"
          >
            <span>Izrada sajtova — Luka Rakic</span>
            <span className="text-primary/90 text-sm font-body">lukarakic.dev</span>
          </a>
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Pčelarstvo. Sva prava zadržana.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
