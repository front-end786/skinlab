import { motion } from "framer-motion";
import { Instagram } from "lucide-react";
import hero from "@/assets/hero-portrait.jpg";
import skin from "@/assets/skin-analysis.jpg";
import products from "@/assets/products.jpg";
import interior from "@/assets/interior.jpg";

const tiles = [
  { src: hero, tag: "Portrait" },
  { src: skin, tag: "Diagnostics" },
  { src: products, tag: "Formulas" },
  { src: interior, tag: "Boutique" },
  { src: skin, tag: "Behind the scan" },
  { src: products, tag: "Routines" },
];

export function SocialGallery() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-accent">@skinlab.anseris</p>
          <h2 className="mt-4 font-display text-5xl leading-[1] text-foreground md:text-6xl">
            Live from the lab.
          </h2>
        </div>
        <a
          href="https://www.instagram.com/skinlab.anseris"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-5 py-2.5 text-xs uppercase tracking-[0.22em] text-foreground transition hover:border-accent hover:text-accent"
        >
          <Instagram className="h-4 w-4" /> Follow
        </a>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {tiles.map((t, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-2xl"
          >
            <img src={t.src} alt={t.tag} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <figcaption className="absolute bottom-3 left-3 text-[10px] uppercase tracking-[0.22em] text-background opacity-0 transition group-hover:opacity-100">
              {t.tag}
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
