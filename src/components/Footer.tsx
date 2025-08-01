
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { BadgePercent } from 'lucide-react';


const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-moving-dark text-white py-8 md:py-12" role="contentinfo">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Logo and Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/optimized/meister-umzunge-logo.webp" 
                alt="Meister Umzüge 24 Logo" 
                className="h-12 md:h-16 object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="/" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Strona główna"
                >
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a 
                  href="/dienstleistungen" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Usługi przeprowadzkowe"
                >
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a 
                  href="/uber-uns" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="O nas"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a 
                  href="/kontakt" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Kontakt"
                >
                  {t('nav.contact')}
                </a>
              </li>
              <li>
                <a 
                  href="/angebot" 
                  className="text-gray-300 hover:text-white transition-colors"
                  aria-label="Bezpłatna wycena"
                >
                  {t('nav.quote')}
                </a>
              </li>
            </ul>
          </div>

          {/* Promotion Box */}
          <div>
            <div className="bg-moving-blue/10 border border-moving-blue/20 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <BadgePercent className="w-6 h-6 text-moving-blue mr-2" />
                <Badge variant="default" className="bg-moving-blue text-white text-sm">
                  {t('footer.promotionTitle')}
                </Badge>
              </div>
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold text-moving-blue">10%</span>
                <span className="text-white font-semibold ml-2">{t('footer.discount')}</span>
              </div>
              <p className="text-gray-300 text-sm mb-2">{t('footer.promotionDescription')}</p>
              <div className="text-xs sm:text-sm text-gray-400">
                {t('footer.promotionTerms')}
              </div>
            </div>
          </div>


        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400">
            <div>
              © 2024 Meister Umzüge 24. {t('footer.rights')}
            </div>
            <div className="flex space-x-6 mt-2 sm:mt-0">
              <a 
                href="/privacy-policy" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Polityka prywatności"
              >
                {t('footer.privacyPolicy')}
              </a>
              <a 
                href="/terms-of-service" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Regulamin"
              >
                {t('footer.termsOfService')}
              </a>
              <a 
                href="/cookie-policy" 
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Polityka cookies"
              >
                {t('footer.cookiePolicy')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
