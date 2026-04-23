import { useState } from "react";
import { Instagram, Youtube, Linkedin, ArrowRight } from "lucide-react";
import kiLogo from "@/assets/ki-logo-white.png";
import paymentLogos from "@/assets/payment-logos.png";

const productLinks = [
  { label: "Günlük Ped", href: "#" },
  { label: "Gündüz Ped", href: "#" },
  { label: "Gece Ped", href: "#" },
  { label: ".ki Balance · Saşe", href: "#" },
  { label: ".ki Change · Kapsül", href: "#" },
  { label: "Cycle Care Yağı · 10 ml", href: "#" },
  { label: "Bakım Jeli · Daily", href: "#" },
  { label: "Bakım Jeli · Sens", href: "#" },
  { label: "Bakım Jeli · Flow", href: "#" },
  { label: "Bakım Jeli · 50+", href: "#" },
  { label: "İntim Bakım Spreyi", href: "#" },
];

const helpLinks = [
  { label: "Reglini Çiz", href: "#" },
  { label: "Anlaşmalı Eczaneler", href: "#" },
  { label: "Sıkça Sorulan Sorular", href: "#k5Faq" },
  { label: "Kargo & İade", href: "#" },
  { label: "Eczacı Danışmanlığı", href: "#" },
];

const legalLinks = [
  { label: "Hakkımızda", href: "#" },
  { label: "İletişim", href: "#" },
  { label: "KVKK Aydınlatma Metni", href: "#" },
  { label: "Açık Rıza Metni", href: "#" },
  { label: "Teslimat ve İade Şartları", href: "#" },
  { label: "Mesafeli Satış Sözleşmesi", href: "#" },
];

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z" />
  </svg>
);

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-8">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
        {/* Top: Brand + Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 pb-14 border-b border-primary-foreground/15">
          <div>
            <img src={kiLogo} alt=".ki" className="h-14 w-auto mb-5" />
            <p className="font-display text-[28px] sm:text-[32px] leading-[1.1] font-medium max-w-[420px]">
              Kendine iyi bak.
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-primary-foreground/70 max-w-[420px]">
              Kadınlar için, kadınlarla geliştirilen bilime dayalı döngü destek formülleri.
            </p>
          </div>

          <div className="lg:pl-8">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60 mb-3">
              Bültene Katıl
            </div>
            <p className="text-[15px] text-primary-foreground/85 mb-5 max-w-[380px]">
              Yeni ürünler, döngü ipuçları ve özel kampanyalar için e-posta listemize katıl.
            </p>
            <form onSubmit={handleSubmit} className="flex items-center gap-2 max-w-[420px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresin"
                className="flex-1 bg-transparent border-b border-primary-foreground/40 focus:border-primary-foreground outline-none py-3 text-[14px] text-primary-foreground placeholder:text-primary-foreground/50 transition-colors"
              />
              <button
                type="submit"
                aria-label="Abone ol"
                className="shrink-0 w-11 h-11 rounded-full bg-primary-foreground text-primary flex items-center justify-center hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <p className="mt-3 text-[11px] text-primary-foreground/55 max-w-[380px]">
              Kayıt olarak KVKK Aydınlatma Metni'ni okuduğunu kabul edersin.
            </p>
          </div>
        </div>

        {/* Middle: Link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 py-14">
          <div className="col-span-2 md:col-span-2">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60 mb-5">
              Ürünler
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60 mb-5">
              Yardımcı Araçlar
            </div>
            <ul className="space-y-3">
              {helpLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[14px] text-primary-foreground/85 hover:text-primary-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60 mb-5">
              Bizi Takip Et
            </div>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <TikTokIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Youtube className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
            </div>

            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60 mt-8 mb-4">
              Güvenli Ödeme
            </div>
            <div className="bg-primary-foreground/95 rounded-lg px-4 py-3 inline-flex">
              <img src={paymentLogos} alt="Kabul edilen ödeme yöntemleri" className="h-5 w-auto" />
            </div>
          </div>
        </div>

        {/* Bottom: Legal */}
        <div className="pt-8 border-t border-primary-foreground/15 flex flex-col gap-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-primary-foreground/60">
            {legalLinks.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-primary-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[11px] text-primary-foreground/55">
            <div>© {new Date().getFullYear()} .ki — Tüm hakları saklıdır.</div>
            <div>.Ki Magnezyum ve Hayıt İçeren Takviye Edici Gıda · Onay No: 024990-06.11.2025</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
