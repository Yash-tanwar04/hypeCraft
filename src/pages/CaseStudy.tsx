import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Tag, Layers } from 'lucide-react';
import { fetchProjectBySlug, fetchProjects } from '../firebase/dataService';
import { Project } from '../types';
import { CTASection } from '../components/CTASection';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export const CaseStudy: React.FC = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectSlug) return;
    setLoading(true);

    fetchProjectBySlug(projectSlug).then((data) => {
      if (!data) {
        setProject(null);
        setLoading(false);
        return;
      }
      setProject(data);

      // Fetch list to get next project
      fetchProjects().then((all) => {
        const idx = all.findIndex((p) => p.slug === projectSlug);
        if (idx !== -1 && idx < all.length - 1) {
          setNextProject(all[idx + 1]);
        } else if (all.length > 0) {
          setNextProject(all[0]);
        }
        setLoading(false);
      });
    });
  }, [projectSlug]);

  if (loading) {
    return (
      <div className="pt-36 pb-24 text-center text-xs uppercase tracking-widest text-[#071936]/60">
        Loading case study…
      </div>
    );
  }

  if (!project) {
    return (
      <div className="pt-36 pb-24 max-w-xl mx-auto px-6 text-center space-y-6">
        <h1 className="text-3xl font-serif text-[#071936]">Case Study Not Found</h1>
        <p className="text-sm text-[#071936]/70">
          The requested project case study could not be located or has been archived.
        </p>
        <Link
          to="/work"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#071936] text-[#FAFAF7] text-xs uppercase font-bold tracking-widest hover:bg-[#D9A21B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Work
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 space-y-16">
      
      {/* GO BACK & BREADCRUMB */}
      <PageBreadcrumb
        items={[
          { label: 'Work', path: '/work' },
          { label: project.title }
        ]}
        backToLabel="Selected Work"
        backToPath="/work"
      />

      {/* HEADER & METADATA */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 space-y-8">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#071936]/60 hover:text-[#D9A21B] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Selected Work
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#D9A21B] tracking-wider uppercase">
            <span className="px-2.5 py-1 bg-[#071936] text-[#D9A21B]">
              {project.isConcept ? 'Concept Project' : 'Selected Project'}
            </span>
            <span>•</span>
            <span>{project.category}</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif text-[#071936] leading-tight">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl font-serif text-[#071936]/80 leading-relaxed italic">
            "{project.shortDescription}"
          </p>
        </div>
      </section>

      {/* HERO IMAGE */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="aspect-16/9 overflow-hidden rounded-xs border border-[#E9E9E4] shadow-lg">
          <img
            src={project.heroImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'; }}
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* STRUCTURED CASE STUDY DETAILS */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 space-y-12">
        
        {/* Challenge & Objective */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#E9E9E4] pb-10">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
              01 / THE CHALLENGE
            </h3>
            <p className="text-sm text-[#071936]/80 font-sans leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
              02 / OBJECTIVE
            </h3>
            <p className="text-sm text-[#071936]/80 font-sans leading-relaxed">
              {project.objective}
            </p>
          </div>
        </div>

        {/* Strategy & Creative Direction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-[#E9E9E4] pb-10">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
              03 / STRATEGY
            </h3>
            <p className="text-sm text-[#071936]/80 font-sans leading-relaxed">
              {project.strategy}
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
              04 / CREATIVE DIRECTION
            </h3>
            <p className="text-sm text-[#071936]/80 font-sans leading-relaxed">
              {project.creativeDirection}
            </p>
          </div>
        </div>

        {/* Execution & Outcome */}
        <div className="space-y-8 border-b border-[#E9E9E4] pb-10">
          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
              05 / EXECUTION
            </h3>
            <p className="text-sm text-[#071936]/80 font-sans leading-relaxed">
              {project.execution}
            </p>
          </div>

          {project.outcome && (
            <div className="p-6 bg-[#FAFAF7] border border-[#E9E9E4] space-y-2">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
                06 / OUTCOME & IMPACT
              </h3>
              <p className="text-sm font-serif text-[#071936] leading-relaxed">
                {project.outcome}
              </p>
            </div>
          )}
        </div>

        {/* GALLERY */}
        {project.galleryImages && project.galleryImages.length > 0 && (
          <div className="space-y-6 pt-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
              PROJECT GALLERY
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.galleryImages.map((img, i) => (
                <div key={i} className="aspect-4/3 overflow-hidden border border-[#E9E9E4]">
                  <img
                    src={img}
                    alt={`${project.title} detail ${i + 1}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80'; }}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      {/* NEXT PROJECT NAVIGATION */}
      {nextProject && (
        <section className="bg-[#071936] text-white py-16">
          <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <p className="text-[10px] text-[#D9A21B] tracking-widest uppercase">NEXT CASE STUDY</p>
              <h4 className="text-2xl font-serif text-white">{nextProject.title}</h4>
              <p className="text-xs text-white/60">{nextProject.category}</p>
            </div>
            <Link
              to={`/work/${nextProject.slug}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#D9A21B] text-[#071936] text-xs font-bold tracking-widest uppercase hover:bg-white transition-colors"
            >
              <span>View Next Case Study</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      <CTASection />

    </div>
  );
};
