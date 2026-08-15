import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PARTNERS_DATA } from './PartnersSection';

export const HomePartnersPreview: React.FC = () => {
  return (
    <section id="our-partners" className="py-20 bg-[#E9E9E4]/30 border-y border-[#E9E9E4] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        
        {/* Header & Redirect CTA Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E9E9E4] pb-6">
          <div className="space-y-3 max-w-xl">
            <div className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#D9A21B]" />
              CLIENTS & STRATEGIC PARTNERS
            </div>
            <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">
              Trusted by industry leaders <br className="hidden sm:inline" />
              <span className="italic text-[#D9A21B]">across sectors.</span>
            </h2>
          </div>

          <Link
            to="/partners"
            className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#071936] text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#D9A21B] hover:text-[#071936] transition-all duration-300 group self-start md:self-auto shadow-xs"
          >
            <span>View All Partners</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Compact Logo Showcase Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {PARTNERS_DATA.map((partner) => (
            <Link
              key={partner.id}
              to="/partners"
              className="bg-white border border-[#E9E9E4] hover:border-[#D9A21B] p-4 flex flex-col items-center justify-between text-center transition-all duration-300 group hover:shadow-lg hover:-translate-y-1 rounded-xs aspect-square"
              title={`View ${partner.name} details`}
            >
              {/* Logo preview box */}
              <div className="w-full h-full flex items-center justify-center p-2">
                {partner.logo}
              </div>

              {/* Minimal Brand Label */}
              <div className="w-full pt-2 border-t border-[#E9E9E4]/60 flex items-center justify-between text-[10px] text-[#071936]/70 group-hover:text-[#071936]">
                <span className="font-semibold truncate">{partner.name}</span>
                <ArrowUpRight className="w-3 h-3 text-[#D9A21B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-1" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};
