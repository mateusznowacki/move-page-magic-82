
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Truck } from "lucide-react";
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { translations } from '@/lib/translations';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (location.pathname !== '/') {
      navigate('/', {
        state: {
          scrollTo: sectionId
        }
      });
      return;
    }
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth'
      });
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };

  const scrollToContact = () => {
    scrollToSection('contact');
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
  };

  const getNavText = (key: string) => {
    const navKey = `nav.${key}` as keyof typeof translations;
    return translations[navKey] ? translations[navKey][language] : key;
  };

  const navigationItems = [{
    key: 'home',
    href: '/',
    isLink: true
  }, {
    key: 'services',
    href: '/dienstleistungen',
    isLink: true
  }, {
    key: 'about',
    href: '/uber-uns',
    isLink: true
  }, {
    key: 'states',
    href: '/staedte',
    isLink: true
  }, {
    key: 'testimonials',
    href: '#testimonials',
    sectionId: 'testimonials'
  }, {
    key: 'quote',
    href: '/angebot',
    isLink: true
  }, {
    key: 'contact',
    href: '/kontakt',
    isLink: true
  }];

  const NavItem = ({
    item,
    isMobile = false
  }: {
    item: typeof navigationItems[0];
    isMobile?: boolean;
  }) => {
    const baseClasses = "text-white font-semibold transition-colors text-base lg:text-lg xl:text-xl outline-none relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 active:outline-none border-none";
    const mobileClasses = isMobile ? "py-3 text-lg text-white hover:bg-[#3a6ba0] px-4 rounded-lg transition-all duration-200 outline-none focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 active:outline-none border-none after:hidden" : "";
    
    if (item.isLink) {
      return (
        <Link 
          to={item.href} 
          className={`${baseClasses} ${mobileClasses}`}
          aria-label={getNavText(item.key)}
          onClick={() => {
            if (isMobile) setIsMobileMenuOpen(false);
            // Scroll to top for all page navigation
            if (item.href !== '/' || location.pathname !== '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          tabIndex={-1}
        >
          {getNavText(item.key)}
        </Link>
      );
    }
    
    return (
      <a 
        href={item.href} 
        onClick={e => scrollToSection(item.sectionId!, e)} 
        className={`${baseClasses} ${mobileClasses}`}
        tabIndex={-1}
      >
        {getNavText(item.key)}
      </a>
    );
  };

  return (
    <header className={cn("bg-[#4882c9]/95 backdrop-blur-sm text-white shadow-lg sticky top-0 z-50")}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2 sm:py-4">
        <Link 
          to="/" 
          className="text-white flex items-center gap-2 md:gap-3 group"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="Strona główna - Meister Umzüge 24"
        >
          <img alt="Logo Meister Umzüge 24" className="h-14 sm:h-16 md:h-18 lg:h-20 object-contain" src="/logo.svg" loading="eager" decoding="async" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map(item => <NavItem key={item.key} item={item} />)}
          <LanguageSwitcher />
          <a 
            href={`https://wa.me/4915223031473?text=${encodeURIComponent(translations['nav.whatsappMessage'][language])}`}
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              const whatsappUrl = `https://wa.me/4915223031473?text=${encodeURIComponent(translations['nav.whatsappMessage'][language])}`;
              
              if (typeof window.gtag !== 'undefined') {
                window.gtag('event', 'conversion', {
                  'send_to': 'AW-17470976934/azyNCLeh5IUbEKbn54pB',
                  'value': 1.0,
                  'currency': 'PLN'
                });
              }
              
              setTimeout(() => {
                window.open(whatsappUrl, '_blank');
              }, 500);
            }}
            className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg transform"
            aria-label="Contact us on WhatsApp"
          >
            <span className="text-base font-medium">{translations['nav.whatsapp'][language]}</span>
          </a>
        </nav>
        
        <button 
          className="md:hidden transition-all duration-300 hover:scale-110 hover:text-green-400"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
        </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="lg:hidden bg-[#4882c9]/95 backdrop-blur-sm absolute top-full left-0 right-0 shadow-lg border-t border-gray-700 animate-slide-in-right"
          role="navigation"
          aria-label="Menu mobilne"
        >
          <div className="container py-4 flex flex-col space-y-3">
            {navigationItems.map(item => <NavItem key={item.key} item={item} isMobile />)}
            <div className="flex flex-col space-y-3 pt-4 border-t border-gray-700">
              <div className="flex justify-center">
                <LanguageSwitcher />
              </div>
              <a 
                href={`https://wa.me/4915223031473?text=${encodeURIComponent(translations['nav.whatsappMessage'][language])}`}
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.preventDefault();
                  const whatsappUrl = `https://wa.me/4915223031473?text=${encodeURIComponent(translations['nav.whatsappMessage'][language])}`;
                  
                  if (typeof window.gtag !== 'undefined') {
                    window.gtag('event', 'conversion', {
                      'send_to': 'AW-17470976934/azyNCLeh5IUbEKbn54pB',
                      'value': 1.0,
                      'currency': 'PLN'
                    });
                  }
                  
                  setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                  }, 500);
                  setIsMobileMenuOpen(false);
                }}
                className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg transform text-center text-white font-medium"
                aria-label="Contact us on WhatsApp"
              >
                <span className="text-base font-medium">{translations['nav.whatsapp'][language]}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
