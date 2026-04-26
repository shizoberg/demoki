const stats = [
  { value: "12", suffix: "hf", label: "klinik araştırma referansı" },
  { value: "2.400+", suffix: "", label: "kadın tarafından tercih ediliyor" },
  { value: "%87", suffix: "", label: "kullanıcı 2. döngüde rahatlama bildirdi" },
];

const ScienceSection = () => (
  <section className="py-20 sm:py-24 bg-primary text-primary-foreground" id="k5Science">
    <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: cream block placeholder */}
        <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-cream-2 via-cream-3 to-secondary relative overflow-hidden order-2 md:order-1 k5-reveal">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-8">
              <div className="font-primary text-[18px] italic text-primary/70 mb-2">"Bilim önce, sonra formül."</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-primary/60 font-bold">
                Ecz. Arin Alan · .ki Bilim Kurulu
              </div>
            </div>
          </div>
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-rose-light/50 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-sage-light/40 blur-2xl" />
        </div>

        {/* Right: copy + stats */}
        <div className="order-1 md:order-2">
          <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70 mb-5 block">
            Bilime dayalı
          </span>
          <h2 className="k5-reveal k5-reveal-d1 font-primary font-medium text-[36px] sm:text-[48px] leading-[1.05] tracking-tight mb-6">
            Pazarlama değil, <em className="italic font-light">kanıt.</em>
          </h2>
          <p className="k5-reveal k5-reveal-d2 text-[15px] leading-relaxed text-primary-foreground/80 mb-10 max-w-[460px]">
            Her etkin madde, peer-review yayınlanmış klinik çalışmalardan seçildi. Eczacılarımız ve kadın sağlığı uzmanlarıyla geliştirildi; bağımsız laboratuvarlarda test edildi.
          </p>

          <div className="grid grid-cols-3 gap-5 sm:gap-8 pt-8 border-t border-primary-foreground/15">
            {stats.map((s, i) => (
              <div key={s.label} className={`k5-reveal k5-reveal-d${i + 2}`}>
                <div className="font-primary text-[34px] sm:text-[40px] font-medium leading-none mb-2">
                  {s.value}
                  <span className="text-[16px] font-medium opacity-70">{s.suffix}</span>
                </div>
                <div className="text-[11.5px] text-primary-foreground/70 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default ScienceSection;
