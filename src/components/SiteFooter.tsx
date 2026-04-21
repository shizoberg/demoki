const cols = [
  {
    title: "Ürün",
    links: [".ki Balance", "İçindekiler", "Bilim", "Yorumlar"],
  },
  {
    title: "Şirket",
    links: ["Hakkımızda", "Standartlarımız", "Bilim Kurulu", "İletişim"],
  },
  {
    title: "Yardım",
    links: ["SSS", "Kargo & İade", "Eczacı Danışmanlığı", "Gizlilik"],
  },
];

const SiteFooter = () => (
  <footer className="bg-primary text-primary-foreground pt-20 pb-10">
    <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 mb-16">
        <div>
          <div className="font-display text-[40px] font-medium leading-none mb-5">.ki</div>
          <p className="text-[14px] leading-relaxed text-primary-foreground/70 max-w-[300px]">
            Kadınlar için, kadınlarla geliştirilen bilime dayalı döngü destek formülleri.
          </p>
        </div>
        {cols.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary-foreground/60 mb-4">
              {col.title}
            </div>
            <ul className="space-y-3">
              {col.links.map((l) => (
                <li key={l}>
                  <a href="#" className="text-[14px] text-primary-foreground/85 hover:text-primary-foreground transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-primary-foreground/15 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between text-[12px] text-primary-foreground/60">
        <div>© {new Date().getFullYear()} .ki — Tüm hakları saklıdır.</div>
        <div className="font-medium">
          .Ki Magnezyum ve Hayıt İçeren Takviye Edici Gıda · Onay No: 024990-06.11.2025
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
