import { motion } from "framer-motion";
import { Leaf, FlaskConical } from "lucide-react";

export function InOut() {
  const cols = [
    {
      tag: "Outside",
      icon: FlaskConical,
      title: "Topical protocols",
      items: [
        "Magistral compounding",
        "Active concentrations on prescription",
        "Barrier-first formulation",
        "Seasonal recalibration",
      ],
    },
    {
      tag: "Inside",
      icon: Leaf,
      title: "Nutraceutical support",
      items: [
        "Antioxidant & longevity stack",
        "Collagen and ceramide intake",
        "Microbiome alignment",
        "Sleep & cortisol balance",
      ],
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs uppercase tracking-[0.32em] text-accent">In & Out</p>
        <h2 className="mt-4 font-display text-5xl leading-[1.02] text-foreground md:text-6xl">
          Beauty starts beneath the surface.
        </h2>
        <p className="mt-6 text-muted-foreground">
          Skin reflects what we apply and what we feed it. The ANSERIS method
          treats both — together.
        </p>
      </div>

      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {cols.map((c, i) => (
          <motion.div
            key={c.tag}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-10"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full border border-accent/40 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent">
                {c.tag}
              </span>
              <c.icon className="h-6 w-6 text-foreground/40" />
            </div>
            <h3 className="mt-8 font-display text-3xl text-foreground">{c.title}</h3>
            <ul className="mt-6 space-y-3">
              {c.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-px w-6 bg-accent" />
                  {it}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
