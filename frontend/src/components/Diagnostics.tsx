import { motion } from "framer-motion";
import { Droplets, Sparkles, CircleDot, ShieldCheck, Activity, Hourglass } from "lucide-react";

const params = [
  { icon: Droplets, k: "Hydration", v: "72", u: "/100", d: "Stratum corneum water content" },
  { icon: Sparkles, k: "Sebum", v: "41", u: "/100", d: "Surface lipid balance" },
  { icon: CircleDot, k: "Pores", v: "0.28", u: "mm", d: "Average pore diameter" },
  { icon: ShieldCheck, k: "Sensitivity", v: "Low", u: "", d: "Reactivity & redness index" },
  { icon: Activity, k: "Elasticity", v: "86", u: "%", d: "Cutometer recoil score" },
  { icon: Hourglass, k: "Skin Age", v: "−4y", u: "", d: "Bio-age vs. chronological" },
];

export function Diagnostics() {
  return (
    <section className="relative border-y border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.32em] text-accent">Diagnostics</p>
            <h2 className="mt-4 font-display text-5xl leading-[1] text-foreground md:text-6xl">
              Six parameters.<br />One precise map.
            </h2>
            <p className="mt-6 max-w-md text-muted-foreground">
              A 30-minute session with medical-grade devices reveals what the eye
              cannot. Every protocol begins with measurable evidence.
            </p>
          </div>
          <div className="md:col-span-7">
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {params.map((p, i) => (
                <motion.div
                  key={p.k}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="group rounded-2xl border border-border bg-background p-5 transition hover:border-accent/60"
                >
                  <p.icon className="h-5 w-5 text-accent" />
                  <p className="mt-6 font-display text-3xl text-foreground">
                    {p.v}<span className="ml-0.5 text-sm text-muted-foreground">{p.u}</span>
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-foreground/70">{p.k}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
