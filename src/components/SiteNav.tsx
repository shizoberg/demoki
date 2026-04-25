import { useState } from "react";
import { ChevronDown, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import kiLogo from "@/assets/ki-logo.webp";
import MegaMenu, { type MenuKey } from "./MegaMenu";

const SiteNav = () => {
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
      {/* MOBILE: logo-only */}
      <div className="lg:hidden h-14 flex items-center justify-center px-5">
        <a href="/balance" aria-label=".ki ana sayfa">
          <img src={kiLogo} alt=".ki" className="h-7 w-auto" draggable={false} />
        </a>
      </div>

      {/* DESKTOP: full nav */}
      <div className="hidden lg:flex max-w-[1240px] mx-auto px-8 h-14 items-center justify-between relative">
        {/* Left: nav */}
        <div className="flex items-center">
          <nav className="flex items-center gap-7">
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
          <img src={kiLogo} alt=".ki" className="h-8 w-auto" draggable={false} />
        </a>

        {/* Right */}
        <div className="flex items-center gap-6">
          <a
            href="/paket-olustur"
            className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-[12px] font-bold py-2 px-4 rounded-full hover:bg-primary-medium transition-all"
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
    </header>
  );
};

export default SiteNav;
