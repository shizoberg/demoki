import { Star } from "lucide-react";
import packPads from "@/assets/pack-pads.png";
import packSachet from "@/assets/pack-sachet.png";
import packSpray from "@/assets/pack-spray.png";
import packOil from "@/assets/pack-oil.png";
import florenceHover from "@/assets/florence-on-card.png";

type Pack = {
  id: string;
  name: string;
  rating: number;
  price: string;
  image: string;
  bgClass: string;
};

const packs: Pack[] = [
  {
    id: "balance-deneme",
    name: "Balance Deneme Paketi",
    rating: 4.9,
    price: "₺197,50",
    image: packSachet,
    bgClass: "bg-primary",
  },
  {
    id: "tanisma",
    name: "Tanışma Paketi: .ki ile başla",
    rating: 4.7,
    price: "₺349,00",
    image: packPads,
    bgClass: "bg-primary",
  },
  {
    id: "aylik",
    name: "Aylık Döngü Paketi",
    rating: 4.8,
    price: "₺499,00",
    image: packOil,
    bgClass: "bg-primary",
  },
  {
    id: "yogun",
    name: "Yoğun Destek Paketi",
    rating: 4.8,
    price: "₺695,00",
    image: packSpray,
    bgClass: "bg-primary",
  },
];

const CollectionSection = () => {
  return (
    <section className="relative bg-background pt-8 lg:pt-10 pb-12 lg:pb-16 overflow-visible">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 sm:gap-6 mb-6 lg:mb-8">
          <h2 className="font-display font-medium text-[24px] sm:text-[26px] lg:text-[32px] xl:text-[36px] leading-[1.1] text-primary tracking-tight whitespace-nowrap">
            Sana özel oluşturduğumuz paketler
          </h2>

          <a
            href="#k5Product"
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap border border-primary/80 text-primary text-[13px] font-semibold py-2.5 px-5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Kendi'ne özel paket oluştur
          </a>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {packs.map((pack, idx) => {
            const hasFlorence = pack.id === "aylik";

            return (
              <article
                key={pack.id}
                className={`k5-reveal k5-reveal-d${Math.min(idx + 1, 4)} group relative flex flex-col transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-20px_hsl(var(--primary)/0.25)] ${hasFlorence ? "overflow-visible" : "overflow-hidden rounded-2xl"}`}
              >
                {hasFlorence && (
                  <img
                    src={florenceHover}
                    alt=""
                    aria-hidden="true"
                    className="hidden lg:block absolute left-1/2 bottom-full z-30 h-auto w-[220px] xl:w-[250px] -translate-x-1/2 translate-y-[30%] select-none pointer-events-none drop-shadow-[0_12px_28px_hsl(var(--primary)/0.22)]"
                    loading="lazy"
                  />
                )}

                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card">
                  {/* Image */}
                  <div className={`relative aspect-square ${pack.bgClass} overflow-hidden`}>
                    <img
                      src={pack.image}
                      alt={pack.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      draggable={false}
                      loading="lazy"
                    />
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-4 lg:p-4">
                    <div className="mb-2 flex items-center gap-1.5">
                      <Star className="h-[18px] w-[18px] fill-star text-star" strokeWidth={1.5} />
                      <span className="text-[14px] font-semibold text-foreground/80">
                        {pack.rating.toFixed(1)}
                      </span>
                    </div>

                    <h3 className="mb-3 min-h-[42px] font-display text-[16px] leading-snug text-primary lg:text-[17px]">
                      {pack.name}
                    </h3>

                    <div className="mt-auto">
                      <p className="mb-3 text-[15px] font-semibold text-foreground">
                        {pack.price}
                      </p>
                      <button
                        type="button"
                        className="inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-primary px-4 py-2.5 text-[13px] font-bold text-primary-foreground transition-all hover:bg-primary-medium"
                      >
                        Sepete Ekle
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 sm:hidden flex justify-center">
          <a
            href="#k5Product"
            className="inline-flex items-center justify-center whitespace-nowrap border border-primary/80 text-primary text-[13px] font-semibold py-2.5 px-5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
          >
            Kendi'ne özel paket oluştur
          </a>
        </div>
      </div>
    </section>
  );
};

export default CollectionSection;
