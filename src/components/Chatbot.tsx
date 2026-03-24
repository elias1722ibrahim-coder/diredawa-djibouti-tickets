import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { translations } from '../lib/translations';
import { MessageSquare, X, Send, Bot, Loader2, MapPin, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isAction?: boolean;
}

const Chatbot = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<'dire-dawa' | 'djibouti' | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeText = t.chatWelcome;
      const selectionText = t.selectRegion;

      setMessages([
        {
          id: 1,
          text: welcomeText,
          sender: 'bot',
          timestamp: new Date(),
        },
        {
          id: 2,
          text: selectionText,
          sender: 'bot',
          timestamp: new Date(),
          isAction: true
        }
      ]);
    }
  }, [isOpen, t.chatWelcome, t.selectRegion, messages.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const selectRegion = (region: 'dire-dawa' | 'djibouti') => {
    setSelectedRegion(region);
    const regionName = region === 'dire-dawa' ? t.direDawa : t.djibouti;
    
    const botConfirm = t.botConfirm.replace('{region}', regionName);

    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        text: regionName,
        sender: 'user',
        timestamp: new Date(),
      },
      {
        id: Date.now() + 1,
        text: botConfirm,
        sender: 'bot',
        timestamp: new Date(),
      }
    ]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const managerName = selectedRegion === 'djibouti' ? 'Abdurahman' : 'Elias Ibrahim';
      const botResponseText = t.botResponse.replace('{manager}', managerName);
      
      const botResponse: Message = {
        id: Date.now() + 1,
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const openWhatsApp = () => {
    const managerNum = selectedRegion === 'djibouti' ? '+25377726972' : '+251915151722';
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user' && !m.isAction);
    const text = lastUserMsg ? lastUserMsg.text : "Hello, I have an inquiry.";
    window.open(`https://wa.me/${managerNum.replace('+', '')}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const openSMS = () => {
    const managerNum = selectedRegion === 'djibouti' ? '+25377726972' : '+251915151722';
    const lastUserMsg = [...messages].reverse().find(m => m.sender === 'user' && !m.isAction);
    const text = lastUserMsg ? lastUserMsg.text : "Hello, I have an inquiry.";
    window.location.href = `sms:${managerNum}?body=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[350px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4"
          >
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Bot size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-sm">{t.assistantName}</h3>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                    <span className="text-[10px] text-blue-100 uppercase font-bold tracking-wider">{t.online}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-blue-500 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                    }`}
                  >
                    {msg.text}
                    
                    {msg.isAction && !selectedRegion && (
                      <div className="mt-3 flex flex-col gap-2">
                        <button 
                          onClick={() => selectRegion('dire-dawa')}
                          className="flex items-center gap-2 w-full p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-xs font-bold"
                        >
                          <MapPin size={14} /> {t.direDawa}
                        </button>
                        <button 
                          onClick={() => selectRegion('djibouti')}
                          className="flex items-center gap-2 w-full p-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors text-xs font-bold"
                        >
                          <MapPin size={14} /> {t.djibouti}
                        </button>
                      </div>
                    )}

                    {msg.sender === 'bot' && msg.text.includes('WhatsApp') && (
                      <div className="mt-3 flex gap-2">
                        <button 
                          onClick={openWhatsApp}
                          className="flex-1 flex items-center justify-center gap-1 p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-[10px] font-bold"
                        >
                          <MessageCircle size={14} /> WhatsApp
                        </button>
                        <button 
                          onClick={openSMS}
                          className="flex-1 flex items-center justify-center gap-1 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-[10px] font-bold"
                        >
                          <Send size={14} /> SMS
                        </button>
                      </div>
                    )}

                    <div
                      className={`text-[10px] mt-1 opacity-70 ${
                        msg.sender === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm flex items-center gap-2">
                    <Loader2 className="animate-spin text-blue-600" size={16} />
                    <span className="text-xs text-gray-500">{t.typing}</span>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input
                type="text"
                value={inputValue}
                disabled={!selectedRegion}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={!selectedRegion ? t.selectRegionFirst : t.chatInputPlaceholder}
                className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || !selectedRegion}
                className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={20} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 hover:bg-blue-700'
        } text-white`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;