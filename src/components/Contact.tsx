
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Building } from 'lucide-react';

const Contact: React.FC = () => {
  const { t } = useLanguage();
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Podstawowa walidacja
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Błąd",
        description: "Proszę wypełnić wszystkie wymagane pola (imię, email, wiadomość)",
        variant: "destructive",
      });
      return;
    }

    // Walidacja email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Błąd",
        description: "Proszę podać prawidłowy adres email",
        variant: "destructive",
      });
      return;
    }

    // Walidacja telefonu (jeśli podano) - format europejski
    if (formData.phone) {
      const phoneRegex = /^(\+?[1-9]\d{1,3}[\s\-]?)?(\d{2,4}[\s\-]?){2,4}\d{2,4}$/;
      if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        toast({
          title: "Błąd",
          description: "Proszę podać prawidłowy numer telefonu (format europejski)",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // Tłumaczenia typów przeprowadzek
      const moveTypeTranslations: { [key: string]: string } = {
        'Residential Moving': 'Przeprowadzka mieszkaniowa',
        'Commercial Moving': 'Przeprowadzka komercyjna',
        'Long Distance Moving': 'Przeprowadzka na duże odległości',
        'International Moving': 'Przeprowadzka międzynarodowa',
        'Przeprowadzka mieszkaniowa': 'Przeprowadzka mieszkaniowa',
        'Przeprowadzka komercyjna': 'Przeprowadzka komercyjna',
        'Przeprowadzka na duże odległości': 'Przeprowadzka na duże odległości',
        'Przeprowadzka międzynarodowa': 'Przeprowadzka międzynarodowa',
        'Wohnungsumzug': 'Wohnungsumzug',
        'Geschäftsumzug': 'Geschäftsumzug',
        'Fernumzug': 'Fernumzug',
        'Internationale Umzüge': 'Internationale Umzüge',
        'Mudanza residencial': 'Mudanza residencial',
        'Mudanza comercial': 'Mudanza comercial',
        'Mudanza de larga distancia': 'Mudanza de larga distancia',
        'Mudanza internacional': 'Mudanza internacional'
      };

      const translatedMoveType = moveTypeTranslations[formData.moveType] || formData.moveType;
      
      // Konstruuj wiadomość email
      const moveTypeText = formData.moveType ? `\n${t('contact.moveTypeField')}: ${translatedMoveType}` : '';
      const moveDateText = formData.moveDate ? `\n${t('contact.moveDateField')}: ${formData.moveDate}` : '';
      const phoneText = formData.phone ? `\n${t('contact.phoneField')}: ${formData.phone}` : '';
      
      const emailSubject = `Nowe zapytanie o przeprowadzkę - ${formData.name}`;
      const emailBody = `Nowe zapytanie o przeprowadzkę

Dane kontaktowe:
Imię: ${formData.name}
Email: ${formData.email}${phoneText}${moveDateText}${moveTypeText}

Wiadomość:
${formData.message}

---
Wiadomość wysłana ze strony internetowej`;

      // Przygotuj wiadomość WhatsApp w odpowiednim języku
      const whatsappMessage = `${t('contact.whatsappTitle')}

${t('contact.contactInfo')}:
${t('contact.name')}: ${formData.name}
Email: ${formData.email}${phoneText}${moveDateText}${moveTypeText}

${t('contact.messageField')}:
${formData.message}

---
${t('contact.sentFromWebsite')}`;

      // Otwórz WhatsApp
      const whatsappUrl = `https://wa.me/4915223031473?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Sukces!",
        description: "Otwieram WhatsApp z gotową wiadomością. Możesz ją wysłać lub edytować.",
      });

      // Resetowanie formularza
      setFormData({
        name: '',
        email: '',
        phone: '',
        moveDate: '',
        moveType: '',
        message: ''
      });

    } catch (error) {
      console.error('Błąd wysyłania:', error);
      toast({
        title: "Błąd",
        description: "Wystąpił problem z otwieraniem aplikacji email. Spróbuj ponownie.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="sr-only">{t('contact.title')}</h2>
            <h3 className="section-title">{t('contact.subtitle')}</h3>
            <p className="text-gray-600 mb-8">
              {t('contact.description')}
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-moving-lightblue p-4 rounded-xl mr-5">
                  <Building className="w-7 h-7 text-moving-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark text-lg mb-2">Firma</h4>
                  <p className="text-gray-700 font-bold text-lg">MP Transporte <span className="text-moving-blue">und Umzüge</span></p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-moving-lightblue p-4 rounded-xl mr-5">
                  <MapPin className="w-7 h-7 text-moving-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark text-lg mb-2">{t('contact.location')}</h4>
                  <a 
                    href="https://maps.google.com/?q=Kolonnenstr.+8,+10827+Berlin" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-moving-blue transition-colors cursor-pointer text-lg"
                  >
                    Kolonnenstr. 8<br />10827 Berlin
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-moving-lightblue p-4 rounded-xl mr-5">
                  <Phone className="w-7 h-7 text-moving-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark text-lg mb-2">{t('contact.phone')}</h4>
                  <a 
                    href="tel:+4915223031473" 
                    className="text-gray-700 hover:text-moving-blue transition-colors cursor-pointer text-lg font-medium"
                  >
                    +49 1522 3031473
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-moving-lightblue p-4 rounded-xl mr-5">
                  <Mail className="w-7 h-7 text-moving-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark text-lg mb-2">{t('contact.email')}</h4>
                  <a 
                    href="mailto:mptransporte24@web.de" 
                    className="text-gray-700 hover:text-moving-blue transition-colors cursor-pointer text-lg"
                  >
                    mptransporte24@web.de
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-moving-lightblue p-4 rounded-xl mr-5">
                  <Clock className="w-7 h-7 text-moving-blue" />
                </div>
                <div>
                  <h4 className="font-semibold text-moving-dark text-lg mb-2">{t('contact.hours')}</h4>
                  <p className="text-gray-700 text-lg">{t('contact.hoursWeekdays')}</p>
                  <p className="text-gray-700 text-lg">{t('contact.hoursSaturday')}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100">
            <h3 className="text-2xl font-semibold mb-8 text-moving-dark">{t('contact.formTitle')}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.nameLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moving-blue focus:border-transparent transition-colors"
                    placeholder={t('contact.namePlaceholder')}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                    {t('contact.emailLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moving-blue focus:border-transparent transition-colors"
                    placeholder={t('contact.emailPlaceholder')}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-700">{t('contact.phoneLabel')}</label>
                  <input 
                    type="tel" 
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moving-blue focus:border-transparent transition-colors"
                    placeholder={t('contact.phonePlaceholder')}
                  />
                </div>
                <div>
                  <label htmlFor="move-date" className="block mb-2 text-sm font-medium text-gray-700">{t('contact.dateLabel')}</label>
                  <input 
                    type="date" 
                    id="move-date"
                    name="moveDate"
                    value={formData.moveDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moving-blue focus:border-transparent transition-colors"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="move-type" className="block mb-2 text-sm font-medium text-gray-700">{t('contact.moveTypeLabel')}</label>
                <select 
                  id="move-type"
                  name="moveType"
                  value={formData.moveType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moving-blue focus:border-transparent transition-colors"
                >
                  <option value="">{t('contact.moveTypePlaceholder')}</option>
                  <option value="residential">{t('contact.moveTypeResidential')}</option>
                  <option value="commercial">{t('contact.moveTypeCommercial')}</option>
                  <option value="long-distance">{t('contact.moveTypeLongDistance')}</option>
                  <option value="international">{t('contact.moveTypeInternational')}</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-700">
                  {t('contact.messageLabel')} <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-moving-blue focus:border-transparent transition-colors"
                  placeholder={t('contact.messagePlaceholder')}
                  required
                ></textarea>
              </div>
              
              <Button 
                type="submit" 
                className="btn-primary w-full py-4 text-lg font-semibold" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Wysyłam wiadomość...' : t('contact.submitButton')}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
