import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, X } from "lucide-react";
import { useT } from "@/i18n/useT";

interface BIPEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPWA() {
  const t = useT();
  const [evt, setEvt] = useState<BIPEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900);
    check();
    window.addEventListener("resize", check);
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setEvt(e as BIPEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("beforeinstallprompt", onPrompt);
    };
  }, []);

  const install = async () => {
    if (evt) {
      await evt.prompt();
      await evt.userChoice;
      setEvt(null);
    } else {
      alert(t.appPage.install);
    }
  };

  if (!isMobile || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 26 }}
        className="fixed inset-x-4 bottom-4 z-40 flex items-center gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-2xl backdrop-blur md:hidden"
      >
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent text-accent-foreground">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="font-display text-base leading-tight text-foreground">{t.appPage.title}</p>
          <p className="text-xs text-muted-foreground">{t.appPage.sub}</p>
        </div>
        <button
          onClick={install}
          className="rounded-full bg-foreground px-4 py-2 text-xs font-medium uppercase tracking-wider text-background transition active:scale-95"
        >
          {t.appPage.install}
        </button>
        <button onClick={() => setDismissed(true)} className="text-muted-foreground hover:text-foreground" aria-label="Dismiss">
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
