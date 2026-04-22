import { Star } from "lucide-react";

type Pack = {
  id: string;
  name: string;
  rating: number;
  price: string;
  image: string;
  bgClass: string;
};

// Placeholder packs — replace `image` with the 4 visuals you'll provide.
const packs: Pack[] = [
  {
    id: "balance-deneme",
    name: "Balance Deneme Paketi",
    rating: 4.9,
    price: "₺197,50",
    image: "/placeholder.svg",
    bgClass: "bg-rose-light",
  },
  {
    id: "tanisma",
    name: "Tanışma Paketi: .ki ile başla",
    rating: 4.7,
    price: "₺349,00",
    image: "/placeholder.svg",
    bgClass: "bg-sage-light",
  },
  {
    id: "aylik",
    name: "Aylık Döngü Paketi",
    rating: 4.8,
    price: "₺499,00",
    image: "/placeholder.svg",
    bgClass: "bg-cream-2",
  },
  {
    id: "yogun",
    name: "Yoğun Destek Paketi",
    rating: 4.8,
    price: "₺695,00",
    image: "/placeholder.svg",
    bgClass: "bg-secondary",
  },
];

const CollectionSection = () => {
  return (
    <section className="bg-background py-16 lg:py-24">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-10 lg:mb-12">
          <h2 className="k5-reveal font-display font-medium text-[28px] sm:text-[34px] lg:text-[40px] leading-[1.1] text-primary tracking-tight">
            Topluluğumuzun Favorileri
          </h2>
          <a
            href="#k5Product"
            className="k5-reveal hidden sm:inline-flex items-center justify-center whitespace-nowrap border border-primary/80 text-primary text-[13px] font-semibold py-2.5 px-5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Tüm Paketler
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {packs.map((pack, idx) => (
            <article
              key={pack.id}
              className={`k5-reveal k5-reveal-d${Math.min(idx + 1, 4)} group flex flex-col bg-card rounded-2xl overflow-hidden border border-border/60 hover:shadow-[0_18px_40px_-20px_hsl(var(--primary)/0.25)] hover:-translate-y-0.5 transition-all duration-300`}
            >
              {/* Image */}
              <div className={`relative aspect-square ${pack.bgClass} overflow-hidden`}>
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  draggable={false}
                  loading="lazy"
                />
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 p-5 lg:p-6">
                <div className="flex items-center gap-1.5 mb-2">
                  <Star className="w-4 h-4 fill-star text-star" />
                  <span className="text-[13px] font-semibold text-foreground/80">
                    {pack.rating.toFixed(1)}
                  </span>
                </div>

                <h3 className="font-display text-[18px] lg:text-[19px] leading-snug text-primary mb-4 min-h-[48px]">
                  {pack.name}
                </h3>

                <div className="mt-auto">
                  <p className="text-[16px] font-semibold text-foreground mb-4">
                    {pack.price}
                  </p>
                  <button
                    type="button"
                    className="w-full inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-[13px] font-bold py-3 px-5 rounded-full hover:bg-primary-medium transition-all"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Mobile "Tüm Paketler" */}
        <div className="mt-8 sm:hidden flex justify-center">
          <a
            href="#k5Product"
            className="inline-flex items-center justify-center whitespace-nowrap border border-primary/80 text-primary text-[13px] font-semibold py-2.5 px-5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Tüm Paketler
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
