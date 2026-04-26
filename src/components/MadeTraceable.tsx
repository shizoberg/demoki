const steps = [
  { n: "01", title: "Kaynak", desc: "Tedarikçilerimizi ülke, tesis ve sertifika seviyesinde belgeliyoruz." },
  { n: "02", title: "Test", desc: "Her parti, bağımsız laboratuvarda saflık ve dozaj için test ediliyor." },
  { n: "03", title: "Üretim", desc: "GMP sertifikalı tesiste, gıda güvenliği standartlarıyla üretim." },
  { n: "04", title: "Sevkiyat", desc: "Şase formatı sayesinde plastik atık minimum, taşıma kolay." },
];

const MadeTraceable = () => (
  <section className="py-20 sm:py-24 bg-background">
    <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
      <div className="text-center max-w-[640px] mx-auto mb-14">
        <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-4 block">
          Takip edilebilir üretim
        </span>
        <h2 className="k5-reveal k5-reveal-d1 font-primary font-medium text-[36px] sm:text-[48px] leading-[1.05] text-primary tracking-tight mb-5">
          Tarladan <em className="italic font-light">şaseye</em> kadar.
        </h2>
        <p className="k5-reveal k5-reveal-d2 text-[15px] leading-relaxed text-foreground/75">
          Her .ki Balance şasesinin yolculuğunu adım adım takip edebiliyoruz.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((s, i) => (
          <div
            key={s.n}
            className={`k5-reveal k5-reveal-d${Math.min(i + 1, 4)} bg-secondary/40 border border-border/60 rounded-2xl p-6 hover:bg-secondary transition-colors`}
          >
            <div className="font-primary text-[14px] font-medium text-rose mb-6 tracking-wider">
              {s.n}
            </div>
            <h3 className="font-primary text-[22px] font-medium text-primary leading-tight mb-2">
              {s.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-foreground/70">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MadeTraceable;
