"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, MessageCircle, Globe, X, HelpCircle } from 'lucide-react';

const FloatingMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Container Menu dengan AnimatePresence untuk animasi exit */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.3 }}
            className="w-80 rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[#6322d3]">Du hast Fragen?</h3>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-[#6322d3] hover:bg-purple-50 rounded-full p-1 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex flex-col gap-5">
              <MenuLink icon={<Mail size={20} />} label="Mail schreiben" />
              <MenuLink icon={<MessageCircle size={20} />} label="WhatsApp senden" />
              <MenuLink icon={<Globe size={20} />} label="Aktuelle Angebote" />
            </div>

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 w-full rounded-2xl bg-[#6322d3] py-4 font-bold text-white shadow-lg transition-colors hover:bg-[#4f1ab3]"
            >
              Unterstützung Anfordern
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Button */}
      <motion.button
        layout
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-colors duration-300 ${
          isOpen ? 'bg-[#6322d3] text-white' : 'bg-white text-[#6322d3]'
        }`}
      >
        <motion.div
          initial={false}
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? <X size={32} /> : <HelpCircle size={32} />}
        </motion.div>
      </motion.button>
    </div>
  );
};


const MenuLink = ({ icon, label }: { icon: React.ReactNode, label: string }) => (
  <button className="group flex w-full items-center gap-4 border-b border-gray-100 pb-3 text-[#6322d3] transition-all hover:opacity-60">
    <span className="text-[#6322d3]">{icon}</span>
    <span className="font-semibold text-gray-800 group-hover:text-[#6322d3]">{label}</span>
  </button>
);

export default FloatingMenu;