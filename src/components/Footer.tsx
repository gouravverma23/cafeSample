import { Instagram, Facebook, Star, ArrowUp, MapPin, Phone, Mail } from 'lucide-react';
import { siteConfig } from '../config/site';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#21130D] text-[#ECE5DC] pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Main 4-column footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Column 1: Brand & Manifesto (4 cols) */}
          <div className="lg:col-span-4">
            <a href="#" className="font-serif text-2xl font-bold tracking-tight text-white block mb-4">
              {siteConfig.name}
            </a>
            <p className="text-sm text-stone-300/80 leading-relaxed max-w-sm mb-6">
              An artisanal specialty coffee house and micro-roastery celebrating single-origin shade-grown Indian beans, hand-laminated viennoiserie, and the quiet pleasure of slow mornings.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xs bg-white/5 hover:bg-[#BC5A36] text-white transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xs bg-white/5 hover:bg-[#BC5A36] text-white transition-colors"
                aria-label="Facebook page"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socials.googleReview}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-xs bg-white/5 hover:bg-[#BC5A36] text-white transition-colors"
                aria-label="Google reviews"
                title="Google Reviews"
              >
                <Star className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E07D5A] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <a href="#hero" className="text-stone-300 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="text-stone-300 hover:text-white transition-colors">Seasonal Menu</a>
              </li>
              <li>
                <a href="#story" className="text-stone-300 hover:text-white transition-colors">Our Philosophy</a>
              </li>
              <li>
                <a href="#gallery" className="text-stone-300 hover:text-white transition-colors">Atmosphere</a>
              </li>
              <li>
                <a href="#reviews" className="text-stone-300 hover:text-white transition-colors">Guest Reviews</a>
              </li>
              <li>
                <a href="#location" className="text-stone-300 hover:text-white transition-colors">Find Location</a>
              </li>
            </ul>
          </div>

          {/* Column 3: Hours (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E07D5A] mb-4">
              Service Hours
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              {siteConfig.hours.map((h, i) => (
                <div key={i}>
                  <div className="font-semibold text-white">{h.days}</div>
                  <div className="tabular-nums text-stone-400">{h.hours}</div>
                  <div className="text-[11px] text-stone-500 italic">{h.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Directions (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#E07D5A] mb-4">
              Concierge
            </h4>
            <div className="space-y-3 text-xs text-stone-300">
              <div className="flex gap-2.5 items-start">
                <MapPin className="w-4 h-4 text-[#BC5A36] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex gap-2.5 items-center">
                <Phone className="w-4 h-4 text-[#BC5A36] shrink-0" />
                <a href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex gap-2.5 items-center">
                <Mail className="w-4 h-4 text-[#BC5A36] shrink-0" />
                <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-white transition-colors">
                  {siteConfig.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & agency attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div>
            © {new Date().getFullYear()} {siteConfig.name}. Designed as an agency portfolio demonstration.
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
