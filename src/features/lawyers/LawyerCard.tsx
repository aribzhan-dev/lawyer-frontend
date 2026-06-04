import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Lawyer } from '@/types/lawyer';

interface LawyerCardProps {
  lawyer: Lawyer;
}

export default function LawyerCard({ lawyer }: LawyerCardProps) {
  const { t } = useTranslation();

  return (
    <Link
      to={`/lawyers/${lawyer.slug}`}
      className="group block glass-card overflow-hidden hover:border-gold-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/60 dark:shadow-dark-950/60"
      id={`lawyer-card-${lawyer.slug}`}
    >
      {/* Portrait */}
      <div className="relative aspect-[3/4] overflow-hidden bg-white dark:bg-dark-800">
        {lawyer.photo_url ? (
          <img
            src={lawyer.photo_url.startsWith('http') ? lawyer.photo_url : `http://localhost:8000${lawyer.photo_url}`}
            alt={lawyer.full_name}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-dark-800 to-dark-700">
            <span className="font-serif text-6xl font-semibold text-gray-400 dark:text-dark-600">
              {lawyer.full_name.charAt(0)}
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/20 to-transparent" />
        
        {/* Name overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-serif text-lg font-semibold text-white leading-tight">
            {lawyer.full_name}
          </h3>
          {lawyer.title && (
            <p className="text-gold-400 text-xs font-medium mt-0.5">{lawyer.title}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-500 dark:text-dark-400 text-xs">
          <Briefcase className="w-3.5 h-3.5 text-gold-600" />
          <span>
            {lawyer.experience_years
              ? `${lawyer.experience_years} ${t('lawyers.years_experience')}`
              : t('lawyers.expert_counsel', 'Expert Counsel')}
          </span>
        </div>
        <span className="text-gold-500 group-hover:translate-x-1 transition-transform duration-200">
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
}
