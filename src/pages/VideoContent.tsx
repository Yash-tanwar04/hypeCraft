import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Play } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export const VideoContent: React.FC = () => {
  const capabilities = [
    'Brand films',
    'Campaign videos',
    'Interviews',
    'Social media videos',
    'Reels',
    'Event films',
    'Documentary-style content',
    'Motion graphics',
    'Video strategy'
  ];

  return (
    <div className="pt-28 space-y-20">
      {/* GO BACK & BREADCRUMB */}
      <PageBreadcrumb
        items={[
          { label: 'Services', path: '/services' },
          { label: 'Video Content' }
        ]}
        backToLabel="Services"
        backToPath="/services"
      />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
              PRACTICE AREA 04
            </span>
            <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
              Stories deserve <br />
              <span className="italic text-[#D9A21B]">to be seen.</span>
            </h1>
            <p className="text-base md:text-lg text-[#071936]/80 font-sans leading-relaxed">
              From campaign films to short-form social content, we use moving images to turn ideas into experiences.
            </p>
            <div className="pt-2">
              <Link
                to="/contact?service=Video%20Content"
                className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#071936] text-[#FAFAF7] text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#D9A21B] transition-all duration-300 group"
              >
                <span>Commission Video Production</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="aspect-4/3 rounded-xs overflow-hidden border border-[#E9E9E4] shadow-lg relative group">
              <img
                src="/images/video_production_hero_1786300944412.jpg"
                alt="Cinematic Video Production"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-[#071936]/30 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#D9A21B] text-[#071936] flex items-center justify-center pl-1 shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 bg-[#FAFAF7] border-y border-[#E9E9E4]">
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs text-[#D9A21B] font-semibold tracking-widest uppercase">CAPABILITIES</p>
            <h2 className="text-2xl md:text-4xl font-serif text-[#071936]">Cinematic & Motion Production</h2>
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
