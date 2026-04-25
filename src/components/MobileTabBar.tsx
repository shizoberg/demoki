import { useState } from "react";
import { Sparkles, Gift, Store, X, ChevronRight, ChevronDown, ArrowRight, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import packPads from "@/assets/pack-pads.webp";
import packSpray from "@/assets/pack-spray.webp";
import packOil from "@/assets/pack-oil.webp";
import allProductsGrid from "@/assets/all-products-grid.webp";
import userAvatar from "@/assets/user-avatar.webp";

type SheetKey = "about" | "paket" | "store" | "account" | null;

type Tab = {
  key: SheetKey | "home";
  label: string;
  icon?: LucideIcon;
  image?: string;
  href?: string;
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

  return (
    <>
      {/* Bottom tab bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-md border-t border-border/60 pb-[env(safe-area-inset-bottom)]"
        aria-label="Alt menü"
      >
        <ul className="grid grid-cols-5">
          {tabs.map((t) => {
            const Icon = t.icon;
            const isActive = t.key === "home"; // active state for current page
            const handleClick = () => {
              if (t.key === "home" && t.href) {
                window.location.href = t.href;
              } else if (t.key === "paket") {
                window.location.href = "/paket-olustur";
              } else if (t.key === "store") {
                document.querySelector("#tum-urunler")?.scrollIntoView({ behavior: "smooth" });
              } else {
                setSheet(t.key as SheetKey);
              }
            };
            return (
              <li key={t.label}>
                <button
                  onClick={handleClick}
                  className="w-full flex flex-col items-center justify-center gap-1 py-2.5 transition-opacity hover:opacity-70 relative"
                >
                  <span className="h-[28px] flex items-center justify-center">
                    {t.image ? (
                      t.key === "home" ? (
                        <span
                          className={`w-[26px] h-[26px] rounded-full overflow-hidden flex items-center justify-center bg-secondary/60 ${
                            isActive ? "ring-2 ring-rose" : "ring-1 ring-border"
                          }`}
                        >
                          <img
                            src={t.image}
                            alt=""
                            className="w-full h-full object-contain p-0.5"
                            draggable={false}
                          />
                        </span>
                      ) : (
                        <img
                          src={t.image}
                          alt=""
                          className="h-[34px] w-[34px] object-cover object-center scale-[1.35]"
                          style={{ clipPath: "inset(0)" }}
                          draggable={false}
                        />
                      )
                    ) : (
                      Icon && (
                        <Icon
                          className={`w-[22px] h-[22px] ${isActive ? "text-rose" : "text-primary"}`}
                          strokeWidth={isActive ? 2 : 1.75}
                        />
                      )
                    )}
                  </span>
                  {/* Cart badge on Mağaza */}
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

      {/* Bottom sheet */}
      {sheet && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-foreground/50 animate-fade-in"
          onClick={() => setSheet(null)}
        >
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-x-0 bottom-0 bg-background rounded-t-2xl max-h-[85vh] flex flex-col shadow-2xl"
          >
            {/* Grabber + close */}
            <div className="relative pt-3 pb-2 flex items-center justify-center">
              <span className="w-10 h-1 rounded-full bg-border" />
              <button
                onClick={() => setSheet(null)}
                aria-label="Kapat"
                className="absolute right-4 top-3 text-primary"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 pb-8">
              {sheet === "about" && <AboutSheet onNavigate={() => setSheet(null)} />}
              {sheet === "account" && <AccountSheet onNavigate={() => setSheet(null)} />}
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

/* ---------- Sheets ---------- */

const AboutSheet = ({ onNavigate }: { onNavigate: () => void }) => {
  const [openSection, setOpenSection] = useState<string | null>("about");
  const sections = [
    {
      key: "products",
      label: "Ürünler",
      groups: [
        {
          title: "Pedler",
          items: [
            { label: "Günlük Ped", href: "/pedler" },
            { label: "Gece Ped", href: "/pedler" },
            { label: "Gündüz Ped", href: "/pedler" },
          ],
        },
        {
          title: "Takviyeler",
          items: [
            { label: ".ki Change · Kapsül", href: "#" },
            { label: ".ki Balance · Saşe", href: "#" },
          ],
        },
        {
          title: "Jeller & Yağlar",
          items: [
            { label: "Bakım Jeli · Daily", href: "#" },
            { label: "Bakım Jeli · Flow", href: "#" },
            { label: "Bakım Jeli · Sens", href: "#" },
            { label: "Bakım Jeli · 50+", href: "#" },
            { label: "Cycle Care Yağı · 10 ml", href: "#" },
            { label: "İntim Bakım Spreyi", href: "#" },
          ],
        },
      ],
      features: [
        { label: ".ki Paketleri", image: packPads, href: "/paket-olustur" },
        { label: "Tüm Ürünler", image: allProductsGrid, href: "#tum-urunler" },
      ],
    },
    {
      key: "about",
      label: "Biz Kimiz?",
      groups: [
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
      ],
      features: [
        { label: ".ki Kurumsal", image: packSpray, href: "#", badge: "Şirketler için" },
        { label: ".ki Kampüs", image: packOil, href: "#", badge: "Öğrenciler için" },
      ],
    },
  ];

  return (
    <div>
      <h2 className="font-display text-[22px] font-medium text-primary mb-4">Hakkımızda</h2>
      {sections.map((section) => {
        const isOpen = openSection === section.key;
        return (
          <div key={section.key} className="border-b border-border/60">
            <button
              onClick={() => setOpenSection(isOpen ? null : section.key)}
              className="w-full flex items-center justify-between py-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-[18px] font-medium text-primary">
                {section.label}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
            {isOpen && (
              <div className="pb-5 pt-1 animate-fade-in">
                {section.groups.map((g) => (
                  <div key={g.title} className="mb-5 last:mb-0">
                    <h4 className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary/60 mb-2.5">
                      {g.title}
                    </h4>
                    <ul className="flex flex-col">
                      {g.items.map((it) => (
                        <li key={it.label}>
                          <a
                            href={it.href}
                            onClick={onNavigate}
                            className="flex items-center justify-between py-2 text-[14px] text-primary hover:opacity-70 transition-opacity"
                          >
                            <span>{it.label}</span>
                            <ChevronRight className="w-4 h-4 opacity-50" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {section.features.map((f) => (
                    <a
                      key={f.label}
                      href={f.href}
                      onClick={onNavigate}
                      className="relative rounded-xl overflow-hidden bg-secondary/60 ring-1 ring-primary/20 flex flex-col"
                    >
                      {"badge" in f && f.badge && (
                        <span className="absolute top-2 left-1/2 -translate-x-1/2 z-10 bg-background/95 backdrop-blur text-primary text-[9.5px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                          {f.badge}
                        </span>
                      )}
                      <div className="aspect-[4/3] bg-primary/5 overflow-hidden">
                        <img
                          src={f.image}
                          alt={f.label}
                          className="w-full h-full object-cover"
                          draggable={false}
                        />
                      </div>
                      <div className="bg-background flex items-center justify-between px-2.5 py-2">
                        <span className="text-[12px] font-semibold text-primary">{f.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-primary" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}

      <a
        href="#"
        onClick={onNavigate}
        className="mt-6 flex items-center justify-between py-4 text-[14px] font-semibold text-primary hover:opacity-70 transition-opacity"
      >
        Anlaşmalı Eczanelerimiz
        <ArrowRight className="w-4 h-4" />
      </a>
    </div>
  );
};

const AccountSheet = ({ onNavigate }: { onNavigate: () => void }) => (
  <div>
    <h2 className="font-display text-[22px] font-medium text-primary mb-2">Hesabım</h2>
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
      <ul className="flex flex-col">
        {([
          { label: "Sepetim", href: "#k5Product", Icon: ShoppingBag },
          { label: "Anlaşmalı Eczanelerimiz", href: "#", Icon: ArrowRight },
        ] as const).map(({ label, href, Icon }) => (
          <li key={label}>
            <a
              href={href}
              onClick={onNavigate}
              className="flex items-center justify-between py-3 text-[14px] text-primary hover:opacity-70 transition-opacity"
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
