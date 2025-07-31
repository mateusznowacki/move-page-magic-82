import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: prev.additionalServices.includes(service)
        ? prev.additionalServices.filter(s => s !== service)
        : [...prev.additionalServices, service]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Podstawowa walidacja
    if (!formData.name || !formData.email || !formData.fromAddress || !formData.toAddress) {
      toast({
        title: "Błąd",
        description: "Proszę wypełnić wszystkie wymagane pola (imię, email, adresy)",
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

    setIsSubmitting(true);

    try {
      // Tłumaczenia typów przeprowadzek
      const moveTypeTranslations: { [key: string]: string } = {
        'Residential Moving': 'Przeprowadzka mieszkaniowa',
        'Commercial Moving': 'Przeprowadzka komercyjna',
        'Long Distance Moving': 'Przeprowadzka na duże odległości',
        'International Moving': 'Przeprowadzka międzynarodowa',
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
      const moveDateText = formData.moveDate ? `\nData przeprowadzki: ${formData.moveDate}` : '';
      const phoneText = formData.phone ? `\nTelefon: ${formData.phone}` : '';
      const roomsText = formData.rooms ? `\nLiczba pokoi: ${formData.rooms}` : '';
      const distanceText = formData.distance ? `\nDystans: ${formData.distance}` : '';
      const servicesText = formData.additionalServices.length > 0 ? `\nDodatkowe usługi: ${formData.additionalServices.join(', ')}` : '';
      
      const emailSubject = `Zapytanie o wycenę przeprowadzki - ${formData.name}`;
      const emailBody = `Nowe zapytanie o wycenę przeprowadzki

Dane kontaktowe:
Imię: ${formData.name}
Email: ${formData.email}${phoneText}

Adresy:
Z: ${formData.fromAddress}
Do: ${formData.toAddress}

Szczegóły przeprowadzki:
Typ: ${translatedMoveType}${moveDateText}${roomsText}${distanceText}${servicesText}

Dodatkowe informacje:
${formData.message || 'Brak dodatkowych informacji'}

---
Zapytanie o wycenę ze strony internetowej`;

      // Otwórz domyślną aplikację email
      const mailtoUrl = `mailto:info@meisterumzuege24.de?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailtoUrl);
      
      toast({
        title: "Sukces!",
        description: "Otwieram aplikację email z gotową wiadomością. Możesz ją wysłać lub edytować.",
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
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 pb-12">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center justify-center bg-moving-lightblue p-3 rounded-full mb-4">
              <Calculator className="h-8 w-8 text-moving-blue" />
            </div>
            <h1 className="text-4xl font-bold text-moving-dark mb-4">{getPageTitle()}</h1>
            <p className="text-gray-600 text-lg">
              {getPageSubtitle()}
            </p>
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
                  Imię i nazwisko *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Jan Kowalski"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="jan@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefon
              </label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+49 123 456 789"
              />
            </div>

            {/* Adresy */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres źródłowy *
                </label>
                <Input
                  name="fromAddress"
                  value={formData.fromAddress}
                  onChange={handleInputChange}
                  placeholder="Ulica, miasto, kod pocztowy"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres docelowy *
                </label>
                <Input
                  name="toAddress"
                  value={formData.toAddress}
                  onChange={handleInputChange}
                  placeholder="Ulica, miasto, kod pocztowy"
                  required
                />
              </div>
            </div>

            {/* Szczegóły przeprowadzki */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Typ przeprowadzki
                </label>
                <Select value={formData.moveType} onValueChange={(value) => handleSelectChange('moveType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz typ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Residential Moving">Przeprowadzka mieszkaniowa</SelectItem>
                    <SelectItem value="Commercial Moving">Przeprowadzka komercyjna</SelectItem>
                    <SelectItem value="Long Distance Moving">Przeprowadzka na duże odległości</SelectItem>
                    <SelectItem value="International Moving">Przeprowadzka międzynarodowa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data przeprowadzki
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
                  Liczba pokoi
                </label>
                <Select value={formData.rooms} onValueChange={(value) => handleSelectChange('rooms', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 pokój</SelectItem>
                    <SelectItem value="2">2 pokoje</SelectItem>
                    <SelectItem value="3">3 pokoje</SelectItem>
                    <SelectItem value="4">4 pokoje</SelectItem>
                    <SelectItem value="5+">5+ pokoi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dodatkowe usługi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Dodatkowe usługi
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Pakowanie',
                  'Rozpakowywanie',
                  'Montaż mebli',
                  'Montaż lamp',
                  'Montaż luster',
                  'Malowanie ścian',
                  'Czyszczenie',
                  'Przechowywanie'
                ].map((service) => (
                  <label key={service} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.additionalServices.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="rounded border-gray-300 text-moving-blue focus:ring-moving-blue"
                    />
                    <span className="text-sm text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Dodatkowe informacje */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dodatkowe informacje
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Opisz szczegóły przeprowadzki, specjalne wymagania, itp."
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              className="btn-primary w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Otwieram aplikację email...' : 'Wyślij zapytanie o wycenę przez email'}
            </Button>
          </form>
        </div>
      </div>

      <Footer />
      <WhatsAppButton phoneNumber="4915223031473" />
      <ScrollToTop />
    </div>
  );
};

export default QuotePage; 