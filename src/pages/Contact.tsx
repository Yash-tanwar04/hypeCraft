import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { submitEnquiry } from '../firebase/dataService';
import { sendInquiryEmails } from '../utils/emailService';
import { Mail, Phone as PhoneIcon, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    service: preselectedService || 'Political PR',
    projectType: 'New Strategy & Launch',
    budgetRange: '$25,000 - $50,000',
    timeline: '1 - 3 Months',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) errs.message = 'Please provide details about your inquiry';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const enquiryPayload = {
        name: formData.name.trim(),
        organization: formData.organization.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        message: formData.message.trim(),
      };

      // 1. Save enquiry to database/storage so it is visible in the admin portal
      await submitEnquiry(enquiryPayload);

      // 2. Forward inquiry email to hypecraft79@gmail.com and rajulala1100@gmail.com
      await sendInquiryEmails(enquiryPayload);

      setSubmitted(true);
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        service: 'Political PR',
        projectType: 'New Strategy & Launch',
        budgetRange: '$25,000 - $50,000',
        timeline: '1 - 3 Months',
        message: '',
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage("Something went wrong while sending your enquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-24 space-y-16">
      
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-8">
        <div className="max-w-3xl space-y-6">
          <p className="text-[#D9A21B] text-xs font-semibold tracking-[0.25em] uppercase">
            CONTACT HYPECRAFT
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-[#071936]">
            Let's start a <br />
            <span className="italic text-[#D9A21B]">conversation.</span>
          </h1>
          <p className="text-lg font-serif text-[#071936]/80 leading-relaxed pt-2">
            Tell us what you're building, solving or communicating. We'll take it from there.
          </p>
        </div>
      </section>

      {/* FORM & DIRECT CONTACT INFO */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-4 space-y-8 bg-[#071936] text-white p-8 md:p-10 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-xl font-serif text-white border-b border-white/20 pb-4">
              Direct Inquiries
            </h3>

            <div className="space-y-4 text-xs font-sans text-white/80 leading-relaxed">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#D9A21B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[10px]">Email Address</p>
                  <a
                    href="mailto:hypecraft79@gmail.com"
                    className="text-sm text-white hover:text-[#D9A21B] transition-colors"
                  >
                    hypecraft79@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon className="w-4 h-4 text-[#D9A21B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[10px]">Direct Phone & Hotline</p>
                  <a
                    href="tel:+919717973949"
                    className="text-sm text-white hover:text-[#D9A21B] transition-colors"
                  >
                    +91 97179 73949
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D9A21B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[10px]">Consultancy Presence</p>
                  <p className="text-sm">Strategic Communications & Advisory</p>
                </div>
              </div>
            </div>

            {/* Social & WhatsApp Direct Connect */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <p className="font-semibold text-white uppercase tracking-wider text-[10px]">Connect Directly</p>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://wa.me/919717973949"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/hyp.ecraft?utm_source=qr&igsh=MTQxZ3F2Z2dhYmEzNA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D9A21B] text-white hover:text-[#071936] flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61592467641163&mibextid=rS40aB7S9Ucbxw6v"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D9A21B] text-white hover:text-[#071936] flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.69 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/Hypecraftfa"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D9A21B] text-white hover:text-[#071936] flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/hype-craft-2a93a3424?utm_source=share_via&utm_content=profile&utm_medium=member_android"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#D9A21B] text-white hover:text-[#071936] flex items-center justify-center transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 space-y-2 text-xs text-[#D9A21B]">
            <p className="font-serif italic text-sm text-white">"Strategy meets creativity."</p>
            <p className="text-[10px] tracking-widest uppercase">Strict Confidentiality Assured</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-8 bg-[#FAFAF7] border border-[#E9E9E4] p-8 md:p-12">
          {submitted ? (
            <div className="py-16 text-center space-y-6 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-full bg-[#D9A21B]/20 flex items-center justify-center text-[#D9A21B]">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-serif text-[#071936]">Message Received</h2>
              <p className="text-sm text-[#071936]/80 max-w-md mx-auto leading-relaxed">
                Thank you. Your message has been received. We'll be in touch soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-3 bg-[#071936] text-[#FAFAF7] text-xs font-bold tracking-widest uppercase hover:bg-[#D9A21B] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-wider text-[#071936]">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border ${
                      errors.name ? 'border-red-500' : 'border-[#E9E9E4]'
                    } text-xs text-[#071936] focus:outline-none focus:border-[#D9A21B]`}
                    placeholder="e.g. Eleanor Vance"
                  />
                  {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-org" className="text-xs font-semibold uppercase tracking-wider text-[#071936]">
                    Organization / Company
                  </label>
                  <input
                    id="contact-org"
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E9E9E4] text-xs text-[#071936] focus:outline-none focus:border-[#D9A21B]"
                    placeholder="e.g. Sovereign Policy Institute"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-[#071936]">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-3 bg-white border ${
                      errors.email ? 'border-red-500' : 'border-[#E9E9E4]'
                    } text-xs text-[#071936] focus:outline-none focus:border-[#D9A21B]`}
                    placeholder="e.g. e.vance@sovereign.org"
                  />
                  {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wider text-[#071936]">
                    Phone Number
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E9E9E4] text-xs text-[#071936] focus:outline-none focus:border-[#D9A21B]"
                    placeholder="e.g. +1 555-0192"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label htmlFor="contact-service" className="text-xs font-semibold uppercase tracking-wider text-[#071936]">
                    Service Required
                  </label>
                  <select
                    id="contact-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E9E9E4] text-xs text-[#071936] focus:outline-none focus:border-[#D9A21B]"
                  >
                    <option value="Political PR">Political PR</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Branding">Branding</option>
                    <option value="Video Content">Video Content</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="Business Consultancy">Business Consultancy</option>
                    <option value="Other">Other Strategic Requirement</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="contact-budget" className="text-xs font-semibold uppercase tracking-wider text-[#071936]">
                    Budget Range
                  </label>
                  <select
                    id="contact-budget"
                    value={formData.budgetRange}
                    onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                    className="w-full px-4 py-3 bg-white border border-[#E9E9E4] text-xs text-[#071936] focus:outline-none focus:border-[#D9A21B]"
                  >
                    <option value="< $25,000">&lt; $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                    <option value="$100,000+">$100,000+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="contact-msg" className="text-xs font-semibold uppercase tracking-wider text-[#071936]">
                  Project Message & Strategic Objectives *
                </label>
                <textarea
                  id="contact-msg"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.message ? 'border-red-500' : 'border-[#E9E9E4]'
                  } text-xs text-[#071936] focus:outline-none focus:border-[#D9A21B]`}
                  placeholder="Describe your positioning challenge, key timeline goals, or upcoming public campaign..."
                />
                {errors.message && <p className="text-[10px] text-red-500">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#071936] text-[#FAFAF7] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D9A21B] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Enquiry…</span>
                  </>
                ) : (
                  <>
                    <span>Send Enquiry</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>
          )}
        </div>

      </section>

    </div>
  );
};
