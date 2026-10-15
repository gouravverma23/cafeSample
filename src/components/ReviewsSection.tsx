import { Star, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { siteConfig } from '../config/site';
import { TestimonialsColumn, Testimonial } from './ui/testimonials-columns-1';

export function ReviewsSection() {
  const allReviews: Testimonial[] = [
    {
      text: "The Cortado here is genuinely the most balanced in Hyderabad. You can actually taste the floral notes in their washed Chikmagalur lot.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      name: "Aditi Ramanathan",
      role: "Architect & Regular",
      rating: 5,
    },
    {
      text: "Finally a café that takes water chemistry and roast dates seriously. Their V60 single origin was immaculate, crisp with blackcurrant notes.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      name: "Vikram Sengupta",
      role: "Specialty Coffee Enthusiast",
      rating: 5,
    },
    {
      text: "My sanctuary for quiet creative work. The playlists are curated, the iced sea salt latte is addictive, and the staff are masters of their craft.",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200",
      name: "Meera Krishnan",
      role: "Product Designer",
      rating: 5,
    },
    {
      text: "The laminated pastries rival Paris boulangeries. The dark chocolate babka twist has incredible depth with Kerala single-estate cacao.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
      name: "Kabir Anand",
      role: "Food Columnist",
      rating: 5,
    },
    {
      text: "The morning light filtering through the courtyard trees and the aroma of fresh drum roasting make this the best 8 AM ritual.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      name: "Rohini Deshmukh",
      role: "Author & Regular",
      rating: 5,
    },
    {
      text: "High-speed fiber internet, dedicated mezzanine power points, and phenomenal cascara elixir to power long strategy sessions.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      name: "Siddharth Rao",
      role: "Founder, Peak Studio",
      rating: 5,
    },
    {
      text: "Appreciate their ethical direct trade transparency with coffee smallholders in the Baba Budan Giri ranges. A benchmark café.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      name: "Dr. Ananya Iyer",
      role: "Sustainability Researcher",
      rating: 5,
    },
    {
      text: "The aesthetic restraint is breathtaking. No loud noise, no gimmicks—just sublime coffee and sourdough in an architectural space.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
      name: "Devansh Mehta",
      role: "Creative Director",
      rating: 5,
    },
    {
      text: "The Hibiscus & Rose cold steep is pure botanical bliss after my morning yoga practice. Absolutely unmatched freshness.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200",
      name: "Tara Nambiar",
      role: "Yoga Instructor",
      rating: 5,
    },
  ];

  const firstColumn = allReviews.slice(0, 3);
  const secondColumn = allReviews.slice(3, 6);
  const thirdColumn = allReviews.slice(6, 9);

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
        >
          <div>
            <div className="text-xs uppercase tracking-widest text-[#BC5A36] font-semibold mb-2">
              Guest Impressions
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#21130D]">
              Loved by coffee purists and creative wanderers.
            </h2>
            <div className="flex items-center gap-3 mt-3 text-sm text-[#3D261C]">
              <div className="flex text-[#C88D4A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#21130D]">4.9 out of 5.0</span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span className="text-stone-500">Based on 620+ verified Google Reviews</span>
            </div>
          </div>

          <a
            href={siteConfig.socials.googleReview}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start md:self-end px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#21130D] hover:bg-[#BC5A36] rounded-xs transition-colors duration-200 shadow-xs shrink-0"
          >
            <span>Review Us on Google</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* Animated Infinite Testimonial Columns with Vertical Mask */}
        <div className="relative">
          <div className="flex justify-center gap-6 mt-6 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={16} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={21} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={18} />
          </div>

          {/* Quiet bottom footnote */}
          <div className="mt-8 text-center text-xs text-stone-500">
            Reviews stream continuously · Hover over any guest card to pause
          </div>
        </div>
      </div>
    </section>
  );
}
