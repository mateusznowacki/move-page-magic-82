
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useLanguage } from '@/contexts/LanguageContext';

interface Language {
  code: string;
  name: string;
  flag: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as 'en' | 'pl' | 'de' | 'es');
  };

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-moving-dark" />
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-[140px] h-8 text-sm bg-transparent border-none hover:bg-moving-lightblue focus:ring-0">
          <div className="flex items-center gap-2">
            {currentLanguage && (
              <span className="text-base">{currentLanguage.flag}</span>
            )}
            <SelectValue placeholder="Select language" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
              <div className="flex items-center gap-2">
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
