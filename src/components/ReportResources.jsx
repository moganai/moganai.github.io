import React from 'react';
import { useDil } from '../i18n';

export default function ReportResources() {
  const { t } = useDil();

  return (
    <section id="kaynak" className="flex flex-col gap-6">
      <div className="bg-cobalt-deep text-on-primary px-4 py-2 border-2 border-ink-black inline-block self-start relative slash-deco">
        <h2 className="font-display text-base md:text-lg font-bold uppercase tracking-tight">
          {t.res.baslik}
        </h2>
      </div>

      <div className="border-2 border-ink-black bg-grain-fill p-6 md:p-8 flex flex-col md:flex-row gap-8 items-start">
        <svg viewBox="0 0 120 110" width="112" height="102"
             className="shrink-0 mx-auto md:mx-0" role="img" aria-label={t.res.kalpEtiket}>
          <path d="M52 100 C52 100, 10 70, 10 42 A26 26 0 0 1 52 22 L58 40 L44 54 L62 62 L50 82 L60 100 Z"
                fill="#f3dde0" stroke="#1b211d" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M68 100 C68 100, 110 70, 110 42 A26 26 0 0 0 68 22 L62 40 L76 54 L58 62 L70 82 L60 100 Z"
                fill="#f3dde0" stroke="#1b211d" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M52 22 L58 40 L44 54 L62 62 L50 82 L60 100"
                fill="none" stroke="#1b211d" strokeWidth="2.5" strokeLinejoin="round" />
        </svg>

        <div className="flex flex-col gap-4">
          {t.res.p.map((par, i) => (
            <p key={i} className="font-sans text-base text-ink-black/85 leading-relaxed">
              {par.map((s, j) => (j % 2 ? <strong key={j}>{s}</strong> : <React.Fragment key={j}>{s}</React.Fragment>))}
            </p>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-ink-black border-2 border-ink-black">
        {t.res.gercek.map((g) => (
          <div key={g.k} className="bg-paper-base px-4 py-5 flex flex-col gap-1">
            <span className="font-mono text-[10px] uppercase tracking-widest text-ink-black/55">{g.k}</span>
            <strong className="font-mono text-sm font-bold text-ink-black">{g.v}</strong>
          </div>
        ))}
      </div>

      
    </section>
  );
}
