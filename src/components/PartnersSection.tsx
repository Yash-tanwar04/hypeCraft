import React, { useState } from 'react';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export interface Partner {
  id: string;
  name: string;
  tagline?: string;
  category: 'Hospitality & Dining' | 'Real Estate & Infrastructure' | 'Entertainment & Media';
  description: string;
  badgeColor: string;
  logoSrc: string;
  logo: React.ReactNode;
}

export const PARTNERS_DATA: Partner[] = [
  {
    id: 'my-asiana',
    name: 'My Asiana',
    tagline: 'Pan-Asian Culinary Journey',
    category: 'Hospitality & Dining',
    description: 'Contemporary Pan-Asian and authentic oriental cuisine brand celebrated for flavorful noodle bowls, dim sums, and vibrant culinary storytelling.',
    badgeColor: '#BE1E2D',
    logoSrc: '/images/partners/my asiana.jpeg',
    logo: (
      <div className="w-full h-full flex items-center justify-center p-2 bg-white">
        <img
          src="/images/partners/my asiana.jpeg"
          alt="My Asiana"
          referrerPolicy="no-referrer"
          className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
  },
  {
    id: 'navraj',
    name: 'Navraj',
    tagline: 'Make It Big',
    category: 'Real Estate & Infrastructure',
    description: 'Premier luxury real estate and infrastructure development conglomerate creating landmark residential and commercial architectural masterworks across Gurugram.',
    badgeColor: '#A68A68',
    logoSrc: '/images/partners/Navraj.jpeg',
    logo: (
      <div className="w-full h-full flex items-center justify-center p-2 bg-white">
        <img
          src="/images/partners/Navraj.jpeg"
          alt="Navraj"
          referrerPolicy="no-referrer"
          className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
  },
  {
    id: 'village-food-courts',
    name: 'Village Food Courts (VFC)',
    tagline: 'Highway Hospitality & Food Hubs',
    category: 'Hospitality & Dining',
    description: 'Iconic highway retail and hospitality ecosystem revolutionizing roadside food court destinations with curated national restaurant brands and modern leisure spaces.',
    badgeColor: '#18181B',
    logoSrc: '/images/partners/village_food_courts_logo.jpeg',
    logo: (
      <div className="w-full h-full flex items-center justify-center p-2 bg-white">
        <img
          src="/images/partners/village_food_courts_logo.jpeg"
          alt="Village Food Courts"
          referrerPolicy="no-referrer"
          className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
  },
  {
    id: 'cineport-cinemas',
    name: 'Cineport Cinemas',
    tagline: 'Next-Gen Multiplex Experience',
    category: 'Entertainment & Media',
    description: 'Next-generation luxury cinema chain delivering state-of-the-art cinematic audiovisual projection, immersive Dolby Atmos sound, and premium moviegoing comfort.',
    badgeColor: '#071936',
    logoSrc: '/images/partners/Cineport cinemas.png',
    logo: (
      <div className="w-full h-full flex items-center justify-center p-2 bg-white">
        <img
          src="/images/partners/Cineport cinemas.png"
          alt="Cineport Cinemas"
          referrerPolicy="no-referrer"
          className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
  },
  {
    id: 'gateway-of-south',
    name: 'Gateway of South',
    tagline: 'Authentic Southern Heritage Dining',
    category: 'Hospitality & Dining',
    description: 'Premier culinary destination bringing the rich coastal spices, traditional recipes, filter coffees, and authentic gastronomic legacies of South India.',
    badgeColor: '#F59E0B',
    logoSrc: '/images/partners/Gateway of south.jpeg',
    logo: (
      <div className="w-full h-full flex items-center justify-center p-2 bg-white">
        <img
          src="/images/partners/Gateway of south.jpeg"
          alt="Gateway of South"
          referrerPolicy="no-referrer"
          className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
  },
  {
    id: 'gateway-of-punjab',
    name: 'Gateway of Punjab',
    tagline: 'Royal Flavors of Punjab & Highway Dhaba',
    category: 'Hospitality & Dining',
    description: 'Iconic North Indian dining destination showcasing authentic clay-tandoor delicacies, slow-cooked gravies, Punjabi hospitality, and vibrant culinary culture.',
    badgeColor: '#372963',
    logoSrc: '/images/partners/Gateway of punjab.jpeg',
    logo: (
      <div className="w-full h-full flex items-center justify-center p-2 bg-white">
        <img
          src="/images/partners/Gateway of punjab.jpeg"
          alt="Gateway of Punjab"
          referrerPolicy="no-referrer"
          className="max-h-20 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ),
  },
];

export const PartnersSection: React.FC<{ showAllHeader?: boolean }> = ({ showAllHeader = true }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Hospitality & Dining',
    'Real Estate & Infrastructure',
    'Entertainment & Media',
  ];

  const filteredPartners = activeCategory === 'All'
    ? PARTNERS_DATA
    : PARTNERS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="our-partners" className="py-24 bg-[#FAFAF7] border-y border-[#E9E9E4] relative overflow-hidden">
      
      {/* Decorative Ambient Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#071936_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 space-y-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <div className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#D9A21B]" />
              {showAllHeader ? 'OUR PARTNERS & TRUSTED CLIENTS' : 'PARTNERSHIPS'}
            </div>
            
            <h2 className="text-3xl md:text-5xl font-serif text-[#071936] leading-tight">
              Brands that trust our <br />
              <span className="italic text-[#D9A21B]">strategy and narrative.</span>
            </h2>

            <p className="text-sm md:text-base text-[#071936]/75 font-sans leading-relaxed">
              From flagship hospitality chains and luxury infrastructure conglomerates to entertainment multiplexes, we engineer enduring reputation, visibility, and market resonance.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-4 bg-white border border-[#E9E9E4] p-4 px-6 rounded-xs shadow-xs self-start md:self-auto">
            <div className="w-10 h-10 rounded-full bg-[#D9A21B]/15 text-[#071936] flex items-center justify-center font-serif font-bold text-lg">
              6+
            </div>
            <div>
              <p className="text-xs font-serif font-bold text-[#071936]">Enterprise Partners</p>
              <p className="text-[11px] text-[#071936]/60">Hospitality • Infrastructure • Media</p>
            </div>
          </div>
        </div>

        {/* Filter Category Pills */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E9E9E4] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#071936] text-white border border-[#071936] shadow-xs'
                  : 'bg-white text-[#071936]/70 border border-[#E9E9E4] hover:border-[#D9A21B] hover:text-[#071936]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white border border-[#E9E9E4] hover:border-[#D9A21B] p-7 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 relative"
            >
              {/* Top Row: Logo Badge & Category */}
              <div className="space-y-6">
                
                {/* Logo Showcase Area */}
                <div className="h-28 w-full bg-[#FAFAF7] border border-[#E9E9E4] flex items-center justify-center p-4 overflow-hidden rounded-xs group-hover:border-[#D9A21B]/50 transition-colors">
                  {partner.logo}
                </div>

                {/* Category Indicator */}
                <div className="border-b border-[#E9E9E4]/80 pb-3">
                  <span className="text-[10px] font-bold tracking-widest text-[#D9A21B] uppercase">
                    {partner.category}
                  </span>
                </div>

                {/* Brand Name & Tagline */}
                <div className="space-y-1">
                  <h3 className="text-xl font-serif text-[#071936] group-hover:text-[#D9A21B] transition-colors">
                    {partner.name}
                  </h3>
                  {partner.tagline && (
                    <p className="text-xs font-serif italic text-[#071936]/70">
                      "{partner.tagline}"
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-[#071936]/75 font-sans leading-relaxed">
                  {partner.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="pt-6 mt-6 border-t border-[#E9E9E4] flex items-center justify-between text-xs">
                <span className="text-[11px] font-semibold text-[#071936]/60 uppercase tracking-wider">
                  Strategic Partner
                </span>
                <span className="w-7 h-7 rounded-full border border-[#E9E9E4] group-hover:border-[#D9A21B] group-hover:bg-[#D9A21B] group-hover:text-[#071936] flex items-center justify-center text-xs transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Partner Logo Strip Ticker */}
        <div className="bg-[#071936] text-white p-6 md:p-8 rounded-xs border border-[#071936] overflow-hidden space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <p className="text-[11px] font-semibold tracking-[0.25em] text-[#D9A21B] uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              PORTFOLIO OF COLLABORATIONS
            </p>
            <p className="text-xs text-white/60 font-serif">
              Transforming enterprise presence across public & commercial domains
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 pt-2">
            {PARTNERS_DATA.map((partner) => (
              <div
                key={`strip-${partner.id}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 p-3 rounded-xs flex flex-col items-center justify-center text-center transition-colors group cursor-default"
              >
                <span className="text-xs font-serif font-bold text-white group-hover:text-[#D9A21B] transition-colors">
                  {partner.name}
                </span>
                <span className="text-[9px] text-white/50 tracking-wider uppercase mt-0.5">
                  {partner.category.split('&')[0].trim()}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
