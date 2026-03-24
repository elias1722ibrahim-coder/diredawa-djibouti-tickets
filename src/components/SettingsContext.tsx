import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ManagerInfo {
  name: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export interface TransportCosts {
  domesticBase: number;
  internationalBase: number;
  coasterMultiplier: number;
  pickupMultiplier: number;
  personalCarMultiplier: number;
  groupBusMultiplier: number;
}

interface Settings {
  direDawaManager: ManagerInfo;
  djiboutiManager: ManagerInfo;
  costs: TransportCosts;
}

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Settings) => void;
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

const DEFAULT_SETTINGS: Settings = {
  direDawaManager: {
    name: 'Elias Ibrahim',
    phone: '+251 915 151 722',
    email: 'elias1722ibrahim@gmail.com',
    whatsapp: '251915151722',
  },
  djiboutiManager: {
    name: 'Abdurahman Mahamed Waberi',
    phone: '+253 777 269 72',
    email: 'abdurahmanwaberi@gmail.com',
    whatsapp: '25377726972',
  },
  costs: {
    domesticBase: 500,
    internationalBase: 2500,
    coasterMultiplier: 0.8,
    pickupMultiplier: 1.5,
    personalCarMultiplier: 2.0,
    groupBusMultiplier: 5.0,
  }
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem('ethio_djib_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('ethio_djib_admin') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('ethio_djib_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings: Settings) => {
    setSettings(newSettings);
  };

  const login = (password: string) => {
    // Basic password check for the managers (hardcoded as requested for simplicity)
    if (password === 'manager2024' || password === 'elias1722' || password === 'abdurahman777') {
      setIsAdmin(true);
      localStorage.setItem('ethio_djib_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('ethio_djib_admin');
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings, isAdmin, login, logout }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within a SettingsProvider');
  return context;
};