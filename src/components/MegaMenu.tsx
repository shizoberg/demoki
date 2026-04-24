import { ArrowRight, ChevronRight } from "lucide-react";
import packPads from "@/assets/pack-pads.webp";
import packSachet from "@/assets/pack-sachet.webp";
import packSpray from "@/assets/pack-spray.webp";
import packOil from "@/assets/pack-oil.webp";
import allProductsGrid from "@/assets/all-products-grid.webp";

type IconName =
  | "padDay"
  | "padLiner"
  | "padNight"
  | "sachet"
  | "capsule"
  | "oilBottle"
  | "gelDaily"
  | "gelSens"
  | "gelFlow"
  | "gel50"
  | "spray"
  | "campus"
  | "tree"
  | "globe"
  | "tag"
  | "help"
  | "list";

const Icon = ({ name }: { name: IconName }) => {
  const common = "w-5 h-5 text-primary";
  switch (name) {
    case "padDay":
      // Day pad — rounded rectangle with droplet
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="7" y="3" width="10" height="18" rx="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "padLiner":
      // Daily liner — slimmer pad
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="9" y="3" width="6" height="18" rx="3" />
          <path d="M12 8v8" />
        </svg>
      );
    case "padNight":
      // Night pad — crescent moon
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        </svg>
      );
    case "sachet":
      // Sachet — rectangle pouch with notched top
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 6h12v14H6z" />
          <path d="M8 6l1-2h6l1 2" />
          <path d="M9 12h6" />
        </svg>
      );
    case "capsule":
      // Capsule — pill split
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-25 12 12)" />
          <path d="M12 6l3 6" transform="rotate(-25 12 12)" />
        </svg>
      );
    case "oilBottle":
      // Oil bottle — dropper bottle
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="9" y="2" width="6" height="3" rx="0.5" />
          <path d="M8 5h8l-1 3a4 4 0 0 1 2 3v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8a4 4 0 0 1 2-3l-1-3z" />
        </svg>
      );
    case "gelDaily":
      // Daily — sun
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
        </svg>
      );
    case "gelSens":
      // Sens — heart / sensitive
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "gelFlow":
      // Flow — waves
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 8c2.5-2 4.5 2 7 0s4.5-2 7 0 4 0 4 0" />
          <path d="M3 14c2.5-2 4.5 2 7 0s4.5-2 7 0 4 0 4 0" />
          <path d="M3 20c2.5-2 4.5 2 7 0s4.5-2 7 0 4 0 4 0" />
        </svg>
      );
    case "gel50":
      // 50+ — bloom flower for mature
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 10c0-3 2-5 4-5 0 3-1 5-4 5z" />
          <path d="M12 14c0 3-2 5-4 5 0-3 1-5 4-5z" />
          <path d="M10 12c-3 0-5-2-5-4 3 0 5 1 5 4z" />
          <path d="M14 12c3 0 5 2 5 4-3 0-5-1-5-4z" />
        </svg>
      );
    case "spray":
      // Spray bottle
      return (
        <svg className={common} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="8" y="9" width="8" height="12" rx="1.5" />
          <path d="M10 9V5h4v4M16 4h2M16 7h3M19 5h-1" />
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
type ColumnGroup = Column[];
type FeatureCard = { label: string; image: string; href: string; badge?: string };

export type MenuKey = "products" | "about" | "donate";

const productsColumns: ColumnGroup[] = [
  [
    {
      title: "Pedler",
      items: [
        { label: "Günlük Ped", href: "/pedler", icon: "padLiner" },
        { label: "Gece Ped", href: "/pedler", icon: "padNight" },
        { label: "Gündüz Ped", href: "/pedler", icon: "padDay" },
      ],
    },
  ],
  [
    {
      title: "Takviyeler",
      items: [
        { label: ".ki Change · Kapsül", href: "#", icon: "capsule" },
        { label: ".ki Balance · Saşe", href: "#", icon: "sachet" },
      ],
    },
  ],
  [
    {
      title: "Jeller & Yağlar",
      items: [
        { label: "Bakım Jeli · Daily", href: "#", icon: "gelDaily" },
        { label: "Bakım Jeli · Flow", href: "#", icon: "gelFlow" },
        { label: "Bakım Jeli · Sens", href: "#", icon: "gelSens" },
        { label: "Bakım Jeli · 50+", href: "#", icon: "gel50" },
        { label: "Cycle Care Yağı · 10 ml", href: "#", icon: "oilBottle" },
        { label: "İntim Bakım Spreyi", href: "#", icon: "spray" },
      ],
    },
  ],
];

const productsFeatures: FeatureCard[] = [
  { label: ".ki Paketleri", image: packPads, href: "/paket-olustur" },
  { label: "Tüm Ürünler", image: allProductsGrid, href: "#tum-urunler" },
];

const aboutColumns: ColumnGroup[] = [
  [
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
  ],
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
          <div className="col-span-12 lg:col-span-7 flex flex-col">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-8">
              {columns.map((group, gIdx) => (
                <div key={gIdx} className="flex flex-col gap-8">
                  {group.map((col) => (
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
                              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-secondary/60 group-hover:bg-secondary transition-colors">
                                <Icon name={item.icon} />
                              </span>
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            <a
              href="#"
              onClick={onClose}
              className="mt-8 inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:opacity-70 transition-opacity self-start"
            >
              Anlaşmalı Eczanelerimiz
              <ArrowRight className="w-4 h-4" />
            </a>
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
                <div className="flex-1 flex items-center justify-center bg-primary/5 overflow-hidden">
                  <img
                    src={f.image}
                    alt={f.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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
