import { useState } from "react";

const reviews = [
  {
    initials: "SE",
    name: "Selin",
    info: "28 yaş, İstanbul",
    question: "Adet döneminde yaşadığım şiddetli kramplar için doğal bir çözüm var mı?",
    answer:
      "Vitex (Hayıt) ve Magnezyum kombinasyonu prostaglandin seviyesini dengeleyerek kramp şiddetini azaltır. .ki Balance içindeki B6 ve Çinko da kas gevşemesine destek olur. Adet başlamadan 7-10 gün önce düzenli kullanım önerilir.",
  },
  {
    initials: "ZE",
    name: "Zeynep",
    info: "30 yaş, Ankara",
    question: "PMS döneminde ruh halim çok değişiyor, bu normal mi ve ne yapabilirim?",
    answer:
      "PMS'te östrojen-progesteron dengesizliği serotonin üretimini etkiler, bu yüzden ruh hali dalgalanmaları çok yaygındır. Vitex hipofizi düzenleyerek hormonal dengeyi destekler; B6 ise serotonin sentezine yardımcı olur. 2-3 döngü düzenli kullanımla belirgin iyileşme görülür.",
  },
  {
    initials: "EL",
    name: "Elif",
    info: "27 yaş, İzmir",
    question: "Adet öncesi şişkinlik ve ödem sorunum var, bunu nasıl azaltabilirim?",
    answer:
      "Magnezyum doğal bir diüretik etki gösterir ve su tutulmasını azaltır. B6 ile birlikte alındığında premenstrüel ödem üzerinde klinik olarak kanıtlanmış etkisi vardır. Tuz tüketimini azaltmak ve günde 2-2.5 L su içmek de süreci hızlandırır.",
  },
  {
    initials: "ME",
    name: "Merve",
    info: "32 yaş, Bursa",
    question: "Hormonal dengesizlik uyku düzenimi bozuyor, takviye işe yarar mı?",
    answer:
      "Magnezyum bisglisinat formu hem kas gevşemesi hem de melatonin üretimini destekler. PMS döneminde yaşanan uykusuzlukta özellikle akşam alımı faydalıdır. Vitex ise progesteron dengesini düzelterek uyku kalitenizi 4-6 hafta içinde iyileştirir.",
  },
  {
    initials: "CE",
    name: "Ceren",
    info: "29 yaş, Antalya",
    question: "Adet döneminde konsantrasyon kaybı yaşıyorum, bunun için ne önerirsiniz?",
    answer:
      "Demir ve B6 eksikliği konsantrasyon problemlerinin başlıca sebebidir. .ki Balance içindeki B6 ve Çinko bilişsel fonksiyonlara destek olur. Düzenli kullanımla 'beyin sisi' belirgin şekilde azalır; ayrıca kafein tüketimini öğleden sonra sınırlamanızı öneririm.",
  },
  {
    initials: "NA",
    name: "Naz",
    info: "25 yaş, İstanbul",
    question: "Doğal içerikli bir ürün gerçekten ağrı kesici kadar etkili olabilir mi?",
    answer:
      "Doğal takviyeler anlık etki göstermez, ancak düzenli kullanımda kök nedeni düzenler. Ağrı kesiciler semptomu bastırırken Vitex+Magnezyum hormonal dengeyi sağlayarak kramp şiddetinin oluşmasını engeller. 2-3 ay içinde ağrı kesici ihtiyacınız belirgin azalır.",
  },
];

const PharmacistAnswer = ({ text }: { text: string }) => (
  <div className="mt-4 bg-sage/10 border border-sage/25 rounded-xl px-4 py-3.5">
    <div className="flex items-center gap-1.5 mb-2">
      <svg className="w-3.5 h-3.5 text-sage" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
      <span className="text-[11px] font-semibold text-sage uppercase tracking-wide">
        Ecz. Arin Alan'ın Yanıtı
      </span>
    </div>
    <p className="text-[13px] leading-relaxed text-foreground/85">
      {text}
    </p>
  </div>
);

const ReviewCard = ({ review, delay, animate = false }: { review: typeof reviews[0]; delay: string; animate?: boolean }) => (
  <div className={`${animate ? "animate-fade-in" : delay ? `k5-reveal ${delay}` : ""} bg-white rounded-[20px] p-7 shadow-sm border border-primary/[0.06] transition-all hover:-translate-y-0.5 hover:shadow-md`}>
    <div className="flex items-center gap-3.5 mb-4">
      <div className="w-12 h-12 rounded-full bg-secondary border-2 border-primary flex items-center justify-center text-base font-bold text-primary flex-shrink-0">
        {review.initials}
      </div>
      <div>
        <div className="text-sm font-bold text-foreground">{review.name}</div>
        <div className="text-xs text-muted-foreground">{review.info}</div>
      </div>
    </div>
    <p className="text-[14.5px] leading-relaxed text-foreground font-medium mb-1">
      &ldquo;{review.question}&rdquo;
    </p>
    <PharmacistAnswer text={review.answer} />
  </div>
);

const ReviewsSection = () => {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? reviews : reviews.slice(0, 1);

  return (
    <section className="py-10 sm:py-12" id="k5Reviews">
      <div className="container">
        <h2 className="k5-reveal text-center text-[22px] sm:text-[24px] font-bold text-foreground mb-1.5">
          Kullanıcılarımız Ne Soruyor?
        </h2>
        <p className="k5-reveal k5-reveal-d1 text-center text-[13.5px] sm:text-[14px] text-muted-foreground mb-8 max-w-[480px] mx-auto">
          Sıkça sorulan sorular ve uzman eczacımızın yanıtları
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {visible.map((r, i) => (
            <ReviewCard key={r.initials} review={r} delay={i > 0 ? `k5-reveal-d${i}` : ""} animate={expanded && i > 0} />
          ))}
        </div>

        <div className="k5-reveal text-center pt-8">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary border-2 border-primary/20 py-3 px-8 rounded-full transition-all hover:bg-primary/5 hover:border-primary/40"
          >
            {expanded ? "Daha az gör" : "Daha fazlasını gör"}
            <svg className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
