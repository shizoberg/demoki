import { ArrowRight } from "lucide-react";

interface PreviewPost {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
}

const POSTS: PreviewPost[] = [
  {
    slug: "genital-hijyen-icin-temel-kurallar",
    title: "Genital Hijyen İçin Temel Kurallar",
    excerpt:
      "Sağlıklı bir vajinal mikrobiyota için bilinmesi gereken temel hijyen kuralları ve uzman önerileri.",
    image:
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "hayit-bitkisi-nedir-pmse-faydalari",
    title: "Hayıt Bitkisi Nedir? PMS'e Faydaları Neler?",
    excerpt:
      "Hayıt bitkisinin hormonal denge üzerindeki etkileri ve PMS semptomlarına nasıl iyi geldiği.",
    image:
      "https://images.unsplash.com/photo-1502780402662-acc01917ba4f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "adet-dongun-sana-ne-soyluyor",
    title: "Adet Döngün Sana Ne Söylüyor?",
    excerpt:
      "Menstrual döngü, sadece üreme sağlığının değil, vücudun genel sağlık durumunun da göstergesi.",
    image:
      "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "menstruel-dongu-cilt",
    title: "Menstrüel Döngünüze Göre Cildiniz Nasıl Değişiyor?",
    excerpt:
      "Hormonların cilt üzerindeki etkileri: döngünün her fazında cildine nasıl bakmalısın?",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  },
];

const BlogPreviewSection = () => {
  return (
    <section className="bg-plum-pale py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1240px] mx-auto px-5 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8 lg:mb-10">
          <h2
            className="font-display text-primary text-[28px] sm:text-[36px] lg:text-[44px] font-medium leading-none"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Blog
          </h2>
          <a
            href="/blog"
            className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 rounded-full border border-primary/30 text-primary text-[13px] sm:text-[14px] font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
          >
            İncele
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Cards — mobile: horizontal snap scroll (2 visible), desktop: 4-col grid */}
        <div className="-mx-5 lg:mx-0">
          <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-px-5 px-5 lg:px-0 hide-scrollbar">
            {POSTS.map((post) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block shrink-0 snap-start w-[calc(50%-0.5rem)] lg:w-auto"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <h3
                  className="mt-4 font-display text-[16px] sm:text-[18px] lg:text-[20px] leading-snug text-primary font-medium group-hover:opacity-80 transition-opacity"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {post.title}
                </h3>
                <p className="mt-2 text-[12px] sm:text-[13px] text-muted-foreground line-clamp-3">
                  {post.excerpt}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
