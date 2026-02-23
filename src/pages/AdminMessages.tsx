import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { format } from "date-fns";

const AdminMessages = () => {
  const queryClient = useQueryClient();

  const { data: messages } = useQuery({
    queryKey: ["admin-messages"],
    queryFn: async () => {
      const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const markRead = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("contact_messages").update({ is_read: true }).eq("id", id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-messages"] }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("contact_messages").delete().eq("id", id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-messages"] });
      toast.success("Poruka obrisana!");
    },
  });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-foreground mb-8">Poruke</h1>

      <div className="space-y-4">
        {messages?.map((msg) => (
          <div
            key={msg.id}
            className={`bg-card border rounded-xl p-6 ${msg.is_read ? "border-border" : "border-primary/40"}`}
            onClick={() => !msg.is_read && markRead.mutate(msg.id)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {msg.is_read ? (
                  <MailOpen size={20} className="text-muted-foreground mt-1" />
                ) : (
                  <Mail size={20} className="text-primary mt-1" />
                )}
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-body font-semibold text-foreground">{msg.name}</h3>
                    <span className="text-xs text-muted-foreground font-body">{msg.email}</span>
                    {msg.phone && <span className="text-xs text-muted-foreground font-body">{msg.phone}</span>}
                  </div>
                  <p className="text-muted-foreground font-body text-sm mt-2">{msg.message}</p>
                  <time className="text-xs text-muted-foreground/60 font-body mt-2 block">
                    {format(new Date(msg.created_at), "dd.MM.yyyy HH:mm")}
                  </time>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(msg.id); }} className="text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        ))}
        {(!messages || messages.length === 0) && (
          <div className="text-center py-20 text-muted-foreground font-body">Nema poruka.</div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
