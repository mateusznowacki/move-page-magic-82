
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Truck } from "lucide-react";
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { translations } from '@/lib/translations';

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
    href: '/states',
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
    const baseClasses = "text-moving-dark font-semibold transition-colors text-base lg:text-lg xl:text-xl outline-none relative after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:w-0 after:bg-moving-blue after:transition-all after:duration-300 hover:after:w-full focus:outline-none focus:ring-2 focus:ring-moving-blue focus:ring-offset-2 active:outline-none border-none";
    const mobileClasses = isMobile ? "py-3 text-lg text-gray-800 hover:bg-moving-lightblue px-4 rounded-lg transition-all duration-200 outline-none focus:outline-none focus:ring-2 focus:ring-moving-blue focus:ring-offset-2 active:outline-none border-none after:hidden" : "";
    
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
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-2 md:py-3")}>
      <div className="container flex justify-between items-center">
        <Link 
          to="/" 
          className="text-moving-dark flex items-center gap-2 md:gap-3 group"
          onClick={() => {
            if (location.pathname === '/') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          aria-label="Strona główna - Meister Umzüge 24"
        >
          <img alt="Logo Meister Umzüge 24" className="h-10 sm:h-12 md:h-14 lg:h-16 object-contain" src="/optimized/meister-umzunge-logo.webp" loading="eager" decoding="async" />
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 2xl:space-x-10">
          {navigationItems.map(item => <NavItem key={item.key} item={item} />)}
          <LanguageSwitcher />
        </nav>
        
        <div className="lg:hidden flex items-center gap-2">
          <LanguageSwitcher />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="outline-none focus:ring-2 focus:ring-moving-blue focus:ring-offset-2"
            aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6 sm:h-7 sm:w-7 text-moving-dark" />
          </Button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div 
          id="mobile-menu"
          className="lg:hidden bg-white absolute top-full left-0 right-0 shadow-lg border-t border-gray-200 animate-slide-in-right"
          role="navigation"
          aria-label="Menu mobilne"
        >
          <div className="container py-4 flex flex-col space-y-3">
            {navigationItems.map(item => <NavItem key={item.key} item={item} isMobile />)}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
