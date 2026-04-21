import { useEffect, useRef, useState } from "react";

export function useAnimatedCounter(
  target: number,
  duration = 2000,
  isDecimal = false,
  suffix = ""
) {
  const [value, setValue] = useState("0");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            let startTime: number | null = null;
            const step = (ts: number) => {
              if (!startTime) startTime = ts;
              const p = Math.min((ts - startTime) / duration, 1);
              const ease = 1 - Math.pow(1 - p, 3);
              const val = target * ease;
              if (isDecimal) {
                setValue(val.toFixed(1) + suffix);
              } else {
                setValue(Math.floor(val).toLocaleString("tr-TR") + suffix);
              }
              if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, isDecimal, suffix]);

  return { ref, value };
}
