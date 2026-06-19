import SectionHeader from '@/components/common/SectionHeader';
import ServicesTree from '@/features/services/ServicesTree';
import Spinner from '@/components/common/Spinner';
import { useServicesTree } from '@/hooks/useServices';
import { useTranslation } from 'react-i18next';

export default function ServicesPage() {
  const { services, isLoading, error } = useServicesTree();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen pt-[200px] sm:pt-[160px] md:pt-48 pb-20 bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-dark-gradient">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <SectionHeader
            title={`${t('services.page_title1')} ${t('services.page_title2')}`}
            subtitle={t('services.page_desc')}
            centered
          />
        </div>

        {isLoading ? (
          <div className="py-20"><Spinner size="lg" /></div>
        ) : error ? (
          <p className="text-center text-red-400 py-10">{error}</p>
        ) : (
          <ServicesTree services={services} />
        )}
      </div>
    </main>
  );
}
