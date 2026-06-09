import { useState, useEffect, useRef } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, X } from 'lucide-react';
import type { DocumentCreate } from '@/types/document';
import { documentsApi } from '@/api/documentsApi';
import { useUIStore } from '@/store/uiStore';
import apiClient from '@/api/apiClient';
import Button from '@/components/common/Button';

/** Yangi hujjat uchun boshlang'ich holat. */
const EMPTY: DocumentCreate = {
  title: '',
  file_url: '',
  category: '',
  order: 0,
  is_active: true,
};

export default function DocumentForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { addToast } = useUIStore();

  const [form, setForm] = useState<DocumentCreate>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState<string>('');

  // Fayl input uchun ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tahrirlash rejimida mavjud ma'lumotlarni yuklash
  useEffect(() => {
    if (!id) return;
    documentsApi.getAllAdmin().then((docs) => {
      const doc = docs.find((d) => d.id === Number(id));
      if (doc) {
        setForm({
          title:    doc.title,
          file_url: doc.file_url,
          category: doc.category ?? '',
          order:    doc.order,
          is_active: doc.is_active,
        });
        // Faylning qisqa nomini ko'rsatish
        setFileName(doc.file_url.split('/').pop() ?? doc.file_url);
      }
    });
  }, [id]);

  /** PDF/DOCX faylni serverga yuklash. */
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { data } = await apiClient.post<{ file_path: string }>(
        '/uploads/document',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setForm((prev) => ({ ...prev, file_url: data.file_path }));
      setFileName(file.name);
      addToast({ type: 'success', message: 'Файл успешно загружен' });
    } catch {
      addToast({ type: 'error', message: 'Не удалось загрузить файл' });
    } finally {
      setIsUploading(false);
    }
  };

  /** Formani topshirish — yangi yaratish yoki yangilash. */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.file_url) {
      addToast({ type: 'error', message: 'Пожалуйста, загрузите файл документа' });
      return;
    }

    setIsLoading(true);
    try {
      const payload: DocumentCreate = {
        ...form,
        category: form.category || null,
      };

      if (isEdit && id) {
        await documentsApi.update(Number(id), payload);
        addToast({ type: 'success', message: 'Документ обновлён' });
      } else {
        await documentsApi.create(payload);
        addToast({ type: 'success', message: 'Документ добавлен' });
      }
      navigate('/admin/documents');
    } catch {
      addToast({ type: 'error', message: 'Не удалось сохранить документ' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        {/* Orqaga — <Link> (= <a>) orqali */}
        <Link
          to="/admin/documents"
          className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-gray-900 dark:hover:text-dark-50 hover:bg-white dark:hover:bg-dark-800 transition-colors"
          id="doc-form-back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="font-serif text-3xl text-gray-900 dark:text-dark-50">
            {isEdit ? 'Редактировать документ' : 'Добавить документ'}
          </h1>
          <p className="text-gray-500 dark:text-dark-400 text-sm mt-0.5">
            {isEdit ? 'Обновите данные документа' : 'Загрузите новый документ или регламент'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 space-y-5">
          {/* Sarlavha */}
          <div>
            <label htmlFor="doc-title" className="label">
              Название документа *
            </label>
            <input
              id="doc-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              placeholder="Например: Регламент арбитража"
              className="input-field"
            />
          </div>

          {/* Fayl yuklash — rasmga o'xshash interfeys */}
          <div>
            <label className="label">Файл документа (PDF, DOCX) *</label>

            {/* Fayl yuklash zonasi */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`
                relative flex flex-col items-center justify-center gap-3 p-6 rounded-xl border-2 border-dashed cursor-pointer
                transition-all duration-200 group
                ${form.file_url
                  ? 'border-gold-500/40 bg-gold-500/5'
                  : 'border-gray-300 dark:border-dark-600 hover:border-gold-500/50 hover:bg-gold-500/5 dark:hover:bg-gold-500/5'
                }
              `}
            >
              {isUploading ? (
                /* Yuklanmoqda holati */
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
                  <p className="text-gold-500 text-sm font-medium">Загрузка файла...</p>
                </div>
              ) : form.file_url ? (
                /* Fayl yuklangan holat */
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 rounded-lg bg-gold-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-gold-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-900 dark:text-dark-50 text-sm font-medium truncate">{fileName}</p>
                    <p className="text-gray-400 dark:text-dark-500 text-xs truncate">{form.file_url}</p>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setForm({ ...form, file_url: '' });
                      setFileName('');
                    }}
                    className="p-1.5 rounded-md text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors flex-shrink-0"
                    title="Удалить файл"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                /* Fayl tanlanmagan holat */
                <>
                  <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-dark-800 flex items-center justify-center group-hover:bg-gold-500/10 transition-colors">
                    <Upload className="w-6 h-6 text-gray-400 dark:text-dark-500 group-hover:text-gold-500 transition-colors" />
                  </div>
                  <div className="text-center">
                    <p className="text-gray-700 dark:text-dark-200 text-sm font-medium">
                      Нажмите для выбора файла
                    </p>
                    <p className="text-gray-400 dark:text-dark-500 text-xs mt-0.5">
                      PDF, DOCX — максимум 20 МБ
                    </p>
                  </div>
                </>
              )}

              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                className="hidden"
                id="doc-file-input"
              />
            </div>
          </div>

          {/* Kategoriya va tartib */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="doc-category" className="label">
                Категория{' '}
                <span className="text-gray-400 dark:text-dark-500 font-normal">(необязательно)</span>
              </label>
              <input
                id="doc-category"
                type="text"
                value={form.category ?? ''}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Например: Регламент"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="doc-order" className="label">Порядок отображения</label>
              <input
                id="doc-order"
                type="number"
                min={0}
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>

          {/* Aktiv holati */}
          <div className="flex items-center gap-3">
            <input
              id="doc-active"
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => setForm({ ...form, is_active: e.target.checked })}
              className="w-4 h-4 accent-gold-500 rounded cursor-pointer"
            />
            <label htmlFor="doc-active" className="text-gray-600 dark:text-dark-300 text-sm cursor-pointer">
              Активен (отображать на сайте)
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <Button type="submit" isLoading={isLoading || isUploading} id="doc-form-submit">
            {isEdit ? 'Обновить документ' : 'Добавить документ'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/documents')}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
