import React from 'react';
import { useDil, useSayi } from '../i18n';

// Yalnizca MoganBert-TR bu calismada kosuldu. TabiBERT, BERTurk ve mmBERT
// degerleri arXiv 2512.23065 Tablo 6'dan; ModernBERT-TR degerleri modelin kendi
// blog sayfasindan alindi. YTU-Cosmos-BERT ve TurkishBERTweet listeye alinmadi.
const MODELLER = [
  { ad: 'MoganBert-TR', param: 149, ort: 77.73, bizim: true,
    kat: [83.71, 91.20, 85.43, 84.14, 68.37, 72.62, 75.78, 60.57] },
  { ad: 'mmBERT',        param: 307, ort: 79.26,
    kat: [82.54, 93.81, 87.05, 84.38, 71.47, 72.65, 76.20, 66.02] },
  { ad: 'ModernBERT-TR', param: 149, ort: 77.92,
    kat: [85.21, 90.78, 86.08, 84.74, 67.03, 71.83, 77.51, 60.16] },
  { ad: 'TabiBERT',      param: 149, ort: 77.58,
    kat: [83.44, 93.42, 84.74, 84.51, 69.71, 72.44, 75.44, 56.95] },
  { ad: 'BERTurk',       param: 110, ort: 75.96,
    kat: [83.42, 93.67, 85.33, 84.33, 60.16, 71.40, 74.84, 54.54] },
];

