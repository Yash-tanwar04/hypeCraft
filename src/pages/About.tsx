import React, { useEffect, useState } from 'react';
import { CTASection } from '../components/CTASection';
import { fetchTeam } from '../firebase/dataService';
import { TeamMember } from '../types';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetchTeam().then(setTeamMembers);
  }, []);

  const principles = [
    {
      title: 'Clarity',
      desc: 'Good communication starts with knowing exactly what needs to be said.',
    },
    {
      title: 'Strategy',
      desc: 'Creative execution is stronger when it is guided by a clear strategic objective.',
    },
    {
      title: 'Relevance',
      desc: 'Communication must understand its audience, environment and moment.',
    },
    {
      title: 'Impact',
      desc: "The goal isn't simply visibility. It is meaningful influence and measurable progress.",
    },
  ];

  const philosophySteps = [
    { step: '01', name: 'Strategy', desc: 'Analyzing the environment & objectives' },
    { step: '02', name: 'Narrative', desc: 'Framing the core message and stance' },
    { step: '03', name: 'Creativity', desc: 'Translating strategy into visual form' },
    { step: '04', name: 'Distribution', desc: 'Deploying across targeted channels' },
    { step: '05', name: 'Impact', desc: 'Driving measurable perception shift' },
  ];

  return (
    <div className="pt-28 space-y-24">
      
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="max-w-3xl space-y-6">
          <div className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#D9A21B]" />
            ABOUT HYPECRAFT
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
            We build clarity in a <br />
            <span className="italic text-[#D9A21B]">world full of noise.</span>
          </h1>
          <p className="text-lg md:text-xl font-serif text-[#071936]/80 leading-relaxed pt-2">
            Hypecraft is a multidisciplinary strategic communications and creative consultancy focused on reputation, influence, identity and meaningful communication.
          </p>
        </div>
      </section>

      {/* PHILOSOPHY & STORY */}
      <section className="bg-[#E9E9E4]/30 py-20 border-y border-[#E9E9E4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl font-serif text-[#071936]">
              A Strategic Framework <br />
              <span className="italic text-[#D9A21B]">Built For Modern Complexity</span>
            </h2>
            <div className="space-y-4 text-sm md:text-base text-[#071936]/80 font-sans leading-relaxed">
              <p>
                In a media landscape dominated by fragmentation and fleeting attention spans, visibility alone is no longer enough. Organizations and leaders need a disciplined communication architecture that transforms short-term interest into enduring trust.
              </p>
              <p>
                At Hypecraft, we sit at the intersection of political PR, digital marketing, visual branding, and executive advisory. We bridge the gap between high-level positioning and meticulous creative execution.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-16/10 rounded-xs overflow-hidden border border-[#E9E9E4] shadow-md">
              <img
                src="/images/case_study_warroom_1786301027509.jpg"
                alt="Hypecraft Strategic War Room"
                referrerPolicy="no-referrer"
                onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'; }}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </section>

      {/* WHAT WE BELIEVE / 4 PRINCIPLES */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="space-y-3">
          <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
            CORE PRINCIPLES
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#071936]">
            What We <span className="italic text-[#D9A21B]">Believe</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {principles.map((pr, idx) => (
            <div
              key={pr.title}
              className="bg-[#FAFAF7] border border-[#E9E9E4] p-8 space-y-4 hover:border-[#D9A21B] transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-serif font-bold text-[#D9A21B]">0{idx + 1}</span>
                <h3 className="text-xl font-serif text-[#071936]">{pr.title}</h3>
              </div>
              <p className="text-xs md:text-sm text-[#071936]/70 leading-relaxed font-sans">
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY PIPELINE */}
      <section className="bg-[#071936] text-[#FAFAF7] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="space-y-3">
            <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
              OUR PHILOSOPHY
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-white">
              The Path From <span className="italic text-[#D9A21B]">Strategy To Impact</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {philosophySteps.map((s) => (
              <div key={s.step} className="border-t border-[#FAFAF7]/20 pt-6 space-y-2">
                <span className="text-xs font-serif text-[#D9A21B] font-bold">{s.step}</span>
                <h4 className="text-lg font-serif text-white">{s.name}</h4>
                <p className="text-xs text-[#FAFAF7]/60 font-sans leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12 pb-12">
        <div className="space-y-3 border-b border-[#E9E9E4] pb-6">
          <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
            LEADERSHIP & CONSULTANTS
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-[#071936]">
            Our <span className="italic text-[#D9A21B]">Team</span>
          </h2>
          <p className="text-sm text-[#071936]/70 max-w-xl">
            A CMS-ready structure powered by experienced practitioners across strategic communications, public relations, and brand architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((tm) => (
            <div key={tm.id || tm.name} className="bg-[#FAFAF7] border border-[#E9E9E4] overflow-hidden">
              <div className="aspect-4/3 overflow-hidden bg-[#E9E9E4]">
                <img
                  src={tm.image}
                  alt={tm.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'; }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-semibold text-[#D9A21B] tracking-wider uppercase">
                  {tm.role}
                </span>
                <h3 className="text-xl font-serif text-[#071936]">{tm.name}</h3>
                <p className="text-xs text-[#071936]/70 leading-relaxed font-sans">{tm.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTASection />

    </div>
  );
};
