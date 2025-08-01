type TranslationKey = 
  | 'nav.home' | 'nav.about' | 'nav.services' | 'nav.contact' | 'nav.quote' | 'nav.testimonials' | 'nav.getQuote' | 'nav.areas' | 'nav.states'
  | 'hero.title' | 'hero.subtitle' | 'hero.years' | 'hero.yearsDesc' | 'hero.getQuote' | 'hero.learnMore' | 'hero.services' | 'hero.customers' | 'hero.customersDesc' | 'hero.support' | 'hero.supportDesc'
  | 'about.title' | 'about.subtitle' | 'about.description' | 'about.getStarted' | 'about.learnMore' | 'about.contactUs'
  | 'about.feature1.title' | 'about.feature1.description'
  | 'about.feature2.title' | 'about.feature2.description'
  | 'about.feature3.title' | 'about.feature3.description'
  | 'services.title' | 'services.subtitle' | 'services.description' | 'services.viewAll'
  | 'services.residential.title' | 'services.residential.description'
  | 'services.commercial.title' | 'services.commercial.description'
  | 'services.longDistance.title' | 'services.longDistance.description'
  | 'services.international.title' | 'services.international.description'
  | 'services.packing.title' | 'services.packing.description'
  | 'services.assembly.title' | 'services.assembly.description'
  | 'services.storage.title' | 'services.storage.description'
  | 'testimonials.title' | 'testimonials.subtitle' | 'testimonials.description' | 'testimonials.ready' | 'testimonials.getInTouch' | 'testimonials.getFreeQuote' | 'testimonials.trustedUs' | 'testimonials.professional'
  | 'contact.title' | 'contact.subtitle' | 'contact.description' | 'contact.location' | 'contact.locationAddress' | 'contact.phone' | 'contact.email' | 'contact.hours' | 'contact.hoursWeekdays' | 'contact.hoursSaturday' | 'contact.formTitle'
  | 'contact.nameLabel' | 'contact.namePlaceholder' | 'contact.emailLabel' | 'contact.emailPlaceholder' | 'contact.phoneLabel' | 'contact.phonePlaceholder'
  | 'contact.dateLabel' | 'contact.moveTypeLabel' | 'contact.moveTypePlaceholder' | 'contact.moveTypeResidential' | 'contact.moveTypeCommercial' | 'contact.moveTypeLongDistance' | 'contact.moveTypeInternational'
  | 'contact.messageLabel' | 'contact.messagePlaceholder' | 'contact.submitButton'
  | 'contact.whatsappTitle' | 'contact.contactInfo' | 'contact.nameField' | 'contact.phoneField' | 'contact.name'
  | 'contact.moveDateField' | 'contact.moveTypeField' | 'contact.messageField' | 'contact.sentFromWebsite'

  | 'footer.description' | 'footer.servicesTitle' | 'footer.residentialMoving' | 'footer.commercialMoving' | 'footer.packingUnpacking'
  | 'footer.longDistanceMoving' | 'footer.internationalMoving' | 'footer.storageSolutions' | 'footer.quickLinksTitle' | 'footer.home' | 'footer.aboutUs' | 'footer.services' | 'footer.testimonials' | 'footer.contactUs'
  | 'footer.promotionTitle' | 'footer.discount' | 'footer.promotionDescription' | 'footer.promotionTerms' | 'footer.copyright' | 'footer.allRightsReserved'
  | 'footer.privacyPolicy' | 'footer.termsOfService' | 'footer.cookiePolicy'
  | 'footer.quickLinks' | 'footer.legal' | 'footer.rights';

type Translations = {
  [key in TranslationKey]: {
    en: string;
    pl: string;
    de: string;
    es: string;
  };
};

