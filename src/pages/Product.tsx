import { useState } from "react";
import {
  Check,
  Leaf,
  ShieldCheck,
  Sparkles,
  Heart,
  Droplet,
  Wind,
  Flower2,
  Star,
  ShoppingBag,
  CalendarCheck,
  Package as PackageIcon,
  RefreshCw,
} from "lucide-react";

import AnnouncementBar from "@/components/AnnouncementBar";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

import packPads from "@/assets/pack-pads.webp";
import bentoPads from "@/assets/bento-pads.webp";
import heroPads from "@/assets/hero-pads.webp";
import allProductsGrid from "@/assets/all-products-grid.webp";

/* ---------------- Types ---------------- */

type PurchaseOption = "single" | "triple";

interface OptionConfig {
  id: PurchaseOption;
  label: string;
  qty: string;
  price: number;
  unitPrice: number;
  badge?: string;
  description: string;
}

const OPTIONS: OptionConfig[] = [
  {
    id: "single",
    label: "Tekli Alım",
    qty: "1 Paket",
    price: 199,
    unitPrice: 199,
    description: "Tek seferlik deneme alımı",
  },
  {
    id: "triple",
    label: "Üçlü Alım",
    qty: "3 Paket",
    price: 519,
    unitPrice: 173,
    badge: "%13 indirim",
    description: "3 ay yetecek paket — bir kerede al",
  },
];

const SUBSCRIPTION_DISCOUNT = 0.1; // %10

const BENEFITS = [
  {
    Icon: Leaf,
    title: "Doğal Bileşenler",
    text: "Pelin Otu (Mugwort) infüzyonlu, kimyasal katkısız.",
  },
  {
    Icon: Droplet,
    title: "Yüksek Emicilik",
    text: "Sızıntısız koruma için gelişmiş emici çekirdek.",
  },
  {
    Icon: Wind,
    title: "Nefes Alan Yapı",
    text: "Bambu fiber dokusu cildi serin tutar, terletmez.",
  },
  {
    Icon: ShieldCheck,
    title: "Dermatolojik Test",
    text: "SLS / SLES / paraben içermez. pH dengeli formül.",
  },
  {
    Icon: Heart,
    title: "Hassas Cilt Dostu",
    text: "İritasyon yapmayan yumuşak yüzey ile tahriş riskini azaltır.",
  },
  {
    Icon: Flower2,
    title: "Doğal Koku Kontrolü",
    text: "Pelin Otu sayesinde gün boyu tazelik hissi.",
  },
];

const PROCESS_STEPS = [
  {
    Icon: ShoppingBag,
    title: "Sipariş Ver",
    text: "İstediğin paketi seç ve birkaç tıkla siparişini oluştur.",
  },
  {
    Icon: CalendarCheck,
    title: "Onaylansın",
    text: "Sipariş ekibimize ulaşır, kargon hızlıca hazırlanır.",
  },
  {
    Icon: PackageIcon,
    title: "Kapına Gelsin",
    text: "Ücretsiz kargo ile ürünün özenle paketlenip sana ulaşır.",
  },
  {
    Icon: RefreshCw,
    title: "Her Ay Tekrar",
    text: "Aboneliğinde sıklığı kolayca ayarla, dilediğin an iptal et.",
  },
];

const GALLERY_IMAGES = [packPads, bentoPads, heroPads, allProductsGrid];

const USER_GALLERY = [
  bentoPads,
  packPads,
  heroPads,
  allProductsGrid,
  bentoPads,
  packPads,
];

/* ---------------- Page ---------------- */

