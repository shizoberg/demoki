import sachet from "@/assets/sachet.png";

const EditorialHero = () => {
  return (
    <section className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-[1.85fr_1fr] min-h-[560px] lg:min-h-[760px]">
        {/* Image side - large editorial panel */}
        <div className="relative bg-rose-light flex items-center justify-center overflow-hidden min-h-[480px] lg:min-h-[760px]">
          {/* Soft backdrop layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-light via-rose-light to-plum-pale/70" />
          <div className="absolute -top-32 -left-24 w-[520px] h-[520px] rounded-full bg-sage-light/40 blur-3xl" />
          <div className="absolute -bottom-40 -right-24 w-[460px] h-[460px] rounded-full bg-cream-2/70 blur-3xl" />

          <img
            src={sachet}
            alt=".ki Balance şase ürünü"
            className="relative z-10 w-[42%] max-w-[360px] drop-shadow-[0_40px_80px_rgba(45,27,105,0.28)] k5-reveal"
            draggable={false}
          />
          {/* Caption chip */}
          <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm rounded-full px-4 py-2 text-[11px] font-semibold text-primary tracking-wide shadow-sm">
            Vegan formül · Klinik dozaj
          </div>
        </div>

        {/* Copy side - narrow editorial column */}
        <div className="bg-secondary flex flex-col justify-center px-7 sm:px-10 lg:px-12 py-14 lg:py-20">
          <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-5">
            Yeni · Döngü Takviyesi
          </span>
          <h1 className="k5-reveal k5-reveal-d1 font-display font-medium text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.02] text-primary tracking-tight mb-6">
            Döngünün <em className="italic font-light">her gününde</em> dengede kal.
          </h1>
          <p className="k5-reveal k5-reveal-d2 text-[15px] sm:text-[16px] leading-relaxed text-foreground/75 mb-8 max-w-[460px]">
            Şişkinlik, kas/sinir gerilimleri ve ruh hali dalgalanmalarına karşı geliştirilen .ki Balance — Vitex, Magnezyum Bisglisinat, B6 ve Çinko ile günlük döngü desteği.
          </p>

          <div className="k5-reveal k5-reveal-d3 flex flex-wrap gap-3 mb-4">
            <a
              href="#k5Product"
              className="inline-flex items-center justify-center whitespace-nowrap bg-primary text-primary-foreground text-[13px] font-bold py-3 px-5 rounded-full hover:bg-primary-medium transition-all hover:-translate-y-0.5"
            >
              .ki Balance'ı incele
            </a>
            <a
              href="#k5Ingredients"
              className="inline-flex items-center justify-center whitespace-nowrap border-2 border-primary text-primary text-[13px] font-bold py-3 px-5 rounded-full hover:bg-primary hover:text-primary-foreground transition-all"
            >
              İçindekileri gör
            </a>
          </div>

          {/* Trust row */}
          <div className="k5-reveal k5-reveal-d4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-muted-foreground font-medium">
            <div className="flex items-center gap-1.5">
              <span className="text-star text-base tracking-wide">★★★★★</span>
              <span>5.0 · 90+ yorum</span>
            </div>
            <span className="w-px h-4 bg-border" />
            <span>2.400+ kadın tercih ediyor</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialHero;
