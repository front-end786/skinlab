import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useT } from "@/i18n/useT";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(6),
  service: z.string().min(2),
  date: z.string().min(1),
  time: z.string().min(1),
  notes: z.string().optional(),
});

type FormVals = z.infer<typeof schema>;

export function BookingForm() {
  const t = useT();
  const [done, setDone] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormVals>({
    resolver: zodResolver(schema),
    defaultValues: { service: t.services[0].t },
  });

  const onSubmit = async (_v: FormVals) => {
    await new Promise((r) => setTimeout(r, 900));
    setDone(true);
  };

  const field = "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition";
  const label = "block text-xs uppercase tracking-[0.2em] text-foreground/70 mb-2";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {done ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-accent/40 bg-card p-12 text-center"
          >
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-foreground">
              <Check className="h-6 w-6" />
            </div>
            <p className="mt-6 font-display text-3xl text-foreground">{t.book.success}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-5 rounded-3xl border border-border bg-card p-6 md:p-10"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className={label}>{t.book.name}</label>
                <input className={field} {...register("name")} />
                {errors.name && <p className="mt-1 text-xs text-destructive">Required</p>}
              </div>
              <div>
                <label className={label}>{t.book.email}</label>
                <input type="email" className={field} {...register("email")} />
                {errors.email && <p className="mt-1 text-xs text-destructive">Invalid</p>}
              </div>
              <div>
                <label className={label}>{t.book.phone}</label>
                <input className={field} {...register("phone")} />
              </div>
              <div>
                <label className={label}>{t.book.service}</label>
                <select className={field} {...register("service")}>
                  {t.services.map((s) => <option key={s.t}>{s.t}</option>)}
                </select>
              </div>
              <div>
                <label className={label}>{t.book.date}</label>
                <input type="date" className={field} {...register("date")} />
              </div>
              <div>
                <label className={label}>{t.book.time}</label>
                <input type="time" className={field} {...register("time")} />
              </div>
            </div>
            <div>
              <label className={label}>{t.book.notes}</label>
              <textarea rows={3} className={field} {...register("notes")} />
            </div>
            <button
              disabled={isSubmitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-8 py-4 text-sm font-medium uppercase tracking-[0.18em] text-background transition hover:bg-accent disabled:opacity-60"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {t.book.submit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
