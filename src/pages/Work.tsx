import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { fetchProjects } from '../firebase/dataService';
import { Project } from '../types';
import { CTASection } from '../components/CTASection';

export const Work: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Political PR',
    'Digital Marketing',
    'Branding',
    'Video Content',
    'Graphic Design',
    'Business Consultancy'
  ];

  useEffect(() => {
    fetchProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <div className="pt-28 space-y-16">
      
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8 space-y-6">
        <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
          SELECTED PORTFOLIO
        </p>
        <h1 className="text-4xl md:text-6xl font-serif text-[#071936]">
          Work that speaks <br />
          <span className="italic text-[#D9A21B]">beyond the brief.</span>
        </h1>
        <p className="text-base text-[#071936]/80 font-sans max-w-2xl leading-relaxed">
          An editorial archive of strategic communication campaigns, identity systems, digital platforms, and narrative architecture.
        </p>
      </section>

      {/* FILTER BAR */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-2 pb-4 border-b border-[#E9E9E4] overflow-x-auto no-scrollbar">
          <Filter className="w-4 h-4 text-[#D9A21B] shrink-0 mr-2" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider transition-all duration-200 whitespace-nowrap rounded-xs ${
                activeCategory === cat
                  ? 'bg-[#071936] text-[#FAFAF7]'
                  : 'bg-[#E9E9E4]/40 text-[#071936]/70 hover:bg-[#E9E9E4] hover:text-[#071936]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pb-12">
        {loading ? (
          <div className="py-20 text-center text-xs tracking-widest text-[#071936]/50 uppercase">
            Loading selected work…
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-20 text-center text-xs tracking-widest text-[#071936]/50 uppercase">
            No projects found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id || proj.slug}
                className="group bg-[#FAFAF7] border border-[#E9E9E4] hover:border-[#D9A21B] transition-all duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-md"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-[#E9E9E4]">
                  <img
                    src={proj.heroImage}
                    alt={proj.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#071936]/90 text-[10px] uppercase font-semibold text-[#D9A21B] tracking-wider">
                    {proj.isConcept ? 'Concept Project' : 'Selected Project'}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[11px] text-[#D9A21B] tracking-wider font-semibold">
                      <span>{proj.category}</span>
                      <span>{proj.year}</span>
                    </div>
                    <h3 className="text-xl font-serif text-[#071936] group-hover:text-[#D9A21B] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#071936]/70 font-sans line-clamp-2 leading-relaxed">
                      {proj.shortDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#E9E9E4]">
                    <Link
                      to={`/work/${proj.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-semibold text-[#071936] group-hover:text-[#D9A21B] transition-colors"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <CTASection />

    </div>
  );
};
