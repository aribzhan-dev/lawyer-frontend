import { useTranslation } from 'react-i18next';

export default function MetricsSection() {
  const { t } = useTranslation();

  const metrics = [
    { value: '98%', label: t('metrics.success_rate'), desc: t('metrics.success_rate_desc') },
    { value: '15+', label: t('metrics.experience'), desc: t('metrics.experience_desc') },
    { value: '$2B+', label: t('metrics.protected'), desc: t('metrics.protected_desc') },
    { value: '500+', label: t('metrics.clients'), desc: t('metrics.clients_desc') },
  ];

  return (
    <section className="py-24 bg-white dark:bg-dark-950 border-y border-gray-200/60 dark:border-dark-800/60">
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {metrics.map((metric, i) => (
            <div key={i} className="text-center group">
              <div className="font-serif text-5xl md:text-6xl text-gray-900 dark:text-dark-50 mb-3 group-hover:text-gold-400 transition-colors">
                {metric.value}
              </div>
              <div className="text-gold-500 font-medium text-sm tracking-wider uppercase mb-1">
                {metric.label}
              </div>
              <div className="text-gray-500 dark:text-dark-400 text-sm">
                {metric.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
