import { ArrowRight } from "lucide-react";

/**
 * AllProductsSection
 * Compact bento-grid product showcase — entire .ki range at a glance,
 * organized by category. Placeholder colored cards (real product photography
 * to be added later).
 */

type Product = {
  name: string;
  price: string;
  bg: string;
  text: string;
  size: "sm" | "md" | "lg" | "xl";
};

type Category = {
  title: string;
  products: Product[];
};

const categories: Category[] = [
  {
    title: "Modern Takviye Edici Gıdalar",
    products: [
      {
        name: ".ki Balance",
        price: "₺440'dan başlayan fiyatlarla",
        bg: "bg-[hsl(258,57%,26%)]",
        text: "text-white",
        size: "lg",
      },
      {
        name: ".ki Change",
        price: "₺600'den başlayan fiyatlarla",
        bg: "bg-[hsl(349,42%,48%)]",
        text: "text-white",
        size: "lg",
      },
    ],
  },
  {
    title: "İntim Bakım Serisi",
    products: [
      {
        name: ".ki Daily.Care",
        price: "İntim Yıkama Jeli",
        bg: "bg-[hsl(155,42%,55%)]",
        text: "text-white",
        size: "md",
      },
      {
        name: ".ki Sens.Care",
        price: "İntim Yıkama Jeli",
        bg: "bg-[hsl(33,55%,75%)]",
        text: "text-[hsl(258,57%,26%)]",
        size: "md",
      },
      {
        name: ".ki Flow.Care",
        price: "İntim Yıkama Jeli",
        bg: "bg-[hsl(210,55%,55%)]",
        text: "text-white",
        size: "md",
      },
      {
        name: ".ki 50+.Care",
        price: "İntim Yıkama Jeli",
        bg: "bg-[hsl(280,40%,50%)]",
        text: "text-white",
        size: "md",
      },
      {
        name: ".ki İntim Bakım Spreyi",
        price: "Durulama gerektirmez",
        bg: "bg-[hsl(170,45%,45%)]",
        text: "text-white",
        size: "md",
      },
    ],
  },
  {
    title: "Aromaterapi",
    products: [
      {
        name: ".ki Cycle Care",
        price: "Aromaterapi Yağı · 10 ml",
        bg: "bg-[hsl(38,68%,55%)]",
        text: "text-white",
        size: "xl",
      },
    ],
  },
  {
    title: "Ped",
    products: [
      {
        name: ".ki Günlük Ped",
        price: "155 mm · 30 adet",
        bg: "bg-[hsl(15,70%,60%)]",
        text: "text-white",
        size: "md",
      },
      {
        name: ".ki Gündüz Pedi",
        price: "245 mm · 12 adet",
        bg: "bg-[hsl(349,55%,55%)]",
        text: "text-white",
        size: "md",
      },
      {
        name: ".ki Gece Pedi",
        price: "335 mm · 8 adet",
        bg: "bg-[hsl(258,47%,38%)]",
        text: "text-white",
        size: "md",
      },
    ],
  },
];

const sizeMap: Record<Product["size"], string> = {
  sm: "md:col-span-2",
  md: "md:col-span-2",
  lg: "md:col-span-3",
  xl: "md:col-span-6",
};

const ProductCard = ({ product }: { product: Product }) => (
  <a
    href="#"
    className={`group relative overflow-hidden rounded-xl ${product.bg} ${product.text} ${sizeMap[product.size]}
      col-span-2
      min-h-[110px] md:min-h-[120px]
      p-3.5 md:p-4
      flex flex-col justify-between
      transition-all duration-500
      hover:scale-[1.02] hover:shadow-lg
      cursor-pointer`}
  >
    <div
      aria-hidden
      className="absolute right-2 top-2 h-14 w-14 md:h-16 md:w-16 rounded-full bg-white/15 blur-sm transition-transform duration-700 group-hover:scale-110"
    />
    <div
      aria-hidden
      className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full bg-white/10"
    />

    <div className="relative z-10">
      <h3 className="font-display text-sm md:text-base leading-tight">
        {product.name}
      </h3>
      <p className="mt-1 text-[11px] md:text-xs opacity-90 leading-snug">
        {product.price}
      </p>
    </div>

    <div className="relative z-10 flex justify-end">
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm
          transition-all duration-300 group-hover:bg-white/35 group-hover:translate-x-1"
      >
        <ArrowRight className="h-3 w-3" />
      </span>
    </div>
  </a>
);

const AllProductsSection = () => {
  return (
    <section
      id="tum-urunler"
      className="relative py-12 md:py-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--plum-pale)) 50%, hsl(var(--secondary)) 100%)",
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

        <div className="space-y-6 md:space-y-8">
          {categories.map((cat, idx) => (
            <div key={cat.title} className={`k5-reveal k5-reveal-d${Math.min(idx + 1, 4)}`}>
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-display text-lg md:text-xl text-primary">
                  {cat.title}
                </h3>
                <span className="text-[11px] md:text-xs text-muted-foreground">
                  {cat.products.length} ürün
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5 md:gap-3">
                {cat.products.map((p) => (
                  <ProductCard key={p.name} product={p} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;
