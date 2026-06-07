import { motion } from "framer-motion";
import interior from "@/assets/interior.jpg";
import { Logo } from "@/components/Logo";

const steps = [
  { n: "01", t: "Welcome ritual", d: "Espresso, water with adaptogens, a private seat." },
  { n: "02", t: "Skin scan", d: "Medical-grade devices map your baseline." },
  { n: "03", t: "Reading", d: "A pharmacist walks you through the data, on screen." },
  { n: "04", t: "Protocol", d: "Topical formula + inside support — printed and digital." },
  { n: "05", t: "Follow-up", d: "Re-measure in 6 weeks. Track real change." },
];

export function Experience() {
  return (
    <section className="relative overflow-hidden border-y border-border/60">
      <div className="absolute inset-0 -z-10">
        <img src={interior} alt="" className="h-full w-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo size="sm" className="mb-6" />
            <p className="text-xs uppercase tracking-[0.32em] text-accent">The Experience</p>
            <h2 className="mt-4 font-display text-5xl leading-[1] text-foreground md:text-6xl">
              A boutique, not a counter.
            </h2>
            <p className="mt-6 text-muted-foreground">
              Soft light, calm materials, no rush. Skin Lab feels like a private
              studio — and behaves like a clinic.
            </p>
          </div>

          <div className="md:col-span-8">
            <ol className="relative space-y-10 border-l border-border pl-8">
              {steps.map((s, i) => (
                <motion.li
                  key={s.n}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="relative"
                >
                  <span className="absolute -left-[37px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-background ring-1 ring-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <p className="font-display text-xs tracking-[0.3em] text-accent">{s.n}</p>
                  <p className="mt-1 font-display text-2xl text-foreground">{s.t}</p>
                  <p className="mt-2 max-w-md text-sm text-muted-foreground">{s.d}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
