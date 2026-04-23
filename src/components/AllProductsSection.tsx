import { ArrowRight } from "lucide-react";

/**
 * AllProductsSection
 * Bento-grid styled product showcase inspired by beije.co — colored cards,
 * placeholder image areas (to be replaced with real product photography),
 * organized by .ki product categories.
 */

type Product = {
  name: string;
  price: string;
  bg: string; // tailwind bg color class
  text: string; // tailwind text color class
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
        size: "lg",
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
  sm: "md:col-span-2 md:row-span-1",
  md: "md:col-span-2 md:row-span-1",
  lg: "md:col-span-3 md:row-span-1",
  xl: "md:col-span-4 md:row-span-1",
};

const ProductCard = ({ product }: { product: Product }) => (
  <a
    href="#"
    className={`group relative overflow-hidden rounded-2xl ${product.bg} ${product.text} ${sizeMap[product.size]}
      col-span-2 row-span-1
      min-h-[180px] md:min-h-[200px]
      p-6 md:p-7
      flex flex-col justify-between
      transition-all duration-500
      hover:scale-[1.02] hover:shadow-xl
      cursor-pointer`}
  >
    {/* Placeholder visual area — soft circular tint to suggest product */}
    <div
      aria-hidden
      className="absolute right-4 top-4 h-24 w-24 md:h-28 md:w-28 rounded-full bg-white/15 blur-sm transition-transform duration-700 group-hover:scale-110"
    />
    <div
      aria-hidden
      className="absolute -right-6 -bottom-6 h-32 w-32 rounded-full bg-white/10"
    />

    <div className="relative z-10">
      <h3 className="font-display text-xl md:text-2xl leading-tight">
        {product.name}
      </h3>
      <p className="mt-2 text-sm md:text-[15px] opacity-90 leading-snug">
        {product.price}
      </p>
    </div>

    <div className="relative z-10 flex justify-end">
      <span
        className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm
          transition-all duration-300 group-hover:bg-white/35 group-hover:translate-x-1"
      >
        <ArrowRight className="h-4 w-4" />
      </span>
    </div>
  </a>
);

const AllProductsSection = () => {
  return (
    <section
      id="tum-urunler"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--plum-pale)) 50%, hsl(var(--secondary)) 100%)",
      }}
    >
      {/* Soft decorative blobs */}
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

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-14 md:mb-16 k5-reveal">
          <p className="text-sm uppercase tracking-[0.18em] text-primary/70 mb-3">
            Tüm koleksiyon
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
            Günün her anında,{" "}
            <em className="italic text-primary/80">döngünün her gününde.</em>
          </h2>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-2xl">
            Modern formüllerden günlük bakıma — döngünün her evresine eşlik eden
            .ki ürünleri.
          </p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {categories.map((cat, idx) => (
            <div key={cat.title} className={`k5-reveal k5-reveal-d${Math.min(idx + 1, 4)}`}>
              <div className="flex items-baseline justify-between mb-5 md:mb-6">
                <h3 className="font-display text-2xl md:text-3xl text-primary">
                  {cat.title}
                </h3>
                <span className="text-xs md:text-sm text-muted-foreground">
                  {cat.products.length} ürün
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[180px] md:auto-rows-[200px] gap-3 md:gap-4">
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
