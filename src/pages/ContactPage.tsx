import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Ime je obavezno").max(100),
  email: z.string().trim().email("Unesite validan email").max(255),
  phone: z.string().optional(),
  message: z.string().trim().min(1, "Poruka je obavezna").max(2000),
});

const ContactPage = () => {
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

  const contactItems = [
    { icon: Phone, label: "Telefon", value: "+381 64 2299 266", href: "tel:+381642299266" },
    { icon: Mail, label: "Email", value: "vasilijetodorovic983@gmail.com", href: "mailto:vasilijetodorovic983@gmail.com" },
    { icon: MapPin, label: "Lokacija", value: "Srbija", href: null as string | null },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title="Kontakt" subtitle="Imate pitanja ili želite da naručite? Pišite nam ili nas pozovite." />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto items-start">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
              <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                Pošaljite nam <span className="text-primary">poruku</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="font-body">Ime i prezime</Label>
                  <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 h-12" required />
                </div>
                <div>
                  <Label htmlFor="email" className="font-body">Email</Label>
                  <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 h-12" required />
                </div>
                <div>
                  <Label htmlFor="phone" className="font-body">Telefon (opciono)</Label>
                  <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-2 h-12" />
                </div>
                <div>
                  <Label htmlFor="message" className="font-body">Poruka</Label>
                  <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2 resize-none" required />
                </div>
                <Button type="submit" size="lg" className="w-full font-body h-14 text-lg honey-gradient text-primary-foreground hover:opacity-90 transition-opacity gap-2 border-0" disabled={loading}>
                  <Send size={20} />
                  {loading ? "Slanje..." : "Pošalji poruku"}
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-foreground mb-8">
                Kontakt <span className="text-primary">informacije</span>
              </h2>
              {contactItems.map((item) => {
                const Wrapper = item.href ? "a" : "div";
                const wrapperProps = item.href ? { href: item.href } : {};
                return (
                  <Wrapper
                    key={item.label}
                    {...wrapperProps}
                    className={`flex items-center gap-4 p-5 rounded-2xl bg-secondary/50 border border-border hover:border-primary/30 transition-all duration-300 ${item.href ? "hover:bg-primary/5 cursor-pointer" : ""}`}
                  >
                    <div className="w-14 h-14 rounded-xl honey-gradient flex items-center justify-center shrink-0">
                      <item.icon className="text-primary-foreground" size={24} />
                    </div>
                    <div>
                      <h4 className="font-display font-semibold text-foreground">{item.label}</h4>
                      <p className={`font-body text-base ${item.href ? "text-primary hover:underline" : "text-muted-foreground"}`}>{item.value}</p>
                    </div>
                  </Wrapper>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
