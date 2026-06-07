import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useT } from "@/i18n/useT";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Cpu, Shield, Zap, Plus, Minus, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { useAppSelector } from "@/store";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Skin Lab Shop — Farmacie de Anseris" },
      { name: "description", content: "Scegli i trattamenti ad alta precisione Skin Lab. Formule dermocosmetiche personalizzate create con le migliori tecnologie." },
      { property: "og:title", content: "Skin Lab Shop" },
      { property: "og:description", content: "Treat your skin using our advanced formulas and technology." },
    ],
  }),
  component: ShopPage,
});

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: Record<string, string>;
  imageClass: string;
  benefits: string[];
}

const productsList: Product[] = [
  {
    id: "h-serum",
    name: "Hyaluronic Acid 2% + B5",
    category: "Hydration",
    price: 34.00,
    description: {
      en: "Ultra-pure hydration serum to replenish deep dermal moisture layers and plump skin.",
      it: "Siero idratante ultra-puro per rimpolpare gli strati dermici profondi e donare turgore.",
      sc: "Sieru idratanti ultra-puru pi rimpupari l'acqua dintra a peddi e dà turguri.",
      nap: "Siero idratante ultra-puro pe rimchiri 'e strate d'acqua d''a pelle e dà turgore.",
      vec: "Siero idratante ultra-puro par rimpolpar i strati de acua de la pèle.",
    },
    imageClass: "from-blue-500/20 to-cyan-500/5 border-blue-500/25 text-blue-500",
    benefits: ["Plumps fine lines", "Restores hydration barrier", "Non-greasy feel"],
  },
  {
    id: "n-zinc",
    name: "Niacinamide 10% + Zinc 1%",
    category: "Sebum Control",
    price: 29.00,
    description: {
      en: "High-strength vitamin and mineral formula to target blemishes, visible pores, and sebum.",
      it: "Formula vitaminica e minerale ad alta concentrazione per imperfezioni, pori dilatati e sebo.",
      sc: "Formula cu vitamina e minerali pi combatteri i difetti, pori aperti e u grassu.",
      nap: "Formula cu vitamine e minerale ad ata cuncintrazione pe n'imperfezzione, pure e sebo.",
      vec: "Formula vitaminica e mineral a granda concentrassion par le imperfession, pori e sebo.",
    },
    imageClass: "from-emerald-500/20 to-teal-500/5 border-emerald-500/25 text-emerald-500",
    benefits: ["Regulates sebum", "Minimizes enlarged pores", "Evens skin tone"],
  },
  {
    id: "r-squalane",
    name: "Retinol 0.5% in Squalane",
    category: "Anti-Aging",
    price: 42.00,
    description: {
      en: "Advanced cellular renewal serum that targets signs of aging, fine lines, and sun damage.",
      it: "Siero avanzato per il rinnovamento cellulare che combatte i segni del tempo e rughe sottili.",
      sc: "Sieru avanzatu pi rinnuvamenti d''e celluli, contra a vicchiania e i rughe.",
      nap: "Siero avanzato p''o rinnovamento d''e cellule, contra 'o tempo e 'e rughe suttile.",
      vec: "Siero vansà par el rinovamento de le celule che combate rughe e sogni de el tenpo.",
    },
    imageClass: "from-amber-500/20 to-orange-500/5 border-amber-500/25 text-amber-500",
    benefits: ["Reduces fine wrinkles", "Boosts cell turnover", "Improves skin elasticity"],
  },
  {
    id: "c-cream",
    name: "Ceramide Barrier Defense Cream",
    category: "Skin Repair",
    price: 38.00,
    description: {
      en: "Deeply nourishing cream to reconstruct the skin's lipid barrier and prevent water loss.",
      it: "Crema profondamente nutriente per ricostruire la barriera lipidica e prevenire la disidratazione.",
      sc: "Crema ca nutrisci a peddi pi ricustruiri a barriera e non fari asciugari a peddi.",
      nap: "Crema ca nutrisce 'a pelle dinto pe recustruì 'a barriera lipidica e prevenì 'a disidratazione.",
      vec: "Crema nutrente par ricostruir la bariera de grasso e tegnere la pèle idratà.",
    },
    imageClass: "from-purple-500/20 to-indigo-500/5 border-purple-500/25 text-purple-500",
    benefits: ["Locks in moisture", "Soothes redness & irritation", "Restores lipid barrier"],
  },
  {
    id: "v-booster",
    name: "Vitamin C 15% Glow Booster",
    category: "Radiance",
    price: 45.00,
    description: {
      en: "Powerful antioxidant elixir designed to brighten the complexion and reverse dullness.",
      it: "Elisir antiossidante concentrato per illuminare l'incarnato e combattere il colorito spento.",
      sc: "Elisir antiussidanti pi fari fari a peddi cchiù luminosa e levari u culuri scuru.",
      nap: "Elisir antiossidante concentrato pe dà luce a ll'incarnato e cumbattere 'o culore spiento.",
      vec: "Elixir antiossidante par far la pèle luminosa e conbatar el colorito spento.",
    },
    imageClass: "from-rose-500/20 to-pink-500/5 border-rose-500/25 text-rose-500",
    benefits: ["Brightens dull skin", "Neutralizes free radicals", "Promotes collagen production"],
  },
  {
    id: "s-cleanser",
    name: "Salicylic Acid 2% Cleanser",
    category: "Cleansing",
    price: 26.00,
    description: {
      en: "Gentle exfoliating foam cleanser that unclogs pores, targets blemishes, and smooths skin.",
      it: "Detergente schiumogeno esfoliante delicato per liberare i pori e levigare la pelle.",
      sc: "Detergenti ca fa scuma e pulisci i pori, pi fari a peddi liscia liscia.",
      nap: "Detergente schiumogeno esfoliante delicato pe sbloccare 'e pure e fà 'a pelle liscia.",
      vec: "Detergente schiumogeno esfoliante dełicato par łiberar i pori e far la pèle łisa.",
    },
    imageClass: "from-violet-500/20 to-fuchsia-500/5 border-violet-500/25 text-violet-500",
    benefits: ["Deeply clears pores", "Controls shine & oiliness", "Smoothes skin surface"],
  },
];

