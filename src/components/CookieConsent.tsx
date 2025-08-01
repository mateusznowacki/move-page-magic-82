import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { X, Settings, Check, AlertCircle } from 'lucide-react';
import { analytics } from '@/lib/analytics';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

const CookieConsent: React.FC = () => {
  const { t, language } = useLanguage();
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, cannot be disabled
    analytics: false,
    marketing: false,
    preferences: false,
  });

  useEffect(() => {
    setIsClient(true);
    setIsHydrated(true);
    
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const parsedConsent = JSON.parse(consent);
        setPreferences(parsedConsent);
        // Initialize analytics with saved consent
        analytics.setConsent(parsedConsent);
      } catch (error) {
        console.error('Error parsing saved cookie consent:', error);
        setShowBanner(true);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    };
    
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    setShowBanner(false);
    
    // Initialize analytics and marketing tracking
    initializeTracking(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    };
    
    setPreferences(necessaryOnly);
    saveConsent(necessaryOnly);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowBanner(false);
    setShowSettings(false);
    
    // Initialize tracking based on preferences
    initializeTracking(preferences);
  };

  const saveConsent = (consent: CookiePreferences) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cookie-consent', JSON.stringify(consent));
      localStorage.setItem('cookie-consent-date', new Date().toISOString());
      
      // Set cookie consent flag
      document.cookie = `cookie-consent=true; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`;
    }
  };

  const initializeTracking = (consent: CookiePreferences) => {
    // Set analytics consent
    analytics.setConsent(consent);
    
    if (consent.analytics) {
      // Initialize Google Analytics or other analytics
      // Add your analytics initialization code here
      // Example: Google Analytics 4
      // if (typeof window !== 'undefined') {
      //   (window as any).gtag('consent', 'update', {
      //     analytics_storage: 'granted'
      //   });
      // }
    }
    
    if (consent.marketing) {
      // Initialize marketing tracking
      // Add your marketing tracking code here
      // Example: Facebook Pixel
      // if (typeof window !== 'undefined' && (window as any).fbq) {
      //   (window as any).fbq('consent', 'grant');
      // }
    }
    
    if (consent.preferences) {
      // Initialize preference tracking
      // Add your preference tracking code here
    }
  };

  const getTranslations = () => {
    const translations = {
      pl: {
        title: 'Używamy plików cookie',
        description: 'Używamy plików cookie i podobnych technologii, aby zapewnić najlepsze doświadczenie na naszej stronie. Możesz dowiedzieć się więcej o tym, jakich plików cookie używamy, w naszej',
        privacyPolicy: 'Polityce Prywatności',
        acceptAll: 'Akceptuję wszystkie',
        acceptNecessary: 'Tylko niezbędne',
        settings: 'Ustawienia',
        necessary: 'Niezbędne',
        necessaryDesc: 'Te pliki cookie są niezbędne do działania strony i nie mogą być wyłączone.',
        analytics: 'Analityka',
        analyticsDesc: 'Te pliki cookie pomagają nam zrozumieć, jak odwiedzający korzystają z naszej strony.',
        marketing: 'Marketing',
        marketingDesc: 'Te pliki cookie są używane do śledzenia odwiedzających na stronach internetowych.',
        preferences: 'Preferencje',
        preferencesDesc: 'Te pliki cookie pozwalają stronie zapamiętać wybory, które dokonujesz.',
        save: 'Zapisz ustawienia',
        close: 'Zamknij'
      },
      de: {
        title: 'Wir verwenden Cookies',
        description: 'Wir verwenden Cookies und ähnliche Technologien, um Ihnen das beste Erlebnis auf unserer Website zu bieten. Sie können mehr darüber erfahren, welche Cookies wir verwenden, in unserer',
        privacyPolicy: 'Datenschutzerklärung',
        acceptAll: 'Alle akzeptieren',
        acceptNecessary: 'Nur notwendige',
        settings: 'Einstellungen',
        necessary: 'Notwendig',
        necessaryDesc: 'Diese Cookies sind für die Funktionalität der Website erforderlich und können nicht deaktiviert werden.',
        analytics: 'Analytik',
        analyticsDesc: 'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen.',
        marketing: 'Marketing',
        marketingDesc: 'Diese Cookies werden verwendet, um Besucher auf Websites zu verfolgen.',
        preferences: 'Präferenzen',
        preferencesDesc: 'Diese Cookies ermöglichen es der Website, Ihre Auswahl zu speichern.',
        save: 'Einstellungen speichern',
        close: 'Schließen'
      },
      es: {
        title: 'Usamos cookies',
        description: 'Utilizamos cookies y tecnologías similares para brindarle la mejor experiencia en nuestro sitio web. Puede obtener más información sobre qué cookies utilizamos en nuestra',
        privacyPolicy: 'Política de Privacidad',
        acceptAll: 'Aceptar todas',
        acceptNecessary: 'Solo necesarias',
        settings: 'Configuración',
        necessary: 'Necesarias',
        necessaryDesc: 'Estas cookies son necesarias para el funcionamiento del sitio web y no se pueden desactivar.',
        analytics: 'Analíticas',
        analyticsDesc: 'Estas cookies nos ayudan a entender cómo los visitantes utilizan nuestro sitio web.',
        marketing: 'Marketing',
        marketingDesc: 'Estas cookies se utilizan para rastrear a los visitantes en los sitios web.',
        preferences: 'Preferencias',
        preferencesDesc: 'Estas cookies permiten que el sitio web recuerde las elecciones que realiza.',
        save: 'Guardar configuración',
        close: 'Cerrar'
      },
      en: {
        title: 'We use cookies',
        description: 'We use cookies and similar technologies to provide you with the best experience on our website. You can learn more about which cookies we use in our',
        privacyPolicy: 'Privacy Policy',
        acceptAll: 'Accept all',
        acceptNecessary: 'Necessary only',
        settings: 'Settings',
        necessary: 'Necessary',
        necessaryDesc: 'These cookies are necessary for the website to function and cannot be disabled.',
        analytics: 'Analytics',
        analyticsDesc: 'These cookies help us understand how visitors use our website.',
        marketing: 'Marketing',
        marketingDesc: 'These cookies are used to track visitors across websites.',
        preferences: 'Preferences',
        preferencesDesc: 'These cookies allow the website to remember choices you make.',
        save: 'Save settings',
        close: 'Close'
      }
    };
    
    return translations[language as keyof typeof translations] || translations.en;
  };

  const t_cookie = getTranslations();

  // Don't render anything until we're on the client side and hydrated
  if (!isClient || !isHydrated) {
    return null;
  }

  if (!showBanner) {
    return null;
  }

  return (
    <>
      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t_cookie.title}
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                {t_cookie.description}{' '}
                <a 
                  href="/privacy-policy" 
                  className="text-moving-blue hover:text-moving-darkblue underline"
                  aria-label={t_cookie.privacyPolicy}
                >
                  {t_cookie.privacyPolicy}
                </a>
                .
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2"
                aria-label={t_cookie.settings}
              >
                <Settings className="w-4 h-4" />
                {t_cookie.settings}
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleAcceptNecessary}
                className="flex items-center gap-2"
                aria-label={t_cookie.acceptNecessary}
              >
                {t_cookie.acceptNecessary}
              </Button>
              
              <Button
                size="sm"
                onClick={handleAcceptAll}
                className="flex items-center gap-2 bg-moving-blue hover:bg-moving-darkblue"
                aria-label={t_cookie.acceptAll}
              >
                <Check className="w-4 h-4" />
                {t_cookie.acceptAll}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t_cookie.settings}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(false)}
                  aria-label={t_cookie.close}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Necessary Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {t_cookie.necessary}
                        </h3>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {language === 'pl' ? 'Zawsze' :
                           language === 'de' ? 'Immer' :
                           language === 'es' ? 'Siempre' :
                           'Always'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t_cookie.necessaryDesc}
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.necessary}
                        disabled
                        className="w-4 h-4 text-moving-blue bg-gray-100 border-gray-300 rounded focus:ring-moving-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {t_cookie.analytics}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {language === 'pl' ? 'Opcjonalne' :
                           language === 'de' ? 'Optional' :
                           language === 'es' ? 'Opcional' :
                           'Optional'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t_cookie.analyticsDesc}
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.analytics}
                        onChange={(e) => setPreferences(prev => ({ ...prev, analytics: e.target.checked }))}
                        className="w-4 h-4 text-moving-blue bg-gray-100 border-gray-300 rounded focus:ring-moving-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {t_cookie.marketing}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {language === 'pl' ? 'Opcjonalne' :
                           language === 'de' ? 'Optional' :
                           language === 'es' ? 'Opcional' :
                           'Optional'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t_cookie.marketingDesc}
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.marketing}
                        onChange={(e) => setPreferences(prev => ({ ...prev, marketing: e.target.checked }))}
                        className="w-4 h-4 text-moving-blue bg-gray-100 border-gray-300 rounded focus:ring-moving-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Preferences Cookies */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {t_cookie.preferences}
                        </h3>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          {language === 'pl' ? 'Opcjonalne' :
                           language === 'de' ? 'Optional' :
                           language === 'es' ? 'Opcional' :
                           'Optional'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {t_cookie.preferencesDesc}
                      </p>
                    </div>
                    <div className="ml-4">
                      <input
                        type="checkbox"
                        checked={preferences.preferences}
                        onChange={(e) => setPreferences(prev => ({ ...prev, preferences: e.target.checked }))}
                        className="w-4 h-4 text-moving-blue bg-gray-100 border-gray-300 rounded focus:ring-moving-blue"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <Button
                  variant="outline"
                  onClick={() => setShowSettings(false)}
                  className="flex-1"
                >
                  {t_cookie.close}
                </Button>
                <Button
                  onClick={handleSavePreferences}
                  className="flex-1 bg-moving-blue hover:bg-moving-darkblue"
                >
                  {t_cookie.save}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent; 