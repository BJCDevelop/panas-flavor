'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  alternativeDate: string;
  eventType: string;
  guests: string;
  location: string;
  details: string;
  howFound: string;
  honeypot: string;
}

const initialForm: FormData = {
  name: '',
  email: '',
  phone: '',
  preferredDate: '',
  alternativeDate: '',
  eventType: '',
  guests: '',
  location: '',
  details: '',
  howFound: '',
  honeypot: '',
};

export default function CateringForm() {
  const t = useTranslations('catering_form');
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = t('required');
    if (!form.email.trim()) newErrors.email = t('required');
    if (!form.phone.trim()) newErrors.phone = t('required');
    if (!form.preferredDate) newErrors.preferredDate = t('required');
    if (!form.eventType) newErrors.eventType = t('required');
    if (!form.guests) newErrors.guests = t('required');
    if (!form.location.trim()) newErrors.location = t('required');
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot: if honeypot is filled, silently fail
    if (form.honeypot) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/catering-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const inputClass = (field: keyof FormData) =>
    `w-full px-4 py-3 rounded-xl border text-[#1A1A1A] text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] transition-colors ${
      errors[field] ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
    }`;

  const labelClass = 'block text-sm font-semibold text-[#1A1A1A] mb-1.5';

  return (
    <section id="catering-form" className="py-20 bg-[#1A1A1A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">{t('title')}</h2>
          <p className="text-white/60 text-lg">{t('subtitle')}</p>
          <div className="w-16 h-1 bg-[#F5A623] mx-auto mt-6 rounded-full" />
        </motion.div>

        {status === 'success' ? (
          <motion.div
            className="bg-green-900/30 border border-green-500/30 rounded-2xl p-8 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={48} className="text-green-400 mx-auto mb-4" />
            <p className="text-white text-lg">{t('success')}</p>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            noValidate
          >
            {/* Honeypot field - visually hidden */}
            <div className="absolute opacity-0 pointer-events-none" aria-hidden="true">
              <input
                type="text"
                name="honeypot"
                value={form.honeypot}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className={labelClass}>{t('name')} *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass('name')}
                  autoComplete="name"
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>{t('email')} *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass('email')}
                  autoComplete="email"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>{t('phone')} *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className={inputClass('phone')}
                  autoComplete="tel"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Event Type */}
              <div>
                <label className={labelClass}>{t('event_type')} *</label>
                <select
                  name="eventType"
                  value={form.eventType}
                  onChange={handleChange}
                  className={inputClass('eventType')}
                >
                  <option value="">{t('select_event_type')}</option>
                  <option value="Corporate">{t('event_types.corporate')}</option>
                  <option value="Private Party">{t('event_types.private')}</option>
                  <option value="Wedding">{t('event_types.wedding')}</option>
                  <option value="Festival">{t('event_types.festival')}</option>
                  <option value="School">{t('event_types.school')}</option>
                  <option value="Brewery">{t('event_types.brewery')}</option>
                  <option value="Other">{t('event_types.other')}</option>
                </select>
                {errors.eventType && <p className="text-red-500 text-xs mt-1">{errors.eventType}</p>}
              </div>

              {/* Preferred Date */}
              <div>
                <label className={labelClass}>{t('date')} *</label>
                <input
                  type="date"
                  name="preferredDate"
                  value={form.preferredDate}
                  onChange={handleChange}
                  className={inputClass('preferredDate')}
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.preferredDate && <p className="text-red-500 text-xs mt-1">{errors.preferredDate}</p>}
              </div>

              {/* Alternative Date */}
              <div>
                <label className={labelClass}>{t('alt_date')}</label>
                <input
                  type="date"
                  name="alternativeDate"
                  value={form.alternativeDate}
                  onChange={handleChange}
                  className={inputClass('alternativeDate')}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Guests */}
              <div>
                <label className={labelClass}>{t('guests')} *</label>
                <select
                  name="guests"
                  value={form.guests}
                  onChange={handleChange}
                  className={inputClass('guests')}
                >
                  <option value="">{t('select_guests')}</option>
                  <option value="20-50">{t('guest_options.20_50')}</option>
                  <option value="50-100">{t('guest_options.50_100')}</option>
                  <option value="100-150">{t('guest_options.100_150')}</option>
                  <option value="150+">{t('guest_options.150_plus')}</option>
                </select>
                {errors.guests && <p className="text-red-500 text-xs mt-1">{errors.guests}</p>}
              </div>

              {/* How Found */}
              <div>
                <label className={labelClass}>{t('how_found')}</label>
                <select
                  name="howFound"
                  value={form.howFound}
                  onChange={handleChange}
                  className={inputClass('howFound')}
                >
                  <option value="">{t('select_how_found')}</option>
                  <option value="Instagram">{t('how_found_options.instagram')}</option>
                  <option value="Facebook">{t('how_found_options.facebook')}</option>
                  <option value="Google">{t('how_found_options.google')}</option>
                  <option value="Referral">{t('how_found_options.referral')}</option>
                  <option value="Other">{t('how_found_options.other')}</option>
                </select>
              </div>

              {/* Location - full width */}
              <div className="sm:col-span-2">
                <label className={labelClass}>{t('location')} *</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className={inputClass('location')}
                  placeholder="Address or venue name"
                />
                {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
              </div>

              {/* Details - full width */}
              <div className="sm:col-span-2">
                <label className={labelClass}>{t('details')}</label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  rows={4}
                  className={`${inputClass('details')} resize-none`}
                  placeholder={t('details_placeholder')}
                />
              </div>
            </div>

            {/* Error message */}
            {status === 'error' && (
              <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 rounded-xl p-4">
                <AlertCircle size={20} />
                <p className="text-sm">{t('error')}</p>
              </div>
            )}

            {/* Submit */}
            <div className="mt-8">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-[#C8102E] hover:bg-[#a00d24] disabled:bg-gray-400 text-white font-bold py-4 rounded-xl text-base transition-colors flex items-center justify-center gap-2"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  t('submit')
                )}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </section>
  );
}
