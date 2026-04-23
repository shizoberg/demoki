import { ArrowRight } from "lucide-react";

/**
 * AllProductsSection
 * 4-category bento grid matching the user's reference layout:
 *   [PEDLER (tall)] [BALANCE]  [BAKIM JELLERİ (wide)]
 *                  [CHANGE]    [SPREY] [YAĞ]
 * Each tile represents a category or hero product, not individual SKUs.
 */

type CategoryKey = "supplement" | "intim" | "aroma" | "ped";

type Tile = {
  name: string;
  subtitle: string;
  bg: string;
  text: string;
  category: CategoryKey;
  col: 1 | 2 | 3 | 4;
  row: 1 | 2;
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

/* 6-column grid, 2 rows.
   Row 1: [PEDLER 2x2] [BALANCE 2x1] [BAKIM JELLERİ 2x1]
   Row 2:              [CHANGE 2x1]  [SPREY 1x1] [YAĞ 1x1]
*/
const tiles: Tile[] = [
  { name: "Pedler", subtitle: "Günlük · Gündüz · Gece", bg: "bg-[hsl(0,68%,55%)]", text: "text-white", category: "ped", col: 2, row: 2 },
  { name: ".ki Balance", subtitle: "Regl döngüsü · saşe", bg: "bg-[hsl(210,55%,60%)]", text: "text-white", category: "supplement", col: 2, row: 1 },
  { name: "Bakım Jelleri", subtitle: "Daily · Sens · Flow · 50+", bg: "bg-[hsl(15,55%,55%)]", text: "text-white", category: "intim", col: 2, row: 1 },
  { name: ".ki Change", subtitle: "Menopoz · kapsül", bg: "bg-[hsl(300,35%,50%)]", text: "text-white", category: "supplement", col: 2, row: 1 },
  { name: "Sprey", subtitle: "İntim bakım spreyi", bg: "bg-[hsl(5,45%,45%)]", text: "text-white", category: "intim", col: 1, row: 1 },
  { name: "Yağ", subtitle: "Cycle Care · 10 ml", bg: "bg-[hsl(175,55%,42%)]", text: "text-white", category: "aroma", col: 1, row: 1 },
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
    href="#"
    className={`group relative overflow-hidden rounded-2xl ${tile.bg} ${tile.text} ${colMap[tile.col]} ${rowMap[tile.row]}
      col-span-2
      p-4 md:p-5
      flex flex-col justify-end
      transition-all duration-500
      hover:scale-[1.015] hover:shadow-xl
      cursor-pointer`}
  >
    <span
      aria-hidden
      className={`absolute top-3 right-3 inline-flex items-center justify-center h-8 w-8 rounded-full
        ${tile.text === "text-white" ? "bg-white/20 text-white" : "bg-[hsl(258,57%,26%)]/15 text-[hsl(258,57%,26%)]"}
        backdrop-blur-sm`}
    >
      {categoryIcon(tile.category, "w-4 h-4")}
    </span>

    <div className="relative z-10">
      <h3 className="font-display text-base md:text-lg leading-tight">
        {tile.name}
      </h3>
      <p className="mt-1 text-[11px] md:text-xs opacity-90 leading-snug">
        {tile.subtitle}
      </p>
    </div>

    <span
      aria-hidden
      className={`absolute bottom-3 right-3 inline-flex h-7 w-7 items-center justify-center rounded-full
        ${tile.text === "text-white" ? "bg-white/15" : "bg-[hsl(258,57%,26%)]/10"}
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
        <div className="max-w-3xl mb-8 md:mb-10 k5-reveal text-left mr-auto">
          <h2 className="font-display text-2xl md:text-4xl text-primary leading-[1.1]">
            Kendine iyi bakman için<em className="italic text-primary/80">:</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[130px] md:auto-rows-[150px] gap-3 md:gap-3.5 k5-reveal">
          {tiles.map((t) => (
            <TileCard key={t.name} tile={t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllProductsSection;
