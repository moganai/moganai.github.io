import React, { useEffect, useState } from 'react';
import { DilProvider } from './i18n';
import ReportHeader from './components/ReportHeader';
import ReportHero from './components/ReportHero';
import ReportArchitecture from './components/ReportArchitecture';
import ReportDataMix from './components/ReportDataMix';
import ReportBenchmark from './components/ReportBenchmark';
import ReportTabiBench from './components/ReportTabiBench';
import ReportEmbedding from './components/ReportEmbedding';
import ReportColbert from './components/ReportColbert';
import ReportResources from './components/ReportResources';
import ReportFooter from './components/ReportFooter';

// Rota yalnizca "#/" onekiyle baslayan hash'ten okunur. Boylece sayfa ici
// capalar (#mimari, #benchmark ...) gorunumu degistirmez, sadece kaydirir.
function rotaOku() {
  const h = window.location.hash;
  return h.startsWith('#/') ? (h.slice(2) || 'ana') : 'ana';
}

// Alt rotalar acilinca hero'da kalmayip kendi basligina kaysin.
// 'ana' hedefsiz: sayfa basina doner.
const ROTA_CAPA = { embed: 'gomme', colbert: 'colbert' };

function useRota() {
  const [rota, setRota] = useState(rotaOku);
  useEffect(() => {
    const f = () => {
      setRota(rotaOku());
      // Alt sayfadan sayfa ici bir capaya gecilirse (ornegin gomme
      // sayfasindayken ustteki "MIMARI" baglantisi) hedef eleman ancak
      // render'dan SONRA var olur; tarayicinin kendi kaydirmasi o ana
      // yetismez. Bu yuzden kaydirmayi bir kare sonraya birakiyoruz.
      const h = window.location.hash;
      const hedef = h.startsWith('#/') ? ROTA_CAPA[rotaOku()] : h.slice(1);
      // Iki kare bekliyoruz: ilkinde React yeni bolumu render eder, ikincisinde
      // eleman DOM'da hazir olur. Tek kare bazen erken kaliyor.
      requestAnimationFrame(() => requestAnimationFrame(() => {
        const el = hedef && document.getElementById(hedef);
        if (el) el.scrollIntoView({ block: 'start' });
        else window.scrollTo({ top: 0 });
      }));
    };
    window.addEventListener('hashchange', f);
    return () => window.removeEventListener('hashchange', f);
  }, []);
  return rota;
}



// Hero (uc model karti dahil) her rotada sabit kalir; yalnizca altindaki
// bolum degisir. Kartlar boylece surekli birer gecis noktasi olarak durur.
function Govde() {
  const rota = useRota();

  // Hero ustte, Hesaplama altta her rotada sabit; arasi degisiyor.
  const orta = rota === 'embed'   ? <ReportEmbedding />
             : rota === 'colbert' ? <ReportColbert />
             : (
               <>
                 <ReportArchitecture />
                 <ReportDataMix />
                 <ReportBenchmark />
                 <ReportTabiBench />
               </>
             );
  return (
    <>
      <ReportHero />
      {orta}
      <ReportResources />
    </>
  );
}

export default function App() {
  return (
    <DilProvider>
      <div className="bg-paper-base text-ink-black font-sans antialiased relative min-h-screen flex flex-col">
        <ReportHeader />
        <main className="max-w-[1100px] mx-auto px-6 py-12 md:py-20 flex flex-col gap-20 w-full flex-1">
          <Govde />
        </main>
        <ReportFooter />
      </div>
    </DilProvider>
  );
}
