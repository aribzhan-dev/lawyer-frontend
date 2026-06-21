import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, ChevronRight } from 'lucide-react';
import { servicesApi } from '@/api/servicesApi';
import type { Service } from '@/types/service';
import { useUIStore } from '@/store/uiStore';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';

function ServiceRow({ service, depth = 0, onDelete }: { service: Service; depth?: number; onDelete: (id: number, name: string) => void }) {
  return (
    <>
      <tr className="hover:bg-gray-50 dark:hover:bg-dark-800/30 transition-colors">
        <td className="px-6 py-3">
          <div className="flex items-center gap-2" style={{ paddingLeft: `${depth * 20}px` }}>
            {depth > 0 && <ChevronRight className="w-3.5 h-3.5 text-gray-400 dark:text-dark-600 flex-shrink-0" />}
            <span className={`text-sm ${depth === 0 ? 'text-gray-900 dark:text-dark-50 font-medium' : 'text-gray-600 dark:text-dark-300'}`}>
              {service.name}
            </span>
          </div>
        </td>
        <td className="px-6 py-3 text-gray-500 dark:text-dark-500 text-xs font-mono hidden md:table-cell">{service.slug}</td>
        <td className="px-6 py-3 text-gray-500 dark:text-dark-500 text-xs hidden lg:table-cell">
          {service.children?.length ?? 0} подуслуги
        </td>
        <td className="px-6 py-3">
          <div className="flex items-center justify-end gap-2">
            <Link
              to={`/admin/services/${service.id}/edit`}
              className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-gold-400 hover:bg-gold-500/10 transition-colors"
              title="Редактировать"
            >
              <Edit className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onDelete(service.id, service.name)}
              className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Удалить"
              id={`delete-service-${service.id}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>
      {service.children?.map((child) => (
        <ServiceRow key={child.id} service={child} depth={depth + 1} onDelete={onDelete} />
      ))}
    </>
  );
}

export default function ServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useUIStore();

  const fetchAll = () => {
    setIsLoading(true);
    servicesApi.getTree().then(setServices).finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleУдалить = async (id: number, name: string) => {
    if (!window.confirm(`Удалить "${name}"? Все подуслуги также будут удалены.`)) return;
    try {
      await servicesApi.delete(id);
      addToast({ type: 'success', message: `"${name}" успешно удалена` });
      fetchAll();
    } catch {
      addToast({ type: 'error', message: 'Не удалось удалить услугу' });
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-gray-900 dark:text-dark-50">Услуги</h1>
          <p className="text-gray-500 dark:text-dark-400 text-sm mt-0.5">Управление направлениями и категориями услуг</p>
        </div>
        <Link to="/admin/services/new" id="add-service-btn">
          <Button>
            <Plus className="w-4 h-4" /> Добавить услугу
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="py-20"><Spinner size="lg" /></div>
      ) : (
        <div className="glass-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-700/60">
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase">Название</th>
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase hidden md:table-cell">Слаг</th>
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase hidden lg:table-cell">Подуслуги</th>
                <th className="px-6 py-4 text-right text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 dark:divide-dark-800/60">
              {services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center text-gray-500 dark:text-dark-500 text-sm">
                    Услуги не найдены.
                  </td>
                </tr>
              ) : (
                services.map((svc) => (
                  <ServiceRow key={svc.id} service={svc} onDelete={handleУдалить} />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
