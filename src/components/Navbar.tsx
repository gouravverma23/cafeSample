import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../config/site';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverDarkHero, setIsOverDarkHero] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const heroElem = document.getElementById('hero');
      if (heroElem) {
        const rect = heroElem.getBoundingClientRect();
        setIsOverDarkHero(rect.bottom > 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Menu', href: '#menu' },
    { label: 'Philosophy', href: '#story' },
    { label: 'Atmosphere', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location', href: '#location' },
  ];

  const headerBgClass = isOverDarkHero
    ? isScrolled
      ? 'bg-[#1A0E0A]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-md'
      : 'bg-[#1A0E0A]/40 backdrop-blur-xs border-b border-white/5 py-4 sm:py-5'
    : isScrolled
      ? 'bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#21130D]/10 py-3 shadow-xs'
      : 'bg-[#FDFBF7]/60 backdrop-blur-xs border-b border-transparent py-4 sm:py-5';

  const logoColorClass = isOverDarkHero
    ? 'text-white hover:text-[#E07D5A]'
    : 'text-[#21130D] hover:text-[#BC5A36]';

  const navLinkColorClass = isOverDarkHero
    ? 'text-white/80 hover:text-white'
    : 'text-[#3D261C] hover:text-[#BC5A36]';

  const underlineColorClass = isOverDarkHero ? 'bg-[#E07D5A]' : 'bg-[#BC5A36]';

  const buttonClass = isOverDarkHero
    ? 'bg-[#BC5A36] text-white hover:bg-[#9E4524]'
    : 'bg-[#21130D] text-white hover:bg-[#BC5A36]';

  const hamburgerColorClass = isOverDarkHero ? 'text-white' : 'text-[#21130D]';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBgClass}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#"
          className={`font-serif text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap shrink-0 transition-colors ${logoColorClass}`}
        >
          {siteConfig.name}
        </a>

        {/* Zone 2: Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`relative py-1 transition-colors whitespace-nowrap shrink-0 group ${navLinkColorClass}`}
            >
              {link.label}
              <span
                className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-200 group-hover:w-full ${underlineColorClass}`}
              />
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <a
            href={siteConfig.contact.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors duration-200 whitespace-nowrap shrink-0 shadow-sm ${buttonClass}`}
          >
            <span>Find Us</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-3 md:hidden">
          <a
            href={siteConfig.contact.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xs transition-colors ${buttonClass}`}
          >
            Find Us
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 transition-colors ${hamburgerColorClass}`}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-b px-6 py-6 shadow-xl animate-in fade-in slide-in-from-top duration-200 ${
          isOverDarkHero ? 'bg-[#1A0E0A] border-white/10 text-white' : 'bg-[#FDFBF7] border-[#21130D]/10 text-[#21130D]'
        }`}>
          <nav className="flex flex-col gap-4 text-base font-serif">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b transition-colors ${
                  isOverDarkHero
                    ? 'border-white/10 hover:text-[#E07D5A]'
                    : 'border-[#21130D]/5 hover:text-[#BC5A36]'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 pt-4 flex flex-col gap-3">
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.contact.whatsappPrefilledMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-xs font-semibold uppercase tracking-widest text-white bg-[#BC5A36] rounded-xs hover:bg-[#9E4524] transition-colors"
            >
              Order on WhatsApp
            </a>
            <div className={`text-xs text-center pt-2 ${isOverDarkHero ? 'text-white/60' : 'text-[#6B554B]'}`}>
              Open Today: 08:00 AM – 09:30 PM
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
