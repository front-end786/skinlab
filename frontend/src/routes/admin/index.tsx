import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginAdmin, saveAdminSession, getAdminSession } from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Admin — SkinLab CRM" }],
  }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && getAdminSession()) {
      throw redirect({ to: "/admin/dashboard" });
    }
  },
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@localhost");
  const [password, setPassword] = useState("admin");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const session = await loginAdmin(email, password);
      saveAdminSession(session);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Admin login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a1410] px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo showTagline size="lg" />
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
          <h1 className="font-display text-3xl text-[#f6f2ea]">CRM Admin</h1>
          <p className="mt-2 text-sm text-[#f6f2ea]/70">
            Staff login for leads, contacts, opportunities and operations.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-[#f6f2ea]">
                Work email
              </Label>
              <Input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-white/20 bg-white/10 text-[#f6f2ea]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-[#f6f2ea]">
                Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-white/20 bg-white/10 text-[#f6f2ea]"
                required
              />
            </div>
            {error && <p className="text-sm text-red-300">{error}</p>}
            <Button type="submit" className="w-full bg-[#C5A076] text-[#1a1410] hover:bg-[#E8D4B8]" disabled={loading}>
              {loading ? "Signing in…" : "Enter CRM"}
            </Button>
          </form>
          <p className="mt-6 text-center text-xs text-[#f6f2ea]/50">
            Docker default: admin@localhost / admin
          </p>
        </div>
      </div>
    </div>
  );
}
