import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building2, UtensilsCrossed, Film, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { PARTNERS_DATA } from '../components/PartnersSection';
import { CTASection } from '../components/CTASection';

export const Partners: React.FC = () => {
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
    <div className="pt-28 space-y-20">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="max-w-3xl space-y-6">
          <div className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D9A21B]" />
            ENTERPRISE ALLIANCES & PARTNERSHIPS
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
            Brands that trust our <br />
            <span className="italic text-[#D9A21B]">strategy and narrative.</span>
          </h1>
          <p className="text-lg md:text-xl font-serif text-[#071936]/80 leading-relaxed pt-2 font-light">
            We partner with visionary enterprises across hospitality, luxury infrastructure, multiplex entertainment, and consumer ecosystems to build enduring influence and commercial resonance.
          </p>
        </div>

        {/* Highlight Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-[#E9E9E4] mt-12">
          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#071936]">6+</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D9A21B]">Flagship Partners</p>
            <p className="text-[11px] text-[#071936]/60">Across hospitality & real estate</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#071936]">360°</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D9A21B]">Advisory Scope</p>
            <p className="text-[11px] text-[#071936]/60">Brand, PR, media & strategy</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#071936]">Pan-India</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D9A21B]">Reach & Footprint</p>
            <p className="text-[11px] text-[#071936]/60">National highway hubs & metros</p>
          </div>
          <div className="space-y-1">
            <span className="text-3xl md:text-4xl font-serif font-bold text-[#071936]">100%</span>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#D9A21B]">Strategic Alignment</p>
            <p className="text-[11px] text-[#071936]/60">Purpose-driven execution</p>
          </div>
        </div>
      </section>

      {/* PARTNERS GALLERY & CARDS */}
      <section className="bg-[#FAFAF7] border-y border-[#E9E9E4] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          {/* Controls & Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E9E9E4] pb-6">
            <div className="flex flex-wrap items-center gap-2">
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

            <span className="text-xs text-[#071936]/60 font-sans font-medium">
              Showing {filteredPartners.length} of {PARTNERS_DATA.length} Partners
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPartners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white border border-[#E9E9E4] hover:border-[#D9A21B] p-8 flex flex-col justify-between transition-all duration-300 group hover:shadow-xl hover:-translate-y-1 relative"
              >
                <div className="space-y-6">
                  {/* Logo Display Box */}
                  <div className="h-32 w-full bg-[#FAFAF7] border border-[#E9E9E4] flex items-center justify-center p-4 overflow-hidden rounded-xs group-hover:border-[#D9A21B]/50 transition-colors">
                    {partner.logo}
                  </div>

                  {/* Sector Badge */}
                  <div className="border-b border-[#E9E9E4]/80 pb-3">
                    <span className="text-[10px] font-bold tracking-widest text-[#D9A21B] uppercase">
                      {partner.category}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div className="space-y-1">
                    <h2 className="text-2xl font-serif text-[#071936] group-hover:text-[#D9A21B] transition-colors">
                      {partner.name}
                    </h2>
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

                {/* Footer Tag */}
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

          {/* Collaborative Strip */}
          <div className="bg-[#071936] text-white p-8 rounded-xs border border-[#071936] overflow-hidden space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.25em] text-[#D9A21B] uppercase flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  THE HYPECRAFT PARTNERSHIP ECOSYSTEM
                </p>
                <h3 className="text-xl font-serif text-white mt-1">Driving Market Value Through Unified Narrative</h3>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D9A21B] text-[#071936] text-xs font-bold tracking-wider uppercase hover:bg-white transition-colors self-start sm:self-auto"
              >
                <span>Partner With Us</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {PARTNERS_DATA.map((partner) => (
                <div
                  key={`full-strip-${partner.id}`}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 p-3.5 rounded-xs flex flex-col items-center justify-center text-center transition-colors"
                >
                  <span className="text-xs font-serif font-bold text-white">
                    {partner.name}
                  </span>
                  <span className="text-[9px] text-white/50 tracking-wider uppercase mt-1">
                    {partner.category.split('&')[0].trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <CTASection />

    </div>
  );
};
