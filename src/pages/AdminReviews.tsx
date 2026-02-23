import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Check, Trash2, Star } from "lucide-react";
import { format } from "date-fns";

const AdminReviews = () => {
  const queryClient = useQueryClient();

  const { data: reviews } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").update({ is_approved: true }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Recenzija odobrena!");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("reviews").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      toast.success("Recenzija obrisana!");
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8 flex items-center gap-2">
        <Star size={32} className="text-primary" />
        Recenzije
      </h1>

      <div className="space-y-4">
        {reviews?.map((review) => (
          <div
            key={review.id}
            className={`bg-card border rounded-xl p-6 ${review.is_approved ? "border-primary/30" : "border-border"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display font-semibold text-foreground">{review.name}</span>
                  <span className="text-muted-foreground font-body">—</span>
                  <span className="text-muted-foreground font-body">{review.location}</span>
                  {review.is_approved && (
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-body">Odobreno</span>
                  )}
                </div>
                <p className="text-muted-foreground font-body text-sm mb-2">{review.message}</p>
                <time className="text-xs text-muted-foreground/60">{format(new Date(review.created_at), "dd.MM.yyyy HH:mm")}</time>
              </div>
              <div className="flex gap-2 shrink-0">
                {!review.is_approved && (
                  <Button variant="ghost" size="sm" onClick={() => approveMutation.mutate(review.id)} className="text-green-600">
                    <Check size={18} />
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(review.id)} className="text-destructive">
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          </div>
        ))}
        {(!reviews || reviews.length === 0) && (
          <div className="text-center py-20 text-muted-foreground font-body">Nema recenzija.</div>
        )}
      </div>
    </div>
  );
};

export default AdminReviews;
