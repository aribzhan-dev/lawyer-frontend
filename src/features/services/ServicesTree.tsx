import { useState } from 'react';
import { ChevronDown, ChevronRight, Dot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Service } from '@/types/service';

interface ServiceNodeProps {
  service: Service;
  depth?: number;
}

function ServiceNode({ service, depth = 0 }: ServiceNodeProps) {
  const [expanded, setExpanded] = useState(depth === 0);
  const hasChildren = service.children && service.children.length > 0;

  return (
    <div className={`${depth > 0 ? 'ml-4 border-l border-gray-200/50 dark:border-dark-700/50 pl-4' : ''}`}>
      <button
        onClick={() => hasChildren && setExpanded(!expanded)}
        className={`w-full flex items-start gap-3 py-3 text-left group transition-colors duration-200 ${
          hasChildren ? 'cursor-pointer' : 'cursor-default'
        }`}
        aria-expanded={hasChildren ? expanded : undefined}
      >
        {hasChildren ? (
          <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded flex items-center justify-center bg-gold-500/10 text-gold-500 group-hover:bg-gold-500/20 transition-colors">
            {expanded ? (
              <ChevronDown className="w-3.5 h-3.5" />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" />
            )}
          </span>
        ) : (
          <Dot className="flex-shrink-0 mt-0.5 w-5 h-5 text-gold-600" />
        )}
        <div className="flex-1 min-w-0">
          <span
            className={`font-medium transition-colors ${
              depth === 0
                ? 'text-gray-900 dark:text-dark-50 text-base group-hover:text-gold-400'
                : 'text-gray-600 dark:text-dark-300 text-sm group-hover:text-gold-400'
            }`}
          >
            {service.name}
          </span>
          {service.description && depth === 0 && (
            <p className="text-gray-500 dark:text-dark-500 text-xs mt-0.5 leading-relaxed line-clamp-2">
              {service.description}
            </p>
          )}
        </div>
      </button>

      {hasChildren && expanded && (
        <div className="mb-2">
          {service.children.map((child) => (
            <ServiceNode key={child.id} service={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

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
