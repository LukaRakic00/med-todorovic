import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Quote, MessageSquare } from "lucide-react";

const ReviewsSection = () => {
  const [form, setForm] = useState({ name: "", location: "", message: "" });
  const [loading, setLoading] = useState(false);

  const { data: reviews } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim() || !form.message.trim()) {
      toast.error("Popunite sva polja.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("reviews").insert([{
      name: form.name.trim(),
      location: form.location.trim(),
      message: form.message.trim(),
    }]);
    setLoading(false);

    if (error) {
      toast.error("Greška pri slanju. Pokušajte ponovo.");
    } else {
      toast.success("Hvala! Vaša recenzija će biti prikazana nakon odobrenja.");
      setForm({ name: "", location: "", message: "" });
    }
  };

  const placeholderReviews = [
    { id: "p1", name: "Raša Robija", location: "Kriva Reka", message: "Magični med Todorović mi je pomogao da prebrodim teške dane. Preporučujem svima!" },
    { id: "p2", name: "Milena Selaković", location: "Užice", message: "Volim da jedem med nekoliko puta dnevno. Veoma mi znači što i vikendom mogu da poručim." },
    { id: "p3", name: "Vladimir Aleksić", location: "Užice", message: "Uvek mi je drago da pomognem lokalnim proizvođačima. Volim raznovrsnost ukusa koja se nudi." },
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : placeholderReviews;

  return (
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-body text-sm uppercase tracking-[0.3em]">
            Vaše mišljenje nam je važno
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2 mb-4">
            Stalo nam je do vašeg mišljenja
          </h2>
          <p className="font-display text-2xl text-primary font-semibold">
            Šta kažu naši potrošači
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <div className="space-y-8">
            {displayReviews.map((review, i) => (
              <div
                key={review.id || i}
                className="bg-card border border-border rounded-2xl p-6 shadow-lg"
              >
                <Quote size={32} className="text-primary/40 mb-4" />
                <p className="text-foreground font-body text-lg leading-relaxed italic mb-4">
                  {review.message}
                </p>
                <div className="flex items-center gap-2">
                  <span className="font-display font-semibold text-foreground">{review.name}</span>
                  <span className="text-muted-foreground font-body">—</span>
                  <span className="text-muted-foreground font-body">{review.location}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare size={28} className="text-primary" />
              <h3 className="font-display text-2xl font-bold text-foreground">
                Ostavite recenziju
              </h3>
            </div>
            <p className="text-muted-foreground font-body mb-6">
              Podelite vaše iskustvo sa našim proizvodima. Vaša recenzija će biti prikazana nakon odobrenja.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="font-body">Ime i prezime</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="mt-2 h-12" placeholder="npr. Milena Petrović" />
              </div>
              <div>
                <Label className="font-body">Mesto ili grad</Label>
                <Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required className="mt-2 h-12" placeholder="npr. Užice" />
              </div>
              <div>
                <Label className="font-body">Vaša recenzija</Label>
                <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required rows={5} className="mt-2 resize-none" placeholder="Vaše iskustvo sa našim medom..." />
              </div>
              <Button type="submit" size="lg" className="w-full font-body h-12" disabled={loading}>
                {loading ? "Slanje..." : "Pošalji recenziju"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
