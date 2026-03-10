'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

const GALLERY_IMAGES = [
  '/images/gallery/91d3a304-01bf-44c1-999c-57ed783c030a.jpg',
  '/images/gallery/D8EA513E-6002-4B0E-A480-F8A0F9315466.jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (4).jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (5).jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (9).jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (11).jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (14).jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (17).jpg',
  '/images/gallery/Photo Sep 15 2025, 12 04 39 PM (18).jpg',
];

const VIDEO_SRC = '/images/gallery/6926bae1-7176-49e5-b0b1-ae314ff9868f.mp4';

export default function Gallery() {
  const t = useTranslations('gallery');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const prevImage = () => setLightboxIndex((i) => (i === null ? null : (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length));
  const nextImage = () => setLightboxIndex((i) => (i === null ? null : (i + 1) % GALLERY_IMAGES.length));

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A1A] mb-4">{t('title')}</h2>
          <p className="text-[#6B7280] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
          <div className="w-16 h-1 bg-[#C8102E] mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {GALLERY_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              className="relative aspect-square overflow-hidden rounded-xl cursor-pointer group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              onClick={() => openLightbox(i)}
            >
              <Image
                src={src}
                alt={`Panas Flavor food photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
            </motion.div>
          ))}

          {/* Video tile */}
          <motion.div
            className="relative aspect-square overflow-hidden rounded-xl bg-black group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: GALLERY_IMAGES.length * 0.05 }}
          >
            <video
              src={VIDEO_SRC}
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              muted
              loop
              playsInline
              autoPlay
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white/20 backdrop-blur rounded-full p-4">
                <Play size={32} className="text-white fill-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-[#F5A623] transition-colors"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-[#F5A623] transition-colors"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
            aria-label="Previous"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-[#F5A623] transition-colors"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
            aria-label="Next"
          >
            <ChevronRight size={40} />
          </button>
          <div
            className="relative max-w-4xl max-h-[80vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={GALLERY_IMAGES[lightboxIndex]}
              alt="Gallery image"
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {lightboxIndex + 1} / {GALLERY_IMAGES.length}
          </div>
        </div>
      )}
    </section>
  );
}
