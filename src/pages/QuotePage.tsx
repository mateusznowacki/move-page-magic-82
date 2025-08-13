import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import SEOHead from '@/components/SEOHead';
import ScrollToTop from '@/components/ScrollToTop';
import { Calculator, MapPin, Calendar, Package, Truck, BadgePercent, Clock, Shield, Star } from 'lucide-react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const QuotePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    fromAddress: '',
    toAddress: '',
    moveDate: '',
    moveType: '',
    rooms: '',
    distance: '',
    additionalServices: [] as string[],
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Usuń błąd dla tego pola jeśli użytkownik zaczyna pisać
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Usuń błąd dla tego pola jeśli użytkownik wybiera opcję
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    // Walidacja imienia
    if (!formData.name.trim()) {
      newErrors.name = language === 'pl' ? 'Imię jest wymagane' :
                      language === 'de' ? 'Name ist erforderlich' :
                      language === 'es' ? 'El nombre es requerido' :
                      'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = language === 'pl' ? 'Imię musi mieć co najmniej 2 znaki' :
                      language === 'de' ? 'Name muss mindestens 2 Zeichen haben' :
                      language === 'es' ? 'El nombre debe tener al menos 2 caracteres' :
                      'Name must be at least 2 characters';
    }

    // Walidacja email
    if (!formData.email.trim()) {
      newErrors.email = language === 'pl' ? 'Email jest wymagany' :
                       language === 'de' ? 'E-Mail ist erforderlich' :
                       language === 'es' ? 'El email es requerido' :
                       'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = language === 'pl' ? 'Nieprawidłowy format email' :
                         language === 'de' ? 'Ungültiges E-Mail-Format' :
                         language === 'es' ? 'Formato de email inválido' :
                         'Invalid email format';
      }
    }

    // Walidacja wiadomości
    if (!formData.message.trim()) {
      newErrors.message = language === 'pl' ? 'Wiadomość jest wymagana' :
                         language === 'de' ? 'Nachricht ist erforderlich' :
                         language === 'es' ? 'El mensaje es requerido' :
                         'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {

      // Przygotuj wiadomość WhatsApp w zależności od języka
      const getWhatsAppMessage = () => {
        const labels = {
          pl: {
            title: 'Meister Umzüge 24 - Nowa wycena',
            contactInfo: 'Dane kontaktowe:',
            name: 'Imię',
            email: 'Email',
            phone: 'Telefon',
            notProvided: 'Nie podano',
            moveDetails: 'Szczegóły przeprowadzki:',
            from: 'Z',
            to: 'Do',
            date: 'Data',
            type: 'Typ',
            rooms: 'Pokoje',
            distance: 'Odległość',
            moveTypes: {
              residential: 'Przeprowadzka mieszkaniowa',
              commercial: 'Przeprowadzka biurowa',
              international: 'Przeprowadzka międzynarodowa'
            },
            additionalServices: 'Dodatkowe usługi:',
            none: 'Brak',
            message: 'Wiadomość:',
            sentFrom: 'Wysłane ze strony: meisterumzuege24.de'
          },
          de: {
            title: 'Meister Umzüge 24 - Neues Angebot',
            contactInfo: 'Kontaktdaten:',
            name: 'Name',
            email: 'E-Mail',
            phone: 'Telefon',
            notProvided: 'Nicht angegeben',
            moveDetails: 'Umzugsdetails:',
            from: 'Von',
            to: 'Nach',
            date: 'Datum',
            type: 'Typ',
            rooms: 'Zimmer',
            distance: 'Entfernung',
            moveTypes: {
              residential: 'Wohnungsumzug',
              commercial: 'Büroumzug',
              international: 'Internationaler Umzug'
            },
            additionalServices: 'Zusätzliche Dienstleistungen:',
            none: 'Keine',
            message: 'Nachricht:',
            sentFrom: 'Gesendet von: meisterumzuege24.de'
          },
          es: {
            title: 'Meister Umzüge 24 - Nuevo Presupuesto',
            contactInfo: 'Datos de contacto:',
            name: 'Nombre',
            email: 'Correo',
            phone: 'Teléfono',
            notProvided: 'No proporcionado',
            moveDetails: 'Detalles de mudanza:',
            from: 'Desde',
            to: 'Hasta',
            date: 'Fecha',
            type: 'Tipo',
            rooms: 'Habitaciones',
            distance: 'Distancia',
            moveTypes: {
              residential: 'Mudanza residencial',
              commercial: 'Mudanza comercial',
              international: 'Mudanza internacional'
            },
            additionalServices: 'Servicios adicionales:',
            none: 'Ninguno',
            message: 'Mensaje:',
            sentFrom: 'Enviado desde: meisterumzuege24.de'
          },
          en: {
            title: 'Meister Umzüge 24 - New Quote',
            contactInfo: 'Contact Information:',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            notProvided: 'Not provided',
            moveDetails: 'Moving Details:',
            from: 'From',
            to: 'To',
            date: 'Date',
            type: 'Type',
            rooms: 'Rooms',
            distance: 'Distance',
            moveTypes: {
              residential: 'Residential Move',
              commercial: 'Commercial Move',
              international: 'International Move'
            },
            additionalServices: 'Additional Services:',
            none: 'None',
            message: 'Message:',
            sentFrom: 'Sent from: meisterumzuege24.de'
          }
        };

        const l = labels[language as keyof typeof labels] || labels.en;

        return `
🌍 *${l.title}*

*${l.contactInfo}*
👤 ${l.name}: ${formData.name}
📧 ${l.email}: ${formData.email}
📱 ${l.phone}: ${formData.phone || l.notProvided}

*${l.moveDetails}*
📍 ${l.from}: ${formData.fromAddress || l.notProvided}
📍 ${l.to}: ${formData.toAddress || l.notProvided}
📅 ${l.date}: ${formData.moveDate || l.notProvided}
🏠 ${l.type}: ${formData.moveType ? l.moveTypes[formData.moveType as keyof typeof l.moveTypes] || formData.moveType : l.notProvided}
🏠 ${l.rooms}: ${formData.rooms || l.notProvided}
📏 ${l.distance}: ${formData.distance || l.notProvided}

*${l.additionalServices}*
${formData.additionalServices.length > 0 ? formData.additionalServices.join(', ') : l.none}

*${l.message}*
${formData.message}

---
*${l.sentFrom}*
        `.trim();
      };

      const whatsappMessage = getWhatsAppMessage();

      const whatsappUrl = `https://wa.me/4915223031473?text=${encodeURIComponent(whatsappMessage)}&lang=${language}`;
      
      // Google Ads conversion tracking
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17470976934/QWi-CPjv1IUbEKbn54pB',
          'value': 1.0,
          'currency': 'PLN'
        });
      }
      
      // Otwórz WhatsApp po krótkim opóźnieniu
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 100);

      toast({
        title: language === 'pl' ? 'Wycena wysłana!' :
              language === 'de' ? 'Angebot gesendet!' :
              language === 'es' ? '¡Presupuesto enviado!' :
              'Quote sent!',
        description: language === 'pl' ? 'Przekierowujemy Cię do WhatsApp...' :
                    language === 'de' ? 'Wir leiten Sie zu WhatsApp weiter...' :
                    language === 'es' ? 'Te redirigimos a WhatsApp...' :
                    'Redirecting you to WhatsApp...',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        fromAddress: '',
        toAddress: '',
        moveDate: '',
        moveType: '',
        rooms: '',
        distance: '',
        additionalServices: [],
        message: ''
      });
    } catch (error) {
      toast({
        title: language === 'pl' ? 'Błąd!' :
              language === 'de' ? 'Fehler!' :
              language === 'es' ? '¡Error!' :
              'Error!',
        description: language === 'pl' ? 'Nie udało się wysłać wyceny' :
                    language === 'de' ? 'Angebot konnte nicht gesendet werden' :
                    language === 'es' ? 'No se pudo enviar el presupuesto' :
                    'Failed to send quote',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPageTitle = () => {
    return language === 'pl' ? 'Bezpłatna Wycena Przeprowadzki' :
           language === 'de' ? 'Kostenloses Umzugsangebot' :
           language === 'es' ? 'Presupuesto Gratuito de Mudanza' :
           'Free Moving Quote';
  };

  const getPageSubtitle = () => {
    return language === 'pl' ? 'Otrzymaj bezpłatną wycenę przeprowadzki w ciągu 24 godzin' :
           language === 'de' ? 'Erhalten Sie ein kostenloses Umzugsangebot innerhalb von 24 Stunden' :
           language === 'es' ? 'Obtenga un presupuesto gratuito de mudanza en 24 horas' :
           'Get a free moving quote within 24 hours';
  };

  const getSEOData = () => {
    const seoData = {
      pl: {
        title: "Bezpłatna Wycena Przeprowadzki - Meister Umzüge 24 | Berlin i Wschodnie Niemcy",
        description: "Otrzymaj bezpłatną wycenę przeprowadzki w ciągu 24 godzin. Profesjonalne usługi przeprowadzkowe w Berlinie i wschodnich Niemczech. Szybka i dokładna wycena!",
        keywords: "wycena przeprowadzki, bezpłatna wycena, przeprowadzki Berlin, umzug preis, kostenlose angebot"
      },
      de: {
        title: "Kostenloses Umzugsangebot - Meister Umzüge 24 | Berlin und Ostdeutschland",
        description: "Erhalten Sie ein kostenloses Umzugsangebot innerhalb von 24 Stunden. Professionelle Umzugsdienste in Berlin und Ostdeutschland. Schnelle und genaue Preisberechnung!",
        keywords: "umzug preis, kostenlose angebot, umzug Berlin, moving quote, free estimate"
      },
      es: {
        title: "Presupuesto Gratuito de Mudanza - Meister Umzüge 24 | Berlín y Este de Alemania",
        description: "Obtenga un presupuesto gratuito de mudanza en 24 horas. Servicios profesionales de mudanza en Berlín y el este de Alemania. ¡Cálculo rápido y preciso!",
        keywords: "presupuesto mudanza, presupuesto gratuito, mudanzas Berlín, moving quote, free estimate"
      },
      en: {
        title: "Free Moving Quote - Meister Umzüge 24 | Berlin and Eastern Germany",
        description: "Get a free moving quote within 24 hours. Professional moving services in Berlin and Eastern Germany. Fast and accurate pricing!",
        keywords: "moving quote, free estimate, moving Berlin, umzug preis, kostenlose angebot"
      }
    };
    return seoData[language as keyof typeof seoData] || seoData.en;
  };

  const seoData = getSEOData();

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical="/angebot"
      />
      <ScrollToTop />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-moving-blue to-moving-darkblue text-white rounded-b-2xl p-6 md:p-8 lg:p-10 mb-8 md:mb-12 overflow-hidden relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 mb-4">
              <BadgePercent className="w-3 h-3" />
              <span className="text-xs font-medium">
                {language === 'pl' ? 'Bezpłatna wycena' :
                 language === 'de' ? 'Kostenlose Angebot' :
                 language === 'es' ? 'Presupuesto gratuito' :
                 'Free quote'}
              </span>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              {getPageTitle()}
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl opacity-90 mb-6 max-w-2xl mx-auto">
              {getPageSubtitle()}
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold mb-1">24h</div>
                <p className="text-xs opacity-80">
                  {language === 'pl' ? 'Szybka odpowiedź' :
                   language === 'de' ? 'Schnelle Antwort' :
                   language === 'es' ? 'Respuesta rápida' :
                   'Quick response'}
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold mb-1">100%</div>
                <p className="text-xs opacity-80">
                  {language === 'pl' ? 'Bezpieczeństwo' :
                   language === 'de' ? 'Sicherheit' :
                   language === 'es' ? 'Seguridad' :
                   'Security'}
                </p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center justify-center mb-2">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div className="text-xl font-bold mb-1">4.9</div>
                <p className="text-xs opacity-80">
                  {language === 'pl' ? 'Ocena klientów' :
                   language === 'de' ? 'Kundenbewertung' :
                   language === 'es' ? 'Valoración' :
                   'Rating'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-moving-blue/10 rounded-full mb-4">
  <Calculator className="w-8 h-8 text-moving-blue" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    {language === 'pl' ? 'Formularz Wyceny' :
                     language === 'de' ? 'Angebotsformular' :
                     language === 'es' ? 'Formulario de Presupuesto' :
                     'Quote Form'}
                  </h2>
                  <p className="text-gray-600 text-lg">
                    {language === 'pl' ? 'Wypełnij formularz, a my skontaktujemy się z Tobą w ciągu 24 godzin' :
                     language === 'de' ? 'Füllen Sie das Formular aus und wir kontaktieren Sie innerhalb von 24 Stunden' :
                     language === 'es' ? 'Complete el formulario y nos pondremos en contacto en 24 horas' :
                     'Fill out the form and we will contact you within 24 hours'}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'pl' ? 'Imię i nazwisko *' :
                         language === 'de' ? 'Vor- und Nachname *' :
                         language === 'es' ? 'Nombre completo *' :
                         'Full Name *'}
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder={language === 'pl' ? 'Jan Kowalski' :
                                     language === 'de' ? 'Max Mustermann' :
                                     language === 'es' ? 'Juan García' :
                                     'John Smith'}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {language === 'pl' ? 'Email *' :
                         language === 'de' ? 'E-Mail *' :
                         language === 'es' ? 'Correo electrónico *' :
                         'Email *'}
                      </label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="example@email.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'pl' ? 'Telefon' :
                       language === 'de' ? 'Telefon' :
                       language === 'es' ? 'Teléfono' :
                       'Phone'}
                    </label>
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+49 152 230 314 73"
                    />
                  </div>

                  {/* Address Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        {language === 'pl' ? 'Adres źródłowy' :
                         language === 'de' ? 'Quelladresse' :
                         language === 'es' ? 'Dirección de origen' :
                         'From Address'}
                      </label>
                      <Input
                        name="fromAddress"
                        value={formData.fromAddress}
                        onChange={handleInputChange}
                        placeholder={language === 'pl' ? 'Ulica, miasto, kod pocztowy' :
                                     language === 'de' ? 'Straße, Stadt, PLZ' :
                                     language === 'es' ? 'Calle, ciudad, código postal' :
                                     'Street, city, postal code'}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        {language === 'pl' ? 'Adres docelowy' :
                         language === 'de' ? 'Zieladresse' :
                         language === 'es' ? 'Dirección de destino' :
                         'To Address'}
                      </label>
                      <Input
                        name="toAddress"
                        value={formData.toAddress}
                        onChange={handleInputChange}
                        placeholder={language === 'pl' ? 'Ulica, miasto, kod pocztowy' :
                                     language === 'de' ? 'Straße, Stadt, PLZ' :
                                     language === 'es' ? 'Calle, ciudad, código postal' :
                                     'Street, city, postal code'}
                      />
                    </div>
                  </div>

                  {/* Move Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="w-4 h-4 inline mr-2" />
                        {language === 'pl' ? 'Data przeprowadzki' :
                         language === 'de' ? 'Umzugsdatum' :
                         language === 'es' ? 'Fecha de mudanza' :
                         'Move Date'}
                      </label>
                      <Input
                        name="moveDate"
                        type="date"
                        value={formData.moveDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Truck className="w-4 h-4 inline mr-2" />
                        {language === 'pl' ? 'Typ przeprowadzki' :
                         language === 'de' ? 'Umzugsart' :
                         language === 'es' ? 'Tipo de mudanza' :
                         'Move Type'}
                      </label>
                      <Select value={formData.moveType} onValueChange={(value) => handleSelectChange('moveType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'pl' ? 'Wybierz typ' :
                                                   language === 'de' ? 'Typ wählen' :
                                                   language === 'es' ? 'Seleccionar tipo' :
                                                   'Select type'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">
                            {language === 'pl' ? 'Przeprowadzka mieszkaniowa' :
                             language === 'de' ? 'Wohnungsumzug' :
                             language === 'es' ? 'Mudanza residencial' :
                             'Residential Move'}
                          </SelectItem>
                          <SelectItem value="commercial">
                            {language === 'pl' ? 'Przeprowadzka biurowa' :
                             language === 'de' ? 'Büroumzug' :
                             language === 'es' ? 'Mudanza comercial' :
                             'Commercial Move'}
                          </SelectItem>
                          <SelectItem value="international">
                            {language === 'pl' ? 'Przeprowadzka międzynarodowa' :
                             language === 'de' ? 'Internationaler Umzug' :
                             language === 'es' ? 'Mudanza internacional' :
                             'International Move'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Package className="w-4 h-4 inline mr-2" />
                        {language === 'pl' ? 'Liczba pokoi' :
                         language === 'de' ? 'Anzahl Zimmer' :
                         language === 'es' ? 'Número de habitaciones' :
                         'Number of Rooms'}
                      </label>
                      <Select value={formData.rooms} onValueChange={(value) => handleSelectChange('rooms', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'pl' ? 'Wybierz' :
                                                   language === 'de' ? 'Wählen' :
                                                   language === 'es' ? 'Seleccionar' :
                                                   'Select'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                          <SelectItem value="5+">5+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'pl' ? 'Odległość (km)' :
                       language === 'de' ? 'Entfernung (km)' :
                       language === 'es' ? 'Distancia (km)' :
                       'Distance (km)'}
                    </label>
                    <Input
                      name="distance"
                      value={formData.distance}
                      onChange={handleInputChange}
                      placeholder="50"
                      type="number"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {language === 'pl' ? 'Dodatkowe informacje *' :
                       language === 'de' ? 'Zusätzliche Informationen *' :
                       language === 'es' ? 'Información adicional *' :
                       'Additional Information *'}
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder={language === 'pl' ? 'Opisz szczegóły przeprowadzki, specjalne wymagania, itp.' :
                                   language === 'de' ? 'Beschreiben Sie die Umzugsdetails, besondere Anforderungen, usw.' :
                                   language === 'es' ? 'Describa los detalles de la mudanza, requisitos especiales, etc.' :
                                   'Describe moving details, special requirements, etc.'}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-moving-blue hover:bg-moving-darkblue text-white font-semibold py-3 px-8 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          {language === 'pl' ? 'Wysyłanie...' :
                           language === 'de' ? 'Senden...' :
                           language === 'es' ? 'Enviando...' :
                           'Sending...'}
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5 mr-2" />
                          {language === 'pl' ? 'Wyślij Wycenę' :
                           language === 'de' ? 'Angebot Senden' :
                           language === 'es' ? 'Enviar Presupuesto' :
                           'Send Quote'}
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default QuotePage; 