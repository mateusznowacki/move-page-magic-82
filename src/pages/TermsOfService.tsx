import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const TermsOfService: React.FC = () => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const content = {
    pl: {
      title: 'Regulamin Usług',
      lastUpdated: 'Ostatnia aktualizacja: 31 lipca 2025',
      intro: 'Niniejszy regulamin określa warunki świadczenia usług przeprowadzkowych przez MP Transporte und Umzüge z siedzibą w Berlinie, Niemcy.',
      
      company: {
        title: '1. Informacje o Firmie',
        content: 'MP Transporte und Umzüge, Kolonnenstr. 8, 10827 Berlin, Niemcy. NIP: [numer], KRS: [numer].'
      },

      services: {
        title: '2. Zakres Usług',
        content: [
          'Przeprowadzki mieszkaniowe',
          'Przeprowadzki komercyjne',
          'Przeprowadzki na duże odległości',
          'Przeprowadzki międzynarodowe',
          'Pakowanie i rozpakowywanie',
          'Rozbiórka i montaż mebli',
          'Rozwiązania magazynowe'
        ]
      },

      booking: {
        title: '3. Rezerwacja i Umowa',
        content: [
          'Rezerwacja usługi następuje po potwierdzeniu przez firmę',
          'Umowa jest zawierana w formie pisemnej lub elektronicznej',
          'Klient zobowiązuje się do podania dokładnych informacji o przeprowadzce',
          'Firma zastrzega sobie prawo do odmowy świadczenia usługi'
        ]
      },

      pricing: {
        title: '4. Cennik i Płatności',
        content: [
          'Ceny są podane w euro i zawierają podatek VAT',
          'Ostateczna cena jest ustalana po wizji lokalnej',
          'Wymagana jest zaliczka w wysokości 30% przy rezerwacji',
          'Pozostała kwota płatna po zakończeniu usługi',
          'Akceptujemy płatności gotówkowe, przelewem i kartą'
        ]
      },

      cancellation: {
        title: '5. Odwołanie i Zmiany',
        content: [
          'Odwołanie do 7 dni przed przeprowadzką - zwrot 100% zaliczki',
          'Odwołanie 3-7 dni przed - zwrot 50% zaliczki',
          'Odwołanie mniej niż 3 dni - brak zwrotu zaliczki',
          'Zmiana terminu możliwa za zgodą firmy',
          'Firma może odwołać usługę w przypadku siły wyższej'
        ]
      },

      liability: {
        title: '6. Odpowiedzialność',
        content: [
          'Firma odpowiada za szkody wyrządzone podczas przeprowadzki',
          'Odpowiedzialność ograniczona do wartości rzeczy',
          'Klient zobowiązuje się do zabezpieczenia cennych przedmiotów',
          'Firma nie odpowiada za szkody spowodowane przez klienta',
          'Ubezpieczenie obejmuje standardowe ryzyka'
        ]
      },

      obligations: {
        title: '7. Obowiązki Klienta',
        content: [
          'Przygotowanie rzeczy do przeprowadzki',
          'Zapewnienie dostępu do lokali',
          'Obecność podczas przeprowadzki',
          'Sprawdzenie stanu rzeczy po przewiezieniu',
          'Zgłaszanie reklamacji w terminie 24 godzin'
        ]
      },

      forceMajeure: {
        title: '8. Siła Wyższa',
        content: 'Firma nie ponosi odpowiedzialności za opóźnienia lub niemożność świadczenia usług spowodowane siłą wyższą (np. katastrofy naturalne, strajki, przepisy prawne).'
      },

      complaints: {
        title: '9. Reklamacje',
        content: [
          'Reklamacje można zgłaszać telefonicznie lub mailowo',
          'Termin rozpatrzenia reklamacji: 14 dni',
          'W przypadku braku porozumienia - mediacja',
          'Prawo do sądu pozostaje nienaruszone'
        ]
      },

      dataProtection: {
        title: '10. Ochrona Danych',
        content: 'Przetwarzanie danych osobowych odbywa się zgodnie z Polityką Prywatności dostępną na stronie internetowej.'
      },

      jurisdiction: {
        title: '11. Właściwość Sądowa',
        content: 'Właściwe są sądy niemieckie. Stosuje się prawo niemieckie.'
      },

      changes: {
        title: '12. Zmiany Regulaminu',
        content: 'Firma zastrzega sobie prawo do zmiany regulaminu. O zmianach klienci będą informowani z wyprzedzeniem.'
      }
    },

    de: {
      title: 'Allgemeine Geschäftsbedingungen',
      lastUpdated: 'Letzte Aktualisierung: 31. Juli 2025',
      intro: 'Diese Allgemeinen Geschäftsbedingungen regeln die Bedingungen für die Erbringung von Umzugsdienstleistungen durch MP Transporte und Umzüge mit Sitz in Berlin, Deutschland.',
      
      company: {
        title: '1. Unternehmensinformationen',
        content: 'MP Transporte und Umzüge, Kolonnenstr. 8, 10827 Berlin, Deutschland. Steuernummer: [Nummer], Handelsregister: [Nummer].'
      },

      services: {
        title: '2. Leistungsumfang',
        content: [
          'Wohnungsumzüge',
          'Geschäftsumzüge',
          'Fernumzüge',
          'Internationale Umzüge',
          'Verpackung und Auspackung',
          'Möbelmontage und -demontage',
          'Lagerlösungen'
        ]
      },

      booking: {
        title: '3. Buchung und Vertrag',
        content: [
          'Buchung erfolgt nach Bestätigung durch das Unternehmen',
          'Vertrag wird schriftlich oder elektronisch geschlossen',
          'Kunde verpflichtet sich zu genauen Umzugsangaben',
          'Unternehmen behält sich Recht zur Leistungsverweigerung vor'
        ]
      },

      pricing: {
        title: '4. Preise und Zahlung',
        content: [
          'Preise in Euro inklusive MwSt',
          'Endpreis wird nach Ortsbesichtigung festgelegt',
          'Anzahlung von 30% bei Buchung erforderlich',
          'Restbetrag nach Leistungserbringung fällig',
          'Zahlung bar, per Überweisung oder Karte möglich'
        ]
      },

      cancellation: {
        title: '5. Stornierung und Änderungen',
        content: [
          'Stornierung bis 7 Tage vor Umzug - 100% Rückerstattung',
          'Stornierung 3-7 Tage vor - 50% Rückerstattung',
          'Stornierung weniger als 3 Tage - keine Rückerstattung',
          'Terminänderung nach Zustimmung möglich',
          'Unternehmen kann bei höherer Gewalt stornieren'
        ]
      },

      liability: {
        title: '6. Haftung',
        content: [
          'Unternehmen haftet für Umzugsschäden',
          'Haftung auf Sachwert begrenzt',
          'Kunde verpflichtet sich zur Sicherung wertvoller Gegenstände',
          'Keine Haftung für kundenseitige Schäden',
          'Versicherung deckt Standardrisiken'
        ]
      },

      obligations: {
        title: '7. Kundenpflichten',
        content: [
          'Vorbereitung der Umzugsgüter',
          'Gewährung von Zugang zu Räumlichkeiten',
          'Anwesenheit während des Umzugs',
          'Überprüfung des Zustands nach Transport',
          'Reklamationen innerhalb 24 Stunden'
        ]
      },

      forceMajeure: {
        title: '8. Höhere Gewalt',
        content: 'Unternehmen haftet nicht für Verzögerungen oder Unmöglichkeit der Leistungserbringung durch höhere Gewalt (z.B. Naturkatastrophen, Streiks, Rechtsvorschriften).'
      },

      complaints: {
        title: '9. Reklamationen',
        content: [
          'Reklamationen telefonisch oder per E-Mail möglich',
          'Bearbeitungszeit: 14 Tage',
          'Bei Uneinigkeit - Mediation',
          'Gerichtsweg bleibt unberührt'
        ]
      },

      dataProtection: {
        title: '10. Datenschutz',
        content: 'Verarbeitung personenbezogener Daten erfolgt gemäß der auf der Website verfügbaren Datenschutzerklärung.'
      },

      jurisdiction: {
        title: '11. Gerichtsstand',
        content: 'Zuständig sind deutsche Gerichte. Es gilt deutsches Recht.'
      },

      changes: {
        title: '12. Änderungen der AGB',
        content: 'Unternehmen behält sich Recht zur Änderung der AGB vor. Kunden werden über Änderungen vorab informiert.'
      }
    },

    en: {
      title: 'Terms of Service',
      lastUpdated: 'Last updated: July 31, 2025',
      intro: 'These Terms of Service govern the conditions for providing moving services by MP Transporte und Umzüge based in Berlin, Germany.',
      
      company: {
        title: '1. Company Information',
        content: 'MP Transporte und Umzüge, Kolonnenstr. 8, 10827 Berlin, Germany. Tax ID: [number], Commercial Register: [number].'
      },

      services: {
        title: '2. Scope of Services',
        content: [
          'Residential moving',
          'Commercial moving',
          'Long-distance moving',
          'International moving',
          'Packing and unpacking',
          'Furniture assembly and disassembly',
          'Storage solutions'
        ]
      },

      booking: {
        title: '3. Booking and Contract',
        content: [
          'Booking occurs after confirmation by the company',
          'Contract is concluded in writing or electronically',
          'Customer commits to providing accurate moving information',
          'Company reserves the right to refuse service'
        ]
      },

      pricing: {
        title: '4. Pricing and Payment',
        content: [
          'Prices in euros including VAT',
          'Final price determined after site inspection',
          '30% deposit required upon booking',
          'Remaining amount due after service completion',
          'Payment by cash, transfer, or card accepted'
        ]
      },

      cancellation: {
        title: '5. Cancellation and Changes',
        content: [
          'Cancellation up to 7 days before - 100% refund',
          'Cancellation 3-7 days before - 50% refund',
          'Cancellation less than 3 days - no refund',
          'Date changes possible with company consent',
          'Company may cancel due to force majeure'
        ]
      },

      liability: {
        title: '6. Liability',
        content: [
          'Company liable for moving damages',
          'Liability limited to item value',
          'Customer must secure valuable items',
          'No liability for customer-caused damages',
          'Insurance covers standard risks'
        ]
      },

      obligations: {
        title: '7. Customer Obligations',
        content: [
          'Prepare items for moving',
          'Provide access to premises',
          'Be present during moving',
          'Check item condition after transport',
          'Report complaints within 24 hours'
        ]
      },

      forceMajeure: {
        title: '8. Force Majeure',
        content: 'Company not liable for delays or impossibility of service due to force majeure (e.g., natural disasters, strikes, legal regulations).'
      },

      complaints: {
        title: '9. Complaints',
        content: [
          'Complaints can be made by phone or email',
          'Processing time: 14 days',
          'In case of disagreement - mediation',
          'Right to court remains unaffected'
        ]
      },

      dataProtection: {
        title: '10. Data Protection',
        content: 'Processing of personal data is carried out in accordance with the Privacy Policy available on the website.'
      },

      jurisdiction: {
        title: '11. Jurisdiction',
        content: 'German courts have jurisdiction. German law applies.'
      },

      changes: {
        title: '12. Changes to Terms',
        content: 'Company reserves the right to change terms. Customers will be informed of changes in advance.'
      }
    },

    es: {
      title: 'Términos de Servicio',
      lastUpdated: 'Última actualización: 31 de julio de 2025',
      intro: 'Estos Términos de Servicio rigen las condiciones para la prestación de servicios de mudanza por MP Transporte und Umzüge con sede en Berlín, Alemania.',
      
      company: {
        title: '1. Información de la Empresa',
        content: 'MP Transporte und Umzüge, Kolonnenstr. 8, 10827 Berlin, Alemania. NIF: [número], Registro Mercantil: [número].'
      },

      services: {
        title: '2. Alcance de los Servicios',
        content: [
          'Mudanzas residenciales',
          'Mudanzas comerciales',
          'Mudanzas de larga distancia',
          'Mudanzas internacionales',
          'Embalaje y desempaquetado',
          'Montaje y desmontaje de muebles',
          'Soluciones de almacenamiento'
        ]
      },

      booking: {
        title: '3. Reserva y Contrato',
        content: [
          'La reserva se realiza tras confirmación de la empresa',
          'El contrato se celebra por escrito o electrónicamente',
          'El cliente se compromete a proporcionar información precisa',
          'La empresa se reserva el derecho de rechazar el servicio'
        ]
      },

      pricing: {
        title: '4. Precios y Pago',
        content: [
          'Precios en euros incluyendo IVA',
          'Precio final determinado tras inspección',
          'Se requiere depósito del 30% al reservar',
          'Cantidad restante pagadera tras completar el servicio',
          'Pago en efectivo, transferencia o tarjeta aceptado'
        ]
      },

      cancellation: {
        title: '5. Cancelación y Cambios',
        content: [
          'Cancelación hasta 7 días antes - 100% reembolso',
          'Cancelación 3-7 días antes - 50% reembolso',
          'Cancelación menos de 3 días - sin reembolso',
          'Cambios de fecha posibles con consentimiento',
          'Empresa puede cancelar por fuerza mayor'
        ]
      },

      liability: {
        title: '6. Responsabilidad',
        content: [
          'Empresa responsable por daños durante mudanza',
          'Responsabilidad limitada al valor del artículo',
          'Cliente debe asegurar artículos valiosos',
          'Sin responsabilidad por daños causados por cliente',
          'Seguro cubre riesgos estándar'
        ]
      },

      obligations: {
        title: '7. Obligaciones del Cliente',
        content: [
          'Preparar artículos para mudanza',
          'Proporcionar acceso a instalaciones',
          'Estar presente durante mudanza',
          'Verificar estado tras transporte',
          'Reportar quejas dentro de 24 horas'
        ]
      },

      forceMajeure: {
        title: '8. Fuerza Mayor',
        content: 'Empresa no responsable por retrasos o imposibilidad de servicio por fuerza mayor (ej., desastres naturales, huelgas, regulaciones legales).'
      },

      complaints: {
        title: '9. Quejas',
        content: [
          'Quejas por teléfono o email',
          'Tiempo de procesamiento: 14 días',
          'En caso de desacuerdo - mediación',
          'Derecho a tribunal permanece intacto'
        ]
      },

      dataProtection: {
        title: '10. Protección de Datos',
        content: 'Procesamiento de datos personales se realiza según la Política de Privacidad disponible en el sitio web.'
      },

      jurisdiction: {
        title: '11. Jurisdicción',
        content: 'Tribunales alemanes tienen jurisdicción. Se aplica ley alemana.'
      },

      changes: {
        title: '12. Cambios en Términos',
        content: 'Empresa se reserva derecho a cambiar términos. Clientes serán informados de cambios por adelantado.'
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
                {currentContent.company.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.company.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.services.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.services.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.booking.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.booking.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.pricing.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.pricing.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.cancellation.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.cancellation.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.liability.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.liability.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.obligations.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.obligations.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.forceMajeure.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.forceMajeure.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.complaints.title}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {currentContent.complaints.content.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.dataProtection.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.dataProtection.content}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-moving-dark mb-4">
                {currentContent.jurisdiction.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {currentContent.jurisdiction.content}
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

export default TermsOfService; 