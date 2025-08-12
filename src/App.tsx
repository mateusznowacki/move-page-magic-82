
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from './contexts/LanguageContext';
import { Toaster } from './components/ui/toaster';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppButton from './components/WhatsAppButton';
import LoadingSpinner from './components/LoadingSpinner';
import CookieConsent from './components/CookieConsent';

// Lazy load pages for code splitting
const Index = lazy(() => import('./pages/Index'));
const QuotePage = lazy(() => import('./pages/QuotePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const StatesPage = lazy(() => import('./pages/StatesPage'));
const StateCitiesPage = lazy(() => import('./pages/StateCitiesPage'));
const CityDetailPage = lazy(() => import('./pages/CityDetailPage'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'));
const NotFound = lazy(() => import('./pages/NotFound'));

import './App.css';

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="App">
            <Navbar />
            <main>
              <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/angebot" element={<QuotePage />} />
                  <Route path="/dienstleistungen" element={<ServicesPage />} />
                  <Route path="/uber-uns" element={<AboutPage />} />
                  <Route path="/staedte" element={<StatesPage />} />
                  <Route path="/staedte/:stateSlug" element={<StateCitiesPage />} />
                  <Route path="/staedte/:stateSlug/:citySlug" element={<CityDetailPage />} />
                  <Route path="/kontakt" element={<ContactPage />} />

                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <WhatsAppButton phoneNumber="+4915223031473" />
            <ScrollToTop />
            <CookieConsent />
            <Toaster />
          </div>
        </Router>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
