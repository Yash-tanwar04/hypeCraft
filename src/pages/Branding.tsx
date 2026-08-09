import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export const Branding: React.FC = () => {
  const capabilities = [
    'Brand strategy',
    'Brand positioning',
    'Naming',
    'Visual identity',
    'Logo systems',
    'Typography',
    'Color systems',
    'Brand guidelines',
    'Brand communication'
  ];

  return (
    <div className="pt-28 space-y-20">
      {/* GO BACK & BREADCRUMB */}
      <PageBreadcrumb
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Branding' }
        ]}
        backToLabel="Services"
        backToPath="/services"
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
              PRACTICE AREA 03
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
              Brands people recognize. <br />
              <span className="italic text-[#D9A21B]">Identities people remember.</span>
            </h1>
            <p className="text-base md:text-lg text-[#071936]/80 font-sans leading-relaxed">
              Creating visual identity systems and brand positioning that command authority, foster trust, and stand out in crowded markets.
            </p>
            <div className="pt-2">
              <Link
                to="/contact?service=Branding"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#071936] text-[#FAFAF7] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#D9A21B] transition-all duration-300 group"
              >
                <span>Develop Your Brand System</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/3 rounded-xs overflow-hidden border border-[#E9E9E4] shadow-lg">
              <img
                src="/images/hypecraft_brand_showcase_1786274760877.jpg"
                alt="Brand Identity Showcase"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80'; }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-[#FAFAF7] border-y border-[#E9E9E4]">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs text-[#D9A21B] font-semibold tracking-widest uppercase">CAPABILITIES</p>
            <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">Brand Architecture & Design</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap) => (
              <div key={cap} className="p-5 border border-[#E9E9E4] bg-white flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#D9A21B] shrink-0" />
                <span className="text-xs md:text-sm font-semibold text-[#071936]">{cap}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND SHOWCASE GALLERY */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
        <div className="space-y-2">
          <p className="text-xs text-[#D9A21B] font-semibold tracking-widest uppercase">EDITORIAL SHOWCASE</p>
          <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">Brand Identity Applications</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <div className="aspect-16/10 overflow-hidden border border-[#E9E9E4]">
              <img
                src="/images/case_study_branding_1786301009860.jpg"
                alt="Stationery & Print Mockup"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80'; }}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-serif text-[#071936]">01 / Executive Stationery & Gold Foil Collateral</p>
          </div>

          <div className="space-y-3">
            <div className="aspect-16/10 overflow-hidden border border-[#E9E9E4]">
              <img
                src="/images/graphic_design_hero_1786300960111.jpg"
                alt="Architectural & Digital Branding"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'; }}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="text-xs font-serif text-[#071936]">02 / Brand Guidelines & Typography Design Systems</p>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
};
