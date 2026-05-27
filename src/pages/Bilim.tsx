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

const rawMaterials = [
  {
    name: "Vitex (Hayıt)",
    latin: "Vitex agnus-castus",
    img: bilimVitex,
    origin: "Akdeniz, Türkiye",
    role: "Hormonal denge",
    study: "12 hafta · 162 kadın · plasebo kontrollü",
    desc: "Hipofiz bezindeki dopamin reseptörlerine bağlanarak prolaktin salımını düzenler. Progesteron-östrojen dengesini destekler.",
  },
  {
    name: "Magnezyum Bisglisinat",
    latin: "Mg + 2 × Glisin",
    img: bilimMagnezyum,
    origin: "Almanya",
    role: "Kas & uyku",
    study: "8 hafta · 80 kadın · çift kör",
    desc: "Glisin ile şelatlanmış formu, mide bağırsak sistemini yormadan %40'a varan emilim sağlar. Kas gevşemesi ve melatonin sentezi için kritik.",
  },
  {
    name: "B6 Vitamini (P-5-P)",
    latin: "Piridoksal-5-fosfat",
    img: bilimB6,
    origin: "İsviçre",
    role: "Ruh hali",
    study: "10 hafta · 940 kadın · meta-analiz",
    desc: "Aktif koenzim formu. Serotonin, dopamin ve GABA sentezinde doğrudan rol alır. Premenstrüel ödem üzerinde klinik kanıtı vardır.",
  },
  {
    name: "Çinko Bisglisinat",
    latin: "Zn + 2 × Glisin",
    img: bilimCinko,
    origin: "Almanya",
    role: "Cilt & bağışıklık",
    study: "12 hafta · 60 kadın · randomize",
    desc: "Şelatlı form ile yüksek biyoyararlanım. Hormon metabolizması, kollajen sentezi ve sebum dengesi için temel mineral.",
  },
];

const principles = [
  {
    n: "01",
    title: "Önce literatür",
    body: "Her etkin madde, peer-review yayınlanmış en az iki klinik çalışmaya dayanır. Geleneksel kullanım tek başına yeterli değildir.",
  },
  {
    n: "02",
    title: "Klinik dozaj",
    body: "Etkili olduğu kanıtlanan dozun altına inmeyiz. Pazarlama amaçlı 'iz miktarlı' içerik bizde yoktur.",
  },
  {
    n: "03",
    title: "Şeffaf kaynak",
    body: "Hammaddenin hangi ülkeden, hangi tedarikçiden, hangi sertifikayla geldiğini açıkça paylaşırız.",
  },
  {
    n: "04",
    title: "Bağımsız test",
    body: "Her parti, üretici dışı akredite laboratuvarlarda ağır metal, mikrobiyoloji ve etkin madde testinden geçer.",
  },
];

