import React from 'react';
import { useLanguage } from './LanguageContext';
import { useSettings } from './SettingsContext';
import { translations } from '../lib/translations';
import { Phone, Mail, MapPin, MessageCircle, Send, Clock, User } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const t = translations[language];

  const bothEmails = `mailto:${settings.direDawaManager.email},${settings.djiboutiManager.email}`;

  return (
    <footer id="contact" className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/ef80c1c8-45ec-41fb-99e7-96e98f602647/company-logo-2e818e62-1774382672220.webp" 
              alt="Logo" 
              className="h-12 w-12 rounded-full ring-2 ring-blue-400"
            />
            <span className="text-2xl font-bold">Ethio-Djib Connect</span>
          </div>
          <p className="text-blue-200 leading-relaxed">
            {t.footerDesc}
          </p>
          <div className="bg-blue-900/50 p-4 rounded-xl border border-blue-800">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="text-blue-400" size={18} />
              <p className="text-xs font-bold uppercase text-blue-300">{t.workingHours}</p>
            </div>
            <p className="text-sm font-medium">{t.alwaysOpen}</p>
          </div>
          <div className="flex gap-4">
            <a href={bothEmails} className="p-2 bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors" title="Email Both Managers">
              <Mail size={20} />
            </a>
            <a href={`https://wa.me/${settings.direDawaManager.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors" title="WhatsApp Dire Dawa">
              <MessageCircle size={20} />
            </a>
            <a href={`https://wa.me/${settings.djiboutiManager.whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-blue-900 rounded-lg hover:bg-blue-800 transition-colors" title="WhatsApp Djibouti">
              <Send size={20} />
            </a>
          </div>
        </div>

        {/* Manager Details */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-blue-400 border-b border-blue-800 pb-2">{t.contactUs}</h3>
          <ul className="space-y-6">
            {/* Dire Dawa Manager */}
            <li className="space-y-2">
              <div className="flex items-center gap-2 text-blue-300">
                <User size={16} />
                <p className="text-xs font-bold uppercase">{t.direDawaManager}</p>
              </div>
              <p className="font-bold text-lg">{settings.direDawaManager.name}</p>
              <div className="space-y-2">
                <a href={`tel:${settings.direDawaManager.phone}`} className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors">
                  <Phone className="text-blue-400" size={18} />
                  <span className="font-medium">{settings.direDawaManager.phone}</span>
                </a>
                <a href={`mailto:${settings.direDawaManager.email}`} className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors break-all">
                  <Mail className="text-blue-400" size={18} />
                  <span className="font-medium text-sm">{settings.direDawaManager.email}</span>
                </a>
                <div className="flex gap-2 pt-1">
                   <a href={`https://wa.me/${settings.direDawaManager.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded flex items-center gap-1 hover:bg-green-600/30">
                     <MessageCircle size={12} /> WhatsApp
                   </a>
                   <a href={`sms:${settings.direDawaManager.phone}`} className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-600/30">
                     <Send size={12} /> SMS
                   </a>
                </div>
              </div>
            </li>

            {/* Djibouti Manager */}
            <li className="space-y-2 pt-4 border-t border-blue-900/50">
              <div className="flex items-center gap-2 text-blue-300">
                <User size={16} />
                <p className="text-xs font-bold uppercase">{t.djiboutiManager}</p>
              </div>
              <p className="font-bold text-lg">{settings.djiboutiManager.name}</p>
              <div className="space-y-2">
                <a href={`tel:${settings.djiboutiManager.phone}`} className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors">
                  <Phone className="text-blue-400" size={18} />
                  <span className="font-medium">{settings.djiboutiManager.phone}</span>
                </a>
                <a href={`mailto:${settings.djiboutiManager.email}`} className="flex items-center gap-3 text-blue-100 hover:text-white transition-colors break-all">
                  <Mail className="text-blue-400" size={18} />
                  <span className="font-medium text-sm">{settings.djiboutiManager.email}</span>
                </a>
                <div className="flex gap-2 pt-1">
                   <a href={`https://wa.me/${settings.djiboutiManager.whatsapp}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-600/20 text-green-400 px-2 py-1 rounded flex items-center gap-1 hover:bg-green-600/30">
                     <MessageCircle size={12} /> WhatsApp
                   </a>
                   <a href={`sms:${settings.djiboutiManager.phone}`} className="text-xs bg-blue-600/20 text-blue-400 px-2 py-1 rounded flex items-center gap-1 hover:bg-blue-600/30">
                     <Send size={12} /> SMS
                   </a>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Locations & Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-blue-400 border-b border-blue-800 pb-2">{t.navBook}</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold text-blue-300 uppercase">{t.ethiopia}</p>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>{t.direDawa}</li>
                <li>{t.dawale}</li>
              </ul>
            </div>
            <div className="space-y-2">
              <p className="text-xs font-bold text-blue-300 uppercase">{t.djibouti}</p>
              <ul className="text-sm text-blue-200 space-y-1">
                <li>{t.djibouti}</li>
                <li>{t.galilee}</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-blue-900/50">
            <div className="flex items-start gap-3 text-blue-100">
              <MapPin className="text-blue-400 mt-1 shrink-0" size={20} />
              <div>
                <p className="text-xs font-bold uppercase text-blue-300">{t.office}</p>
                <p className="font-medium">{t.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-blue-900 text-center text-sm text-blue-400">
        <p>\\u00a9 {new Date().getFullYear()} {t.footerRights}</p>
      </div>
    </footer>
  );
};

export default Footer;