import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Balance from "./pages/Balance.tsx";
import PaketOlustur from "./pages/PaketOlustur.tsx";
import Pedler from "./pages/Pedler.tsx";
import NotFound from "./pages/NotFound.tsx";
import { useCartSync } from "@/hooks/useCartSync";
import MobileTabBar from "@/components/MobileTabBar";

const queryClient = new QueryClient();

const CartSyncProvider = ({ children }: { children: React.ReactNode }) => {
  useCartSync();
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CartSyncProvider>
          <Routes>
            <Route path="/" element={<Balance />} />
            <Route path="/balance" element={<Balance />} />
            <Route path="/paket-olustur" element={<PaketOlustur />} />
            <Route path="/pedler" element={<Pedler />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartSyncProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
