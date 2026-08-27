import React from 'react';
import { useDil } from '../i18n';

export default function ReportFooter() {
  const { t } = useDil();
  const bag = 'font-mono text-xs text-surface-variant hover:text-seafoam-bright transition-colors hover:underline decoration-2 underline-offset-4 uppercase no-underline';

  return (
    <footer className="bg-ink-black text-surface border-t-2 border-ink-black full-width bottom-0 mt-24">
      <div className="flex flex-col md:flex-row justify-between items-center py-12 px-6 w-full max-w-[1100px] mx-auto">
        <div className="flex items-center gap-3">
          <img src="/images/logo.png" alt="Mogan Logo" className="h-6 w-6 object-contain" />
          <span className="text-xl font-display font-bold text-surface uppercase">MOGANBERT</span>
        </div>

        <p className="text-sm font-sans text-surface-variant my-4 md:my-0">{t.footer.lisans}</p>

        <nav className="flex gap-6">
          <a className={bag} href="https://huggingface.co/moganai" target="_blank" rel="noopener noreferrer">HUGGINGFACE</a>
          <a className={bag} href="https://github.com/moganai" target="_blank" rel="noopener noreferrer">GITHUB</a>
          <a className={bag} href="/uploads/moganai__rapor.pdf" target="_blank" rel="noopener noreferrer">{t.footer.pdf}</a>
        </nav>
      </div>
    </footer>
  );
}
