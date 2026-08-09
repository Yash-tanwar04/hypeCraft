import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export const DigitalMarketing: React.FC = () => {
  const capabilities = [
    'Digital strategy',
    'Social media strategy',
    'Content planning',
    'Campaign development',
    'Audience engagement',
    'Paid campaign strategy',
    'Content calendars',
    'Performance analysis',
    'Digital brand positioning'
  ];

  const ecosystem = [
    { step: 'Strategy', desc: 'Audience analysis and channel selection.' },
    { step: 'Content', desc: 'Creation of high-yield editorial and video assets.' },
    { step: 'Distribution', desc: 'Targeted organic & performance delivery.' },
    { step: 'Engagement', desc: 'Active community building and message resonance.' },
    { step: 'Optimization', desc: 'Continuous metrics evaluation and strategy refinement.' }
  ];

  return (
    <div className="pt-28 space-y-20">
      {/* GO BACK & BREADCRUMB */}
      <PageBreadcrumb
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Digital Marketing' }
        ]}
        backToLabel="Services"
        backToPath="/services"
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
              PRACTICE AREA 02
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
              Digital presence <br />
              <span className="italic text-[#D9A21B]">with a purpose.</span>
            </h1>
            <p className="text-base md:text-lg text-[#071936]/80 font-sans leading-relaxed">
              Digital marketing is most effective when content, strategy and audience understanding work together to build genuine engagement.
            </p>
            <div className="pt-2">
              <Link
                to="/contact?service=Digital%20Marketing"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#071936] text-[#FAFAF7] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#D9A21B] transition-all duration-300 group"
              >
                <span>Launch a Digital Campaign</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/3 rounded-xs overflow-hidden border border-[#E9E9E4] shadow-lg">
              <img
                src="/images/digital_marketing_hero_1786300927065.jpg"
                alt="Digital Marketing System"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80'; }}
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
            <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">Digital Communications Suite</h2>
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

      {/* CONTENT ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        <div className="space-y-2">
          <p className="text-xs text-[#D9A21B] font-semibold tracking-widest uppercase">CONTENT ECOSYSTEM</p>
          <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">Strategy → Content → Engagement Pipeline</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {ecosystem.map((st, i) => (
            <div key={st.step} className="p-6 border-t-2 border-[#D9A21B] bg-[#FAFAF7] space-y-2">
              <span className="text-xs font-serif font-bold text-[#D9A21B]">0{i + 1}</span>
              <h3 className="text-lg font-serif text-[#071936]">{st.step}</h3>
              <p className="text-xs text-[#071936]/70 leading-relaxed font-sans">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </div>
  );
};
