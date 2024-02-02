// LanguageToggle.jsx

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { iran, usa } from '../assets';

export default function LanguageToggle() {

  const { i18n } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  }

  return (
    <div className="relative inline-block text-left">

      <div 
        className="flex items-center justify-center rounded-md border border-gray-300 bg-white p-2 text-gray-600 shadow-sm hover:border-blue-500 hover:text-blue-500"
        onClick={toggleOpen}
      >
        <img  
          className="mr-2 h-5 w-auto"
          src={i18n.language === 'fa' ? iran : usa}
          alt={i18n.language} 
        />
        <span>{i18n.language}</span>
        
        <svg className="ml-2 h-5 w-5" viewBox="0 0 20 20">
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg">
          
          <div
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => changeLanguage('fa')}  
          >
            <img className="inline h-5 w-5 mr-2" src={iran} alt="فارسی" />
            فارسی
          </div>

          <div
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
            onClick={() => changeLanguage('en')}
          >
            <img className="inline h-5 w-5 mr-2" src={usa} alt="English" />
            English
          </div>
        </div>
      )}
    </div>
  );
}