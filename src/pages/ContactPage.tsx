import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import SEOHead from '../components/SEOHead';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle,
  Send,
  Building,
  Globe
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const { toast } = useToast();

  const getSEOData = () => {
    const seoData = {
      pl: {
        title: "Kontakt - Meister Umzüge 24 | Profesjonalne Usługi Przeprowadzkowe",
        description: "Skontaktuj się z nami w sprawie profesjonalnych usług przeprowadzkowych w Berlinie i wschodnich Niemczech. Bezpłatna wycena i wsparcie 24/7.",
        keywords: "kontakt przeprowadzki, wycena przeprowadzki, usługi przeprowadzkowe Berlin, przeprowadzki wschodnie Niemcy"
      },
      de: {
        title: "Kontakt - Meister Umzüge 24 | Professionelle Umzugsdienste",
        description: "Kontaktieren Sie uns für professionelle Umzugsdienste in Berlin und Ostdeutschland. Kostenloses Angebot und 24/7 Support.",
        keywords: "Umzug Kontakt, Umzugsangebot, Umzugsdienste Berlin, Umzug Ostdeutschland"
      },
      es: {
        title: "Contacto - Meister Umzüge 24 | Servicios Profesionales de Mudanza",
        description: "Contáctenos para servicios profesionales de mudanza en Berlín y el este de Alemania. Presupuesto gratuito y soporte 24/7.",
        keywords: "contacto mudanza, presupuesto mudanza, servicios mudanza Berlín, mudanza este Alemania"
      },
      en: {
        title: "Contact - Meister Umzüge 24 | Professional Moving Services",
        description: "Contact us for professional moving services in Berlin and Eastern Germany. Free quote and 24/7 support.",
        keywords: "moving contact, moving quote, moving services Berlin, moving Eastern Germany"
      }
    };
    return seoData[language as keyof typeof seoData] || seoData.en;
  };

  const seoData = getSEOData();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    moveType: '',
    message: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = language === 'pl' ? 'Imię jest wymagane' :
                      language === 'de' ? 'Name ist erforderlich' :
                      language === 'es' ? 'El nombre es requerido' :
                      'Name is required';
    }

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

    if (!formData.message.trim()) {
      newErrors.message = language === 'pl' ? 'Wiadomość jest wymagana' :
                         language === 'de' ? 'Nachricht ist erforderlich' :
                         language === 'es' ? 'El mensaje es requerido' :
                         'Message is required';
    }

    // Phone validation (if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^[+]?[0-9\s\-()]{7,}$/;
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
      const translations = {
        pl: {
          title: 'Nowe zapytanie kontaktowe',
          contactInfo: 'Dane kontaktowe:',
          name: 'Imię:',
          email: 'Email:',
          phone: 'Telefon:',
          moveType: 'Typ przeprowadzki:',
          message: 'Wiadomość:',
          footer: 'Zapytanie kontaktowe ze strony internetowej'
        },
        de: {
          title: 'Neue Kontaktanfrage',
          contactInfo: 'Kontaktdaten:',
          name: 'Name:',
          email: 'E-Mail:',
          phone: 'Telefon:',
          moveType: 'Umzugstyp:',
          message: 'Nachricht:',
          footer: 'Kontaktanfrage von der Website'
        },
        es: {
          title: 'Nueva consulta de contacto',
          contactInfo: 'Información de contacto:',
          name: 'Nombre:',
          email: 'Email:',
          phone: 'Teléfono:',
          moveType: 'Tipo de mudanza:',
          message: 'Mensaje:',
          footer: 'Consulta de contacto desde el sitio web'
        },
        en: {
          title: 'New Contact Inquiry',
          contactInfo: 'Contact Information:',
          name: 'Name:',
          email: 'Email:',
          phone: 'Phone:',
          moveType: 'Moving Type:',
          message: 'Message:',
          footer: 'Contact inquiry from website'
        }
      };

      const t = translations[language as keyof typeof translations] || translations.en;
      
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
      const phoneText = formData.phone ? `\n${t.phone} ${formData.phone}` : '';
      const moveTypeText = formData.moveType ? `\n${t.moveType} ${translatedMoveType}` : '';

      const whatsappMessage = `${t.title}

${t.contactInfo}
${t.name} ${formData.name}
${t.email} ${formData.email}${phoneText}${moveTypeText}

${t.message}
${formData.message}

---
${t.footer}`;

      const whatsappUrl = `https://wa.me/4915223031473?text=${encodeURIComponent(whatsappMessage)}&lang=${language}`;
      window.open(whatsappUrl);
      
      toast({
        title: language === 'pl' ? "Sukces!" : language === 'de' ? "Erfolg!" : language === 'es' ? "¡Éxito!" : "Success!",
        description: language === 'pl' ? 'Otwieram aplikację z gotową wiadomością. Możesz ją wysłać lub edytować.' :
                   language === 'de' ? 'Öffne Anwendung mit vorbereiteter Nachricht. Sie können sie senden oder bearbeiten.' :
                   language === 'es' ? 'Abriendo aplicación con mensaje preparado. Puede enviarlo o editarlo.' :
                   'Opening application with prepared message. You can send or edit it.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        moveType: '',
        message: ''
      });
      
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

  return (
    <>
      <SEOHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical="/kontakt"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-moving-blue to-moving-darkblue text-white rounded-b-2xl p-8 md:p-12 lg:p-16 mb-12 md:mb-16 overflow-hidden relative">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === 'pl' ? 'Jesteśmy tutaj dla Ciebie' :
                 language === 'de' ? 'Wir sind für Sie da' :
                 language === 'es' ? 'Estamos aquí para usted' :
                 'We are here for you'}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              {language === 'pl' ? 'Kontakt' :
               language === 'de' ? 'Kontakt' :
               language === 'es' ? 'Contacto' :
               'Contact'}
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {language === 'pl' ? 'Skontaktuj się z nami, aby uzyskać bezpłatną wycenę i dowiedzieć się więcej o naszych usługach przeprowadzkowych.' :
               language === 'de' ? 'Kontaktieren Sie uns für ein kostenloses Angebot und erfahren Sie mehr über unsere Umzugsdienste.' :
               language === 'es' ? 'Contáctenos para obtener un presupuesto gratuito y conocer más sobre nuestros servicios de mudanza.' :
               'Contact us for a free quote and learn more about our moving services.'}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <Card className="shadow-lg p-8">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-moving-dark flex items-center gap-2">
                  <Send className="w-6 h-6 text-moving-blue" />
                  {language === 'pl' ? 'Wyślij wiadomość' :
                   language === 'de' ? 'Nachricht senden' :
                   language === 'es' ? 'Enviar mensaje' :
                   'Send Message'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">
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
                        className={`${errors.name ? 'border-red-500' : ''} h-12 text-base`}
                        required
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-base font-semibold text-gray-700 mb-3">
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
                        className={`${errors.email ? 'border-red-500' : ''} h-12 text-base`}
                        required
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                                              <label className="block text-base font-semibold text-gray-700 mb-3">
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
                          className={`${errors.phone ? 'border-red-500' : ''} h-12 text-base`}
                        />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                    <div>
                                              <label className="block text-base font-semibold text-gray-700 mb-3">
                          {language === 'pl' ? 'Typ przeprowadzki' : 
                           language === 'de' ? 'Umzugstyp' : 
                           language === 'es' ? 'Tipo de mudanza' : 
                           'Moving Type'}
                        </label>
                        <Select value={formData.moveType} onValueChange={(value) => handleSelectChange('moveType', value)}>
                          <SelectTrigger className={`${errors.moveType ? 'border-red-500' : ''} h-12 text-base`}>
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
                  </div>

                  <div>
                                          <label className="block text-base font-semibold text-gray-700 mb-3">
                        {language === 'pl' ? 'Wiadomość *' : 
                         language === 'de' ? 'Nachricht *' : 
                         language === 'es' ? 'Mensaje *' : 
                         'Message *'}
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder={language === 'pl' ? 'Opisz swoje potrzeby, zadaj pytania...' : 
                                    language === 'de' ? 'Beschreiben Sie Ihre Bedürfnisse, stellen Sie Fragen...' : 
                                    language === 'es' ? 'Describa sus necesidades, haga preguntas...' : 
                                    'Describe your needs, ask questions...'}
                        rows={6}
                        className={`${errors.message ? 'border-red-500' : ''} text-base`}
                        required
                      />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-moving-blue hover:bg-moving-darkblue text-white py-4 text-lg font-semibold"
                    disabled={isSubmitting}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 
                      (language === 'pl' ? 'Wysyłam...' : 
                       language === 'de' ? 'Sende...' : 
                       language === 'es' ? 'Enviando...' : 
                       'Sending...') : 
                      (language === 'pl' ? 'Wyślij wiadomość' : 
                       language === 'de' ? 'Nachricht senden' : 
                       language === 'es' ? 'Enviar mensaje' : 
                       'Send Message')}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="shadow-lg p-6">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl font-bold text-moving-dark flex items-center gap-2">
                    <Building className="w-6 h-6 text-moving-blue" />
                    {language === 'pl' ? 'Informacje kontaktowe' :
                     language === 'de' ? 'Kontaktinformationen' :
                     language === 'es' ? 'Información de contacto' :
                     'Contact Information'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-left">
                  <div className="flex items-center gap-3 justify-start">
                    <div className="bg-moving-lightblue p-3 rounded-lg flex-shrink-0">
                      <Phone className="w-6 h-6 text-moving-blue" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-moving-dark">
                        {language === 'pl' ? 'Telefon' :
                         language === 'de' ? 'Telefon' :
                         language === 'es' ? 'Teléfono' :
                         'Phone'}
                      </p>
                      <p className="text-gray-600">+49 152 230 314 73</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-start">
                    <div className="bg-moving-lightblue p-3 rounded-lg flex-shrink-0">
                      <Mail className="w-6 h-6 text-moving-blue" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-moving-dark">
                        {language === 'pl' ? 'Email' :
                         language === 'de' ? 'E-Mail' :
                         language === 'es' ? 'Email' :
                         'Email'}
                      </p>
                      <p className="text-gray-600">info@meisterumzuege24.de</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 justify-start">
                    <div className="bg-moving-lightblue p-3 rounded-lg flex-shrink-0">
                      <Globe className="w-6 h-6 text-moving-blue" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-moving-dark">
                        {language === 'pl' ? 'Obszar działania' :
                         language === 'de' ? 'Tätigkeitsbereich' :
                         language === 'es' ? 'Área de servicio' :
                         'Service Area'}
                      </p>
                      <p className="text-gray-600">
                        {language === 'pl' ? 'Wschodnie Niemcy' :
                         language === 'de' ? 'Ostdeutschland' :
                         language === 'es' ? 'Este de Alemania' :
                         'Eastern Germany'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 justify-start">
                    <div className="bg-moving-lightblue p-3 rounded-lg flex-shrink-0">
                      <Clock className="w-6 h-6 text-moving-blue" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-moving-dark">
                        {language === 'pl' ? 'Godziny pracy' :
                         language === 'de' ? 'Arbeitszeiten' :
                         language === 'es' ? 'Horario de trabajo' :
                         'Working Hours'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === 'pl' ? 'Poniedziałek - Piątek: 8:00 - 18:00' :
                         language === 'de' ? 'Montag - Freitag: 8:00 - 18:00' :
                         language === 'es' ? 'Lunes - Viernes: 8:00 - 18:00' :
                         'Monday - Friday: 8:00 - 18:00'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {language === 'pl' ? 'Sobota: 9:00 - 15:00' :
                         language === 'de' ? 'Samstag: 9:00 - 15:00' :
                         language === 'es' ? 'Sábado: 9:00 - 15:00' :
                         'Saturday: 9:00 - 15:00'}
                      </p>
                      <p className="text-moving-blue font-semibold text-sm mt-1">
                        {language === 'pl' ? 'Wsparcie 24/7' :
                         language === 'de' ? '24/7 Support' :
                         language === 'es' ? 'Soporte 24/7' :
                         '24/7 Support'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-moving-dark flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-moving-blue" />
                    {language === 'pl' ? 'Obsługiwane landy' :
                     language === 'de' ? 'Bediente Bundesländer' :
                     language === 'es' ? 'Estados atendidos' :
                     'Served States'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-moving-lightblue p-4 rounded-lg text-center">
                      <p className="font-semibold text-moving-dark">Thüringen</p>
                    </div>
                    <div className="bg-moving-lightblue p-4 rounded-lg text-center">
                      <p className="font-semibold text-moving-dark">Sachsen</p>
                    </div>
                    <div className="bg-moving-lightblue p-4 rounded-lg text-center">
                      <p className="font-semibold text-moving-dark">Sachsen-Anhalt</p>
                    </div>
                    <div className="bg-moving-lightblue p-4 rounded-lg text-center">
                      <p className="font-semibold text-moving-dark">Brandenburg</p>
                    </div>
                    <div className="bg-moving-lightblue p-4 rounded-lg text-center">
                      <p className="font-semibold text-moving-dark">Mecklenburg-Vorpommern</p>
                    </div>
                    <div className="bg-moving-lightblue p-4 rounded-lg text-center">
                      <p className="font-semibold text-moving-dark">Berlin</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-12"></div>
    </>
  );
};

export default ContactPage; 