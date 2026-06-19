import { useParams, Link } from 'react-router-dom';
import { MessageCircle, Phone, ArrowLeft, Briefcase, GraduationCap, Award } from 'lucide-react';
import { useLawyerBySlug } from '@/hooks/useLawyers';
import { useTranslation } from 'react-i18next';
import Badge from '@/components/common/Badge';
import Spinner from '@/components/common/Spinner';
import { getFileUrl } from '@/utils/getFileUrl';

function buildWhatsAppUrl(phone: string, lawyerName: string, message?: string | null): string {
  const cleanPhone = phone.replace(/\D/g, '');
  const defaultMsg = message || `Hello, I would like to schedule a consultation with ${lawyerName}.`;
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(defaultMsg)}`;
}

export default function LawyerProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const { lawyer, isLoading, error } = useLawyerBySlug(slug ?? '');
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="font-serif text-4xl text-gray-900 dark:text-dark-50">{t('not_found.title')}</h1>
        <p className="text-gray-500 dark:text-dark-400">{t('not_found.desc')}</p>
        <Link to="/lawyers" className="btn-primary mt-4">
          <ArrowLeft className="w-4 h-4" /> {t('not_found.home')}
        </Link>
      </div>
    );
  }

  const whatsappUrl = buildWhatsAppUrl(lawyer.phone, lawyer.full_name, lawyer.whatsapp_message);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-dark-gradient pt-[116px]">
      {/* Hero Banner */}
      <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
        {lawyer.photo_url ? (
          <img
            src={getFileUrl(lawyer.photo_url)}
            alt={lawyer.full_name}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center">
            <span className="font-serif text-[12rem] font-semibold text-dark-700">
              {lawyer.full_name.charAt(0)}
            </span>
          </div>
        )}
        {/* Multi-stop overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-dark-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-transparent to-transparent" />
      </div>

      <div className="container-max px-4 sm:px-6 lg:px-8 -mt-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Photo card + CTA */}
          <div className="lg:col-span-1">
            <div className="glass-card overflow-hidden sticky top-28">
              {/* Portrait */}
              <div className="aspect-[4/5] overflow-hidden bg-white dark:bg-dark-800">
                {lawyer.photo_url ? (
                  <img
                    src={getFileUrl(lawyer.photo_url)}
                    alt={lawyer.full_name}
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
                    <span className="font-serif text-8xl text-gray-500 dark:text-dark-500">
                      {lawyer.full_name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Info card body */}
              <div className="p-6 space-y-5">
                <div>
                  <h1 className="font-serif text-2xl font-semibold text-gray-900 dark:text-dark-50">{lawyer.full_name}</h1>
                  {lawyer.title && (
                    <p className="text-gold-400 text-sm font-medium mt-1">{lawyer.title}</p>
                  )}
                </div>

                {/* Quick stats */}
                <div className="space-y-2.5">
                  {lawyer.experience_years && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-300">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-gold-500" />
                      </div>
                      <span>{lawyer.experience_years} {t('lawyers.years_experience')}</span>
                    </div>
                  )}
                  {lawyer.education && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-300">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
                        <GraduationCap className="w-4 h-4 text-gold-500" />
                      </div>
                      <span>{lawyer.education}</span>
                    </div>
                  )}
                  {lawyer.services.length > 0 && (
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-dark-300">
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-dark-700 flex items-center justify-center">
                        <Award className="w-4 h-4 text-gold-500" />
                      </div>
                      <span>{lawyer.services.length} {t('lawyers.specializations')}</span>
                    </div>
                  )}
                </div>

                {/* WhatsApp CTA — Primary action */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`whatsapp-cta-${lawyer.slug}`}
                  className="btn-primary w-full justify-center py-3.5 text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  {t('lawyers.whatsapp')}
                </a>

                {/* Phone */}
                <a
                  href={`tel:+${lawyer.phone}`}
                  className="btn-outline w-full justify-center py-3 text-sm"
                  id={`phone-cta-${lawyer.slug}`}
                >
                  <Phone className="w-4 h-4" />
                  {t('lawyers.call')}
                </a>
              </div>
            </div>
          </div>

          {/* Right: Full profile content */}
          <div className="lg:col-span-2 space-y-10 pb-10 glass-card p-6 sm:p-10">
            {/* Back link */}
            <Link
              to="/lawyers"
              className="inline-flex items-center gap-2 text-gray-500 dark:text-dark-400 hover:text-gold-400 text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> {t('hero.cta_team')}
            </Link>

            {/* Name heading (visible on mobile/tablet — hidden via responsive grid) */}
            <div className="lg:hidden">
              <h1 className="font-serif text-4xl font-semibold text-gray-900 dark:text-dark-50">{lawyer.full_name}</h1>
              {lawyer.title && <p className="text-gold-400 mt-1">{lawyer.title}</p>}
            </div>

            {/* Specializations */}
            {lawyer.services.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl text-gray-900 dark:text-dark-50 mb-4">{t('lawyers.specializations')}</h2>
                <div className="gold-divider mb-5" />
                <div className="flex flex-wrap gap-2.5">
                  {lawyer.services.map((s) => (
                    <Badge key={s.id} label={s.name} />
                  ))}
                </div>
              </div>
            )}

            {/* Biography */}
            {lawyer.bio && (
              <div>
                <h2 className="font-serif text-2xl text-gray-900 dark:text-dark-50 mb-4">{t('lawyers.bio')}</h2>
                <div className="gold-divider mb-5" />
                <div className="prose prose-invert prose-sm max-w-none">
                  {lawyer.bio.split('\n\n').map((para, i) => (
                    <p key={i} className="text-gray-600 dark:text-dark-300 text-base leading-relaxed mb-4">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {lawyer.education && (
              <div>
                <h2 className="font-serif text-2xl text-gray-900 dark:text-dark-50 mb-4">{t('lawyers.education')}</h2>
                <div className="gold-divider mb-5" />
                <div className="glass-card p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <GraduationCap className="w-5 h-5 text-gold-400" />
                  </div>
                  <p className="text-gray-600 dark:text-dark-300 text-sm leading-relaxed">{lawyer.education}</p>
                </div>
              </div>
            )}

            {/* Bottom CTA strip */}
            <div className="glass-card p-6 border-gold-500/20 bg-gold-500/5">
              <h3 className="font-serif text-xl text-gray-900 dark:text-dark-50 mb-2">{t('lawyers.ready_cta')}</h3>
              <p className="text-gray-500 dark:text-dark-400 text-sm mb-5">
                {t('lawyers.ready_desc')}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                id={`whatsapp-bottom-cta-${lawyer.slug}`}
              >
                <MessageCircle className="w-4 h-4" />
                {t('lawyers.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
