import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from './LanguageContext';
import { useSettings } from './SettingsContext';
import { translations } from '../lib/translations';
import { toast } from 'sonner';
import { Calendar, Users, MapPin, Truck, ChevronRight, Phone, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const BookingForm = () => {
  const { language } = useLanguage();
  const { settings } = useSettings();
  const t = translations[language];

  const ethPaymentMethods = useMemo(() => [
    { id: 'ebirr', label: t.ebirr },
    { id: 'telebirr', label: t.telebirr },
    { id: 'cbe', label: t.cbe },
    { id: 'cash', label: t.cash },
  ], [t]);

  const djiPaymentMethods = useMemo(() => [
    { id: 'waafi', label: t.waafi },
    { id: 'dmoney', label: t.dmoney },
    { id: 'cac', label: t.cac },
    { id: 'salaamAfricBank', label: t.salaamAfricBank },
    { id: 'eastAfricaBank', label: t.eastAfricaBank },
  ], [t]);

  const [formData, setFormData] = useState({
    route: 'direDawaDawale',
    vehicle: 'minibus',
    passengers: 1,
    name: '',
    phone: '',
    date: '',
    paymentMethod: 'cash',
  });

  const [price, setPrice] = useState({ amount: 0, currency: '' });

  // Determine if the route is international (involves Djibouti)
  const isInternational = useMemo(() => {
    return formData.route === 'galileeDjibouti' || formData.route === 'djiboutiGalilee';
  }, [formData.route]);

  // Update phone prefix and payment methods based on route
  useEffect(() => {
    const prefix = isInternational ? '+253' : '+251';
    
    setFormData(prev => {
      const updates: any = {};
      
      // Update phone if it's empty or has wrong prefix
      if (!prev.phone || 
         (isInternational && prev.phone.startsWith('+251')) || 
         (!isInternational && prev.phone.startsWith('+253'))) {
        updates.phone = prefix;
      }

      // Update payment method to a valid one for the new route
      const ethIds = ethPaymentMethods.map(p => p.id);
      const djiIds = djiPaymentMethods.map(p => p.id);
      
      if (isInternational && ethIds.includes(prev.paymentMethod)) {
        updates.paymentMethod = 'waafi';
      } else if (!isInternational && djiIds.includes(prev.paymentMethod)) {
        updates.paymentMethod = 'cash';
      }

      if (Object.keys(updates).length > 0) {
        return { ...prev, ...updates };
      }
      return prev;
    });
  }, [isInternational, ethPaymentMethods, djiPaymentMethods]);

  useEffect(() => {
    // Dynamic price logic using settings
    let base = settings.costs.domesticBase;
    let currency = t.currencyETB;

    if (isInternational) {
      base = settings.costs.internationalBase;
      currency = t.currencyDJF;
    }

    if (formData.vehicle === 'coaster') base *= settings.costs.coasterMultiplier;
    if (formData.vehicle === 'pickup') base *= settings.costs.pickupMultiplier;
    if (formData.vehicle === 'personalCar') base *= settings.costs.personalCarMultiplier;
    if (formData.vehicle === 'groupBus') base *= settings.costs.groupBusMultiplier;

    setPrice({ amount: Math.round(base * formData.passengers), currency });
  }, [isInternational, formData.vehicle, formData.passengers, t, settings]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const prefix = isInternational ? '+253' : '+251';
    
    if (val.startsWith(prefix)) {
      setFormData({ ...formData, phone: val });
    } else if (val.length < prefix.length) {
      setFormData({ ...formData, phone: prefix });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const prefix = isInternational ? '+253' : '+251';
    
    if (!formData.name || formData.phone === prefix || !formData.date) {
      const errorMsg = language === 'am' ? 'እባክዎ ሁሉንም መረጃዎች ያስገቡ' : 
                       language === 'fr' ? 'Veuillez remplir tous les champs' : 
                       'Please fill all fields';
      toast.error(errorMsg);
      return;
    }

    const managerNum = isInternational ? settings.djiboutiManager.whatsapp : settings.direDawaManager.whatsapp;
    
    // Get label for current payment method
    const currentMethods = isInternational ? djiPaymentMethods : ethPaymentMethods;
    const paymentLabel = currentMethods.find(p => p.id === formData.paymentMethod)?.label || formData.paymentMethod;

    const routeLabel = t[`route${formData.route.charAt(0).toUpperCase() + formData.route.slice(1)}` as keyof typeof t];

    const message = `Booking Inquiry:
Name: ${formData.name}
Phone: ${formData.phone}
Route: ${routeLabel}
Vehicle: ${t[formData.vehicle as keyof typeof t]}
Date: ${formData.date}
Passengers: ${formData.passengers}
Payment Method: ${paymentLabel}
Estimated Price: ${price.amount} ${price.currency}`;
    
    const whatsappUrl = `https://wa.me/${managerNum.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast.success(t.successMsg);
  };

  const currentPaymentOptions = isInternational ? djiPaymentMethods : ethPaymentMethods;

  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden"
        >
          <div className="bg-blue-900 p-8 text-white">
            <h2 className="text-3xl font-bold">{t.formTitle}</h2>
            <p className="opacity-80 mt-2">{t.heroSubtitle}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <MapPin size={16} /> {t.routeType}
                </label>
                <select
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none bg-white"
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                >
                  <option value="direDawaDawale">{t.routeDireDawaDawale}</option>
                  <option value="galileeDjibouti">{t.routeGalileeDjibouti}</option>
                  <option value="djiboutiGalilee">{t.routeDjiboutiGalilee}</option>
                  <option value="dawaleDireDawa">{t.routeDawaleDireDawa}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Truck size={16} /> {t.vehicleType}
                </label>
                <select
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none bg-white"
                  value={formData.vehicle}
                  onChange={(e) => setFormData({ ...formData, vehicle: e.target.value })}
                >
                  <option value="minibus">{t.minibus}</option>
                  <option value="coaster">{t.coaster}</option>
                  <option value="pickup">{t.pickup}</option>
                  <option value="personalCar">{t.personalCar}</option>
                  <option value="groupBus">{t.groupBus}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Users size={16} /> {t.passengerCount}
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  value={formData.passengers}
                  onChange={(e) => setFormData({ ...formData, passengers: parseInt(e.target.value) || 1 })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Calendar size={16} /> {t.date}
                </label>
                <input
                  type="date"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">{t.fullName}</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">{t.phone}</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="tel"
                    className="w-full p-3 pl-10 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    placeholder="+251 915 151 722"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <CreditCard size={16} /> {t.paymentMethod}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {currentPaymentOptions.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: option.id })}
                      className={`p-3 text-sm rounded-xl border transition-all text-center font-medium ${
                        formData.paymentMethod === option.id
                          ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-blue-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-blue-600 font-medium uppercase tracking-wider">{t.price}</p>
                <p className="text-3xl font-bold text-blue-900">
                  {price.amount.toLocaleString()} <span className="text-lg font-normal">{price.currency}</span>
                </p>
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                {t.submitBooking} <ChevronRight size={20} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default BookingForm;