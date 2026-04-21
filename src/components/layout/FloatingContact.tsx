"use client";

import { useState } from "react";
import { MessageCircle, X, Mail, HelpCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const waNumber = "6281234567890"; 
  const waMessage = "Halo WeRent, saya butuh bantuan mengenai koleksi...";

  return (
    <div className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex flex-col items-end gap-4">
      
      {/* Dropup Menu */}
      <div 
        className={`flex flex-col gap-2 transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Tombol FAQ */}
        <Link 
          href="/faq" 
          className="flex items-center justify-between gap-6 bg-white/90 backdrop-blur-sm border border-neutral-200 px-4 py-3 hover:bg-neutral-50 hover:pr-6 transition-all duration-300 shadow-sm"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-900 mt-0.5">FAQ</span>
          <HelpCircle className="h-4 w-4 text-neutral-500" strokeWidth={1.5} />
        </Link>
        
        {/* Tombol Email */}
        <a 
          href="mailto:support@werent.com"
          className="flex items-center justify-between gap-6 bg-white/90 backdrop-blur-sm border border-neutral-200 px-4 py-3 hover:bg-neutral-50 hover:pr-6 transition-all duration-300 shadow-sm"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-900 mt-0.5">Email</span>
          <Mail className="h-4 w-4 text-neutral-500" strokeWidth={1.5} />
        </a>

        <a 
          href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-6 bg-neutral-900 px-4 py-3 hover:bg-neutral-800 hover:pr-6 transition-all duration-300 shadow-md"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white mt-0.5">WhatsApp</span>
          <Phone className="h-4 w-4 text-white" strokeWidth={1.5} />
        </a>
      </div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
          isOpen 
            ? "bg-neutral-200 text-neutral-900 rotate-90" 
            : "bg-emerald-700 text-white hover:scale-105 hover:bg-emerald-800"
        }`}
        aria-label="Contact Support"
      >
        {isOpen ? (
          <X className="h-6 w-6 -rotate-90 transition-transform duration-300" strokeWidth={1.5} />
        ) : (
          <MessageCircle className="h-6 w-6 transition-transform duration-300" strokeWidth={1.5} />
        )}
      </button>
    </div>
  );
}