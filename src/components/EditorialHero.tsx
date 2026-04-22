import { useEffect, useRef, useState } from "react";
import heroImage from "@/assets/hero-lifestyle.png";
import padsImage from "@/assets/hero-pads.png";

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
    secondaryCta: { label: "İçindekileri gör", href: "#k5Ingredients" },
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
    secondaryCta: { label: "Kendi paketini oluştur", href: "#k5Collection" },
    image: padsImage,
    imageAlt: ".ki Sanitary Pads kutuları ile bornozlu kadın",
    imageBg: "bg-sage-light",
    copyBg: "bg-cream",
    reviewText: "4.9 · 1.200+ yorum",
    trustText: "12.000+ kadının düzenli seçimi",
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
      <div
        key={slide.id}
        className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] min-h-[560px] lg:min-h-[760px]"
      >
        {/* Image side */}
        <div className={`relative ${slide.imageBg} overflow-hidden min-h-[480px] lg:min-h-[760px]`}>
          <img
            src={slide.image}
            alt={slide.imageAlt}
            className="absolute inset-0 w-full h-full object-cover k5-reveal"
            draggable={false}
          />
        </div>

        {/* Copy side */}
        <div
          className={`${slide.copyBg} flex flex-col justify-center px-7 sm:px-10 lg:px-12 py-14 lg:py-20`}
        >
          <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-5">
            {slide.eyebrow}
          </span>
          <h1 className="k5-reveal k5-reveal-d1 font-display font-medium text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.02] text-primary tracking-tight mb-6">
            {slide.title}
          </h1>
          <p className="k5-reveal k5-reveal-d2 text-[15px] sm:text-[16px] leading-relaxed text-foreground/75 mb-8 max-w-[460px]">
            {slide.description}
          </p>

          <div className="k5-reveal k5-reveal-d3 flex flex-col sm:flex-row gap-3 mb-4">
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
          <div className="k5-reveal k5-reveal-d4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-muted-foreground font-medium mb-8">
            <div className="flex items-center gap-1.5">
              <span className="text-star text-base tracking-wide">★★★★★</span>
              <span>{slide.reviewText}</span>
            </div>
            <span className="w-px h-4 bg-border" />
            <span>{slide.trustText}</span>
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2" role="tablist" aria-label="Hero slaytları">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Slayt ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === active ? "w-8 bg-primary" : "w-4 bg-primary/25 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground/70 hidden sm:inline">
              ← → ile gez
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
