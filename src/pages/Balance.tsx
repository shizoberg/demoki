import { useReveal } from "@/hooks/useReveal";
import { useBalanceProduct } from "@/hooks/useBalanceProduct";
import ScrollProgress from "@/components/ScrollProgress";
import AnnouncementBar from "@/components/AnnouncementBar";
import SiteNav from "@/components/SiteNav";
import EditorialHero from "@/components/EditorialHero";
import ValueStrip from "@/components/ValueStrip";
import CollectionSection from "@/components/CollectionSection";
import MediaSlider from "@/components/MediaSlider";
import IngredientTransparency from "@/components/IngredientTransparency";
import ScienceSection from "@/components/ScienceSection";

import ReviewsSection from "@/components/ReviewsSection";
import ProductSection from "@/components/ProductSection";
import FaqSection from "@/components/FaqSection";
import SiteFooter from "@/components/SiteFooter";
import StickyATC from "@/components/StickyATC";

/**
 * .ki Balance landing page — editorial redesign inspired by ritual.com structure,
 * built with the .ki palette (deep plum primary, sage, rose, cream).
 */
const Balance = () => {
  useReveal();
  const { data: product, isLoading } = useBalanceProduct();

  return (
    <div className="pb-[72px] bg-background">
      <ScrollProgress />
      <AnnouncementBar />
      <SiteNav />

      <main id="heroSection">
        <EditorialHero />
        <ValueStrip />
        <CollectionSection />
        <MediaSlider />
        <IngredientTransparency />
        <ScienceSection />
        <MadeTraceable />
        <ReviewsSection />
        <ProductSection product={product} isLoading={isLoading} />
        <FaqSection />
      </main>

      <SiteFooter />
      <StickyATC product={product} isLoading={isLoading} />
    </div>
  );
};

export default Balance;
