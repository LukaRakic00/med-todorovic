import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHeader from "@/components/PageHeader";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const BlogPage = () => {
  const { data: posts } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageHeader title="Blog" subtitle="Saznajte više o pčelarstvu" />
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-xl overflow-hidden"
                >
                  {post.image_url && (
                    <img src={post.image_url} alt={post.title} className="w-full aspect-video object-cover" />
                  )}
                  <div className="p-6">
                    <time className="text-xs text-muted-foreground font-body">
                      {format(new Date(post.created_at), "dd.MM.yyyy")}
                    </time>
                    <h3 className="font-display text-xl font-semibold text-foreground mt-2 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-body">
                      {post.excerpt || post.content.substring(0, 150) + "..."}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <span className="text-6xl mb-4 block">📝</span>
              <h3 className="font-display text-2xl text-foreground mb-2">Blog je u pripremi</h3>
              <p className="text-muted-foreground font-body">Članci će uskoro biti objavljeni.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default BlogPage;
