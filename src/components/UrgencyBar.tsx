const UrgencyBar = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-medium text-primary-foreground text-center py-3 px-4 text-[13px] font-semibold tracking-wide">
    <span>⚡ Bugün sipariş ver, yarın kargoda — ücretsiz kargo</span>
    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/[0.08] to-transparent animate-[urgShimmer_3s_infinite]" />
  </div>
);

export default UrgencyBar;
