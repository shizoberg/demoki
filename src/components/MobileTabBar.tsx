import { useEffect, useState } from "react";
import { Sparkles, Gift, Store, X, ChevronRight, ArrowRight, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import packPads from "@/assets/pack-pads.webp";
import packSpray from "@/assets/pack-spray.webp";
import packOil from "@/assets/pack-oil.webp";
import allProductsGrid from "@/assets/all-products-grid.webp";
import userAvatar from "@/assets/user-avatar.webp";

/* Inline icons matching desktop MegaMenu vocabulary */
type ProductIconName =
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
  | "tree"
  | "globe"
  | "tag"
  | "help"
  | "list";

const ProductIcon = ({ name }: { name: ProductIconName }) => {
  const cn = "w-[18px] h-[18px] text-primary";
  switch (name) {
    case "padDay":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="7" y="3" width="10" height="18" rx="5" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    case "padLiner":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="9" y="3" width="6" height="18" rx="3" />
          <path d="M12 8v8" />
        </svg>
      );
    case "padNight":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
        </svg>
      );
    case "sachet":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M6 6h12v14H6z" />
          <path d="M8 6l1-2h6l1 2" />
          <path d="M9 12h6" />
        </svg>
      );
    case "capsule":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="3" y="9" width="18" height="6" rx="3" transform="rotate(-25 12 12)" />
          <path d="M12 6l3 6" transform="rotate(-25 12 12)" />
        </svg>
      );
    case "oilBottle":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="9" y="2" width="6" height="3" rx="0.5" />
          <path d="M8 5h8l-1 3a4 4 0 0 1 2 3v8a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-8a4 4 0 0 1 2-3l-1-3z" />
        </svg>
      );
    case "gelDaily":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="3.5" />
          <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
        </svg>
      );
    case "gelSens":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
        </svg>
      );
    case "gelFlow":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M3 8c2.5-2 4.5 2 7 0s4.5-2 7 0 4 0 4 0" />
          <path d="M3 14c2.5-2 4.5 2 7 0s4.5-2 7 0 4 0 4 0" />
          <path d="M3 20c2.5-2 4.5 2 7 0s4.5-2 7 0 4 0 4 0" />
        </svg>
      );
    case "gel50":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 10c0-3 2-5 4-5 0 3-1 5-4 5z" />
          <path d="M12 14c0 3-2 5-4 5 0-3 1-5 4-5z" />
          <path d="M10 12c-3 0-5-2-5-4 3 0 5 1 5 4z" />
          <path d="M14 12c3 0 5 2 5 4-3 0-5-1-5-4z" />
        </svg>
      );
    case "spray":
      return (
        <svg className={cn} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <rect x="8" y="9" width="8" height="12" rx="1.5" />
          <path d="M10 9V5h4v4M16 4h2M16 7h3M19 5h-1" />
        </svg>
      );
  }
};

type SheetKey = "about" | "store" | "account" | null;

type Tab = {
  key: SheetKey | "home" | "paket";
  label: string;
  icon?: LucideIcon;
  image?: string;
};

const tabs: Tab[] = [
  { key: "home", label: "Ana Sayfa" },
  { key: "about", label: "Hakkımızda", icon: Sparkles },
  { key: "paket", label: "Paket Oluştur", icon: Gift },
  { key: "store", label: "Mağaza", icon: Store },
  { key: "account", label: "Giriş Yap", image: userAvatar },
];

