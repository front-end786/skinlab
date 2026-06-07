import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, Bell, RefreshCw, MessageCircle, Download } from "lucide-react";
import { useT } from "@/i18n/useT";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Skin Lab App — la tua skincare in tasca" },
      { name: "description", content: "Diagnosi, routine, ordini e follow-up. L'app Skin Lab di Farmacie de Anseris." },
      { property: "og:title", content: "Skin Lab App" },
      { property: "og:description", content: "Personal skincare routine in your pocket." },
    ],
  }),
  component: AppPage,
});

const icons = [Sparkles, Bell, RefreshCw, MessageCircle];

function AppPage() {
  const t = useT();
  return (
    <section className="relative pt-28 md:pt-36">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 pb-24 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-accent">Mobile experience</p>
          <h1 className="mt-4 font-display text-5xl leading-[1] text-foreground md:text-6xl">{t.appPage.title}</h1>
          <p className="mt-6 max-w-md text-muted-foreground">{t.appPage.sub}</p>

          <ul className="mt-10 space-y-4">
            {t.appPage.features.map((f, i) => {
              const Icon = icons[i % icons.length];
              return (
                <motion.li
                  key={f}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="flex items-start gap-4 rounded-2xl border border-border bg-card p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="pt-1.5 text-sm text-foreground">{f}</p>
                </motion.li>
              );
            })}
          </ul>

          <button
            onClick={() => {
              // PWA install handled globally by InstallPWA banner; here we just hint
              alert(t.appPage.install);
            }}
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-background transition hover:bg-accent"
          >
            <Download className="h-4 w-4" />
            {t.appPage.install}
          </button>
        </div>

        {/* Phone mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto"
        >
          <div className="relative h-[640px] w-[320px] rounded-[3rem] border border-border bg-foreground p-3 shadow-2xl">
            <div className="absolute left-1/2 top-3 z-10 h-6 w-32 -translate-x-1/2 rounded-b-2xl bg-foreground" />
            <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[2.4rem] bg-background p-5">
              <div className="flex items-center justify-between pt-6">
                <p className="font-display text-2xl text-foreground">Hi, Giulia</p>
                <span className="h-9 w-9 rounded-full bg-secondary" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Day 12 · Hydration +18%</p>

              <div className="mt-6 rounded-2xl bg-foreground p-5 text-background">
                <p className="text-[10px] uppercase tracking-[0.2em] text-background/60">Today's routine</p>
                <p className="mt-2 font-display text-xl">Niacinamide 10% + Squalane</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span>AM · 08:00</span>
                  <span className="rounded-full bg-accent px-3 py-1 text-accent-foreground">Done</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {["Hydration", "Sebum", "Pores", "Barrier"].map((m, i) => (
                  <div key={m} className="rounded-2xl border border-border p-3">
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{m}</p>
                    <p className="mt-1 font-display text-2xl text-foreground">{[72, 41, 28, 86][i]}<span className="text-xs text-muted-foreground">/100</span></p>
                  </div>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-around rounded-2xl border border-border py-3 text-foreground/70">
                <Sparkles className="h-5 w-5 text-accent" />
                <Bell className="h-5 w-5" />
                <RefreshCw className="h-5 w-5" />
                <MessageCircle className="h-5 w-5" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
