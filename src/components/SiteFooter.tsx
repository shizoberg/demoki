import { useState } from "react";
import { Instagram, Youtube, Linkedin, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import kiFooterIllustration from "@/assets/ki-footer-illustration.webp";
import paymentLogos from "@/assets/payment-logos.webp";
import regliniCizBg from "@/assets/reglini-ciz-bg.webp";

const productsCol1 = [
  { label: "Günlük Ped", href: "/pedler" },
  { label: "Gece Ped", href: "/pedler" },
  { label: ".ki Change · Kapsül", href: "#" },
  { label: "Bakım Jeli · Daily", href: "#" },
  { label: "Bakım Jeli · Flow", href: "#" },
  { label: "İntim Bakım Spreyi", href: "#" },
];

const productsCol2 = [
  { label: "Gündüz Ped", href: "/pedler" },
  { label: ".ki Balance · Saşe", href: "#" },
  { label: "Cycle Care Yağı · 10 ml", href: "#" },
  { label: "Bakım Jeli · Sens", href: "#" },
  { label: "Bakım Jeli · 50+", href: "#" },
];

const allProducts = [...productsCol1, ...productsCol2];

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

/* Mobile-only collapsible group */
const MobileAccordion = ({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-t border-primary-foreground/15">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="text-[13px] font-bold uppercase tracking-[0.22em] text-primary-foreground/80">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-primary-foreground/70 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && <div className="pb-5 animate-fade-in">{children}</div>}
    </div>
  );
};

const SiteFooter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-16 lg:pt-20 pb-8">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Main grid: Brand | Products(2 cols) | Right (CTA + Newsletter) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-10 pb-10 lg:pb-14">
          {/* Brand block */}
          <div className="lg:col-span-3">
            <p className="font-display text-[28px] sm:text-[32px] leading-[1.05] font-medium text-primary-foreground mb-4">
              Kendine iyi bak.
            </p>
            <div className="mb-7 overflow-hidden rounded-2xl">
              <img
                src={kiFooterIllustration}
                alt=".ki — Kendine iyi bak"
                className="w-full h-auto block"
              />
            </div>

            {/* Social — centered on mobile, left on desktop */}
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-8">
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
              className="hidden lg:inline-flex items-center gap-2 text-[18px] font-semibold hover:opacity-80 transition-opacity"
            >
              Anlaşmalı Eczanelerimiz
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          {/* Products: desktop 2 columns */}
          <div className="hidden lg:block lg:col-span-5 lg:pl-4">
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
            {/* Reglini Çiz card — mobil yüksekliği %40 azaltıldı */}
            <a
              href="#"
              className="group relative block overflow-hidden rounded-2xl bg-[hsl(252,70%,90%)] hover:bg-[hsl(252,70%,93%)] text-primary transition-colors border border-primary-foreground/10 aspect-[16/4.8] lg:aspect-[16/8]"
            >
              <img
                src={regliniCizBg}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full h-full object-cover opacity-90 pointer-events-none"
              />
              <ArrowUpRight className="absolute top-4 right-4 lg:top-5 lg:right-5 w-5 h-5 text-foreground/70 group-hover:text-foreground group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
              <div className="absolute left-5 bottom-4 right-5 lg:left-6 lg:bottom-6 lg:right-6">
                <div className="font-display text-[18px] lg:text-[22px] leading-tight font-medium mb-0.5 lg:mb-1 text-foreground">
                  Reglini Çiz!
                </div>
                <p className="text-[12px] lg:text-[13px] text-foreground/80 max-w-[260px] leading-snug">
                  Hislerini yansıtmanı sağlayan bir platform.
                </p>
              </div>
            </a>

            {/* Newsletter */}
            <div>
              <p className="text-[18px] md:text-[20px] text-primary-foreground mb-5 max-w-[440px] lg:whitespace-nowrap">
                Sana özel şeylerden haberdar ol.
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

        {/* MOBILE: accordions */}
        <div className="lg:hidden mb-6">
          <MobileAccordion title="Ürünler">
            <ul className="flex flex-col">
              {allProducts.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block py-2.5 text-[15px] text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          <MobileAccordion title="Sözleşmeler">
            <ul className="flex flex-col">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block py-2.5 text-[15px] text-primary-foreground/90 hover:text-primary-foreground transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </MobileAccordion>

          {/* Anlaşmalı eczaneler — mobilde accordion'lardan sonra */}
          <a
            href="#"
            className="border-t border-primary-foreground/15 flex items-center justify-between py-4 text-[15px] font-semibold hover:opacity-80 transition-opacity"
          >
            Anlaşmalı Eczanelerimiz
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Payment logos row */}
        <div className="flex items-center justify-center py-6 border-t border-primary-foreground/15">
          <img
            src={paymentLogos}
            alt="Kabul edilen ödeme yöntemleri"
            className="h-6 w-auto"
          />
        </div>

        {/* Bottom: Legal — desktop only (mobile has it under "Sözleşmeler" accordion) */}
        <div className="hidden lg:block pt-6 border-t border-primary-foreground/15">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-primary-foreground/65">
            {legalLinks.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="hover:text-primary-foreground transition-colors"
              >
                {l.label}
              </a>
            ))}
            <span className="ml-auto text-primary-foreground/55 text-[11px]">
              © {new Date().getFullYear()} .ki — Tüm hakları saklıdır.
            </span>
          </div>
        </div>

        {/* Mobile copyright */}
        <div className="lg:hidden pt-4 text-center text-[11px] text-primary-foreground/55">
          © {new Date().getFullYear()} .ki — Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