export default function ReportTabiBench() {
  const { t } = useDil();
  const sayi = useSayi();
  const b = t.tabi;

  // ---- genel karsilastirma sutun grafigi ----
  const ALT = 0, UST = 100;
  const G = 580, YUK = 230, TABAN = 178, TEPE = 24;
  const SOL = 50, SLOT = (G - 70) / MODELLER.length, GEN = 38;
  const y = (v) => TABAN - ((v - ALT) / (UST - ALT)) * (TABAN - TEPE);

  // ---- kategori kirilimi: her kategoride en yuksek isaretlenir ----
  const enIyi = b.kategoriler.map((_, k) =>
    MODELLER.reduce((a, m) => (m.kat[k] > a ? m.kat[k] : a), 0));

  return (
    <section id="tabibench" className="flex flex-col gap-6">
      <div className="bg-cobalt-deep text-on-primary px-4 py-2 border-2 border-ink-black inline-block self-start relative slash-deco">
        <h2 className="font-display text-base md:text-lg font-bold uppercase tracking-tight">
          {b.baslik}
        </h2>
      </div>

      <div className="flex flex-col gap-4 max-2xl">
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{b.p1}</p>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          {b.p2[0]}<strong>{b.p2[1]}</strong>{b.p2[2]}
        </p>

        <p className="font-sans text-base text-on-surface-variant leading-relaxed">
          {b.kaynak1}
          <a href="https://arxiv.org/abs/2512.23065" target="_blank" rel="noreferrer"
             className="underline hover:text-cobalt-deep">{b.linkMakale}</a>
          {b.kaynak2}
          <a href="https://cosmos-ytu.github.io/modernbert-tr/" target="_blank" rel="noreferrer"
             className="underline hover:text-cobalt-deep">{b.linkBlog}</a>
          {b.kaynak3}
        </p>
      </div>

      {/* genel karsilastirma */}
      <div className="border-2 border-ink-black bg-grain-fill p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-ink-black pb-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">{b.kutuBaslik}</h3>
          <span className="font-mono text-xs text-ink-black/70">{b.kutuAlt}</span>
        </div>

        <div className="w-full overflow-x-auto py-2">
          <svg viewBox={`0 0 ${G} ${YUK}`} className="block min-w-[440px] w-full h-auto"
               role="img" aria-label={b.svgEtiket}>
            {[0, 20, 40, 60, 80, 100].map((v) => (
              <g key={v}>
                <line x1="40" y1={y(v)} x2={G - 8} y2={y(v)} stroke="#1b211d" strokeWidth="1"
                      strokeDasharray={v === ALT ? 'none' : '3 3'}
                      strokeOpacity={v === ALT ? 1 : 0.22} />
                <text x="32" y={y(v) + 4} textAnchor="end" fontSize="11" fontWeight="600"
                      fill="#1b211d" fontFamily="'IBM Plex Mono', monospace">{v}</text>
              </g>
            ))}

            {MODELLER.map((m, i) => {
              const x = SOL + SLOT * i + SLOT / 2 - GEN / 2;
              const yt = y(m.ort), yuk = TABAN - yt;
              return (
                <g key={m.ad}>
                  <rect x={x} y={yt} width={GEN} height={yuk}
                        fill={m.bizim ? '#006c48' : '#254a96'} stroke="#1b211d" strokeWidth="2" />
                  {m.bizim && (
                    <image href="/logo.png" x={x + GEN / 2 - 15} y={yt + yuk / 2 - 15}
                           width="30" height="30" preserveAspectRatio="xMidYMid meet" opacity="0.95" />
                  )}
                  <text x={x + GEN / 2} y={yt - 9} textAnchor="middle" fontSize="12.5"
                        fontWeight="800" fill={m.bizim ? '#006c48' : '#1b211d'}
                        fontFamily="'IBM Plex Mono', monospace">{sayi(m.ort)}</text>
                  <text x={x + GEN / 2} y={TABAN + 17} textAnchor="middle" fontSize="10.5"
                        fontWeight={m.bizim ? '800' : '600'} fill="#1b211d"
                        fontFamily="'IBM Plex Mono', monospace">{m.ad}</text>
                  <text x={x + GEN / 2} y={TABAN + 30} textAnchor="middle" fontSize="9.5"
                        fill="#1b211d" fillOpacity="0.55"
                        fontFamily="'Hanken Grotesk', sans-serif">
                    {m.param ? `${m.param}M` : b.paramYok}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <p className="font-mono text-xs text-ink-black/60 border-t border-ink-black/20 pt-3 leading-relaxed">{b.yordamDipnot}</p>
      </div>

      {/* kategori kirilimi */}
      <div className="border-2 border-ink-black bg-grain-fill p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-ink-black pb-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">{b.katBaslik}</h3>
          <span className="font-mono text-xs text-ink-black/70">{b.katAlt}</span>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-ink-black/[0.04]">
                <th className="p-3 border-b-2 border-r-2 border-ink-black font-mono text-xs uppercase font-bold">
                  {b.thKategori}
                </th>
                {MODELLER.map((m) => (
                  <th key={m.ad}
                      className={`p-3 border-b-2 border-r-2 border-ink-black last:border-r-0 font-mono text-xs uppercase font-bold text-center ${
                        m.bizim ? 'text-cobalt-deep' : ''}`}>
                    {m.ad}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {b.kategoriler.map((k, ki) => (
                <tr key={k} className="border-b border-ink-black/20">
                  <td className="p-3 border-r-2 border-ink-black whitespace-nowrap font-sans">{k}</td>
                  {MODELLER.map((m) => {
                    const v = m.kat[ki], top = v === enIyi[ki];
                    return (
                      <td key={m.ad}
                          className={`p-3 border-r-2 border-ink-black last:border-r-0 text-center tabular-nums ${
                            top ? 'font-bold text-cobalt-deep' : 'text-ink-black/75'}`}>
                        {sayi(v)}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr className="border-t-2 border-ink-black bg-ink-black/[0.04]">
                <td className="p-3 border-r-2 border-ink-black font-sans font-bold">{b.thGenel}</td>
                {MODELLER.map((m) => (
                  <td key={m.ad}
                      className={`p-3 border-r-2 border-ink-black last:border-r-0 text-center tabular-nums font-bold ${
                        m.bizim ? 'text-cobalt-deep' : ''}`}>
                    {sayi(m.ort)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-mono text-xs text-ink-black/60 border-t border-ink-black/20 pt-3 leading-relaxed">{b.katDipnot}</p>
      </div>
    </section>
  );
}