const MobileTabBar = () => {
  const [sheet, setSheet] = useState<SheetKey>(null);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  // Lock background scroll when sheet open
  useEffect(() => {
    if (sheet) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [sheet]);

  const handleTabClick = (t: Tab) => {
    if (t.key === "home") {
      window.location.href = "/balance";
    } else if (t.key === "paket") {
      window.location.href = "/paket-olustur";
    } else {
      setSheet(t.key as SheetKey);
    }
  };

  return (
    <>
      {/* Bottom tab bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bg-background/95 backdrop-blur-md border-t border-border/60 pb-[env(safe-area-inset-bottom)]"
        aria-label="Alt menü"
      >
        <ul className="grid grid-cols-5">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive =
              (t.key === "home" && !sheet) ||
              (t.key !== "home" && t.key !== "paket" && sheet === t.key);
            return (
              <li key={t.label}>
                <button
                  onClick={() => handleTabClick(t)}
                  className="w-full flex flex-col items-center justify-center gap-1 py-2.5 transition-opacity hover:opacity-70 relative"
                >
                  <span className="h-[28px] flex items-center justify-center">
                    {t.key === "home" ? (
                      <span
                        className={`block w-[22px] h-[22px] rounded-full ${
                          isActive ? "bg-rose" : "bg-primary"
                        }`}
                      />
                    ) : t.image ? (
                      <span className="relative w-[26px] h-[26px] overflow-hidden flex items-center justify-center">
                        <img
                          src={t.image}
                          alt=""
                          className="w-[34px] h-[34px] max-w-none object-cover object-center"
                          draggable={false}
                        />
                      </span>
                    ) : (
                      Icon && (
                        <Icon
                          className={`w-[22px] h-[22px] ${isActive ? "text-rose" : "text-primary"}`}
                          strokeWidth={isActive ? 2 : 1.75}
                        />
                      )
                    )}
                  </span>
                  {t.key === "store" && itemCount > 0 && (
                    <span className="absolute top-1.5 right-[22%] bg-rose text-primary-foreground text-[9px] font-bold rounded-full min-w-[15px] h-[15px] px-1 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                  <span
                    className={`text-[10.5px] leading-none font-semibold ${
                      isActive ? "text-rose" : "text-primary"
                    }`}
                  >
                    {t.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Fullscreen sheet — bottom nav remains visible (z-60 above this z-50) */}
      {sheet && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-background animate-fade-in flex flex-col"
          role="dialog"
          aria-modal="true"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-border/60 shrink-0">
            <h2 className="font-display text-[18px] font-medium text-primary">
              {sheet === "about" && "Hakkımızda"}
              {sheet === "store" && "Mağaza"}
              {sheet === "account" && "Hesabım"}
            </h2>
            <button
              onClick={() => setSheet(null)}
              aria-label="Kapat"
              className="text-primary -mr-2 p-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable body — bottom padding clears the tab bar */}
          <div className="flex-1 overflow-y-auto overscroll-contain px-5 pt-5 pb-[calc(env(safe-area-inset-bottom)+96px)]">
            {sheet === "about" && <AboutSheet onNavigate={() => setSheet(null)} />}
            {sheet === "store" && <StoreSheet onNavigate={() => setSheet(null)} />}
            {sheet === "account" && <AccountSheet onNavigate={() => setSheet(null)} />}
          </div>
        </div>
      )}
    </>
  );
};

/* ---------- Sheets ---------- */

type ListItem = { label: string; href: string; icon?: ProductIconName };
type ListGroup = { title: string; items: ListItem[] };
type FeatureCard = { label: string; image: string; href: string; badge?: string };

