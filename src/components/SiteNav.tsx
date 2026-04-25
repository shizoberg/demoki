import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, ShoppingBag, User, X, ArrowRight } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import kiLogo from "@/assets/ki-logo.webp";
import userAvatar from "@/assets/user-avatar.webp";
import packPads from "@/assets/pack-pads.webp";
import packSpray from "@/assets/pack-spray.webp";
import packOil from "@/assets/pack-oil.webp";
import allProductsGrid from "@/assets/all-products-grid.webp";
import MegaMenu, { type MenuKey } from "./MegaMenu";

const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  const navItems: { key: MenuKey; label: string; hasDropdown: boolean; dot?: boolean; href?: string }[] = [
    { key: "products", label: "Ürünler", hasDropdown: true },
    { key: "about", label: "Biz Kimiz?", hasDropdown: true, dot: true },
  ];

  return (
    <header
      className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border/60"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between relative">
        {/* Left: desktop nav / mobile menu trigger */}
        <div className="flex items-center">
          <button
            onClick={() => setOpen(true)}
            aria-label="Menüyü aç"
            className="lg:hidden flex items-center gap-2 text-[13px] font-semibold text-primary hover:opacity-70 transition-opacity"
          >
            <Menu className="w-5 h-5" />
          </button>
          <nav className="hidden lg:flex items-center gap-7">
            {navItems.map((item) => {
              const isActive = activeMenu === item.key;
              return item.hasDropdown ? (
                <button
                  key={item.key}
                  onMouseEnter={() => setActiveMenu(item.key)}
                  className={`flex items-center gap-1.5 text-[14px] font-semibold text-primary py-4 border-b-2 transition-colors ${
                    isActive ? "border-primary" : "border-transparent hover:opacity-70"
                  }`}
                >
                  {item.label}
                  {item.dot && <span className="w-1.5 h-1.5 rounded-full bg-rose" />}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${isActive ? "rotate-180" : ""}`}
                  />
                </button>
              ) : (
                <a
                  key={item.key}
                  href={item.href}
                  onMouseEnter={() => setActiveMenu(null)}
                  className="flex items-center gap-1.5 text-[14px] font-semibold text-primary py-4 border-b-2 border-transparent hover:opacity-70 transition-opacity"
                >
                  {item.label}
                  {item.dot && <span className="w-1.5 h-1.5 rounded-full bg-rose" />}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Center: logo */}
        <a
          href="/balance"
          className="absolute left-1/2 -translate-x-1/2"
          aria-label=".ki ana sayfa"
        >
          <img src={kiLogo} alt=".ki" className="h-7 sm:h-8 w-auto" draggable={false} />
        </a>

        {/* Right */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="/paket-olustur"
            className="hidden md:inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-[12px] font-bold py-2 px-4 rounded-full hover:bg-primary-medium transition-all"
          >
            Kendi paketini oluştur
          </a>
          <button aria-label="Hesap" className="text-primary hover:opacity-70 transition-opacity">
            <User className="w-5 h-5" strokeWidth={1.75} />
          </button>
          <a
            href="#k5Product"
            aria-label="Sepete git"
            className="relative text-primary hover:opacity-70 transition-opacity"
          >
            <ShoppingBag className="w-5 h-5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-rose text-primary-foreground text-[10px] font-bold rounded-full min-w-[16px] h-4 px-1 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </a>
        </div>
      </div>

      {/* Mega menu (desktop) */}
      <div className="hidden lg:block">
        <MegaMenu active={activeMenu} onClose={() => setActiveMenu(null)} />
      </div>

      {/* Slide-in menu (mobile) — mega menu mantığını taşıyan accordion */}
      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/50 lg:hidden animate-fade-in" onClick={() => setOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 h-full w-[92%] max-w-[400px] bg-background shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-14 border-b border-border/60">
              <img src={kiLogo} alt=".ki" className="h-7 w-auto" draggable={false} />
              <button onClick={() => setOpen(false)} aria-label="Kapat" className="text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
              {/* Primary CTA */}
              <a
                href="/paket-olustur"
                onClick={() => setOpen(false)}
                className="flex items-center justify-center bg-primary text-primary-foreground text-[13px] font-bold py-3.5 rounded-full mb-7 hover:bg-primary-medium transition-all"
              >
                Kendi paketini oluştur
              </a>

              {/* Accordion sections */}
              {[
                {
                  key: "products" as const,
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
                  key: "about" as const,
                  label: "Biz Kimiz?",
                  dot: true,
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
              ].map((section) => {
                const isOpen = mobileSection === section.key;
                return (
                  <div key={section.key} className="border-b border-border/60">
                    <button
                      onClick={() => setMobileSection(isOpen ? null : section.key)}
                      className="w-full flex items-center justify-between py-4 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-[22px] font-medium text-primary leading-tight flex items-center gap-2">
                        {section.label}
                        {section.dot && <span className="w-1.5 h-1.5 rounded-full bg-rose" />}
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
                                    onClick={() => setOpen(false)}
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

                        {/* Feature cards */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          {section.features.map((f) => (
                            <a
                              key={f.label}
                              href={f.href}
                              onClick={() => setOpen(false)}
                              className="relative rounded-xl overflow-hidden bg-secondary/60 ring-1 ring-primary/20 flex flex-col"
                            >
                              {f.badge && (
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

              {/* Anlaşmalı eczaneler */}
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="mt-6 flex items-center justify-between py-4 text-[14px] font-semibold text-primary hover:opacity-70 transition-opacity"
              >
                Anlaşmalı Eczanelerimiz
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Footer: account */}
            <div className="border-t border-border/60 px-6 py-4 flex items-center gap-3">
              <img src={userAvatar} alt="" className="w-8 h-8 object-contain" draggable={false} />
              <a
                href="#"
                onClick={() => setOpen(false)}
                className="text-[14px] font-semibold text-primary hover:opacity-70 transition-opacity"
              >
                Hesabım
              </a>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
