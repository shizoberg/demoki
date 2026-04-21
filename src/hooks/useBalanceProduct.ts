import { useQuery } from "@tanstack/react-query";
import { fetchProductByHandle, fetchProductBySearch, type ShopifyProduct, BALANCE_PRODUCT_HANDLE } from "@/lib/shopify";

/**
 * Loads the .ki Balance product from Shopify.
 * Tries the known handle first, falls back to a title search.
 */
export function useBalanceProduct() {
  return useQuery<ShopifyProduct | null>({
    queryKey: ["shopify", "product", BALANCE_PRODUCT_HANDLE],
    queryFn: async () => {
      const direct = await fetchProductByHandle(BALANCE_PRODUCT_HANDLE);
      if (direct) return direct;
      // Fallback: search by title for ".ki Balance"
      return fetchProductBySearch("title:Balance");
    },
    staleTime: 5 * 60 * 1000,
  });
}