const FlatList = ({ groups, onNavigate }: { groups: ListGroup[]; onNavigate: () => void }) => (
  <div className="flex flex-col gap-7">
    {groups.map((g) => (
      <div key={g.title}>
        <h3 className="text-[15px] font-bold text-primary mb-2">{g.title}</h3>
        <ul className="flex flex-col">
          {g.items.map((it) => (
            <li key={it.label}>
              <a
                href={it.href}
                onClick={onNavigate}
                className="group flex items-center gap-3 py-3 text-[15px] text-primary hover:opacity-70 transition-opacity"
              >
                {it.icon && (
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary/60 group-hover:bg-secondary transition-colors shrink-0">
                    <ProductIcon name={it.icon} />
                  </span>
                )}
                <span className="flex-1">{it.label}</span>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const FeatureGrid = ({
  features,
  onNavigate,
}: {
  features: FeatureCard[];
  onNavigate: () => void;
}) => (
  <div className="grid grid-cols-2 gap-3 mt-7">
    {features.map((f) => (
      <a
        key={f.label}
        href={f.href}
        onClick={onNavigate}
        className="relative rounded-xl overflow-hidden bg-secondary/60 ring-1 ring-primary/20 flex flex-col"
      >
        {f.badge && (
          <span className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-background/95 backdrop-blur text-primary text-[9.5px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
            {f.badge}
          </span>
        )}
        <div className="aspect-[4/3] bg-primary/5 overflow-hidden">
          <img src={f.image} alt={f.label} className="w-full h-full object-cover" draggable={false} />
        </div>
        <div className="bg-background flex items-center justify-between px-2.5 py-2">
          <span className="text-[12px] font-semibold text-primary">{f.label}</span>
          <ChevronRight className="w-3.5 h-3.5 text-primary" />
        </div>
      </a>
    ))}
  </div>
);

/* ---------- Hakkımızda (sadece "Biz Kimiz?") ---------- */
const AboutSheet = ({ onNavigate }: { onNavigate: () => void }) => {
  const groups: ListGroup[] = [
    {
      title: "Biz Kimiz?",
      items: [
        { label: "Neden .ki?", href: "#" },
        { label: ".ki Nasıl Çalışır?", href: "#k5Science" },
        { label: "Fiyat Politikası", href: "#" },
        { label: "Sıkça Sorulan Sorular", href: "#k5Faq" },
        { label: "Tüm Malzemeler", href: "#k5Ingredients" },
      ],
    },
  ];
  const features: FeatureCard[] = [
    { label: ".ki Kurumsal", image: packSpray, href: "#", badge: "Şirketler için" },
    { label: ".ki Kampüs", image: packOil, href: "#", badge: "Öğrenciler için" },
  ];

  return (
    <div>
      <FlatList groups={groups} onNavigate={onNavigate} />
      <FeatureGrid features={features} onNavigate={onNavigate} />
      <a
        href="#"
        onClick={onNavigate}
        className="mt-8 flex items-center justify-between py-4 text-[14px] font-semibold text-primary hover:opacity-70 transition-opacity border-t border-border/60"
      >
        Anlaşmalı Eczanelerimiz
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

/* ---------- Mağaza ---------- */
const StoreSheet = ({ onNavigate }: { onNavigate: () => void }) => {
  const groups: ListGroup[] = [
    {
      title: "Pedler",
      items: [
        { label: "Günlük Ped", href: "/pedler", icon: "padLiner" },
        { label: "Gece Ped", href: "/pedler", icon: "padNight" },
        { label: "Gündüz Ped", href: "/pedler", icon: "padDay" },
      ],
    },
    {
      title: "Takviyeler",
      items: [
        { label: ".ki Change · Kapsül", href: "#", icon: "capsule" },
        { label: ".ki Balance · Saşe", href: "#", icon: "sachet" },
      ],
    },
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
  ];

  const heroes: FeatureCard[] = [
    { label: ".ki Paketleri", image: packPads, href: "/paket-olustur" },
    { label: "Tüm Ürünler", image: allProductsGrid, href: "#tum-urunler" },
  ];

  return (
    <div>
      <FeatureGrid features={heroes} onNavigate={onNavigate} />
      <div className="mt-8">
        <FlatList groups={groups} onNavigate={onNavigate} />
      </div>
      <a
        href="#"
        onClick={onNavigate}
        className="mt-8 flex items-center justify-between py-4 text-[14px] font-semibold text-primary hover:opacity-70 transition-opacity border-t border-border/60"
      >
        Anlaşmalı Eczanelerimiz
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

/* ---------- Hesabım ---------- */
const AccountSheet = ({ onNavigate }: { onNavigate: () => void }) => (
  <div>
    <p className="text-[13px] text-muted-foreground mb-6">
      Siparişlerini takip etmek ve abonelik paketini yönetmek için giriş yap.
    </p>
    <div className="flex flex-col gap-3">
      <a
        href="#"
        onClick={onNavigate}
        className="inline-flex items-center justify-center bg-primary text-primary-foreground text-[14px] font-bold py-3.5 rounded-full hover:bg-primary-medium transition-all"
      >
        Giriş Yap
      </a>
      <a
        href="#"
        onClick={onNavigate}
        className="inline-flex items-center justify-center border-2 border-primary text-primary text-[14px] font-bold py-3.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
      >
        Yeni Hesap Oluştur
      </a>
    </div>

    <div className="mt-8 border-t border-border/60 pt-6">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/60 mb-3">
        Hızlı Erişim
      </h3>
      <ul className="flex flex-col divide-y divide-border/50">
        {([
          { label: "Sepetim", href: "#k5Product", Icon: ShoppingBag },
          { label: "Anlaşmalı Eczanelerimiz", href: "#", Icon: ArrowRight },
        ] as const).map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              onClick={onNavigate}
              className="flex items-center justify-between py-3.5 text-[15px] text-primary hover:opacity-70 transition-opacity"
            >
              <span className="flex items-center gap-3">
                <Icon className="w-4 h-4" />
                {label}
              </span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default MobileTabBar;
