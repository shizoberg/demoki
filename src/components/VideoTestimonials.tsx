import { useRef, useState, useCallback } from "react";

const videos = [
  { name: "Ulyana", age: "21 yaş", bg: "" },
  { name: "Simge", age: "25 yaş", bg: "from-[#3a1f7a] to-[#5a3ca0]" },
  { name: "Ecem", age: "23 yaş", bg: "from-[#1e1250] to-[#3a2080]" },
  { name: "Aylin", age: "28 yaş", bg: "from-[#2a1560] to-[#4a3290]" },
  { name: "İpek", age: "32 yaş", bg: "from-[#321a70] to-[#5540a0]" },
  { name: "Gizem", age: "31 yaş", bg: "from-[#251460] to-[#3d2890]" },
];

const VideoTestimonials = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const scrollL = useRef(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    setDragging(true);
    startX.current = e.pageX - (trackRef.current?.offsetLeft || 0);
    scrollL.current = trackRef.current?.scrollLeft || 0;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    trackRef.current.scrollLeft = scrollL.current - (x - startX.current) * 1.5;
  }, [dragging]);

  const onEnd = useCallback(() => setDragging(false), []);

  return (
    <section className="py-14">
      <div className="container">
        <div className="k5-reveal text-[13px] font-bold uppercase tracking-[1.5px] text-primary mb-6 flex items-center gap-2">
          Video Yorumlar <span className="text-[11px] text-muted-foreground font-medium normal-case tracking-normal">— kaydır</span>
        </div>
        <div
          ref={trackRef}
          className={`flex gap-4 overflow-x-auto scroll-snap-x mandatory hide-scrollbar pb-4 grab-cursor ${dragging ? "dragging" : ""}`}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onEnd}
          onMouseLeave={onEnd}
        >
          {videos.map((v) => (
            <div
              key={v.name}
              className={`flex-none w-[180px] snap-start rounded-2xl overflow-hidden aspect-[3/4] bg-gradient-to-br ${v.bg || "from-primary to-primary-medium"}`}
            >
              <div className="w-full h-full flex flex-col items-center justify-center text-primary-foreground text-center p-4">
                <div className="w-12 h-12 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center mb-4 transition-transform hover:scale-110">
                  <svg className="w-5 h-5 fill-primary-foreground ml-0.5" viewBox="0 0 24 24"><polygon points="8,5 20,12 8,19" /></svg>
                </div>
                <div className="text-sm font-bold">{v.name}</div>
                <div className="text-xs opacity-70">{v.age}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoTestimonials;
