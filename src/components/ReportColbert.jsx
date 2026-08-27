import React from 'react';
import { useDil, useSayi } from '../i18n';
import ColbertAkis from './ColbertAkis';

// TurkColBERT resmi hattiyla olculdu. Kaynak: mogancolbert.tex Tablo 3-4.
const MODELLER = [
  { ad: 'mLateOn',             param: 306.9, n10: 37.23, n100: 40.72, r100: 63.59, map: 28.98, gen: 42.63 },
  { ad: 'Mogan-ColBERT-TR',    param: 148.9, n10: 31.81, n100: 35.53, r100: 56.98, map: 25.13, gen: 37.36, bizim: true },
  { ad: 'ColmmBERT-base-TR',   param: 306.9, n10: 29.21, n100: 32.54, r100: 53.19, map: 22.29, gen: 34.31 },
  { ad: 'ColmmBERT-small-TR',  param: 140.5, n10: 27.67, n100: 30.96, r100: 51.27, map: 21.16, gen: 32.77 },
  { ad: 'LFM2.5-ColBERT-350M', param: 353.3, n10: 20.28, n100: 23.27, r100: 41.85, map: 14.83, gen: 25.06 },
];
// Veri kumesi bazli OVERALL; sira MODELLER ile ayni.
const KUMELER = [
  { k: 'scifact',  d: [77.01, 72.92, 66.13, 65.15, 53.25] },
  { k: 'arguana',  d: [51.69, 44.20, 37.62, 35.72, 27.30] },
  { k: 'fiqa',     d: [42.11, 34.45, 31.63, 28.30, 15.42] },
  { k: 'scidocs',  d: [19.02, 16.17, 14.74, 13.54, 11.01] },
  { k: 'nfcorpus', d: [23.33, 19.08, 21.43, 21.10, 18.31] },
];

