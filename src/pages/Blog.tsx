import { useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

import AnnouncementBar from "@/components/AnnouncementBar";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import { useReveal } from "@/hooks/useReveal";

/* ---------------- Types & data ---------------- */

type Tag =
  | "Tümü"
  | "Akne"
  | "Aktif form"
  | "Cilt Bakımı"
  | "Demir"
  | "Ertesi Gün Hapı"
  | "Ferritin"
  | "Hormonal denge"
  | "Kan Testi"
  | "Magnezyum"
  | "Meme Sağlığı"
  | "Menopoz"
  | "Metilkobalamin"
  | "Mineraller"
  | "Regl"
  | "Smear"
  | "Takviye"
  | "Vajinal Sağlık"
  | "Vitamin";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  tag: Exclude<Tag, "Tümü">;
  date: string;
  image: string;
  featured?: boolean;
}

const TAGS: Tag[] = [
  "Tümü",
  "Akne",
  "Aktif form",
  "Cilt Bakımı",
  "Demir",
  "Ertesi Gün Hapı",
  "Ferritin",
  "Hormonal denge",
  "Kan Testi",
  "Magnezyum",
  "Meme Sağlığı",
  "Menopoz",
  "Metilkobalamin",
  "Mineraller",
  "Regl",
  "Smear",
  "Takviye",
  "Vajinal Sağlık",
  "Vitamin",
];

const POSTS: Post[] = [
  {
    slug: "genital-hijyen-icin-temel-kurallar",
    title: "Genital Hijyen İçin Temel Kurallar",
    excerpt:
      "Sağlıklı bir vajinal mikrobiyota için bilinmesi gereken temel hijyen kuralları ve uzman önerileri.",
    tag: "Vajinal Sağlık",
    date: "05.05.2026",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    slug: "hayit-bitkisi-nedir-pmse-faydalari",
    title: "Hayıt Bitkisi Nedir? PMS'e Faydaları Neler?",
    excerpt:
      "Hayıt bitkisinin hormonal denge üzerindeki etkileri ve PMS semptomlarına nasıl iyi geldiği.",
    tag: "Hormonal denge",
    date: "02.05.2026",
    image:
      "https://images.unsplash.com/photo-1502780402662-acc01917ba4f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "kadin-sagliginda-bitkisel-destek",
    title: "Kadın Sağlığında En Çok Kullanılan 5 Bitkisel Destek",
    excerpt:
      "Yüzyıllardır kullanılan, bilimle desteklenen 5 bitkisel takviye ve günlük hayata entegre etme yolları.",
    tag: "Hormonal denge",
    date: "29.04.2026",
    image:
      "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "vajinal-sagliginiz-icin-yapmaniz-gerekenler",
    title: "Vajinal Sağlığınız İçin Yapmanız Gerekenler",
    excerpt:
      "Vajinal sağlık, kadın sağlığının temel taşlarından biri olmasına rağmen hala pek çok tabunun gölgesinde kalıyor.",
    tag: "Vajinal Sağlık",
    date: "28.04.2026",
    image:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "perimenopoz-nedir",
    title: "Perimenopoz Nedir? 40'lı Yaşlarda Vücutta Neler Değişiyor?",
    excerpt:
      "Menopoz bir varış noktasıysa, perimenopoz bu noktaya giden o engebeli ama keşfedilmesi gereken yoldur.",
    tag: "Menopoz",
    date: "25.04.2026",
    image:
      "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "menopozda-hormon-mu-dogal-mi",
    title: "Menopozda Hormon Tedavisi mi? Doğal Takviye Mi?",
    excerpt:
      "Eczanelerde en çok karşılaştığımız sorulardan biri: menopoz döneminde doğru yaklaşım nedir?",
    tag: "Menopoz",
    date: "21.04.2026",
    image:
      "https://images.unsplash.com/photo-1559757175-7cb056e7ce72?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "adet-dongun-sana-ne-soyluyor",
    title: "Adet Döngün Sana Ne Söylüyor?",
    excerpt:
      "Menstrual döngü, sadece üreme sağlığının değil, vücudun genel sağlık durumunun da göstergesi.",
    tag: "Regl",
    date: "16.04.2026",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "pms-tatli-krizleri",
    title: "PMS Döneminde Tatlı Krizleri ve Mod Değişimleri",
    excerpt:
      "Bir irade meselesi değil, bir biyokimya hikayesi. Regl öncesi tatlı krizlerinin gerçek sebepleri.",
    tag: "Hormonal denge",
    date: "06.04.2026",
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "yilda-bir-kez-yaptirilmasi-gereken-testler",
    title: "Her Kadının Yılda Bir Kez Yaptırması Gereken Testler",
    excerpt:
      "Eczane bankosunun arkasından gözlemler: hangi tahlilleri yılda bir kez mutlaka yaptırmalısın?",
    tag: "Kan Testi",
    date: "02.04.2026",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "ertesi-gun-hapi-bilmen-gerekenler",
    title: "Ertesi Gün Hapı Ne İşe Yarar? Bilmen Gereken Her Şey",
    excerpt:
      "Bir eczacı gözünden ertesi gün hapı: ne zaman, nasıl ve hangi koşullarda kullanılır?",
    tag: "Ertesi Gün Hapı",
    date: "27.03.2026",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "her-gida-takviyesi-ayni-mi",
    title: "Her Gıda Takviyesi Aynı Etkiyi Mi Sağlar?",
    excerpt:
      "Gıda takviyelerinde gizli kahraman: 'Aktif form' nedir, neden bu kadar önemli?",
    tag: "Aktif form",
    date: "24.03.2026",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "menstruel-dongu-cilt",
    title: "Menstrüel Döngünüze Göre Cildiniz Nasıl Değişiyor?",
    excerpt:
      "Hormonların cilt üzerindeki etkileri: döngünün her fazında cildine nasıl bakmalısın?",
    tag: "Akne",
    date: "18.03.2026",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  },
];

