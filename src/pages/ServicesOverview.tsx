import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { INITIAL_SERVICES } from '../data/initialData';
import { CTASection } from '../components/CTASection';
import { PageBreadcrumb } from '../components/PageBreadcrumb';
import { handleImageError } from '../utils/imageUtils';

export const ServicesOverview: React.FC = () => {
  return (
    <div className="pt-28 space-y-20">
      
      {/* GO BACK & BREADCRUMB */}
      <PageBreadcrumb
        items={[
          { label: 'Services Overview' }
        ]}
        backToLabel="Home"
        backToPath="/"
      />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="max-w-3xl space-y-6">
          <div className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D9A21B]" />
            SERVICES OVERVIEW
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
            What we do. <br />
            <span className="italic text-[#D9A21B]">Strategy, communication and creative execution.</span>
          </h1>
          <p className="text-lg font-serif text-[#071936]/80 leading-relaxed pt-2">
            We operate as a single unified consultancy, providing specialized practice areas that work independently or seamlessly together.
          </p>
        </div>
      </section>

      {/* 6 LARGE SERVICE SECTIONS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        {INITIAL_SERVICES.map((serv, idx) => (
          <div
            key={serv.slug}
            className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-12 ${
              idx !== 0 ? 'border-t border-[#E9E9E4]' : ''
            }`}
          >
            {/* Visual Column */}
            <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="aspect-16/10 overflow-hidden rounded-xs border border-[#E9E9E4] shadow-md group">
                <img
                  src={serv.heroImage}
                  alt={serv.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(e, serv.title)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Info Column */}
            <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="flex items-center gap-3">
                <span className="text-sm font-serif font-bold text-[#D9A21B] tracking-widest">
                  {serv.number}
                </span>
                <span className="text-xs text-[#071936]/40 uppercase tracking-widest">Practice Area</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-serif text-[#071936]">
                {serv.title}
              </h2>

              <p className="text-sm font-serif italic text-[#D9A21B]">
                "{serv.subtitle}"
              </p>

              <p className="text-sm text-[#071936]/80 font-sans leading-relaxed">
                {serv.description}
              </p>

              {/* Capabilities */}
              <div className="space-y-3 pt-2">
                <p className="text-xs font-semibold tracking-wider text-[#071936] uppercase">Key Capabilities:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#071936]/80 font-sans">
                  {serv.capabilities.slice(0, 6).map((cap) => (
                    <div key={cap} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D9A21B] shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to={`/services/${serv.slug}`}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-[#071936] text-[#FAFAF7] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#D9A21B] transition-all duration-300 group"
                >
                  <span>Explore {serv.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

            </div>
          </div>
        ))}
      </section>

      <CTASection />

    </div>
  );
};
