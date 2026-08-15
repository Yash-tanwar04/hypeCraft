import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HypecraftLogo } from './HypecraftLogo';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    { name: 'SERVICES', path: '/services' },
    { name: 'PARTNERS', path: '/partners' },
    { name: 'INSIGHTS', path: '/insights' },
    { name: 'CONTACT', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  // Determine if the current page has a dark background
  const isDarkPage = location.pathname === '/services';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? isDarkPage
              ? 'bg-[#071936]/90 backdrop-blur-md py-3 shadow-md border-b border-[#FAFAF7]/10'
              : 'bg-[#FAFAF7]/90 backdrop-blur-md py-3 shadow-xs border-b border-[#E9E9E4]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link to="/" className="group flex items-center gap-2">
            <HypecraftLogo size="md" dark={isDarkPage} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-semibold tracking-[0.15em]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-1 transition-colors duration-200 hover:text-[#D9A21B] ${
                  isActive(link.path)
                    ? 'text-[#D9A21B]'
                    : isDarkPage
                    ? 'text-[#FAFAF7]/90 hover:text-[#D9A21B]'
                    : 'text-[#071936] hover:text-[#D9A21B]'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D9A21B]" />
                )}
              </Link>
            ))}
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#D9A21B] text-xs font-semibold tracking-wider transition-all duration-300 group ${
                isDarkPage
                  ? 'text-[#FAFAF7] hover:bg-[#D9A21B] hover:text-[#071936]'
                  : 'text-[#071936] hover:bg-[#D9A21B] hover:text-white'
              }`}
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#D9A21B] group-hover:text-current" />
            </Link>
            <Link
              to="/contact"
              className={`w-10 h-10 border border-[#D9A21B] rounded-full flex items-center justify-center transition-all duration-300 text-sm font-semibold cursor-pointer ${
                isDarkPage
                  ? 'text-[#D9A21B] hover:bg-[#D9A21B] hover:text-[#071936]'
                  : 'text-[#D9A21B] hover:bg-[#D9A21B] hover:text-white'
              }`}
            >
              ↗
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors ${
              isDarkPage ? 'text-white hover:text-[#D9A21B]' : 'text-[#071936] hover:text-[#D9A21B]'
            }`}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#071936] text-[#FAFAF7] flex flex-col justify-between p-8 md:p-12 animate-in fade-in duration-300 lg:hidden">
          <div className="flex items-center justify-between border-b border-[#071936]/40 pb-6">
            <HypecraftLogo size="md" dark />
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white hover:text-[#D9A21B] transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="my-auto space-y-6">
            <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
              Navigation
            </p>
            <nav className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-2xl md:text-4xl font-serif tracking-wide transition-colors ${
                    isActive(link.path) ? 'text-[#D9A21B] italic' : 'text-white hover:text-[#D9A21B]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="border-t border-[#FAFAF7]/10 pt-8 space-y-4">
            <p className="text-xs text-[#FAFAF7]/60 tracking-wider">
              Strategic communication. Creative thinking.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center w-full py-4 bg-[#D9A21B] text-[#071936] text-sm font-bold tracking-widest uppercase hover:bg-white transition-colors gap-2"
            >
              <span>Let's Start a Conversation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
};
