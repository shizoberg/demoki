import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Leaf,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import AnnouncementBar from "@/components/AnnouncementBar";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

import bentoPads from "@/assets/bento-pads.webp";
import packPads from "@/assets/pack-pads.webp";

/* ---------------- Types & catalog ---------------- */

type PadId = "gunluk" | "gunduz" | "gece";

interface PadVariant {
  id: PadId;
  name: string;
  fullName: string;
  short: string;
  description: string;
  drops: 1 | 2 | 3 | 4;
  size: string; // örn. "155 mm"
  perBox: number; // paket başına adet
  material: string;
  image: string;
  badge?: string;
}

const PADS: PadVariant[] = [
  {
    id: "gunluk",
    name: "Günlük Ped",
    fullName: ".ki Günlük Ped (Panty Liner)",
    short: "Hafif akıntı · günlük tazelik",
    description:
      "Hassas ciltler için tasarlanmış ultra ince günlük ped. Hafif akıntılar, lekelenmeler veya ekstra tazelik ihtiyacı için ideal. Pelin Otu ekstresi ile doğal antibakteriyel koruma ve koku kontrolü; cildin doğal pH dengesini korurken nefes alan dokusuyla tahrişi önler.",
    drops: 1,
    size: "155 mm",
    perBox: 30,
    material: "Soft Cotton & Bamboo Fiber üst yüzey, breathable arka yüzey",
    image: bentoPads,
  },
  {
    id: "gunduz",
    name: "Gündüz Pedi",
    fullName: ".ki Gündüz Pedi (Sanitary Pad — Day)",
    short: "Orta yoğun akış · gündüz koruması",
    description:
      "Menstrual dönemdeki orta yoğunluktaki akıntılar için tasarlanmış. Gelişmiş emilim teknolojisiyle güçlendirilmiş süper emici katman, günün en hareketli anlarında dahi yüksek koruma sağlar. Pelin Otu özleri doğal antibakteriyel bariyeri ile koku ve enfeksiyon riskine karşı korur; ergonomik tasarımıyla varlığını unutturur.",
    drops: 3,
    size: "245 mm",
    perBox: 12,
    material: "Soft Cotton & Bamboo Fiber üst yüzey, breathable arka yüzey",
    badge: "EN POPÜLER",
    image: packPads,
  },
  {
    id: "gece",
    name: "Gece Pedi",
    fullName: ".ki Gece Pedi (Sanitary Pad — Night)",
    short: "Yoğun gece akışı · uzun koruma",
    description:
      "Yoğun akıntılar ve kesintisiz gece uykusu için tasarlanmış. 335 mm ekstra uzun yapısı ve gelişmiş emilim teknolojisiyle sabaha kadar tam koruma vadeder. Genişletilmiş arka tasarımı uyku sırasındaki sızıntıları engeller; Pelin Otu özlerinin rahatlatıcı etkisi en zorlu gecelerde dahi konforu sürdürür.",
    drops: 4,
    size: "335 mm",
    perBox: 8,
    material: "Soft Cotton & Bamboo Fiber üst yüzey, breathable arka yüzey",
    image: bentoPads,
  },
];

const FREE_SHIPPING_THRESHOLD_UNITS = 30; // 30 adet üzeri ücretsiz kargo (gösterim amaçlı)

const Drops = ({ filled, total = 4 }: { filled: number; total?: number }) => (
  <span className="inline-flex items-center gap-0.5" aria-label={`${filled}/${total} emicilik`}>
    {Array.from({ length: total }).map((_, i) => (
      <svg
        key={i}
        viewBox="0 0 24 24"
        className={`w-3 h-3 ${i < filled ? "text-rose" : "text-border"}`}
        fill="currentColor"
      >
        <path d="M12 2.5s7 8.2 7 13a7 7 0 1 1-14 0c0-4.8 7-13 7-13z" />
      </svg>
    ))}
  </span>
);

/* ---------------- Page ---------------- */

