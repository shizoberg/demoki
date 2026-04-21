import { FlaskConical, Leaf, ShieldCheck, Truck } from "lucide-react";

const items = [
  { icon: FlaskConical, title: "Klinik dozaj", desc: "Etkin maddeler bilimsel dozda" },
  { icon: Leaf, title: "Vegan & temiz", desc: "Yapay tatlandırıcı içermez" },
  { icon: ShieldCheck, title: "GMP sertifikalı", desc: "Bağımsız laboratuvarda test" },
  { icon: Truck, title: "Ücretsiz kargo", desc: "Tüm Türkiye'ye, 1-2 iş günü" },
];

const ValueStrip = () => (
  <section className="bg-cream-2/50 border-y border-border/60">
    <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-7 sm:py-9">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {items.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 k5-reveal">
            <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0 border border-border">
              <Icon className="w-4 h-4 text-primary" strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-bold text-primary leading-tight mb-0.5">{title}</div>
              <div className="text-[11.5px] text-muted-foreground leading-snug">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ValueStrip;
