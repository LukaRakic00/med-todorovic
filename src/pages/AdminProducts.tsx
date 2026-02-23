import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";

interface ProductForm {
  name: string;
  description: string;
  price: string;
  image_url: string;
  sort_order: string;
}

const emptyForm: ProductForm = { name: "", description: "", price: "", image_url: "", sort_order: "0" };

const AdminProducts = () => {
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: products } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("sort_order");
      if (error) throw error;
      return data;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async () => {
      let imageUrl = form.image_url || null;

      if (selectedFile) {
        setUploadingFile(true);
        try {
          imageUrl = await uploadImageToCloudinary(selectedFile);
        } finally {
          setUploadingFile(false);
        }
      }

      const payload = {
        name: form.name,
        description: form.description,
        price: form.price ? parseFloat(form.price) : null,
        image_url: imageUrl,
        sort_order: parseInt(form.sort_order) || 0,
      };

      if (editId) {
        const { error } = await supabase.from("products").update(payload).eq("id", editId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert([payload]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success(editId ? "Proizvod ažuriran!" : "Proizvod dodat!");
      setForm(emptyForm);
      setSelectedFile(null);
      setPreview(null);
      setEditId(null);
      setDialogOpen(false);
    },
    onError: (err: Error) => toast.error(err?.message || "Greška pri čuvanju."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Proizvod obrisan!");
    },
  });

  const openEdit = (product: any) => {
    setForm({
      name: product.name,
      description: product.description || "",
      price: product.price?.toString() || "",
      image_url: product.image_url || "",
      sort_order: product.sort_order?.toString() || "0",
    });
    setSelectedFile(null);
    setPreview(product.image_url || null);
    setEditId(product.id);
    setDialogOpen(true);
  };

  const openNew = () => {
    setForm(emptyForm);
    setSelectedFile(null);
    setPreview(null);
    setEditId(null);
    setDialogOpen(true);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">Proizvodi</h1>
        <Button onClick={openNew} className="font-body gap-2">
          <Plus size={18} /> Dodaj proizvod
        </Button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-body text-sm text-muted-foreground">Slika</th>
              <th className="text-left p-4 font-body text-sm text-muted-foreground">Naziv</th>
              <th className="text-left p-4 font-body text-sm text-muted-foreground">Cena</th>
              <th className="text-left p-4 font-body text-sm text-muted-foreground">Redosled</th>
              <th className="text-right p-4 font-body text-sm text-muted-foreground">Akcije</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr key={product.id} className="border-t border-border">
                <td className="p-4">
                  {product.image_url ? (
                    <img src={product.image_url} alt="" className="w-12 h-12 rounded-lg object-cover" />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center text-xl">🍯</div>
                  )}
                </td>
                <td className="p-4 font-body text-foreground">{product.name}</td>
                <td className="p-4 font-body text-muted-foreground">{product.price} RSD</td>
                <td className="p-4 font-body text-muted-foreground">{product.sort_order}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="sm" onClick={() => openEdit(product)}>
                    <Pencil size={16} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(product.id)} className="text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </td>
              </tr>
            ))}
            {(!products || products.length === 0) && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted-foreground font-body">Nema proizvoda.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">{editId ? "Izmeni proizvod" : "Novi proizvod"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={(e) => { e.preventDefault(); saveMutation.mutate(); }} className="space-y-4">
            <div>
              <Label className="font-body">Naziv</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <Label className="font-body">Opis</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-body">Cena (RSD)</Label>
                <Input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div>
                <Label className="font-body">Redosled</Label>
                <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: e.target.value })} />
              </div>
            </div>
            <div>
              <Label className="font-body">Slika (Cloudinary upload)</Label>
              <div className="mt-2 flex flex-wrap gap-4 items-start">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const f = e.target.files?.[0] ?? null;
                    setSelectedFile(f);
                    if (f) setPreview(URL.createObjectURL(f));
                    else setPreview(null);
                  }}
                  className="text-sm font-body"
                />
                <span className="text-muted-foreground text-sm font-body">ili unesite URL</span>
                <Input
                  value={form.image_url}
                  onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                  placeholder="https://res.cloudinary.com/..."
                  className="flex-1 min-w-[200px]"
                />
              </div>
              {preview && (
                <div className="mt-3">
                  <img src={preview} alt="Pregled" className="w-28 h-28 object-cover rounded-lg border border-border" />
                  {uploadingFile && <p className="text-sm text-muted-foreground mt-1">Otpremanje na Cloudinary...</p>}
                </div>
              )}
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

export default AdminProducts;
