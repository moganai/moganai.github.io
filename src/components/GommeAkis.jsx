import React from 'react';
import { useDil } from '../i18n';

// Dort asamanin gorsel anlatimi. Konumlar yuzde/piksel olarak sabit; metinler
// i18n'den geliyor. Noktalarin dagilimi elle secildi -- rastgele uretmek her
// yenilemede farkli bir resim verirdi.
const KONI = [[46, 34], [52, 44], [44, 52], [55, 56], [48, 62], [58, 38], [42, 44], [53, 66], [49, 48]];
const HEDEF = [[-96, -40], [-58, 34], [-20, -46], [18, 30], [64, -36], [96, 22], [-84, 8], [40, -14], [8, 44]];
const AKIS = [22, 40, 58, 76];
const SOUP = [
  { x: '16%', y: '20%', dx: '58px', dy: '38px' },
  { x: '70%', y: '24%', dx: '-42px', dy: '32px' },
  { x: '40%', y: '74%', dx: '10px', dy: '-38px' },
];

function Panel({ rozet, rozetBg, alt, aciklama, children }) {
  return (
    <div className="bg-paper-base px-[18px] py-5 flex flex-col gap-[14px]">
      <div className="flex items-center gap-[10px] flex-wrap">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[.12em]
                         text-white border-2 border-ink-black px-2 py-[3px]"
              style={{ background: rozetBg }}>{rozet}</span>
        <span className="font-mono text-[11px] text-ink-black/60">{alt}</span>
      </div>
      <p className="m-0 text-sm leading-[1.55] text-on-surface-variant min-h-[66px]">{aciklama}</p>
      <div className="relative h-[132px] border-2 border-ink-black bg-grain-fill overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default function GommeAkis() {
  const { t } = useDil();
  const g = t.gommeAkis;

  return (
    <div className="border-2 border-ink-black bg-grain-fill">
      <div className="flex flex-wrap items-baseline justify-between gap-2
                      border-b-2 border-ink-black px-[18px] py-3">
        <h3 className="font-display text-base font-bold uppercase text-ink-black">{g.baslik}</h3>
        <span className="font-mono text-xs text-ink-black/70">{g.alt}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-black">

        {/* --- Asama 0: anizotropik encoder --- */}
        <Panel rozet={g.a0Rozet} rozetBg="#1b211d" alt={g.a0Alt} aciklama={g.a0P}>
          <div className="absolute left-1/2 top-1/2 w-[100px] h-[100px] -ml-[50px] -mt-[50px]
                          border-2 border-dashed" style={{ borderColor: 'rgba(27,33,29,.28)' }} />
          {KONI.map(([x, y], i) => (
            <span key={i} className="koni-nokta absolute w-[7px] h-[7px] bg-ink-black"
                  style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${(i * 0.18).toFixed(2)}s`,
                           '--jx': `${i % 2 ? 3 : -3}px`, '--jy': `${i % 3 ? -3 : 3}px` }} />
          ))}
          <span className="absolute left-[14px] bottom-[10px] font-mono text-[10px] uppercase
                           tracking-[.1em] text-ink-black/55">{g.a0Etiket}</span>
        </Panel>

        {/* --- Asama 1: ogretmen damitmasi --- */}
        <Panel rozet={g.a1Rozet} rozetBg="#254a96" alt={g.a1Alt} aciklama={g.a1P}>
          <div className="absolute top-2 left-3 right-3 flex items-center justify-between
                          font-mono text-[9px] uppercase tracking-[.1em] text-ink-black/55">
            <span>{g.a1Ogretmen}</span><span>{g.a1Ogrenci}</span>
          </div>
          {AKIS.map((x, i) => (
            <span key={i} className="akis-cizgi absolute w-[2px] h-[26px] bg-cobalt-deep"
                  style={{ left: `${x}%`, top: '26px', animationDelay: `${(i * 0.35).toFixed(2)}s` }} />
          ))}
          {HEDEF.map(([dx, dy], i) => (
            <span key={i} className="yayilan absolute w-[7px] h-[7px] bg-cobalt-deep"
                  style={{ left: '50%', top: '62%', margin: '-3px 0 0 -3px',
                           animationDelay: `${(i * 0.12).toFixed(2)}s`,
                           '--dx': `${dx}px`, '--dy': `${dy}px` }} />
          ))}
        </Panel>

        {/* --- Asama 2: contrastive --- */}
        <Panel rozet={g.a2Rozet} rozetBg="#006c48" alt={g.a2Alt} aciklama={g.a2P}>
          <div className="absolute left-1/2 top-1/2 w-[14px] h-[14px] -ml-[7px] -mt-[7px] bg-ink-black" />
          <span className="absolute left-1/2 top-1/2 -ml-[14px] -mt-[22px] font-mono text-[9px]
                           font-bold tracking-[.1em] text-ink-black/60">{g.a2Query}</span>

          <span className="cek-kare absolute left-[18px] top-1/2 -mt-[6px] w-3 h-3 border-2 border-ink-black"
                style={{ background: '#006c48', '--dx': '96px' }} />
          <span className="absolute left-[18px] top-1/2 -mt-[26px] font-mono text-[9px] font-bold"
                style={{ color: '#006c48' }}>{g.a2Pozitif}</span>

          <span className="cek-kare absolute right-[18px] top-1/2 -mt-[6px] w-3 h-3 bg-paper-base border-2"
                style={{ borderColor: '#ba1a1a', '--dx': '26px' }} />
          <span className="absolute right-[18px] top-1/2 -mt-[26px] font-mono text-[9px] font-bold"
                style={{ color: '#ba1a1a' }}>{g.a2Negatif}</span>

          <div className="kayan-serit absolute left-3 right-3 bottom-[10px] h-[2px]"
               style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(27,33,29,.5) 0 6px, transparent 6px 12px)' }} />
        </Panel>

        {/* --- Asama 3: model soup --- */}
        <Panel rozet={g.a3Rozet} rozetBg="#5b7fc4" alt={g.a3Alt} aciklama={g.a3P}>
          <div className="soup-merkez absolute left-1/2 top-1/2 w-[26px] h-[26px] -ml-[13px] -mt-[13px]
                          border-2 border-ink-black" style={{ background: '#5b7fc4' }} />
          {SOUP.map((c, i) => (
            <span key={i} className="soup-kare absolute w-[18px] h-[18px] bg-paper-base border-2 border-ink-black"
                  style={{ left: c.x, top: c.y, animationDelay: `${(i * 0.14).toFixed(2)}s`,
                           '--dx': c.dx, '--dy': c.dy }} />
          ))}
          <span className="absolute left-[14px] bottom-[10px] font-mono text-[10px] uppercase
                           tracking-[.1em] text-ink-black/55">{g.a3Etiket}</span>
        </Panel>
      </div>
    </div>
  );
}
