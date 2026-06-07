import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useT } from "@/i18n/useT";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/button";

type SiteUser = { id: string; email: string; name: string };

export function Header() {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<SiteUser | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : { user: null }))
      .then((d) => setUser(d.user))
      .catch(() => setUser(null));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-30 backdrop-blur-md"
      style={{ backgroundColor: "color-mix(in oklab, var(--ivory) 75%, transparent)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:py-5">
        <Link to="/" className="group" onClick={() => setIsOpen(false)}>
          <Logo size="sm" />
        </Link>
        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] text-foreground/70 md:flex">
          <Link to="/" className="transition hover:text-foreground" activeOptions={{ exact: true }} activeProps={{ className: "text-foreground" }}>
            {t.nav.home}
          </Link>
          <Link to="/booking" className="transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            {t.nav.booking}
          </Link>
          <Link to="/shop" className="transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            {t.nav.shop}
          </Link>
          <Link to="/app" className="transition hover:text-foreground" activeProps={{ className: "text-foreground" }}>
            {t.nav.app}
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <span className="text-xs text-muted-foreground">{user.name}</span>
                <Button variant="outline" size="sm" onClick={logout}>
                  {t.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="border-[#C5A076]/50 bg-transparent text-foreground hover:border-[#C5A076] hover:bg-[#C5A076]/10"
                >
                  <Link to="/login">{t.nav.login}</Link>
                </Button>
                <Button
                  size="sm"
                  asChild
                  className="border border-[#C5A076] bg-[#C5A076] text-[#1a1410] hover:bg-[#E8D4B8]"
                >
                  <Link to="/signup">{t.nav.signup}</Link>
                </Button>
              </>
            )}
          </div>
          <LanguageSwitcher />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/60 text-foreground/80 hover:text-foreground md:hidden backdrop-blur transition hover:border-accent/60 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="gold-divider opacity-60" />

      {/* Mobile Slide-down Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[71px] z-10 bg-black md:hidden"
            />
            {/* Panel */}
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="relative z-20 overflow-hidden bg-background border-b border-border/60 md:hidden"
            >
              <div className="flex flex-col gap-6 px-6 py-8 text-sm uppercase tracking-[0.2em]">
                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                  className="py-1 transition hover:text-accent text-foreground/80"
                  activeOptions={{ exact: true }}
                  activeProps={{ className: "text-accent font-semibold" }}
                >
                  {t.nav.home}
                </Link>
                <Link
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="py-1 transition hover:text-accent text-foreground/80"
                  activeProps={{ className: "text-accent font-semibold" }}
                >
                  {t.nav.booking}
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setIsOpen(false)}
                  className="py-1 transition hover:text-accent text-foreground/80"
                  activeProps={{ className: "text-accent font-semibold" }}
                >
                  {t.nav.shop}
                </Link>
                <Link
                  to="/app"
                  onClick={() => setIsOpen(false)}
                  className="py-1 transition hover:text-accent text-foreground/80"
                  activeProps={{ className: "text-accent font-semibold" }}
                >
                  {t.nav.app}
                </Link>
                <div className="flex flex-col gap-3 border-t border-border/60 pt-4">
                  {user ? (
                    <>
                      <span className="text-xs normal-case tracking-normal text-muted-foreground">{user.email}</span>
                      <button onClick={logout} className="py-1 text-left text-foreground/80 hover:text-accent">
                        {t.nav.logout}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setIsOpen(false)} className="py-1 hover:text-accent">
                        {t.nav.login}
                      </Link>
                      <Link to="/signup" onClick={() => setIsOpen(false)} className="py-1 hover:text-accent">
                        {t.nav.signup}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
