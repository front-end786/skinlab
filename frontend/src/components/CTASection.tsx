import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useT } from "@/i18n/useT";
import { Logo } from "./Logo";

export function CTASection() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden rounded-[2rem] bg-foreground px-8 py-20 text-center md:px-16"
      >
        <div className="grain absolute inset-0 opacity-30" />
        <div className="mx-auto flex justify-center">
          <Logo showTagline size="lg" />
        </div>
        <h2 className="mx-auto mt-5 max-w-3xl font-display text-5xl leading-[1.02] text-background md:text-7xl">
          Read your skin.<br />Rewrite the routine.
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/booking"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium uppercase tracking-[0.18em] text-accent-foreground transition hover:bg-background hover:text-foreground"
          >
            {t.hero.cta}
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link to="/app" className="text-sm uppercase tracking-[0.2em] text-background/70 hover:text-background">
            {t.appPage.install} →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
