import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { lawyersApi } from '@/api/lawyersApi';
import type { Lawyer } from '@/types/lawyer';
import { useUIStore } from '@/store/uiStore';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import { getFileUrl } from '@/utils/getFileUrl';

export default function АдвокатList() {
  const [lawyers, setАдвокатs] = useState<Lawyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useUIStore();

  const fetchAll = () => {
    setIsLoading(true);
    lawyersApi
      .getAllAdmin()
      .then(setАдвокатs)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleУдалить = async (lawyer: Lawyer) => {
    if (!window.confirm(`Удалить ${lawyer.full_name}? Это действие нельзя отменить.`)) return;
    try {
      await lawyersApi.delete(lawyer.id);
      addToast({ type: 'success', message: `${lawyer.full_name} успешно удален` });
      fetchAll();
    } catch {
      addToast({ type: 'error', message: 'Не удалось удалить адвоката' });
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-gray-900 dark:text-dark-50">Адвокаты</h1>
          <p className="text-gray-500 dark:text-dark-400 text-sm mt-0.5">Управление профилями адвокатов</p>
        </div>
        <Link to="/admin/lawyers/new" id="add-lawyer-btn">
          <Button>
            <Plus className="w-4 h-4" /> Добавить адвоката
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
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase">Имя</th>
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase hidden md:table-cell">Должность</th>
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase hidden lg:table-cell">Телефон</th>
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase">Статус</th>
                <th className="px-6 py-4 text-right text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 dark:divide-dark-800/60">
              {lawyers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-gray-500 dark:text-dark-500 text-sm">
                    Адвокаты не найдены.
                  </td>
                </tr>
              ) : (
                lawyers.map((lawyer) => (
                  <tr key={lawyer.id} className="hover:bg-gray-50 dark:hover:bg-dark-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-700 flex-shrink-0">
                          {lawyer.photo_url ? (
                            <img src={getFileUrl(lawyer.photo_url)} alt={lawyer.full_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-500 dark:text-dark-400 text-sm font-semibold">{lawyer.full_name.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-dark-50 text-sm font-medium">{lawyer.full_name}</p>
                          <p className="text-gray-500 dark:text-dark-500 text-xs">{lawyer.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-dark-400 text-sm hidden md:table-cell">
                      {lawyer.title ?? '—'}
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-dark-400 text-sm font-mono hidden lg:table-cell">
                      {lawyer.phone}
                    </td>
                    <td className="px-6 py-4">
                      {lawyer.is_active ? (
                        <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                          <CheckCircle className="w-3.5 h-3.5" /> Активен
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-gray-500 dark:text-dark-500 text-xs">
                          <XCircle className="w-3.5 h-3.5" /> Неактивен
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/lawyers/${lawyer.slug}/edit`}
                          className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-gold-400 hover:bg-gold-500/10 transition-colors"
                          title="Редактировать"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleУдалить(lawyer)}
                          className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Удалить"
                          id={`delete-lawyer-${lawyer.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