const Pedler = () => {
  useReveal();

  const [quantities, setQuantities] = useState<Record<PadId, number>>({
    gunluk: 0,
    gunduz: 0,
    gece: 0,
  });
  const [activeImage, setActiveImage] = useState(0);
  const [subscribe, setSubscribe] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const setQty = (id: PadId, next: number) => {
    setQuantities((q) => ({ ...q, [id]: Math.max(0, Math.min(200, next)) }));
  };

  const totals = useMemo(() => {
    const lines = PADS.map((p) => {
      const qty = quantities[p.id] ?? 0;
      const packs = qty / p.perBox;
      return { ...p, qty, packs };
    }).filter((l) => l.qty > 0);

    const totalUnits = lines.reduce((s, l) => s + l.qty, 0);
    const totalPacks = lines.reduce((s, l) => s + l.packs, 0);
    const shippingProgress = Math.min(1, totalUnits / FREE_SHIPPING_THRESHOLD_UNITS);
    return { lines, totalUnits, totalPacks, shippingProgress };
  }, [quantities]);

  const heroImages = [bentoPads, packPads, bentoPads];

  return (
    <div className="bg-background min-h-screen">
      <AnnouncementBar />
      <SiteNav />

      {/* Hero / Product top */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-8 lg:pt-12 pb-10 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Gallery */}
          <div className="k5-reveal">
            <div className="relative rounded-3xl overflow-hidden bg-[hsl(var(--rose-light))] aspect-[4/5] sm:aspect-square">
              <img
                src={heroImages[activeImage]}
                alt=".ki Ped"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                {heroImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`Görsel ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      activeImage === i ? "bg-primary w-6" : "bg-primary/30"
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3">
              {heroImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`rounded-xl overflow-hidden aspect-square border-2 transition-all ${
                    activeImage === i ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Buy box */}
          <div className="k5-reveal k5-reveal-d2 lg:sticky lg:top-24">
            <h1 className="font-display font-medium text-[34px] sm:text-[42px] lg:text-[52px] leading-[1.05] tracking-tight text-primary">
              .ki Ped
            </h1>

            <div className="mt-3 flex items-center gap-2 text-[13px] text-muted-foreground">
              <span className="text-star tracking-wide">★★★★★</span>
              <span className="font-semibold text-primary">4.9</span>
              <span>/ 5</span>
              <span className="opacity-70">(1.240+ değerlendirme)</span>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed text-foreground/80">
              Konforun en doğal hali: %100 organik bambu lifinden üretilen .ki Ped,
              hipoalerjenik ve vegandır. İnce yapısına rağmen yüksek emiciliğiyle
              rahatlık her zaman seninle.
            </p>

            {/* Builder header */}
            <div className="mt-7 flex items-center justify-between">
              <h2 className="font-display text-[20px] text-primary font-medium">
                Paketimi Oluştur
              </h2>
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-[12.5px] text-primary/80 hover:text-primary font-semibold transition-colors"
              >
                🤔 Hangi Ped Bana Uygun?
              </button>
            </div>

            {/* Variants */}
            <div className="mt-4 space-y-3">
              {PADS.map((p) => {
                const qty = quantities[p.id];
                const selected = qty > 0;
                return (
                  <div
                    key={p.id}
                    className={`relative flex items-center gap-4 rounded-2xl border p-3 sm:p-4 transition-all ${
                      selected
                        ? "border-primary bg-secondary/60 shadow-[0_4px_16px_-8px_hsl(var(--primary)/0.3)]"
                        : "border-border bg-card hover:border-primary/40"
                    }`}
                  >
                    {p.badge && (
                      <span className="absolute -top-2 left-4 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wide">
                        {p.badge}
                      </span>
                    )}
                    <div className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-cream-2 border border-border/60">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-[14.5px] font-bold text-primary leading-tight">{p.name}</h3>
                        <Drops filled={p.drops} />
                      </div>
                      <p className="text-[12px] text-muted-foreground mt-0.5">{p.short}</p>
                      <p className="text-[11.5px] font-medium text-primary/70 mt-1">
                        {p.size} · {p.perBox} adet / paket
                      </p>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      <span className="text-[11px] font-medium text-muted-foreground">
                        +{p.perBox} adet
                      </span>
                      <div className="flex items-center gap-1 bg-background border border-border rounded-full p-1">
                        <button
                          onClick={() => setQty(p.id, qty - p.perBox)}
                          disabled={qty === 0}
                          aria-label={`${p.name} azalt`}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-primary hover:bg-secondary disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="min-w-[28px] text-center text-[14px] font-bold text-primary tabular-nums">
                          {qty}
                        </span>
                        <button
                          onClick={() => setQty(p.id, qty + p.perBox)}
                          aria-label={`${p.name} arttır`}
                          className="w-8 h-8 rounded-full flex items-center justify-center bg-primary text-primary-foreground hover:bg-primary-medium transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Subscription toggle */}
            <div className="mt-5 rounded-2xl bg-secondary/60 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-primary shrink-0 mt-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
                  <path d="M21 3v5h-5" />
                </svg>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-[15px] text-primary leading-tight">
                    Abonelik ile %10 İndirim
                  </div>
                  <div className="text-[12.5px] text-muted-foreground mt-0.5">
                    Her ay otomatik gönderim, istediğin zaman iptal
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

              {totals.totalUnits > 0 && (
                <div className="mt-4 flex items-center justify-between rounded-xl bg-card px-4 py-3">
                  <span className="text-[13px] text-muted-foreground">Toplam paket</span>
                  <span className="text-[15px] font-extrabold text-primary tabular-nums">
                    {totals.totalPacks.toLocaleString("tr-TR", { maximumFractionDigits: 1 })} paket · {totals.totalUnits} adet
                  </span>
                </div>
              )}
            </div>

            {/* CTA */}
            <button
              type="button"
              disabled={totals.totalUnits === 0}
              className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground text-[15px] font-bold py-4 px-6 hover:bg-primary-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_28px_-12px_hsl(var(--primary)/0.5)]"
            >
              {totals.totalUnits === 0 ? "Pedlerini Seç" : `Sepete Ekle · ${totals.totalUnits} adet`}
            </button>

            {/* Free shipping progress */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-[12px] text-muted-foreground mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-sage" />
                  {totals.totalUnits >= FREE_SHIPPING_THRESHOLD_UNITS
                    ? "Ücretsiz kargo kazandın 🎉"
                    : `${FREE_SHIPPING_THRESHOLD_UNITS - totals.totalUnits} adet daha = ücretsiz kargo`}
                </span>
                <span className="font-semibold">
                  {Math.round(totals.shippingProgress * 100)}%
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-sage transition-all duration-500"
                  style={{ width: `${totals.shippingProgress * 100}%` }}
                />
              </div>
            </div>

            {/* Trust badges */}
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-primary/80 font-medium">
              <li className="flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5 text-sage" /> %100 organik bambu
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-sage" /> Hipoalerjenik · vegan
              </li>
              <li className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sage" /> Parfümsüz
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Which pad section */}
      <section className="bg-secondary/40 border-y border-border/60">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
          <div className="text-center max-w-2xl mx-auto k5-reveal">
            <p className="text-[12px] uppercase tracking-[0.2em] text-rose font-bold mb-3">
              Sana Özel
            </p>
            <h2 className="font-display font-medium text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-primary tracking-tight">
              Senin için en uygun .ki Ped hangisi?
            </h2>
            <p className="mt-4 text-[14.5px] text-muted-foreground">
              Akış seviyene göre 3 farklı emicilik. Tek bir pakette istediğin gibi karıştır.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
            {PADS.map((p, i) => (
              <article
                key={p.id}
                className={`k5-reveal k5-reveal-d${i + 1} group flex flex-col rounded-3xl bg-card border border-border/60 overflow-hidden hover:shadow-lg transition-shadow`}
              >
                <div className="aspect-square bg-[hsl(var(--rose-light))] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-[20px] text-primary font-medium">{p.name}</h3>
                    <Drops filled={p.drops} />
                  </div>
                  <p className="mt-2 text-[13.5px] text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <span className="text-[12.5px] font-semibold text-primary/80">
                      {p.size} · {p.perBox} adet / paket
                    </span>
                    <button
                      onClick={() => setQty(p.id, (quantities[p.id] ?? 0) + p.perBox)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground text-[12.5px] font-semibold py-2 px-4 hover:bg-primary-medium transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ekle
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why .ki Ped */}
      <section className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          <div className="k5-reveal order-2 lg:order-1">
            <p className="text-[12px] uppercase tracking-[0.2em] text-rose font-bold mb-3">
              Doğal · Şeffaf · Güvenli
            </p>
            <h2 className="font-display font-medium text-[28px] sm:text-[36px] lg:text-[44px] leading-[1.1] text-primary tracking-tight">
              Cildine layık olan ped
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-foreground/80 max-w-xl">
              Geleneksel pedlerin aksine .ki Ped, sentetik plastik ve parfüm içermez.
              %100 organik bambu lifi üst yüzeyiyle hassas bölgene nazikçe uyum sağlar.
            </p>

            <ul className="mt-7 space-y-4">
              {[
                {
                  title: "Mugwort (Pelin Otu) infüzyonu",
                  desc: "Geleneksel tıbbın bilgeliğini modern konforla buluşturan doğal antibakteriyel bariyer; koku ve enfeksiyon riskine karşı korur.",
                },
                {
                  title: "Soft Cotton & Bamboo Fiber üst yüzey",
                  desc: "Yumuşak pamuk ve bambu lifi karışımı, hassas cilde nazikçe uyum sağlar.",
                },
                {
                  title: "SLS / SLES içermez",
                  desc: "Sert sülfat bazlı kimyasallar yok — pH dengesi korunur, tahriş önlenir.",
                },
                {
                  title: "Nefes alan üst & arka yüzey",
                  desc: "Breathable yapı sayesinde gün boyu serin ve kuru kullanım hissi.",
                },
              ].map((b) => (
                <li key={b.title} className="flex items-start gap-3">
                  <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-sage-light flex items-center justify-center">
                    <Check className="w-3 h-3 text-sage" />
                  </span>
                  <div>
                    <p className="text-[14.5px] font-bold text-primary">{b.title}</p>
                    <p className="text-[13.5px] text-muted-foreground mt-0.5">{b.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="/paket-olustur"
              className="mt-8 inline-flex items-center gap-2 text-[13.5px] font-semibold text-primary border border-primary/40 rounded-full py-2.5 px-5 hover:bg-primary hover:text-primary-foreground transition-all"
            >
              Paketini oluştur <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="k5-reveal k5-reveal-d2 order-1 lg:order-2">
            <div className="rounded-3xl overflow-hidden aspect-square bg-[hsl(var(--rose-light))]">
              <img src={packPads} alt=".ki Ped detay" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/40 border-t border-border/60">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-14 lg:py-20">
          <div className="text-center mb-10 k5-reveal">
            <h2 className="font-display font-medium text-[28px] sm:text-[36px] leading-[1.1] text-primary tracking-tight">
              Sıkça sorulan sorular
            </h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: ".ki Ped içeriği nedir?",
                a: "Üst yüzey Soft Cotton & Bamboo Fiber, arka yüzey ise nefes alabilen breathable yapıdadır. Tüm seri Mugwort (Pelin Otu) infüzyonludur ve SLS/SLES içermez.",
              },
              {
                q: "Hangi pedi seçmeliyim?",
                a: "Hafif akıntı, lekelenme ve günlük tazelik için Günlük Ped (155 mm · 30 adet); orta yoğun menstrual akış için Gündüz Pedi (245 mm · 12 adet); yoğun gece akışı için Gece Pedi (335 mm · 8 adet). Tek paket içinde 3 farklı tipi karıştırabilirsin.",
              },
              {
                q: "Pelin Otu (Mugwort) ne işe yarar?",
                a: "Geleneksel tıpta kullanılan Pelin Otu, doğal antibakteriyel bariyeri sayesinde koku ve enfeksiyon riskine karşı koruma sağlar; cildin doğal pH dengesini destekler.",
              },
              {
                q: "Aboneliği nasıl yönetirim?",
                a: "Hesabından gönderim sıklığını değiştirebilir, pedlerini düzenleyebilir veya aboneliği tek tıkla iptal edebilirsin. Hiçbir taahhüt yok.",
              },
              {
                q: "Kargo ne kadar sürer?",
                a: "Hafta içi 16:00'a kadar verilen siparişler aynı gün kargolanır. 1–3 iş günü içinde kapına teslim.",
              },
            ].map((f, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={f.q}
                  className="rounded-2xl bg-card border border-border/60 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-accent/40 transition-colors"
                  >
                    <span className="text-[15px] font-semibold text-primary">{f.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                  </button>
                  {open && (
                    <div className="px-5 pb-5 text-[14px] text-muted-foreground leading-relaxed">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Pedler;
