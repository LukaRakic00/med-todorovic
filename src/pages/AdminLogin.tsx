import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import logoIcon from "@/assets/logo-icon.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast.error("Pogrešan email ili lozinka.");
    } else {
      // Check if user has admin role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin");

        if (roles && roles.length > 0) {
          toast.success("Uspešno ste se prijavili!");
          navigate("/admin");
        } else {
          await supabase.auth.signOut();
          toast.error("Nemate administratorske privilegije.");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoIcon} alt="Logo" className="h-16 mx-auto mb-4" />
          <h1 className="font-display text-3xl font-bold text-cream">Admin Panel</h1>
          <p className="text-cream/50 font-body text-sm mt-2">Prijavite se za pristup</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 bg-sidebar-accent p-8 rounded-xl">
          <div>
            <Label htmlFor="email" className="text-cream/80 font-body">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-sidebar border-sidebar-border text-cream"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-cream/80 font-body">Lozinka</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-sidebar border-sidebar-border text-cream"
              required
            />
          </div>
          <Button type="submit" className="w-full font-body" disabled={loading}>
            {loading ? "Prijavljivanje..." : "Prijavi se"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
