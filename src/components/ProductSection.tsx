import { useRef, useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

type PlanId = "single" | "triple";

interface ProductSectionProps {
  product: ShopifyProduct | null | undefined;
  isLoading?: boolean;
}

const ProductSection = ({ product, isLoading }: ProductSectionProps) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [plan, setPlan] = useState<PlanId>("single");
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  const variant = product?.node.variants.edges[0]?.node;
  const basePrice = variant ? parseFloat(variant.price.amount) : 0;
  const currency = variant?.price.currencyCode === "TRY" ? "₺" : variant?.price.currencyCode || "";

  const plans: Record<PlanId, { price: number; label: string; sub: string; badge?: string }> = {
    single: {
      price: basePrice,
      label: "Tek seferlik satın al",
      sub: "30 günlük kullanım",
    },
    triple: {
      price: Math.round(basePrice * 3 * 0.85),
      label: "3'lü paket satın al & %15 tasarruf",
      sub: "3 aylık kullanım + Eczacı ile 15 dk özel takviye rutini hazırlama hizmeti",
      badge: "EN POPÜLER",
    },
  };
  const active = plans[plan];

  const handleScroll = useCallback(() => {
    if (!galleryRef.current) return;
    const idx = Math.round(galleryRef.current.scrollLeft / galleryRef.current.offsetWidth);
    setActiveSlide(idx);
  }, []);

  const handleAdd = async () => {
    if (!product || !variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  const images = product?.node.images.edges.map((e) => e.node) ?? [];
  const fallbackTiles = ["📖", "🌱", "✅"];

  return (
    <section className="py-14" id="k5Product">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 items-start">
          {/* Gallery */}
          <div className="k5-reveal relative rounded-[20px] overflow-hidden bg-card shadow-md">
            <div
              ref={galleryRef}
              className="flex overflow-x-auto scroll-snap-x mandatory hide-scrollbar"
              onScroll={handleScroll}
            >
              {images.length > 0
                ? images.slice(0, 3).map((img, i) => (
                    <div
                      key={i}
                      className="flex-none w-full snap-start aspect-square bg-secondary/30"
                    >
                      <img
                        src={img.url}
                        alt={img.altText ?? product?.node.title ?? ".ki Balance"}
                        className="w-full h-full object-cover"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  ))
                : fallbackTiles.map((emoji, i) => (
                    <div
                      key={i}
                      className={`flex-none w-full snap-start aspect-square flex items-center justify-center ${
                        i === 1 ? "bg-secondary" : i === 2 ? "bg-cream-2" : "bg-plum-pale"
                      }`}
                    >
                      <span className="text-[64px] opacity-30">{emoji}</span>
                    </div>
                  ))}
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {(images.length > 0 ? images.slice(0, 3) : fallbackTiles).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full bg-primary transition-opacity ${
                    activeSlide === i ? "opacity-100" : "opacity-25"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="k5-reveal k5-reveal-d2">
            <div className="inline-flex items-center gap-1.5 bg-secondary text-primary text-xs font-bold py-1.5 px-3.5 rounded-full mb-4">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              90+ kişi bu ürünü satın aldı
            </div>
            <h2 className="text-2xl font-extrabold text-foreground mb-2 leading-tight">
              {product?.node.title || ".ki Balance — PMS Destek"}
            </h2>
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {product?.node.description ||
                "Döngüsel dengeniz için bilimsel formülasyon. Vitex, Magnezyum, B6 ve Çinko ile her ayı rahat geçirin."}
            </p>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-base text-star tracking-wide">★★★★★</span>
              <span className="text-[13px] text-muted-foreground font-medium">5.0 (90+ yorum)</span>
            </div>
            <div className="text-[13px] text-amber font-semibold mb-4 flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Stokta sadece 12 adet kaldı
            </div>

            {/* Plan seçimi */}
            <div className="flex flex-col gap-2.5 mb-4">
              {(Object.keys(plans) as PlanId[]).map((key) => {
                const p = plans[key];
                const selected = plan === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setPlan(key)}
                    className={`relative text-left rounded-2xl border-2 px-4 py-3.5 transition-all ${
                      selected
                        ? "border-primary bg-secondary/60 shadow-[0_4px_16px_rgba(45,27,105,0.12)]"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-2 right-3 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                        {p.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                          selected ? "border-primary bg-primary" : "border-border bg-card"
                        }`}
                      >
                        {selected && <span className="w-2 h-2 rounded-full bg-primary-foreground" />}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-[13.5px] font-bold text-foreground">{p.label}</span>
                          <span className="text-[15px] font-extrabold text-primary whitespace-nowrap">
                            {currency}
                            {p.price.toLocaleString("tr-TR")}
                          </span>
                        </div>
                        <div className="text-[11.5px] text-muted-foreground mt-0.5">{p.sub}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleAdd}
              disabled={!variant || cartLoading || isLoading}
              className="flex items-center justify-center gap-2.5 w-full bg-primary text-primary-foreground text-base font-bold py-4 px-8 rounded-full min-h-[52px] transition-all hover:bg-primary-medium hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(45,27,105,0.3)] relative overflow-hidden mb-5 disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {cartLoading || isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              )}
              {plan === "triple" ? "3'lü Paket Sepete Ekle" : "Sepete ekle"} — {currency}
              {active.price.toLocaleString("tr-TR")}
            </button>
            <div className="flex items-center justify-center gap-5 sm:gap-6 flex-wrap">
              {[
                { icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z", label: "Güvenli ödeme" },
                {
                  icon: "M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM18.5 18.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
                  label: "Ücretsiz kargo",
                },
                { icon: "M20 12V8H6a2 2 0 0 1 0-4h12v4M4 6v12a2 2 0 0 0 2 2h14v-4M18 12a2 2 0 0 0 0 4h4v-4z", label: "Eczacı desteği" },
              ].map((t) => (
                <div key={t.label} className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                  <svg className="w-4 h-4 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d={t.icon} />
                  </svg>
                  {t.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ürün bilgisi */}
        <div className="k5-reveal mt-12 pt-10 border-t border-border/60 flex flex-col items-center text-center">
          <p className="text-[15px] font-bold text-foreground mb-1">
            .Ki Magnezyum ve Hayıt İçeren Takviye Edici Gıda
          </p>
          <p className="text-[13px] text-muted-foreground font-medium">
            Takviye Edici Gıda Onay Numarası: 024990-06.11.2025
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