/* ---------------- UI ---------------- */

const Blog = () => {
  const [activeTag, setActiveTag] = useState<Tag>("Tümü");
  useReveal();

  const filtered = useMemo(
    () => (activeTag === "Tümü" ? POSTS : POSTS.filter((p) => p.tag === activeTag)),
    [activeTag],
  );

  const heroPosts = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteNav />

      {/* Hero */}
      <section className="px-5 lg:px-8 pt-10 lg:pt-16 pb-6 lg:pb-10">
        <div className="max-w-[1240px] mx-auto text-center">
          <h1
            className="font-display text-primary text-[34px] sm:text-[44px] lg:text-[56px] leading-[1.05] font-medium k5-reveal"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Kendine iyi bakman için yazılar
          </h1>
          <p className="mt-4 text-[15px] sm:text-[16px] text-muted-foreground max-w-xl mx-auto k5-reveal k5-reveal-d1">
            Sen kendine iyi bak diye farklı içerikler üretiyoruz. Sen her şeyden önemlisin.
          </p>
        </div>
      </section>

      {/* Tag filter */}
      <section className="px-5 lg:px-8 pb-8">
        <div className="max-w-[1240px] mx-auto">
          <div className="flex flex-wrap justify-center gap-2">
            {TAGS.map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-[13px] font-semibold border transition-all ${
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background text-primary border-border hover:border-primary/40"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-5 lg:px-8 pb-20">
        <div className="max-w-[1240px] mx-auto">
          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-20">
              Bu etikette henüz yazı yok.
            </p>
          ) : (
            <>
              {/* Bento hero — 3 main posts */}
              {heroPosts.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 lg:gap-5 mb-8 lg:mb-12 lg:h-[560px]">
                  {heroPosts.map((post, idx) => {
                    const isLarge = idx === 0;
                    return (
                      <a
                        key={post.slug}
                        href={`/blog/${post.slug}`}
                        className={`group relative overflow-hidden rounded-3xl bg-muted k5-reveal ${
                          isLarge
                            ? "lg:col-span-2 lg:row-span-2 aspect-[16/10] lg:aspect-auto"
                            : "aspect-[16/10] lg:aspect-auto"
                        } ${idx === 1 ? "k5-reveal-d1" : idx === 2 ? "k5-reveal-d2" : ""}`}
                      >
                        <img
                          src={post.image}
                          alt={post.title}
                          loading={isLarge ? "eager" : "lazy"}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/30 to-transparent" />
                        <div className={`absolute inset-x-0 bottom-0 text-primary-foreground ${isLarge ? "p-6 sm:p-8 lg:p-10" : "p-5 sm:p-6"}`}>
                          <span className="inline-block uppercase tracking-wider text-[10px] sm:text-[11px] font-bold bg-primary-foreground/15 backdrop-blur px-2.5 py-1 rounded-full">
                            {post.tag}
                          </span>
                          <h2
                            className={`mt-2.5 font-display leading-[1.1] font-medium ${
                              isLarge
                                ? "text-[24px] sm:text-[32px] lg:text-[40px] max-w-2xl"
                                : "text-[18px] sm:text-[22px]"
                            }`}
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {post.title}
                          </h2>
                          <div className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-semibold opacity-90 group-hover:opacity-100">
                            Yazıyı oku
                            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Rest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                {rest.map((post, i) => (
                  <a
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className={`group block k5-reveal ${
                      i % 3 === 1 ? "k5-reveal-d1" : i % 3 === 2 ? "k5-reveal-d2" : ""
                    }`}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                      <img
                        src={post.image}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                      />
                    </div>
                    <div className="pt-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-primary/80">
                        {post.tag}
                      </span>
                      <h3 className="mt-1.5 font-display text-[18px] sm:text-[20px] leading-snug text-primary font-medium group-hover:opacity-80 transition-opacity"
                          style={{ fontFamily: "var(--font-display)" }}>
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[13px] text-muted-foreground line-clamp-2">
                        {post.excerpt}
                      </p>
                      <p className="mt-2 text-[12px] text-muted-foreground/80">{post.date}</p>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
};

export default Blog;
