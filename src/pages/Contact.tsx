import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { submitEnquiry } from '../firebase/dataService';
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
      await submitEnquiry({
        name: formData.name.trim(),
        organization: formData.organization.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        projectType: formData.projectType,
        budgetRange: formData.budgetRange,
        timeline: formData.timeline,
        message: formData.message.trim(),
      });
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
                  <p className="font-semibold text-white uppercase tracking-wider text-[10px]">General & Advisory</p>
                  <p className="text-sm">inquiries@hypecraft.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <PhoneIcon className="w-4 h-4 text-[#D9A21B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[10px]">Consultancy Hotline</p>
                  <p className="text-sm">+1 (800) 555-HYPE</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D9A21B] shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white uppercase tracking-wider text-[10px]">Global Headquarters</p>
                  <p className="text-sm">Strategic Communications Suite, London & New York</p>
                </div>
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
