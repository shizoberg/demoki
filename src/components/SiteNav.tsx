import { useState } from "react";
import { Menu, ShoppingBag, User, X } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const itemCount = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-border/60">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 h-14 flex items-center justify-between relative">
        {/* Left: menu */}
        <button
          onClick={() => setOpen(true)}
          aria-label="Menüyü aç"
          className="flex items-center gap-2 text-[13px] font-semibold text-primary hover:opacity-70 transition-opacity"
        >
          <Menu className="w-5 h-5" />
          <span className="hidden sm:inline">Menü</span>
        </button>

        {/* Center: wordmark */}
        <a href="/balance" className="absolute left-1/2 -translate-x-1/2">
          <span className="font-display font-medium text-[26px] sm:text-[28px] text-primary tracking-tight leading-none">
            .ki
          </span>
        </a>

        {/* Right */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#k5Ingredients"
            className="hidden md:inline text-[13px] font-semibold text-primary hover:opacity-70 transition-opacity"
          >
            Standartlarımız
          </a>
          <button aria-label="Hesap" className="text-primary hover:opacity-70 transition-opacity hidden sm:inline-flex">
            <User className="w-5 h-5" />
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

      {/* Slide-in menu */}
      {open && (
        <div className="fixed inset-0 z-50 bg-foreground/40" onClick={() => setOpen(false)}>
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
