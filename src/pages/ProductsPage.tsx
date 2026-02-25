import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const ProductsPage = () => {
  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const placeholders = [
    { id: "1", name: "Livadski med", description: "Med sa divljih livada, bogat cvetnim aromama. Odličan za svakodnevnu upotrebu.", price: 1200, image_url: null },
    { id: "2", name: "Šumski med", description: "Tamni šumski med sa intenzivnim ukusom. Bogat mineralima i antioksidansima.", price: 1500, image_url: null },
    { id: "3", name: "Bagremov med", description: "Svetli, nežni bagremov med. Idealan za decu i kao zaslađivač.", price: 1300, image_url: null },
    { id: "4", name: "Med od lipe", description: "Aromatičan med sa lipovim cvetom. Poznat po blagotvornom dejstvu.", price: 1400, image_url: null },
    { id: "5", name: "Polen", description: "Prirodni pčelinji polen. Suplement bogat vitaminima i proteinima.", price: 800, image_url: null },
    { id: "6", name: "Propolis", description: "Prirodni propolis tinktura. Jak prirodni antibiotik i imunostimulator.", price: 900, image_url: null },
  ];

  const displayProducts = products && products.length > 0 ? products : placeholders;

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader
        title="Proizvodi od meda"
        subtitle="U našoj ponudi možete pronaći šumski, livadski med i medne mešavine. Medne mešavine pravimo tako što livadskom medu, koji sadrži nektar nekoliko biljaka, dodajemo orašaste plodove, voće, začine i semenke kako bi na prirodan način ojačali vaš imunitet."
      />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="glass-card rounded-xl overflow-hidden group hover:shadow-xl transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-secondary">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full honey-gradient opacity-20 flex items-center justify-center">
                      <span className="text-6xl">🍯</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 font-body">{product.description}</p>
                  {product.price && (
                    <p className="text-primary font-display text-2xl font-bold">{product.price} RSD</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductsPage;
