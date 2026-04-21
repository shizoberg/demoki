const BeforeAfter = () => (
  <section className="py-10 relative overflow-hidden">
    {/* Animated gradient background */}
    <div className="absolute inset-0 -z-10 opacity-60">
      <div className="absolute inset-0 bg-gradient-to-br from-plum-pale via-secondary/40 to-rose-light/40 animate-gradient-shift" />
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-blob" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-rose/10 rounded-full blur-3xl animate-blob animation-delay-2000" />
    </div>

    <div className="container relative">
      <div className="k5-reveal text-center mb-5">
        <span className="inline-block text-[11px] font-bold uppercase tracking-[0.18em] text-primary/70 mb-2">
          Fark Yarat
        </span>
        <h2 className="text-[22px] sm:text-[26px] font-bold text-foreground">
          Öncesi & Sonrası
        </h2>
      </div>

      <div className="k5-reveal k5-reveal-d1 flex flex-col sm:flex-row rounded-2xl overflow-hidden shadow-md border border-primary/[0.08] bg-card/60 backdrop-blur-sm">
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-1.5 bg-secondary/40">
          <div className="text-[11px] font-bold uppercase tracking-wider text-primary/70">Öncesi</div>
          <div className="text-[13px] text-foreground/80 leading-snug">
            Kramp, şişkinlik, ruh hali dalgalanması, uyku bozukluğu
          </div>
        </div>
        <div className="flex items-center justify-center bg-card px-3 py-2 sm:py-0">
          <svg className="w-5 h-5 text-primary sm:rotate-0 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
          </svg>
        </div>
        <div className="flex-1 p-4 sm:p-5 flex flex-col gap-1.5 bg-plum-pale">
          <div className="text-[11px] font-bold uppercase tracking-wider text-primary">Sonrası</div>
          <div className="text-[13px] text-foreground leading-snug font-medium">
            Dengeli döngü, enerji, net zihin, rahat uyku
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default BeforeAfter;
