import { useReveal } from "@/hooks/useReveal";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import ScrollProgress from "@/components/ScrollProgress";
import bilimHero from "@/assets/bilim-hero.jpg";
import bilimVitex from "@/assets/bilim-vitex.jpg";
import bilimMagnezyum from "@/assets/bilim-magnezyum.jpg";
import bilimB6 from "@/assets/bilim-b6.jpg";
import bilimCinko from "@/assets/bilim-cinko.jpg";

const principles = [
  {
    n: "01",
    title: "Önce literatür",
    body: "Her etkin madde, peer-review yayınlanmış en az iki klinik çalışmaya dayanır.",
  },
  {
    n: "02",
    title: "Klinik dozaj",
    body: "Etkili olduğu kanıtlanan dozun altına inmeyiz. 'İz miktarlı' içerik bizde yoktur.",
  },
  {
    n: "03",
    title: "Şeffaf kaynak",
    body: "Hammaddenin hangi ülkeden, hangi tedarikçiden, hangi sertifikayla geldiğini açıklarız.",
  },
  {
    n: "04",
    title: "Bağımsız test",
    body: "Her parti, akredite üçüncü taraf laboratuvarlarda etkin madde ve ağır metal testinden geçer.",
  },
];

const materials = [
  {
    code: "001",
    latin: "Vitex agnus-castus",
    name: "Hayıt Meyvesi",
    img: bilimVitex,
    origin: "Akdeniz",
    role: "Hormonal denge",
    metric: { label: "Klinik referans", value: "12 hf · 162 kadın" },
    desc: "Hipofiz bezindeki dopamin reseptörlerine bağlanarak prolaktin salımını düzenler. Progesteron–östrojen dengesini destekler.",
  },
  {
    code: "002",
    latin: "Mg + 2 × Glisin",
    name: "Magnezyum Bisglisinat",
    img: bilimMagnezyum,
    origin: "Almanya",
    role: "Kas & uyku",
    metric: { label: "Biyoyararlanım", value: "≈ %40" },
    desc: "Glisin ile şelatlanmış form, mide-bağırsak sistemini yormadan yüksek emilim sağlar. Kas gevşemesi ve melatonin sentezi için kritik.",
  },
  {
    code: "003",
    latin: "Piridoksal-5-fosfat",
    name: "B6 Vitamini",
    img: bilimB6,
    origin: "İsviçre",
    role: "Ruh hali",
    metric: { label: "Aktif form", value: "P-5-P" },
    desc: "B6'nın koenzim formu. Serotonin, dopamin ve GABA sentezinde doğrudan rol alır. Premenstrüel ödem üzerinde klinik kanıtı vardır.",
  },
  {
    code: "004",
    latin: "Zn + 2 × Glisin",
    name: "Çinko Bisglisinat",
    img: bilimCinko,
    origin: "Almanya",
    role: "Cilt & bağışıklık",
    metric: { label: "Saflık", value: "%99.8" },
    desc: "Şelatlı form ile yüksek biyoyararlanım. Hormon metabolizması, kollajen sentezi ve sebum dengesi için temel mineral.",
  },
];

