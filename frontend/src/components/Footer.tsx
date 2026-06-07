import { Link } from "@tanstack/react-router";
import { useT } from "@/i18n/useT";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo showTagline size="lg" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">{t.footer.group}</p>
          <p className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-accent" /> {t.footer.address}</p>
          <p className="flex items-center gap-2"><Mail className="h-3.5 w-3.5 text-accent" /> hello@skinlab.deanseris.it</p>
          <p className="flex items-center gap-2"><Instagram className="h-3.5 w-3.5 text-accent" /> @skinlab.anseris</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-foreground/60">Menu</p>
          <Link to="/" className="block text-muted-foreground hover:text-foreground">{t.nav.home}</Link>
          <Link to="/booking" className="block text-muted-foreground hover:text-foreground">{t.nav.booking}</Link>
          <Link to="/shop" className="block text-muted-foreground hover:text-foreground">{t.nav.shop}</Link>
          <Link to="/app" className="block text-muted-foreground hover:text-foreground">{t.nav.app}</Link>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {t.footer.group}. {t.footer.rights}
      </div>
    </footer>
  );
}
