import { HeroScrollAnimation } from './HeroScrollAnimation';
import { siteConfig } from '../config/site';
import { ArrowDown, Coffee, Award, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <>
      {/* 180-Frame Apple-Style Interactive Scroll Hero */}
      <HeroScrollAnimation />

      {/* Seamless Transition Strip into the Café Experience */}
      <div className="bg-[#FDFBF7] border-b border-stone-200/80 py-12 relative z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
            {siteConfig.stats.map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 ${idx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''}`}
              >
                <div className="w-12 h-12 rounded-full bg-[#BC5A36]/10 flex items-center justify-center text-[#BC5A36] shrink-0">
                  {idx === 0 && <Coffee className="w-5 h-5" />}
                  {idx === 1 && <Sparkles className="w-5 h-5" />}
                  {idx === 2 && <Award className="w-5 h-5" />}
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#21130D] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#6B554B] tracking-wide uppercase mt-0.5 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quiet editorial quote linking to philosophy */}
          <div className="mt-8 pt-6 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B554B] gap-3">
            <span className="italic text-center sm:text-left">
              “Roasting small lots twice weekly for peak aromatic sweetness at our Jubilee Hills roastery.”
            </span>
            <a
              href="#story"
              className="inline-flex items-center gap-1.5 font-semibold text-[#BC5A36] hover:text-[#9E4524] transition-colors uppercase tracking-wider text-[11px]"
            >
              <span>Explore our philosophy</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
