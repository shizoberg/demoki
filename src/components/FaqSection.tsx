import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import faqFlorence from "@/assets/faq-florence.png";

const faqs = [
  {
    q: ".ki Balance Your Cycle Modern Takviye Gıdası Nedir?",
    a: ".ki Balance Your Cycle, kadın döngüsünü desteklemek üzere formüle edilmiş; bitkisel ekstreler, mineraller ve doğal bileşenler içeren şase formda bir takviye edici gıdadır.\n\nDöngü boyunca oluşabilen fiziksel ve duygusal dalgalanmaları dengelemeye yardımcı olmayı amaçlarken, döngünün dinleyen ritmine uyum sağlayan ve her ay yeniden dengeye gelmeni desteklemek için tasarlanmıştır.\n\nBu ürün ilaç mı?\nHayır. İlaç değildir ve adet söktürücü olarak tasarlanmamıştır. Tedavi edici amaç taşımaz.",
  },
  {
    q: ".ki Change is Good Modern Takviye Gıdası Nedir?",
    a: "Kadınların ilerleyen yaş dönemindeki desteklemek üzere formüle edilmiş; bitkisel ekstreler, vitaminler, mineraller ve doğal bileşenler içeren kapsül formda bir takviye edici gıdadır.\n\nYaş ilerlemesi ile birlikte ortaya çıkabilen fiziksel ve duygusal değişimleri nazikçe desteklemeyi amaçlarken; değişimi doğal bir süreç olarak ele alan, bedenin yeni ritmine uyum sağlamasına yardımcı olmak üzere tasarlanmıştır.\n\nBu ürün ilaç mı?\nÜrünümüz ilaç değildir.\n\nDeğişim iyidir.\nBu dönem, kendinle yeniden denge kurma zamanıdır.",
  },
  {
    q: ".ki Balance Your Cycle Modern Takviye Gıdası Kimler İçin Uygun?",
    a: "Döngüsünü desteklemek isteyen 18 yaş üstü kadınların kullanımına uygundur.\n\nÖzellikle:\n• Döngü sürecinde fiziksel ve duygusal dalgalanmalar yaşayanlar.\n• Döngü öncesini daha dengeli geçirmek isteyenler.\n• Bitkisel içerikli ve pratik bir destek arayanlar.\n• Günlük rutinine kolayca eklenebilen bir takviye tercih edenler.\n• Şase form sayesinde kapsül yutmakta zorlanan veya hassas mideye sahip olanlar.\n\nTakviye edici gıdalar, normal beslenmenin yerine geçmez.",
  },
  {
    q: ".ki Change is Good Modern Takviye Gıdası Kimler için Uygun?",
    a: "İleriki yaş dönemindeki yetişkin kadınlar için uygundur.\n\nÖzellikle:\n• Ruh hali dalgalanmalarını daha dengeli geçirmek isteyenler.\n• Bitkisel içerikli, hormon içermeyen bir destek arayanlar.\n• Günlük rutinine kolayca eklenebilen bir takviye tercih edenler.\n• Bedenindeki değişimi daha bilinçli ve nazik şekilde desteklemek isteyenler.\n\nTakviye edici gıdalar, normal beslenmenin yerine geçmez.",
  },
  {
    q: "Modern Takviye Edici Gıdalarımız Ne Değildir?",
    a: "Ne Değildir?\n• İlaç değildir.\n• Hormon içermez.\n• Tedavi edici amaç taşımaz.",
  },
];

const FaqSection = () => (
  <section className="py-20 sm:py-24 bg-cream-2/40 overflow-hidden" id="k5Faq">
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(260px,360px)_1fr] gap-8 lg:gap-12 items-end">
        {/* Illustration */}
        <div className="hidden lg:flex items-end justify-center lg:justify-start self-end">
          <img
            src={faqFlorence}
            alt="Düşünen kadın illüstrasyonu"
            className="k5-reveal w-full max-w-[360px] h-auto select-none pointer-events-none"
            loading="lazy"
          />
        </div>

        {/* Content */}
        <div className="max-w-[820px] w-full">
          <div className="text-center mb-12">
            <span className="k5-reveal text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-4 block">
              Sıkça sorulanlar
            </span>
            <h2 className="k5-reveal k5-reveal-d1 font-display font-medium text-[36px] sm:text-[48px] leading-[1.05] text-primary tracking-tight">
              Bizce senin aklındaki <em className="italic font-light">sorular.</em>
            </h2>
          </div>

          <Accordion type="single" collapsible className="k5-reveal k5-reveal-d2">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="border-b border-border/80">
                <AccordionTrigger className="font-display text-[18px] sm:text-[20px] font-medium text-primary text-left py-5 hover:no-underline hover:opacity-80">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] leading-relaxed text-foreground/75 pb-6 pr-8 whitespace-pre-line">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="k5-reveal k5-reveal-d3 mt-12 flex flex-col items-center gap-3 text-center">
            <p className="text-[13px] text-foreground/60">
              Aklındaki başka bir soru mu var?
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 h-12 text-[14px] font-medium tracking-wide"
            >
              <a href="#eczaci-danisma">
                <MessageCircle className="h-4 w-4" />
                Eczacımıza soru sor
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default FaqSection;
