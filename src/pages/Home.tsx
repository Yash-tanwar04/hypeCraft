import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { CTASection } from '../components/CTASection';
import { fetchProjects } from '../firebase/dataService';
import { Project } from '../types';

export const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then((data) => {
      setFeaturedProjects(data.slice(0, 6));
    });
  }, []);

  const services = [
    {
      num: '01',
      title: 'Political PR',
      desc: 'Strategic communication, public positioning, reputation management and campaign narratives.',
      link: '/services/political-pr',
    },
    {
      num: '02',
      title: 'Digital Marketing',
      desc: 'Digital strategy, social media, content campaigns, audience engagement and performance-driven communication.',
      link: '/services/digital-marketing',
    },
    {
      num: '03',
      title: 'Branding',
      desc: 'Brand strategy, identity systems, positioning and visual language.',
      link: '/services/branding',
    },
    {
      num: '04',
      title: 'Video Content',
      desc: 'Campaign films, brand films, social video, interviews, reels and visual storytelling.',
      link: '/services/video-content',
    },
    {
      num: '05',
      title: 'Graphic Design',
      desc: 'Campaign creatives, social graphics, presentations, publications and communication materials.',
      link: '/services/graphic-design',
    },
    {
      num: '06',
      title: 'Business Management Consultancy',
      desc: 'Strategic planning, communication systems, brand advisory and organizational problem-solving.',
      link: '/services/business-consultancy',
    },
  ];

  const steps = [
    {
      num: '01',
      title: 'Understand',
      desc: 'Research the audience, environment, challenge and objective.',
    },
    {
      num: '02',
      title: 'Define',
      desc: 'Establish positioning, narrative and strategic direction.',
    },
    {
      num: '03',
      title: 'Create',
      desc: 'Translate strategy into campaigns, content, identity and communication.',
    },
    {
      num: '04',
      title: 'Amplify',
      desc: 'Deploy, measure, refine and strengthen the communication ecosystem.',
    },
  ];

  return (
    <div className="space-y-0 relative">
      
      {/* Editorial Side Rail */}
      <div className="hidden xl:flex fixed right-0 top-0 h-full w-12 border-l border-[#071936]/10 flex-col items-center justify-center gap-12 z-30 pointer-events-none">
        <div className="rotate-90 text-[9px] uppercase tracking-[0.4em] font-semibold text-[#071936]/40 whitespace-nowrap">
          STRATEGIC COMMUNICATIONS & CREATIVE CONSULTANCY
        </div>
      </div>
      
      {/* SECTION 01: HERO */}
      <section className="min-h-[92vh] pt-28 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-center relative overflow-hidden">
        
        {/* Abstract Geometric Ambient Background */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[550px] h-[550px] pointer-events-none hidden lg:block opacity-70">
          {/* Main sculptural gradient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-[480px] bg-gradient-to-br from-[#E9E9E4] via-[#F1D27A] to-[#D9A21B] rounded-full blur-[3px] opacity-25 transform -rotate-12" />
          
          {/* Concentric Thin Geometric Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] border border-[#071936]/10 rounded-full flex items-center justify-center">
            <div className="w-[300px] h-[300px] border border-[#071936]/10 rounded-full flex items-center justify-center opacity-60">
              <div className="w-[180px] h-[180px] border border-[#D9A21B]/30 rounded-full opacity-40" />
            </div>
          </div>

          {/* Floating Gold Sphere */}
          <div className="absolute top-1/4 right-8 w-20 h-20 rounded-full bg-gradient-to-tr from-[#D9A21B] to-[#F1D27A] shadow-2xl z-20 animate-pulse" />

          {/* Grid Accents */}
          <div className="absolute bottom-6 right-6 w-28 h-28 grid grid-cols-4 gap-3 opacity-15">
            <div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" />
            <div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" />
            <div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" />
            <div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" /><div className="w-2 h-2 rounded-full bg-[#071936]" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          <div className="lg:col-span-7 space-y-8">
            <div className="text-[11px] font-semibold tracking-[0.3em] text-[#D9A21B] flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#D9A21B]" />
              STRATEGY • COMMUNICATION • CREATIVITY
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-[88px] font-serif font-normal text-[#071936] leading-[0.95]">
              Strategy <br />
              <span className="italic font-normal text-[#D9A21B]">meets</span> <br />
              creativity.
            </h1>

            <p className="text-xl md:text-2xl font-serif text-[#071936]/90 leading-snug max-w-xl font-light">
              We craft influence that builds reputation, shapes perception and creates impact.
            </p>

            <p className="text-sm md:text-base text-[#151515]/70 leading-relaxed max-w-md font-sans">
              Hypecraft brings together political PR, digital marketing, branding, visual storytelling and business consultancy to help people and organizations communicate with clarity.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <Link
                to="/work"
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#071936] text-white text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#D9A21B] hover:text-[#071936] transition-all duration-300 group"
              >
                <span>Explore Our Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#who-we-are"
                className="inline-flex items-center gap-2 px-6 py-4 text-[11px] font-bold tracking-[0.2em] uppercase text-[#071936] hover:text-[#D9A21B] transition-all duration-300 border-b border-transparent hover:border-[#071936]"
              >
                <span>What We Do</span>
                <ArrowDown className="w-3.5 h-3.5 text-[#D9A21B]" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative aspect-4/5 overflow-hidden rounded-xs border border-[#071936]/10 shadow-2xl group">
              <img
                src="/images/hypecraft_hero_3d_1786274736991.jpg"
                alt="Hypecraft Strategic Visual"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'; }}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071936]/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#FAFAF7]/95 backdrop-blur-xs border border-[#E9E9E4] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.25em] text-[#D9A21B] uppercase">
                    EST. 2026
                  </p>
                  <p className="text-xs font-serif text-[#071936] mt-0.5">
                    Strategic Communications Consultancy
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full border border-[#D9A21B] flex items-center justify-center text-[#D9A21B]">
                  ↗
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 02: WHO WE ARE */}
      <section id="who-we-are" className="py-24 bg-[#E9E9E4]/40 border-y border-[#E9E9E4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="aspect-4/3 overflow-hidden rounded-xs border border-[#E9E9E4] shadow-md">
                <img
                  src="/images/case_study_warroom_1786301027509.jpg"
                  alt="Hypecraft Strategic War Room"
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'; }}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
                01 / WHO WE ARE
              </p>

              <h2 className="text-3xl md:text-5xl font-serif text-[#071936] leading-tight">
                Ideas need strategy. <br />
                <span className="italic text-[#D9A21B]">Strategy needs influence.</span>
              </h2>

              <div className="space-y-4 text-sm md:text-base text-[#071936]/80 font-sans leading-relaxed">
                <p>
                  Hypecraft is a strategic communications and creative consultancy built around one simple belief: great ideas only matter when they are communicated effectively.
                </p>
                <p>
                  We combine strategic thinking, public relations, digital communication, design, content and business perspective to build identities and narratives that people remember.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#071936] hover:text-[#D9A21B] transition-colors border-b-2 border-[#D9A21B] pb-1"
                >
                  <span>Discover Hypecraft</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 03: WHAT WE DO */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-4 mb-16">
          <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
            02 / WHAT WE DO
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#071936]">
            One vision. <span className="italic text-[#D9A21B]">Multiple disciplines.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((serv) => (
            <div
              key={serv.num}
              className="bg-[#FAFAF7] border border-[#E9E9E4] p-8 flex flex-col justify-between hover:border-[#D9A21B] transition-all duration-300 group hover:shadow-md"
            >
              <div className="space-y-4">
                <span className="text-xs font-serif text-[#D9A21B] tracking-widest font-semibold">
                  {serv.num}
                </span>
                <h3 className="text-xl font-serif text-[#071936] group-hover:text-[#D9A21B] transition-colors">
                  {serv.title}
                </h3>
                <p className="text-xs text-[#071936]/70 leading-relaxed font-sans">
                  {serv.desc}
                </p>
              </div>

              <div className="pt-8">
                <Link
                  to={serv.link}
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#071936] group-hover:text-[#D9A21B] transition-colors"
                >
                  <span>Explore Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 04: SELECTED WORK */}
      <section className="py-24 bg-[#071936] text-[#FAFAF7]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#FAFAF7]/10 pb-8">
            <div className="space-y-3">
              <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
                03 / SELECTED WORK
              </p>
              <h2 className="text-3xl md:text-5xl font-serif text-white">
                Work that speaks <span className="italic text-[#D9A21B]">beyond the brief.</span>
              </h2>
            </div>
            <Link
              to="/work"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-[#D9A21B] hover:text-white transition-colors"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((proj) => (
              <div
                key={proj.id || proj.slug}
                className="group bg-[#040e21] border border-[#FAFAF7]/10 hover:border-[#D9A21B] transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#071936]">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'; }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#071936]/80 backdrop-blur-xs border border-[#FAFAF7]/20 text-[10px] uppercase font-semibold text-[#D9A21B] tracking-wider">
                    {proj.isConcept ? 'Concept Project' : 'Selected Project'}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#D9A21B] tracking-wider">
                      <span>{proj.category}</span>
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="text-lg font-serif text-white group-hover:text-[#D9A21B] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#FAFAF7]/70 font-sans line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link
                      to={`/work/${proj.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#D9A21B] group-hover:text-white transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 05: HOW WE THINK / OUR APPROACH */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-4 mb-16">
          <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
            04 / OUR APPROACH
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#071936]">
            Strategy <span className="italic text-[#D9A21B]">before noise.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((st) => (
            <div key={st.num} className="border-t-2 border-[#D9A21B] pt-6 space-y-3">
              <span className="text-xs font-serif text-[#D9A21B] font-bold tracking-widest">
                {st.num}
              </span>
              <h3 className="text-xl font-serif text-[#071936]">
                {st.title}
              </h3>
              <p className="text-xs text-[#071936]/70 leading-relaxed font-sans">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 06: FINAL CTA */}
      <CTASection />

    </div>
  );
};
