import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector, setLocale, type Locale } from "@/store";
import { LANGUAGES } from "@/i18n/translations";

export function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const locale = useAppSelector((s) => s.ui.locale);
  const dispatch = useAppDispatch();
  const current = LANGUAGES.find((l) => l.code === locale)!;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1.5 text-xs uppercase tracking-[0.18em] text-foreground/80 backdrop-blur transition hover:border-accent/60 hover:text-foreground"
        aria-label="Select language"
      >
        <Globe className="h-3.5 w-3.5" />
        {current.code}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.ul
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="absolute right-0 z-50 mt-2 w-48 overflow-hidden rounded-md border border-border bg-popover shadow-lg"
            >
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    onClick={() => {
                      dispatch(setLocale(l.code as Locale));
                      setOpen(false);
                    }}
                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-popover-foreground transition hover:bg-secondary"
                  >
                    <span className="font-display text-base">{l.native}</span>
                    {l.code === locale && <Check className="h-3.5 w-3.5 text-accent" />}
                  </button>
                </li>
              ))}
            </motion.ul>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
