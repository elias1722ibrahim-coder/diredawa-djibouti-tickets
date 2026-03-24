import React, { useState, useEffect } from 'react';
import { useSettings } from './SettingsContext';
import { useLanguage } from './LanguageContext';
import { translations } from '../lib/translations';
import { X, Save, LogOut, Settings, Truck, User, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

const AdminPanel = () => {
  const { settings, updateSettings, isAdmin, login, logout } = useSettings();
  const { language } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [editSettings, setEditSettings] = useState(settings);

  // Sync editSettings with actual settings when panel opens or settings change
  useEffect(() => {
    if (isOpen) {
      setEditSettings(settings);
    }
  }, [isOpen, settings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      toast.success(t.loginSuccess || 'Login Successful');
      setPassword('');
    } else {
      toast.error(t.invalidCredentials || 'Invalid Credentials');
    }
  };

  const handleSave = () => {
    updateSettings(editSettings);
    toast.success(t.settingsUpdated || 'Settings updated successfully');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all text-white/50 hover:text-white"
        title="Admin Access"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-blue-900 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Settings className="text-blue-400" />
              <h2 className="text-xl font-bold">{t.adminHeader || 'Manager Administration'}</h2>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-lg transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {!isAdmin ? (
              <form onSubmit={handleLogin} className="max-w-sm mx-auto py-12 space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900">{t.managerLogin || 'Manager Login'}</h3>
                  <p className="text-gray-500">{t.accessRestricted || 'Access restricted to Elias and Abdurahman'}</p>
                </div>
                <div className="space-y-4">
                  <input
                    type="password"
                    placeholder={t.enterAccessKey || 'Enter Access Key'}
                    className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
                  >
                    {t.authorizeAccess || 'Authorize Access'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-8 pb-6">
                {/* Cost Settings */}
                <section className="space-y-4">
                  <div className="flex items-center gap-2 text-blue-900 border-b pb-2">
                    <DollarSign size={20} />
                    <h3 className="font-bold">{t.transportCosts || 'Transportation Costs'}</h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">{t.domesticBase || 'Domestic Base (ETB)'}</label>
                      <input
                        type="number"
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white outline-none"
                        value={editSettings.costs.domesticBase}
                        onChange={(e) => setEditSettings({
                          ...editSettings,
                          costs: { ...editSettings.costs, domesticBase: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">{t.internationalBase || 'International Base (DJF)'}</label>
                      <input
                        type="number"
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white outline-none"
                        value={editSettings.costs.internationalBase}
                        onChange={(e) => setEditSettings({
                          ...editSettings,
                          costs: { ...editSettings.costs, internationalBase: Number(e.target.value) }
                        })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">{t.coasterMult || 'Coaster Mult.'}</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white outline-none"
                        value={editSettings.costs.coasterMultiplier}
                        onChange={(e) => setEditSettings({
                          ...editSettings,
                          costs: { ...editSettings.costs, coasterMultiplier: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">{t.pickupMult || 'Pickup Mult.'}</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white outline-none"
                        value={editSettings.costs.pickupMultiplier}
                        onChange={(e) => setEditSettings({
                          ...editSettings,
                          costs: { ...editSettings.costs, pickupMultiplier: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">{t.suvMult || 'SUV Mult.'}</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white outline-none"
                        value={editSettings.costs.personalCarMultiplier}
                        onChange={(e) => setEditSettings({
                          ...editSettings,
                          costs: { ...editSettings.costs, personalCarMultiplier: Number(e.target.value) }
                        })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-500 uppercase">{t.groupBusMult || 'Group Bus Mult.'}</label>
                      <input
                        type="number"
                        step="0.1"
                        className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:bg-white outline-none"
                        value={editSettings.costs.groupBusMultiplier}
                        onChange={(e) => setEditSettings({
                          ...editSettings,
                          costs: { ...editSettings.costs, groupBusMultiplier: Number(e.target.value) }
                        })}
                      />
                    </div>
                  </div>
                </section>

                {/* Manager Info */}
                <section className="space-y-6">
                  <div className="flex items-center gap-2 text-blue-900 border-b pb-2">
                    <User size={20} />
                    <h3 className="font-bold">{t.managerInfo || 'Manager Information'}</h3>
                  </div>

                  {/* Dire Dawa Manager */}
                  <div className="space-y-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <p className="text-sm font-bold text-blue-800">{t.direDawaManagerTitle || 'Dire Dawa Manager (Elias)'}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">{t.fullName || 'Full Name'}</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none"
                          value={editSettings.direDawaManager.name}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            direDawaManager: { ...editSettings.direDawaManager, name: e.target.value }
                          })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">{t.phoneLabel || 'Phone'}</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none"
                          value={editSettings.direDawaManager.phone}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            direDawaManager: { ...editSettings.direDawaManager, phone: e.target.value }
                          })}
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">{t.emailLabel || 'Email'}</label>
                        <input
                          type="email"
                          className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none"
                          value={editSettings.direDawaManager.email}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            direDawaManager: { ...editSettings.direDawaManager, email: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Djibouti Manager */}
                  <div className="space-y-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                    <p className="text-sm font-bold text-blue-800">{t.djiboutiManagerTitle || 'Djibouti Manager (Abdurahman)'}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">{t.fullName || 'Full Name'}</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none"
                          value={editSettings.djiboutiManager.name}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            djiboutiManager: { ...editSettings.djiboutiManager, name: e.target.value }
                          })}
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">{t.phoneLabel || 'Phone'}</label>
                        <input
                          type="text"
                          className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none"
                          value={editSettings.djiboutiManager.phone}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            djiboutiManager: { ...editSettings.djiboutiManager, phone: e.target.value }
                          })}
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-bold text-gray-500 uppercase">{t.emailLabel || 'Email'}</label>
                        <input
                          type="email"
                          className="w-full p-3 bg-white rounded-lg border border-gray-200 outline-none"
                          value={editSettings.djiboutiManager.email}
                          onChange={(e) => setEditSettings({
                            ...editSettings,
                            djiboutiManager: { ...editSettings.djiboutiManager, email: e.target.value }
                          })}
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          {isAdmin && (
            <div className="p-4 bg-gray-50 border-t flex items-center justify-between">
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-xl transition-colors"
              >
                <LogOut size={18} /> {t.logout || 'Logout'}
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 text-gray-600 font-bold hover:bg-gray-100 rounded-xl transition-colors"
                >
                  {t.cancel || 'Cancel'}
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-8 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
                >
                  <Save size={18} /> {t.saveChanges || 'Save Changes'}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminPanel;