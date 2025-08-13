
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const Contact: React.FC = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    moveDate: '',
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


      const whatsappMessage = `
Meister Umzüge 24 - Nowa wiadomość

Dane kontaktowe:
Imię: ${formData.name}
Email: ${formData.email}
Telefon: ${formData.phone || 'Nie podano'}

Szczegóły przeprowadzki:
Data: ${formData.moveDate || 'Nie podano'}
Typ: ${formData.moveType || 'Nie podano'}

Wiadomość:
${formData.message}

---
Wysłane ze strony: meisterumzuege24.de
      `.trim();

      const whatsappUrl = `https://wa.me/4915223031473?text=${encodeURIComponent(whatsappMessage)}&lang=${language}`;
      
      // Google Ads conversion tracking
      if (typeof window.gtag !== 'undefined') {
        window.gtag('event', 'conversion', {
          'send_to': 'AW-17470976934/DHe6CMjz44UbEKbn54pB',
          'value': 1.0,
          'currency': 'PLN'
        });
      }
      
      // Otwórz WhatsApp po opóźnieniu
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);

      toast({
        title: language === 'pl' ? 'Wiadomość wysłana!' :
              language === 'de' ? 'Nachricht gesendet!' :
              language === 'es' ? '¡Mensaje enviado!' :
              'Message sent!',
        description: language === 'pl' ? 'Przekierowujemy Cię do WhatsApp...' :
                    language === 'de' ? 'Wir leiten Sie zu WhatsApp weiter...' :
                    language === 'es' ? 'Te redirigimos a WhatsApp...' :
                    'Redirecting you to WhatsApp...',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        moveDate: '',
        moveType: '',
        message: ''
      });
    } catch (error) {
      toast({
        title: language === 'pl' ? 'Błąd!' :
              language === 'de' ? 'Fehler!' :
              language === 'es' ? '¡Error!' :
              'Error!',
        description: language === 'pl' ? 'Nie udało się wysłać wiadomości' :
                    language === 'de' ? 'Nachricht konnte nicht gesendet werden' :
                    language === 'es' ? 'No se pudo enviar el mensaje' :
                    'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding" role="main" aria-labelledby="contact-heading">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <header className="mb-8">
              <h2 id="contact-heading" className="sr-only">{t('contact.title')}</h2>
              <h3 className="section-title text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-4">{t('contact.subtitle')}</h3>
              <p className="text-gray-700 mb-8">
                {t('contact.description')}
              </p>
            </header>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-moving-lightblue p-3 rounded-lg mr-4">
                  <Phone className="w-6 h-6 text-moving-blue" />
                </div>
                <div className="text-left">
                  <p className="text-gray-700 font-bold text-lg">MP Transporte <span className="text-moving-blue">und Umzüge</span></p>
                  <a 
                    href="tel:+4915223031473"
                    className="text-gray-700 hover:text-moving-blue transition-colors cursor-pointer text-lg"
                    aria-label="Zadzwoń do nas: +49 152 230 314 73"
                  >
                    +49 152 230 314 73
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-moving-lightblue p-3 rounded-lg mr-4">
                  <Mail className="w-6 h-6 text-moving-blue" />
                </div>
                <div className="text-left">
                  <p className="text-gray-700 font-bold text-lg">Email</p>
                  <a 
                    href="mailto:info@meisterumzuege24.de"
                    className="text-gray-700 hover:text-moving-blue transition-colors cursor-pointer text-lg font-medium"
                    aria-label="Napisz do nas: info@meisterumzuege24.de"
                  >
                    info@meisterumzuege24.de
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-moving-lightblue p-3 rounded-lg mr-4">
                  <MapPin className="w-6 h-6 text-moving-blue" />
                </div>
                <div className="text-left">
                  <p className="text-gray-700 font-bold text-lg">Adres</p>
                  <a 
                    href="https://maps.google.com/?q=Kolonnenstr.+8,+10827+Berlin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-moving-blue transition-colors cursor-pointer text-lg"
                    aria-label="Zobacz nasz adres na mapie: Kolonnenstr. 8, 10827 Berlin"
                  >
                    Kolonnenstr. 8, 10827 Berlin
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-moving-lightblue p-3 rounded-lg mr-4">
                  <Clock className="w-6 h-6 text-moving-blue" />
                </div>
                <div className="text-left">
                  <p className="text-gray-700 font-bold text-lg">Godziny pracy</p>
                  <p className="text-gray-700 text-lg">{t('contact.hoursWeekdays')}</p>
                  <p className="text-gray-700 text-lg">{t('contact.hoursSaturday')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-6">
              <h4 className="text-xl font-semibold text-moving-dark mb-6">{t('contact.formTitle')}</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.nameLabel')} *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('contact.namePlaceholder')}
                    className={errors.name ? 'border-red-500' : ''}
                    required
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">{errors.name}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.emailLabel')} *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('contact.emailPlaceholder')}
                    className={errors.email ? 'border-red-500' : ''}
                    required
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">{errors.email}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">{t('contact.phoneLabel')}</label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t('contact.phonePlaceholder')}
                    className={errors.phone ? 'border-red-500' : ''}
                    aria-describedby={errors.phone ? 'phone-error' : undefined}
                  />
                  {errors.phone && (
                    <p id="phone-error" className="text-red-500 text-sm mt-1" role="alert">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <label htmlFor="move-date" className="block mb-2 text-sm font-medium text-gray-700">{t('contact.dateLabel')}</label>
                  <Input
                    id="move-date"
                    name="moveDate"
                    type="date"
                    value={formData.moveDate}
                    onChange={handleInputChange}
                    className={errors.moveDate ? 'border-red-500' : ''}
                    aria-describedby={errors.moveDate ? 'date-error' : undefined}
                  />
                  {errors.moveDate && (
                    <p id="date-error" className="text-red-500 text-sm mt-1" role="alert">{errors.moveDate}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="move-type" className="block mb-2 text-sm font-medium text-gray-700">{t('contact.moveTypeLabel')}</label>
                <Select value={formData.moveType} onValueChange={(value) => handleSelectChange('moveType', value)}>
                  <SelectTrigger 
                    id="move-type" 
                    className={errors.moveType ? 'border-red-500' : ''}
                    aria-describedby={errors.moveType ? 'move-type-error' : undefined}
                  >
                    <SelectValue placeholder={t('contact.moveTypePlaceholder')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">{t('contact.moveTypeResidential')}</SelectItem>
                    <SelectItem value="commercial">{t('contact.moveTypeCommercial')}</SelectItem>
                    <SelectItem value="international">{t('contact.moveTypeInternational')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.moveType && (
                  <p id="move-type-error" className="text-red-500 text-sm mt-1" role="alert">{errors.moveType}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  {t('contact.messageLabel')} *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={t('contact.messagePlaceholder')}
                  rows={4}
                  className={errors.message ? 'border-red-500' : ''}
                  required
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">{errors.message}</p>
                )}
              </div>
              
              <Button 
                type="submit"
                className="w-full bg-moving-blue hover:bg-moving-darkblue text-white font-semibold py-3 px-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-moving-blue focus:ring-offset-2"
                disabled={isSubmitting}
                aria-label={isSubmitting ? 'Wysyłanie wiadomości...' : 'Wyślij wiadomość'}
              >
                {isSubmitting ? (
                  <>
                    <Send className="w-5 h-5 mr-2 animate-spin" />
                    {language === 'pl' ? 'Wysyłanie...' :
                     language === 'de' ? 'Senden...' :
                     language === 'es' ? 'Enviando...' :
                     'Sending...'}
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    {t('contact.submitButton')}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
