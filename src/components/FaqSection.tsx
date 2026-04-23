import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const faqs = [
  {
    q: ".ki Balance ne kadar sürede etki gösterir?",
    a: "Çoğu kullanıcı 2-3 döngü düzenli kullanım sonrası belirgin fark bildiriyor. Magnezyum etkisi ilk 1-2 hafta içinde, Vitex'in hormonal etkisi ise 4-6 haftada netleşir.",
  },
  {
    q: "Günde kaç şase kullanmalıyım?",
    a: "Önerilen kullanım günde 1 şasedir. Tercihen yemekle birlikte ve aynı saatte alınması önerilir.",
  },
  {
    q: "Doğum kontrol hapı kullanırken alabilir miyim?",
    a: "Vitex hormonal etki gösterdiği için, doğum kontrol hapı kullanıyorsanız doktorunuza danışmadan kullanmamanızı öneririz. Eczacımız ücretsiz danışmanlık sağlayabilir.",
  },
  {
    q: "Hamilelikte veya emzirirken kullanılır mı?",
    a: "Hayır. Vitex içeriği nedeniyle hamilelik ve emzirme döneminde kullanılması önerilmez.",
  },
  {
    q: "İade politikanız nedir?",
    a: "30 gün boyunca memnun kalmazsanız ücretsiz iade hakkınız vardır. Açılmış paketler dahil.",
  },
];

const FaqSection = () => (
  <section className="py-20 sm:py-24 bg-cream-2/40" id="k5Faq">
    <div className="max-w-[860px] mx-auto px-5 sm:px-8">
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
            <AccordionContent className="text-[14px] leading-relaxed text-foreground/75 pb-6 pr-8">
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
  </section>
);

export default FaqSection;
