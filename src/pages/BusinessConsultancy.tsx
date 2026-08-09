import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export const BusinessConsultancy: React.FC = () => {
  const capabilities = [
    'Business strategy',
    'Brand strategy',
    'Communication strategy',
    'Organizational positioning',
    'Market positioning',
    'Strategic planning',
    'Process improvement',
    'Growth advisory',
    'Reputation advisory'
  ];

  return (
    <div className="pt-28 space-y-20">
      {/* GO BACK & BREADCRUMB */}
      <PageBreadcrumb
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Business Consultancy' }
        ]}
        backToLabel="Services"
        backToPath="/services"
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
              PRACTICE AREA 06
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
              Better decisions begin <br />
              <span className="italic text-[#D9A21B]">with better clarity.</span>
            </h1>
            <p className="text-base md:text-lg text-[#071936]/80 font-sans leading-relaxed">
              Hypecraft helps organizations identify communication, positioning and strategic challenges and turn them into practical directions for action.
            </p>
            <div className="pt-2">
              <Link
                to="/contact?service=Business%20Consultancy"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#071936] text-[#FAFAF7] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#D9A21B] transition-all duration-300 group"
              >
                <span>Schedule a Strategic Advisory Call</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/3 rounded-xs overflow-hidden border border-[#E9E9E4] shadow-lg">
              <img
                src="/images/case_study_warroom_1786301027509.jpg"
                alt="Business Advisory War Room"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'; }}
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
            <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">Strategic Management & Advisory</h2>
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

      <CTASection />
    </div>
  );
};
