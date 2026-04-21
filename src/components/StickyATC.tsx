import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";
import type { ShopifyProduct } from "@/lib/shopify";

interface StickyATCProps {
  product: ShopifyProduct | null | undefined;
  isLoading?: boolean;
}

const StickyATC = ({ product, isLoading }: StickyATCProps) => {
  const [visible, setVisible] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const cartLoading = useCartStore((s) => s.isLoading);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    const hero = document.querySelector("#heroSection");
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const variant = product?.node.variants.edges[0]?.node;
  const priceLabel = variant
    ? `${variant.price.currencyCode === "TRY" ? "₺" : variant.price.currencyCode} ${parseFloat(variant.price.amount).toLocaleString("tr-TR")}`
    : "";

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

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] bg-card border-t border-primary/[0.08] py-2.5 px-4 flex items-center justify-center gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] transition-transform duration-400 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        onClick={handleAdd}
        disabled={!variant || cartLoading || isLoading}
        className="flex-1 max-w-[360px] flex flex-col items-center justify-center gap-0.5 bg-primary text-primary-foreground py-2.5 px-6 rounded-full min-h-[52px] transition-all hover:bg-primary-medium relative overflow-hidden disabled:opacity-60"
      >
        <span className="text-[14px] font-bold leading-tight flex items-center gap-1.5">
          {cartLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          )}
          .ki Balance — Sepete Ekle
        </span>
        <span className="text-[11px] font-medium opacity-90 leading-tight">
          {priceLabel ? `${priceLabel} · 30 günlük kullanım` : "Yükleniyor..."}
        </span>
      </button>
    </div>
  );
};

export default StickyATC;
