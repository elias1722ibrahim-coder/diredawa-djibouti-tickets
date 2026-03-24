import React from 'react';
import { useLanguage } from './LanguageContext';
import { translations } from '../lib/translations';
import { Car, Briefcase, Users, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';

const ContractSection = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const contracts = [
    {
      title: t.pickup,
      icon: Briefcase,
      desc: t.pickupDesc,
      price: t.custom,
      image: "https://images.unsplash.com/photo-1591862145398-380d3b66472b?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: t.personalCar,
      icon: Car,
      desc: t.personalDesc,
      price: t.flexible,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop"
    },
    {
      title: t.groupBus,
      icon: Users,
      desc: t.groupDesc,
      price: t.groupRate,
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <section id="contract" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-blue-900"
          >
            {t.contractTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            {t.contractDesc}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contracts.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-gray-50 rounded-3xl overflow-hidden hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-blue-900">
                  {item.price}
                </div>
              </div>
              <div className="p-8">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.desc}
                </p>
                <a 
                  href="tel:0915151722"
                  className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all"
                >
                  <PhoneCall size={18} /> {t.bookContract}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContractSection;