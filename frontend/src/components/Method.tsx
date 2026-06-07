import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { Logo } from "@/components/Logo";
import skin from "@/assets/skin-analysis.jpg";
import products from "@/assets/products.jpg";

export function Method() {
  const t = useT();
  const services = t.services;
  return (
    <section id="method" className="mx-auto max-w-7xl px-6 py-24 md:py-32">
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo size="sm" className="mb-6" />
          <p className="text-xs uppercase tracking-[0.32em] text-accent">Method</p>
          <h2 className="mt-4 font-display text-5xl leading-[1] text-foreground md:text-6xl">{t.methodTitle}</h2>
          <p className="mt-6 max-w-md text-muted-foreground">{t.methodSub}</p>
        </div>
        <div className="md:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((s, i) => (
              <motion.article
                key={s.t}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:border-accent/60"
              >
                <p className="font-display text-xs uppercase tracking-[0.3em] text-accent">0{i + 1}</p>
                <h3 className="mt-3 font-display text-2xl text-foreground">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                <div className="absolute inset-x-0 bottom-0 h-px scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100" />
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 grid gap-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="group relative aspect-[4/3] overflow-hidden rounded-3xl"
        >
          <img src={skin} alt="Analysis" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          <p className="absolute bottom-6 left-6 font-display text-3xl text-background">Diagnostic precision</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="group relative aspect-[4/3] overflow-hidden rounded-3xl"
        >
          <img src={products} alt="Products" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          <p className="absolute bottom-6 left-6 font-display text-3xl text-background">Formulas, made personal</p>
        </motion.div>
      </div>
    </section>
  );
}
