import { useState, useMemo } from 'react';
import { MessageCircle, Check, Sparkles } from 'lucide-react';
import { siteConfig, MenuItem } from '../config/site';
import { ImageWithFallback } from './ImageWithFallback';

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') {
      return siteConfig.menu;
    }
    return siteConfig.menu.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleWhatsAppOrder = (item: MenuItem) => {
    const text = `Hello The Daily Grind! I'd like to order / ask about the *${item.name}* (₹${item.price}).`;
    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="menu" className="py-20 md:py-28 bg-[#F8F5EE] border-t border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="text-xs uppercase tracking-widest text-[#BC5A36] font-semibold mb-2">
            Seasonal Offerings
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#21130D] text-balance">
            Crafted for the discerning palate.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-4 leading-relaxed">
            All espresso extractions are weighed to the 0.1g. Milk is sourced from local pasture-raised cows or organic oat milk, steamed to silky microfoam.
          </p>
        </div>

        {/* Category Tabs / Filter Bar (Segmented Controls) */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#ECE5DC]/70 rounded-sm mb-12 max-w-fit">
          {siteConfig.categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 rounded-xs whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'bg-[#21130D] text-white shadow-xs'
                    : 'text-[#3D261C] hover:text-[#21130D] hover:bg-stone-200/60'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Menu Grid: 3-column desktop layout with clean cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="group bg-[#FDFBF7] border border-stone-200/80 rounded-xs overflow-hidden flex flex-col hover:border-[#BC5A36]/40 transition-all duration-300 hover:shadow-md"
            >
              {/* Product Imagery */}
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  fallbackTitle={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {item.isSignature && (
                  <div className="absolute top-3 left-3 bg-[#21130D]/90 backdrop-blur-xs text-[#FDFBF7] text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#E07D5A]" />
                    <span>Signature</span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1">
                {/* Unboxed Metadata row */}
                <div className="flex items-center gap-2 text-xs text-[#6B554B] mb-2">
                  <span className="font-medium text-[#BC5A36]">{item.category}</span>
                  {item.originOrHighlight && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{item.originOrHighlight}</span>
                    </>
                  )}
                  {item.dietary && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{item.dietary}</span>
                    </>
                  )}
                </div>

                {/* Title & Price */}
                <div className="flex items-baseline justify-between gap-4 mb-2">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#21130D] group-hover:text-[#BC5A36] transition-colors">
                    {item.name}
                  </h3>
                  <span className="font-serif text-lg font-bold text-[#21130D] tabular-nums whitespace-nowrap shrink-0">
                    ₹{item.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-6 flex-1">
                  {item.description}
                </p>

                {/* Bottom Order Link */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    className="text-xs font-semibold text-[#6B554B] hover:text-[#21130D] transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    type="button"
                    onClick={() => handleWhatsAppOrder(item)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#21130D] bg-stone-100 hover:bg-[#BC5A36] hover:text-white rounded-xs transition-colors duration-200"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#25D366] group-hover:text-inherit" />
                    <span>Order</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-xs text-[#6B554B]">
          <span>Prices are inclusive of all local taxes. Alternative plant milks available on request at no extra charge.</span>
        </div>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21130D]/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FDFBF7] max-w-lg w-full rounded-sm overflow-hidden shadow-2xl border border-stone-200">
            <div className="relative aspect-[16/9] bg-stone-200">
              <ImageWithFallback
                src={selectedItem.image}
                alt={selectedItem.name}
                fallbackTitle={selectedItem.name}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedItem(null)}
                className="absolute top-3 right-3 bg-white/90 text-stone-800 p-1.5 rounded-full hover:bg-white text-xs font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="text-xs uppercase tracking-wider text-[#BC5A36] font-semibold mb-1">
                {selectedItem.category} {selectedItem.dietary && `· ${selectedItem.dietary}`}
              </div>
              <div className="flex justify-between items-baseline mb-3">
                <h3 className="font-serif text-2xl font-bold text-[#21130D]">{selectedItem.name}</h3>
                <span className="font-serif text-2xl font-bold text-[#BC5A36]">₹{selectedItem.price}</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">
                {selectedItem.description}
              </p>
              {selectedItem.originOrHighlight && (
                <div className="bg-[#F8F5EE] p-3 rounded-xs text-xs text-[#6B554B] mb-6 flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#BC5A36] shrink-0" />
                  <span>{selectedItem.originOrHighlight}</span>
                </div>
              )}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    handleWhatsAppOrder(selectedItem);
                    setSelectedItem(null);
                  }}
                  className="flex-1 py-3 px-4 bg-[#21130D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#BC5A36] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Order this on WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="py-3 px-5 border border-stone-300 text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-stone-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
