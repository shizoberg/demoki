import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import sinemImg from "@/assets/testimonials/sinem.png";
import ulyanaImg from "@/assets/testimonials/ulyana1.png";
import pmsVideo from "@/assets/testimonials/pms.mp4";

type MediaItem =
  | { id: string; type: "video"; src: string; poster?: string; caption?: string }
  | { id: string; type: "image"; src: string; alt: string; caption?: string };

const items: MediaItem[] = [
  { id: "pms", type: "video", src: pmsVideo, caption: "PMS günleri" },
  { id: "ulyana", type: "image", src: ulyanaImg, alt: ".ki kullanıcısı Ulyana", caption: "Ulyana · 21" },
  { id: "pms2", type: "video", src: pmsVideo, caption: "Döngü hikayesi" },
  { id: "sinem", type: "image", src: sinemImg, alt: ".ki kullanıcısı Sinem", caption: "Sinem · 25" },
  { id: "pms3", type: "video", src: pmsVideo, caption: "Sabah rutini" },
  { id: "ulyana2", type: "image", src: ulyanaImg, alt: ".ki kullanıcısı Ulyana", caption: "Ulyana · mutfakta" },
];

const VideoCard = ({ item }: { item: Extract<MediaItem, { type: "video" }> }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting && playing) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [playing]);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        src={item.src}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
        className="w-full h-full object-cover"
      />
      {/* gradient bottom for caption + button legibility */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
      {item.caption && (
        <div className="absolute left-3 bottom-3 text-primary-foreground text-[12px] font-semibold tracking-wide drop-shadow">
          {item.caption}
        </div>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Videoyu duraklat" : "Videoyu oynat"}
        className="absolute right-3 bottom-3 w-9 h-9 rounded-full bg-primary-foreground/90 backdrop-blur-sm text-primary flex items-center justify-center shadow-md hover:bg-primary-foreground transition-all"
      >
        {playing ? <Pause className="w-4 h-4 fill-primary" strokeWidth={0} /> : <Play className="w-4 h-4 fill-primary ml-0.5" strokeWidth={0} />}
      </button>
    </div>
  );
};

const ImageCard = ({ item }: { item: Extract<MediaItem, { type: "image" }> }) => (
  <div className="relative w-full h-full">
    <img src={item.src} alt={item.alt} draggable={false} className="w-full h-full object-cover" />
    {item.caption && (
      <>
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent pointer-events-none" />
        <div className="absolute left-3 bottom-3 text-primary-foreground text-[12px] font-semibold tracking-wide drop-shadow">
          {item.caption}
        </div>
      </>
    )}
  </div>
);

const MediaSlider = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollL = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setDragging(true);
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollL.current = trackRef.current.scrollLeft;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollL.current - (x - startX.current) * 1.4;
  };
  const onEnd = () => setDragging(false);

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container max-w-6xl text-center mb-12 lg:mb-16">
        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-primary/70 mb-5">
          .ki Topluluğu
        </span>
        <h2 className="font-display font-medium text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] text-primary tracking-tight">
          Şüphecilerden, <em className="italic font-light">şüpheciler için</em>.
        </h2>
        <p className="mt-5 text-[15px] sm:text-[16px] text-foreground/70 max-w-xl mx-auto">
          İzlenebilir kadın sağlığını birlikte savunmak için bize katılan kadınlardan kareler.
        </p>
      </div>

      <div
        ref={trackRef}
        className={`flex gap-3 sm:gap-4 overflow-x-auto hide-scrollbar pb-2 px-6 sm:px-10 lg:px-12 select-none ${
          dragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onEnd}
        onMouseLeave={onEnd}
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((it) => (
          <div
            key={it.id}
            className="flex-none w-[220px] sm:w-[260px] lg:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-secondary shadow-sm"
            style={{ scrollSnapAlign: "start" }}
          >
            {it.type === "video" ? <VideoCard item={it} /> : <ImageCard item={it} />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default MediaSlider;
