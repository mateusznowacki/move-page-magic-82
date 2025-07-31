
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
    <Select value={language} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-[110px] sm:w-[120px] lg:w-[130px] h-8 sm:h-9 lg:h-10 text-sm sm:text-base bg-white/95 backdrop-blur-sm border border-gray-300 hover:bg-white focus:ring-0 rounded-md shadow-sm">
        <div className="flex items-center gap-1 sm:gap-2">
          {currentLanguage && (
            <span className="text-lg sm:text-xl">{currentLanguage.flag}</span>
          )}
          <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-800">{currentLanguage?.name}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code} className="cursor-pointer">
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl">{lang.flag}</span>
              <span className="text-sm sm:text-base">{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;
