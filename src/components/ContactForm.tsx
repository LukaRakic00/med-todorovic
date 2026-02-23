import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Ime je obavezno").max(100),
  email: z.string().trim().email("Unesite validan email").max(255),
  phone: z.string().optional(),
  message: z.string().trim().min(1, "Poruka je obavezna").max(2000),
});

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert([{
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || null,
      message: result.data.message,
    }]);
    setLoading(false);

    if (error) {
      toast.error("Greška pri slanju poruke. Pokušajte ponovo.");
    } else {
      toast.success("Poruka je uspešno poslata!");
      setForm({ name: "", email: "", phone: "", message: "" });
    }
  };

  return (
    <section id="kontakt" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-amber-950/90" />
      <div className="absolute inset-0 opacity-10">
        <div className="honey-gradient w-full h-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">
            Javite nam se
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-cream mt-2 mb-4">
            Kontakt
          </h2>
          <p className="text-cream/70 font-body text-lg max-w-xl mx-auto">
            Imate pitanja ili želite da naručite? Pišite nam ili nas pozovite.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto"
        >
          {/* Kontakt info – brzi pristup */}
          <div className="space-y-6">
            <a
              href="tel:+381642299266"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl honey-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone size={24} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-cream/60 font-body text-sm">Pozovite nas</p>
                <p className="text-cream font-display text-xl font-semibold">+381 64 2299 266</p>
              </div>
            </a>
            <a
              href="mailto:vasilijetodorovic983@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl honey-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail size={24} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-cream/60 font-body text-sm">Email</p>
                <p className="text-cream font-body text-base break-all">vasilijetodorovic983@gmail.com</p>
              </div>
            </a>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-14 h-14 rounded-xl honey-gradient flex items-center justify-center">
                <MapPin size={24} className="text-primary-foreground" />
              </div>
              <div className="text-left">
                <p className="text-cream/60 font-body text-sm">Lokacija</p>
                <p className="text-cream font-display text-lg">Srbija</p>
              </div>
            </div>
          </div>

          {/* Forma */}
          <div className="lg:col-span-2">
            <div className="bg-card/95 backdrop-blur border border-border rounded-2xl p-8 md:p-10 shadow-2xl">
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Pošaljite poruku
              </h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <Label className="font-body text-foreground">Ime i prezime</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2 h-12" />
                  </div>
                  <div>
                    <Label className="font-body text-foreground">Email</Label>
                    <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="mt-2 h-12" />
                  </div>
                </div>
                <div>
                  <Label className="font-body text-foreground">Telefon (opciono)</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 h-12" />
                </div>
                <div>
                  <Label className="font-body text-foreground">Poruka</Label>
                  <Textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="mt-2 resize-none" />
                </div>
                <Button type="submit" size="lg" className="w-full font-body h-14 text-lg honey-gradient text-primary-foreground hover:opacity-90 transition-opacity gap-2 border-0" disabled={loading}>
                  <Send size={20} />
                  {loading ? "Slanje..." : "Pošalji poruku"}
                </Button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
