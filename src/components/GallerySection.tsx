import { useState } from 'react';
import { Instagram, ArrowUpRight, Maximize2, X, Compass, LayoutGrid } from 'lucide-react';
import { siteConfig, GalleryItem } from '../config/site';
import { InfiniteSpiral } from './ui/InfiniteSpiral';
import { ImageWithFallback } from './ImageWithFallback';

export function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);
  const [viewMode, setViewMode] = useState<'spiral' | 'grid'>('spiral');

  // Spiral items formatted with high quality cafe photography
  const spiralItems = [
    {
      src: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80&w=800",
      alt: "Espresso Extraction",
      label: "Espresso Bar"
    },
    {
      src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
      alt: "Sunlit Lounge",
      label: "Sunken Lounge"
    },
    {
      src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
      alt: "V60 Pour Over",
      label: "Manual Brew"
    },
    {
      src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800",
      alt: "Fresh Morning Viennoiserie",
      label: "Artisanal Bakery"
    },
    {
      src: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800",
      alt: "Coffee Library & Mezzanine",
      label: "Quiet Work Mezzanine"
    },
    {
      src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=800",
      alt: "Outdoor Terracotta Courtyard",
      label: "Garden Patio"
    },
    {
      src: "https://images.unsplash.com/photo-1534706936160-d5ee67737049?auto=format&fit=crop&q=80&w=800",
      alt: "Signature Cortado",
      label: "Cortado Craft"
    },
    {
      src: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800",
      alt: "Iced Sea Salt Latte",
      label: "Cold Bar"
    }
  ];

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#F8F5EE] border-t border-stone-200/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#BC5A36] font-semibold mb-2">
              Atmosphere & Space
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#21130D]">
              Moments at The Daily Grind.
            </h2>
            <p className="text-stone-600 text-sm sm:text-base mt-2 max-w-lg">
              Designed with warm terracotta textures, acoustic damping for quiet conversation, and sunlight that moves across oak tables.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 self-start md:self-end">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#ECE5DC] rounded-xs border border-stone-300/80">
              <button
                type="button"
                onClick={() => setViewMode('spiral')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors ${
                  viewMode === 'spiral'
                    ? 'bg-[#21130D] text-white shadow-xs'
                    : 'text-[#3D261C] hover:text-[#21130D]'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>3D Helix</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-[#21130D] text-white shadow-xs'
                    : 'text-[#3D261C] hover:text-[#21130D]'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Gallery Grid</span>
              </button>
            </div>

            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#21130D] bg-[#ECE5DC] hover:bg-[#BC5A36] hover:text-white rounded-xs transition-colors duration-200"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3D Helix Spiral View */}
        {viewMode === 'spiral' && (
          <div className="relative overflow-hidden py-4">
            {/* Subtle top indicator */}
            <div className="flex items-center justify-between mb-4 px-2 text-xs text-[#6B554B]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#BC5A36] animate-pulse" />
                <span className="uppercase tracking-widest text-[11px] font-semibold text-[#BC5A36]">
                  Continuous 3D Helix · Revolving Automatically
                </span>
              </div>
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className="text-[#BC5A36] hover:text-[#9E4524] hover:underline font-medium text-xs hidden sm:inline"
              >
                Switch to standard grid view →
              </button>
            </div>

            <div className="h-[520px] sm:h-[620px] relative w-full overflow-hidden">
              <InfiniteSpiral
                items={spiralItems}
                animationMode="auto"
                speed={0.45}
                radius={200}
                cardWidth={140}
                cardHeight={140}
                verticalSpacing={68}
                perspective={1000}
                cardRadius={14}
                centerScale={1.25}
                edgeBlur={3}
                cardsPerTurn={7}
                pauseOnHover={false}
              />
            </div>
          </div>
        )}

        {/* Static / Standard Gallery Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {siteConfig.gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedPhoto(item)}
                className="group relative aspect-[4/3] rounded-xs overflow-hidden cursor-pointer bg-stone-200 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  fallbackTitle={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Hover overlay with title & caption */}
                <div className="absolute inset-0 bg-[#21130D]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between text-white">
                  <div className="self-end">
                    <span className="p-2 bg-white/20 rounded-full inline-block backdrop-blur-xs">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div>
                    <h4 className="font-serif text-lg font-bold">{item.title}</h4>
                    <p className="text-xs text-white/80 mt-1">{item.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#21130D]/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full bg-[#FDFBF7] rounded-sm overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/90 text-[#21130D] rounded-full hover:bg-white shadow"
              aria-label="Close photo"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>
            <div className="p-6 bg-[#FDFBF7] flex justify-between items-center">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#21130D]">{selectedPhoto.title}</h3>
                <p className="text-stone-600 text-xs sm:text-sm mt-1">{selectedPhoto.caption}</p>
              </div>
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-[#BC5A36] hover:underline flex items-center gap-1 shrink-0"
              >
                <span>View on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
