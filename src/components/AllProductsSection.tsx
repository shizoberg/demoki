import { ArrowRight } from "lucide-react";

/**
 * AllProductsSection
 * Beije-inspired bento grid (variable column & row spans for visual rhythm).
 * Category indicator icon (top-right) per card. No category headings.
 */

type CategoryKey = "supplement" | "intim" | "aroma" | "ped";

type Product = {
  name: string;
  price: string;
  bg: string;
  text: string;
  category: CategoryKey;
  // beije-style cell: width × height in 6-col grid
  col: 2 | 3 | 4;
  row: 1 | 2;
};

/* Category icons — pulled from MegaMenu vocabulary (pill, flower, drop, leaf) */
const categoryIcon = (cat: CategoryKey, className: string) => {
  switch (cat) {
    case "supplement":
      // pill
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-25 12 12)" />
          <path d="M12 6l3 6" transform="rotate(-25 12 12)" />
        </svg>
      );
    case "intim":
      // flower
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 9.5V4M12 14.5V20M9.5 12H4M14.5 12H20M9 9l-3-3M15 15l3 3M15 9l3-3M9 15l-3 3" />
        </svg>
      );
    case "aroma":
      // oil drop
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
        </svg>
      );
    case "ped":
      // leaf-pad
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
          <path d="M5 19c4-4 8-6 14-14" />
        </svg>
      );
  }
};

/* Layout matches the reference screenshot:
   Row 1: [PEDLER tall (2x2)] [BALANCE (2x1)] [BAKIM JELLERİ wide (4x1)]
   Row 2:                     [CHANGE (2x1)]  [SPREY (1x1)] [YAĞ (1x1)] [50+ (2x1)]
   Row 3: [Günlük Ped (2x1)]  [Gündüz Pedi (2x1)] [Sens.Care (2x1)] [Flow.Care (2x1)] -> wraps
*/
const products: Product[] = [
  // Row 1
  { name: ".ki Gece Pedi", price: "335 mm · 8 adet", bg: "bg-[hsl(0,68%,55%)]", text: "text-white", category: "ped", col: 2, row: 2 },
  { name: ".ki Balance", price: "Regl döngüsü · saşe", bg: "bg-[hsl(210,55%,60%)]", text: "text-white", category: "supplement", col: 2, row: 1 },
  { name: ".ki Daily.Care", price: "İntim Yıkama Jeli · günlük", bg: "bg-[hsl(15,55%,55%)]", text: "text-white", category: "intim", col: 4, row: 1 },

  // Row 2
  { name: ".ki Change", price: "Menopoz · kapsül", bg: "bg-[hsl(300,35%,50%)]", text: "text-white", category: "supplement", col: 2, row: 1 },
  { name: ".ki İntim Sprey", price: "Durulama gerektirmez", bg: "bg-[hsl(5,45%,45%)]", text: "text-white", category: "intim", col: 1, row: 1 },
  { name: ".ki Cycle Yağı", price: "Aromaterapi · 10 ml", bg: "bg-[hsl(175,55%,42%)]", text: "text-white", category: "aroma", col: 1, row: 1 },
  { name: ".ki 50+.Care", price: "İntim Yıkama Jeli", bg: "bg-[hsl(33,55%,75%)]", text: "text-[hsl(258,57%,26%)]", category: "intim", col: 2, row: 1 },

  // Row 3
  { name: ".ki Günlük Ped", price: "155 mm · 30 adet", bg: "bg-[hsl(170,45%,45%)]", text: "text-white", category: "ped", col: 2, row: 1 },
  { name: ".ki Gündüz Pedi", price: "245 mm · 12 adet", bg: "bg-[hsl(349,55%,55%)]", text: "text-white", category: "ped", col: 2, row: 1 },
  { name: ".ki Sens.Care", price: "İntim Yıkama Jeli · hassas", bg: "bg-[hsl(258,47%,38%)]", text: "text-white", category: "intim", col: 1, row: 1 },
  { name: ".ki Flow.Care", price: "İntim Yıkama Jeli · koruyucu", bg: "bg-[hsl(38,68%,55%)]", text: "text-white", category: "intim", col: 1, row: 1 },
];

const colMap: Record<Product["col"], string> = {
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};
const rowMap: Record<Product["row"], string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
};

const ProductCard = ({ product }: { product: Product }) => (
  <a
    href="#"
    className={`group relative overflow-hidden rounded-2xl ${product.bg} ${product.text} ${colMap[product.col]} ${rowMap[product.row]}
      col-span-2
      p-4 md:p-5
      flex flex-col justify-end
      transition-all duration-500
      hover:scale-[1.015] hover:shadow-xl
      cursor-pointer`}
  >
    {/* Category icon — top-right */}
    <span
      aria-hidden
      className={`absolute top-3 right-3 inline-flex items-center justify-center h-8 w-8 rounded-full
        ${product.text === "text-white" ? "bg-white/20 text-white" : "bg-[hsl(258,57%,26%)]/15 text-[hsl(258,57%,26%)]"}
        backdrop-blur-sm`}
    >
      {categoryIcon(product.category, "w-4 h-4")}
    </span>

    <div className="relative z-10">
      <h3 className="font-display text-base md:text-lg leading-tight">
        {product.name}
      </h3>
      <p className="mt-1 text-[11px] md:text-xs opacity-90 leading-snug">
        {product.price}
      </p>
    </div>

    <span
      aria-hidden
      className={`absolute bottom-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full
        ${product.text === "text-white" ? "bg-white/15" : "bg-[hsl(258,57%,26%)]/10"}
        transition-all duration-300 group-hover:translate-x-0.5`}
    >
      <ArrowRight className="h-3.5 w-3.5" />
    </span>
  </a>
);

const AllProductsSection = () => {
  return (
    <section
      id="tum-urunler"
      className="relative py-12 md:py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--plum-pale)) 60%, hsl(var(--secondary)) 100%)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "hsl(var(--rose-light))" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full opacity-30 blur-3xl"
        style={{ background: "hsl(var(--sage-light))" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-8 md:mb-10 k5-reveal text-center mx-auto">
          <p className="text-xs uppercase tracking-[0.18em] text-primary/70 mb-2">
            Tüm koleksiyon
          </p>
          <h2 className="font-display text-2xl md:text-4xl text-primary leading-[1.1]">
            Günün her anında,{" "}
            <em className="italic text-primary/80">döngünün her gününde.</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[120px] md:auto-rows-[130px] gap-3 md:gap-3.5 k5-reveal">
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;
