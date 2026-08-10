import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Palette,
  Video,
  Layers,
  Briefcase,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { INITIAL_SERVICES } from '../data/initialData';
import { WalkingCharacter } from '../components/WalkingCharacter';
import { handleImageError } from '../utils/imageUtils';
import { PageBreadcrumb } from '../components/PageBreadcrumb';
import { CitySkyline } from '../components/CitySkyline';

gsap.registerPlugin(ScrollTrigger);

// Service icons mapping
const SERVICE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  'political-pr': ShieldCheck,
  'digital-marketing': TrendingUp,
  branding: Palette,
  'video-content': Video,
  'graphic-design': Layers,
  'business-consultancy': Briefcase,
};

// Lighting & Mood color themes per service
const LIGHTING_THEMES = [
  {
    // 01 Political PR
    bgGradient: 'from-[#071936] via-[#0B2144] to-[#040E21]',
    accentGlow: 'rgba(217,162,27,0.2)',
  },
  {
    // 02 Digital Marketing
    bgGradient: 'from-[#0A2246] via-[#0E2E5C] to-[#040E21]',
    accentGlow: 'rgba(59,130,246,0.25)',
  },
  {
    // 03 Branding
    bgGradient: 'from-[#0D1F3C] via-[#1A2E4E] to-[#040E21]',
    accentGlow: 'rgba(217,162,27,0.3)',
  },
  {
    // 04 Video Content
    bgGradient: 'from-[#050D1A] via-[#09172E] to-[#020710]',
    accentGlow: 'rgba(239,68,68,0.2)',
  },
  {
    // 05 Graphic Design
    bgGradient: 'from-[#081B38] via-[#132B52] to-[#040E21]',
    accentGlow: 'rgba(217,162,27,0.25)',
  },
  {
    // 06 Business Consultancy
    bgGradient: 'from-[#071936] via-[#0F2952] to-[#030914]',
    accentGlow: 'rgba(217,162,27,0.35)',
  },
];

