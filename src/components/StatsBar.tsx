import { useAnimatedCounter } from "@/hooks/useAnimatedCounter";

const stats = [
  { target: 2400, label: "Mutlu kullanıcı", suffix: "+", decimal: false },
  { target: 5.0, label: "Ortalama puan", suffix: "", decimal: true },
  { target: 90, label: "Doğrulanmış yorum", suffix: "+", decimal: false },
  { target: 92, label: "Tekrar satın alma", suffix: "%", decimal: false },
];

const StatItem = ({ target, label, suffix, decimal, delay }: { target: number; label: string; suffix: string; decimal: boolean; delay: string }) => {
  const counter = useAnimatedCounter(target, 1800, decimal, suffix);
  return (
    <div className={`k5-reveal ${delay}`} ref={counter.ref}>
      <div className="text-[40px] font-extrabold text-primary-foreground leading-tight tracking-tight">
        {counter.value}
      </div>
      <div className="text-[13px] text-primary-foreground/70 font-medium mt-1">{label}</div>
    </div>
  );
};

const StatsBar = () => (
  <section className="bg-gradient-to-br from-primary to-primary-medium py-12 mt-12">
    <div className="container">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-5 text-center">
        {stats.map((s, i) => (
          <StatItem key={s.label} {...s} delay={i > 0 ? `k5-reveal-d${i}` : ""} />
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;
