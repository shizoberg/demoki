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
          Aklındaki <em className="italic font-light">sorular.</em>
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
    </div>
  </section>
);

export default FaqSection;
