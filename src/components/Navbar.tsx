
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Truck } from "lucide-react";
import { cn } from '@/lib/utils';
import LanguageSwitcher from './LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
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

  const navigationItems = [{
    key: 'home',
    href: '/',
    isLink: true
  }, {
    key: 'services',
    href: '#services',
    sectionId: 'services'
  }, {
    key: 'about',
    href: '#about',
    sectionId: 'about'
  }, {
    key: 'testimonials',
    href: '#testimonials',
    sectionId: 'testimonials'
  }, {
    key: 'areas',
    href: '#areas',
    sectionId: 'areas'
  }, {
    key: 'contact',
    href: '#contact',
    sectionId: 'contact'
  }];

  const NavItem = ({
    item,
    isMobile = false
  }: {
    item: typeof navigationItems[0];
    isMobile?: boolean;
  }) => {
    const baseClasses = `${isScrolled ? 'text-moving-dark' : 'text-white'} hover:text-moving-blue font-medium transition-colors`;
    const mobileClasses = isMobile ? "py-2" : "";
    
    if (item.isLink) {
      return (
        <Link 
          to={item.href} 
          className={`${baseClasses} ${mobileClasses}`} 
          onClick={isMobile ? () => setIsMobileMenuOpen(false) : undefined}
        >
          {t(`nav.${item.key}` as any)}
        </Link>
      );
    }
    
    return (
      <a 
        href={item.href} 
        onClick={e => scrollToSection(item.sectionId!, e)} 
        className={`${baseClasses} ${mobileClasses}`}
      >
        {t(`nav.${item.key}` as any)}
      </a>
    );
  };

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5")}>
      <div className="container flex justify-between items-center">
        <Link to="/" className={`${isScrolled ? 'text-moving-dark' : 'text-white'} flex items-center gap-2 group`}>
          <img alt="Meister Umzuge Logo" className="h-10 md:h-12 object-contain" src="/lovable-uploads/f24f1dd4-0e2d-4eb3-8bab-2a0677a3e732.png" />
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map(item => <NavItem key={item.key} item={item} />)}
          <LanguageSwitcher />
          <Button className="btn-primary" onClick={scrollToContact}>{t('nav.getQuote')}</Button>
        </nav>
        
        <div className="md:hidden flex items-center">
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-moving-dark' : 'text-white'}`} />
          </Button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute top-full left-0 right-0 shadow-md animate-slide-in-right">
          <div className="container py-4 flex flex-col space-y-4">
            {navigationItems.map(item => <NavItem key={item.key} item={item} isMobile />)}
            <Button className="btn-primary w-full" onClick={scrollToContact}>
              {t('nav.getQuote')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
