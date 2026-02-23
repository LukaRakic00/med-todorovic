import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Package, Image, FileText, MessageSquare } from "lucide-react";

const AdminDashboard = () => {
  const { data: productCount } = useQuery({
    queryKey: ["admin-product-count"],
    queryFn: async () => {
      const { count } = await supabase.from("products").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: galleryCount } = useQuery({
    queryKey: ["admin-gallery-count"],
    queryFn: async () => {
      const { count } = await supabase.from("gallery").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: blogCount } = useQuery({
    queryKey: ["admin-blog-count"],
    queryFn: async () => {
      const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const { data: messageCount } = useQuery({
    queryKey: ["admin-message-count"],
    queryFn: async () => {
      const { count } = await supabase.from("contact_messages").select("*", { count: "exact", head: true });
      return count || 0;
    },
  });

  const stats = [
    { label: "Proizvodi", value: productCount, icon: Package, color: "text-primary" },
    { label: "Galerija", value: galleryCount, icon: Image, color: "text-forest" },
    { label: "Blog postovi", value: blogCount, icon: FileText, color: "text-accent" },
    { label: "Poruke", value: messageCount, icon: MessageSquare, color: "text-honey-dark" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <stat.icon className={stat.color} size={24} />
              <span className="text-muted-foreground font-body text-sm">{stat.label}</span>
            </div>
            <p className="font-display text-4xl font-bold text-foreground">{stat.value ?? 0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
