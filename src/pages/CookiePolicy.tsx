import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const CookiePolicy: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    pl: {
      title: 'Polityka Cookies',
      lastUpdated: 'Ostatnia aktualizacja: 31 lipca 2025',
      intro: 'Ta Polityka Cookies wyjaśnia, jak MP Transporte und Umzüge używa plików cookie i podobnych technologii na naszej stronie internetowej.',
      
      whatAreCookies: {
        title: '1. Czym są pliki cookie?',
        content: 'Pliki cookie to małe pliki tekstowe, które są zapisywane na Twoim urządzeniu podczas przeglądania strony internetowej. Pomagają one w funkcjonowaniu strony i dostarczają informacji o sposobie jej użytkowania.'
      },

      types: {
        title: '2. Rodzaje plików cookie',
        content: [
          'Niezbędne cookies - wymagane do podstawowego funkcjonowania strony',
          'Analityczne cookies - pomagają zrozumieć, jak użytkownicy korzystają ze strony',
          'Funkcjonalne cookies - zapamiętują Twoje preferencje i ustawienia',
          'Marketingowe cookies - używane do personalizacji reklam'
        ]
      },

      cookiesWeUse: {
        title: '3. Pliki cookie, których używamy',
        content: [
          'Google Analytics 4 (GA4) - do analizy ruchu na stronie',
          'Google Search Console - do monitorowania wydajności wyszukiwania',
          'Sesyjne cookies - do utrzymania sesji użytkownika',
          'Preferencyjne cookies - do zapamiętywania ustawień języka'
        ]
      },

      googleAnalytics: {
        title: '4. Google Analytics 4',
        content: [
          'Używamy GA4 do analizy ruchu na stronie',
          'GA4 może zbierać: adres IP, informacje o urządzeniu, zachowanie na stronie',
          'Dane są anonimizowane i nie identyfikują konkretnych osób',
          'Możesz wyłączyć GA4 używając rozszerzenia przeglądarki',
          'Okres przechowywania danych: 26 miesięcy'
        ]
      },

      googleSearchConsole: {
        title: '5. Google Search Console',
        content: [
          'Używamy Search Console do monitorowania wydajności w wyszukiwarkach',
          'Nie zbiera danych osobowych użytkowników',
          'Pomaga w optymalizacji SEO strony',
          'Dostępne tylko dla administratorów strony'
        ]
      },

      thirdParty: {
        title: '6. Pliki cookie stron trzecich',
        content: 'Nie używamy plików cookie stron trzecich poza Google Analytics i Search Console. Nie sprzedajemy ani nie udostępniamy danych z plików cookie innym firmom.'
      },

      management: {
        title: '7. Zarządzanie plikami cookie',
        content: [
          'Możesz zarządzać ustawieniami cookie w swojej przeglądarce',
          'Usunięcie plików cookie może wpłynąć na funkcjonalność strony',
          'Możesz wyłączyć Google Analytics używając rozszerzeń przeglądarki',
          'Ustawienia można zmienić w dowolnym momencie'
        ]
      },

      browserSettings: {
        title: '8. Ustawienia przeglądarki',
        content: [
          'Chrome: Ustawienia > Prywatność i bezpieczeństwo > Pliki cookie',
          'Firefox: Opcje > Prywatność i bezpieczeństwo > Pliki cookie',
          'Safari: Preferencje > Prywatność > Pliki cookie',
          'Edge: Ustawienia > Pliki cookie i uprawnienia witryn'
        ]
      },

      consent: {
        title: '9. Zgoda na pliki cookie',
        content: 'Kontynuując korzystanie z naszej strony, wyrażasz zgodę na używanie plików cookie zgodnie z tą polityką. Możesz wycofać zgodę w dowolnym momencie.'
      },

      updates: {
        title: '10. Aktualizacje polityki',
        content: 'Możemy aktualizować tę Politykę Cookies. O istotnych zmianach będziemy informować na tej stronie.'
      },

      contact: {
        title: '11. Kontakt',
        content: 'W sprawach związanych z plikami cookie możesz skontaktować się z nami: mptransporte24@web.de'
      }
    },

    de: {
      title: 'Cookie-Richtlinie',
      lastUpdated: 'Letzte Aktualisierung: 31. Juli 2025',
      intro: 'Diese Cookie-Richtlinie erklärt, wie MP Transporte und Umzüge Cookies und ähnliche Technologien auf unserer Website verwendet.',
      
      whatAreCookies: {
        title: '1. Was sind Cookies?',
        content: 'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden, wenn Sie eine Website besuchen. Sie helfen bei der Funktionalität der Website und liefern Informationen über die Nutzung.'
      },

      types: {
        title: '2. Arten von Cookies',
        content: [
          'Notwendige Cookies - für grundlegende Website-Funktionalität erforderlich',
          'Analytische Cookies - helfen zu verstehen, wie Nutzer die Website verwenden',
          'Funktionale Cookies - speichern Ihre Präferenzen und Einstellungen',
          'Marketing-Cookies - für personalisierte Werbung verwendet'
        ]
      },

      cookiesWeUse: {
        title: '3. Cookies, die wir verwenden',
        content: [
          'Google Analytics 4 (GA4) - für Website-Analyse',
          'Google Search Console - für Suchleistungsüberwachung',
          'Sitzungs-Cookies - für Benutzersitzungen',
          'Präferenz-Cookies - für Spracheinstellungen'
        ]
      },

      googleAnalytics: {
        title: '4. Google Analytics 4',
        content: [
          'Wir verwenden GA4 für Website-Analyse',
          'GA4 kann sammeln: IP-Adresse, Geräteinformationen, Website-Verhalten',
          'Daten werden anonymisiert und identifizieren keine Personen',
          'Sie können GA4 mit Browser-Erweiterungen deaktivieren',
          'Datenaufbewahrung: 26 Monate'
        ]
      },

      googleSearchConsole: {
        title: '5. Google Search Console',
        content: [
          'Wir verwenden Search Console für Suchleistungsüberwachung',
          'Sammelt keine persönlichen Nutzerdaten',
          'Hilft bei SEO-Optimierung',
          'Nur für Website-Administratoren verfügbar'
        ]
      },

      thirdParty: {
        title: '6. Third-Party-Cookies',
        content: 'Wir verwenden keine Third-Party-Cookies außer Google Analytics und Search Console. Wir verkaufen oder teilen keine Cookie-Daten mit anderen Unternehmen.'
      },

      management: {
        title: '7. Cookie-Verwaltung',
        content: [
          'Sie können Cookie-Einstellungen in Ihrem Browser verwalten',
          'Löschen von Cookies kann Website-Funktionalität beeinträchtigen',
          'Sie können Google Analytics mit Browser-Erweiterungen deaktivieren',
          'Einstellungen können jederzeit geändert werden'
        ]
      },

      browserSettings: {
        title: '8. Browser-Einstellungen',
        content: [
          'Chrome: Einstellungen > Datenschutz und Sicherheit > Cookies',
          'Firefox: Optionen > Datenschutz und Sicherheit > Cookies',
          'Safari: Einstellungen > Datenschutz > Cookies',
          'Edge: Einstellungen > Cookies und Website-Berechtigungen'
        ]
      },

      consent: {
        title: '9. Cookie-Einwilligung',
        content: 'Durch die weitere Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß dieser Richtlinie zu. Sie können die Einwilligung jederzeit widerrufen.'
      },

      updates: {
        title: '10. Richtlinien-Updates',
        content: 'Wir können diese Cookie-Richtlinie aktualisieren. Über wesentliche Änderungen werden wir auf dieser Seite informieren.'
      },

      contact: {
        title: '11. Kontakt',
        content: 'Bei Fragen zu Cookies können Sie uns kontaktieren: mptransporte24@web.de'
      }
    },

    en: {
      title: 'Cookie Policy',
      lastUpdated: 'Last updated: July 31, 2025',
      intro: 'This Cookie Policy explains how MP Transporte und Umzüge uses cookies and similar technologies on our website.',
      
      whatAreCookies: {
        title: '1. What are cookies?',
        content: 'Cookies are small text files that are stored on your device when you visit a website. They help with website functionality and provide information about usage.'
      },

      types: {
        title: '2. Types of cookies',
        content: [
          'Necessary cookies - required for basic website functionality',
          'Analytics cookies - help understand how users use the website',
          'Functional cookies - remember your preferences and settings',
          'Marketing cookies - used for personalized advertising'
        ]
      },

      cookiesWeUse: {
        title: '3. Cookies we use',
        content: [
          'Google Analytics 4 (GA4) - for website analysis',
          'Google Search Console - for search performance monitoring',
          'Session cookies - for user sessions',
          'Preference cookies - for language settings'
        ]
      },

      googleAnalytics: {
        title: '4. Google Analytics 4',
        content: [
          'We use GA4 for website analysis',
          'GA4 may collect: IP address, device information, website behavior',
          'Data is anonymized and does not identify individuals',
          'You can disable GA4 using browser extensions',
          'Data retention: 26 months'
        ]
      },

      googleSearchConsole: {
        title: '5. Google Search Console',
        content: [
          'We use Search Console for search performance monitoring',
          'Does not collect personal user data',
          'Helps with SEO optimization',
          'Available only to website administrators'
        ]
      },

      thirdParty: {
        title: '6. Third-party cookies',
        content: 'We do not use third-party cookies beyond Google Analytics and Search Console. We do not sell or share cookie data with other companies.'
      },

      management: {
        title: '7. Cookie management',
        content: [
          'You can manage cookie settings in your browser',
          'Deleting cookies may affect website functionality',
          'You can disable Google Analytics using browser extensions',
          'Settings can be changed at any time'
        ]
      },

      browserSettings: {
        title: '8. Browser settings',
        content: [
          'Chrome: Settings > Privacy and security > Cookies',
          'Firefox: Options > Privacy & Security > Cookies',
          'Safari: Preferences > Privacy > Cookies',
          'Edge: Settings > Cookies and site permissions'
        ]
      },

      consent: {
        title: '9. Cookie consent',
        content: 'By continuing to use our website, you consent to the use of cookies in accordance with this policy. You can withdraw consent at any time.'
      },

      updates: {
        title: '10. Policy updates',
        content: 'We may update this Cookie Policy. We will notify you of significant changes on this page.'
      },

      contact: {
        title: '11. Contact',
        content: 'For cookie-related matters, you can contact us: mptransporte24@web.de'
      }
    },

    es: {
      title: 'Política de Cookies',
      lastUpdated: 'Última actualización: 31 de julio de 2025',
      intro: 'Esta Política de Cookies explica cómo MP Transporte und Umzüge utiliza cookies y tecnologías similares en nuestro sitio web.',
      
      whatAreCookies: {
        title: '1. ¿Qué son las cookies?',
        content: 'Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita un sitio web. Ayudan con la funcionalidad del sitio web y proporcionan información sobre el uso.'
      },

      types: {
        title: '2. Tipos de cookies',
        content: [
          'Cookies necesarias - requeridas para funcionalidad básica del sitio',
          'Cookies analíticas - ayudan a entender cómo los usuarios usan el sitio',
          'Cookies funcionales - recuerdan sus preferencias y configuraciones',
          'Cookies de marketing - utilizadas para publicidad personalizada'
        ]
      },

      cookiesWeUse: {
        title: '3. Cookies que utilizamos',
        content: [
          'Google Analytics 4 (GA4) - para análisis del sitio web',
          'Google Search Console - para monitoreo de rendimiento de búsqueda',
          'Cookies de sesión - para sesiones de usuario',
          'Cookies de preferencia - para configuraciones de idioma'
        ]
      },

      googleAnalytics: {
        title: '4. Google Analytics 4',
        content: [
          'Utilizamos GA4 para análisis del sitio web',
          'GA4 puede recopilar: dirección IP, información del dispositivo, comportamiento del sitio',
          'Los datos se anonimizan y no identifican individuos',
          'Puede desactivar GA4 usando extensiones del navegador',
          'Retención de datos: 26 meses'
        ]
      },

      googleSearchConsole: {
        title: '5. Google Search Console',
        content: [
          'Utilizamos Search Console para monitoreo de rendimiento de búsqueda',
          'No recopila datos personales de usuarios',
          'Ayuda con optimización SEO',
          'Disponible solo para administradores del sitio'
        ]
      },

      thirdParty: {
        title: '6. Cookies de terceros',
        content: 'No utilizamos cookies de terceros más allá de Google Analytics y Search Console. No vendemos ni compartimos datos de cookies con otras empresas.'
      },

      management: {
        title: '7. Gestión de cookies',
        content: [
          'Puede gestionar configuraciones de cookies en su navegador',
          'Eliminar cookies puede afectar la funcionalidad del sitio',
          'Puede desactivar Google Analytics usando extensiones del navegador',
          'Las configuraciones se pueden cambiar en cualquier momento'
        ]
      },

      browserSettings: {
        title: '8. Configuraciones del navegador',
        content: [
          'Chrome: Configuración > Privacidad y seguridad > Cookies',
          'Firefox: Opciones > Privacidad y Seguridad > Cookies',
          'Safari: Preferencias > Privacidad > Cookies',
          'Edge: Configuración > Cookies y permisos del sitio'
        ]
      },

      consent: {
        title: '9. Consentimiento de cookies',
        content: 'Al continuar usando nuestro sitio web, usted consiente el uso de cookies de acuerdo con esta política. Puede retirar el consentimiento en cualquier momento.'
      },

      updates: {
        title: '10. Actualizaciones de la política',
        content: 'Podemos actualizar esta Política de Cookies. Le notificaremos sobre cambios significativos en esta página.'
      },

      contact: {
        title: '11. Contacto',
        content: 'Para asuntos relacionados con cookies, puede contactarnos: mptransporte24@web.de'
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.en;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4 flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Powrót
            </Button>
            <h1 className="text-4xl font-bold text-moving-dark mb-2">
              {currentContent.title}
            </h1>
            <p className="text-gray-600">{currentContent.lastUpdated}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            <div>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.intro}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.whatAreCookies.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.whatAreCookies.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.types.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.types.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.cookiesWeUse.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.cookiesWeUse.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.googleAnalytics.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.googleAnalytics.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.googleSearchConsole.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.googleSearchConsole.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.thirdParty.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.thirdParty.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.management.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.management.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.browserSettings.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.browserSettings.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.consent.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.consent.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.updates.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.updates.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.contact.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.contact.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy; 