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

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
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
  const loopItems = [...items, ...items];

  return (
    <section className="pt-6 pb-16 lg:pt-8 lg:pb-20 bg-background overflow-hidden">
      <div className="container max-w-6xl text-center mb-8 lg:mb-10">
        <h2 className="font-display font-medium text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.05] text-primary tracking-tight">
          Bizi bir de <em className="italic font-light">onlardan</em> dinle.
        </h2>
      </div>

      <div className="relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex w-max gap-3 sm:gap-4 animate-marquee">
          {loopItems.map((it, i) => (
            <div
              key={`${it.id}-${i}`}
              className="flex-none w-[220px] sm:w-[260px] lg:w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-secondary shadow-sm hover:[animation-play-state:paused]"
            >
              {it.type === "video" ? <VideoCard item={it} /> : <ImageCard item={it} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaSlider;
