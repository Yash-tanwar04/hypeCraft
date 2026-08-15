import React from 'react';
import { Link } from 'react-router-dom';
import { HypecraftLogo } from './HypecraftLogo';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071936] text-[#FAFAF7] pt-20 pb-12 border-t border-[#071936]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#FAFAF7]/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <HypecraftLogo size="lg" dark />
            <p className="text-[#FAFAF7]/80 text-sm leading-relaxed max-w-md font-sans">
              Strategic communication. Creative thinking. Meaningful impact.
            </p>
            
            {/* Direct Contact Details */}
            <div className="space-y-2 text-xs font-sans text-[#FAFAF7]/80 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[#D9A21B] font-semibold tracking-wider text-[11px] uppercase">Email:</span>
                <a
                  href="mailto:hypecraft79@gmail.com"
                  className="text-[#FAFAF7] hover:text-[#D9A21B] transition-colors"
                >
                  hypecraft79@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#D9A21B] font-semibold tracking-wider text-[11px] uppercase">Phone:</span>
                <a
                  href="tel:+919717973949"
                  className="text-[#FAFAF7] hover:text-[#D9A21B] transition-colors"
                >
                  +91 97179 73949
                </a>
              </div>
            </div>

            {/* Social Media Handles with Real Official Logos */}
            <div className="space-y-3 pt-2">
              <p className="text-xs text-[#D9A21B] font-semibold tracking-widest uppercase">
                Connect With Us
              </p>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/hyp.ecraft?utm_source=qr&igsh=MTQxZ3F2Z2dhYmEzNA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hypecraft on Instagram"
                  className="w-9 h-9 rounded-full bg-[#FAFAF7]/5 hover:bg-[#D9A21B] border border-[#FAFAF7]/15 hover:border-[#D9A21B] text-[#FAFAF7] hover:text-[#071936] flex items-center justify-center transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61592467641163&mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hypecraft on Facebook"
                  className="w-9 h-9 rounded-full bg-[#FAFAF7]/5 hover:bg-[#D9A21B] border border-[#FAFAF7]/15 hover:border-[#D9A21B] text-[#FAFAF7] hover:text-[#071936] flex items-center justify-center transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>

                {/* Twitter / X */}
                <a
                  href="https://x.com/Hypecraftfa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hypecraft on X (Twitter)"
                  className="w-9 h-9 rounded-full bg-[#FAFAF7]/5 hover:bg-[#D9A21B] border border-[#FAFAF7]/15 hover:border-[#D9A21B] text-[#FAFAF7] hover:text-[#071936] flex items-center justify-center transition-all duration-300 group"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/hype-craft-2a93a3424?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Hypecraft on LinkedIn"
                  className="w-9 h-9 rounded-full bg-[#FAFAF7]/5 hover:bg-[#D9A21B] border border-[#FAFAF7]/15 hover:border-[#D9A21B] text-[#FAFAF7] hover:text-[#071936] flex items-center justify-center transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/919717973949"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Hypecraft on WhatsApp"
                  className="w-9 h-9 rounded-full bg-[#FAFAF7]/5 hover:bg-[#25D366] border border-[#FAFAF7]/15 hover:border-[#25D366] text-[#FAFAF7] hover:text-white flex items-center justify-center transition-all duration-300 group"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
              </div>
            </div>

            <p className="text-xs text-[#D9A21B] font-semibold tracking-widest uppercase">
              STRATEGY • COMMUNICATION • CREATIVITY
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link to="/" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-[#FAFAF7]/70 hover:text-white transition-colors">About Hypecraft</Link>
              </li>
              <li>
                <Link to="/partners" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Our Partners</Link>
              </li>
              <li>
                <Link to="/services" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Services Overview</Link>
              </li>
              <li>
                <Link to="/insights" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Insights & Articles</Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Practice Areas */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] text-[#D9A21B] uppercase">
              Practices
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider">
              <li>
                <Link to="/services/political-pr" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Political PR</Link>
              </li>
              <li>
                <Link to="/services/digital-marketing" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Digital Marketing</Link>
              </li>
              <li>
                <Link to="/services/branding" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Branding & Visual Systems</Link>
              </li>
              <li>
                <Link to="/services/video-content" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Video Content & Stories</Link>
              </li>
              <li>
                <Link to="/services/graphic-design" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Graphic & Editorial Design</Link>
              </li>
              <li>
                <Link to="/services/business-consultancy" className="text-[#FAFAF7]/70 hover:text-white transition-colors">Business Management Consultancy</Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAFAF7]/50 pb-4 md:pb-0">
          <p>© 2026 Hypecraft. All rights reserved.</p>
          <div className="flex items-center space-x-6 md:pr-24 z-10 relative">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/admin/login" className="text-[#D9A21B]/80 hover:text-[#D9A21B] transition-colors flex items-center gap-1 font-medium">
              Admin Portal <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
