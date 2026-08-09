import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, Tag } from 'lucide-react';
import { fetchInsightBySlug } from '../firebase/dataService';
import { Insight } from '../types';
import { CTASection } from '../components/CTASection';
import { PageBreadcrumb } from '../components/PageBreadcrumb';

export const Article: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!articleSlug) return;
    setLoading(true);
    fetchInsightBySlug(articleSlug).then((data) => {
      setInsight(data);
      setLoading(false);
    });
  }, [articleSlug]);

  if (loading) {
    return (
      <div className="pt-36 pb-24 text-center text-xs uppercase tracking-widest text-[#071936]/60">
        Loading article…
      </div>
    );
  }

  if (!insight) {
    return (
      <div className="pt-36 pb-24 max-w-xl mx-auto px-6 text-center space-y-6">
        <h1 className="text-3xl font-serif text-[#071936]">Article Not Found</h1>
        <p className="text-sm text-[#071936]/70">
          The requested article could not be located or has been archived.
        </p>
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#071936] text-[#FAFAF7] text-xs uppercase font-bold tracking-widest hover:bg-[#D9A21B] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Insights
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 space-y-16">
      
      {/* GO BACK & BREADCRUMB */}
      <PageBreadcrumb
        items={[
          { label: 'Insights', path: '/insights' },
          { label: insight.title }
        ]}
        backToLabel="Insights Journal"
        backToPath="/insights"
      />

      {/* HEADER */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 space-y-6">
        <Link
          to="/insights"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#071936]/60 hover:text-[#D9A21B] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Insights Journal
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[#D9A21B] tracking-wider uppercase">
            <span className="px-2.5 py-1 bg-[#071936] text-[#D9A21B]">
              {insight.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {insight.readingTime}
            </span>
            <span>•</span>
            <span>{insight.publishedAt}</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif text-[#071936] leading-tight">
            {insight.title}
          </h1>

          <div className="flex items-center gap-2 pt-2 text-xs text-[#071936]/60 font-semibold uppercase">
            <User className="w-3.5 h-3.5 text-[#D9A21B]" />
            <span>By {insight.author}</span>
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}
      <section className="max-w-5xl mx-auto px-6 md:px-12">
        <div className="aspect-16/9 overflow-hidden rounded-xs border border-[#E9E9E4] shadow-md">
          <img
            src={insight.coverImage}
            alt={insight.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* ARTICLE CONTENT */}
      <article className="max-w-3xl mx-auto px-6 md:px-12 space-y-6 font-sans text-base text-[#071936]/90 leading-relaxed">
        {insight.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}

        {insight.tags && insight.tags.length > 0 && (
          <div className="pt-8 border-t border-[#E9E9E4] flex flex-wrap items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-[#D9A21B]" />
            {insight.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#E9E9E4]/50 text-[#071936] text-xs font-medium rounded-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </article>

      <CTASection />

    </div>
  );
};
