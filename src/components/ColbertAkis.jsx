import React from 'react';
import { useDil, useSayi } from '../i18n';

// MaxSim matrisi: satir = sorgu tokeni, sutun = dokuman tokeni.
// Skorlar temsili; her satirin en yuksek degeri vurgulanip toplaniyor.
const SKOR = [
  [0.94, 0.41, 0.22, 0.10, 0.18, 0.12],
  [0.38, 0.91, 0.19, 0.12, 0.24, 0.15],
  [0.14, 0.21, 0.46, 0.17, 0.79, 0.33],
  [0.11, 0.13, 0.20, 0.15, 0.28, 0.70],
];
const TOPLAM = SKOR.reduce((a, r) => a + Math.max(...r), 0);

export default function ColbertAkis() {
  const { t } = useDil();
  const sayi = useSayi();
  const c = t.colbertAkis;
  const enBuyuk = SKOR.map((r) => r.indexOf(Math.max(...r)));

  const kutu = (et, ad, alt, renk) => (
    <div className="bg-paper-base px-[18px] py-5 flex flex-col gap-1.5">
      <span className="font-mono text-[11px] font-bold tracking-[.12em] text-ink-black/55">{et}</span>
      <strong className="font-display text-xl font-black" style={renk ? { color: renk } : undefined}>{ad}</strong>
      <span className="font-mono text-[11px] text-ink-black/60">{alt}</span>
    </div>
  );
  const oklar = (renk) => (
    <div className="bg-paper-base px-1.5 flex items-center justify-center gap-[3px]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="cb-ok font-mono text-[15px] font-bold"
              style={{ color: renk, animationDelay: `${(i * 0.22).toFixed(2)}s` }}>›</span>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">

      {/* ---- donusum hatti ---- */}
      <div className="border-2 border-ink-black bg-grain-fill">
        <div className="flex flex-wrap items-baseline justify-between gap-2
                        border-b-2 border-ink-black px-[18px] py-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">{c.hatBaslik}</h3>
          <span className="font-mono text-xs text-ink-black/70">{c.hatAlt}</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-stretch bg-ink-black gap-px">
          {kutu(c.hatGirdi, 'MoganBERT-Embed', c.hatGirdiAlt)}
          {oklar('#254a96')}
          {kutu(c.hatArac, 'PyLate', c.hatAracAlt, '#254a96')}
          {oklar('#006c48')}
          {kutu(c.hatCikti, 'Mogan-ColBERT-TR', c.hatCiktiAlt, '#006c48')}
        </div>
      </div>

      {/* ---- tek vektor vs MaxSim ---- */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-px bg-ink-black border-2 border-ink-black">

        <div className="bg-paper-base px-5 py-[22px] flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] flex-wrap">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[.12em]
                             bg-ink-black text-white border-2 border-ink-black px-2 py-[3px]">{c.tekRozet}</span>
            <span className="font-mono text-[11px] text-ink-black/60">MoganBERT-Embed</span>
          </div>
          <p className="m-0 text-sm leading-[1.55] text-on-surface-variant">{c.tekP}</p>

          <div className="border-2 border-ink-black bg-grain-fill px-4 py-[18px] flex flex-col gap-4">
            <div className="flex items-center gap-[10px]">
              <span className="font-mono text-[10px] tracking-[.1em] text-ink-black/55 w-[52px]">{c.sorgu}</span>
              <span className="w-4 h-4 bg-ink-black shrink-0" />
              <span className="kayan-serit flex-1 h-[2px]"
                    style={{ backgroundImage: 'repeating-linear-gradient(90deg, #1b211d 0 6px, transparent 6px 12px)' }} />
              <span className="w-4 h-4 bg-cobalt-deep shrink-0" />
              <span className="font-mono text-[10px] tracking-[.1em] text-ink-black/55 w-[52px] text-right">{c.dokuman}</span>
            </div>
            <div className="flex items-center justify-center gap-2 border-t-2 border-ink-black/20 pt-[14px]
                            font-mono text-xs font-bold">
              <span className="text-ink-black/60">{c.skorEt} =</span>
              <span className="cb-tek border-2 border-ink-black bg-paper-base px-[10px] py-1">cos(q, d)</span>
            </div>
          </div>

          <div className="mt-auto font-mono text-[11px] text-ink-black/60 border-t-2 border-ink-black/20
                          pt-3 leading-relaxed">{c.tekDepo}</div>
        </div>

        <div className="bg-paper-base px-5 py-[22px] flex flex-col gap-[14px]">
          <div className="flex items-center gap-[10px] flex-wrap">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[.12em]
                             text-white border-2 border-ink-black px-2 py-[3px]"
                  style={{ background: '#006c48' }}>{c.maxRozet}</span>
            <span className="font-mono text-[11px] text-ink-black/60">Mogan-ColBERT-TR</span>
          </div>
          <p className="m-0 text-sm leading-[1.55] text-on-surface-variant">{c.maxP}</p>

          <div className="border-2 border-ink-black bg-grain-fill px-[14px] py-4 flex flex-col gap-[10px] overflow-x-auto">
            <div className="grid gap-[3px] items-center min-w-[420px]"
                 style={{ gridTemplateColumns: '72px repeat(6, minmax(0,1fr)) 46px' }}>
              <span />
              {c.dokTokenlar.map((d, j) => (
                <span key={j} className="font-mono text-[9px] text-center text-ink-black/55 truncate">{d}</span>
              ))}
              <span />

              {c.sorguTokenlar.map((q, i) => (
                <React.Fragment key={i}>
                  <span className="font-mono text-[10px] font-bold truncate">{q}</span>
                  {SKOR[i].map((v, j) => (
                    <span key={j}
                          className={`${j === enBuyuk[i] ? 'cb-max' : 'cb-hucre'} flex items-center justify-center
                                      h-[26px] border bg-paper-base font-mono text-[9px] text-ink-black/75`}
                          style={{ borderColor: 'rgba(27,33,29,.35)',
                                   animationDelay: `${((i * 6 + j) * 0.045).toFixed(2)}s` }}>
                      {sayi(v, 2)}
                    </span>
                  ))}
                  <span className="cb-etiket font-mono text-[9px] font-bold whitespace-nowrap"
                        style={{ color: '#006c48', animationDelay: `${(i * 0.18).toFixed(2)}s` }}>max</span>
                </React.Fragment>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 border-t-2 border-ink-black/20 pt-3
                            font-mono text-xs font-bold">
              <span className="text-ink-black/60">{c.skorEt} = Σ max</span>
              <span className="cb-toplam border-2 border-ink-black text-white px-[10px] py-1"
                    style={{ background: '#006c48' }}>{sayi(TOPLAM, 2)}</span>
            </div>
          </div>

          <div className="mt-auto font-mono text-[11px] text-ink-black/60 border-t-2 border-ink-black/20
                          pt-3 leading-relaxed">{c.maxDepo}</div>
        </div>
      </div>
    </div>
  );
}
