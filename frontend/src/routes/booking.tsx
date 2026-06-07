import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useT } from "@/i18n/useT";
import { BookingForm } from "@/components/BookingForm";
import interior from "@/assets/interior.jpg";

export const Route = createFileRoute("/booking")({
  head: () => ({
    meta: [
      { title: "Prenota la tua analisi — Skin Lab" },
      { name: "description", content: "Prenota 30 minuti con il nostro farmacista dermocosmetico. Analisi cutanea gratuita su prenotazione." },
      { property: "og:title", content: "Skin Lab · Booking" },
      { property: "og:description", content: "Book your dermocosmetic skin analysis at Skin Lab, Chiaia, Naples." },
    ],
  }),
  component: BookingPage,
});

function BookingPage() {
  const t = useT();
  return (
    <section className="relative pt-28 md:pt-36">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:grid-cols-12">
        <div className="md:col-span-5">
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-xs uppercase tracking-[0.32em] text-accent">
            Booking
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 font-display text-5xl leading-[1] text-foreground md:text-6xl"
          >
            {t.book.title}
          </motion.h1>
          <p className="mt-6 max-w-sm text-muted-foreground">{t.book.sub}</p>
          <div className="mt-10 overflow-hidden rounded-3xl">
            <img src={interior} alt="Skin Lab interior" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
        <div className="md:col-span-7">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}
