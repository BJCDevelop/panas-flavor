import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Instagram, Facebook } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const navLinks = [
    { href: '#gallery', label: tNav('gallery') },
    { href: '#catering', label: tNav('catering') },
    { href: '#schedule', label: tNav('schedule') },
    { href: '#about', label: tNav('about') },
    { href: '#contact', label: tNav('contact') },
  ];

  return (
    <footer id="contact" className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Image
              src="/images/logo-color.png"
              alt="Panas Flavor"
              width={160}
              height={60}
              className="h-12 w-auto mb-4"
            />
            <p className="text-white/60 text-sm">{t('tagline')}</p>
            <p className="text-white/60 text-sm mt-2">📍 {t('location')}</p>
          </div>

          {/* Nav Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">Navigation</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#F5A623] text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-white mb-4 uppercase tracking-wider text-xs">{t('follow')}</h3>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/PanasFlavor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#F5A623] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
                <span className="text-sm">@PanasFlavor</span>
              </a>
            </div>
            <div className="flex gap-4 mt-3">
              <a
                href="https://facebook.com/PanasFlavor"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/60 hover:text-[#F5A623] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
                <span className="text-sm">@PanasFlavor</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">{t('rights')}</p>
          <a href="#" className="text-white/40 hover:text-white/60 text-sm transition-colors">
            {t('privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
}
