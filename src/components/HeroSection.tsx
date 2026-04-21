import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const HeroSection = () => {
  const counter = useAnimatedCounter(2400, 2000, false, "");

  return (
    <section className="relative min-h-[520px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a0f40] via-primary to-primary-medium">
      <div
        className="absolute inset-0 opacity-[0.12] mix-blend-luminosity bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200')",
        }}
      />
      <div className="relative z-[2] text-center px-5 py-16 max-w-[680px]">
        <h1 className="k5-reveal text-2xl md:text-3xl font-extrabold text-primary-foreground mb-1 tracking-tight">
          .li Balance
        </h1>
        <p className="k5-reveal k5-reveal-d1 text-sm md:text-base font-medium text-primary-foreground/70 mb-6 tracking-wide">
          Döngü Dönemi Desteği
        </p>
        <div className="k5-reveal k5-reveal-d2" ref={counter.ref}>
          <span className="text-[72px] font-extrabold leading-none tracking-[-2px] bg-gradient-to-br from-primary-foreground to-primary-foreground/70 bg-clip-text text-transparent">
            {counter.value}
          </span>
          <span className="text-[72px] font-extrabold leading-none text-primary-foreground">+</span>
        </div>
        <div className="k5-reveal k5-reveal-d1 text-base font-medium text-primary-foreground/75 mb-5 tracking-wide">
          kadın tarafından tercih ediliyor
        </div>

        <div className="k5-reveal k5-reveal-d2 flex justify-center mb-5">
          <img
            src="/sachet-360.gif"
            alt=".ki Balance şase ürünü"
            className="h-32 w-auto sm:h-40 select-none pointer-events-none drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
            draggable={false}
          />
        </div>

        <div className="k5-reveal k5-reveal-d2 text-xl text-star tracking-[3px] mb-1.5">★★★★★</div>
        <div className="k5-reveal k5-reveal-d2 text-sm text-primary-foreground/65 font-medium mb-6">
          5.0 ortalama puan
        </div>

        <div className="k5-reveal k5-reveal-d2 grid grid-cols-3 gap-3 sm:gap-4 max-w-[420px] mx-auto mb-7">
          {[
            {
              label: "Şişkinlik",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3c3.5 4 6 7 6 11a6 6 0 0 1-12 0c0-4 2.5-7 6-11z" />
                  <path d="M10 14c.5 1 1.2 1.5 2 1.5s1.5-.5 2-1.5" />
                </svg>
              ),
            },
            {
              label: "Kas/sinir gerilimleri",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
                </svg>
              ),
            },
            {
              label: "Ruh hali dalgalanmaları",
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 12c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
                  <path d="M3 18c2-3 4-3 6 0s4 3 6 0 4-3 6 0" />
                </svg>
              ),
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center text-center gap-2">
              <div className="w-11 h-11 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 flex items-center justify-center text-primary-foreground">
                <div className="w-5 h-5">{item.icon}</div>
              </div>
              <span className="text-[11px] leading-tight font-medium text-primary-foreground/85">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="k5-reveal k5-reveal-d3 text-[15px] sm:text-base text-primary-foreground/[0.88] leading-relaxed mb-7 max-w-[460px] mx-auto">
          PMS döneminde yaşadığın <strong className="font-semibold">şişkinlik</strong>, <strong className="font-semibold">kas/sinir gerilimleri</strong> ve <strong className="font-semibold">ruh hali dalgalanmalarını</strong> desteklemek için geliştirildi.
        </p>

        <p className="k5-reveal k5-reveal-d3 hidden text-lg text-primary-foreground/[0.88] leading-relaxed mb-9">
          Gerçek kadınlar, gerçek sonuçlar.
          <br />
          Döngüsünü dengeleyenlerin hikayeleri.
        </p>
        <a
          href="#k5Reviews"
          className="k5-reveal k5-reveal-d4 inline-flex items-center gap-2 bg-primary-foreground text-primary text-[15px] font-bold py-3.5 px-9 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.25)] relative overflow-hidden"
        >
          Hikayeleri oku
          <svg
            className="w-[18px] h-[18px] transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
