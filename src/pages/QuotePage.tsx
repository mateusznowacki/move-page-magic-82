import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import ScrollToTop from '@/components/ScrollToTop';
import { Calculator, MapPin, Calendar, Package, Truck } from 'lucide-react';

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

    // Walidacja adresu źródłowego
    if (!formData.fromAddress.trim()) {
      newErrors.fromAddress = language === 'pl' ? 'Adres źródłowy jest wymagany' :
                             language === 'de' ? 'Aktuelle Adresse ist erforderlich' :
                             language === 'es' ? 'La dirección de origen es requerida' :
                             'From address is required';
    } else if (formData.fromAddress.trim().length < 5) {
      newErrors.fromAddress = language === 'pl' ? 'Adres musi być bardziej szczegółowy' :
                             language === 'de' ? 'Adresse muss detaillierter sein' :
                             language === 'es' ? 'La dirección debe ser más detallada' :
                             'Address must be more detailed';
    }

    // Walidacja adresu docelowego
    if (!formData.toAddress.trim()) {
      newErrors.toAddress = language === 'pl' ? 'Adres docelowy jest wymagany' :
                           language === 'de' ? 'Zieladresse ist erforderlich' :
                           language === 'es' ? 'La dirección de destino es requerida' :
                           'To address is required';
    } else if (formData.toAddress.trim().length < 5) {
      newErrors.toAddress = language === 'pl' ? 'Adres musi być bardziej szczegółowy' :
                           language === 'de' ? 'Adresse muss detaillierter sein' :
                           language === 'es' ? 'La dirección debe ser más detallada' :
                           'Address must be more detailed';
    }

    // Walidacja typu przeprowadzki
    if (!formData.moveType) {
      newErrors.moveType = language === 'pl' ? 'Typ przeprowadzki jest wymagany' :
                          language === 'de' ? 'Umzugstyp ist erforderlich' :
                          language === 'es' ? 'El tipo de mudanza es requerido' :
                          'Moving type is required';
    }

    // Walidacja daty (jeśli podana)
    if (formData.moveDate) {
      const selectedDate = new Date(formData.moveDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.moveDate = language === 'pl' ? 'Data nie może być w przeszłości' :
                            language === 'de' ? 'Datum kann nicht in der Vergangenheit liegen' :
                            language === 'es' ? 'La fecha no puede estar en el pasado' :
                            'Date cannot be in the past';
      }
    }

    // Walidacja telefonu (jeśli podany)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\+]?[0-9\s\-\(\)]{7,}$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = language === 'pl' ? 'Nieprawidłowy format telefonu' :
                         language === 'de' ? 'Ungültiges Telefonformat' :
                         language === 'es' ? 'Formato de teléfono inválido' :
                         'Invalid phone format';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: language === 'pl' ? "Błąd walidacji" : language === 'de' ? "Validierungsfehler" : language === 'es' ? "Error de validación" : "Validation Error",
        description: language === 'pl' ? "Proszę poprawić błędy w formularzu" :
                   language === 'de' ? "Bitte korrigieren Sie die Fehler im Formular" :
                   language === 'es' ? "Por favor corrija los errores en el formulario" :
                   "Please correct the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Tłumaczenia typów przeprowadzek
      const moveTypeTranslations: { [key: string]: { [key: string]: string } } = {
        'Residential Moving': {
          pl: 'Przeprowadzka mieszkaniowa',
          de: 'Wohnungsumzug',
          es: 'Mudanza residencial',
          en: 'Residential Moving'
        },
        'Commercial Moving': {
          pl: 'Przeprowadzka komercyjna',
          de: 'Geschäftsumzug',
          es: 'Mudanza comercial',
          en: 'Commercial Moving'
        },
        'Long Distance Moving': {
          pl: 'Przeprowadzka na duże odległości',
          de: 'Fernumzug',
          es: 'Mudanza de larga distancia',
          en: 'Long Distance Moving'
        },
        'International Moving': {
          pl: 'Przeprowadzka międzynarodowa',
          de: 'Internationale Umzüge',
          es: 'Mudanza internacional',
          en: 'International Moving'
        }
      };

      const translatedMoveType = moveTypeTranslations[formData.moveType]?.[language] || formData.moveType;
      

      
      // Tłumaczenia dla wiadomości WhatsApp
      const translations = {
        pl: {
          subject: `Zapytanie o wycenę przeprowadzki - ${formData.name}`,
          title: 'Nowe zapytanie o wycenę przeprowadzki',
          contactInfo: 'Dane kontaktowe:',
          name: 'Imię:',
          email: 'Email:',
          phone: 'Telefon:',
          addresses: 'Adresy:',
          from: 'Z:',
          to: 'Do:',
          details: 'Szczegóły przeprowadzki:',
          type: 'Typ:',
          date: 'Data przeprowadzki:',
          rooms: 'Liczba pokoi:',
          distance: 'Dystans:',
          services: 'Dodatkowe usługi:',
          additionalInfo: 'Dodatkowe informacje:',
          noInfo: 'Brak dodatkowych informacji',
          footer: 'Zapytanie o wycenę ze strony internetowej',
          success: 'Otwieram aplikację z gotową wiadomością. Możesz ją wysłać lub edytować.',
          error: 'Wystąpił problem z otwieraniem aplikacji. Spróbuj ponownie.'
        },
        de: {
          subject: `Umzugsangebot anfordern - ${formData.name}`,
          title: 'Neue Umzugsangebot-Anfrage',
          contactInfo: 'Kontaktdaten:',
          name: 'Name:',
          email: 'E-Mail:',
          phone: 'Telefon:',
          addresses: 'Adressen:',
          from: 'Von:',
          to: 'Nach:',
          details: 'Umzugsdetails:',
          type: 'Typ:',
          date: 'Umzugsdatum:',
          rooms: 'Anzahl Zimmer:',
          distance: 'Entfernung:',
          services: 'Zusätzliche Dienstleistungen:',
          additionalInfo: 'Zusätzliche Informationen:',
          noInfo: 'Keine zusätzlichen Informationen',
          footer: 'Umzugsangebot-Anfrage von der Website',
          success: 'Öffne Anwendung mit vorbereiteter Nachricht. Sie können sie senden oder bearbeiten.',
          error: 'Problem beim Öffnen der Anwendung. Versuchen Sie es erneut.'
        },
        es: {
          subject: `Solicitud de cotización de mudanza - ${formData.name}`,
          title: 'Nueva solicitud de cotización de mudanza',
          contactInfo: 'Información de contacto:',
          name: 'Nombre:',
          email: 'Email:',
          phone: 'Teléfono:',
          addresses: 'Direcciones:',
          from: 'Desde:',
          to: 'Hasta:',
          details: 'Detalles de la mudanza:',
          type: 'Tipo:',
          date: 'Fecha de mudanza:',
          rooms: 'Número de habitaciones:',
          distance: 'Distancia:',
          services: 'Servicios adicionales:',
          additionalInfo: 'Información adicional:',
          noInfo: 'Sin información adicional',
          footer: 'Solicitud de cotización de mudanza desde el sitio web',
          success: 'Abriendo aplicación con mensaje preparado. Puede enviarlo o editarlo.',
          error: 'Problema al abrir la aplicación. Inténtelo de nuevo.'
        },
        en: {
          subject: `Moving Quote Request - ${formData.name}`,
          title: 'New Moving Quote Request',
          contactInfo: 'Contact Information:',
          name: 'Name:',
          email: 'Email:',
          phone: 'Phone:',
          addresses: 'Addresses:',
          from: 'From:',
          to: 'To:',
          details: 'Moving Details:',
          type: 'Type:',
          date: 'Move Date:',
          rooms: 'Number of Rooms:',
          distance: 'Distance:',
          services: 'Additional Services:',
          additionalInfo: 'Additional Information:',
          noInfo: 'No additional information',
          footer: 'Moving quote request from website',
          success: 'Opening application with prepared message. You can send or edit it.',
          error: 'Problem opening application. Please try again.'
        }
      };

      const t = translations[language as keyof typeof translations] || translations.en;
      
      // Konstruuj wiadomość WhatsApp
      const moveDateText = formData.moveDate ? `\n${t.date} ${formData.moveDate}` : '';
      const phoneText = formData.phone ? `\n${t.phone} ${formData.phone}` : '';
      const roomsText = formData.rooms ? `\n${t.rooms} ${formData.rooms}` : '';
      const distanceText = formData.distance ? `\n${t.distance} ${formData.distance}` : '';
      const servicesText = formData.additionalServices.length > 0 ? `\n${t.services} ${formData.additionalServices.join(', ')}` : '';
      
      const whatsappMessage = `${t.title}

${t.contactInfo}
${t.name} ${formData.name}
${t.email} ${formData.email}${phoneText}

${t.addresses}
${t.from} ${formData.fromAddress}
${t.to} ${formData.toAddress}

${t.details}
${t.type} ${translatedMoveType}${moveDateText}${roomsText}${distanceText}${servicesText}

${t.additionalInfo}
${formData.message || t.noInfo}

---
${t.footer}`;

      // Otwórz WhatsApp z odpowiednim językiem
      const whatsappUrl = `https://wa.me/4915223031473?text=${encodeURIComponent(whatsappMessage)}&lang=${language}`;
      window.open(whatsappUrl);
      
      toast({
        title: language === 'pl' ? "Sukces!" : language === 'de' ? "Erfolg!" : language === 'es' ? "¡Éxito!" : "Success!",
        description: language === 'pl' ? 'Otwieram aplikację z gotową wiadomością. Możesz ją wysłać lub edytować.' :
                   language === 'de' ? 'Öffne Anwendung mit vorbereiteter Nachricht. Sie können sie senden oder bearbeiten.' :
                   language === 'es' ? 'Abriendo aplicación con mensaje preparado. Puede enviarlo o editarlo.' :
                   'Opening application with prepared message. You can send or edit it.',
      });

      // Resetowanie formularza
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
      
      // Resetowanie błędów
      setErrors({});

    } catch (error) {
      console.error('Błąd wysyłania:', error);
      toast({
        title: language === 'pl' ? "Błąd" : language === 'de' ? "Fehler" : language === 'es' ? "Error" : "Error",
        description: language === 'pl' ? "Wystąpił problem z otwieraniem aplikacji. Spróbuj ponownie." :
                   language === 'de' ? "Problem beim Öffnen der Anwendung. Versuchen Sie es erneut." :
                   language === 'es' ? "Problema al abrir la aplicación. Inténtelo de nuevo." :
                   "Problem opening application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPageTitle = () => {
    switch (language) {
      case 'pl': return 'Wycena przeprowadzki';
      case 'de': return 'Umzugskosten berechnen';
      case 'es': return 'Cotización de mudanza';
      default: return 'Moving Quote';
    }
  };

  const getPageSubtitle = () => {
    switch (language) {
      case 'pl': return 'Otrzymaj bezpłatną wycenę przeprowadzki';
      case 'de': return 'Erhalten Sie ein kostenloses Umzugsangebot';
      case 'es': return 'Obtenga una cotización gratuita de mudanza';
      default: return 'Get a free moving quote';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-24 pb-12">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-moving-blue to-moving-darkblue text-white py-12 mb-12">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Calculator className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === 'pl' ? 'Bezpłatna wycena' :
                 language === 'de' ? 'Kostenloses Angebot' :
                 language === 'es' ? 'Presupuesto gratuito' :
                 'Free Quote'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {getPageTitle()}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              {getPageSubtitle()}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-xl font-bold mb-1">24/7</div>
                <div className="text-sm text-white/80">
                  {language === 'pl' ? 'Wsparcie' :
                   language === 'de' ? 'Support' :
                   language === 'es' ? 'Soporte' :
                   'Support'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-xl font-bold mb-1">100%</div>
                <div className="text-sm text-white/80">
                  {language === 'pl' ? 'Bezpłatnie' :
                   language === 'de' ? 'Kostenlos' :
                   language === 'es' ? 'Gratis' :
                   'Free'}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <div className="text-xl font-bold mb-1">10+</div>
                <div className="text-sm text-white/80">
                  {language === 'pl' ? 'Lat doświadczenia' :
                   language === 'de' ? 'Jahre Erfahrung' :
                   language === 'es' ? 'Años de experiencia' :
                   'Years Experience'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Podstawowe informacje */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'pl' ? 'Imię i nazwisko *' : 
                     language === 'de' ? 'Name *' : 
                     language === 'es' ? 'Nombre y apellido *' : 
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
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'pl' ? 'Email *' : 
                     language === 'de' ? 'E-Mail *' : 
                     language === 'es' ? 'Email *' : 
                     'Email *'}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={language === 'pl' ? 'jan@example.com' : 
                                language === 'de' ? 'max@example.com' : 
                                language === 'es' ? 'juan@example.com' : 
                                'john@example.com'}
                    className={errors.email ? 'border-red-500' : ''}
                    required
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
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+49 123 456 789"
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Adresy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'pl' ? 'Adres źródłowy *' : 
                     language === 'de' ? 'Aktuelle Adresse *' : 
                     language === 'es' ? 'Dirección de origen *' : 
                     'From Address *'}
                  </label>
                  <Input
                    name="fromAddress"
                    value={formData.fromAddress}
                    onChange={handleInputChange}
                    placeholder={language === 'pl' ? 'Ulica, miasto, kod pocztowy' : 
                                language === 'de' ? 'Straße, Stadt, PLZ' : 
                                language === 'es' ? 'Calle, ciudad, código postal' : 
                                'Street, city, postal code'}
                    className={errors.fromAddress ? 'border-red-500' : ''}
                    required
                  />
                  {errors.fromAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.fromAddress}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'pl' ? 'Adres docelowy *' : 
                     language === 'de' ? 'Zieladresse *' : 
                     language === 'es' ? 'Dirección de destino *' : 
                     'To Address *'}
                  </label>
                  <Input
                    name="toAddress"
                    value={formData.toAddress}
                    onChange={handleInputChange}
                    placeholder={language === 'pl' ? 'Ulica, miasto, kod pocztowy' : 
                                language === 'de' ? 'Straße, Stadt, PLZ' : 
                                language === 'es' ? 'Calle, ciudad, código postal' : 
                                'Street, city, postal code'}
                    className={errors.toAddress ? 'border-red-500' : ''}
                    required
                  />
                  {errors.toAddress && (
                    <p className="text-red-500 text-sm mt-1">{errors.toAddress}</p>
                  )}
                </div>
              </div>

              {/* Szczegóły przeprowadzki */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'pl' ? 'Typ przeprowadzki' : 
                     language === 'de' ? 'Umzugstyp' : 
                     language === 'es' ? 'Tipo de mudanza' : 
                     'Moving Type'}
                  </label>
                  <Select value={formData.moveType} onValueChange={(value) => handleSelectChange('moveType', value)}>
                    <SelectTrigger className={errors.moveType ? 'border-red-500' : ''}>
                      <SelectValue placeholder={language === 'pl' ? 'Wybierz typ' : 
                                              language === 'de' ? 'Typ wählen' : 
                                              language === 'es' ? 'Seleccionar tipo' : 
                                              'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential Moving">
                        {language === 'pl' ? 'Przeprowadzka mieszkaniowa' : 
                         language === 'de' ? 'Wohnungsumzug' : 
                         language === 'es' ? 'Mudanza residencial' : 
                         'Residential Moving'}
                      </SelectItem>
                      <SelectItem value="Commercial Moving">
                        {language === 'pl' ? 'Przeprowadzka komercyjna' : 
                         language === 'de' ? 'Geschäftsumzug' : 
                         language === 'es' ? 'Mudanza comercial' : 
                         'Commercial Moving'}
                      </SelectItem>
                      <SelectItem value="Long Distance Moving">
                        {language === 'pl' ? 'Przeprowadzka na duże odległości' : 
                         language === 'de' ? 'Fernumzug' : 
                         language === 'es' ? 'Mudanza de larga distancia' : 
                         'Long Distance Moving'}
                      </SelectItem>
                      <SelectItem value="International Moving">
                        {language === 'pl' ? 'Przeprowadzka międzynarodowa' : 
                         language === 'de' ? 'Internationale Umzüge' : 
                         language === 'es' ? 'Mudanza internacional' : 
                         'International Moving'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.moveType && (
                    <p className="text-red-500 text-sm mt-1">{errors.moveType}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                    className={errors.moveDate ? 'border-red-500' : ''}
                  />
                  {errors.moveDate && (
                    <p className="text-red-500 text-sm mt-1">{errors.moveDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
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
                      <SelectItem value="1">
                        {language === 'pl' ? '1 pokój' : 
                         language === 'de' ? '1 Zimmer' : 
                         language === 'es' ? '1 habitación' : 
                         '1 room'}
                      </SelectItem>
                      <SelectItem value="2">
                        {language === 'pl' ? '2 pokoje' : 
                         language === 'de' ? '2 Zimmer' : 
                         language === 'es' ? '2 habitaciones' : 
                         '2 rooms'}
                      </SelectItem>
                      <SelectItem value="3">
                        {language === 'pl' ? '3 pokoje' : 
                         language === 'de' ? '3 Zimmer' : 
                         language === 'es' ? '3 habitaciones' : 
                         '3 rooms'}
                      </SelectItem>
                      <SelectItem value="4">
                        {language === 'pl' ? '4 pokoje' : 
                         language === 'de' ? '4 Zimmer' : 
                         language === 'es' ? '4 habitaciones' : 
                         '4 rooms'}
                      </SelectItem>
                      <SelectItem value="5+">
                        {language === 'pl' ? '5+ pokoi' : 
                         language === 'de' ? '5+ Zimmer' : 
                         language === 'es' ? '5+ habitaciones' : 
                         '5+ rooms'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Dodatkowe informacje */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {language === 'pl' ? 'Dodatkowe informacje' : 
                   language === 'de' ? 'Zusätzliche Informationen' : 
                   language === 'es' ? 'Información adicional' : 
                   'Additional Information'}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={language === 'pl' ? 'Opisz szczegóły przeprowadzki, specjalne wymagania, itp.' : 
                              language === 'de' ? 'Beschreiben Sie Umzugsdetails, besondere Anforderungen, usw.' : 
                              language === 'es' ? 'Describa los detalles de la mudanza, requisitos especiales, etc.' : 
                              'Describe moving details, special requirements, etc.'}
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="btn-primary w-full" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 
                  (language === 'pl' ? 'Wysyłam...' : 
                   language === 'de' ? 'Sende...' : 
                   language === 'es' ? 'Enviando...' : 
                   'Sending...') : 
                  (language === 'pl' ? 'Wyślij zapytanie o wycenę' : 
                   language === 'de' ? 'Angebot anfordern' : 
                   language === 'es' ? 'Solicitar cotización' : 
                   'Send quote request')}
              </Button>
            </form>
          </div>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default QuotePage; 