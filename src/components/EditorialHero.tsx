import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-lifestyle.webp";
import padsImage from "@/assets/hero-pads.webp";
import menopauseImage from "@/assets/hero-menopause.webp";

type Slide = {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  image: string;
  imageAlt: string;
  imageBg: string;
  copyBg: string;
  reviewText: string;
  trustText: string;
};

const slides: Slide[] = [
  {
    id: "balance",
    eyebrow: "Yeni · Döngü Takviyesi",
    title: (
      <>
        Döngünün <em className="italic font-light">her gününde</em> dengede kal.
      </>
    ),
    description:
      "Şişkinlik, kas/sinir gerilimleri ve ruh hali dalgalanmalarına karşı geliştirilen .ki Balance — Vitex, Magnezyum Bisglisinat, B6 ve Çinko ile günlük döngü desteği.",
    primaryCta: { label: ".ki Balance'ı incele", href: "#k5Product" },
    secondaryCta: { label: "Paketini oluştur", href: "/paket-olustur" },
    image: heroImage,
    imageAlt: ".ki Balance kullanan kadın",
    imageBg: "bg-rose-light",
    copyBg: "bg-secondary",
    reviewText: "5.0 · 90+ yorum",
    trustText: "2.400+ kadın tercih ediyor",
  },
  {
    id: "pads",
    eyebrow: "Bestseller · Hijyenik Ped",
    title: (
      <>
        Cildine <em className="italic font-light">nazik</em>, döngüne sadık.
      </>
    ),
    description:
      "Organik pamuk üst yüzeyli, parfümsüz ve nefes alabilen .ki Sanitary Pads — hassas ciltler için dermatolojik test edilmiş, gündüz–gece tüm akış seviyelerine uygun koruma.",
    primaryCta: { label: "Pedleri keşfet", href: "#k5Collection" },
    secondaryCta: { label: "Kendi paketini oluştur", href: "/paket-olustur" },
    image: padsImage,
    imageAlt: ".ki Sanitary Pads kutuları ile bornozlu kadın",
    imageBg: "bg-sage-light",
    copyBg: "bg-cream",
    reviewText: "4.9 · 1.200+ yorum",
    trustText: "12.000+ kadının düzenli seçimi",
  },
  {
    id: "menopause",
    eyebrow: "Yeni · Menopoz Takviyesi",
    title: (
      <>
        Değişim <em className="italic font-light">güzeldir</em>, yanında biz varız.
      </>
    ),
    description:
      "Sıcak basmaları, gece terlemeleri ve ruh hali dalgalanmaları için geliştirilen .ki Menopause — Bor, Genistein ve Black Cohosh ile peri-menopoz ve menopoz döneminde günlük doğal destek.",
    primaryCta: { label: "Change Is Good'u incele", href: "#k5Product" },
    secondaryCta: { label: "Paketini oluştur", href: "/paket-olustur" },
    image: menopauseImage,
    imageAlt: ".ki Menopause kullanan kadın",
    imageBg: "bg-cream",
    copyBg: "bg-rose-light",
    reviewText: "4.8 · 320+ yorum",
    trustText: "Change is good — 50+ kadının yanında",
  },
];