export const translations: Translations = {
  'hero.title': {
    en: 'Professional Moving Services for Your Peace of Mind',
    pl: 'Profesjonalne usługi przeprowadzkowe dla Twojego spokoju ducha',
    de: 'Professionelle Umzugsdienste für Ihre Seelenruhe',
    es: 'Servicios profesionales de mudanza para su tranquilidad'
  },
  'hero.subtitle': {
    en: 'We make your relocation stress-free with our experienced team and customized moving solutions.',
    pl: 'Sprawiamy, że przeprowadzka jest wolna od stresu dzięki naszemu doświadczonemu zespołowi i spersonalizowanym rozwiązaniom.',
    de: 'Wir machen Ihren Umzug stressfrei mit unserem erfahrenen Team und individuellen Umzugslösungen.',
    es: 'Hacemos que su reubicación sea libre de estrés con nuestro equipo experimentado y soluciones de mudanza personalizadas.'
  },
  'hero.getQuote': {
    en: 'Get Free Quote',
    pl: 'Uzyskaj darmową wycenę',
    de: 'Kostenloses Angebot erhalten',
    es: 'Obtener presupuesto gratis'
  },
  'hero.services': {
    en: 'Our Services',
    pl: 'Nasze Usługi',
    de: 'Unsere Dienstleistungen',
    es: 'Nuestros Servicios'
  },
  'hero.years': {
    en: '10+',
    pl: '10+',
    de: '10+',
    es: '10+'
  },
  'hero.yearsDesc': {
    en: 'Years of Experience',
    pl: 'Lat doświadczenia',
    de: 'Jahre Erfahrung',
    es: 'Años de experiencia'
  },
  'hero.customers': {
    en: '5K+',
    pl: '5K+',
    de: '5K+',
    es: '5K+'
  },
  'hero.customersDesc': {
    en: 'Satisfied Customers',
    pl: 'Zadowolonych klientów',
    de: 'Zufriedene Kunden',
    es: 'Clientes satisfechos'
  },
  'hero.support': {
    en: '24/7',
    pl: '24/7',
    de: '24/7',
    es: '24/7'
  },
  'hero.supportDesc': {
    en: 'Customer Support',
    pl: 'Obsługa klienta',
    de: 'Kundendienst',
    es: 'Atención al cliente'
  },
  'hero.learnMore': {
    en: 'Learn More',
    pl: 'Dowiedz się więcej',
    de: 'Mehr erfahren',
    es: 'Saber más'
  },
  'nav.home': {
    en: 'Home',
    pl: 'Strona główna',
    de: 'Startseite',
    es: 'Inicio'
  },
  'nav.services': {
    en: 'Services',
    pl: 'Usługi',
    de: 'Dienstleistungen',
    es: 'Servicios'
  },
  'nav.about': {
    en: 'About Us',
    pl: 'O nas',
    de: 'Über uns',
    es: 'Sobre nosotros'
  },
  'nav.testimonials': {
    en: 'Testimonials',
    pl: 'Opinie',
    de: 'Referenzen',
    es: 'Testimonios'
  },
  'nav.contact': {
    en: 'Contact',
    pl: 'Kontakt',
    de: 'Kontakt',
    es: 'Contacto'
  },
  'nav.getQuote': {
    en: 'Get a Quote',
    pl: 'Wycena',
    de: 'Angebot einholen',
    es: 'Obtener presupuesto'
  },
  'nav.areas': {
    en: 'Areas',
    pl: 'Obszary',
    de: 'Gebiete',
    es: 'Áreas'
  },
  'nav.states': {
    en: 'Cities',
    pl: 'Miasta',
    de: 'Städte',
    es: 'Ciudades'
  },


  'nav.quote': {
    en: 'Get a Quote',
    pl: 'Wycena',
    de: 'Angebot einholen',
    es: 'Obtener presupuesto'
  },
  'services.title': {
    en: 'Professional Moving Services',
    pl: 'Profesjonalne usługi przeprowadzkowe',
    de: 'Professionelle Umzugsdienste',
    es: 'Servicios Profesionales de Mudanza'
  },
  'services.subtitle': {
    en: 'Complete Moving Solutions for Home and Business',
    pl: 'Kompletne rozwiązania przeprowadzkowe dla domu i firmy',
    de: 'Vollständige Umzugslösungen für Zuhause und Unternehmen',
    es: 'Soluciones completas de mudanza para hogar y empresa'
  },
  'services.description': {
    en: 'Professional moving services in Germany with 10+ years of experience. Residential and commercial relocations, packing, furniture assembly, and international moves throughout the EU.',
    pl: 'Profesjonalne usługi przeprowadzkowe w Niemczech z 10+ latami doświadczenia. Przeprowadzki mieszkaniowe i komercyjne, pakowanie, montaż mebli i przeprowadzki międzynarodowe w całej UE.',
    de: 'Professionelle Umzugsdienste in Deutschland mit über 10 Jahren Erfahrung. Wohnungs- und Geschäftsumzüge, Verpackung, Möbelmontage und internationale Umzüge in der gesamten EU.',
    es: 'Servicios profesionales de mudanza en Alemania con más de 10 años de experiencia. Mudanzas residenciales y comerciales, empaquetado, montaje de muebles y mudanzas internacionales en toda la UE.'
  },
  'services.viewAll': {
    en: 'View All Services',
    pl: 'Zobacz wszystkie usługi',
    de: 'Alle Dienstleistungen anzeigen',
    es: 'Ver todos los servicios'
  },
  'services.residential.title': {
    en: 'Residential Moving',
    pl: 'Przeprowadzki mieszkaniowe',
    de: 'Wohnungsumzug',
    es: 'Mudanzas residenciales'
  },
  'services.residential.description': {
    en: 'Professional moving services for homes and apartments of all sizes.',
    pl: 'Profesjonalne usługi przeprowadzkowe dla domów i mieszkań każdej wielkości.',
    de: 'Professionelle Umzugsdienste für Häuser und Wohnungen aller Größen.',
    es: 'Servicios profesionales de mudanza para hogares y apartamentos de todos los tamaños.'
  },
  'services.commercial.title': {
    en: 'Commercial Moving',
    pl: 'Przeprowadzki komercyjne',
    de: 'Geschäftsumzug',
    es: 'Mudanzas comerciales'
  },
  'services.commercial.description': {
    en: 'Efficient office and business relocation services with minimal downtime.',
    pl: 'Efektywne usługi relokacji biur i firm z minimalnymi przestojami.',
    de: 'Effiziente Büro- und Geschäftsumzugsdienste mit minimalen Ausfallzeiten.',
    es: 'Servicios eficientes de reubicación de oficinas y negocios con tiempo de inactividad mínimo.'
  },
  'services.longDistance.title': {
    en: 'Long Distance Moving',
    pl: 'Przeprowadzki na duże odległości',
    de: 'Fernumzug',
    es: 'Mudanzas de larga distancia'
  },
  'services.longDistance.description': {
    en: 'Reliable cross-country moving services with careful planning and execution.',
    pl: 'Niezawodne usługi przeprowadzkowe na duże odległości z dokładnym planowaniem i wykonaniem.',
    de: 'Zuverlässige Fernumzugsdienste mit sorgfältiger Planung und Durchführung.',
    es: 'Servicios confiables de mudanza de larga distancia con planificación cuidadosa y ejecución.'
  },
  'services.international.title': {
    en: 'International Moving',
    pl: 'Przeprowadzki międzynarodowe',
    de: 'Internationale Umzüge',
    es: 'Mudanzas internacionales'
  },
  'services.international.description': {
    en: 'Professional moving services across all EU countries with customs handling.',
    pl: 'Profesjonalne usługi przeprowadzkowe na terenie całej UE z obsługą celną.',
    de: 'Professionelle Umzugsdienste in allen EU-Ländern mit Zollabwicklung.',
    es: 'Servicios profesionales de mudanza en todos los países de la UE con gestión aduanera.'
  },
  'services.packing.title': {
    en: 'Packing & Unpacking',
    pl: 'Pakowanie i rozpakowywanie',
    de: 'Verpackung & Auspackung',
    es: 'Embalaje y desempaquetado'
  },
  'services.packing.description': {
    en: 'Professional packing and unpacking services to protect your valuable belongings.',
    pl: 'Profesjonalne usługi pakowania i rozpakowywania, aby chronić Twoje cenne rzeczy.',
    de: 'Professionelle Verpackungs- und Auspackungsdienste zum Schutz Ihrer wertvollen Gegenstände.',
    es: 'Servicios profesionales de embalaje y desempaquetado para proteger sus pertenencias valiosas.'
  },
  'services.assembly.title': {
    en: 'Furniture Assembly',
    pl: 'Montaż mebli',
    de: 'Möbelmontage',
    es: 'Ensamblaje de muebles'
  },
  'services.assembly.description': {
    en: 'Expert furniture disassembly and reassembly to make your move seamless.',
    pl: 'Ekspercki demontaż i montaż mebli, aby przeprowadzka była bezproblemowa.',
    de: 'Experten-Demontage und -Montage von Möbeln für einen nahtlosen Umzug.',
    es: 'Desmontaje y montaje experto de muebles para hacer su mudanza sin problemas.'
  },
  'services.storage.title': {
    en: 'Storage Solutions',
    pl: 'Rozwiązania magazynowe',
    de: 'Lagerungslösungen',
    es: 'Soluciones de almacenamiento'
  },
  'services.storage.description': {
    en: 'Secure storage options for short-term and long-term needs during your move.',
    pl: 'Bezpieczne opcje przechowywania na krótki i długi termin podczas przeprowadzki.',
    de: 'Sichere Lagerungsoptionen für kurz- und langfristige Bedürfnisse während Ihres Umzugs.',
    es: 'Opciones de almacenamiento seguras para necesidades a corto y largo plazo durante su mudanza.'
  },
  'about.title': {
    en: 'Why Choose Us',
    pl: 'Dlaczego my',
    de: 'Warum uns wählen',
    es: 'Por qué elegirnos'
  },
  'about.subtitle': {
    en: 'Making Your Move Easy and Stress-Free',
    pl: 'Ułatwiamy przeprowadzkę i eliminujemy stres',
    de: 'Wir machen Ihren Umzug einfach und stressfrei',
    es: 'Haciendo su mudanza fácil y libre de estrés'
  },
  'about.description': {
    en: 'With over 10 years of experience in the moving industry, we have built a reputation for reliability, efficiency, and exceptional customer service. Our team of professionals is committed to ensuring a smooth transition to your new location.',
    pl: 'Z ponad 10-letnim doświadczeniem w branży przeprowadzkowej, zbudowaliśmy reputację niezawodności, efektywności i wyjątkowej obsługi klienta. Nasz zespół profesjonalistów dokłada wszelkich starań, aby zapewnić płynne przejście do nowej lokalizacji.',
    de: 'Mit über 10 Jahren Erfahrung in der Umzugsbranche haben wir uns einen Ruf für Zuverlässigkeit, Effizienz und außergewöhnlichen Kundenservice aufgebaut. Unser Team aus Fachleuten ist bestrebt, einen reibungslosen Übergang zu Ihrem neuen Standort zu gewährleisten.',
    es: 'Con más de 10 años de experiencia en la industria de mudanzas, hemos construido una reputación de confiabilidad, eficiencia y servicio al cliente excepcional. Nuestro equipo de profesionales está comprometido a garantizar una transición sin problemas a su nueva ubicación.'
  },
  'about.getStarted': {
    en: 'Get Quote',
    pl: 'Wycena',
    de: 'Angebot',
    es: 'Presupuesto'
  },
  'about.contactUs': {
    en: 'Contact Us',
    pl: 'Kontakt',
    de: 'Kontaktiere uns',
    es: 'Contáctenos'
  },
  'about.learnMore': {
    en: 'Learn More',
    pl: 'Dowiedz się więcej',
    de: 'Mehr erfahren',
    es: 'Saber más'
  },
  'about.feature1.title': {
    en: 'Reliable & Safe',
    pl: 'Niezawodne i bezpieczne',
    de: 'Zuverlässig & Sicher',
    es: 'Fiable y seguro'
  },
  'about.feature1.description': {
    en: 'Our experienced team ensures your belongings are handled with care and transported safely to your new location.',
    pl: 'Nasz doświadczony zespół zapewnia, że Twoje rzeczy są przetrzymywane z dokładnością i bezpiecznie przewiezione do nowej lokalizacji.',
    de: 'Unser erfahrenes Team sorgt dafür, dass Ihre Sachen mit Sorgfalt und Sicherheit zu Ihrem neuen Standort transportiert werden.',
    es: 'Nuestro equipo experimentado asegura que sus pertenencias se manejen con cuidado y se transporten de forma segura a su nueva ubicación.'
  },
  'about.feature2.title': {
    en: 'Customized Solutions',
    pl: 'Rozwiązania spersonalizowane',
    de: 'Individuelle Lösungen',
    es: 'Soluciones personalizadas'
  },
  'about.feature2.description': {
    en: 'We offer flexible and customized moving solutions to meet your specific needs and budget.',
    pl: 'Oferujemy elastyczne i spersonalizowane rozwiązania przeprowadzkowe, które spełniają Twoje konkretne potrzeby i budżet.',
    de: 'Wir bieten flexible und individuelle Umzugslösungen, die Ihren spezifischen Bedürfnissen und Budget entsprechen.',
    es: 'Ofrecemos soluciones de mudanza flexibles y personalizadas que se adaptan a sus necesidades específicas y presupuesto.'
  },
  'about.feature3.title': {
    en: '24/7 Customer Support',
    pl: 'Obsługa klienta 24/7',
    de: 'Kundendienst 24/7',
    es: 'Atención al cliente 24/7'
  },
  'about.feature3.description': {
    en: 'Our dedicated support team is available 24/7 to assist you with any questions or concerns you may have.',
    pl: 'Nasza dedykowana obsługa klienta jest dostępna 24/7, aby pomóc Ci z każdym pytaniem lub problemem, który możesz mieć.',
    de: 'Unser dediziertes Support-Team ist rund um die Uhr für Sie da, um Ihnen bei allen Fragen oder Bedenken zu helfen, die Sie haben könnten.',
    es: 'Nuestro equipo de soporte dedicado está disponible las 24 horas del día, 7 días a la semana, para ayudarte con cualquier pregunta o inquietud que puedas tener.'
  },
  'testimonials.title': {
    en: 'Client Testimonials',
    pl: 'Opinie klientów',
    de: 'Kundenbewertungen',
    es: 'Testimonios de clientes'
  },
  'testimonials.subtitle': {
    en: 'What Our Customers Say',
    pl: 'Co mówią nasi klienci',
    de: 'Was unsere Kunden sagen',
    es: 'Lo que dicen nuestros clientes'
  },
  'testimonials.description': {
    en: "Don't just take our word for it. Here's what our satisfied customers have to say about our moving services.",
    pl: 'Nie wierz nam na słowo. Oto co nasi zadowoleni klienci mówią o naszych usługach przeprowadzkowych.',
    de: 'Nehmen Sie nicht nur unser Wort dafür. Hier ist, was unsere zufriedenen Kunden über unsere Umzugsdienste zu sagen haben.',
    es: 'No tome solo nuestra palabra. Esto es lo que nuestros clientes satisfechos tienen que decir sobre nuestros servicios de mudanza.'
  },
  'testimonials.ready': {
    en: 'Ready to experience our moving services?',
    pl: 'Gotowy, aby skorzystać z naszych usług przeprowadzkowych?',
    de: 'Bereit, unsere Umzugsdienste zu erleben?',
    es: '¿Listo para experimentar nuestros servicios de mudanza?'
  },
  'testimonials.getInTouch': {
    en: 'Get in touch today for a free, no-obligation quote.',
    pl: 'Skontaktuj się z nami już dziś, aby uzyskać bezpłatną wycenę bez zobowiązań.',
    de: 'Kontaktieren Sie uns noch heute für ein kostenloses, unverbindliches Angebot.',
    es: 'Póngase en contacto hoy para obtener un presupuesto gratuito sin compromiso.'
  },
  'testimonials.getFreeQuote': {
    en: 'Get a Free Quote',
    pl: 'Uzyskaj darmową wycenę',
    de: 'Kostenloses Angebot erhalten',
    es: 'Obtener presupuesto gratis'
  },
  'testimonials.trustedUs': {
    en: 'Trusted Us',
    pl: 'Zaufało nam',
    de: 'Vertrauten uns',
    es: 'Confiaron en nosotros'
  },
  'testimonials.professional': {
    en: 'Professional During Work',
    pl: 'Profesjonalni podczas pracy',
    de: 'Professionell bei der Arbeit',
    es: 'Profesionales durante el trabajo'
  },
  'contact.title': {
    en: 'Contact Us',
    pl: 'Skontaktuj się z nami',
    de: 'Kontaktieren Sie uns',
    es: 'Contáctanos'
  },
  'contact.subtitle': {
    en: 'Get in Touch With Our Team',
    pl: 'Skontaktuj się z naszym zespołem',
    de: 'Kontaktieren Sie unser Team',
    es: 'Ponte en contacto con nuestro equipo'
  },
  'contact.description': {
    en: 'Have questions about our moving services? Need a quote for your upcoming move? Our team is ready to assist you with all your moving needs.',
    pl: 'Masz pytania dotyczące naszych usług przeprowadzkowych? Potrzebujesz wyceny dla nadchodzącej przeprowadzki? Nasz zespół jest gotowy, aby pomóc Ci ze wszystkimi potrzebami związanymi z przeprowadzką.',
    de: 'Haben Sie Fragen zu unseren Umzugsdiensten? Benötigen Sie ein Angebot für Ihren bevorstehenden Umzug? Unser Team ist bereit, Ihnen bei allen Ihren Umzugsbedürfnissen zu helfen.',
    es: '¿Tienes preguntas sobre nuestros servicios de mudanza? ¿Necesitas un presupuesto para tu próxima mudanza? Nuestro equipo está listo para ayudarte con todas tus necesidades de mudanza.'
  },
  'contact.location': {
    en: 'Our Location',
    pl: 'Nasza lokalizacja',
    de: 'Unser Standort',
    es: 'Nuestra ubicación'
  },
  'contact.locationAddress': {
    en: 'Kolonnenstr. 8, 10827 Berlin',
    pl: 'Kolonnenstr. 8, 10827 Berlin',
    de: 'Kolonnenstr. 8, 10827 Berlin',
    es: 'Kolonnenstr. 8, 10827 Berlin'
  },
  'contact.phone': {
    en: 'Phone Number',
    pl: 'Numer telefonu',
    de: 'Telefonnummer',
    es: 'Número de teléfono'
  },
  'contact.email': {
    en: 'Email Address',
    pl: 'Adres email',
    de: 'E-Mail-Adresse',
    es: 'Dirección de correo'
  },
  'contact.hours': {
    en: 'Working Hours',
    pl: 'Godziny pracy',
    de: 'Arbeitszeiten',
    es: 'Horario de trabajo'
  },
  'contact.hoursWeekdays': {
    en: 'Monday - Friday: 8:00 AM - 6:00 PM',
    pl: 'Poniedziałek - Piątek: 8:00 - 18:00',
    de: 'Montag - Freitag: 8:00 - 18:00',
    es: 'Lunes - Viernes: 8:00 - 18:00'
  },
  'contact.hoursSaturday': {
    en: 'Saturday: 9:00 AM - 4:00 PM',
    pl: 'Sobota: 9:00 - 16:00',
    de: 'Samstag: 9:00 - 16:00',
    es: 'Sábado: 9:00 - 16:00'
  },
  'contact.formTitle': {
    en: 'Request a Quote',
    pl: 'Poproś o wycenę',
    de: 'Angebot anfordern',
    es: 'Solicitar presupuesto'
  },
  'contact.nameLabel': {
    en: 'Your Name',
    pl: 'Twoje imię',
    de: 'Ihr Name',
    es: 'Tu nombre'
  },
  'contact.namePlaceholder': {
    en: 'John Doe',
    pl: 'Jan Kowalski',
    de: 'Max Mustermann',
    es: 'Juan Pérez'
  },
  'contact.emailLabel': {
    en: 'Email Address',
    pl: 'Adres email',
    de: 'E-Mail-Adresse',
    es: 'Dirección de correo'
  },
  'contact.emailPlaceholder': {
    en: 'john@example.com',
    pl: 'jan@przykład.pl',
    de: 'max@beispiel.de',
    es: 'juan@ejemplo.com'
  },
  'contact.phoneLabel': {
    en: 'Phone Number',
    pl: 'Numer telefonu',
    de: 'Telefonnummer',
    es: 'Número de teléfono'
  },
  'contact.phonePlaceholder': {
    en: '(123) 456-7890',
    pl: '+49 123 456 789',
    de: '+49 123 456 789',
    es: '+34 123 456 789'
  },
  'contact.dateLabel': {
    en: 'Moving Date',
    pl: 'Data przeprowadzki',
    de: 'Umzugsdatum',
    es: 'Fecha de mudanza'
  },
  'contact.moveTypeLabel': {
    en: 'Moving Type',
    pl: 'Typ przeprowadzki',
    de: 'Umzugsart',
    es: 'Tipo de mudanza'
  },
  'contact.moveTypePlaceholder': {
    en: 'Select a moving type',
    pl: 'Wybierz typ przeprowadzki',
    de: 'Wählen Sie eine Umzugsart',
    es: 'Selecciona un tipo de mudanza'
  },
  'contact.moveTypeResidential': {
    en: 'Residential Moving',
    pl: 'Przeprowadzka mieszkaniowa',
    de: 'Wohnungsumzug',
    es: 'Mudanza residencial'
  },
  'contact.moveTypeCommercial': {
    en: 'Commercial Moving',
    pl: 'Przeprowadzka komercyjna',
    de: 'Geschäftsumzug',
    es: 'Mudanza comercial'
  },
  'contact.moveTypeLongDistance': {
    en: 'Long Distance Moving',
    pl: 'Przeprowadzka na duże odległości',
    de: 'Fernumzug',
    es: 'Mudanza de larga distancia'
  },
  'contact.moveTypeInternational': {
    en: 'International Moving',
    pl: 'Przeprowadzka międzynarodowa',
    de: 'Internationale Umzüge',
    es: 'Mudanza internacional'
  },
  'contact.messageLabel': {
    en: 'Additional Information',
    pl: 'Dodatkowe informacje',
    de: 'Zusätzliche Informationen',
    es: 'Información adicional'
  },
  'contact.messagePlaceholder': {
    en: 'Tell us more about your move...',
    pl: 'Opowiedz nam więcej o swojej przeprowadzce...',
    de: 'Erzählen Sie uns mehr über Ihren Umzug...',
    es: 'Cuéntanos más sobre tu mudanza...'
  },
  'contact.submitButton': {
    en: 'Submit Request',
    pl: 'Wyślij zapytanie',
    de: 'Anfrage senden',
    es: 'Enviar solicitud'
  },
  'contact.whatsappTitle': {
    en: 'New Moving Request',
    pl: 'Nowe zapytanie o przeprowadzkę',
    de: 'Neue Umzugsanfrage',
    es: 'Nueva solicitud de mudanza'
  },
  'contact.contactInfo': {
    en: 'Contact Information',
    pl: 'Dane kontaktowe',
    de: 'Kontaktinformationen',
    es: 'Información de contacto'
  },
  'contact.name': {
    en: 'Name',
    pl: 'Imię',
    de: 'Name',
    es: 'Nombre'
  },
  'contact.nameField': {
    en: 'Name',
    pl: 'Imię',
    de: 'Name',
    es: 'Nombre'
  },
  'contact.phoneField': {
    en: 'Phone',
    pl: 'Telefon',
    de: 'Telefon',
    es: 'Teléfono'
  },
  'contact.moveDateField': {
    en: 'Moving Date',
    pl: 'Data przeprowadzki',
    de: 'Umzugsdatum',
    es: 'Fecha de mudanza'
  },
  'contact.moveTypeField': {
    en: 'Moving Type',
    pl: 'Typ przeprowadzki',
    de: 'Umzugsart',
    es: 'Tipo de mudanza'
  },
  'contact.messageField': {
    en: 'Message',
    pl: 'Wiadomość',
    de: 'Nachricht',
    es: 'Mensaje'
  },
  'contact.sentFromWebsite': {
    en: 'Message sent from website',
    pl: 'Wiadomość wysłana ze strony internetowej',
    de: 'Nachricht von der Website gesendet',
    es: 'Mensaje enviado desde el sitio web'
  },
  'footer.description': {
    en: 'Professional moving services to make your relocation stress-free and efficient. We handle all types of moves with care and expertise.',
    pl: 'Profesjonalne usługi przeprowadzkowe, aby Twoja przeprowadzka była bezstresowa i efektywna. Zajmujemy się wszystkimi typami przeprowadzek z dbałością i fachowością.',
    de: 'Professionelle Umzugsdienste, um Ihren Umzug stressfrei und effizient zu gestalten. Wir kümmern uns um alle Arten von Umzügen mit Sorgfalt und Fachwissen.',
    es: 'Servicios profesionales de mudanza para hacer que su reubicación sea libre de estrés y eficiente. Manejamos todos los tipos de mudanzas con cuidado y experiencia.'
  },
  'footer.servicesTitle': {
    en: 'Services',
    pl: 'Usługi',
    de: 'Dienstleistungen',
    es: 'Servicios'
  },
  'footer.residentialMoving': {
    en: 'Residential Moving',
    pl: 'Przeprowadzki mieszkaniowe',
    de: 'Wohnungsumzug',
    es: 'Mudanzas residenciales'
  },
  'footer.commercialMoving': {
    en: 'Commercial Moving',
    pl: 'Przeprowadzki komercyjne',
    de: 'Geschäftsumzug',
    es: 'Mudanzas comerciales'
  },
  'footer.packingUnpacking': {
    en: 'Packing & Unpacking',
    pl: 'Pakowanie i rozpakowywanie',
    de: 'Ein- und Auspacken',
    es: 'Embalaje y desembalaje'
  },
  'footer.longDistanceMoving': {
    en: 'Long Distance Moving',
    pl: 'Przeprowadzki na duże odległości',
    de: 'Fernumzug',
    es: 'Mudanzas de larga distancia'
  },
  'footer.storageSolutions': {
    en: 'Storage Solutions',
    pl: 'Rozwiązania magazynowe',
    de: 'Lagerungslösungen',
    es: 'Soluciones de almacenamiento'
  },
  'footer.internationalMoving': {
    en: 'International Moving',
    pl: 'Przeprowadzki międzynarodowe',
    de: 'Internationale Umzüge',
    es: 'Mudanzas internacionales'
  },
  'footer.quickLinksTitle': {
    en: 'Quick Links',
    pl: 'Szybkie linki',
    de: 'Schnelle Links',
    es: 'Enlaces rápidos'
  },
  'footer.home': {
    en: 'Home',
    pl: 'Strona główna',
    de: 'Startseite',
    es: 'Inicio'
  },
  'footer.aboutUs': {
    en: 'About Us',
    pl: 'O nas',
    de: 'Über uns',
    es: 'Sobre nosotros'
  },
  'footer.services': {
    en: 'Services',
    pl: 'Usługi',
    de: 'Dienstleistungen',
    es: 'Servicios'
  },
  'footer.testimonials': {
    en: 'Testimonials',
    pl: 'Opinie',
    de: 'Referenzen',
    es: 'Testimonios'
  },
  'footer.contactUs': {
    en: 'Contact Us',
    pl: 'Kontakt',
    de: 'Kontakt',
    es: 'Contacto'
  },
  'footer.promotionTitle': {
    en: 'Special Offer',
    pl: 'Promocja',
    de: 'Sonderangebot',
    es: 'Oferta especial'
  },
  'footer.discount': {
    en: 'Discount',
    pl: 'Rabatu',
    de: 'Rabatt',
    es: 'Descuento'
  },
  'footer.promotionDescription': {
    en: 'Book your moving service online and get 10% discount on your first order!',
    pl: 'Zarezerwuj usługę przeprowadzkową online i otrzymaj 10% rabatu na pierwsze zamówienie!',
    de: 'Buchen Sie Ihren Umzugsservice online und erhalten Sie 10% Rabatt auf Ihre erste Bestellung!',
    es: '¡Reserve su servicio de mudanza en línea y obtenga un 10% de descuento en su primer pedido!'
  },
  'footer.promotionTerms': {
    en: 'Terms and conditions apply',
    pl: 'Obowiązują warunki i zasady',
    de: 'Geschäftsbedingungen gelten',
    es: 'Se aplican términos y condiciones'
  },
  'footer.copyright': {
    en: '© 2025 MP Transporte und Umzüge. All rights reserved.',
    pl: '© 2025 MP Transporte und Umzüge. Wszystkie prawa zastrzeżone.',
    de: '© 2025 MP Transporte und Umzüge. Alle Rechte vorbehalten.',
    es: '© 2025 MP Transporte und Umzüge. Todos los derechos reservados.'
  },
  'footer.allRightsReserved': {
    en: 'All rights reserved.',
    pl: 'Wszystkie prawa zastrzeżone.',
    de: 'Alle Rechte vorbehalten.',
    es: 'Todos los derechos reservados.'
  },
  'footer.privacyPolicy': {
    en: 'Privacy Policy',
    pl: 'Polityka prywatności',
    de: 'Datenschutzrichtlinie',
    es: 'Política de privacidad'
  },
  'footer.termsOfService': {
    en: 'Terms of Service',
    pl: 'Regulamin',
    de: 'Nutzungsbedingungen',
    es: 'Términos de servicio'
  },
  'footer.cookiePolicy': {
    en: 'Cookie Policy',
    pl: 'Polityka cookies',
    de: 'Cookie-Richtlinie',
    es: 'Política de cookies'
  },
  'footer.quickLinks': {
    en: 'Quick Links',
    pl: 'Szybkie linki',
    de: 'Schnelle Links',
    es: 'Enlaces rápidos'
  },
  'footer.legal': {
    en: 'Legal',
    pl: 'Prawo',
    de: 'Recht',
    es: 'Legal'
  },
  'footer.rights': {
    en: 'All rights reserved.',
    pl: 'Wszystkie prawa zastrzeżone.',
    de: 'Alle Rechte vorbehalten.',
    es: 'Todos los derechos reservados.'
  }
};