function ShopPage() {
  const t = useT();
  const locale = useAppSelector((s) => s.ui.locale);

  // Shop state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isCustomMode, setIsCustomMode] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>("6");
  const [purchaseState, setPurchaseState] = useState<"idle" | "loading" | "success">("idle");

  const openDrawer = (product: Product) => {
    setSelectedProduct(product);
    setQuantity(1);
    setIsCustomMode(false);
    setPurchaseState("idle");
  };

  const handleQuickQuantity = (qty: number) => {
    setQuantity(qty);
    setIsCustomMode(false);
  };

  const handleCustomMode = () => {
    setIsCustomMode(true);
    const parsed = parseInt(customInput) || 6;
    setQuantity(parsed);
  };

  const handleCustomInput = (val: string) => {
    setCustomInput(val);
    const parsed = parseInt(val);
    if (!isNaN(parsed) && parsed > 0) {
      setQuantity(parsed);
    }
  };

  const incrementQty = () => {
    const next = quantity + 1;
    setQuantity(next);
    if (isCustomMode) {
      setCustomInput(next.toString());
    }
  };

  const decrementQty = () => {
    if (quantity > 1) {
      const next = quantity - 1;
      setQuantity(next);
      if (isCustomMode) {
        setCustomInput(next.toString());
      }
    }
  };

  const handleConfirmPurchase = () => {
    if (!selectedProduct) return;
    
    setPurchaseState("loading");
    
    setTimeout(() => {
      setPurchaseState("success");
      toast.success(t.shopPage.purchaseSuccess, {
        description: `${quantity}x ${selectedProduct.name} - Totale: €${(quantity * selectedProduct.price).toFixed(2)}`,
        duration: 5000,
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      {/* Slogan Banner section: "we treat your skin using technology" */}
      <section className="relative overflow-hidden bg-foreground text-background py-16 px-6 mb-16 grain">
        <div className="absolute inset-0 bg-gradient-to-r from-accent/15 via-transparent to-accent/15 opacity-40" />
        <div className="relative mx-auto max-w-7xl flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 rounded-full border border-background/20 bg-background/5 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-accent mb-6"
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>Biotech Laboratory</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl leading-tight md:text-6xl max-w-4xl tracking-tight text-balance text-background"
          >
            {t.shopPage.tagline}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-sm md:text-base text-background/60 max-w-xl uppercase tracking-[0.15em]"
          >
            L'unione di diagnostica avanzata e formulazioni molecolari attive.
          </motion.p>

          {/* Technology breakdown cards inside banner */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
            {[
              { icon: Cpu, t: "Spectral Analysis", d: "Analisi multispettrale a 5 livelli dello strato cutaneo." },
              { icon: Shield, t: "Molecular Protection", d: "Barriera attiva contro lo stress ossidativo ambientale." },
              { icon: Zap, t: "Fast Recovery", d: "Rigenerazione cellulare accelerata tramite micro-assorbimento." }
            ].map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <motion.div
                  key={tech.t}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                  className="rounded-2xl border border-background/10 bg-background/5 p-5 text-left backdrop-blur-sm"
                >
                  <Icon className="h-6 w-6 text-accent mb-3" />
                  <h4 className="font-display text-lg text-background tracking-wide">{tech.t}</h4>
                  <p className="mt-1 text-xs text-background/50 leading-relaxed">{tech.d}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Shop Area */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.32em] text-accent">Dermocosmetica Attiva</p>
          <h1 className="mt-4 font-display text-5xl tracking-tight text-foreground md:text-6xl">
            {t.shopPage.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm md:text-base text-muted-foreground leading-relaxed">
            {t.shopPage.sub}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {productsList.map((product, index) => {
            const descriptionText = product.description[locale] || product.description["en"];
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                onClick={() => openDrawer(product)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-md cursor-pointer"
              >
                <div>
                  {/* Category & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold">
                      {product.category}
                    </span>
                    <span className="font-display text-lg text-foreground/80">
                      €{product.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Elegant bottle visualization using gradient spheres */}
                  <div className="relative my-6 flex h-48 items-center justify-center rounded-2xl bg-muted/40 overflow-hidden">
                    <div className={`absolute h-32 w-32 rounded-full bg-gradient-to-br ${product.imageClass} blur-xl opacity-60 group-hover:scale-125 transition-transform duration-500`} />
                    <div className="relative flex flex-col items-center justify-center p-4 text-center">
                      <ShoppingBag className="h-10 w-10 text-foreground/20 group-hover:text-accent group-hover:scale-110 transition-all duration-500" />
                      <span className="mt-3 font-display text-xs tracking-widest uppercase text-foreground/40 group-hover:text-foreground/60 transition-colors">
                        Skin Lab Formulation
                      </span>
                    </div>
                  </div>

                  {/* Product Title */}
                  <h3 className="font-display text-2xl text-foreground group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                    {descriptionText}
                  </p>

                  {/* Benefits */}
                  <ul className="mt-4 space-y-1.5">
                    {product.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-[10px] text-foreground/70">
                        <span className="h-1 w-1 rounded-full bg-accent" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Buy Button */}
                <div className="mt-6 pt-4 border-t border-border/40">
                  <button className="flex w-full items-center justify-center gap-2 rounded-full border border-foreground/80 bg-transparent py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
                    <ShoppingBag className="h-3.5 w-3.5" />
                    {t.shopPage.buyNow}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Product Selection Drawer */}
      <Drawer open={selectedProduct !== null} onOpenChange={(open) => { if (!open) setSelectedProduct(null); }}>
        <DrawerContent className="max-w-xl mx-auto border-border">
          {selectedProduct && (
            <div className="mx-auto w-full max-w-md px-6 py-6">
              
              {purchaseState === "idle" && (
                <>
                  <DrawerHeader className="px-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                        {selectedProduct.category}
                      </span>
                      <span className="font-display text-2xl text-foreground">
                        €{selectedProduct.price.toFixed(2)}
                      </span>
                    </div>
                    <DrawerTitle className="font-display text-3xl text-left text-foreground">
                      {selectedProduct.name}
                    </DrawerTitle>
                    <DrawerDescription className="text-left mt-2 text-sm leading-relaxed text-muted-foreground">
                      {selectedProduct.description[locale] || selectedProduct.description["en"]}
                    </DrawerDescription>
                  </DrawerHeader>

                  {/* Quantity Selection Area */}
                  <div className="my-6 border-t border-b border-border/60 py-6">
                    <p className="text-xs uppercase tracking-[0.18em] text-foreground/80 font-medium mb-3">
                      {t.shopPage.selectQty}
                    </p>

                    {/* Quick Selection Buttons 1-5 */}
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          key={num}
                          onClick={() => handleQuickQuantity(num)}
                          className={`h-10 w-10 rounded-xl border text-sm font-semibold transition-all ${
                            quantity === num && !isCustomMode
                              ? "bg-foreground text-background border-foreground shadow-sm"
                              : "bg-transparent text-foreground border-border hover:border-accent"
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                      
                      <button
                        onClick={handleCustomMode}
                        className={`px-4 h-10 rounded-xl border text-xs font-semibold uppercase tracking-wider transition-all ${
                          isCustomMode
                            ? "bg-foreground text-background border-foreground shadow-sm"
                            : "bg-transparent text-foreground border-border hover:border-accent"
                        }`}
                      >
                        {t.shopPage.customQty}
                      </button>
                    </div>

                    {/* Custom quantity input panel */}
                    <AnimatePresence>
                      {isCustomMode && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 flex items-center gap-3"
                        >
                          <div className="flex items-center rounded-xl border border-border bg-muted/35 px-1 py-1">
                            <button
                              onClick={decrementQty}
                              disabled={quantity <= 1}
                              className="h-8 w-8 rounded-lg bg-transparent text-foreground flex items-center justify-center hover:bg-border/40 disabled:opacity-40 transition"
                            >
                              <Minus className="h-3.5 w-3.5" />
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={customInput}
                              onChange={(e) => handleCustomInput(e.target.value)}
                              className="w-14 text-center bg-transparent border-none outline-none font-semibold text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                            <button
                              onClick={incrementQty}
                              className="h-8 w-8 rounded-lg bg-transparent text-foreground flex items-center justify-center hover:bg-border/40 transition"
                            >
                              <Plus className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Inserisci quantità personalizzata
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Calculations */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-medium text-muted-foreground">{t.shopPage.quantity}</span>
                    <span className="text-sm font-semibold text-foreground bg-secondary px-3 py-1 rounded-full">
                      {quantity}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-border/40 pt-4 mb-6">
                    <span className="font-display text-xl text-foreground font-semibold">{t.shopPage.total}</span>
                    <span className="font-display text-2xl text-accent font-bold">
                      €{(quantity * selectedProduct.price).toFixed(2)}
                    </span>
                  </div>

                  <DrawerFooter className="px-0 pt-0 gap-3">
                    <Button
                      onClick={handleConfirmPurchase}
                      className="w-full rounded-full bg-foreground text-background py-6 text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent hover:text-background transition-all duration-300"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      {t.shopPage.confirmPurchase}
                    </Button>
                    <DrawerClose asChild>
                      <Button variant="outline" className="w-full rounded-full py-6 text-xs uppercase tracking-[0.2em]">
                        Cancel
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </>
              )}

              {purchaseState === "loading" && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <Loader2 className="h-12 w-12 text-accent animate-spin mb-4" />
                  <p className="font-display text-xl text-foreground">Configuring Biotech Treatment...</p>
                  <p className="mt-2 text-xs text-muted-foreground uppercase tracking-widest">Securing molecular compound formula</p>
                </div>
              )}

              {purchaseState === "success" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center mb-6">
                    <Check className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display text-3xl text-foreground">
                    Purchase Confirmed
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                    {t.shopPage.purchaseSuccess}
                  </p>
                  
                  <div className="mt-6 w-full rounded-2xl bg-secondary/40 border border-border p-4 text-left">
                    <p className="text-[10px] uppercase tracking-widest text-accent font-semibold mb-2">Order details</p>
                    <p className="text-sm font-semibold text-foreground">{selectedProduct.name}</p>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Quantità: {quantity}</span>
                      <span>Totale: €{(quantity * selectedProduct.price).toFixed(2)}</span>
                    </div>
                  </div>

                  <DrawerClose asChild>
                    <Button className="mt-8 w-full rounded-full bg-foreground text-background py-5 text-xs uppercase tracking-[0.2em] font-semibold hover:bg-accent">
                      Close Window
                    </Button>
                  </DrawerClose>
                </motion.div>
              )}

            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