const Product = () => {
  useReveal();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedOption, setSelectedOption] =
    useState<PurchaseOption>("triple");
  const [subscribe, setSubscribe] = useState(true);

  const baseOption = OPTIONS.find((o) => o.id === selectedOption)!;
  const finalPrice = subscribe
    ? Math.round(baseOption.price * (1 - SUBSCRIPTION_DISCOUNT))
    : baseOption.price;

  return (
    <div className="bg-background min-h-screen pb-20 lg:pb-0 font-primary">
      <AnnouncementBar />
      <SiteNav />

      {/* ============== HERO / PRODUCT TOP ============== */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-8 lg:pt-12 pb-10 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Gallery */}
          <div className="k5-reveal">
            <div className="relative rounded-3xl overflow-hidden bg-[hsl(var(--rose-light))] aspect-[4/5] sm:aspect-square">
              <img
                src={GALLERY_IMAGES[activeImage]}
                alt=".ki Ürün"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {GALLERY_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Görsel ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      activeImage === i ? "bg-primary w-6" : "bg-primary/30 w-2"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-4 gap-3">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    activeImage === i
                      ? "border-primary"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="k5-reveal k5-reveal-d2 lg:sticky lg:top-24">
            <p className="text-[12px] uppercase tracking-[0.2em] text-rose font-bold mb-3">
              .ki Koleksiyonu
            </p>
            <h1 className="font-medium text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.05] tracking-tight text-primary">
              .ki Ürün
            </h1>

            <div className="mt-3 flex items-center gap-2 text-[13px] text-muted-foreground">
              <span className="text-star tracking-wide">★★★★★</span>
              <span className="font-semibold text-primary">4.9</span>
              <span>/ 5</span>
              <span className="opacity-70">(1.240+ değerlendirme)</span>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-foreground/80">
              Soft Cotton & Bamboo Fiber üst yüzey ve nefes alan arka yüzeyle
              hassas ciltler için tasarlandı. Mugwort (Pelin Otu) infüzyonlu
              doğal bakım formülü; SLS / SLES içermez.
            </p>

            {/* Purchase options */}
            <div className="mt-7">
              <h2 className="text-[16px] font-semibold text-primary mb-3">
                Satın alma seçeneği
              </h2>
              <div className="space-y-2.5">
                {OPTIONS.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setSelectedOption(opt.id)}
                      className={`w-full text-left relative flex items-center gap-4 rounded-2xl border p-4 transition-all ${
                        isSelected
                          ? "border-primary bg-secondary/60 shadow-[0_4px_16px_-8px_hsl(var(--primary)/0.3)]"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      {opt.badge && (
                        <span className="absolute -top-2 right-4 bg-rose text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                          {opt.badge}
                        </span>
                      )}

                      {/* Radio */}
                      <span
                        className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                          isSelected
                            ? "border-primary bg-primary"
                            : "border-border"
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-primary-foreground" />
                        )}
                      </span>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-[14.5px] font-bold text-primary leading-tight">
                            {opt.label}
                          </h3>
                          <span className="text-[11.5px] text-muted-foreground">
                            · {opt.qty}
                          </span>
                        </div>
                        <p className="text-[12px] text-muted-foreground mt-0.5">
                          {opt.description}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-[15px] font-extrabold text-primary tabular-nums">
                          {opt.price}₺
                        </p>
                        <p className="text-[10.5px] text-muted-foreground tabular-nums">
                          {opt.unitPrice}₺ / paket
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Subscription toggle — emphasized */}
            <div
              className={`mt-5 rounded-2xl p-4 sm:p-5 transition-all ${
                subscribe
                  ? "bg-gradient-to-br from-primary/10 via-secondary to-rose/10 border-2 border-primary shadow-[0_8px_24px_-12px_hsl(var(--primary)/0.4)]"
                  : "bg-secondary/50 border-2 border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-9 h-9 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                    subscribe ? "bg-primary text-primary-foreground" : "bg-card text-primary"
                  }`}
                >
                  <RefreshCw className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[15px] text-primary leading-tight">
                      Aboneliğe Geç
                    </span>
                    <span className="inline-flex items-center bg-rose text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full tracking-wide">
                      %10 İNDİRİM
                    </span>
                  </div>
                  <div className="text-[12.5px] text-muted-foreground mt-0.5 leading-snug">
                    Her ay otomatik kapına gelsin · İstediğin an iptal et
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={subscribe}
                  onClick={() => setSubscribe((s) => !s)}
                  className={`relative shrink-0 w-12 h-7 rounded-full transition-colors ${
                    subscribe ? "bg-primary" : "bg-border"
                  }`}
                >
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 left-0.5 w-6 h-6 rounded-full bg-card shadow-md transition-transform ${
                      subscribe ? "translate-x-[20px]" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>

              {subscribe && (
                <ul className="mt-3 pt-3 border-t border-primary/15 grid grid-cols-1 gap-1.5 text-[12px] text-primary/85 font-medium">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                    Ücretsiz kargo · Önceliklendirilmiş gönderim
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                    Sıklığı dilediğin gibi ayarla
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-sage shrink-0" />
                    Tek tıkla iptal · Bağlayıcı sözleşme yok
                  </li>
                </ul>
              )}
            </div>

            {/* CTA */}
            <button
              type="button"
              className="group mt-6 w-full inline-flex items-center justify-between gap-3 rounded-full bg-primary text-primary-foreground py-4 px-5 sm:px-6 hover:bg-primary-medium transition-all shadow-[0_8px_28px_-12px_hsl(var(--primary)/0.5)] active:scale-[0.99]"
            >
              <span className="inline-flex items-center gap-2.5 text-[15px] font-bold">
                <ShoppingBag className="w-4.5 h-4.5" />
                {subscribe ? "Aboneliği Başlat" : "Sepete Ekle"}
              </span>
              <span className="inline-flex items-center gap-2 text-[15px] font-extrabold tabular-nums">
                {subscribe && (
                  <span className="text-primary-foreground/60 line-through text-[12.5px] font-semibold">
                    {baseOption.price}₺
                  </span>
                )}
                {finalPrice}₺
              </span>
            </button>

            <p className="mt-2.5 text-center text-[11.5px] text-muted-foreground">
              500₺ üzeri siparişlerde ücretsiz kargo · 30 gün iade garantisi
            </p>

            {/* Trust badges */}
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-primary/80 font-medium">
              <li className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-sage" /> Mugwort infüzyonlu
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sage" /> SLS / SLES içermez
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sage" /> Nefes alan yapı
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============== BENEFITS ============== */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
          <div className="text-center max-w-2xl mx-auto k5-reveal">
            <p className="text-[12px] uppercase tracking-[0.2em] text-rose font-bold mb-3">
              Neden .ki?
            </p>
            <h2 className="font-medium text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-primary tracking-tight">
              Cildine ve döngüne iyi gelen bir formül
            </h2>
            <p className="mt-4 text-[14.5px] text-muted-foreground">
              Her detayı seninle birlikte yaşadığın anların konforu için tasarlandı.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-14 items-center">
            {/* Image */}
            <div className="k5-reveal rounded-3xl overflow-hidden aspect-[4/5] bg-[hsl(var(--rose-light))]">
              <img
                src={bentoPads}
                alt="Ürün faydaları"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Benefits grid */}
            <div className="k5-reveal k5-reveal-d2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {BENEFITS.map(({ Icon, title, text }) => (
                <div
                  key={title}
                  className="rounded-2xl bg-card border border-border/60 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary/80 flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-[15px] font-bold text-primary leading-tight">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-[13px] text-muted-foreground leading-relaxed">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============== SHIPPING / PROCESS ============== */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
        <div className="text-center max-w-2xl mx-auto k5-reveal">
          <p className="text-[12px] uppercase tracking-[0.2em] text-rose font-bold mb-3">
            Nasıl Çalışır?
          </p>
          <h2 className="font-medium text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-primary tracking-tight">
            Sipariş ver, gerisini bize bırak
          </h2>
          <p className="mt-4 text-[14.5px] text-muted-foreground">
            Birkaç adımda kapına ulaşan, dilediğin an yönetebileceğin bir abonelik deneyimi.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6">
          {PROCESS_STEPS.map(({ Icon, title, text }, i) => (
            <div
              key={title}
              className={`k5-reveal k5-reveal-d${i + 1} relative rounded-2xl sm:rounded-3xl bg-card border border-border/60 p-4 sm:p-6 lg:p-7`}
            >
              <span className="absolute top-2 right-3 sm:top-4 sm:right-5 text-[28px] sm:text-[40px] font-bold text-primary/10 leading-none tabular-nums">
                {i + 1}
              </span>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-secondary flex items-center justify-center mb-3 sm:mb-4">
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <h3 className="text-[14px] sm:text-[16px] font-bold text-primary leading-tight">
                {title}
              </h3>
              <p className="mt-1.5 sm:mt-2 text-[12px] sm:text-[13px] text-muted-foreground leading-relaxed">
                {text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ============== USER GALLERY ============== */}
      <section className="bg-secondary/40 border-t border-border/60">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10 k5-reveal">
            <div className="max-w-xl">
              <p className="text-[12px] uppercase tracking-[0.2em] text-rose font-bold mb-3">
                #kiTopluluğu
              </p>
              <h2 className="font-medium text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-primary tracking-tight">
                Topluluğumuzdan
              </h2>
              <p className="mt-3 text-[14.5px] text-muted-foreground">
                Kullanıcılarımızın paylaştığı anlardan bir seçki.
              </p>
            </div>
            <div className="flex items-center gap-2 text-[13px] text-primary/80">
              <Star className="w-4 h-4 text-star fill-star" />
              <span className="font-semibold">2.500+ paylaşım</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {USER_GALLERY.map((img, i) => (
              <button
                key={i}
                className="group relative aspect-square rounded-2xl overflow-hidden bg-[hsl(var(--rose-light))] k5-reveal"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <img
                  src={img}
                  alt={`Topluluk paylaşımı ${i + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Product;
