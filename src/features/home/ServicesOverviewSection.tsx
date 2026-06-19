import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/common/SectionHeader';
import ServicesTree from '@/features/services/ServicesTree';
import { useServicesTree } from '@/hooks/useServices';
import Spinner from '@/components/common/Spinner';

export default function ServicesOverviewSection() {
  const { services, isLoading } = useServicesTree();
  const { t } = useTranslation();

  return (
    <section id="services" className="section-padding bg-white dark:bg-dark-950">
      <div className="container-max">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14">
          <SectionHeader
            title={`${t('services.title1')} ${t('services.title2')}`}
            subtitle={t('services.description')}
          />
          <Link
            to="/services"
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors flex-shrink-0 mt-4 lg:mt-6"
          >
            {t('hero.cta_services')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <ServicesTree services={services} preview />
        )}
      </div>
    </section>
  );
}
