import React from 'react';
import { useDil, useSayi } from '../i18n';
import GommeAkis from './GommeAkis';

export default function ReportEmbedding() {
  const { t } = useDil();
  const sayi = useSayi();
  const e = t.embed;

  // --- Kategori ortalamalari. Sayilar dilden bagimsiz. ---
  const ogrenciler = [
    { ad: 'MoganBert-TR-Embed', paramTr: '149 M', paramEn: '149 M', bag: '8192', genel: 68.30, retr: 59.58, pair: 69.32, sts: 79.49, clf: 75.36, clu: 66.46, bit: 97.24, bizim: true },
    { ad: 'ModernBERT-TR',      paramTr: '149 M', paramEn: '149 M', bag: '8192', genel: 68.13, retr: 59.41, pair: 69.21, sts: 77.61, clf: 76.51, clu: 63.20, bit: 94.04 },
    { ad: 'mE5-large-instruct', paramTr: '560 M', paramEn: '560 M', bag: '512',  genel: 67.47, retr: 61.05, pair: 63.03, sts: 81.23, clf: 73.70, clu: 61.87, bit: 98.99, kisa: true },
    { ad: 'BGE-M3',             paramTr: '568 M', paramEn: '568 M', bag: '8192', genel: 67.36, retr: 60.26, pair: 68.72, sts: 79.60, clf: 72.79, clu: 60.80, bit: 98.99 },
    { ad: 'Mursit-Large-TR',    paramTr: '404 M', paramEn: '404 M', bag: '2048', genel: 62.00, retr: 55.70, pair: 55.19, sts: 74.60, clf: 68.66, clu: 61.53, bit: 86.72 },
    { ad: 'trmteb-tr-embed',    paramTr: '111 M', paramEn: '111 M', bag: '512',  genel: 59.71, retr: 52.54, pair: 56.81, sts: 74.96, clf: 70.62, clu: 63.17, bit: 37.75, kisa: true, tekdil: true },
  ];

  // Ogretmen rakip degil: distilasyonun kaynagi. Siralamaya ve birincilige DAHIL DEGIL.
  const ogretmen = { ad: 'Qwen3-Embedding-8B', paramTr: '7,57 Mr', paramEn: '7.57 B', bag: '40960',
                     genel: 68.66, retr: 64.46, pair: 62.76, sts: 80.04, clf: 72.95, clu: 63.01, bit: 98.18 };

  const sutunlar = [
    { k: 'genel', ad: 'GENEL', adEn: 'OVERALL' },
    { k: 'retr',  ad: 'RETRIEVAL', adEn: 'RETRIEVAL' },
    { k: 'pair',  ad: 'PAIR', adEn: 'PAIR' },
    { k: 'sts',   ad: 'STS', adEn: 'STS' },
    { k: 'clf',   ad: 'CLASSIF.', adEn: 'CLASSIF.' },
    { k: 'clu',   ad: 'CLUSTERING', adEn: 'CLUSTERING' },
    { k: 'bit',   ad: 'BITEXT', adEn: 'BITEXT' },
  ];

  const enIyi = {};
  sutunlar.forEach((s) => { enIyi[s.k] = Math.max(...ogrenciler.map((m) => m[s.k])); });

  const gorevler = [
    { g: 'Retrieval', ad: 'ArguAnaTR', v: [51.99, 49.93, 49.07, 50.43, 45.70, 61.84], k: [true, false, false, false, false, false] },
    { g: 'Retrieval', ad: 'CQADupstackGamingTR', v: [54.96, 56.36, 61.29, 58.41, 53.60, 67.08], k: [false, false, true, false, false, false] },
    { g: 'Retrieval', ad: 'FiQA2018TR', v: [47.85, 46.20, 47.82, 45.00, 40.65, 53.35], k: [true, false, false, false, false, false] },
    { g: 'Retrieval', ad: 'MSMarcoTRRetrieval', v: [58.09, 57.87, 58.35, 57.93, 58.95, 58.34], k: [false, false, false, false, true, false] },
    { g: 'Retrieval', ad: 'NFCorpusTR', v: [9.96, 9.45, 9.62, 9.41, 9.50, 12.00], k: [true, false, false, false, false, false] },
    { g: 'Retrieval', ad: 'QuoraRetrievalTR', v: [95.80, 95.18, 95.91, 95.82, 95.05, 95.75], k: [false, false, true, false, false, false] },
    { g: 'Retrieval', ad: 'SCIDOCSTR', v: [3.30, 3.37, 4.18, 3.69, 2.70, 5.78], k: [false, false, true, false, false, false] },
    { g: 'Retrieval', ad: 'SciFactTR', v: [81.23, 77.06, 83.99, 78.81, 72.79, 90.29], k: [false, false, true, false, false, false] },
    { g: 'Retrieval', ad: 'SquadTRRetrieval', v: [71.70, 75.92, 77.88, 76.69, 62.10, 79.10], k: [false, false, true, false, false, false] },
    { g: 'Retrieval', ad: 'TQuadRetrieval', v: [86.43, 87.13, 87.25, 90.52, 81.56, 89.30], k: [false, false, false, true, false, false] },
    { g: 'Retrieval', ad: 'XQuADRetrieval', v: [94.03, 95.04, 96.22, 96.11, 90.11, 96.20], k: [false, false, true, false, false, false] },
    { g: 'Pair Classification', ad: 'MnliTr', v: [67.33, 65.92, 63.88, 66.82, 54.09, 61.31], k: [true, false, false, false, false, false] },
    { g: 'Pair Classification', ad: 'SnliTr', v: [64.37, 67.29, 52.47, 60.56, 51.51, 57.43], k: [false, true, false, false, false, false] },
    { g: 'Pair Classification', ad: 'XNLI', v: [76.26, 74.43, 72.75, 78.78, 59.98, 69.52], k: [false, false, false, true, false, false] },
    { g: 'STS', ad: 'STSbTR', v: [79.49, 77.61, 81.23, 79.60, 74.60, 80.04], k: [false, false, true, false, false, false] },
    { g: 'Classification', ad: 'THYSentiment', v: [69.05, 68.15, 66.13, 67.36, 57.68, 66.15], k: [true, false, false, false, false, false] },
    { g: 'Classification', ad: 'TSTimelineNewsCat', v: [64.39, 67.91, 65.02, 64.60, 63.08, 63.48], k: [false, true, false, false, false, false] },
    { g: 'Classification', ad: 'Turkish75News', v: [93.33, 93.33, 92.67, 88.00, 96.67, 94.67], k: [false, false, false, false, true, false] },
    { g: 'Classification', ad: 'TurkishIrony', v: [56.25, 57.75, 58.83, 53.25, 50.92, 55.75], k: [false, false, true, false, false, false] },
    { g: 'Classification', ad: 'TurkishMovieSentiment', v: [86.08, 89.34, 85.25, 86.64, 72.63, 83.38], k: [false, true, false, false, false, false] },
    { g: 'Classification', ad: 'TurkishNewsCategory', v: [89.36, 93.64, 93.80, 90.00, 90.00, 92.60], k: [false, false, true, false, false, false] },
    { g: 'Classification', ad: 'TurkishOffensiveLang', v: [71.72, 71.51, 60.68, 61.97, 62.06, 63.36], k: [true, false, false, false, false, false] },
    { g: 'Classification', ad: 'TurkishProductSentiment', v: [72.70, 70.46, 67.22, 70.46, 56.23, 64.21], k: [true, false, false, false, false, false] },
    { g: 'Clustering', ad: 'TurkishAbstractCorpus', v: [67.93, 62.02, 61.94, 59.39, 60.20, 63.73], k: [true, false, false, false, false, false] },
    { g: 'Clustering', ad: 'TurkishColumnWriting', v: [64.99, 64.38, 61.80, 62.21, 62.86, 62.29], k: [true, false, false, false, false, false] },
    { g: 'Bitext', ad: 'WMT16BitextMining', v: [97.24, 94.04, 98.99, 98.99, 86.72, 98.18], k: [false, false, true, true, false, false] },
  ];

  const gorevBaslik = ['MOGAN', 'MBERT-TR', 'ME5', 'BGE-M3', 'MURSIT'];
  const tr = t.kod === 'tr';
  const param = (m) => (tr ? m.paramTr : m.paramEn);
  const kalin = (par) => par.map((s, j) =>
    j % 2 ? <strong key={j}>{s}</strong> : <React.Fragment key={j}>{s}</React.Fragment>);

  const hucre = (m, s, ogretmenMi) => (
    <td key={s.k}
        className={`p-3 border-r-2 border-ink-black last:border-r-0 text-right ${
          ogretmenMi ? 'text-ink-black/55'
            : m[s.k] === enIyi[s.k] ? 'font-bold text-secondary' : 'text-ink-black/85'}`}>
      {sayi(m[s.k])}
    </td>
  );

  return (
    <section id="gomme" className="flex flex-col gap-6">
      <div className="bg-cobalt-deep text-on-primary px-4 py-2 border-2 border-ink-black inline-block self-start relative slash-deco">
        <h2 className="font-display text-base md:text-lg font-bold uppercase tracking-tight">{e.baslik}</h2>
      </div>

      <div className="flex flex-col gap-4 max-2xl">
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{e.p[0]}</p>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{kalin(e.p2)}</p>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{e.p[2]}</p>
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{kalin(e.p4)}</p>
      </div>

      <GommeAkis />

      <div className="flex flex-col gap-4 max-2xl">
        <p className="font-sans text-base text-on-surface-variant leading-relaxed">{kalin(e.ogretmenP)}</p>
      </div>

      <div className="border-2 border-ink-black bg-grain-fill p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-ink-black pb-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">{e.katBaslik}</h3>
          <span className="font-mono text-xs text-ink-black/70">{e.katAlt}</span>
        </div>

        <div className="w-full overflow-x-auto border-2 border-ink-black bg-paper-base">
          <table className="w-full text-left border-collapse min-w-[880px]">
            <thead>
              <tr className="bg-primary-container text-on-primary-container">
                <th className="p-3 border-b-2 border-r-2 border-ink-black font-mono text-xs uppercase font-bold">{e.thModel}</th>
                <th className="p-3 border-b-2 border-r-2 border-ink-black font-mono text-xs uppercase font-bold text-center">{e.thParam}</th>
                <th className="p-3 border-b-2 border-r-2 border-ink-black font-mono text-xs uppercase font-bold text-center">{e.thContext}</th>
                {sutunlar.map((s) => (
                  <th key={s.k} className="p-3 border-b-2 border-r-2 border-ink-black last:border-r-0 font-mono text-xs uppercase font-bold text-center">
                    {tr ? s.ad : s.adEn}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono text-sm" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {ogrenciler.map((m) => (
                <tr key={m.ad} className={`border-b-2 border-ink-black ${
                      m.bizim ? 'bg-secondary-container/25' : 'hover:bg-surface-container-highest'}`}>
                  <td className={`p-3 border-r-2 border-ink-black whitespace-nowrap ${m.bizim ? 'font-bold' : ''}`}>
                    {m.bizim && <img src="/images/logo.png" alt="" className="inline-block h-4 w-4 object-contain mr-2 align-text-bottom" />}
                    {m.ad}
                    {m.tekdil && <sup className="text-ink-black/50 ml-0.5">2</sup>}
                  </td>
                  <td className={`p-3 border-r-2 border-ink-black text-right whitespace-nowrap ${
                      m.bizim ? 'font-bold text-ink-black' : 'text-ink-black/60'}`}>{param(m)}</td>
                  <td className="p-3 border-r-2 border-ink-black text-right text-ink-black/60 whitespace-nowrap">
                    {m.bag}{m.kisa && <sup className="text-ink-black/50 ml-0.5">1</sup>}
                  </td>
                  {sutunlar.map((s) => hucre(m, s, false))}
                </tr>
              ))}
              <tr className="bg-surface-container-highest border-t-2 border-b-2 border-ink-black">
                <td colSpan={3 + sutunlar.length} className="px-3 py-2 font-sans text-xs italic text-ink-black/70">
                  {e.ogretmenSerit}
                </td>
              </tr>
              <tr>
                <td className="p-3 border-r-2 border-ink-black whitespace-nowrap text-ink-black/70">{ogretmen.ad}</td>
                <td className="p-3 border-r-2 border-ink-black text-right text-ink-black/55 whitespace-nowrap">{param(ogretmen)}</td>
                <td className="p-3 border-r-2 border-ink-black text-right text-ink-black/55 whitespace-nowrap">{ogretmen.bag}</td>
                {sutunlar.map((s) => hucre(ogretmen, s, true))}
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-mono text-xs text-ink-black/60 border-t border-ink-black/20 pt-3 leading-relaxed">
          {e.katDipnot[0]}<strong>{e.katDipnot[1]}</strong>{e.katDipnot[2]}
          <sup>1</sup>{e.katDipnot[3]}<sup>2</sup>{e.katDipnot[4]}
        </p>
      </div>

      <div className="flex flex-col gap-4 max-2xl">
        {e.son.map((par, i) => (
          <p key={i} className="font-sans text-base text-on-surface-variant leading-relaxed">{kalin(par)}</p>
        ))}
      </div>

      <div className="border-2 border-ink-black bg-grain-fill p-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b-2 border-ink-black pb-3">
          <h3 className="font-display text-base font-bold uppercase text-ink-black">{e.gorevBaslik}</h3>
          <span className="font-mono text-xs text-ink-black/70">{e.gorevAlt}</span>
        </div>

        <div className="w-full overflow-x-auto border-2 border-ink-black bg-paper-base">
          <table className="w-full text-left border-collapse min-w-[680px]">
            <thead>
              <tr className="bg-primary-container text-on-primary-container">
                <th className="p-2 border-b-2 border-r-2 border-ink-black font-mono text-[11px] uppercase font-bold">{e.thGorev}</th>
                {gorevBaslik.map((h) => (
                  <th key={h} className="p-2 border-b-2 border-r-2 border-ink-black font-mono text-[11px] uppercase font-bold text-center">{h}</th>
                ))}
                <th className="p-2 border-b-2 border-l-2 border-ink-black font-mono text-[11px] uppercase font-bold text-center whitespace-nowrap">
                  Qwen3 <span className="normal-case font-normal opacity-70">{e.ogrEk}</span>
                </th>
              </tr>
            </thead>
            <tbody className="font-mono text-xs" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {gorevler.map((g, i) => {
                const yeniGrup = i === 0 || gorevler[i - 1].g !== g.g;
                return (
                  <React.Fragment key={g.ad}>
                    {yeniGrup && (
                      <tr className="bg-surface-container-highest border-t-2 border-b-2 border-ink-black">
                        <td colSpan={gorevBaslik.length + 2}
                            className="px-2 py-1.5 font-sans text-[11px] font-bold uppercase tracking-wide text-ink-black/70">
                          {e.grup[g.g] || g.g}
                        </td>
                      </tr>
                    )}
                    <tr className="border-b border-ink-black/25 hover:bg-surface-container-highest">
                      <td className="p-2 border-r-2 border-ink-black whitespace-nowrap text-ink-black/85">{g.ad}</td>
                      {g.v.slice(0, 5).map((v, j) => (
                        <td key={j} className={`p-2 border-r-2 border-ink-black text-right ${
                            g.k[j] ? 'font-bold text-secondary' : 'text-ink-black/80'}`}>{sayi(v)}</td>
                      ))}
                      <td className="p-2 border-l-2 border-ink-black text-right text-ink-black/55">{sayi(g.v[5])}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
              <tr className="bg-secondary-container/25 border-t-2 border-ink-black font-bold">
                <td className="p-2 border-r-2 border-ink-black uppercase whitespace-nowrap">{sutunlar[0].k === 'genel' && (tr ? 'GENEL' : 'OVERALL')}</td>
                <td className="p-2 border-r-2 border-ink-black text-right text-secondary">{sayi(68.30)}</td>
                <td className="p-2 border-r-2 border-ink-black text-right">{sayi(68.13)}</td>
                <td className="p-2 border-r-2 border-ink-black text-right">{sayi(67.47)}</td>
                <td className="p-2 border-r-2 border-ink-black text-right">{sayi(67.36)}</td>
                <td className="p-2 border-r-2 border-ink-black text-right">{sayi(62.00)}</td>
                <td className="p-2 border-l-2 border-ink-black text-right text-ink-black/55">{sayi(68.66)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-mono text-xs text-ink-black/60 border-t border-ink-black/20 pt-3 leading-relaxed">
          {e.gorevDipnot}
        </p>
      </div>
    </section>
  );
}
