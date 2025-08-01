import { useState, useEffect } from 'react';

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load consent from localStorage on mount
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      try {
        const parsedConsent = JSON.parse(savedConsent);
        setConsent(parsedConsent);
      } catch (error) {
        console.error('Error parsing cookie consent:', error);
      }
    }
    setIsLoaded(true);
  }, []);

  const saveConsent = (newConsent: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    setConsent(newConsent);
    
    // Set cookie consent flag
    document.cookie = `cookie-consent=true; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`;
  };

  const hasConsent = (type: keyof CookiePreferences): boolean => {
    if (!consent) return false;
    return consent[type];
  };

  const hasAnyConsent = (): boolean => {
    return consent !== null;
  };

  const clearConsent = () => {
    localStorage.removeItem('cookie-consent');
    localStorage.removeItem('cookie-consent-date');
    setConsent(null);
    
    // Remove cookie consent flag
    document.cookie = 'cookie-consent=; max-age=0; path=/';
  };

  const getConsentDate = (): Date | null => {
    const dateString = localStorage.getItem('cookie-consent-date');
    return dateString ? new Date(dateString) : null;
  };

  return {
    consent,
    isLoaded,
    saveConsent,
    hasConsent,
    hasAnyConsent,
    clearConsent,
    getConsentDate,
  };
}; 