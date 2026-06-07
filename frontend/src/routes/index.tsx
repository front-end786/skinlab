import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Method } from "@/components/Method";
import { Diagnostics } from "@/components/Diagnostics";
import { InOut } from "@/components/InOut";
import { Experience } from "@/components/Experience";
import { SocialGallery } from "@/components/SocialGallery";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skin Lab — Farmacie de Anseris · Chiaia, Napoli" },
      { name: "description", content: "Skin Lab: analisi cutanea professionale, formule personali e metodo ANSERIS in & out. L'esperienza dermocosmetica di nuova generazione a Napoli." },
      { property: "og:title", content: "Skin Lab — Farmacie de Anseris" },
      { property: "og:description", content: "Analisi cutanea professionale e dermocosmesi personalizzata a Chiaia, Napoli." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Diagnostics />
      <Method />
      <InOut />
      <Experience />
      <SocialGallery />
      <CTASection />
    </>
  );
}
