import React from 'react';
import { useDil } from '../i18n';

// ColBERT blogu yayina girince true yapilir; kart durumu ve eylem metni
// buna gore degisir.
const COLBERT_HAZIR = true;

// Marka isaretleri. HF'nin kendi logosu emojiye dayaniyor; arXiv metin
// biciminde taniniyor. Ikisi de yerel, dis kaynak yok.
const ISARET = {
  hf: <span aria-hidden="true" className="text-[17px] leading-none"><img src="/images/hf.png" alt="" width="100" height="60" /></span>,
  paper: 
    <span aria-hidden="true" className="text-[17px] leading-none"><img src="/images/arxiv.png" alt="" width="50" height="25" /></span>,
          
  
};

// Kart basina Hugging Face ve makale adresleri. Bos birakilan baglanti
// tiklanabilir olmaz, soluk gorunur -- adres hazir olunca doldurmak yeterli.
const BAGLANTI = {
  '01': { hf: 'https://huggingface.co/moganai', paper: 'https://arxiv.org/abs/2608.25768' },
  '02': { hf: 'https://huggingface.co/moganai', paper: 'https://arxiv.org/abs/2608.25768' },
  '03': { hf: 'https://huggingface.co/moganai', paper: '' },
};

export default function ReportHero() {
  const { t } = useDil();
  const h = t.hero;

  const kartlar = h.kartlar.map((k, i) => ({
    ...k,
    yayinda: k.no !== '03' || COLBERT_HAZIR,
    gecikme: `${0.24 + i * 0.12}s`,
  }));

  return (
    <section id="giris" className="flex flex-col gap-6">

      {/* ---- ust kutu ---- */}
      <div className="relative overflow-hidden border-2 border-ink-black bg-grain-fill
                      px-6 pt-10 pb-8 md:px-8 flex flex-col items-center gap-[22px]
                      text-center slash-deco">
        <div className="ust-gir inline-block bg-cobalt-deep text-on-primary px-3 py-[5px]
                        border-2 border-ink-black font-mono text-xs uppercase font-bold">
          {h.rozet}
        </div>

        {/* Wordmark zaten "MoganBERT-TR" yaziyor; ayrica metin baslik koymak
            ismi iki kez gosterirdi. alt metni erisilebilir adi tasiyor. */}
        <h1 className="ust-gir w-full max-w-[380px] sm:max-w-[460px] md:max-w-[560px] my-1"
            style={{ animationDelay: '.08s' }}>
          <img src="/images/moganberttr.png" alt="MoganBERT-TR"
               width="2041" height="480" className="w-full h-auto object-contain block" />
        </h1>

        <p className="ust-gir font-sans text-base md:text-[17px] text-on-surface-variant
                      max-w-2xl leading-relaxed" style={{ animationDelay: '.14s' }}>
          {h.ozet[0]}<strong className="text-ink-black">{h.ozet[1]}</strong>{h.ozet[2]}
        </p>

        <div className="ust-gir font-mono text-xs md:text-[13px] text-ink-black/70
                        border-t-2 border-ink-black/20 pt-4 w-full max-w-[760px]"
             style={{ animationDelay: '.2s' }}>
          <strong>{h.yazarlar}</strong> Furkan Yılmaz, Habibe Aleyna Taşdemir, Muhammed Faruk Gözay
          <div className="text-cobalt-deep font-bold mt-1">{h.grup}</div>
        </div>
      </div>

      {/* ---- meta cubugu ---- */}
      <div className="flex items-baseline justify-between gap-4 font-mono text-xs uppercase
                      tracking-[.14em] text-ink-black/55 border-b-2 border-ink-black pb-2">
        <span>{h.aileEtiket}</span>
        <span>MoganAI · 2026</span>
      </div>

      {/* ---- model kartlari ---- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {kartlar.map((k) => (
          <div key={k.no}
               className="kart-gir group relative flex flex-col bg-paper-base border-2 border-ink-black
                          text-ink-black transition-transform duration-200
                          hover:-translate-x-[5px] hover:-translate-y-[5px]
                          hover:shadow-[7px_7px_0_#1b211d]"
               style={{ animationDelay: k.gecikme }}>
            <div className="absolute top-0 right-0 w-[9px] h-[9px] bg-cobalt-deep"
                 style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />

            <div className="flex items-center justify-between gap-2 px-[14px] py-[10px]
                            border-b-2 border-ink-black bg-grain-fill font-mono text-[11px]
                            font-bold uppercase tracking-[.1em]">
              <span className="text-ink-black/55">{k.no}</span>
              <span className={`flex items-center gap-[6px] ${k.yayinda ? 'text-secondary' : 'text-cobalt-deep'}`}>
                <span className={`nabiz w-[7px] h-[7px] ${k.yayinda ? 'bg-secondary' : 'bg-cobalt-deep'}`} />
                {k.yayinda ? h.durumYayinda : h.durumYakinda}
              </span>
            </div>

            <div className="flex flex-col gap-3 flex-1 px-[18px] pt-5 pb-[18px]">
              <div className="font-mono text-[11px] uppercase tracking-[.14em] font-bold text-cobalt-deep">
                {k.tur}
              </div>
              <div className="font-display font-black text-[27px] leading-[1.02] tracking-[-0.035em]">
                {k.ad}
              </div>
              <p className="m-0 text-sm leading-[1.55] text-on-surface-variant">{k.aciklama}</p>

              <div className="mt-auto grid grid-cols-2 gap-px bg-ink-black border-2 border-ink-black">
                {[['hf', h.hfEt, BAGLANTI[k.no].hf],
                  ['paper', h.paperEt, BAGLANTI[k.no].paper]].map(([tip, et, url]) => {
                  const ic = (
                    <>
                      {ISARET[tip]}
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[.1em]">{et}</span>
                    </>
                  );
                  const ortak = 'bg-paper-base px-2 py-[11px] flex items-center justify-center gap-[6px]';
                  return url ? (
                    <a key={tip} href={url} target="_blank" rel="noopener noreferrer"
                       className={`${ortak} text-cobalt-deep no-underline hover:bg-grain-fill transition-colors`}>
                      {ic}
                    </a>
                  ) : (
                    <span key={tip} className={`${ortak} text-ink-black/30 [&>span:first-child]:opacity-40`}>
                      {ic}
                    </span>
                  );
                })}
              </div>

              <a href={k.link}
                 className="flex items-center justify-between gap-2 font-mono text-[11px] font-bold
                            uppercase tracking-[.1em] border-t-2 border-ink-black/20 pt-3
                            text-cobalt-deep no-underline">
                <span>{k.yayinda ? k.eylem : h.eylemHazirlaniyor}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
