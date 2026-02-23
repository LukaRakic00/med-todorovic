import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface BlogForm {
  title: string;
  content: string;
  excerpt: string;
  image_url: string;
  is_published: boolean;
}

const emptyForm: BlogForm = { title: "", content: "", excerpt: "", image_url: "", is_published: false };

const AdminBlog = () => {
  const [form, setForm] = useState<BlogForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: posts } = useQuery({
    queryKey: ["admin-blog"],
    queryFn: async () => {
      const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        title: form.title,
        content: form.content,
        excerpt: form.excerpt || null,
        image_url: form.image_url || null,
        is_published: form.is_published,
      };
      if (editId) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase.from("blog_posts").insert([{ ...payload, author_id: user?.id }]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success(editId ? "Post ažuriran!" : "Post kreiran!");
      setForm(emptyForm);
      setEditId(null);
      setDialogOpen(false);
    },
    onError: () => toast.error("Greška."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blog_posts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blog"] });
      toast.success("Post obrisan!");
    },
  });

  const openEdit = (post: any) => {
    setForm({
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || "",
      image_url: post.image_url || "",
      is_published: post.is_published,
    });
    setEditId(post.id);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Blog</h1>
        <Button onClick={() => { setForm(emptyForm); setEditId(null); setDialogOpen(true); }} className="font-body gap-2">
          <Plus size={18} /> Novi post
        </Button>
      </div>

      <div className="space-y-4">
        {posts?.map((post) => (
          <div key={post.id} className="bg-card border border-border rounded-xl p-6 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-display text-lg font-semibold text-foreground">{post.title}</h3>
                <span className={`text-xs px-2 py-1 rounded-full font-body ${post.is_published ? "bg-forest/10 text-forest" : "bg-muted text-muted-foreground"}`}>
                  {post.is_published ? "Objavljen" : "Draft"}
                </span>
              </div>
              <p className="text-muted-foreground text-sm font-body mt-1">
                {format(new Date(post.created_at), "dd.MM.yyyy")}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => openEdit(post)}><Pencil size={16} /></Button>
              <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(post.id)} className="text-destructive"><Trash2 size={16} /></Button>
            </div>
          </div>
        ))}
        {(!posts || posts.length === 0) && (
          <div className="text-center py-20 text-muted-foreground font-body">Nema blog postova.</div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-display">{editId ? "Izmeni post" : "Novi post"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
            <div>
              <Label className="font-body">Naslov</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <Label className="font-body">Kratak opis</Label>
              <Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            </div>
            <div>
              <Label className="font-body">Sadržaj</Label>
              <Textarea rows={10} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} required />
            </div>
            <div>
              <Label className="font-body">URL slike</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.is_published} onCheckedChange={(v) => setForm({ ...form, is_published: v })} />
              <Label className="font-body">Objavljen</Label>
            </div>
            <Button type="submit" className="w-full font-body" disabled={saveMutation.isPending}>
              {saveMutation.isPending ? "Čuvanje..." : "Sačuvaj"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
