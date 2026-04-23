import { ChevronRight } from "lucide-react";
import packPads from "@/assets/pack-pads.png";
import packSachet from "@/assets/pack-sachet.png";
import packSpray from "@/assets/pack-spray.png";
import packOil from "@/assets/pack-oil.png";

type IconName =
  | "leaf"
  | "drop"
  | "flower"
  | "cup"
  | "heat"
  | "pill"
  | "bowl"
  | "spray"
  | "berry"
  | "patch"
  | "campus"
  | "tree"
  | "globe"
  | "tag"
  | "help"
  | "list";

const Icon = ({ name }: { name: IconName }) => {
  const common = "w-5 h-5 text-primary";
  switch (name) {
    case "leaf":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14z" />
          <path d="M5 19c4-4 8-6 14-14" />
        </svg>
      );
    case "drop":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z" />
        </svg>
      );
    case "flower":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 9.5V4M12 14.5V20M9.5 12H4M14.5 12H20M9 9l-3-3M15 15l3 3M15 9l3-3M9 15l-3 3" />
        </svg>
      );
    case "cup":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 6h12l-1 10a5 5 0 0 1-10 0L6 6z" />
          <path d="M9 10h6" />
        </svg>
      );
    case "heat":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 12c4-2 12-2 16 0" />
          <path d="M4 16c4-2 12-2 16 0" />
          <path d="M4 8c4-2 12-2 16 0" />
        </svg>
      );
    case "pill":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-25 12 12)" />
          <path d="M12 6l3 6" transform="rotate(-25 12 12)" />
        </svg>
      );
    case "bowl":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 11h18a9 9 0 0 1-18 0z" />
        </svg>
      );
    case "spray":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="8" y="9" width="8" height="12" rx="1.5" />
          <path d="M10 9V5h4v4M16 4h2M16 7h3M19 5h-1" />
        </svg>
      );
    case "berry":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="9" cy="14" r="4" />
          <circle cx="15" cy="14" r="4" />
          <path d="M12 10V5l3-2" />
        </svg>
      );
    case "patch":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="4" y="8" width="16" height="8" rx="2" transform="rotate(-15 12 12)" />
          <circle cx="10" cy="12" r="0.8" fill="currentColor" />
          <circle cx="14" cy="12" r="0.8" fill="currentColor" />
        </svg>
      );
    case "campus":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M2 10l10-5 10 5-10 5L2 10z" />
          <path d="M6 12v4c0 1.5 3 3 6 3s6-1.5 6-3v-4" />
        </svg>
      );
    case "tree":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10z" />
          <path d="M12 14v7" />
        </svg>
      );
    case "globe":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
        </svg>
      );
    case "tag":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 12V4h8l10 10-8 8L3 12z" />
          <circle cx="7.5" cy="7.5" r="1.2" />
        </svg>
      );
    case "help":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 3.5M12 17h.01" />
        </svg>
      );
    case "list":
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M4 6h16M4 12h16M4 18h10" />
        </svg>
      );
  }
};

type LinkItem = { label: string; href: string; icon: IconName };
type Column = { title: string; items: LinkItem[] };
type FeatureCard = { label: string; image: string; href: string; badge?: string };

export type MenuKey = "products" | "about" | "donate";

const productsColumns: Column[] = [
  {
    title: "Pedler",
    items: [
      { label: "Günlük Ped", href: "#", icon: "leaf" },
      { label: "Gündüz Ped", href: "#", icon: "flower" },
      { label: "Gece Ped", href: "#", icon: "drop" },
    ],
  },
  {
    title: "Takviyeler & Aroma",
    items: [
      { label: ".ki Balance · Saşe", href: "#", icon: "pill" },
      { label: ".ki Change · Kapsül", href: "#", icon: "berry" },
      { label: "Cycle Care Yağı · 10 ml", href: "#", icon: "tree" },
    ],
  },
  {
    title: "İntim Bakım",
    items: [
      { label: "Bakım Jeli · Daily", href: "#", icon: "bowl" },
      { label: "Bakım Jeli · Sens", href: "#", icon: "patch" },
      { label: "Bakım Jeli · Flow", href: "#", icon: "cup" },
      { label: "Bakım Jeli · 50+", href: "#", icon: "heat" },
      { label: "İntim Bakım Spreyi", href: "#", icon: "spray" },
    ],
  },
];

