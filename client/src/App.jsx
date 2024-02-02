import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { logo } from './assets';
import { Home, CreatePost } from './pages';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; 
import { LanguageToggle } from './components';

const App = () => (
  
  <I18nextProvider i18n={i18n}>
  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-[#ffffff] sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <a href="https://t.me/coded_pro" type='_blank'>
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </a>
      <div className="relative ml-auto mr-4 inline-block text-left">
      <LanguageToggle /> 
      </div>
      <Link to="/create-post" className="font-inter font-medium bg-[#5d0694] text-white px-4 py-2 rounded-md">Create</Link>
    </header>
    <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
      </Routes>
    </main>
  </BrowserRouter>
  </I18nextProvider>
);

export default App;
