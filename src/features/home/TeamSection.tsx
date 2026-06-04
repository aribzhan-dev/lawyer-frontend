import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '@/components/common/SectionHeader';
import LawyerCard from '@/features/lawyers/LawyerCard';
import Spinner from '@/components/common/Spinner';
import { useLawyers } from '@/hooks/useLawyers';

export default function TeamSection() {
  const { lawyers, isLoading } = useLawyers();
  const { t } = useTranslation();
  const featured = lawyers.slice(0, 4);

  return (
    <section id="team" className="section-padding bg-gray-50 dark:bg-dark-900/40">
      <div className="container-max">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-14">
          <SectionHeader
            eyebrow={t('lawyers.eyebrow')}
            title={t('lawyers.title1')}
            titleHighlight={t('lawyers.title2')}
            subtitle={t('lawyers.description')}
          />
          <Link
            to="/lawyers"
            className="flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors flex-shrink-0 mt-4 lg:mt-6"
          >
            {t('hero.cta_team')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="py-20">
            <Spinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((lawyer) => (
              <LawyerCard key={lawyer.id} lawyer={lawyer} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
