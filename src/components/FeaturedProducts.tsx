import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const FeaturedProducts = () => {
  const { data: products } = useQuery({
    queryKey: ["products-featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order")
        .limit(3);
      if (error) throw error;
      return data;
    },
  });

  const placeholderProducts = [
    { id: "1", name: "Livadski med", description: "Čist med sa netaknutih livada", price: 1200, image_url: null },
    { id: "2", name: "Šumski med", description: "Tamni šumski med bogatog ukusa", price: 1500, image_url: null },
    { id: "3", name: "Bagremov med", description: "Svetli bagremov med nežnog ukusa", price: 1300, image_url: null },
  ];

  const displayProducts = products && products.length > 0 ? products : placeholderProducts;

  return (
    <section className="py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-primary font-body text-sm uppercase tracking-[0.2em]">
            Naša ponuda
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            Naši proizvodi
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="glass-card rounded-xl overflow-hidden group hover:shadow-xl transition-shadow"
            >
              <div className="aspect-[4/3] overflow-hidden bg-secondary">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full honey-gradient opacity-30 flex items-center justify-center">
                    <span className="text-6xl">🍯</span>
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 font-body">
                  {product.description}
                </p>
                {product.price && (
                  <p className="text-primary font-display text-2xl font-bold">
                    {product.price} RSD
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="font-body">
            <Link to="/proizvodi">Pogledaj sve proizvode</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
