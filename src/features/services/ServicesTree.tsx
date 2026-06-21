import { useTranslation } from 'react-i18next';
import type { Service } from '@/types/service';

interface ServicesTreeProps {
  services: Service[];
  /** Preview mode: show only first 6 root services in a grid */
  preview?: boolean;
}

export default function ServicesTree({ services, preview = false }: ServicesTreeProps) {
  const { t } = useTranslation();
  const displayed = preview ? services.slice(0, 6) : services;

  if (displayed.length === 0) {
    return (
      <p className="text-gray-500 dark:text-dark-500 text-sm italic py-8 text-center">
        {t('services.empty')}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {displayed.map((service) => (
        <div
          key={service.id}
          className="glass-card p-6 hover:border-gold-500/30 hover:bg-gray-100/60 dark:hover:bg-dark-700/60 transition-all duration-300 group"
        >
          {/* Category header */}
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200/40 dark:border-dark-700/40">
            <div className="w-9 h-9 rounded-lg bg-gold-gradient flex items-center justify-center flex-shrink-0">
              <span className="text-white dark:text-dark-950 font-bold text-xs">
                {service.name.charAt(0)}
              </span>
            </div>
            <h3 className="font-serif text-lg font-semibold text-gray-900 dark:text-dark-50 group-hover:text-gold-300 transition-colors">
              {service.name}
            </h3>
          </div>

          {/* Description if no children */}
          {!service.children?.length && service.description && (
            <p className="text-gray-500 dark:text-dark-400 text-sm leading-relaxed">{service.description}</p>
          )}

          {/* Children list */}
          {service.children && service.children.length > 0 && (
            <ul className="space-y-1">
              {service.children.map((child) => (
                <li
                  key={child.id}
                  className="flex items-start gap-2.5 text-gray-500 dark:text-dark-400 text-sm hover:text-gold-400 transition-colors group/item py-1"
                >
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-600 flex-shrink-0 group-hover/item:bg-gold-400 transition-colors" />
                  <span>{child.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
