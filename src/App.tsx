import React from 'react';
import { Toaster } from 'sonner';
import { LanguageProvider } from './components/LanguageContext';
import { SettingsProvider } from './components/SettingsContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import ContractSection from './components/ContractSection';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AdminPanel from './components/AdminPanel';

function App() {
  return (
    <SettingsProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white font-sans antialiased">
          <Navbar />
          <main>
            <Hero />
            <BookingForm />
            <ContractSection />
          </main>
          <Footer />
          <Chatbot />
          <AdminPanel />
          <Toaster position="top-center" richColors />
        </div>
      </LanguageProvider>
    </SettingsProvider>
  );
}

export default App;