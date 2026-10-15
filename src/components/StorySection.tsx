import { ImageWithFallback } from './ImageWithFallback';

export function StorySection() {
  const pillars = [
    { num: '01', title: 'Estate Direct Trade', desc: 'Sourced from multi-generational shade-grown lots in Chikmagalur.' },
    { num: '02', title: 'Weekly Micro-Roasts', desc: 'Crafted in small batches to preserve floral brightness and natural sweetness.' },
    { num: '03', title: 'Fresh 4-Hr Viennoiserie', desc: 'Hand-laminated using Normandy butter, baked fresh throughout the day.' },
  ];

  return (
    <section id="story" className="py-16 md:py-24 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Visual Documentary */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-xs overflow-hidden shadow-lg bg-stone-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=1000"
                alt="Barista brewing manual V60 pour over"
                fallbackTitle="Barista Craft"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#21130D]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                <span className="text-[11px] uppercase tracking-widest text-[#E07D5A] font-semibold">
                  The Roaster's Craft
                </span>
                <span className="font-serif text-lg font-medium mt-0.5">
                  Small-batch drum roasted weekly
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Concise Editorial Story */}
          <div className="lg:col-span-7">
            <div className="text-xs uppercase tracking-widest text-[#BC5A36] font-semibold mb-2">
              Our Philosophy
            </div>
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#21130D] leading-tight mb-4 text-balance">
              Brewed with intention. Served with stillness.
            </h2>

            <p className="text-stone-700 text-sm sm:text-base leading-relaxed mb-8 max-w-xl">
              The Daily Grind was conceived as an antidote to rush. We celebrate single-origin Indian Arabica, precision water chemistry, and the quiet ritual of slowing down.
            </p>

            {/* 3 Concise Pillars */}
            <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-stone-200">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="space-y-1.5">
                  <span className="font-serif text-sm font-bold text-[#BC5A36] tabular-nums">
                    {pillar.num}.
                  </span>
                  <h3 className="font-serif text-sm font-bold text-[#21130D]">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
