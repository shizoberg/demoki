import { Award, FlaskConical, HeartHandshake, Leaf, ShieldCheck, Sparkles, Truck } from "lucide-react";

const items = [
  { icon: FlaskConical, title: "Klinik dozaj", desc: "Etkin maddeler bilimsel dozda" },
  { icon: Leaf, title: "Vegan & temiz", desc: "Yapay tatlandırıcı içermez" },
  { icon: ShieldCheck, title: "GMP sertifikalı", desc: "Bağımsız laboratuvarda test" },
  { icon: Truck, title: "Ücretsiz kargo", desc: "Tüm Türkiye'ye, 1-2 iş günü" },
  { icon: Sparkles, title: "Doğal içerikler", desc: "Bitkisel & mineral kaynaklı" },
  { icon: Award, title: "FDA onaylı tesis", desc: "Uluslararası standartlarda üretim" },
  { icon: HeartHandshake, title: "30 gün iade", desc: "Koşulsuz memnuniyet garantisi" },
];

const Item = ({ icon: Icon, title, desc }: { icon: typeof FlaskConical; title: string; desc: string }) => (
  <div className="flex items-center gap-2.5 sm:gap-3 px-5 sm:px-10 flex-shrink-0">
    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-background flex items-center justify-center flex-shrink-0 border border-border">
      <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" strokeWidth={2} />
    </div>
    <div className="min-w-0 whitespace-nowrap">
      <div className="text-[11.5px] sm:text-[13px] font-bold text-primary leading-tight mb-0.5">{title}</div>
      <div className="text-[10px] sm:text-[11.5px] text-muted-foreground leading-snug">{desc}</div>
    </div>
  </div>
);

const ValueStrip = () => (
  <section className="bg-cream-2/50 border-y border-border/60 overflow-hidden">
    <div className="py-7 sm:py-9 relative">
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-cream-2/90 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-cream-2/90 to-transparent z-10" />

      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {[...items, ...items].map((item, idx) => (
          <Item key={`${item.title}-${idx}`} {...item} />
        ))}
      </div>
    </div>
  </section>
);

export default ValueStrip;
