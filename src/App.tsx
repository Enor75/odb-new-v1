import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import AnucHeader from "@/components/AnucHeader";
import HeaderTester from "@/components/HeaderTester";
import { useHeaderSettings } from "@/hooks/useHeaderSettings";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import BackgroundPhoto from "@/components/BackgroundPhoto";
import TypoTester from "@/components/TypoTester";
import Index from "./pages/Index";
import Activity from "./pages/Activity";
import Activity2 from "./pages/Activity2";
import About from "./pages/About";
import About2 from "./pages/About2";
import Contact from "./pages/Contact";
import Custom from "./pages/Custom";
import Custom2 from './pages/Custom2';
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [headerSettings] = useHeaderSettings();

  return (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* basename piloté par Vite : "/" en dev, "/odb-new-v1/" sur GitHub
            Pages (build --base) — les routes internes restent correctes. */}
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          {/* Wrapper positionné : en mode « défile », la couche de fond
              (absolute inset-0, voir BackgroundPhoto) épouse exactement
              la hauteur réelle du contenu — aucune mesure JS (l'ancienne
              mesure au scrollHeight se figeait après resize ou navigation
              et créait un scroll fantôme sous le footer). */}
          <div className="relative min-h-svh">
            {/* Colonne des box de test (21/09) — box REPLIABLES (onglet
                compact <-> box complète, persistance odb-box-*), empilées
                sous le header sur desktop ET mobile. La box « fond » de
                BackgroundPhoto s'y insère par portail. À RETIRER au ship. */}
            <div
              id="odb-testboxes"
              className="fixed right-4 top-14 z-[95] flex flex-col items-end gap-2"
            >
              <HeaderTester />
              <TypoTester />
            </div>
            <BackgroundPhoto />
            <ScrollToTop />
            {headerSettings.variant === 'anuc' ? (
              <AnucHeader settings={headerSettings} />
            ) : (
              <Header />
            )}
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/activity-2" element={<Activity2 />} />
            <Route path="/gallery" element={<Navigate to="/activity" replace />} />
            <Route path="/philosophy" element={<Navigate to="/activity" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/about-2" element={<About2 />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/custom" element={<Custom />} />
            <Route path="/custom-2" element={<Custom2 />} />
            <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
  );
};

export default App;
