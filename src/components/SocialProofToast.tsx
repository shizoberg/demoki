import { useEffect, useState } from "react";

const toastData = [
  { initials: "SE", name: "Selin", city: "İstanbul", time: "3 dakika önce" },
  { initials: "ZE", name: "Zeynep", city: "Ankara", time: "7 dakika önce" },
  { initials: "EL", name: "Elif", city: "İzmir", time: "12 dakika önce" },
  { initials: "ME", name: "Merve", city: "Bursa", time: "18 dakika önce" },
  { initials: "CE", name: "Ceren", city: "Antalya", time: "25 dakika önce" },
  { initials: "NA", name: "Naz", city: "İstanbul", time: "31 dakika önce" },
  { initials: "AY", name: "Aylin", city: "Eskişehir", time: "45 dakika önce" },
  { initials: "İP", name: "İpek", city: "Trabzon", time: "1 saat önce" },
];

const SocialProofToast = () => {
  const [visible, setVisible] = useState(false);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const show = () => {
      setVisible(true);
      setTimeout(() => setVisible(false), 4500);
      setIdx((prev) => (prev + 1) % toastData.length);
    };

    const firstTimeout = setTimeout(() => {
      show();
      const interval = setInterval(show, 12000);
      return () => clearInterval(interval);
    }, 5000);

    return () => clearTimeout(firstTimeout);
  }, []);

  const d = toastData[idx];

  return (
    <div
      className={`fixed bottom-[84px] left-5 z-[150] bg-card rounded-[14px] py-3 px-4 shadow-lg border border-primary/[0.08] flex items-center gap-3 max-w-[320px] transition-transform duration-500 ${
        visible ? "translate-x-0" : "-translate-x-[120%]"
      }`}
    >
      <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-[13px] font-bold text-primary flex-shrink-0">
        {d.initials}
      </div>
      <div className="text-xs text-foreground leading-snug">
        <strong>{d.name}</strong> {d.city}'dan satın aldı
        <span className="text-[11px] text-muted-foreground block mt-0.5">{d.time}</span>
      </div>
    </div>
  );
};

export default SocialProofToast;
