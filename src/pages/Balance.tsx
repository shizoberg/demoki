import { useReveal } from "@/hooks/useReveal";
import { useBalanceProduct } from "@/hooks/useBalanceProduct";
import ScrollProgress from "@/components/ScrollProgress";
import UrgencyBar from "@/components/UrgencyBar";
import HeroSection from "@/components/HeroSection";
import ReviewsSection from "@/components/ReviewsSection";
import VideoTestimonials from "@/components/VideoTestimonials";
import BeforeAfter from "@/components/BeforeAfter";
import IngredientsSection from "@/components/IngredientsSection";
import ProductSection from "@/components/ProductSection";
import StickyATC from "@/components/StickyATC";

/**
 * Alternatif .ki Balance landing page — bağlı: Shopify ürünü ".ki Balance | Döngü Takviyesi"
 * Tüm bölümler ayrı componentlerdir; Index içindeki sıralamayı değiştirerek
 * veya bir component'i kaldırarak/ekleyerek kolayca yeniden düzenleyebilirsin.
 */
const Balance = () => {
  useReveal();
  const { data: product, isLoading } = useBalanceProduct();

  return (
    <div className="pb-[72px]">
      <ScrollProgress />
      <UrgencyBar />

      <div id="heroSection">
        <HeroSection />
      </div>
      <ReviewsSection />
      <VideoTestimonials />
      <BeforeAfter />
      <IngredientsSection />
      <ProductSection product={product} isLoading={isLoading} />
      <StickyATC product={product} isLoading={isLoading} />
    </div>
  );
};

export default Balance;
