import SectionHeader from '@/components/common/SectionHeader';
import LawyerCard from '@/features/lawyers/LawyerCard';
import Spinner from '@/components/common/Spinner';
import { useLawyers } from '@/hooks/useLawyers';
import { useTranslation } from 'react-i18next';

export default function LawyersPage() {
  const { lawyers, isLoading, error } = useLawyers();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen pt-[200px] sm:pt-[160px] md:pt-48 pb-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-dark-gradient">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <SectionHeader
            eyebrow={t('lawyers.page_eyebrow')}
            title={t('lawyers.page_title1')}
            subtitle={t('lawyers.page_desc')}
            centered
          />
        </div>

        {isLoading ? (
          <div className="py-20"><Spinner size="lg" /></div>
        ) : error ? (
          <p className="text-center text-red-400 py-10">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lawyers.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
