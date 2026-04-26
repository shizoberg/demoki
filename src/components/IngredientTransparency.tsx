const ingredients = [
  {
    name: "Vitex (Hayıt)",
    dose: "200 mg",
    role: "Hormonal denge",
    desc: "Hipofiz bezini düzenleyerek progesteron-östrojen dengesini destekler. PMS belirtilerinin kök nedenine etki eder.",
    source: "Akdeniz, Türkiye",
  },
  {
    name: "Magnezyum Bisglisinat",
    dose: "150 mg",
    role: "Kas & uyku",
    desc: "Bağırsak dostu, yüksek emilimli form. Kas gevşemesi, kramp azaltma ve melatonin sentezine destek olur.",
    source: "Almanya",
  },
  {
    name: "B6 Vitamini (P-5-P)",
    dose: "10 mg",
    role: "Ruh hali",
    desc: "Aktif form B6 — serotonin ve dopamin üretimine doğrudan katkı sağlar. Premenstrüel ödem üzerinde klinik kanıtı vardır.",
    source: "İsviçre",
  },
  {
    name: "Çinko Bisglisinat",
    dose: "8 mg",
    role: "Cilt & bağışıklık",
    desc: "Hormon metabolizması ve cilt sağlığı için kritik mineral. Şelatlı form ile yüksek biyoyararlanım.",
    source: "Almanya",
  },
];

const IngredientTransparency = () => (
  <section className="py-20 sm:py-24 bg-background" id="k5Ingredients">
    <div className="max-w-[1080px] mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 mb-12 items-end">
        <div>
          <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-4 block">
            Şeffaf formül
          </span>
          <h2 className="k5-reveal k5-reveal-d1 font-primary font-medium text-[36px] sm:text-[48px] leading-[1.05] text-primary tracking-tight">
            Her bir <em className="italic font-light">miligramın</em> hesabını veriyoruz.
          </h2>
        </div>
        <p className="k5-reveal k5-reveal-d2 text-[15px] leading-relaxed text-foreground/75 max-w-[480px] md:justify-self-end">
          Hangi içeriği, hangi dozda, neden kullandığımızı söylüyoruz. Kaynağına kadar takip edilebilir tedarik zinciriyle çalışıyoruz.
        </p>
      </div>

      {/* Table-like editorial list */}
      <div className="border-t border-border">
        {ingredients.map((ing, i) => (
          <div
            key={ing.name}
            className={`k5-reveal ${i > 0 ? `k5-reveal-d${Math.min(i, 4)}` : ""} grid grid-cols-12 gap-4 sm:gap-6 py-7 border-b border-border items-start`}
          >
            <div className="col-span-12 sm:col-span-5">
              <div className="flex items-baseline gap-3 mb-1">
                <h3 className="font-primary text-[22px] sm:text-[26px] font-medium text-primary leading-tight">
                  {ing.name}
                </h3>
                <span className="text-[12px] font-bold text-rose tracking-wide">{ing.dose}</span>
              </div>
              <span className="inline-block text-[10.5px] font-bold uppercase tracking-[0.18em] text-sage">
                {ing.role}
              </span>
            </div>
            <p className="col-span-12 sm:col-span-5 text-[14px] leading-relaxed text-foreground/75">
              {ing.desc}
            </p>
            <div className="col-span-12 sm:col-span-2 text-[11.5px] text-muted-foreground font-medium">
              <div className="uppercase tracking-wider text-[10px] mb-0.5 text-foreground/50">Kaynak</div>
              {ing.source}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default IngredientTransparency;
