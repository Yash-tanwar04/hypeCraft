import React from 'react';
import { useLocation } from 'react-router-dom';

export const Legal: React.FC = () => {
  const location = useLocation();
  const isPrivacy = location.pathname.includes('privacy');

  return (
    <div className="pt-28 pb-24 max-w-4xl mx-auto px-6 md:px-12 space-y-8 font-sans">
      <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
        LEGAL & COMPLIANCE
      </p>

      <h1 className="text-3xl md:text-5xl font-serif text-[#071936]">
        {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
      </h1>

      <div className="space-y-6 text-sm text-[#071936]/80 leading-relaxed border-t border-[#E9E9E4] pt-8">
        {isPrivacy ? (
          <>
            <p>
              At Hypecraft, we adhere to strict confidentiality and privacy standards regarding all client inquiries, communications strategies, and proprietary project information.
            </p>
            <h3 className="text-lg font-serif text-[#071936] pt-4">1. Data Collection & Usage</h3>
            <p>
              Information submitted through our contact form or consultancy inquiries is used exclusively to evaluate and respond to your strategic requirements. We do not sell, share, or market personal information to third parties.
            </p>
            <h3 className="text-lg font-serif text-[#071936] pt-4">2. Non-Disclosure & Confidentiality</h3>
            <p>
              All discussions regarding political PR, brand architecture, crisis management, and corporate strategy are treated with the highest degree of non-disclosure protection.
            </p>
          </>
        ) : (
          <>
            <p>
              Welcome to Hypecraft. By accessing our services, portfolio materials, or engaging our consultancy, you agree to comply with the following terms.
            </p>
            <h3 className="text-lg font-serif text-[#071936] pt-4">1. Intellectual Property</h3>
            <p>
              All case studies, visual assets, strategy frameworks, and editorial articles displayed on this site remain the intellectual property of Hypecraft unless otherwise assigned under contract.
            </p>
            <h3 className="text-lg font-serif text-[#071936] pt-4">2. Strategic Advisory Engagements</h3>
            <p>
              Professional consultancy services are rendered under custom Master Service Agreements (MSA) tailored to specific strategic scope, objectives, and ethical compliance standards.
            </p>
          </>
        )}
      </div>
    </div>
  );
};