export const serviceTranslations = {
  en: [
    {
      id: 1,
      icon: "🏠",
      title: "Residential Moving",
      description: "Our residential moving services provide a stress-free relocation experience for homes of all sizes.",
    },
    {
      id: 2,
      icon: "🏢",
      title: "Commercial Moving",
      description: "Minimize downtime with our efficient office and business relocation services.",
    },
    {
      id: 3,
      icon: "📦",
      title: "Packing & Unpacking",
      description: "Professional packing and unpacking services to protect your valuable belongings.",
    },
    {
      id: 4,
      icon: "🚚",
      title: "Long Distance Moving",
      description: "Reliable cross-country moving services with careful planning and execution.",
    },
    {
      id: 5,
      icon: "🔒",
      title: "Storage Solutions",
      description: "Secure storage options for short-term and long-term needs during your move.",
    },
    {
      id: 6,
      icon: "🛋️",
      title: "Furniture Assembly",
      description: "Expert furniture disassembly and reassembly to make your move seamless.",
    },
    {
      id: 7,
      icon: "💡",
      title: "Lamp Installation",
      description: "Professional installation of lamps and lighting fixtures in your home or office.",
    },
    {
      id: 8,
      icon: "🪞",
      title: "Mirror Mounting",
      description: "Expert installation of mirrors and wall decorations for your interior.",
    },
    {
      id: 9,
      icon: "🖌️",
      title: "Wall Painting",
      description: "Quality wall painting services and filling in wall defects and imperfections.",
    },
    {
      id: 10,
      icon: "🧹",
      title: "Furniture Cleaning & Repair",
      description: "Basic furniture cleaning, maintenance and repair services to extend the life of your pieces.",
    },
    {
      id: 11,
      icon: "🛋️",
      title: "Cleaning Products",
      description: "We sell proven cleaning and maintenance products for upholstered and leather furniture.",
    },
    {
      id: 12,
      icon: "🇪🇺",
      title: "International Moving",
      description: "Professional moving services across all EU countries with customs handling and international logistics expertise.",
    },
  ],
  pl: [
    {
      id: 1,
      icon: "🏠",
      title: "Przeprowadzki mieszkaniowe",
      description: "Nasze usługi przeprowadzkowe zapewniają bezstresowe doświadczenie dla domów każdej wielkości.",
    },
    {
      id: 2,
      icon: "🏢",
      title: "Przeprowadzki komercyjne",
      description: "Zminimalizuj przestoje dzięki naszym efektywnym usługom relokacji biur i firm.",
    },
    {
      id: 3,
      icon: "📦",
      title: "Pakowanie i rozpakowywanie",
      description: "Profesjonalne usługi pakowania i rozpakowywania, aby chronić Twoje cenne rzeczy.",
    },
    {
      id: 4,
      icon: "🚚",
      title: "Przeprowadzki na duże odległości",
      description: "Niezawodne usługi przeprowadzkowe na duże odległości z dokładnym planowaniem i wykonaniem.",
    },
    {
      id: 5,
      icon: "🔒",
      title: "Rozwiązania magazynowe",
      description: "Bezpieczne opcje przechowywania na krótki i długi termin podczas przeprowadzki.",
    },
    {
      id: 6,
      icon: "🛋️",
      title: "Montaż mebli",
      description: "Ekspercki demontaż i montaż mebli, aby przeprowadzka była bezproblemowa.",
    },
    {
      id: 7,
      icon: "💡",
      title: "Instalacja lamp",
      description: "Profesjonalna instalacja lamp i oświetlenia w domu lub biurze.",
    },
    {
      id: 8,
      icon: "🪞",
      title: "Montaż luster",
      description: "Ekspercka instalacja luster i dekoracji ściennych do wnętrza.",
    },
    {
      id: 9,
      icon: "🖌️",
      title: "Malowanie ścian",
      description: "Jakościowe usługi malowania ścian i wypełniania ubytków i niedoskonałości.",
    },
    {
      id: 10,
      icon: "🧹",
      title: "Czyszczenie i naprawa mebli",
      description: "Podstawowe usługi czyszczenia, konserwacji i naprawy mebli, aby przedłużyć życie Twoich elementów.",
    },
    {
      id: 11,
      icon: "🛋️",
      title: "Produkty czyszczące",
      description: "Sprzedajemy sprawdzone produkty czyszczące i konserwujące dla mebli tapicerowanych i skórzanych.",
    },
    {
      id: 12,
      icon: "🇪🇺",
      title: "Przeprowadzki międzynarodowe",
      description: "Profesjonalne usługi przeprowadzkowe na terenie całej Unii Europejskiej z obsługą celną i wiedzą z zakresu logistyki międzynarodowej.",
    },
  ],
  de: [
    {
      id: 1,
      icon: "🏠",
      title: "Wohnungsumzug",
      description: "Unsere Umzugsdienste für Wohnungen bieten ein stressfreies Umzugserlebnis für Häuser aller Größen.",
    },
    {
      id: 2,
      icon: "🏢",
      title: "Geschäftsumzug",
      description: "Minimieren Sie Ausfallzeiten mit unseren effizienten Büro- und Geschäftsumzugsdiensten.",
    },
    {
      id: 3,
      icon: "📦",
      title: "Verpackung & Auspackung",
      description: "Professionelle Verpackungs- und Auspackungsdienste zum Schutz Ihrer wertvollen Gegenstände.",
    },
    {
      id: 4,
      icon: "🚚",
      title: "Fernumzug",
      description: "Zuverlässige Fernumzugsdienste mit sorgfältiger Planung und Durchführung.",
    },
    {
      id: 5,
      icon: "🔒",
      title: "Lagerungslösungen",
      description: "Sichere Lagerungsoptionen für kurz- und langfristige Bedürfnisse während Ihres Umzugs.",
    },
    {
      id: 6,
      icon: "🛋️",
      title: "Möbelmontage",
      description: "Experten-Demontage und -Montage von Möbeln für einen nahtlosen Umzug.",
    },
    {
      id: 7,
      icon: "💡",
      title: "Lampeninstallation",
      description: "Professionelle Installation von Lampen und Beleuchtungskörpern in Ihrem Zuhause oder Büro.",
    },
    {
      id: 8,
      icon: "🪞",
      title: "Spiegelmontage",
      description: "Experten-Installation von Spiegeln und Wanddekorationen für Ihr Interieur.",
    },
    {
      id: 9,
      icon: "🖌️",
      title: "Wandmalerei",
      description: "Qualitäts-Wandmalereidienste und Ausbesserung von Wandfehlern und -unvollkommenheiten.",
    },
    {
      id: 10,
      icon: "🧹",
      title: "Möbelreinigung & -reparatur",
      description: "Grundlegende Möbelreinigungs-, Wartungs- und Reparaturdienste zur Verlängerung der Lebensdauer Ihrer Stücke.",
    },
    {
      id: 11,
      icon: "🛋️",
      title: "Reinigungsprodukte",
      description: "Wir verkaufen bewährte Reinigungs- und Pflegeprodukte für Polstermöbel und Ledermöbel.",
    },
    {
      id: 12,
      icon: "🇪🇺",
      title: "Internationale Umzüge",
      description: "Professionelle Umzugsdienste in allen EU-Ländern mit Zollabwicklung und Fachwissen in internationaler Logistik.",
    },
  ],
  es: [
    {
      id: 1,
      icon: "🏠",
      title: "Mudanzas residenciales",
      description: "Nuestros servicios de mudanzas residenciales proporcionan una experiencia de reubicación sin estrés para hogares de todos los tamaños.",
    },
    {
      id: 2,
      icon: "🏢",
      title: "Mudanzas comerciales",
      description: "Minimice el tiempo de inactividad con nuestros eficientes servicios de reubicación de oficinas y negocios.",
    },
    {
      id: 3,
      icon: "📦",
      title: "Embalaje y desempaquetado",
      description: "Servicios profesionales de embalaje y desempaquetado para proteger sus pertenencias valiosas.",
    },
    {
      id: 4,
      icon: "🚚",
      title: "Mudanzas de larga distancia",
      description: "Servicios confiables de mudanza de larga distancia con planificación cuidadosa y ejecución.",
    },
    {
      id: 5,
      icon: "🔒",
      title: "Soluciones de almacenamiento",
      description: "Opciones de almacenamiento seguras para necesidades a corto y largo plazo durante su mudanza.",
    },
    {
      id: 6,
      icon: "🛋️",
      title: "Ensamblaje de muebles",
      description: "Desmontaje y montaje experto de muebles para hacer su mudanza sin problemas.",
    },
    {
      id: 7,
      icon: "💡",
      title: "Instalación de lámparas",
      description: "Instalación profesional de lámparas y accesorios de iluminación en su hogar u oficina.",
    },
    {
      id: 8,
      icon: "🪞",
      title: "Montaje de espejos",
      description: "Instalación experta de espejos y decoraciones de pared para su interior.",
    },
    {
      id: 9,
      icon: "🖌️",
      title: "Pintura de paredes",
      description: "Servicios de pintura de paredes de calidad y relleno de defectos e imperfecciones.",
    },
    {
      id: 10,
      icon: "🧹",
      title: "Limpieza y reparación de muebles",
      description: "Servicios básicos de limpieza, mantenimiento y reparación de muebles para extender la vida de sus piezas.",
    },
    {
      id: 11,
      icon: "🛋️",
      title: "Productos de limpieza",
      description: "Vendemos productos de limpieza y mantenimiento probados para muebles tapizados y de cuero.",
    },
    {
      id: 12,
      icon: "🇪🇺",
      title: "Mudanzas internacionales",
      description: "Servicios profesionales de mudanza en todos los países de la UE con gestión aduanera y experiencia en logística internacional.",
    },
  ]
};

