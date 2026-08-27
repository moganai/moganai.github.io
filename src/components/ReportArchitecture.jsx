import React from 'react';
import { useDil } from '../i18n';

// 'Golu' tokeni maskeleniyor; ok gecikmeleri bu indekse gore hesaplaniyor.
const MASKE_INDEKS = 1;

export default function ReportArchitecture() {
  const { t } = useDil();
  const a = t.arch;

  // Sayisal degerler dilden bagimsiz; yalnizca etiketler ceviriliyor.

  const asamaVeri = [
    { token: t.kod === 'tr' ? '36B' : '36B', kisa: 'CLM', pct: 15.2, renk: '#7a4a2b' },
    { token: t.kod === 'tr' ? '180,7B' : '180.7B', kisa: 'MLM', pct: 76.1, renk: '#254a96' },
    { token: t.kod === 'tr' ? '10,5B' : '10.5B', kisa: '8k', pct: 4.4, renk: '#5b7fc4' },
    { token: t.kod === 'tr' ? '10,1B' : '10.1B', kisa: '1k', pct: 4.3, renk: '#006c48' },
  ];


  const kalin = (par) => par.map((s, j) =>
    j % 2 ? <strong key={j}>{s}</strong> : <React.Fragment key={j}>{s}</React.Fragment>);

  return (
    <section id="mimari" className="flex flex-col gap-6">
      <div className="bg-cobalt-deep text-on-primary px-4 py-2 border-2 border-ink-black inline-block self-start relative slash-deco">
        <h2 className="font-display text-base md:text-lg font-bold uppercase tracking-tight">{a.baslik}</h2>
      </div>

      <div className="flex flex-col gap-4 max-2xl">
        {[a.p1, a.p2, a.p3].map((par, i) => (
          <p key={i} className="font-sans text-base text-on-surface-variant leading-relaxed">{kalin(par)}</p>
        ))}
      </div>


      {/* ---- NEDEN CLM -> MLM? ---- */}
      <div className="border-2 border-ink-black bg-grain-fill">
        <div className="flex flex-wrap items-baseline justify-between gap-2
                        border-b-2 border-ink-black px-[18px] py-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">{a.nedenBaslik}</h3>
          <span className="font-mono text-xs text-ink-black/70">{a.nedenAlt}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ink-black">

          {/* --- Faz 1: CLM --- */}
          <div className="bg-paper-base px-[18px] py-5 flex flex-col gap-[14px]">
            <div className="flex items-center gap-[10px] flex-wrap">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[.12em]
                               text-white border-2 border-ink-black px-2 py-[3px]"
                    style={{ background: '#7a4a2b' }}>{a.faz1Rozet}</span>
              <span className="font-mono text-[11px] text-ink-black/60">{a.faz1Alt}</span>
            </div>
            <p className="m-0 text-sm leading-[1.55] text-on-surface-variant min-h-[66px]">{a.faz1P}</p>

            <div className="border-2 border-ink-black bg-grain-fill px-[14px] pt-[22px] pb-4 overflow-x-auto min-h-[112px] flex flex-col justify-between">
              <div className="flex items-center gap-[6px] font-mono text-xs font-semibold w-max">
                {a.clmTokenlar.map((tok, i) => (
                  <span key={i}
                        className={`clm-tok${i} border-2 border-ink-black bg-paper-base px-[7px] py-[5px] whitespace-nowrap`}>
                    {tok}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[.12em]
                                 text-ink-black/55 whitespace-nowrap">{a.clmYon}</span>
                <span className="flex-1 h-[2px]"
                      style={{ background: 'repeating-linear-gradient(90deg, #7a4a2b 0 6px, transparent 6px 12px)' }} />
                <span className="font-mono text-xs font-bold leading-none"
                      style={{ color: '#7a4a2b' }}>→</span>
              </div>
            </div>

            <div className="flex justify-between gap-2 font-mono text-[11px]
                            border-t-2 border-ink-black/20 pt-[10px]">
              <span className="text-ink-black/60">{a.faz1Token}</span>
              <span className="font-bold" style={{ color: '#7a4a2b' }}>{a.faz1Blok}</span>
            </div>
          </div>

          {/* --- Faz 2: MLM --- */}
          <div className="bg-paper-base px-[18px] py-5 flex flex-col gap-[14px]">
            <div className="flex items-center gap-[10px] flex-wrap">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[.12em]
                               bg-cobalt-deep text-on-primary border-2 border-ink-black px-2 py-[3px]">
                {a.faz2Rozet}
              </span>
              <span className="font-mono text-[11px] text-ink-black/60">{a.faz2Alt}</span>
            </div>
            <p className="m-0 text-sm leading-[1.55] text-on-surface-variant min-h-[66px]">{a.faz2P}</p>

            <div className="border-2 border-ink-black bg-grain-fill px-[14px] pt-[22px] pb-4 overflow-x-auto min-h-[112px] flex flex-col justify-between">
              <div className="flex items-center gap-[6px] font-mono text-xs font-semibold w-max">
                {a.mlmTokenlar.map((tok, i) => (
                  i === MASKE_INDEKS ? (
                    /* Tahmin edilen hucre: CLM'deki '?' ile ayni gorsel dil --
                       kesikli kenarlik. Cevap gelince cips yesile donuyor. */
                    <span key={i}
                          className="maske-cip border-2 border-dashed px-[7px] py-[5px]
                                     whitespace-nowrap inline-grid place-items-center">
                      <span className="maske-giz col-start-1 row-start-1 text-cobalt-deep font-bold">[MASK]</span>
                      <span className="maske-ac col-start-1 row-start-1 font-bold"
                            style={{ color: '#006c48' }}>{a.mlmCevap}</span>
                    </span>
                  ) : (
                    <span key={i}
                          className="border-2 border-ink-black bg-paper-base px-[7px] py-[5px] whitespace-nowrap">
                      {tok}
                    </span>
                  )
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2">
                <span className="flex-1 h-[2px]" style={{ background: 'repeating-linear-gradient(90deg, #254a96 0 6px, transparent 6px 12px)' }} />
                <span className="font-mono text-[10px] uppercase tracking-[.12em] text-ink-black/55 whitespace-nowrap">
                  {a.mlmYon}
                </span>
                <span className="flex-1 h-[2px]" style={{ background: 'repeating-linear-gradient(90deg, #254a96 0 6px, transparent 6px 12px)' }} />
              </div>
            </div>

            <div className="flex justify-between gap-2 font-mono text-[11px]
                            border-t-2 border-ink-black/20 pt-[10px]">
              <span className="text-ink-black/60">{a.faz2Token}</span>
              <span className="font-bold text-cobalt-deep">{a.faz2Maske}</span>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-ink-black px-[18px] py-3 font-mono text-[11px]
                        text-ink-black/65 leading-relaxed">{a.nedenDipnot}</div>
      </div>

      <p className="font-sans text-base text-on-surface-variant max-2xl leading-relaxed">{kalin(a.p4)}</p>

      <div className="border-2 border-ink-black bg-grain-fill p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-ink-black pb-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">{a.asamaBaslik}</h3>
          <span className="font-mono text-xs text-ink-black/70">{a.asamaAlt}</span>
        </div>

        <div className="flex w-full h-11 border-2 border-ink-black overflow-hidden">
          {asamaVeri.map((s, i) => (
            <div key={i} style={{ width: `${s.pct}%`, background: s.renk }}
                 className="h-full border-r-2 border-ink-black last:border-r-0 flex items-center justify-center"
                 title={`${a.asama[i].ad} — ${s.token}`}>
              <span className="font-mono text-[10px] font-bold text-white/90 truncate px-1">{s.kisa}</span>
            </div>
          ))}
        </div>

        <ul className="flex flex-col divide-y divide-ink-black/15">
          {asamaVeri.map((s, i) => (
            <li key={i} className="flex items-center gap-3 py-3">
              <span className="w-3.5 h-3.5 border border-ink-black shrink-0" style={{ background: s.renk }} />
              <span className="font-sans text-sm text-ink-black flex-1">
                {a.asama[i].ad}
                <span className="block font-mono text-[11px] text-ink-black/55">{a.asama[i].not}</span>
              </span>
              <span className="font-mono text-sm font-bold text-ink-black whitespace-nowrap"
                    style={{ fontVariantNumeric: 'tabular-nums' }}>{s.token}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-display text-lg font-bold uppercase text-ink-black mt-2">{a.tokBaslik}</h3>

      <div className="flex flex-col gap-4 max-2xl">
        {a.tokP.map((par, i) => (
          <p key={i} className="font-sans text-base text-on-surface-variant leading-relaxed">{par}</p>
        ))}
      </div>

      <div className="border-2 border-ink-black bg-grain-fill">
        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {a.tokOzet.map((o) => (
            <div key={o.k} className="p-4 border-b-2 border-r-2 border-ink-black">
              <dt className="font-mono text-[10px] uppercase tracking-wide text-ink-black/55">{o.k}</dt>
              <dd className="font-mono text-sm font-bold text-ink-black mt-1">{o.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
