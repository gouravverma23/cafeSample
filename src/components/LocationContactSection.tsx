import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, MessageCircle, Send, Check } from 'lucide-react';
import { siteConfig } from '../config/site';

export function LocationContactSection() {
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryDate, setInquiryDate] = useState('');
  const [inquiryGuests, setInquiryGuests] = useState('2');
  const [inquiryNote, setInquiryNote] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleQuickInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hi The Daily Grind! Table / Visit inquiry from *${inquiryName || 'Guest'}* for *${inquiryGuests} guests* on *${inquiryDate || 'Today'}*. Note: ${inquiryNote || 'None'}`;
    const url = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="location" className="py-20 md:py-28 bg-[#F8F5EE] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="max-w-2xl mb-14">
          <div className="text-xs uppercase tracking-widest text-[#BC5A36] font-semibold mb-2">
            Visit & Connect
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#21130D]">
            Pull up a chair. Stay a while.
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
            Located in the serene leafy bylanes of Jubilee Hills with valet parking and dedicated outdoor seating.
          </p>
        </div>

        {/* 2-Column Split: Info & Table Inquiry on Left, Google Maps on Right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Details & Booking form */}
          <div className="lg:col-span-6 space-y-10">
            {/* Contact details list */}
            <div className="grid sm:grid-cols-2 gap-8">
              {/* Address */}
              <div className="flex gap-4">
                <div className="p-3 bg-[#ECE5DC] text-[#BC5A36] rounded-xs shrink-0 h-fit">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#21130D] text-base mb-1">
                    Our Address
                  </h4>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed mb-2">
                    {siteConfig.contact.address}
                  </p>
                  <a
                    href={siteConfig.contact.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#BC5A36] hover:underline"
                  >
                    <span>Get Directions</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-4">
                <div className="p-3 bg-[#ECE5DC] text-[#BC5A36] rounded-xs shrink-0 h-fit">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#21130D] text-base mb-1">
                    Service Hours
                  </h4>
                  {siteConfig.hours.map((h, i) => (
                    <div key={i} className="text-xs sm:text-sm text-stone-600 mb-1">
                      <div className="font-medium text-[#21130D]">{h.days}</div>
                      <div className="text-stone-500 tabular-nums">{h.hours}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="p-3 bg-[#ECE5DC] text-[#BC5A36] rounded-xs shrink-0 h-fit">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#21130D] text-base mb-1">
                    Call Directly
                  </h4>
                  <p className="text-stone-600 text-xs sm:text-sm mb-2">
                    For private cuppings or reservations.
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.phone.replace(/\s+/g, '')}`}
                    className="text-xs sm:text-sm font-semibold text-[#21130D] hover:text-[#BC5A36] transition-colors"
                  >
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="p-3 bg-[#ECE5DC] text-[#BC5A36] rounded-xs shrink-0 h-fit">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-[#21130D] text-base mb-1">
                    Concierge Desk
                  </h4>
                  <p className="text-stone-600 text-xs sm:text-sm mb-2">
                    Events, media & catering inquiries.
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-xs sm:text-sm font-semibold text-[#21130D] hover:text-[#BC5A36] transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Table / Reservation WhatsApp Messenger Box */}
            <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-xs border border-stone-200 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#21130D]">
                    Inquire About a Table or Event
                  </h4>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Sends directly to our concierge team on WhatsApp for prompt response.
                  </p>
                </div>
                <MessageCircle className="w-6 h-6 text-[#25D366] shrink-0" />
              </div>

              <form onSubmit={handleQuickInquiry} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B554B] mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priya Sharma"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F5EE] border border-stone-300 rounded-xs focus:outline-none focus:border-[#BC5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B554B] mb-1">
                      Number of Guests
                    </label>
                    <select
                      value={inquiryGuests}
                      onChange={(e) => setInquiryGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F5EE] border border-stone-300 rounded-xs focus:outline-none focus:border-[#BC5A36]"
                    >
                      <option value="1">1 person (Solo Coffee / Work)</option>
                      <option value="2">2 guests</option>
                      <option value="3-4">3–4 guests</option>
                      <option value="5+">5+ guests (Group table)</option>
                    </select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B554B] mb-1">
                      Preferred Date & Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Tomorrow at 5:00 PM"
                      value={inquiryDate}
                      onChange={(e) => setInquiryDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F5EE] border border-stone-300 rounded-xs focus:outline-none focus:border-[#BC5A36]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#6B554B] mb-1">
                      Any Note or Preferences
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Outdoor patio / Tasting flight"
                      value={inquiryNote}
                      onChange={(e) => setInquiryNote(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-[#F8F5EE] border border-stone-300 rounded-xs focus:outline-none focus:border-[#BC5A36]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#21130D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#BC5A36] transition-colors flex items-center justify-center gap-2"
                >
                  {isSubmitted ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Inquiry Sent! Opening Chat...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Instant Inquiry via WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Google Maps Embed with Clean Framing */}
          <div className="lg:col-span-6 flex flex-col h-full">
            <div className="bg-[#ECE5DC] p-2 rounded-xs border border-stone-300/80 shadow-md">
              <div className="relative w-full h-[460px] rounded-xs overflow-hidden bg-stone-200">
                <iframe
                  title="The Daily Grind Google Map Location"
                  src={siteConfig.contact.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-stone-500 px-1">
              <span>GPS: 17.4360° N, 78.4045° E (Jubilee Hills, Hyderabad)</span>
              <a
                href={siteConfig.contact.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#BC5A36] hover:underline flex items-center gap-1"
              >
                <span>Open in Google Maps</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