export const testimonialTranslations = {
  en: [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Homeowner",
      quote: "The team at Umzuge Meister made our family's move across town incredibly smooth. They were professional, careful with our belongings, and finished ahead of schedule!",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Owner",
      quote: "Moving our office was a daunting task, but the crew handled everything with precision and care. Our business was up and running in the new location with minimal downtime.",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Apartment Resident",
      quote: "I was impressed by their attention to detail and how they protected both my furniture and the building during the move. Highly recommend their services!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4
    },
  ],
  pl: [
    {
      id: 1,
      name: "Anna Kowalska",
      role: "Właścicielka domu",
      quote: "Zespół Umzuge Meister sprawił, że przeprowadzka naszej rodziny przez miasto przebiegła niezwykle sprawnie. Byli profesjonalni, ostrożni z naszymi rzeczami i skończyli przed terminem!",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Piotr Nowak",
      role: "Właściciel firmy",
      quote: "Przeprowadzka naszego biura była trudnym zadaniem, ale ekipa zajęła się wszystkim z precyzją i starannością. Nasza firma działała w nowej lokalizacji z minimalnymi przestojami.",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Magdalena Wiśniewska",
      role: "Mieszkanka apartamentu",
      quote: "Byłam pod wrażeniem ich dbałości o szczegóły i tego, jak chronili zarówno moje meble, jak i budynek podczas przeprowadzki. Gorąco polecam ich usługi!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4
    },
  ],
  de: [
    {
      id: 1,
      name: "Laura Schmidt",
      role: "Hausbesitzerin",
      quote: "Das Team von Umzuge Meister hat den Umzug unserer Familie quer durch die Stadt unglaublich reibungslos gestaltet. Sie waren professionell, vorsichtig mit unseren Sachen und wurden vor dem Zeitplan fertig!",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Thomas Müller",
      role: "Geschäftsinhaber",
      quote: "Der Umzug unseres Büros war eine entmutigende Aufgabe, aber die Crew erledigte alles mit Präzision und Sorgfalt. Unser Geschäft war am neuen Standort mit minimalen Ausfallzeiten betriebsbereit.",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Sophia Wagner",
      role: "Wohnungsbewohnerin",
      quote: "Ich war beeindruckt von ihrer Liebe zum Detail und wie sie sowohl meine Möbel als auch das Gebäude während des Umzugs schützten. Empfehle ihre Dienste wärmstens!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4
    },
  ],
  es: [
    {
      id: 1,
      name: "Carmen García",
      role: "Propietaria",
      quote: "El equipo de Umzuge Meister hizo que la mudanza de nuestra familia por la ciudad fuera increíblemente fluida. Fueron profesionales, cuidadosos con nuestras pertenencias, ¡y terminaron antes de lo previsto!",
      image: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Javier Rodríguez",
      role: "Propietario de negocio",
      quote: "Mudar nuestra oficina fue una tarea desalentadora, pero el equipo manejó todo con precisión y cuidado. Nuestro negocio estaba funcionando en la nueva ubicación con un tiempo de inactividad mínimo.",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Lucía Martínez",
      role: "Residente de apartamento",
      quote: "Me impresionó su atención al detalle y cómo protegieron tanto mis muebles como el edificio durante la mudanza. ¡Recomiendo encarecidamente sus servicios!",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 4
    },
  ]
};
