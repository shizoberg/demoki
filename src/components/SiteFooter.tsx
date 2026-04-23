import { useState } from "react";
import { Instagram, Youtube, Linkedin, ArrowRight, ArrowUpRight } from "lucide-react";
import kiLogo from "@/assets/ki-logo-white.png";
import paymentLogos from "@/assets/payment-logos.png";

const productsCol1 = [
  { label: "Günlük Ped", href: "#" },
  { label: "Gece Ped", href: "#" },
  { label: ".ki Change · Kapsül", href: "#" },
  { label: "Bakım Jeli · Daily", href: "#" },
  { label: "Bakım Jeli · Flow", href: "#" },
  { label: "İntim Bakım Spreyi", href: "#" },
];

const productsCol2 = [
  { label: "Gündüz Ped", href: "#" },
  { label: ".ki Balance · Saşe", href: "#" },
  { label: "Cycle Care Yağı · 10 ml", href: "#" },
  { label: "Bakım Jeli · Sens", href: "#" },
  { label: "Bakım Jeli · 50+", href: "#" },
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
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Main grid: Brand | Products(2 cols) | Right (CTA + Newsletter) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-12 pb-14">
          {/* Brand block */}
          <div className="lg:col-span-3">
            <img src={kiLogo} alt=".ki" className="h-12 w-auto mb-6" />
            <p className="font-display text-[34px] sm:text-[38px] leading-[1.05] font-medium mb-7">
              Kendine iyi bak.
            </p>

            <div className="flex items-center gap-3 mb-8">
              <a
                href="#"
                aria-label="Instagram"
                className="w-11 h-11 rounded-full border border-primary-foreground/35 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#"
                aria-label="TikTok"
                className="w-11 h-11 rounded-full border border-primary-foreground/35 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <TikTokIcon className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="w-11 h-11 rounded-full border border-primary-foreground/35 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Youtube className="w-[18px] h-[18px]" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-full border border-primary-foreground/35 flex items-center justify-center hover:bg-primary-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-[18px] h-[18px]" />
              </a>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-[18px] font-semibold hover:opacity-80 transition-opacity"
            >
              Anlaşmalı Eczanelerimiz
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Products: 2 columns */}
          <div className="lg:col-span-5 lg:pl-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground/60 mb-7">
              Ürünler
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-5">
              <ul className="space-y-5">
                {productsCol1.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[16px] text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className="space-y-5">
                {productsCol2.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[16px] text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Reglini Çiz card + Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-8">
            {/* Reglini Çiz card */}
            <a
              href="#"
              className="group block rounded-2xl bg-primary-foreground/12 hover:bg-primary-foreground/18 transition-colors p-6 backdrop-blur-sm border border-primary-foreground/10"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-display text-[22px] leading-tight font-medium mb-1">
                    Reglini Çiz!
                  </div>
                  <p className="text-[13px] text-primary-foreground/75 max-w-[260px]">
                    Hislerini yansıtmanı sağlayan bir platform.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold">
                    Ziyaret Et
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
                <ArrowUpRight className="w-5 h-5 text-primary-foreground/60 group-hover:text-primary-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              </div>
            </a>

            {/* Newsletter */}
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground/60 mb-3">
                Bültene Katıl
              </div>
              <p className="text-[14px] text-primary-foreground/80 mb-5 max-w-[380px]">
                Yeni ürünler, döngü ipuçları ve özel kampanyalar için e-posta listemize katıl.
              </p>
              <form onSubmit={handleSubmit} className="flex items-end gap-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresin"
                  className="flex-1 bg-transparent border-b border-primary-foreground/40 focus:border-primary-foreground outline-none py-2.5 text-[14px] text-primary-foreground placeholder:text-primary-foreground/55 transition-colors"
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
        </div>

        {/* Payment logos row */}
        <div className="flex items-center justify-between flex-wrap gap-4 py-6 border-t border-primary-foreground/15">
          <div className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary-foreground/60">
            Güvenli Ödeme
          </div>
          <div className="bg-primary-foreground/95 rounded-lg px-4 py-2.5 inline-flex">
            <img src={paymentLogos} alt="Kabul edilen ödeme yöntemleri" className="h-5 w-auto" />
          </div>
        </div>

        {/* Bottom: Legal */}
        <div className="pt-6 border-t border-primary-foreground/15 flex flex-col gap-4">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-primary-foreground/65">
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
