const ingredients = [
  { icon: "🌿", name: "Vitex (Hayıt)", desc: "Hormonal dengeyi destekler, PMS belirtilerini hafifletir", delay: "" },
  { icon: "🌱", name: "Magnezyum Bisglisinat", desc: "Kas gevşetici, kramp azaltıcı, uyku desteği", delay: "k5-reveal-d1" },
  { icon: "☀️", name: "B6 Vitamini", desc: "Serotonin üretimini destekler, ruh halini dengeler", delay: "k5-reveal-d2" },
  { icon: "🍋", name: "Çinko", desc: "Cilt sağlığı, bağışıklık ve hormonal denge desteği", delay: "k5-reveal-d3" },
];

const badges = ["GMP sertifikalı", "Vegan formül", "Klinik dozaj", "30 günlük kullanım"];

const IngredientsSection = () => (
  <section className="py-8">
    <div className="container">
      <h2 className="k5-reveal text-[20px] font-bold text-center mb-5 text-foreground">İçindekiler</h2>
      <div className="grid grid-cols-2 gap-3">
        {ingredients.map((ing) => (
          <div key={ing.name} className={`k5-reveal ${ing.delay} bg-card rounded-xl p-3.5 flex gap-2.5 items-start shadow-sm border border-primary/[0.04]`}>
            <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 text-base">
              {ing.icon}
            </div>
            <div className="min-w-0">
              <div className="text-[12.5px] font-bold text-foreground mb-0.5 leading-tight">{ing.name}</div>
              <div className="text-[11px] text-muted-foreground leading-snug">{ing.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="k5-reveal flex gap-2 flex-wrap justify-center mt-4">
        {badges.map((b) => (
          <span key={b} className="bg-plum-pale rounded-full py-1.5 px-3.5 text-[11px] font-semibold text-primary">
            ✓ {b}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default IngredientsSection;
