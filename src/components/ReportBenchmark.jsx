import React from 'react';
import { useDil, useSayi } from '../i18n';

export default function ReportBenchmark() {
  const { t } = useDil();
  const sayi = useSayi();
  const b = t.bench;
  const modeller = [
    { ad: 'BERTurk', aile: 'BERT', ort: 79.87, sap: 0.23 },
    { ad: 'MoganBert', aile: 'ModernBERT', ort: 78.41, sap: 0.32, bizim: true },
    { ad: 'TabiBERT', aile: 'ModernBERT', ort: 77.83, sap: 0.57 },
    { ad: 'ModernBERT-TR', aile: 'ModernBERT', ort: 77.64, sap: 0.37 },
    { ad: 'mmBERT', aile: 'ModernBERT', ort: 76.73, sap: null },
  ];

  // Eksen 0-100: mutlak olcek. Farklar kucuk gorunur ama carpitma yok.
  const ALT = 0, UST = 100;
  const G = 580, YUK = 230, TABAN = 178, TEPE = 24;
  const SOL = 50, SLOT = (G - 70) / modeller.length, GEN = 38;

  const y = (v) => TABAN - ((v - ALT) / (UST - ALT)) * (TABAN - TEPE);

  return (
    <section id="benchmark" className="flex flex-col gap-6">
      <div className="bg-cobalt-deep text-on-primary px-4 py-2 border-2 border-ink-black inline-block self-start relative slash-deco">
        <h2 className="font-display text-base md:text-lg font-bold uppercase tracking-tight">
          {b.baslik}
        </h2>
      </div>

      <div className="flex flex-col gap-4 max-2xl">
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{b.p1}</p>

        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{b.p2[0]}<strong>{b.p2[1]}</strong>{b.p2[2]}</p>
      </div>

      <div className="border-2 border-ink-black bg-grain-fill p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-ink-black pb-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">
            {b.kutuBaslik}
          </h3>
          <span className="font-mono text-xs text-ink-black/70">
            {b.kutuAlt}
          </span>
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

            {modeller.map((m, i) => {
              const gen = GEN;
              const x = SOL + SLOT * i + SLOT / 2 - GEN / 2;
              const yt = y(m.ort);
              const yuk = TABAN - yt;
              return (
                <g key={m.ad}>
                  <rect x={x} y={yt} width={gen} height={yuk}
                        fill={m.bizim ? '#006c48' : '#254a96'} stroke="#1b211d" strokeWidth="2" />

                  {m.bizim && (
                    <image href="/logo.png" x={x + gen / 2 - 15} y={yt + yuk / 2 - 15}
                           width="30" height="30" preserveAspectRatio="xMidYMid meet"
                           opacity="0.95" />
                  )}

                  <text x={x + gen / 2} y={yt - 9} textAnchor="middle" fontSize="12.5"
                        fontWeight="800" fill={m.bizim ? '#006c48' : '#1b211d'}
                        fontFamily="'IBM Plex Mono', monospace">
                    {sayi(m.ort)}
                  </text>
                  <text x={x + gen / 2} y={TABAN + 17} textAnchor="middle" fontSize="10.5"
                        fontWeight={m.bizim ? '800' : '600'} fill="#1b211d"
                        fontFamily="'IBM Plex Mono', monospace">
                    {m.ad}
                  </text>
                  <text x={x + gen / 2} y={TABAN + 30} textAnchor="middle" fontSize="9.5"
                        fill="#1b211d" fillOpacity="0.55"
                        fontFamily="'Hanken Grotesk', sans-serif">
                    {m.aile}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <p className="font-mono text-xs text-ink-black/60 border-t border-ink-black/20 pt-3 leading-relaxed">{b.dipnot}</p>
      </div>
    </section>
  );
}