export const ServicesOverview: React.FC = () => {
  const journeyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const billboardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastProgressRef = useRef<number>(0);

  const activeStepRef = useRef<number>(0);
  const isReversedRef = useRef<boolean>(false);
  const rafIdRef = useRef<number | null>(null);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [journeyProgress, setJourneyProgress] = useState<number>(0);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Calculate character X position in pixels along the street track
  const getCharacterPositionPx = (prog: number) => {
    const refs = billboardRefs.current;
    const first = refs[0];
    const last = refs[refs.length - 1];

    if (first && last) {
      const total = refs.length;
      const segments = total - 1;
      const scaledProg = Math.max(0, Math.min(1, prog)) * segments;
      const index = Math.min(segments - 1, Math.floor(scaledProg));
      const segmentProg = scaledProg - index;

      const currentEl = refs[index];
      const nextEl = refs[index + 1] || refs[index];

      if (currentEl && nextEl) {
        const startX = currentEl.offsetLeft + 60;
        const endX = nextEl.offsetLeft + 60;
        return startX + (endX - startX) * segmentProg;
      }
    }

    // Fallback calculation before refs are measured
    const trackWidth = trackRef.current ? trackRef.current.scrollWidth : 3500;
    return 150 + prog * (trackWidth - 400);
  };

  // Distance-based character opacity:
  // Character smoothly fades out when arriving in front of a billboard card center,
  // remains hidden while card is active, and fades back in when leaving towards the next card.
  const getCharacterOpacity = (prog: number) => {
    const charX = getCharacterPositionPx(prog);
    const refs = billboardRefs.current;

    if (!refs || refs.length === 0) return 1;

    let minDist = Infinity;
    for (let i = 0; i < refs.length; i++) {
      const el = refs[i];
      if (el) {
        const cardCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(charX - cardCenter);
        if (dist < minDist) {
          minDist = dist;
        }
      }
    }

    // Fully hidden when in front of card (minDist <= 160px)
    // Fully visible when walking between cards (minDist >= 360px)
    // Smooth linear interpolation in between
    if (minDist <= 160) return 0;
    if (minDist >= 360) return 1;
    return (minDist - 160) / (360 - 160);
  };

  const characterOpacity = getCharacterOpacity(journeyProgress);
  const isLookingAtBillboard = characterOpacity < 0.8;

  // Accessibility check for reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Initialize Lenis Smooth Scroll synced with GSAP Ticker & ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Prevent jumpy page resizes when mobile address bars expand/collapse
    ScrollTrigger.config({ ignoreMobileResize: true });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.8,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  // GSAP ScrollTrigger for Pinned Services Journey
  useEffect(() => {
    if (prefersReducedMotion) return;

    const journeyEl = journeyRef.current;
    const trackEl = trackRef.current;
    if (!journeyEl || !trackEl) return;

    let ctx = gsap.context(() => {
      const totalServices = INITIAL_SERVICES.length;
      // Distance to scrub: ~800px per service
      const isMobile = window.innerWidth < 768;
      const scrollDistance = totalServices * (isMobile ? 650 : 850) + 400;

      ScrollTrigger.create({
        trigger: journeyEl,
        start: 'top top',
        end: `+=${scrollDistance}`,
        pin: true,
        scrub: isMobile ? 0.4 : 0.6,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const prog = self.progress;

          // 1. Instantly update GSAP track translation on GPU thread for 60fps responsiveness
          const maxScroll = trackEl.scrollWidth - window.innerWidth;
          gsap.set(trackEl, {
            x: -prog * maxScroll,
            force3D: true,
          });

          // 2. Batch React state updates using rAF to avoid state thrashing on touch move
          if (rafIdRef.current === null) {
            rafIdRef.current = requestAnimationFrame(() => {
              rafIdRef.current = null;

              // Direction check
              const isRev = prog < lastProgressRef.current - 0.0008;
              if (isRev !== isReversedRef.current) {
                isReversedRef.current = isRev;
                setIsReversed(isRev);
              }
              lastProgressRef.current = prog;

              // Active step check
              const stepIndex = Math.min(
                totalServices - 1,
                Math.floor(prog * totalServices)
              );
              if (stepIndex !== activeStepRef.current) {
                activeStepRef.current = stepIndex;
                setActiveStep(stepIndex);
              }

              setJourneyProgress(prog);
            });
          }
        },
      });

      // Subtle parallax on far skyline background
      gsap.to('.parallax-bg-far', {
        xPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: journeyEl,
          start: 'top top',
          end: `+=${scrollDistance}`,
          scrub: isMobile ? 0.4 : 0.8,
        },
      });
    }, journeyEl);

    // Refresh ScrollTrigger when images load
    const timer = setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      clearTimeout(timer);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      ctx.revert();
    };
  }, [prefersReducedMotion]);

  // Programmatically scroll to a specific billboard index
  const scrollToService = (index: number) => {
    const journeyEl = journeyRef.current;
    if (!journeyEl) return;

    const totalServices = INITIAL_SERVICES.length;
    const scrollDistance = totalServices * 850 + 600;
    const journeyTop = journeyEl.getBoundingClientRect().top + window.scrollY;

    const targetProgress = (index + 0.1) / totalServices;
    window.scrollTo({
      top: journeyTop + targetProgress * scrollDistance,
      behavior: 'smooth',
    });
  };

  // REDUCED MOTION FALLBACK: Clean Static Vertical Grid
  if (prefersReducedMotion) {
    return (
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16 bg-[#071936] text-[#FAFAF7]">
        <PageBreadcrumb items={[{ label: 'Services' }]} backToLabel="Home" backToPath="/" />

        <div className="max-w-3xl space-y-4">
          <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
            WHAT WE DO
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-white">
            Different Disciplines. <br />
            <span className="italic text-[#D9A21B]">One Purpose.</span>
          </h1>
          <p className="text-sm md:text-base text-[#FAFAF7]/80 font-sans leading-relaxed">
            We bring strategy, creativity and communication together to build influence that creates impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INITIAL_SERVICES.map((serv) => {
            const Icon = SERVICE_ICONS[serv.slug] || Sparkles;
            return (
              <div
                key={serv.slug}
                className="bg-[#040e21] text-[#FAFAF7] border border-[#FAFAF7]/10 p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[#D9A21B]">
                    <span className="text-xl font-serif font-bold">{serv.number}</span>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-2xl font-serif text-white">{serv.title}</h2>
                  <p className="text-xs text-[#FAFAF7]/70 font-sans leading-relaxed">
                    {serv.description}
                  </p>
                </div>

                <Link
                  to={`/services/${serv.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#D9A21B] hover:text-white transition-colors"
                >
                  <span>EXPLORE SERVICE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const currentTheme = LIGHTING_THEMES[activeStep] || LIGHTING_THEMES[0];

  return (
    <div className="relative bg-[#071936] text-[#FAFAF7] overflow-x-hidden min-h-screen">
      
      {/* 1. DEDICATED INTRO SECTION (100% SEPARATE FROM JOURNEY - NO BILLBOARDS HERE) */}
      <section className="services-intro min-h-[90vh] md:min-h-screen flex flex-col justify-center items-center relative px-6 text-center z-10 bg-[#071936] border-b border-[#FAFAF7]/10">
        
        {/* Subtle grid background for intro */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #FAFAF7 1px, transparent 1px), linear-gradient(to bottom, #FAFAF7 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-4xl space-y-6 relative z-10 py-16">
          <p className="text-[#D9A21B] text-xs md:text-sm font-semibold tracking-[0.3em] uppercase">
            WHAT WE DO
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
            Different Disciplines. <br />
            <span className="italic text-[#D9A21B]">One Purpose.</span>
          </h1>

          <p className="text-sm md:text-lg text-[#FAFAF7]/80 font-sans max-w-2xl mx-auto leading-relaxed">
            We bring strategy, creativity and communication together to build influence that creates impact.
          </p>

          <div className="pt-8">
            <div className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-[#D9A21B] uppercase bg-[#040e21] px-6 py-3 rounded-full border border-[#D9A21B]/40 shadow-lg">
              <span>SCROLL TO EXPLORE JOURNEY</span>
              <ArrowDown className="w-4 h-4 animate-bounce" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PINNED SERVICES JOURNEY SECTION (PINNED VIA GSAP SCROLLTRIGGER) */}
      <section
        ref={journeyRef}
        id="services-journey"
        className="services-journey relative w-full h-screen overflow-hidden flex flex-col justify-between bg-[#071936]"
      >
        {/* Dynamic ambient gradient background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br transition-colors duration-1000 ease-out pointer-events-none ${currentTheme.bgGradient}`}
        >
          <div
            className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `radial-gradient(${currentTheme.accentGlow} 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        {/* TOP BREADCRUMB */}
        <div className="absolute top-6 left-6 md:left-12 z-30 pointer-events-auto">
          <PageBreadcrumb items={[{ label: 'Services Journey' }]} backToLabel="Home" backToPath="/" />
        </div>

        {/* LEFT FIXED PROGRESS INDICATOR */}
        <aside
          className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center space-y-4 pointer-events-auto"
          aria-label="Service Journey Steps"
        >
          <span className="text-[10px] font-semibold text-[#D9A21B] tracking-[0.25em] uppercase -rotate-90 origin-bottom mb-4 opacity-80">
            DISCIPLINES
          </span>

          {INITIAL_SERVICES.map((serv, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={serv.slug}
                onClick={() => scrollToService(idx)}
                className="group flex flex-col items-center cursor-pointer focus:outline-hidden"
                aria-label={`Jump to ${serv.title}`}
              >
                <span
                  className={`text-xs font-serif transition-all duration-300 ${
                    isActive
                      ? 'text-[#D9A21B] font-bold scale-125'
                      : 'text-[#FAFAF7]/40 hover:text-white'
                  }`}
                >
                  {serv.number}
                </span>

                {/* Progress Connector Line */}
                {idx < INITIAL_SERVICES.length - 1 && (
                  <div className="w-[2px] h-5 bg-[#FAFAF7]/15 relative overflow-hidden my-1">
                    {activeStep > idx && (
                      <div className="absolute inset-0 bg-[#D9A21B]" />
                    )}
                    {isActive && (
                      <div className="absolute inset-x-0 top-0 h-full bg-[#D9A21B] animate-pulse" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </aside>

        {/* STREET SCENE HORIZONTAL TRACK */}
        <div
          ref={trackRef}
          className="relative h-full flex items-center pl-[15vw] pr-[25vw] min-w-max will-change-transform transform-gpu"
        >
          {/* HIGH-DETAIL CITYSCAPE & URBAN ARCHITECTURE BACKGROUND */}
          <CitySkyline />

          {/* THE 6 PHYSICAL BILLBOARDS ALONG THE STREET */}
          <div className="relative z-10 flex items-center space-x-[25vw] md:space-x-[32vw] pt-12">
            {INITIAL_SERVICES.map((serv, index) => {
              const Icon = SERVICE_ICONS[serv.slug] || Sparkles;
              const isActive = activeStep === index;

              return (
                <div
                  key={serv.slug}
                  id={`billboard-${index}`}
                  ref={(el) => {
                    billboardRefs.current[index] = el;
                  }}
                  className={`relative shrink-0 w-[85vw] max-w-[760px] md:w-[680px] lg:w-[740px] bg-[#071936] text-[#FAFAF7] border-2 border-[#D9A21B]/40 shadow-2xl rounded-xs overflow-hidden transition-all duration-500 transform will-change-transform transform-gpu ${
                    isActive
                      ? 'scale-100 opacity-100 translate-y-0 border-[#D9A21B] shadow-[0_20px_50px_rgba(217,162,27,0.3)]'
                      : 'scale-95 opacity-50 translate-y-4 filter grayscale-[30%]'
                  }`}
                >
                  {/* BILLBOARD LIGHTING FIXTURE */}
                  <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#D9A21B]/20 via-[#D9A21B] to-[#D9A21B]/20 z-20" />
                  <div className="absolute -top-3 left-12 w-6 h-3 bg-[#040e21] border border-[#D9A21B] rounded-t-xs" />
                  <div className="absolute -top-3 right-12 w-6 h-3 bg-[#040e21] border border-[#D9A21B] rounded-t-xs" />

                  {/* BILLBOARD CONTENT GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-12 min-h-[360px] md:min-h-[400px]">
                    {/* LEFT PANEL: DETAILS */}
                    <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between space-y-6 relative z-10 bg-[#071936]">
                      <div className="space-y-4">
                        {/* Number & Icon Header */}
                        <div className="flex items-center justify-between border-b border-[#FAFAF7]/10 pb-4">
                          <span className="text-2xl font-serif font-bold text-[#D9A21B] tracking-wider">
                            {serv.number}
                          </span>
                          <div className="p-2 bg-[#D9A21B]/10 rounded-full text-[#D9A21B] border border-[#D9A21B]/30">
                            <Icon className="w-5 h-5" />
                          </div>
                        </div>

                        {/* Title */}
                        <h2 className="text-2xl md:text-3xl font-serif text-white tracking-wide uppercase leading-tight">
                          {serv.title}
                        </h2>

                        {/* Subtitle / Quote */}
                        <p className="text-xs font-serif italic text-[#D9A21B]">
                          "{serv.subtitle}"
                        </p>

                        {/* Description */}
                        <p className="text-xs md:text-sm text-[#FAFAF7]/80 font-sans leading-relaxed">
                          {serv.description}
                        </p>
                      </div>

                      {/* EXPLORE CTA */}
                      <div className="pt-4 border-t border-[#FAFAF7]/10">
                        <Link
                          to={`/services/${serv.slug}`}
                          className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.2em] uppercase text-[#D9A21B] hover:text-white transition-colors group relative py-2"
                        >
                          <span>EXPLORE SERVICE</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D9A21B] transition-all duration-300 group-hover:w-full" />
                        </Link>
                      </div>
                    </div>

                    {/* RIGHT PANEL: EDITORIAL IMAGE REVEAL */}
                    <div className="md:col-span-5 relative overflow-hidden min-h-[200px] md:min-h-full bg-[#040e21]">
                      <img
                        src={serv.heroImage}
                        alt={serv.title}
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, serv.title)}
                        className={`w-full h-full object-cover transition-transform duration-1000 ${
                          isActive ? 'scale-105' : 'scale-100'
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#071936] via-transparent to-transparent opacity-80" />
                      <div className="absolute top-4 right-4 text-[10px] uppercase font-mono tracking-widest text-[#D9A21B] bg-[#071936]/80 px-2 py-1 border border-[#D9A21B]/40">
                        HYPECRAFT
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* FOREGROUND SIDEWALK & GROUNDED WALKING CHARACTER */}
          <div className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none border-t border-[#D9A21B]/30 bg-[#040e21]">
            {/* Sidewalk pavement texture */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  'linear-gradient(90deg, #D9A21B 1px, transparent 1px), linear-gradient(0deg, #D9A21B 1px, transparent 1px)',
                backgroundSize: '40px 16px',
              }}
            />

            {/* WALKING CHARACTER - PROGRESSES HORIZONTALLY IN SYNC WITH USER SCROLL */}
            <div
              className="absolute bottom-12 z-30 transition-opacity duration-300 ease-out will-change-[transform,opacity] transform-gpu"
              style={{
                left: `${getCharacterPositionPx(journeyProgress)}px`,
                opacity: characterOpacity,
              }}
            >
              <WalkingCharacter
                progress={journeyProgress}
                isReversed={isReversed}
                isLookingAtBillboard={isLookingAtBillboard}
              />
            </div>

            {/* Curbstone Highlight */}
            <div className="absolute bottom-0 inset-x-0 h-3 bg-gradient-to-r from-[#D9A21B]/30 via-[#D9A21B] to-[#D9A21B]/30 opacity-75" />
          </div>
        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="relative z-20 p-4 border-t border-[#FAFAF7]/10 bg-[#071936]/90 backdrop-blur-md flex items-center justify-between text-[11px] text-[#FAFAF7]/60 px-6 md:px-12">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D9A21B] animate-ping" />
            <span className="text-[#D9A21B] font-semibold uppercase tracking-wider">
              DISCIPLINE 0{activeStep + 1} / 06
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-[10px] tracking-widest uppercase">
            <span>SCROLL TO WALK THROUGH THE CITY</span>
            <span>•</span>
            <span>CLICK NUMBERS TO JUMP</span>
          </div>

          <div className="text-[#D9A21B] font-serif italic">
            Hypecraft Strategic Journey
          </div>
        </div>
      </section>

      {/* 3. FINAL CTA SECTION (UNPINNED NORMAL SCROLL AFTER JOURNEY) */}
      <section className="final-cta py-24 bg-[#040e21] border-t border-[#D9A21B]/30 relative z-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <p className="text-xs font-semibold text-[#D9A21B] tracking-[0.25em] uppercase">
            START A CONVERSATION
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            Every challenge is different. <br />
            <span className="italic text-[#D9A21B]">Every solution is crafted.</span>
          </h2>
          <p className="text-sm md:text-base text-[#FAFAF7]/80 max-w-xl mx-auto leading-relaxed">
            Strategy, creativity and communication come together to create work that creates lasting influence.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              to="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-[#D9A21B] text-[#071936] text-xs font-bold tracking-[0.2em] uppercase hover:bg-white transition-all shadow-lg inline-flex items-center justify-center gap-3"
            >
              <span>GET IN TOUCH</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full sm:w-auto px-8 py-4 border border-[#FAFAF7]/20 text-xs font-semibold tracking-[0.2em] uppercase hover:border-[#D9A21B] hover:text-[#D9A21B] transition-all inline-flex items-center justify-center cursor-pointer"
            >
              <span>BACK TO TOP</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
