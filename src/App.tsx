
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import AreaOfOperation from "./pages/AreaOfOperation";
import QuotePage from "./pages/QuotePage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import CitiesPage from "./pages/CitiesPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/dienstleistungen" element={<ServicesPage />} />
            <Route path="/einsatzgebiete" element={<AreaOfOperation />} />
            <Route path="/angebot" element={<QuotePage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/cities" element={<CitiesPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
