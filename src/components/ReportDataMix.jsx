import React from 'react';
import { useDil } from '../i18n';

export default function ReportDataMix() {
  const { t } = useDil();
  const d = t.data;

  const pay = [51.4, 16.6, 12.4, 10.0, 9.6];
  const renk = ['#254a96', '#8a6d1f', '#5b3a8c', '#006c48', '#7a4a2b'];
  const yuzde = (v) => t.yuzde(v.toFixed(1).replace('.', t.ondalik));

  return (
    <section id="veri" className="flex flex-col gap-6">
      <div className="bg-cobalt-deep text-on-primary px-4 py-2 border-2 border-ink-black inline-block self-start relative slash-deco">
        <h2 className="font-display text-base md:text-lg font-bold uppercase tracking-tight">{d.baslik}</h2>
      </div>

      <div className="flex flex-col gap-4 max-2xl">
        {d.p.map((par, i) => (
          <p key={i} className="font-sans text-base text-on-surface-variant leading-relaxed">{par}</p>
        ))}
      </div>

      <div className="border-2 border-ink-black bg-grain-fill p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-ink-black pb-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">{d.dagilimBaslik}</h3>
          <span className="font-mono text-xs text-ink-black/70">{d.dagilimAlt}</span>
        </div>

        <div className="flex w-full h-10 border-2 border-ink-black overflow-hidden">
          {pay.map((p, i) => (
            <div key={i} style={{ width: `${p}%`, background: renk[i] }}
                 className="h-full border-r border-ink-black/30 last:border-r-0"
                 title={`${d.kategori[i]} — ${yuzde(p)}`} />
          ))}
        </div>

        <ul className="flex flex-col divide-y divide-ink-black/15">
          {pay.map((p, i) => (
            <li key={i} className="flex items-center gap-3 py-3">
              <span className="w-3.5 h-3.5 border border-ink-black shrink-0" style={{ background: renk[i] }} />
              <span className="font-sans text-sm text-ink-black flex-1">{d.kategori[i]}</span>
              <span className="font-mono text-sm font-bold text-ink-black"
                    style={{ fontVariantNumeric: 'tabular-nums' }}>{yuzde(p)}</span>
            </li>
          ))}
        </ul>
      </div>

      <h3 className="font-display text-lg font-bold uppercase text-ink-black mt-2">{d.hatBaslik}</h3>

      <p className="font-sans text-base text-on-surface-variant max-2xl leading-relaxed">{d.hatP}</p>

      <div className="border-2 border-ink-black bg-grain-fill p-6">
        <svg viewBox="0 0 1000 252" className="block w-full h-auto" role="img" aria-label={d.svgEtiket}>
          <defs>
            <marker id="okv" viewBox="0 0 10 10" refX="9" refY="5"
                    markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1b211d" />
            </marker>
          </defs>

          {d.adim.map((a, k) => {
            const sat = k < 4 ? 0 : 1;
            const sut = k < 4 ? k : k - 4;
            const bx = 14 + sut * 246;
            const by = 18 + sat * 126;
            const son = k === d.adim.length - 1;
            return (
              <g key={k}>
                <rect x={bx} y={by} width="210" height="82"
                      fill={son ? '#e6f2ec' : '#ffffff'} stroke="#1b211d" strokeWidth="2" />
                <rect x={bx} y={by} width="34" height="82"
                      fill={son ? '#006c48' : '#254a96'} stroke="#1b211d" strokeWidth="2" />
                <text x={bx + 17} y={by + 49} textAnchor="middle" fontSize="16" fontWeight="800"
                      fill="#ffffff" fontFamily="'IBM Plex Mono', monospace">{k + 1}</text>
                <text x={bx + 48} y={by + 36} fontSize="13" fontWeight="700" fill="#1b211d"
                      fontFamily="'Hanken Grotesk', sans-serif">{a.ust}</text>
                <text x={bx + 48} y={by + 56} fontSize="11" fill="#1b211d" fillOpacity="0.6"
                      fontFamily="'IBM Plex Mono', monospace">{a.alt}</text>
                {sut < 3 && (
                  <line x1={bx + 214} y1={by + 41} x2={bx + 242} y2={by + 41}
                        stroke="#1b211d" strokeWidth="2" markerEnd="url(#okv)" />
                )}
              </g>
            );
          })}

          <path d="M 857 104 L 857 118 L 119 118 L 119 140"
                fill="none" stroke="#1b211d" strokeWidth="2" markerEnd="url(#okv)" />
        </svg>
      </div>
    </section>
  );
}
