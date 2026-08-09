import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export const PoliticalPR: React.FC = () => {
  const capabilities = [
    'Public positioning',
    'Reputation management',
    'Political communication strategy',
    'Campaign messaging',
    'Narrative development',
    'Media relations',
    'Public perception strategy',
    'Digital political communication',
    'Crisis communication',
    'Stakeholder communication'
  ];

  const steps = [
    { title: 'Research', desc: 'In-depth analysis of constituent sentiment, media ecosystem, and policy dynamics.' },
    { title: 'Position', desc: 'Establishing an authentic, durable stance aligned with core ethical principles.' },
    { title: 'Narrative', desc: 'Crafting authoritative campaign themes, speechwriting, and press statements.' },
    { title: 'Communication', desc: 'Disciplined deployment across television, digital media, op-eds, and briefings.' },
    { title: 'Response', desc: 'Active monitoring and real-time strategic response to emerging issues.' }
  ];

  const principles = [
    'Uncompromising commitment to truth and factual accuracy in public statements.',
    'Respect for public discourse and constituent intelligence.',
    'Proactive reputation stewardship over reactive counter-claims.',
    'Strict rejection of deceptive tactics or manipulative messaging.'
  ];

  return (
    <div className="pt-28 space-y-20">
      
      {/* GO BACK & BREADCRUMB */}
      <PageBreadcrumb
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Political PR' }
        ]}
        backToLabel="Services"
        backToPath="/services"
      />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
              PRACTICE AREA 01
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
              Political communication <br />
              <span className="italic text-[#D9A21B]">built around strategy.</span>
            </h1>
            <p className="text-base md:text-lg text-[#071936]/80 font-sans leading-relaxed">
              Political communication requires more than visibility. It requires clarity, positioning, narrative discipline and an understanding of how people receive information.
            </p>
            <div className="pt-2">
              <Link
                to="/contact?service=Political%20PR"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#071936] text-[#FAFAF7] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#D9A21B] transition-all duration-300 group"
              >
                <span>Discuss a Communication Challenge</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/3 rounded-xs overflow-hidden border border-[#E9E9E4] shadow-lg">
              <img
                src="/images/political_pr_hero_1786300910145.jpg"
                alt="Political PR Strategy"
                referrerPolicy="no-referrer"
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
            <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">Services We Provide</h2>
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

      {/* APPROACH ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-10">
        <div className="space-y-2">
          <p className="text-xs text-[#D9A21B] font-semibold tracking-widest uppercase">OUR PROCESS</p>
          <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">Structured Communication Framework</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {steps.map((st, i) => (
            <div key={st.title} className="p-6 border-t-2 border-[#D9A21B] bg-[#FAFAF7] space-y-2">
              <span className="text-xs font-serif font-bold text-[#D9A21B]">STEP 0{i + 1}</span>
              <h3 className="text-lg font-serif text-[#071936]">{st.title}</h3>
              <p className="text-xs text-[#071936]/70 leading-relaxed font-sans">{st.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESPONSIBLE COMMUNICATION PRINCIPLES */}
      <section className="bg-[#071936] text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="flex items-center gap-3 text-[#D9A21B]">
            <ShieldCheck className="w-6 h-6" />
            <h3 className="text-xl font-serif text-white">Responsible Political Communication</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((pr) => (
              <div key={pr} className="p-6 border border-white/10 bg-[#040e21] flex items-start gap-3">
                <span className="text-[#D9A21B] font-bold">•</span>
                <p className="text-xs md:text-sm text-white/80 leading-relaxed">{pr}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />

    </div>
  );
};