const Bilim = () => {
  useReveal();

  return (
    <div className="pb-[72px] bg-background">
      <ScrollProgress />
      <AnnouncementBar />
      <SiteNav />

      <main>
        {/* HERO */}
        <section className="relative bg-primary text-primary-foreground overflow-hidden">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
            <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.24em] text-primary-foreground/70 mb-6 block">
              .ki Bilim
            </span>
            <h1 className="k5-reveal k5-reveal-d1 font-primary font-medium text-[40px] sm:text-[72px] leading-[1] tracking-tight max-w-[900px] mb-8">
              Kadın bedenine <em className="italic font-light">kanıtla</em> bakıyoruz.
            </h1>
            <p className="k5-reveal k5-reveal-d2 text-[15px] sm:text-[17px] leading-relaxed text-primary-foreground/80 max-w-[620px] mb-12">
              .ki, klinik araştırmalar, eczacılar ve kadın sağlığı uzmanlarıyla geliştirilen bir
              formülasyon laboratuvarıdır. Her hammadde için sorduğumuz tek soru: bilim ne diyor?
            </p>

            <div className="k5-reveal k5-reveal-d3 rounded-2xl overflow-hidden ring-1 ring-primary-foreground/15">
              <img
                src={bilimHero}
                alt=".ki laboratuvar — amber şişeler, kuru bitkiler ve pipet"
                width={1600}
                height={1100}
                className="w-full h-[280px] sm:h-[460px] object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-12 pt-10 border-t border-primary-foreground/15">
              {[
                { v: "12", l: "klinik araştırma referansı" },
                { v: "4", l: "bağımsız akredite laboratuvar" },
                { v: "%100", l: "şeffaf kaynak takibi" },
              ].map((s, i) => (
                <div key={s.l} className={`k5-reveal k5-reveal-d${i + 1}`}>
                  <div className="font-primary text-[32px] sm:text-[48px] font-medium leading-none mb-2">
                    {s.v}
                  </div>
                  <div className="text-[11.5px] sm:text-[13px] text-primary-foreground/70 leading-snug">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section className="py-20 sm:py-28 bg-background">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 mb-16 items-end">
              <div>
                <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-4 block">
                  Bilim disiplinimiz
                </span>
                <h2 className="k5-reveal k5-reveal-d1 font-primary font-medium text-[36px] sm:text-[52px] leading-[1.05] text-primary tracking-tight">
                  Dört basamaklı bir <em className="italic font-light">kanıt zinciri.</em>
                </h2>
              </div>
              <p className="k5-reveal k5-reveal-d2 text-[15px] leading-relaxed text-foreground/75 max-w-[480px] md:justify-self-end">
                Bir hammadde .ki formülüne girene kadar dört kapıdan geçer. Hiçbiri pazarlama
                kararıyla atlanamaz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {principles.map((p, i) => (
                <div
                  key={p.n}
                  className={`k5-reveal ${i > 0 ? `k5-reveal-d${Math.min(i, 4)}` : ""} bg-secondary/40 rounded-2xl p-7 border border-border h-full flex flex-col`}
                >
                  <div className="font-primary text-[28px] text-rose mb-6">{p.n}</div>
                  <h3 className="font-primary text-[22px] font-medium text-primary mb-3 leading-tight">
                    {p.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-foreground/75">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RAW MATERIALS */}
        <section className="py-20 sm:py-28 bg-secondary/30">
          <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
            <div className="text-center max-w-[680px] mx-auto mb-16">
              <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-4 block">
                Hammadde arşivi
              </span>
              <h2 className="k5-reveal k5-reveal-d1 font-primary font-medium text-[36px] sm:text-[52px] leading-[1.05] text-primary tracking-tight mb-5">
                Toprağından <em className="italic font-light">moleküle.</em>
              </h2>
              <p className="k5-reveal k5-reveal-d2 text-[15px] leading-relaxed text-foreground/75">
                Her hammaddenin nereden geldiğini, hangi formda kullanıldığını ve hangi çalışmaya
                dayandığını burada görebilirsin.
              </p>
            </div>

            <div className="space-y-20 sm:space-y-28">
              {rawMaterials.map((m, i) => (
                <div
                  key={m.name}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 items-center"
                >
                  <div
                    className={`k5-reveal rounded-2xl overflow-hidden bg-background aspect-square ${i % 2 === 1 ? "md:order-2" : ""}`}
                  >
                    <img
                      src={m.img}
                      alt={m.name}
                      width={1024}
                      height={1024}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`k5-reveal k5-reveal-d1 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                    <span className="inline-block text-[10.5px] font-bold uppercase tracking-[0.18em] text-sage mb-4">
                      {m.role}
                    </span>
                    <h3 className="font-primary text-[32px] sm:text-[44px] font-medium text-primary leading-[1.05] tracking-tight mb-2">
                      {m.name}
                    </h3>
                    <p className="font-primary italic text-[15px] text-foreground/55 mb-7">
                      {m.latin}
                    </p>
                    <p className="text-[15px] leading-relaxed text-foreground/75 mb-8">{m.desc}</p>

                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 pt-6 border-t border-border">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/50 mb-1.5">
                          Kaynak
                        </div>
                        <div className="text-[14px] font-semibold text-primary">{m.origin}</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.18em] text-foreground/50 mb-1.5">
                          Klinik referans
                        </div>
                        <div className="text-[14px] font-semibold text-primary">{m.study}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRAND × SCIENCE */}
        <section className="py-20 sm:py-28 bg-primary text-primary-foreground">
          <div className="max-w-[1080px] mx-auto px-5 sm:px-8 text-center">
            <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.24em] text-primary-foreground/70 mb-6 block">
              .ki × Bilim
            </span>
            <h2 className="k5-reveal k5-reveal-d1 font-primary font-medium text-[36px] sm:text-[56px] leading-[1.05] tracking-tight mb-8">
              Pazarlama değil, <em className="italic font-light">peer-review.</em>
            </h2>
            <p className="k5-reveal k5-reveal-d2 text-[16px] sm:text-[18px] leading-relaxed text-primary-foreground/80 max-w-[680px] mx-auto mb-12">
              .ki, eczacılar, jinekologlar ve kadın sağlığı araştırmacılarıyla birlikte
              geliştiriliyor. Bilim Kurulumuz her formülü onaylamadan önce ham veriye, dozaja ve
              etki mekanizmasına bakar.
            </p>

            <blockquote className="k5-reveal k5-reveal-d3 font-primary italic text-[22px] sm:text-[28px] leading-[1.3] text-primary-foreground max-w-[760px] mx-auto mb-6">
              "Kadın bedenini anlamak, onu basitleştirmek değil; karmaşıklığına saygı duymaktır.
              Biz bu yüzden önce bilime, sonra formüle bakıyoruz."
            </blockquote>
            <div className="text-[12px] uppercase tracking-[0.2em] text-primary-foreground/60 font-bold">
              Ecz. Arin Alan · .ki Bilim Kurulu
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 sm:py-24 bg-background">
          <div className="max-w-[760px] mx-auto px-5 sm:px-8 text-center">
            <h2 className="k5-reveal font-primary font-medium text-[28px] sm:text-[40px] leading-tight text-primary mb-6 tracking-tight">
              Kanıta dayalı formülleri keşfet.
            </h2>
            <p className="k5-reveal k5-reveal-d1 text-[15px] leading-relaxed text-foreground/75 mb-8">
              .ki ürünlerinin her biri, bu sayfada anlattığımız bilim disiplininden geçti.
            </p>
            <div className="k5-reveal k5-reveal-d2 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/balance"
                className="inline-flex items-center justify-center bg-primary text-primary-foreground text-[13px] font-bold py-3 px-6 rounded-full hover:bg-primary-medium transition-colors"
              >
                Ürünleri incele
              </a>
              <a
                href="/paket-olustur"
                className="inline-flex items-center justify-center border border-primary text-primary text-[13px] font-bold py-3 px-6 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Kendi paketini oluştur
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Bilim;
