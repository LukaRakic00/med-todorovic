import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const GalleryPage = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: images } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const placeholders = Array.from({ length: 6 }, (_, i) => ({
    id: String(i),
    title: `Fotografija ${i + 1}`,
    image_url: "",
    description: "Opis fotografije",
  }));

  const displayImages = images && images.length > 0 ? images : placeholders;

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title="Galerija" subtitle="Pogledajte naš pčelinjak i proizvodnju" />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {displayImages.length > 0 && displayImages[0].image_url ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayImages.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedImage(img.image_url)}
                >
                  <img
                    src={img.image_url}
                    alt={img.title || "Galerija"}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">📸</span>
              <h3 className="font-display text-2xl text-foreground mb-2">Galerija je u pripremi</h3>
              <p className="text-muted-foreground font-body">Fotografije će uskoro biti dostupne.</p>
            </div>
          )}
        </div>
      </section>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 border-0 bg-transparent">
          {selectedImage && (
            <img src={selectedImage} alt="Galerija" className="w-full h-auto rounded-xl" />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default GalleryPage;
