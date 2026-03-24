import React from 'react';
import { useLanguage } from './LanguageContext';
import { translations } from '../lib/translations';
import { Shield, Clock, Users, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div id="home" className="relative pt-16 min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://storage.googleapis.com/dala-prod-public-storage/generated-images/ef80c1c8-45ec-41fb-99e7-96e98f602647/hero-bg-3b92f0ac-1774382672419.webp')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 to-blue-900/40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center pt-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-sm font-medium">
            <span className="animate-pulse w-2 h-2 bg-blue-400 rounded-full" />
            {t.crossBorder}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-blue-100 max-w-lg leading-relaxed">
            {t.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#booking" 
              className="px-8 py-4 bg-white text-blue-900 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2 group"
            >
              {t.bookNow} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#contract" 
              className="px-8 py-4 bg-blue-600/20 border border-blue-500/50 text-white rounded-xl font-bold hover:bg-blue-600/40 transition-all"
            >
              {t.navContract}
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            <div>
              <p className="text-3xl font-bold">15+</p>
              <p className="text-sm text-blue-300">{t.dailyTrips}</p>
            </div>
            <div>
              <p className="text-3xl font-bold">50k+</p>
              <p className="text-sm text-blue-300">{t.happyClients}</p>
            </div>
            <div>
              <p className="text-3xl font-bold">24/7</p>
              <p className="text-sm text-blue-300">{t.support}</p>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:grid grid-cols-2 gap-4"
        >
          {[
            { icon: Shield, label: t.secureTravel, desc: t.borderProtocol },
            { icon: Clock, label: t.alwaysOnTime, desc: t.reliableSchedules },
            { icon: Users, label: t.groupDiscounts, desc: t.upTo20 },
            { icon: Star, label: t.luxuryFleet, desc: t.cleanModern }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div className="w-12 h-12 bg-blue-500/30 rounded-xl flex items-center justify-center mb-4">
                <item.icon className="text-blue-300" />
              </div>
              <h3 className="text-white font-bold mb-1">{item.label}</h3>
              <p className="text-sm text-blue-200">{item.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;