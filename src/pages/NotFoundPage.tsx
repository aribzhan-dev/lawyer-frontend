import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-dark-gradient px-4 text-center">
      <div className="relative">
        <div className="absolute inset-0 bg-gold-500/10 blur-[100px] rounded-full" />
        <p className="font-serif text-[10rem] font-bold text-gray-300 dark:text-dark-800 leading-none select-none">404</p>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
          <h1 className="font-serif text-4xl text-gray-900 dark:text-dark-50 mb-3">{t('not_found.title')}</h1>
          <p className="text-gray-500 dark:text-dark-400 text-sm mb-8 max-w-xs">
            {t('not_found.desc')}
          </p>
          <div className="flex items-center gap-4">
            <Link to="/" className="btn-primary">
              <ArrowLeft className="w-4 h-4" /> {t('not_found.home')}
            </Link>
            <button onClick={() => window.history.back()} className="btn-outline">
              <ArrowLeft className="w-4 h-4" /> Go Back
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
