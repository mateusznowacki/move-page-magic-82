
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BadgePercent } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-moving-dark text-white pt-20 pb-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8">
              <img 
                src="/meister-umzunge-logo.png" 
                alt="MP Transporte und Umzüge Logo" 
                className="h-24 w-auto"
              />
            </div>
            <p className="mb-8 text-gray-300 text-lg leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          
          <div className="lg:col-span-1">
            <h4 className="text-xl font-bold mb-8 text-moving-blue">{t('footer.servicesTitle')}</h4>
            <ul className="space-y-5">
              <li><a href="#" className="text-gray-300 hover:text-moving-blue transition-colors text-lg font-medium hover:translate-x-2 transform duration-300 block">{t('footer.residentialMoving')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-moving-blue transition-colors text-lg font-medium hover:translate-x-2 transform duration-300 block">{t('footer.commercialMoving')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-moving-blue transition-colors text-lg font-medium hover:translate-x-2 transform duration-300 block">{t('footer.packingUnpacking')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-moving-blue transition-colors text-lg font-medium hover:translate-x-2 transform duration-300 block">{t('footer.longDistanceMoving')}</a></li>
              <li><a href="#" className="text-gray-300 hover:text-moving-blue transition-colors text-lg font-medium hover:translate-x-2 transform duration-300 block">{t('footer.storageSolutions')}</a></li>
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <div className="flex items-center mb-8">
              <BadgePercent className="w-8 h-8 text-moving-blue mr-3" />
              <h4 className="text-xl font-bold text-moving-blue">{t('footer.promotionTitle')}</h4>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 sm:p-6 shadow-lg w-full max-w-sm">
              <div className="flex items-center mb-3 sm:mb-4">
                <BadgePercent className="w-6 h-6 sm:w-8 sm:h-8 text-moving-blue mr-2 sm:mr-3" />
                <div>
                  <Badge variant="default" className="bg-moving-blue text-white mb-1 sm:mb-2 text-xs sm:text-sm">
                    {t('footer.promotionTitle')}
                  </Badge>
                  <div className="flex items-center">
                    <span className="text-2xl sm:text-3xl font-bold text-moving-blue">10%</span>
                    <span className="text-sm sm:text-base font-semibold ml-1 sm:ml-2 text-moving-dark">{t('footer.discount')}</span>
                  </div>
                </div>
              </div>
              <p className="text-moving-dark text-xs sm:text-sm mb-3 leading-relaxed">{t('footer.promotionDescription')}</p>
              <div className="text-xs sm:text-sm text-gray-600">
                {t('footer.promotionTerms')}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700/50 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-base mb-4 md:mb-0">
              © 2025 MP Transporte und Umzüge. {t('footer.allRightsReserved')}
            </p>
            <div className="flex space-x-8">
              <a href="/privacy-policy" className="text-gray-300 hover:text-moving-blue text-base font-medium transition-colors">{t('footer.privacyPolicy')}</a>
              <a href="/terms-of-service" className="text-gray-300 hover:text-moving-blue text-base font-medium transition-colors">{t('footer.termsOfService')}</a>
              <a href="/cookie-policy" className="text-gray-300 hover:text-moving-blue text-base font-medium transition-colors">{t('footer.cookiePolicy')}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