const EditorialHero = () => {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      // Ignore when typing in inputs
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % slides.length);
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + slides.length) % slides.length);
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const slide = slides[active];

  return (
    <section ref={sectionRef} className="bg-background relative" aria-roledescription="carousel">
      {/* MOBILE: full-bleed image with overlay copy */}
      <div className={`lg:hidden relative ${slide.imageBg} overflow-hidden min-h-[640px] h-[calc(100svh-120px)] max-h-[860px] transition-colors duration-500`}>
        {slides.map((s, i) => (
          <img
            key={s.id}
            src={s.image}
            alt={s.imageAlt}
            draggable={false}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={i !== active}
          />
        ))}

        {/* Readability gradient — top + bottom darken to keep copy legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/75 pointer-events-none" />

        {/* Copy overlay */}
        <div className="absolute inset-x-0 bottom-0 px-6 pt-10 pb-28">
          <div key={slide.id} className="animate-fade-in text-white">
            <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-white/85 mb-3 [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
              {slide.eyebrow}
            </span>
            <h1 className="font-display font-medium text-[34px] leading-[1.05] tracking-tight mb-4 text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.55)]">
              {slide.title}
            </h1>
            <p className="text-[14px] leading-relaxed text-white/90 mb-6 max-w-[420px] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">
              {slide.description}
            </p>

            <div className="flex flex-col gap-2.5 mb-4">
              <a
                href={slide.primaryCta.href}
                className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-[14px] font-bold py-3.5 px-6 rounded-full hover:bg-primary-medium transition-all hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
              >
                {slide.primaryCta.label}
              </a>
              <a
                href={slide.secondaryCta.href}
                className="inline-flex items-center justify-center whitespace-nowrap border-2 border-white/90 text-white text-[14px] font-bold py-3.5 px-6 rounded-full hover:bg-white hover:text-primary transition-all backdrop-blur-sm"
              >
                {slide.secondaryCta.label}
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11.5px] text-white/85 font-medium [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5">
                <span className="text-star text-base tracking-wide">★★★★★</span>
                <span>{slide.reviewText}</span>
              </div>
              <span className="w-px h-4 bg-white/40" />
              <span>{slide.trustText}</span>
            </div>
          </div>
        </div>

        {/* Slide nav — overlay on image */}
        <div className="absolute left-6 bottom-6 flex items-center gap-6 text-white">
          <button
            type="button"
            onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
            aria-label="Önceki slayt"
            className="text-white/90 hover:text-white transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
            <ArrowLeft className="w-7 h-7" strokeWidth={1.5} />
          </button>
          <span className="text-[15px] font-medium text-white/95 tabular-nums tracking-wide [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
            {active + 1}/{slides.length}
          </span>
          <button
            type="button"
            onClick={() => setActive((i) => (i + 1) % slides.length)}
            aria-label="Sonraki slayt"
            className="text-white/90 hover:text-white transition-colors drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          >
            <ArrowRight className="w-7 h-7" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* DESKTOP: split layout (unchanged) */}
      <div className="hidden lg:grid grid-cols-[3fr_2fr] min-h-[760px]">
        {/* Image side */}
        <div className={`relative ${slide.imageBg} overflow-hidden min-h-[760px]`}>
          {slides.map((s, i) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.imageAlt}
              draggable={false}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
              aria-hidden={i !== active}
            />
          ))}
        </div>

        {/* Copy side */}
        <div
          className={`relative ${slide.copyBg} flex flex-col justify-center px-12 pt-20 pb-32 transition-colors duration-500`}
        >
          <div key={slide.id} className="animate-fade-in">
            <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-5">
              {slide.eyebrow}
            </span>
            <h1 className="font-display font-medium text-[64px] leading-[1.02] text-primary tracking-tight mb-6">
              {slide.title}
            </h1>
            <p className="text-[16px] leading-relaxed text-foreground/75 mb-8 max-w-[460px]">
              {slide.description}
            </p>

            <div className="flex flex-row gap-3 mb-4">
              <a
                href={slide.primaryCta.href}
                className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-[14px] font-bold py-3.5 px-6 rounded-full hover:bg-primary-medium transition-all hover:-translate-y-0.5"
              >
                {slide.primaryCta.label}
              </a>
              <a
                href={slide.secondaryCta.href}
                className="inline-flex items-center justify-center whitespace-nowrap border-2 border-primary text-primary text-[14px] font-bold py-3.5 px-6 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
              >
                {slide.secondaryCta.label}
              </a>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <span className="text-star text-base tracking-wide">★★★★★</span>
                <span>{slide.reviewText}</span>
              </div>
              <span className="w-px h-4 bg-border" />
              <span>{slide.trustText}</span>
            </div>
          </div>

          {/* Sabit slayt navigasyonu */}
          <div className="absolute left-12 bottom-10 flex items-center gap-8">
            <button
              type="button"
              onClick={() => setActive((i) => (i - 1 + slides.length) % slides.length)}
              aria-label="Önceki slayt"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-8 h-8" strokeWidth={1.5} />
            </button>
            <span className="text-[16px] font-medium text-foreground/80 tabular-nums tracking-wide">
              {active + 1}/{slides.length}
            </span>
            <button
              type="button"
              onClick={() => setActive((i) => (i + 1) % slides.length)}
              aria-label="Sonraki slayt"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              <ArrowRight className="w-8 h-8" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