const Bilim = () => {
  useReveal();

  return (
    <div className="pb-[72px] bg-background selection:bg-rose/30 selection:text-primary">
      <ScrollProgress />
      <AnnouncementBar />
      <SiteNav />

      <main className="overflow-x-hidden">
        {/* ───────────── HERO ───────────── */}
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute top-0 right-0 w-[420px] h-[420px] bg-rose/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[320px] h-[320px] bg-sage/20 rounded-full blur-[100px] -ml-32 -mb-32 pointer-events-none" />

          <div className="relative max-w-[1240px] mx-auto px-5 sm:px-8 pt-14 pb-20 sm:pt-20 sm:pb-28">
            <div className="flex items-center justify-between mb-10 sm:mb-14">
              <span className="text-[10px] sm:text-[11px] tracking-[0.36em] uppercase text-primary-foreground/60 font-bold">
                Arşiv No. 001 / Bilim
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary-foreground/40">
                REV_2026.05
              </span>
            </div>

            <h1 className="k5-reveal font-display font-medium text-[44px] sm:text-[88px] leading-[0.95] tracking-tight max-w-[920px] mb-10">
              Kadın bedenine
              <br />
              <em className="italic font-light text-rose-light">kanıtla</em> bakıyoruz.
            </h1>

            <div className="k5-reveal k5-reveal-d1 w-12 h-px bg-rose-light mb-8" />
            <p className="k5-reveal k5-reveal-d2 text-[14px] sm:text-[16px] leading-relaxed text-primary-foreground/75 max-w-[440px] sm:max-w-[560px] mb-14">
              .ki, klinik araştırmalar, eczacılar ve kadın sağlığı uzmanlarıyla geliştirilen bir
              formülasyon laboratuvarıdır. Her hammadde için sorduğumuz tek soru: bilim ne diyor?
            </p>

            <div className="k5-reveal k5-reveal-d3 relative">
              <div className="aspect-[3/4] sm:aspect-[16/9] overflow-hidden rounded-t-[180px] sm:rounded-t-[260px] border border-primary-foreground/10">
                <img
                  src={bilimHero}
                  alt=".ki laboratuvar — amber şişeler, kuru bitkiler ve pipet"
                  width={1600}
                  height={1100}
                  className="w-full h-full object-cover grayscale-[15%]"
                />
              </div>
              <div className="absolute -bottom-3 right-4 bg-rose-light text-primary px-5 py-3 text-[10px] font-bold tracking-[0.24em] uppercase shadow-lg">
                Ref. Lab-2026
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-12 mt-20 pt-10 border-t border-primary-foreground/15">
              {[
                { v: "12", l: "klinik araştırma referansı" },
                { v: "4", l: "bağımsız akredite laboratuvar" },
                { v: "%100", l: "şeffaf kaynak takibi" },
              ].map((s, i) => (
                <div key={s.l} className={`k5-reveal k5-reveal-d${i + 1}`}>
                  <div className="font-display text-[32px] sm:text-[56px] font-medium leading-none mb-2">
                    {s.v}
                  </div>
                  <div className="text-[10.5px] sm:text-[12px] text-primary-foreground/60 leading-snug uppercase tracking-wider">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── PRINCIPLES — index style ───────────── */}
        <section className="bg-background py-20 sm:py-28 border-b border-border">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="flex items-baseline justify-between mb-12 sm:mb-16">
              <span className="font-display italic text-[13px] sm:text-[15px] tracking-wider text-foreground/50">
                Bilimsel temellerimiz
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/35 uppercase">
                §I — IV
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-14 sm:gap-y-20">
              {principles.map((p, i) => (
                <div key={p.n} className={`k5-reveal ${i > 0 ? `k5-reveal-d${Math.min(i, 4)}` : ""} relative`}>
                  <span className="absolute -left-2 -top-10 text-[110px] sm:text-[140px] font-display italic text-rose/[0.08] leading-none select-none pointer-events-none">
                    {p.n}
                  </span>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-rose uppercase">
                        {p.n}
                      </span>
                      <span className="h-px flex-1 bg-border" />
                    </div>
                    <h3 className="font-display text-[24px] sm:text-[30px] font-medium text-primary mb-3 leading-tight tracking-tight">
                      {p.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-foreground/70 max-w-[440px]">
                      {p.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── RAW MATERIAL ARCHIVE — index list ───────────── */}
        <section className="bg-primary text-primary-foreground py-20 sm:py-28">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="flex justify-between items-end mb-12 sm:mb-16">
              <div>
                <span className="block text-[10px] tracking-[0.32em] uppercase text-rose-light/80 font-bold mb-4">
                  Vol. 01 — Active Ingredients
                </span>
                <h2 className="font-display font-medium text-[36px] sm:text-[64px] leading-[1] tracking-tight">
                  Hammadde
                  <br />
                  <em className="italic font-light">arşivi.</em>
                </h2>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-primary-foreground/40 hidden sm:block">
                INDEX / 24
              </span>
            </div>

            {/* Editorial split rows */}
            <div>
              {materials.map((m, i) => (
                <article
                  key={m.code}
                  className="k5-reveal group border-t border-primary-foreground/15 py-10 sm:py-14 last:border-b grid grid-cols-12 gap-4 sm:gap-8 items-start"
                >
                  {/* Code */}
                  <div className="col-span-2 sm:col-span-1 pt-2">
                    <span className="font-mono text-[11px] tracking-widest text-rose-light/90">
                      {m.code}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="col-span-10 sm:col-span-4 order-3 sm:order-none mt-6 sm:mt-0">
                    <div className="aspect-[4/5] overflow-hidden rounded-sm bg-background/10">
                      <img
                        src={m.img}
                        alt={m.name}
                        width={800}
                        height={1000}
                        loading="lazy"
                        className="w-full h-full object-cover grayscale-[20%] transition-all duration-700 group-hover:grayscale-0 group-hover:scale-[1.03]"
                      />
                    </div>
                  </div>

                  {/* Body */}
                  <div className="col-span-12 sm:col-span-5 sm:pl-4">
                    <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-rose-light/80 mb-3">
                      {m.role}
                    </div>
                    <h3 className="font-display text-[30px] sm:text-[44px] font-medium leading-[1.02] tracking-tight mb-1">
                      {m.name}
                    </h3>
                    <p className="font-display italic text-[14px] text-primary-foreground/55 mb-6">
                      {m.latin}
                    </p>
                    <p className="text-[14px] leading-relaxed text-primary-foreground/75 max-w-[460px]">
                      {m.desc}
                    </p>
                  </div>

                  {/* Metadata */}
                  <div className="col-span-12 sm:col-span-2 sm:text-right space-y-5">
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-primary-foreground/40 mb-1.5">
                        Origin
                      </div>
                      <div className="font-display text-[18px] sm:text-[22px] italic text-rose-light">
                        {m.origin}
                      </div>
                    </div>
                    <div>
                      <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-primary-foreground/40 mb-1.5">
                        {m.metric.label}
                      </div>
                      <div className="text-[13px] font-semibold text-primary-foreground/90">
                        {m.metric.value}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────── QUOTE ───────────── */}
        <section className="relative bg-background py-24 sm:py-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
            <span className="font-display italic text-[28vw] sm:text-[18rem] text-primary/[0.04] leading-none">
              Bilim
            </span>
          </div>
          <div className="relative max-w-[820px] mx-auto px-6 sm:px-8 text-center">
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-rose font-bold mb-8 block">
              .ki × Bilim Kurulu
            </span>
            <blockquote className="k5-reveal font-display italic font-medium text-[26px] sm:text-[44px] leading-[1.18] text-primary tracking-tight mb-10">
              "Kadın bedenini anlamak, onu basitleştirmek değil; karmaşıklığına saygı{" "}
              <span className="text-rose not-italic">duymaktır.</span>"
            </blockquote>
            <div className="h-px w-10 bg-rose mx-auto mb-4" />
            <cite className="not-italic text-[10px] uppercase tracking-[0.3em] text-foreground/50 font-bold">
              Ecz. Arin Alan — .ki Bilim Kurulu
            </cite>
          </div>
        </section>

        {/* ───────────── CTA ───────────── */}
        <section className="bg-secondary/40 py-20 sm:py-24">
          <div className="max-w-[860px] mx-auto px-5 sm:px-8 text-center">
            <h2 className="k5-reveal font-display font-medium text-[30px] sm:text-[48px] leading-[1.05] text-primary mb-6 tracking-tight">
              Kanıta dayalı formülleri <em className="italic font-light">keşfet.</em>
            </h2>
            <p className="k5-reveal k5-reveal-d1 text-[14.5px] leading-relaxed text-foreground/70 mb-10 max-w-[520px] mx-auto">
              .ki ürünlerinin her biri, bu sayfada anlattığımız bilim disiplininden geçti.
            </p>
            <div className="k5-reveal k5-reveal-d2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/balance"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground text-[12px] font-bold tracking-[0.2em] uppercase py-4 px-8 rounded-none hover:bg-primary-medium transition-colors"
              >
                Ürünleri incele
              </a>
              <a
                href="/paket-olustur"
                className="inline-flex items-center justify-center border border-primary text-primary text-[12px] font-bold tracking-[0.2em] uppercase py-4 px-8 rounded-none hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Kendi paketini oluştur
              </a>
            </div>
            <p className="mt-10 font-display italic text-[12px] text-foreground/40 tracking-wide">
              Her kapsül bir taahhüttür.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Bilim;
