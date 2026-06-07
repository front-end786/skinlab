import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/i18n/useT";
import { Logo } from "@/components/Logo";
import hero from "@/assets/hero-portrait.jpg";

export function Hero() {
  const t = useT();
  return (
    <section className="relative overflow-hidden pt-28 md:pt-36">
      <div className="grain absolute inset-0 opacity-60" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 md:grid-cols-12 md:pb-32">
        <div className="md:col-span-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <Logo showTagline size="lg" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-xs uppercase tracking-[0.32em] text-accent"
          >
            {t.hero.eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 whitespace-pre-line font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight text-balance text-foreground"
          >
            {t.hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground"
          >
            {t.hero.sub}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Link
              to="/booking"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-background transition hover:bg-accent"
            >
              {t.hero.cta}
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a href="#method" className="text-sm uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground">
              {t.hero.ctaAlt} →
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-6"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <img src={hero} alt="Skin Lab portrait" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <p className="font-display text-2xl text-background">In & Out</p>
                <p className="text-xs uppercase tracking-[0.22em] text-background/80">ANSERIS Method</p>
              </div>
              <div className="rounded-full border border-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-background/90 backdrop-blur">
                Chiaia · Napoli
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="overflow-hidden border-y border-border/60 bg-secondary/40">
        <div className="marquee flex w-max gap-16 whitespace-nowrap py-4 font-display text-2xl text-foreground/70">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex items-center gap-16">
              <span>Skin Analysis</span><span className="text-accent">✦</span>
              <span>Personal Formula</span><span className="text-accent">✦</span>
              <span>In & Out Wellness</span><span className="text-accent">✦</span>
              <span>Magistral Compounding</span><span className="text-accent">✦</span>
              <span>Longevity Skincare</span><span className="text-accent">✦</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
