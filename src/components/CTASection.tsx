import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const CTASection: React.FC = () => {
  return (
    <section className="py-24 md:py-36 bg-[#071936] text-[#FAFAF7] relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#D9A21B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto px-6 md:px-12 text-center space-y-8 relative z-10">
        
        <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
          05 / NEXT STEPS
        </p>

        <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-normal text-white leading-tight">
          Have something <br className="hidden md:block" />
          <span className="italic font-normal text-[#D9A21B]">worth saying?</span>
        </h2>

        <p className="text-[#FAFAF7]/80 text-base md:text-lg max-w-2xl mx-auto font-sans leading-relaxed">
          Let's build the strategy, story and creative system that makes it matter.
        </p>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#D9A21B] text-[#071936] text-xs font-bold tracking-[0.18em] uppercase hover:bg-white transition-all duration-300 shadow-lg group"
          >
            <span>Start a Conversation</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 border border-[#FAFAF7]/20 text-[#FAFAF7] text-xs font-semibold tracking-[0.18em] uppercase hover:border-[#D9A21B] hover:text-[#D9A21B] transition-all duration-300"
          >
            <span>Explore Services</span>
          </Link>
        </div>

      </div>
    </section>
  );
};