export default function ReportColbert() {
  const { t } = useDil();
  const sayi = useSayi();
  const c = t.colbert;
  const kalin = (par) => par.map((s, j) =>
    j % 2 ? <strong key={j}>{s}</strong> : <React.Fragment key={j}>{s}</React.Fragment>);

  const sut = [{ k: 'n10', ad: 'nDCG@10' }, { k: 'n100', ad: 'nDCG@100' },
               { k: 'r100', ad: 'R@100' }, { k: 'map', ad: 'mAP' }];
  const enIyi = Object.fromEntries(sut.map((s) => [s.k, Math.max(...MODELLER.map((m) => m[s.k]))]));
  const enIyiGen = Math.max(...MODELLER.map((m) => m.gen));


  const kutu = (baslik, alt, govde, dipnot) => (
    <div className="border-2 border-ink-black bg-grain-fill">
      <div className="flex flex-wrap items-baseline justify-between gap-2
                      border-b-2 border-ink-black px-[18px] py-3">
        <h3 className="font-display text-base font-bold uppercase text-ink-black">{baslik}</h3>
        <span className="font-mono text-xs text-ink-black/70">{alt}</span>
      </div>
      {govde}
      {dipnot && (
        <p className="border-t-2 border-ink-black px-[18px] py-3 m-0 font-mono text-[11px]
                      text-ink-black/65 leading-relaxed">{dipnot}</p>
      )}
    </div>
  );

  return (
    <section id="colbert" className="flex flex-col gap-6">
      <div className="bg-cobalt-deep text-on-primary px-4 py-2 border-2 border-ink-black
                      inline-block self-start relative slash-deco">
        <h2 className="font-display text-base md:text-lg font-bold uppercase tracking-tight">{c.baslik}</h2>
      </div>

      <div className="flex flex-col gap-4 max-2xl">
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{c.p1}</p>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{kalin(c.p2)}</p>
      </div>

      <ColbertAkis />

      <p className="font-sans text-base text-on-surface-variant leading-relaxed max-2xl">{kalin(c.p3)}</p>

      {/* ---- zor negatif madenciligi: uc kart + egitim kunyesi ---- */}
      {kutu(c.negBaslik, c.negAlt, (
        <>
          <p className="px-[18px] py-4 m-0 bg-paper-base font-sans text-sm
                        text-on-surface-variant leading-relaxed">{c.negP}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ink-black border-t-2 border-ink-black">
            {c.negFiltre.map((f) => (
              <div key={f.no} className="bg-paper-base px-[18px] py-4 flex flex-col gap-1.5">
                <span className="font-mono text-[11px] font-bold tracking-[.12em] text-ink-black/55">{f.no}</span>
                <span className="font-mono text-xs font-bold uppercase text-cobalt-deep tracking-tight">{f.ad}</span>
                <p className="m-0 text-sm leading-[1.5] text-on-surface-variant">{f.not}</p>
              </div>
            ))}
          </div>
        </>
      ))}

      <p className="font-sans text-base text-on-surface-variant leading-relaxed max-2xl">{kalin(c.p4)}</p>

      {/* ---- genel sonuc ---- */}
      {kutu(c.sonucBaslik, c.sonucAlt, (
        <div className="w-full overflow-x-auto bg-paper-base">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-ink-black/[0.04]">
                <th className="p-3 border-b-2 border-r-2 border-ink-black font-mono text-xs uppercase font-bold">{c.thModel}</th>
                <th className="p-3 border-b-2 border-r-2 border-ink-black font-mono text-xs uppercase font-bold text-center">{c.thParam}</th>
                {sut.map((s) => (
                  <th key={s.k} className="p-3 border-b-2 border-r-2 border-ink-black font-mono text-xs uppercase font-bold text-center">{s.ad}</th>
                ))}
                <th className="p-3 border-b-2 border-ink-black font-mono text-xs uppercase font-bold text-center">{c.thGenel}</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {MODELLER.map((m) => (
                <tr key={m.ad} className={`border-b border-ink-black/20 ${m.bizim ? 'bg-ink-black/[0.05]' : ''}`}>
                  <td className={`p-3 border-r-2 border-ink-black whitespace-nowrap ${m.bizim ? 'font-bold text-cobalt-deep' : ''}`}>{m.ad}</td>
                  <td className="p-3 border-r-2 border-ink-black text-right text-ink-black/60 whitespace-nowrap">{sayi(m.param, 1)}M</td>
                  {sut.map((s) => (
                    <td key={s.k} className={`p-3 border-r-2 border-ink-black text-center tabular-nums ${
                      m[s.k] === enIyi[s.k] ? 'font-bold' : 'text-ink-black/75'}`}>{sayi(m[s.k])}</td>
                  ))}
                  <td className={`p-3 text-center tabular-nums font-bold ${
                    m.gen === enIyiGen ? '' : m.bizim ? 'text-cobalt-deep' : 'text-ink-black/75'}`}>{sayi(m.gen)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ), c.sonucDipnot)}

      <p className="font-sans text-base text-on-surface-variant leading-relaxed max-2xl">{kalin(c.p5)}</p>

      {/* ---- veri kumesi bazli ---- */}
      {kutu(c.kumeBaslik, c.kumeAlt, (
        <div className="w-full overflow-x-auto bg-paper-base">
          <table className="w-full text-left border-collapse min-w-[620px]">
            <thead>
              <tr className="bg-ink-black/[0.04]">
                <th className="p-3 border-b-2 border-r-2 border-ink-black font-mono text-xs uppercase font-bold">{c.thKume}</th>
                {MODELLER.map((m) => (
                  <th key={m.ad} className={`p-3 border-b-2 border-r-2 border-ink-black last:border-r-0
                                             font-mono text-xs uppercase font-bold text-center
                                             ${m.bizim ? 'text-cobalt-deep' : ''}`}>{m.ad}</th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {KUMELER.map((s) => {
                const top = Math.max(...s.d);
                return (
                  <tr key={s.k} className="border-b border-ink-black/20">
                    <td className="p-3 border-r-2 border-ink-black whitespace-nowrap font-sans">{c.kumeAd[s.k]}</td>
                    {s.d.map((v, i) => (
                      <td key={i} className={`p-3 border-r-2 border-ink-black last:border-r-0 text-center tabular-nums ${
                        v === top ? 'font-bold text-cobalt-deep' : 'text-ink-black/75'}`}>{sayi(v)}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ), c.kumeDipnot)}


      <p className="font-sans text-base text-on-surface-variant leading-relaxed max-2xl">{kalin(c.p6)}</p>
    </section>
  );
}
