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
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#FAFAF7]/50">
          <p>© 2026 Hypecraft. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>•</span>
            <Link to="/admin/login" className="text-[#D9A21B]/70 hover:text-[#D9A21B] transition-colors flex items-center gap-1">
              Admin Portal <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
