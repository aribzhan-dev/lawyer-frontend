import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, CheckCircle, XCircle, FileText } from 'lucide-react';
import { documentsApi } from '@/api/documentsApi';
import type { Document } from '@/types/document';
import { useUIStore } from '@/store/uiStore';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';

export default function DocumentList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToast } = useUIStore();

  const fetchAll = () => {
    setIsLoading(true);
    documentsApi
      .getAllAdmin()
      .then(setDocuments)
      .finally(() => setIsLoading(false));
  };

  useEffect(() => { fetchAll(); }, []);

  const handleDelete = async (doc: Document) => {
    if (!window.confirm(`Удалить "${doc.title}"? Это действие нельзя отменить.`)) return;
    try {
      await documentsApi.delete(doc.id);
      addToast({ type: 'success', message: 'Документ удалён' });
      fetchAll();
    } catch {
      addToast({ type: 'error', message: 'Не удалось удалить документ' });
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl text-gray-900 dark:text-dark-50">Документы</h1>
          <p className="text-gray-500 dark:text-dark-400 text-sm mt-0.5">
            Управление документами и регламентами арбитража
          </p>
        </div>
        {/* Yangi hujjat qo'shish — <Link> (= <a> tegi) orqali */}
        <Link to="/admin/documents/new" id="add-document-btn">
          <Button>
            <Plus className="w-4 h-4" /> Добавить документ
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
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase">
                  Документ
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase hidden md:table-cell">
                  Категория
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase hidden lg:table-cell">
                  Порядок
                </th>
                <th className="px-6 py-4 text-left text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase">
                  Статус
                </th>
                <th className="px-6 py-4 text-right text-xs text-gray-500 dark:text-dark-400 font-semibold tracking-wider uppercase">
                  Действия
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/60 dark:divide-dark-800/60">
              {documents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-gray-500 dark:text-dark-500 text-sm">
                    Документы не найдены. Добавьте первый документ.
                  </td>
                </tr>
              ) : (
                documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-white dark:bg-dark-800/30 transition-colors">
                    {/* Sarlavha + fayl ikonkasi */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-gold-500" />
                        </div>
                        <div>
                          <p className="text-gray-900 dark:text-dark-50 text-sm font-medium line-clamp-1">
                            {doc.title}
                          </p>
                          {/* Fayl havolasi — <a> tegi */}
                          <a
                            href={doc.file_url.startsWith('http') ? doc.file_url : `http://localhost:8000${doc.file_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 dark:text-dark-500 text-xs hover:text-gold-500 transition-colors truncate block max-w-xs"
                          >
                            {doc.file_url}
                          </a>
                        </div>
                      </div>
                    </td>

                    {/* Kategoriya */}
                    <td className="px-6 py-4 text-gray-500 dark:text-dark-400 text-sm hidden md:table-cell">
                      {doc.category ?? '—'}
                    </td>

                    {/* Tartib raqami */}
                    <td className="px-6 py-4 text-gray-500 dark:text-dark-400 text-sm hidden lg:table-cell">
                      {doc.order}
                    </td>

                    {/* Holat */}
                    <td className="px-6 py-4">
                      {doc.is_active ? (
                        <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                          <CheckCircle className="w-3.5 h-3.5" /> Активен
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5 text-gray-500 dark:text-dark-500 text-xs">
                          <XCircle className="w-3.5 h-3.5" /> Неактивен
                        </span>
                      )}
                    </td>

                    {/* Amallar */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Tahrirlash — <Link> (= <a>) */}
                        <Link
                          to={`/admin/documents/${doc.id}/edit`}
                          className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-gold-400 hover:bg-gold-500/10 transition-colors"
                          title="Редактировать"
                          id={`edit-document-${doc.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* O'chirish */}
                        <button
                          onClick={() => handleDelete(doc)}
                          className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Удалить"
                          id={`delete-document-${doc.id}`}
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
