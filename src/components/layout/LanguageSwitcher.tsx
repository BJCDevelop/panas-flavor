'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'es' : 'en';
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    startTransition(() => {
      router.push(newPath);
    });
  };

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="flex items-center gap-1 px-3 py-1.5 rounded-full border border-white/30 text-sm font-semibold text-white hover:bg-white/10 transition-colors disabled:opacity-50"
      aria-label="Switch language"
    >
      <span className={locale === 'en' ? 'opacity-100' : 'opacity-50'}>EN</span>
      <span className="opacity-30">/</span>
      <span className={locale === 'es' ? 'opacity-100' : 'opacity-50'}>ES</span>
    </button>
  );
}
