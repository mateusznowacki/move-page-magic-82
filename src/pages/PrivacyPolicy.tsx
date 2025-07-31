import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    pl: {
      title: 'Polityka Prywatności',
      lastUpdated: 'Ostatnia aktualizacja: 31 lipca 2025',
      intro: 'MP Transporte und Umzüge (dalej "my", "nas", "firma") szanuje prywatność naszych klientów i użytkowników strony internetowej. Niniejsza Polityka Prywatności wyjaśnia, jak zbieramy, używamy i chronimy Twoje dane osobowe zgodnie z Rozporządzeniem o Ochronie Danych Osobowych (RODO) oraz niemieckim prawem o ochronie danych.',
      
      dataController: {
        title: '1. Administrator Danych',
        content: 'Administratorem Twoich danych osobowych jest: MP Transporte und Umzüge, Kolonnenstr. 8, 10827 Berlin, Niemcy. Możesz skontaktować się z nami w sprawach związanych z ochroną danych pod adresem: mptransporte24@web.de'
      },

      dataCollection: {
        title: '2. Jakie Dane Zbieramy',
        content: [
          'Dane kontaktowe: imię, adres email, numer telefonu',
          'Dane o przeprowadzce: data przeprowadzki, typ przeprowadzki, szczegóły usługi',
          'Dane techniczne: adres IP, informacje o przeglądarce, pliki cookie',
          'Dane analityczne: Google Analytics 4 (GA4) do analizy ruchu na stronie'
        ]
      },

      purpose: {
        title: '3. Cel Przetwarzania Danych',
        content: [
          'Świadczenie usług przeprowadzkowych',
          'Komunikacja z klientami',
          'Analiza i poprawa funkcjonalności strony',
          'Marketing bezpośredni (za zgodą)',
          'Wypełnienie obowiązków prawnych'
        ]
      },

      legalBasis: {
        title: '4. Podstawa Prawna',
        content: [
          'Art. 6 ust. 1 lit. b) RODO - wykonanie umowy',
          'Art. 6 ust. 1 lit. f) RODO - uzasadniony interes (analiza strony)',
          'Art. 6 ust. 1 lit. a) RODO - zgoda (marketing)'
        ]
      },

      retention: {
        title: '5. Okres Przechowywania',
        content: [
          'Dane kontaktowe: 3 lata po ostatnim kontakcie',
          'Dane o umowach: 10 lat (wymóg prawny)',
          'Dane analityczne: 26 miesięcy (Google Analytics)',
          'Pliki cookie: zgodnie z ustawieniami przeglądarki'
        ]
      },

      sharing: {
        title: '6. Udostępnianie Danych',
        content: 'Nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych. Możemy udostępniać dane: dostawcom usług (Google Analytics), organom prawnym (na żądanie), partnerom biznesowym (za zgodą).'
      },

      rights: {
        title: '7. Twoje Prawa',
        content: [
          'Prawo dostępu do danych',
          'Prawo do sprostowania',
          'Prawo do usunięcia',
          'Prawo do ograniczenia przetwarzania',
          'Prawo do przenoszenia danych',
          'Prawo do sprzeciwu',
          'Prawo do wycofania zgody'
        ]
      },

      cookies: {
        title: '8. Pliki Cookie',
        content: 'Używamy plików cookie do: analizy ruchu (Google Analytics), zapamiętywania preferencji, poprawy funkcjonalności. Możesz zarządzać ustawieniami cookie w swojej przeglądarce.'
      },

      analytics: {
        title: '9. Google Analytics 4',
        content: 'Używamy Google Analytics 4 do analizy ruchu na stronie. GA4 może zbierać: adres IP, informacje o urządzeniu, zachowanie na stronie. Dane są anonimizowane i nie identyfikują konkretnych osób.'
      },

      security: {
        title: '10. Bezpieczeństwo Danych',
        content: 'Stosujemy odpowiednie środki techniczne i organizacyjne do ochrony Twoich danych osobowych przed nieuprawnionym dostępem, utratą lub zniszczeniem.'
      },

      contact: {
        title: '11. Kontakt',
        content: 'W sprawach związanych z ochroną danych osobowych możesz skontaktować się z nami: Email: mptransporte24@web.de, Adres: Kolonnenstr. 8, 10827 Berlin, Niemcy.'
      },

      changes: {
        title: '12. Zmiany Polityki',
        content: 'Zastrzegamy sobie prawo do aktualizacji tej Polityki Prywatności. O istotnych zmianach będziemy informować na tej stronie.'
      }
    },

    de: {
      title: 'Datenschutzerklärung',
      lastUpdated: 'Letzte Aktualisierung: 31. Juli 2025',
      intro: 'MP Transporte und Umzüge (nachfolgend "wir", "uns", "Unternehmen") respektiert die Privatsphäre unserer Kunden und Website-Benutzer. Diese Datenschutzerklärung erklärt, wie wir Ihre personenbezogenen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) und dem deutschen Datenschutzrecht sammeln, verwenden und schützen.',
      
      dataController: {
        title: '1. Verantwortlicher',
        content: 'Verantwortlicher für Ihre personenbezogenen Daten ist: MP Transporte und Umzüge, Kolonnenstr. 8, 10827 Berlin, Deutschland. Sie können uns in Datenschutzangelegenheiten unter mptransporte24@web.de kontaktieren.'
      },

      dataCollection: {
        title: '2. Welche Daten wir sammeln',
        content: [
          'Kontaktdaten: Name, E-Mail-Adresse, Telefonnummer',
          'Umzugsdaten: Umzugsdatum, Umzugsart, Servicedetails',
          'Technische Daten: IP-Adresse, Browser-Informationen, Cookies',
          'Analytische Daten: Google Analytics 4 (GA4) zur Website-Analyse'
        ]
      },

      purpose: {
        title: '3. Zweck der Datenverarbeitung',
        content: [
          'Erbringung von Umzugsdienstleistungen',
          'Kommunikation mit Kunden',
          'Analyse und Verbesserung der Website-Funktionalität',
          'Direktmarketing (mit Einwilligung)',
          'Erfüllung rechtlicher Verpflichtungen'
        ]
      },

      legalBasis: {
        title: '4. Rechtsgrundlage',
        content: [
          'Art. 6 Abs. 1 lit. b) DSGVO - Vertragserfüllung',
          'Art. 6 Abs. 1 lit. f) DSGVO - Berechtigtes Interesse (Website-Analyse)',
          'Art. 6 Abs. 1 lit. a) DSGVO - Einwilligung (Marketing)'
        ]
      },

      retention: {
        title: '5. Aufbewahrungsfristen',
        content: [
          'Kontaktdaten: 3 Jahre nach letztem Kontakt',
          'Vertragsdaten: 10 Jahre (gesetzliche Pflicht)',
          'Analytische Daten: 26 Monate (Google Analytics)',
          'Cookies: gemäß Browser-Einstellungen'
        ]
      },

      sharing: {
        title: '6. Datenweitergabe',
        content: 'Wir verkaufen oder vermieten Ihre personenbezogenen Daten nicht. Wir können Daten weitergeben an: Dienstleister (Google Analytics), Behörden (auf Anfrage), Geschäftspartner (mit Einwilligung).'
      },

      rights: {
        title: '7. Ihre Rechte',
        content: [
          'Recht auf Auskunft',
          'Recht auf Berichtigung',
          'Recht auf Löschung',
          'Recht auf Einschränkung der Verarbeitung',
          'Recht auf Datenübertragbarkeit',
          'Widerspruchsrecht',
          'Recht auf Widerruf der Einwilligung'
        ]
      },

      cookies: {
        title: '8. Cookies',
        content: 'Wir verwenden Cookies für: Verkehrsanalyse (Google Analytics), Speicherung von Präferenzen, Verbesserung der Funktionalität. Sie können Cookie-Einstellungen in Ihrem Browser verwalten.'
      },

      analytics: {
        title: '9. Google Analytics 4',
        content: 'Wir verwenden Google Analytics 4 zur Website-Analyse. GA4 kann sammeln: IP-Adresse, Geräteinformationen, Website-Verhalten. Daten werden anonymisiert und identifizieren keine spezifischen Personen.'
      },

      security: {
        title: '10. Datensicherheit',
        content: 'Wir wenden angemessene technische und organisatorische Maßnahmen zum Schutz Ihrer personenbezogenen Daten vor unbefugtem Zugriff, Verlust oder Zerstörung an.'
      },

      contact: {
        title: '11. Kontakt',
        content: 'Bei Fragen zum Datenschutz können Sie uns kontaktieren: E-Mail: mptransporte24@web.de, Adresse: Kolonnenstr. 8, 10827 Berlin, Deutschland.'
      },

      changes: {
        title: '12. Änderungen der Erklärung',
        content: 'Wir behalten uns das Recht vor, diese Datenschutzerklärung zu aktualisieren. Über wesentliche Änderungen werden wir auf dieser Seite informieren.'
      }
    },

    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last updated: July 31, 2025',
      intro: 'MP Transporte und Umzüge (hereinafter "we", "us", "company") respects the privacy of our customers and website users. This Privacy Policy explains how we collect, use, and protect your personal data in accordance with the General Data Protection Regulation (GDPR) and German data protection law.',
      
      dataController: {
        title: '1. Data Controller',
        content: 'The controller of your personal data is: MP Transporte und Umzüge, Kolonnenstr. 8, 10827 Berlin, Germany. You can contact us regarding data protection matters at: mptransporte24@web.de'
      },

      dataCollection: {
        title: '2. Data We Collect',
        content: [
          'Contact data: name, email address, phone number',
          'Moving data: moving date, moving type, service details',
          'Technical data: IP address, browser information, cookies',
          'Analytics data: Google Analytics 4 (GA4) for website analysis'
        ]
      },

      purpose: {
        title: '3. Purpose of Data Processing',
        content: [
          'Provision of moving services',
          'Communication with customers',
          'Analysis and improvement of website functionality',
          'Direct marketing (with consent)',
          'Fulfillment of legal obligations'
        ]
      },

      legalBasis: {
        title: '4. Legal Basis',
        content: [
          'Art. 6(1)(b) GDPR - Contract performance',
          'Art. 6(1)(f) GDPR - Legitimate interest (website analysis)',
          'Art. 6(1)(a) GDPR - Consent (marketing)'
        ]
      },

      retention: {
        title: '5. Data Retention',
        content: [
          'Contact data: 3 years after last contact',
          'Contract data: 10 years (legal requirement)',
          'Analytics data: 26 months (Google Analytics)',
          'Cookies: according to browser settings'
        ]
      },

      sharing: {
        title: '6. Data Sharing',
        content: 'We do not sell or rent your personal data. We may share data with: service providers (Google Analytics), authorities (upon request), business partners (with consent).'
      },

      rights: {
        title: '7. Your Rights',
        content: [
          'Right of access',
          'Right to rectification',
          'Right to erasure',
          'Right to restriction of processing',
          'Right to data portability',
          'Right to object',
          'Right to withdraw consent'
        ]
      },

      cookies: {
        title: '8. Cookies',
        content: 'We use cookies for: traffic analysis (Google Analytics), preference storage, functionality improvement. You can manage cookie settings in your browser.'
      },

      analytics: {
        title: '9. Google Analytics 4',
        content: 'We use Google Analytics 4 for website analysis. GA4 may collect: IP address, device information, website behavior. Data is anonymized and does not identify specific individuals.'
      },

      security: {
        title: '10. Data Security',
        content: 'We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, loss, or destruction.'
      },

      contact: {
        title: '11. Contact',
        content: 'For data protection matters, you can contact us: Email: mptransporte24@web.de, Address: Kolonnenstr. 8, 10827 Berlin, Germany.'
      },

      changes: {
        title: '12. Policy Changes',
        content: 'We reserve the right to update this Privacy Policy. We will notify you of significant changes on this page.'
      }
    },

    es: {
      title: 'Política de Privacidad',
      lastUpdated: 'Última actualización: 31 de julio de 2025',
      intro: 'MP Transporte und Umzüge (en adelante "nosotros", "nuestra", "empresa") respeta la privacidad de nuestros clientes y usuarios del sitio web. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos sus datos personales de acuerdo con el Reglamento General de Protección de Datos (RGPD) y la ley alemana de protección de datos.',
      
      dataController: {
        title: '1. Responsable del Tratamiento',
        content: 'El responsable de sus datos personales es: MP Transporte und Umzüge, Kolonnenstr. 8, 10827 Berlin, Alemania. Puede contactarnos en asuntos de protección de datos en: mptransporte24@web.de'
      },

      dataCollection: {
        title: '2. Datos que Recopilamos',
        content: [
          'Datos de contacto: nombre, dirección de correo electrónico, número de teléfono',
          'Datos de mudanza: fecha de mudanza, tipo de mudanza, detalles del servicio',
          'Datos técnicos: dirección IP, información del navegador, cookies',
          'Datos analíticos: Google Analytics 4 (GA4) para análisis del sitio web'
        ]
      },

      purpose: {
        title: '3. Propósito del Tratamiento de Datos',
        content: [
          'Prestación de servicios de mudanza',
          'Comunicación con clientes',
          'Análisis y mejora de la funcionalidad del sitio web',
          'Marketing directo (con consentimiento)',
          'Cumplimiento de obligaciones legales'
        ]
      },

      legalBasis: {
        title: '4. Base Legal',
        content: [
          'Art. 6(1)(b) RGPD - Ejecución del contrato',
          'Art. 6(1)(f) RGPD - Interés legítimo (análisis del sitio web)',
          'Art. 6(1)(a) RGPD - Consentimiento (marketing)'
        ]
      },

      retention: {
        title: '5. Retención de Datos',
        content: [
          'Datos de contacto: 3 años después del último contacto',
          'Datos del contrato: 10 años (requisito legal)',
          'Datos analíticos: 26 meses (Google Analytics)',
          'Cookies: según la configuración del navegador'
        ]
      },

      sharing: {
        title: '6. Compartir Datos',
        content: 'No vendemos ni alquilamos sus datos personales. Podemos compartir datos con: proveedores de servicios (Google Analytics), autoridades (a solicitud), socios comerciales (con consentimiento).'
      },

      rights: {
        title: '7. Sus Derechos',
        content: [
          'Derecho de acceso',
          'Derecho de rectificación',
          'Derecho de supresión',
          'Derecho de limitación del tratamiento',
          'Derecho de portabilidad de datos',
          'Derecho de oposición',
          'Derecho de retirar el consentimiento'
        ]
      },

      cookies: {
        title: '8. Cookies',
        content: 'Utilizamos cookies para: análisis de tráfico (Google Analytics), almacenamiento de preferencias, mejora de funcionalidad. Puede gestionar la configuración de cookies en su navegador.'
      },

      analytics: {
        title: '9. Google Analytics 4',
        content: 'Utilizamos Google Analytics 4 para el análisis del sitio web. GA4 puede recopilar: dirección IP, información del dispositivo, comportamiento del sitio web. Los datos se anonimizan y no identifican a personas específicas.'
      },

      security: {
        title: '10. Seguridad de Datos',
        content: 'Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales contra acceso no autorizado, pérdida o destrucción.'
      },

      contact: {
        title: '11. Contacto',
        content: 'Para asuntos de protección de datos, puede contactarnos: Email: mptransporte24@web.de, Dirección: Kolonnenstr. 8, 10827 Berlin, Alemania.'
      },

      changes: {
        title: '12. Cambios en la Política',
        content: 'Nos reservamos el derecho de actualizar esta Política de Privacidad. Le notificaremos sobre cambios significativos en esta página.'
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
                {currentContent.dataController.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.dataController.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.dataCollection.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.dataCollection.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.purpose.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.purpose.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.legalBasis.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.legalBasis.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.retention.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.retention.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.sharing.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.sharing.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.rights.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.rights.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.cookies.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.cookies.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.analytics.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.analytics.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.security.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.security.content}
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

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.changes.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.changes.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 