const productsFeatures: FeatureCard[] = [
  { label: ".ki Paketleri", image: packPads, href: "#k5Product" },
  { label: "Tüm Ürünler", image: packSachet, href: "#tum-urunler" },
];

const aboutColumns: Column[] = [
  {
    title: "Biz Kimiz?",
    items: [
      { label: "Neden .ki?", href: "#", icon: "tree" },
      { label: ".ki Nasıl Çalışır?", href: "#k5Science", icon: "globe" },
      { label: "Fiyat Politikası", href: "#", icon: "tag" },
      { label: "Sıkça Sorulan Sorular", href: "#k5Faq", icon: "help" },
      { label: "Tüm Malzemeler", href: "#k5Ingredients", icon: "list" },
    ],
  },
];

const aboutFeatures: FeatureCard[] = [
  { label: ".ki Kurumsal", image: packSpray, href: "#", badge: "Şirketler için" },
  { label: ".ki Kampüs", image: packOil, href: "#", badge: "Öğrenciler için" },
];

interface MegaMenuProps {
  active: MenuKey | null;
  onClose: () => void;
}

const MegaMenu = ({ active, onClose }: MegaMenuProps) => {
  if (!active || active === "donate") return null;

  const columns = active === "products" ? productsColumns : aboutColumns;
  const features = active === "products" ? productsFeatures : aboutFeatures;

  return (
    <div
      className="absolute left-0 right-0 top-full bg-background border-b border-border/60 shadow-[0_24px_40px_-20px_rgba(0,0,0,0.15)] animate-fade-in"
      onMouseLeave={onClose}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* Columns */}
          <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[15px] font-bold text-primary mb-5">{col.title}</h3>
                <ul className="flex flex-col gap-4">
                  {col.items.map((item) => (
                    <li key={item.label}>
                      <a
                        href={item.href}
                        onClick={onClose}
                        className="group flex items-center gap-3 text-[14px] text-primary hover:opacity-70 transition-opacity"
                      >
                        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary/60 group-hover:bg-secondary transition-colors text-base leading-none">
                          {(item as LinkItemEmoji).emoji ? (
                            <span aria-hidden>{(item as LinkItemEmoji).emoji}</span>
                          ) : (
                            <Icon name={item.icon} />
                          )}
                        </span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Feature cards */}
          <div className="col-span-12 lg:col-span-5 grid grid-cols-2 gap-4">
            {features.map((f) => (
              <a
                key={f.label}
                href={f.href}
                onClick={onClose}
                className="group relative rounded-2xl overflow-hidden bg-secondary/60 aspect-[4/5] flex flex-col ring-1 ring-primary/30 hover:ring-primary/60 transition-shadow"
              >
                {f.badge && (
                  <span className="absolute top-3 left-1/2 -translate-x-1/2 z-10 bg-background/90 backdrop-blur text-primary text-[11px] font-semibold px-3 py-1 rounded-full whitespace-nowrap">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose mr-1.5 align-middle" />
                    {f.badge}
                  </span>
                )}
                <div className="flex-1 flex items-center justify-center p-6 bg-primary/5">
                  <img
                    src={f.image}
                    alt={f.label}
                    className="max-h-[80%] w-auto object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="bg-background flex items-center justify-between px-4 py-3">
                  <span className="text-[14px] font-semibold text-primary">{f.label}</span>
                  <ChevronRight className="w-4 h-4 text-primary" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
