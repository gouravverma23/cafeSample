import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { siteConfig } from '../config/site';

export function FloatingWhatsApp() {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappPrefilledMessage)}`;

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Desktop Tooltip Pill */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#21130D] text-[#ECE5DC] text-xs py-2 px-3.5 rounded-sm shadow-lg border border-stone-700 animate-in fade-in slide-in-from-right duration-300">
          <span>Table inquiry or fresh beans?</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-stone-400 hover:text-white ml-1"
            aria-label="Dismiss message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-108 transition-all duration-200 group focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <MessageCircle className="w-7 h-7 transition-transform group-hover:rotate-6" />
      </a>
    </div>
  );
}
