import { useState } from "react";
import { ChevronDown, Menu, ShoppingBag, User, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import kiLogo from "@/assets/ki-logo.webp";
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
            href="#k5Product"
            className="hidden md:inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-[12px] font-bold py-2 px-4 rounded-full hover:bg-primary-medium transition-all"
          >
            Kendi paketini oluştur
          </a>
          <button aria-label="Hesap" className="hover:opacity-70 transition-opacity hidden sm:inline-flex">
            <img src={userAvatar} alt="Hesap" className="w-7 h-7 object-contain" draggable={false} />
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

      {/* Slide-in menu (mobile) */}
      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/40 lg:hidden" onClick={() => setOpen(false)}>
          <aside
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 h-full w-[88%] max-w-[380px] bg-background shadow-2xl p-7 animate-fade-in"
          >
            <button onClick={() => setOpen(false)} aria-label="Kapat" className="mb-8 text-primary">
              <X className="w-5 h-5" />
            </button>
            <nav className="flex flex-col gap-5">
              {[
                ["Ana Sayfa", "/balance"],
                ["Ürün", "#k5Product"],
                ["İçindekiler", "#k5Ingredients"],
                ["Bilim", "#k5Science"],
                ["Yorumlar", "#k5Reviews"],
                ["SSS", "#k5Faq"],
              ].map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="font-display text-[28px] font-medium text-primary leading-tight hover:opacity-70 transition-opacity"
                >
                  {label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
