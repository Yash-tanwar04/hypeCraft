import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PageBreadcrumbProps {
  items?: BreadcrumbItem[];
  backToLabel?: string;
  backToPath?: string;
}

export const PageBreadcrumb: React.FC<PageBreadcrumbProps> = ({
  items = [],
  backToLabel = 'Services Overview',
  backToPath = '/services'
}) => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto px-6 md:px-12 pt-4 pb-2">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#071936]/10 pb-4">
        
        {/* Back navigation buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(backToPath)}
            className="inline-flex items-center gap-2.5 text-xs font-bold tracking-[0.18em] uppercase text-[#071936] hover:text-[#D9A21B] transition-colors py-1 group cursor-pointer"
            title={`Return to ${backToLabel}`}
          >
            <div className="w-8 h-8 rounded-full border border-[#071936]/20 group-hover:border-[#D9A21B] group-hover:bg-[#D9A21B]/10 flex items-center justify-center transition-all shadow-xs">
              <ArrowLeft className="w-4 h-4 text-[#071936] group-hover:text-[#D9A21B] transition-transform group-hover:-translate-x-0.5" />
            </div>
            <span>Back to {backToLabel}</span>
          </button>

          {backToPath !== '/' && (
            <>
              <span className="text-[#071936]/20">|</span>
              <Link
                to="/"
                className="text-[11px] font-semibold tracking-wider text-[#071936]/60 hover:text-[#D9A21B] transition-colors uppercase"
              >
                Home
              </Link>
            </>
          )}
        </div>

        {/* Trail Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#071936]/60">
          <Link to="/" className="hover:text-[#D9A21B] transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Home</span>
          </Link>

          {items.map((item, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-[#071936]/30" />
              {item.path ? (
                <Link to={item.path} className="hover:text-[#D9A21B] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-[#D9A21B]">{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

      </div>
    </div>
  );
};
