import { ArrowRight } from "lucide-react";
import bentoPads from "@/assets/bento-pads.webp";
import bentoBalance from "@/assets/bento-balance.webp";
import bentoJeller from "@/assets/bento-jeller.webp";
import bentoChange from "@/assets/bento-change.webp";
import bentoSprey from "@/assets/bento-sprey.webp";
import bentoYag from "@/assets/bento-yag.webp";
import florenceBento from "@/assets/florence-bento.webp";

/**
 * AllProductsSection
 * Bento grid with product photography backgrounds.
 */

type CategoryKey = "supplement" | "intim" | "aroma" | "ped";

type Tile = {
  name: string;
  subtitle: string;
  image: string;
  text: string;
  category: CategoryKey;
  col: 1 | 2 | 3 | 4;
  row: 1 | 2;
  /** tailwind object-position class to keep product centred when cropped */
  position?: string;
  href?: string;
};

/* Category icons — pulled from MegaMenu vocabulary (pill, flower, drop, leaf) */
const categoryIcon = (cat: CategoryKey, className: string) => {
  switch (cat) {
    case "supplement":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-25 12 12)" />
          <path d="M12 6l3 6" transform="rotate(-25 12 12)" />
        </svg>
      );
    case "intim":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 9.5V4M12 14.5V20M9.5 12H4M14.5 12H20M9 9l-3-3M15 15l3 3M15 9l3-3M9 15l-3 3" />
        </svg>
      );
    case "aroma":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
        </svg>
      );
    case "ped":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
          <path d="M5 19c4-4 8-6 14-14" />
        </svg>
      );
  }
};

const tiles: Tile[] = [
  { name: "Pedler", subtitle: "Günlük · Gündüz · Gece", image: bentoPads, text: "text-white", category: "ped", col: 2, row: 2, position: "object-center", href: "/pedler" },
  { name: ".ki Balance", subtitle: "Regl döngüsü · saşe", image: bentoBalance, text: "text-white", category: "supplement", col: 2, row: 1, position: "object-right" },
  { name: "Bakım Jelleri", subtitle: "Daily · Sens · Flow · 50+", image: bentoJeller, text: "text-white", category: "intim", col: 2, row: 1, position: "object-center" },
  { name: ".ki Change", subtitle: "Menopoz · kapsül", image: bentoChange, text: "text-white", category: "supplement", col: 2, row: 1, position: "object-right" },
  { name: "Sprey", subtitle: "İntim bakım spreyi", image: bentoSprey, text: "text-white", category: "intim", col: 1, row: 1, position: "object-center" },
  { name: "Yağ", subtitle: "Cycle Care · 10 ml", image: bentoYag, text: "text-white", category: "aroma", col: 1, row: 1, position: "object-center" },
];

const colMap: Record<Tile["col"], string> = {
  1: "md:col-span-1",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};
const rowMap: Record<Tile["row"], string> = {
  1: "md:row-span-1",
  2: "md:row-span-2",
};

const TileCard = ({ tile }: { tile: Tile }) => (
  <a
    href={tile.href ?? "#"}
    className={`group relative overflow-hidden rounded-2xl ${tile.text} ${colMap[tile.col]} ${rowMap[tile.row]}
      col-span-2
      p-4 md:p-5
      flex flex-col justify-end
      transition-all duration-500
      hover:shadow-xl
      cursor-pointer`}
  >
    {/* Background image */}
    <img
      src={tile.image}
      alt={tile.name}
      loading="lazy"
      className={`absolute inset-0 w-full h-full object-cover ${tile.position ?? "object-center"} transition-transform duration-700 group-hover:scale-[1.04]`}
    />
    {/* Subtle gradient for text legibility */}
    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

    <div
      className="relative z-10"
      style={{
        textShadow:
          "0 1px 14px hsl(var(--primary) / 0.7), 0 1px 3px hsl(var(--primary) / 0.55)",
      }}
    >
      <h3 className="font-display text-base md:text-lg leading-tight">
        {tile.name}
      </h3>
      <p className="mt-1 text-[11px] md:text-xs opacity-95 leading-snug">
        {tile.subtitle}
      </p>
      <p className="mt-1 text-[10px] md:text-[11px] opacity-85 leading-snug">
        00₺'den başlayan fiyatlarla
      </p>
    </div>

    <span
      aria-hidden
      className="absolute bottom-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:translate-x-0.5"
    >
      <ArrowRight className="h-3.5 w-3.5" />
    </span>
  </a>
);

const AllProductsSection = () => {
  return (
    <section
      id="tum-urunler"
      className="relative py-12 md:py-16 overflow-hidden bg-background"
    >
      {/* Illustration — absolute, overlaps behind content */}
      <img
        src={florenceBento}
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute right-0 bottom-0 w-[460px] xl:w-[540px] h-auto select-none pointer-events-none z-0"
        loading="lazy"
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-8 md:mb-10 k5-reveal text-left mr-auto">
          <h2 className="font-display text-2xl md:text-4xl text-primary leading-[1.1]">
            Kendine iyi bakman için<em className="italic text-primary/80">:</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[150px] md:auto-rows-[173px] gap-3 md:gap-3.5 k5-reveal">
          {tiles.map((t) => (
            <TileCard key={t.name} tile={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;
