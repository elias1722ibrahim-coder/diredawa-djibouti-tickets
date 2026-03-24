import React from 'react';
import { useLanguage } from './LanguageContext';
import { translations, Language } from '../lib/translations';
import { Globe, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = React.useState(false);

  const languages: { code: Language; name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'am', name: 'አማርኛ' },
    { code: 'fr', name: 'Français' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/ef80c1c8-45ec-41fb-99e7-96e98f602647/company-logo-2e818e62-1774382672220.webp" 
              alt="Logo" 
              className="h-10 w-10 object-contain rounded-full shadow-sm"
            />
            <span className="font-bold text-xl text-blue-900 hidden sm:block">
              Ethio-Djib Connect
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">{t.navHome}</a>
            <a href="#booking" className="text-gray-700 hover:text-blue-600 transition-colors">{t.navBook}</a>
            <a href="#contract" className="text-gray-700 hover:text-blue-600 transition-colors">{t.navContract}</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">{t.navContact}</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <button className="flex items-center gap-1 text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 hover:bg-gray-50 transition-all">
                <Globe size={18} />
                <span className="uppercase text-sm font-medium">{language}</span>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-50 first:rounded-t-xl last:rounded-b-xl"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 pb-4 px-4 space-y-4 animate-in slide-in-from-top duration-300">
          <a href="#home" className="block text-gray-700 py-2" onClick={() => setIsOpen(false)}>{t.navHome}</a>
          <a href="#booking" className="block text-gray-700 py-2" onClick={() => setIsOpen(false)}>{t.navBook}</a>
          <a href="#contract" className="block text-gray-700 py-2" onClick={() => setIsOpen(false)}>{t.navContract}</a>
          <a href="#contact" className="block text-gray-700 py-2" onClick={() => setIsOpen(false)}>{t.navContact}</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;