import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { LayoutDashboard, Users, Briefcase, Ticket, LogOut } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";
import {
  clearAdminSession,
  fetchAdminDashboard,
  getAdminSession,
  type AdminSession,
} from "@/lib/admin-auth";

export const Route = createFileRoute("/admin/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — SkinLab CRM" }] }),
  beforeLoad: () => {
    if (typeof window !== "undefined" && !getAdminSession()) {
      throw redirect({ to: "/admin" });
    }
  },
  component: AdminDashboardPage,
});

const modules = [
  { label: "Leads", icon: Users, href: "http://localhost:8000/swagger-ui/#/leads" },
  { label: "Contacts", icon: Users, href: "http://localhost:8000/swagger-ui/#/contacts" },
  { label: "Opportunities", icon: Briefcase, href: "http://localhost:8000/swagger-ui/#/opportunity" },
  { label: "Cases", icon: Ticket, href: "http://localhost:8000/swagger-ui/#/cases" },
];

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [session] = useState<AdminSession | null>(() => getAdminSession());
  const [stats, setStats] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!session) return;
    fetchAdminDashboard(session.accessToken)
      .then(setStats)
      .catch((err) => setError(err instanceof Error ? err.message : "Failed to load"));
  }, [session]);

  function logout() {
    clearAdminSession();
    navigate({ to: "/admin" });
  }

  if (!session) return null;

  return (
    <div className="min-h-screen bg-[#f6f2ea] text-[#1a1410]">
      <header className="border-b border-[#1a1410]/10 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Logo />
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#1a1410]/70">{session.user.email}</span>
            <Button variant="outline" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-6 w-6 text-[#C5A076]" />
          <h1 className="font-display text-4xl">CRM Dashboard</h1>
        </div>
        <p className="mt-2 text-sm text-[#1a1410]/70">Manage your SkinLab operations from one place.</p>

        {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((m) => (
            <a
              key={m.label}
              href={m.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl border border-[#1a1410]/10 bg-white p-6 transition hover:border-[#C5A076]"
            >
              <m.icon className="h-5 w-5 text-[#C5A076]" />
              <p className="mt-3 font-medium">{m.label}</p>
              <p className="mt-1 text-xs text-[#1a1410]/60">Open in API / Swagger</p>
            </a>
          ))}
        </div>

        {stats && (
          <div className="mt-8 rounded-2xl border border-[#1a1410]/10 bg-white p-6">
            <h2 className="font-display text-2xl">Overview</h2>
            <pre className="mt-4 overflow-auto rounded-lg bg-[#1a1410]/5 p-4 text-xs">
              {JSON.stringify(stats, null, 2)}
            </pre>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href="http://localhost:8000/admin/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#C5A076] hover:underline"
          >
            Django Admin →
          </a>
          <a
            href="http://localhost:8000/swagger-ui/"
            target="_blank"
            rel="noreferrer"
            className="text-sm text-[#C5A076] hover:underline"
          >
            API Docs →
          </a>
          <Link to="/" className="text-sm text-[#1a1410]/70 hover:underline">
            ← Back to website
          </Link>
        </div>
      </main>
    </div>
  );
}
