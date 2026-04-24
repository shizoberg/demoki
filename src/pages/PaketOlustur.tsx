import { useMemo, useState } from "react";
import { ArrowRight, Check, ChevronDown, Minus, Package, Plus, ShieldCheck, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

import packSachet from "@/assets/pack-sachet.webp";
import packPads from "@/assets/pack-pads.webp";
import packOil from "@/assets/pack-oil.webp";
import packSpray from "@/assets/pack-spray.webp";
import bentoBalance from "@/assets/bento-balance.webp";
import bentoChange from "@/assets/bento-change.webp";
import bentoJeller from "@/assets/bento-jeller.webp";
import bentoPads from "@/assets/bento-pads.webp";
import bentoYag from "@/assets/bento-yag.webp";
import bentoSprey from "@/assets/bento-sprey.webp";

/* ---------------- Types & catalog ---------------- */

type ProductId =
  // Pedler
  | "ped-gunluk"
  | "ped-gunduz"
  | "ped-gece"
  // Takviyeler
  | "balance-sase"
  | "change-kapsul"
  // Bakım Jelleri
  | "jel-daily"
  | "jel-sens"
  | "jel-flow"
  | "jel-50"
  // Yağ & Sprey
  | "yag-cycle-care"
  | "sprey-intim";

type Category = "ped" | "supplement" | "gel" | "ritual";

interface CatalogItem {
  id: ProductId;
  name: string;
  short: string;
  price: number;
  image: string;
  category: Category;
  badge?: string;
}

const CATALOG: CatalogItem[] = [
  /* Pedler */
  {
    id: "ped-gunluk",
    name: "Günlük Ped",
    short: "Hafif akıntı · nefes alabilen · 20 adet",
    price: 79,
    image: bentoPads,
    category: "ped",
  },
  {
    id: "ped-gunduz",
    name: "Gündüz Ped",
    short: "Normal akış · gündüz koruması · 10 adet",
    price: 95,
    image: packPads,
    category: "ped",
  },
  {
    id: "ped-gece",
    name: "Gece Ped",
    short: "Yoğun akış · uzun gece koruması · 8 adet",
    price: 125,
    image: bentoPads,
    category: "ped",
  },

  /* Takviyeler */
  {
    id: "balance-sase",
    name: ".ki Balance · Saşe",
    short: "Regl döngüsü destek takviyesi · 30 saşe",
    price: 395,
    image: packSachet,
    category: "supplement",
    badge: "EN POPÜLER",
  },
  {
    id: "change-kapsul",
    name: ".ki Change · Kapsül",
    short: "Peri-menopoz & menopoz desteği · 60 kapsül",
    price: 449,
    image: bentoChange,
    category: "supplement",
  },

  /* Bakım Jelleri */
  {
    id: "jel-daily",
    name: "Bakım Jeli · Daily",
    short: "Günlük pH dengeli intim temizleyici · 200 ml",
    price: 145,
    image: bentoJeller,
    category: "gel",
  },
  {
    id: "jel-sens",
    name: "Bakım Jeli · Sens",
    short: "Hassas ciltler için yatıştırıcı bakım · 200 ml",
    price: 155,
    image: bentoJeller,
    category: "gel",
  },
  {
    id: "jel-flow",
    name: "Bakım Jeli · Flow",
    short: "Regl döneminde rahatlatıcı bakım · 200 ml",
    price: 165,
    image: bentoJeller,
    category: "gel",
  },
  {
    id: "jel-50",
    name: "Bakım Jeli · 50+",
    short: "Menopoz dönemi için nemlendirici bakım · 200 ml",
    price: 175,
    image: bentoJeller,
    category: "gel",
  },

  /* Yağ & Sprey */
  {
    id: "yag-cycle-care",
    name: "Cycle Care Yağı",
    short: "Karın masaj yağı · lavanta & papatya · 10 ml",
    price: 189,
    image: packOil,
    category: "ritual",
  },
  {
    id: "sprey-intim",
    name: "İntim Bakım Spreyi",
    short: "Anlık ferahlama · pH dostu · 100 ml",
    price: 139,
    image: bentoSprey ?? packSpray,
    category: "ritual",
  },
];

const CATEGORIES: {
  key: Category;
  label: string;
  description: string;
  hint: string;
}[] = [
  {
    key: "ped",
    label: "Pedler",
    description: "Organik pamuk üst yüzey, parfümsüz, dermatolojik test edilmiş.",
    hint: "Çoğu kullanıcı 1 Günlük, 1 Gündüz ve 1 Gece Ped tercih ediyor.",
  },
  {
    key: "supplement",
    label: "Takviyeler",
    description: ".ki Balance saşe ve .ki Change kapsül — döngü ve menopoz için günlük destek.",
    hint: "Kullanıcılarımızın çoğu 1 kutu Balance ile başlıyor.",
  },
  {
    key: "gel",
    label: "Bakım Jelleri",
    description: "Daily · Sens · Flow · 50+ — döneminin ihtiyacına göre intim bakım jelleri.",
    hint: "Günlük için Daily, regl için Flow, hassas ciltler için Sens öneriyoruz.",
  },
  {
    key: "ritual",
    label: "Yağ & Sprey",
    description: "Cycle Care Yağı ve İntim Bakım Spreyi ile rahatlama ritüelin.",
    hint: "Karın bölgene 2-3 damla yağ ile masaj yapabilirsin.",
  },
];

/* ---------------- Component ---------------- */

const FREE_SHIPPING_THRESHOLD = 750;

const PaketOlustur = () => {
  useReveal();
  const [quantities, setQuantities] = useState<Record<ProductId, number>>({} as Record<ProductId, number>);
  const [openCategories, setOpenCategories] = useState<Record<Category, boolean>>({
    supplement: true,
    ped: true,
    intim: false,
    ritual: false,
  });
  const [activeTab, setActiveTab] = useState<Category>("supplement");

  const setQty = (id: ProductId, next: number) => {
    setQuantities((q) => {
      const value = Math.max(0, Math.min(20, next));
      const copy = { ...q };
      if (value === 0) delete copy[id];
      else copy[id] = value;
      return copy;
    });
  };

  const totals = useMemo(() => {
    const items = CATALOG.filter((c) => (quantities[c.id] ?? 0) > 0).map((c) => ({
      ...c,
      qty: quantities[c.id] ?? 0,
    }));
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);
    const discount = subtotal >= 1200 ? Math.round(subtotal * 0.15) : subtotal >= 600 ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal - discount;
    const shippingProgress = Math.min(1, total / FREE_SHIPPING_THRESHOLD);
    return { items, itemCount, subtotal, discount, total, shippingProgress };
  }, [quantities]);

  const tabsCount = (cat: Category) =>
    CATALOG.filter((c) => c.category === cat).reduce((sum, c) => sum + (quantities[c.id] ?? 0), 0);

  return (
    <div className="bg-background min-h-screen">
      <AnnouncementBar />
      <SiteNav />

      {/* Hero */}
      <section className="border-b border-border/60">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-10 sm:py-14 lg:py-16">
          <nav className="flex items-center gap-2 text-[12px] text-muted-foreground mb-5">
            <Link to="/" className="hover:text-primary transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-primary font-semibold">Paketini Oluştur</span>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-primary/70 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-rose" /> Sana özel
              </span>
              <h1 className="font-display font-medium text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] tracking-tight text-primary">
                Paketini Oluştur
              </h1>
              <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-muted-foreground">
                İhtiyacına göre Balance, Change, Ped ve ritüel ürünlerini birleştir. 2 ayda bir kapına gelsin —
                istediğin zaman değiştir veya durdur.
              </p>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[12.5px] text-primary/80 font-medium">
              <li className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sage" /> İptal yok, esnek abonelik</li>
              <li className="flex items-center gap-1.5"><Truck className="w-3.5 h-3.5 text-sage" /> 750₺ üzeri ücretsiz kargo</li>
              <li className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-sage" /> Dermatolojik test edilmiş</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Builder */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-10 items-start">
          {/* Left: Categories */}
          <div>
            {/* Tabs */}
            <div className="sticky top-14 z-20 -mx-5 sm:-mx-8 lg:mx-0 mb-6 bg-background/95 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-0">
              <div className="flex gap-1 overflow-x-auto hide-scrollbar px-5 sm:px-8 lg:px-0 py-3 lg:py-0 border-b border-border/60 lg:border-0">
                {CATEGORIES.map((cat) => {
                  const count = tabsCount(cat.key);
                  const isActive = activeTab === cat.key;
                  return (
                    <button
                      key={cat.key}
                      onClick={() => {
                        setActiveTab(cat.key);
                        setOpenCategories((o) => ({ ...o, [cat.key]: true }));
                        const el = document.getElementById(`cat-${cat.key}`);
                        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                      className={`relative shrink-0 text-[13px] font-semibold py-2.5 px-4 rounded-full transition-all border ${
                        isActive
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary text-primary border-transparent hover:bg-accent"
                      }`}
                    >
                      {cat.label}
                      {count > 0 && (
                        <span
                          className={`ml-2 inline-flex items-center justify-center min-w-[20px] h-5 rounded-full text-[11px] font-bold ${
                            isActive ? "bg-primary-foreground text-primary" : "bg-rose text-primary-foreground"
                          }`}
                        >
                          {count}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-4">
              {CATEGORIES.map((cat) => {
                const items = CATALOG.filter((c) => c.category === cat.key);
                const isOpen = openCategories[cat.key];
                return (
                  <div
                    key={cat.key}
                    id={`cat-${cat.key}`}
                    className="border border-border/70 rounded-2xl bg-card overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenCategories((o) => ({ ...o, [cat.key]: !o[cat.key] }))}
                      className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left hover:bg-accent/40 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <h2 className="font-display text-[22px] sm:text-[26px] font-medium text-primary leading-tight">
                            {cat.label}
                          </h2>
                          {tabsCount(cat.key) > 0 && (
                            <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-rose text-primary-foreground text-[11px] font-bold">
                              {tabsCount(cat.key)}
                            </span>
                          )}
                        </div>
                        <p className="text-[13px] text-muted-foreground mt-1">{cat.description}</p>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-primary shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {isOpen && (
                      <div className="border-t border-border/60">
                        <ul className="divide-y divide-border/60">
                          {items.map((item) => {
                            const qty = quantities[item.id] ?? 0;
                            const isSelected = qty > 0;
                            return (
                              <li
                                key={item.id}
                                className={`flex items-center gap-4 sm:gap-5 p-4 sm:p-5 transition-colors ${
                                  isSelected ? "bg-secondary/40" : "bg-card"
                                }`}
                              >
                                <div className="relative shrink-0 w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden bg-cream-2 border border-border/60">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <h3 className="text-[14.5px] sm:text-[15px] font-semibold text-primary leading-tight">
                                      {item.name}
                                    </h3>
                                    {item.badge && (
                                      <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider text-rose bg-rose-light px-1.5 py-0.5 rounded">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[12.5px] text-muted-foreground mt-0.5 line-clamp-2">{item.short}</p>
                                  <p className="text-[13px] font-semibold text-primary mt-1">
                                    ₺{item.price.toLocaleString("tr-TR")}
                                  </p>
                                </div>
                                <div className="shrink-0 flex items-center gap-1 bg-background border border-border rounded-full p-1">
                                  <button
                                    onClick={() => setQty(item.id, qty - 1)}
                                    disabled={qty === 0}
                                    aria-label={`${item.name} azalt`}
                                    className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                  >
                                    <Minus className="w-3.5 h-3.5" />
                                  </button>
                                  <span className="min-w-[24px] text-center text-[14px] font-bold text-primary tabular-nums">
                                    {qty}
                                  </span>
                                  <button
                                    onClick={() => setQty(item.id, qty + 1)}
                                    aria-label={`${item.name} arttır`}
                                    className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary-medium transition-colors"
                                  >
                                    <Plus className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                        <div className="px-5 sm:px-6 py-3.5 bg-sage-light/50 border-t border-border/60">
                          <p className="text-[12.5px] text-sage flex items-start gap-2">
                            <span className="mt-0.5">💡</span>
                            <span>{cat.hint}</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Summary */}
          <aside className="lg:sticky lg:top-20">
            <div className="bg-card border border-border/70 rounded-2xl p-6 sm:p-7 shadow-[var(--shadow-md)]">
              <div className="flex items-center justify-between gap-3 mb-1">
                <h3 className="font-display text-[24px] font-medium text-primary">Paketin</h3>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sage bg-sage-light px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-sage" /> 2 ayda bir kapında
                </span>
              </div>
              <p className="text-[12.5px] text-muted-foreground">
                {totals.itemCount === 0
                  ? "Sol taraftan ürün ekleyerek paketini oluştur."
                  : `${totals.itemCount} ürün seçildi.`}
              </p>

              {totals.items.length > 0 && (
                <ul className="mt-5 space-y-3 max-h-[280px] overflow-y-auto pr-1">
                  {totals.items.map((it) => (
                    <li key={it.id} className="flex items-center gap-3">
                      <div className="relative w-11 h-11 rounded-lg overflow-hidden bg-cream-2 border border-border/60 shrink-0">
                        <img src={it.image} alt={it.name} className="w-full h-full object-cover" loading="lazy" />
                        <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                          {it.qty}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-primary leading-tight truncate">{it.name}</p>
                        <p className="text-[11.5px] text-muted-foreground">
                          ₺{it.price.toLocaleString("tr-TR")} × {it.qty}
                        </p>
                      </div>
                      <p className="text-[13px] font-bold text-primary tabular-nums">
                        ₺{(it.price * it.qty).toLocaleString("tr-TR")}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {/* Free shipping progress */}
              <div className="mt-5 p-3.5 rounded-xl bg-secondary">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-4 h-4 text-primary" />
                  <p className="text-[12px] font-semibold text-primary">
                    {totals.total >= FREE_SHIPPING_THRESHOLD
                      ? "Ücretsiz kargo hak ettin 🎉"
                      : `Ücretsiz kargoya ₺${(FREE_SHIPPING_THRESHOLD - totals.total).toLocaleString("tr-TR")} kaldı`}
                  </p>
                </div>
                <div className="h-1.5 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-rose transition-all duration-500"
                    style={{ width: `${totals.shippingProgress * 100}%` }}
                  />
                </div>
              </div>

              {/* Totals */}
              <dl className="mt-5 space-y-2 text-[13.5px]">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Ara toplam</dt>
                  <dd className="font-semibold text-primary tabular-nums">
                    ₺{totals.subtotal.toLocaleString("tr-TR")}
                  </dd>
                </div>
                {totals.discount > 0 && (
                  <div className="flex items-center justify-between">
                    <dt className="text-rose font-medium">Paket indirimi</dt>
                    <dd className="font-semibold text-rose tabular-nums">
                      −₺{totals.discount.toLocaleString("tr-TR")}
                    </dd>
                  </div>
                )}
                <div className="flex items-center justify-between pt-3 border-t border-border/60">
                  <dt className="font-display text-[18px] font-medium text-primary">Toplam</dt>
                  <dd className="font-display text-[22px] font-medium text-primary tabular-nums">
                    ₺{totals.total.toLocaleString("tr-TR")}
                  </dd>
                </div>
              </dl>

              <button
                disabled={totals.itemCount === 0}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground text-[14px] font-bold py-3.5 px-5 rounded-full hover:bg-primary-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {totals.itemCount === 0 ? "Önce ürün ekle" : "Sepete ekle"}
                {totals.itemCount > 0 && <ArrowRight className="w-4 h-4" />}
              </button>

              <ul className="mt-5 space-y-2 text-[11.5px] text-muted-foreground">
                <li className="flex items-center gap-2"><Check className="w-3 h-3 text-sage" /> İstediğin an iptal et / atla</li>
                <li className="flex items-center gap-2"><Check className="w-3 h-3 text-sage" /> Ücretsiz iade ve değişim</li>
                <li className="flex items-center gap-2"><Check className="w-3 h-3 text-sage" /> 2 iş günü içinde kargoda</li>
              </ul>
            </div>

            {/* How it works */}
            <div className="mt-5 bg-cream-2/60 border border-border/60 rounded-2xl p-5">
              <h4 className="font-display text-[18px] font-medium text-primary mb-3 flex items-center gap-2">
                <Package className="w-4 h-4" /> Nasıl çalışır?
              </h4>
              <ol className="space-y-2.5 text-[12.5px] text-primary/80">
                <li className="flex gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">1</span>
                  İhtiyacın olan ürünleri ve adetleri seç.
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">2</span>
                  2 ayda bir, ücretsiz olarak kapına gelsin.
                </li>
                <li className="flex gap-2.5">
                  <span className="shrink-0 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">3</span>
                  İçeriğini istediğin zaman güncelle, atla veya durdur.
                </li>
              </ol>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />

      {/* Mobile sticky summary */}
      {totals.itemCount > 0 && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-background border-t border-border/70 px-5 py-3 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.15)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[11px] text-muted-foreground">{totals.itemCount} ürün · Toplam</p>
              <p className="font-display text-[20px] font-medium text-primary">
                ₺{totals.total.toLocaleString("tr-TR")}
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.querySelector("aside");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-[13px] font-bold py-3 px-5 rounded-full hover:bg-primary-medium transition-all"
            >
              Sepete ekle <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaketOlustur;
