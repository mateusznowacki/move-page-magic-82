import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCookieConsent } from '@/hooks/use-cookie-consent';
import { Button } from '@/components/ui/button';
import { X, Settings, RefreshCw } from 'lucide-react';

const CookieSettings: React.FC = () => {
  const { t, language } = useLanguage();
  const { consent, saveConsent, clearConsent, getConsentDate } = useCookieConsent();
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  React.useEffect(() => {
    if (consent) {
      setPreferences(consent);
    }
  }, [consent]);

  const handleSave = () => {
    saveConsent(preferences);
    setShowModal(false);
  };

  const handleReset = () => {
    clearConsent();
    setPreferences({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
    setShowModal(false);
    // Reload page to show cookie banner again
    window.location.reload();
  };

  const getTranslations = () => {
    const translations = {
      pl: {
        title: 'Ustawienia plików cookie',
        description: 'Zarządzaj swoimi preferencjami dotyczącymi plików cookie. Możesz zmienić swoje ustawienia w dowolnym momencie.',
        necessary: 'Niezbędne',
        necessaryDesc: 'Te pliki cookie są niezbędne do działania strony i nie mogą być wyłączone.',
        analytics: 'Analityka',
        analyticsDesc: 'Te pliki cookie pomagają nam zrozumieć, jak odwiedzający korzystają z naszej strony.',
        marketing: 'Marketing',
        marketingDesc: 'Te pliki cookie są używane do śledzenia odwiedzających na stronach internetowych.',
        preferences: 'Preferencje',
        preferencesDesc: 'Te pliki cookie pozwalają stronie zapamiętać wybory, które dokonujesz.',
        save: 'Zapisz ustawienia',
        reset: 'Zresetuj ustawienia',
        close: 'Zamknij',
        lastUpdated: 'Ostatnia aktualizacja:',
        noConsent: 'Brak zapisanych ustawień',
        always: 'Zawsze',
        optional: 'Opcjonalne'
      },
      de: {
        title: 'Cookie-Einstellungen',
        description: 'Verwalten Sie Ihre Cookie-Einstellungen. Sie können Ihre Einstellungen jederzeit ändern.',
        necessary: 'Notwendig',
        necessaryDesc: 'Diese Cookies sind für die Funktionalität der Website erforderlich und können nicht deaktiviert werden.',
        analytics: 'Analytik',
        analyticsDesc: 'Diese Cookies helfen uns zu verstehen, wie Besucher unsere Website nutzen.',
        marketing: 'Marketing',
        marketingDesc: 'Diese Cookies werden verwendet, um Besucher auf Websites zu verfolgen.',
        preferences: 'Präferenzen',
        preferencesDesc: 'Diese Cookies ermöglichen es der Website, Ihre Auswahl zu speichern.',
        save: 'Einstellungen speichern',
        reset: 'Einstellungen zurücksetzen',
        close: 'Schließen',
        lastUpdated: 'Zuletzt aktualisiert:',
        noConsent: 'Keine gespeicherten Einstellungen',
        always: 'Immer',
        optional: 'Optional'
      },
      es: {
        title: 'Configuración de cookies',
        description: 'Gestiona tus preferencias de cookies. Puedes cambiar tu configuración en cualquier momento.',
        necessary: 'Necesarias',
        necessaryDesc: 'Estas cookies son necesarias para el funcionamiento del sitio web y no se pueden desactivar.',
        analytics: 'Analíticas',
        analyticsDesc: 'Estas cookies nos ayudan a entender cómo los visitantes utilizan nuestro sitio web.',
        marketing: 'Marketing',
        marketingDesc: 'Estas cookies se utilizan para rastrear a los visitantes en los sitios web.',
        preferences: 'Preferencias',
        preferencesDesc: 'Estas cookies permiten que el sitio web recuerde las elecciones que realiza.',
        save: 'Guardar configuración',
        reset: 'Restablecer configuración',
        close: 'Cerrar',
        lastUpdated: 'Última actualización:',
        noConsent: 'Sin configuración guardada',
        always: 'Siempre',
        optional: 'Opcional'
      },
      en: {
        title: 'Cookie Settings',
        description: 'Manage your cookie preferences. You can change your settings at any time.',
        necessary: 'Necessary',
        necessaryDesc: 'These cookies are necessary for the website to function and cannot be disabled.',
        analytics: 'Analytics',
        analyticsDesc: 'These cookies help us understand how visitors use our website.',
        marketing: 'Marketing',
        marketingDesc: 'These cookies are used to track visitors across websites.',
        preferences: 'Preferences',
        preferencesDesc: 'These cookies allow the website to remember choices you make.',
        save: 'Save settings',
        reset: 'Reset settings',
        close: 'Close',
        lastUpdated: 'Last updated:',
        noConsent: 'No saved settings',
        always: 'Always',
        optional: 'Optional'
      }
    };
    
    return translations[language as keyof typeof translations] || translations.en;
  };

  const t_cookie = getTranslations();
  const consentDate = getConsentDate();

  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowModal(true)}
        className="text-gray-300 hover:text-white transition-colors"
        aria-label={t_cookie.title}
      >
        <Settings className="w-4 h-4 mr-2" />
        {t_cookie.title}
      </Button>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {t_cookie.title}
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowModal(false)}
                  aria-label={t_cookie.close}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <p className="text-gray-600 mb-6">
                {t_cookie.description}
              </p>

              {consentDate && (
                <div className="mb-6 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    {t_cookie.lastUpdated} {consentDate.toLocaleDateString()}
                  </p>
                </div>
              )}

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
                          {t_cookie.always}
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
                          {t_cookie.optional}
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
                          {t_cookie.optional}
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
                          {t_cookie.optional}
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
                  onClick={() => setShowModal(false)}
                  className="flex-1"
                >
                  {t_cookie.close}
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t_cookie.reset}
                </Button>
                <Button
                  onClick={handleSave}
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

export default CookieSettings; 