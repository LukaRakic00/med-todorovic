import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

const AdminGallery = () => {
  const [form, setForm] = useState({ title: "", image_url: "", description: "", sort_order: "0" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: images } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase.from("gallery").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("gallery").insert([{
        title: form.title || null,
        image_url: form.image_url,
        description: form.description || null,
        sort_order: parseInt(form.sort_order) || 0,
      }]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      toast.success("Slika dodata!");
      setForm({ title: "", image_url: "", description: "", sort_order: "0" });
      setDialogOpen(false);
    },
    onError: () => toast.error("Greška pri čuvanju."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      toast.success("Slika obrisana!");
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Galerija</h1>
        <Button onClick={() => setDialogOpen(true)} className="font-body gap-2">
          <Plus size={18} /> Dodaj sliku
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images?.map((img) => (
          <div key={img.id} className="relative group rounded-xl overflow-hidden aspect-square">
            <img src={img.image_url} alt={img.title || ""} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button variant="destructive" size="sm" onClick={() => deleteMutation.mutate(img.id)}>
                <Trash2 size={16} />
              </Button>
            </div>
            {img.title && (
              <div className="absolute bottom-0 left-0 right-0 bg-foreground/70 px-3 py-2">
                <p className="text-cream text-xs font-body">{img.title}</p>
              </div>
            )}
          </div>
        ))}
        {(!images || images.length === 0) && (
          <div className="col-span-full text-center py-20 text-muted-foreground font-body">
            Nema slika u galeriji.
          </div>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Dodaj sliku</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
            <div>
              <Label className="font-body">URL slike</Label>
              <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="https://res.cloudinary.com/..." required />
            </div>
            <div>
              <Label className="font-body">Naslov (opciono)</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <Label className="font-body">Opis (opciono)</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div>
              <Label className="font-body">Redosled</Label>
              <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
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

export default AdminGallery;
