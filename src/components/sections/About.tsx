'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Truck, Calendar } from 'lucide-react';

export default function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/gallery/Photo Sep 15 2025, 12 04 39 PM (18).jpg"
                alt="Panas Flavor food truck"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 -right-6 bg-[#C8102E] text-white rounded-2xl p-4 shadow-xl max-w-[200px] text-center">
              <Truck size={28} className="mx-auto mb-2" />
              <p className="text-xs font-bold leading-tight">{t('second_truck')}</p>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Calendar size={16} className="text-[#C8102E]" />
              <span className="text-[#C8102E] font-semibold text-sm">{t('since')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-6">{t('title')}</h2>
            <div className="w-12 h-1 bg-[#C8102E] mb-8 rounded-full" />

            <div className="space-y-4 text-[#6B7280] leading-relaxed">
              <p>{t('content_p1')}</p>
              <p>{t('content_p2')}</p>
              <p>{t('content_p3')}</p>
              <p>{t('content_p4')}</p>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="https://instagram.com/PanasFlavor"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#333] transition-colors"
              >
                Follow on Instagram
              </a>
              <a
                href="#catering-form"
                className="inline-flex items-center gap-2 border-2 border-[#C8102E] text-[#C8102E] font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#C8102E] hover:text-white transition-colors"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
