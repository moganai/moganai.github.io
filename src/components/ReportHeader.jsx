import React, { useEffect, useState } from 'react';
import { useDil } from '../i18n';

// Ust menude yalnizca giris ve uc model var. Model adlari hero kartlarindan
// okunuyor ki iki yerde ayri ayri guncellemek gerekmesin.
export default function ReportHeader() {
  const { dil, setDil, t } = useDil();
  const [hash, setHash] = useState(() => window.location.hash || '#giris');

  useEffect(() => {
    const dinle = () => setHash(window.location.hash || '#giris');
    window.addEventListener('hashchange', dinle);
    return () => window.removeEventListener('hashchange', dinle);
  }, []);

  const baglantilar = [
    ['#giris', t.nav.giris],
    ...t.hero.kartlar.map((k) => [k.link, k.ad]),
  ];

  // Tam eslesme; adres bos ise giris aktif sayilir.
  const aktifMi = (h) => h === (hash || '#giris');

  return (
    <header className="bg-paper-base top-0 sticky border-b-2 border-ink-black z-40">
      <div className="flex justify-between items-center w-full px-6 h-16 max-w-[1100px] mx-auto gap-4">
        <a href="#giris" className="flex items-center gap-3 no-underline shrink-0">
          <span className="font-display font-black text-2xl text-ink-black tracking-tighter">
            MoganAI
          </span>
        </a>

        <nav className="hidden md:flex gap-5 items-center">
          {baglantilar.map(([h, e]) => (
            <a key={h} href={h}
               aria-current={aktifMi(h) ? 'page' : undefined}
               className={aktifMi(h)
                 ? 'text-cobalt-deep border-b-2 border-cobalt-deep pb-0.5 font-mono text-[13px] uppercase font-semibold whitespace-nowrap'
                 : 'text-ink-black/70 hover:text-ink-black hover:bg-grain-fill transition-colors font-mono text-[13px] uppercase pb-0.5 whitespace-nowrap'}>
              {e}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          {/* Dil secici -- mobilde de gorunur, nav gizlense bile */}
          <div className="flex border-2 border-ink-black" role="group" aria-label="Language / Dil">
            {[['tr', 'TR'], ['en', 'EN']].map(([k, e]) => (
              <button key={k} type="button" onClick={() => setDil(k)}
                      aria-pressed={dil === k}
                      className={`px-2.5 py-1 font-mono text-[12px] font-bold uppercase transition-colors ${
                        dil === k
                          ? 'bg-ink-black text-paper-base'
                          : 'bg-paper-base text-ink-black/60 hover:bg-grain-fill hover:text-ink-black'
                      }`}>
                {e}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
