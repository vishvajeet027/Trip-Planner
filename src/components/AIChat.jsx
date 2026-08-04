import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, X, Bot, User, Trash2, ChevronDown, Minimize2 } from 'lucide-react';
import { geminiService } from '../services/geminiService';
import { storageService } from '../services/storageService';
import { motion, AnimatePresence } from 'framer-motion';

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => {
    const history = storageService.getAIHistory();
    return history.length > 0
      ? history
      : [
          {
            sender: 'ai',
            text: 'Namaste! 🇮🇳 I am your TravelAI Assistant powered by Gemini. Ask me anything about Indian travel destinations, luxury hotels, budget itineraries, or weather!',
            timestamp: new Date().toISOString()
          }
        ];
  });
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickPrompts = [
    "Hotels under budget in Goa",
    "Best season for Kashmir valley",
    "Suggest 3-day Jaipur itinerary",
    "Must-try street food in Kerala"
  ];

  const handleSend = async (textToSend = null) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg = { sender: 'user', text: query, timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    storageService.saveAIConversation(userMsg);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const responseText = await geminiService.chatWithAI(query, messages);
      const aiMsg = { sender: 'ai', text: responseText, timestamp: new Date().toISOString() };
      setMessages([...updatedMessages, aiMsg]);
      storageService.saveAIConversation(aiMsg);
    } catch (err) {
      const errorMsg = { sender: 'ai', text: 'Sorry, I ran into an error. Please try asking again!', timestamp: new Date().toISOString() };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleClearHistory = () => {
    storageService.clearAIHistory();
    setMessages([
      {
        sender: 'ai',
        text: 'Chat history cleared. How can I help with your Indian travel plans today?',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      
      {/* Floating Trigger Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(true)}
          className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 hover:from-blue-700 hover:to-amber-600 text-white rounded-full shadow-2xl shadow-blue-500/40 flex items-center space-x-2 border-2 border-white/20"
        >
          <Sparkles className="w-6 h-6 text-amber-300 animate-spin-slow" />
          <span className="font-bold text-sm hidden sm:inline pr-1">Ask VoyageCraft</span>
        </motion.button>
      )}

      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-full sm:w-96 h-[540px] bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden"
          >
            
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-amber-500 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
                  🤖
                </div>
                <div>
                  <h3 className="font-extrabold text-sm tracking-wide">VoyageCraft AI 🇮🇳</h3>
                  <span className="text-[10px] text-blue-100 flex items-center space-x-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <span>Gemini AI Engine Active</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <button
                  onClick={handleClearHistory}
                  title="Clear Chat History"
                  className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      🤖
                    </div>
                  )}

                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white rounded-br-none shadow-md'
                        : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700/80 rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.text}</p>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                       You
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center space-x-2 text-xs text-slate-400">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center animate-bounce">
                    🤖
                  </div>
                  <span className="italic">TravelAI is thinking...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Chips */}
            <div className="p-2 px-3 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800 overflow-x-auto flex items-center space-x-1.5">
              {quickPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/10 hover:text-amber-500 text-[11px] text-slate-600 dark:text-slate-300 font-medium rounded-full whitespace-nowrap transition-colors shrink-0"
                >
                  💡 {prompt}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center space-x-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Indian hotels, places, budget..."
                className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="p-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-md disabled:opacity-50 transition-transform active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
