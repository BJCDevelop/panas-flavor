'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const MENU_ITEMS = [
  { key: 'arepas', emoji: '🫓', image: '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (4).jpg' },
  { key: 'tequenos', emoji: '🧀', image: '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (5).jpg' },
  { key: 'empanadas', emoji: '🥟', image: '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (9).jpg' },
  { key: 'cachapas', emoji: '🌽', image: '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (11).jpg' },
  { key: 'bowls', emoji: '🥣', image: '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (14).jpg' },
  { key: 'postres', emoji: '🍮', image: '/images/gallery/91d3a304-01bf-44c1-999c-57ed783c030a.jpg' },
  { key: 'bebidas', emoji: '🥤', image: '/images/gallery/D8EA513E-6002-4B0E-A480-F8A0F9315466.jpg' },
] as const;

const PAST_EVENTS_IMAGES = [
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (17).jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (18).jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (4).jpg',
];

const EVENT_TYPES = ['Breweries', 'Festivals', 'Corporate Events', 'Private Parties', 'Schools'];

export default function CateringMenu() {
  const t = useTranslations('menu');

  return (
    <section id="catering" className="py-20 bg-[#FAFAF8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4">{t('title')}</h2>
          <p className="text-[#6B7280] text-lg max-w-2xl mx-auto">{t('subtitle')}</p>
          <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {MENU_ITEMS.map(({ key, emoji, image }, i) => (
            <motion.div
              key={key}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={image}
                  alt={t(`items.${key}.name` as any)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                <div className="absolute top-3 left-3 text-2xl">{emoji}</div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-[#1A1A1A] text-lg mb-1">{t(`items.${key}.name` as any)}</h3>
                <p className="text-[#6B7280] text-sm mb-3">{t(`items.${key}.description` as any)}</p>
                <p className="text-[#C8102E] text-xs font-semibold italic">{t('custom_pricing')}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mb-20">
          <a
            href="#catering-form"
            className="inline-block bg-[#C8102E] hover:bg-[#a00d24] text-white font-bold px-10 py-4 rounded-full text-base transition-colors shadow-lg"
          >
            {t('request_quote')}
          </a>
        </div>

        {/* Past Experiences */}
        <div>
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1A1A] mb-4">{t('experiences_title')}</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              {EVENT_TYPES.map((event) => (
                <span
                  key={event}
                  className="bg-[#1A1A1A] text-white text-sm font-medium px-4 py-1.5 rounded-full"
                >
                  {event}
                </span>
              ))}
            </div>
            <p className="text-[#6B7280] text-sm">{t('events_served')}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PAST_EVENTS_IMAGES.map((src, i) => (
              <motion.div
                key={src + i}
                className="relative aspect-video rounded-xl overflow-hidden"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Image
                  src={src}
                  alt={`Past event ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
