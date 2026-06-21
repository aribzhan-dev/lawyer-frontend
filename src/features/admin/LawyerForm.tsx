import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ImagePlus } from 'lucide-react';
import type { Lawyer, LawyerCreate } from '@/types/lawyer';
import type { Service } from '@/types/service';
import { lawyersApi } from '@/api/lawyersApi';
import { uploadsApi } from '@/api/uploadsApi';
import { useServicesFlat } from '@/hooks/useServices';
import { useUIStore } from '@/store/uiStore';
import Button from '@/components/common/Button';
import Spinner from '@/components/common/Spinner';
import { getFileUrl } from '@/utils/getFileUrl';

const EMPTY_FORM: LawyerCreate = {
  full_name: '',
  slug: '',
  title: '',
  bio: '',
  experience_years: undefined,
  education: '',
  photo_url: '',
  phone: '',
  whatsapp_message: '',
  is_active: true,
  order: 0,
  service_ids: [],
};

function toSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');
}

function formatPhone(val: string): string {
  if (!val) return '';
  let digits = val.replace(/\D/g, '');
  if (!digits) return '';

  if (digits.length === 1 && (digits === '7' || digits === '8')) {
    return '+7 (';
  }

  if (digits.startsWith('7') || digits.startsWith('8')) {
    if (digits.length >= 11) {
      digits = digits.slice(1);
    } else if (val.startsWith('+7') || val.startsWith('8')) {
      digits = digits.slice(1);
    }
  }

  digits = digits.slice(0, 10);

  let formatted = '+7';
  if (digits.length > 0) formatted += ` (${digits.slice(0, 3)}`;
  if (digits.length >= 4) formatted += `) ${digits.slice(3, 6)}`;
  if (digits.length >= 7) formatted += `-${digits.slice(6, 8)}`;
  if (digits.length >= 9) formatted += `-${digits.slice(8, 10)}`;

  return formatted;
}

export default function LawyerForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { addToast } = useUIStore();
  const { services } = useServicesFlat();

  const [form, setForm] = useState<LawyerCreate>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadingImg, setIsUploadingImg] = useState(false);
  const [selectedParent, setSelectedParent] = useState<number | null>(null);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImg(true);
    try {
      const imgPath = await uploadsApi.uploadImage(file);
      setForm((prev) => ({ ...prev, photo_url: imgPath }));
      addToast({ type: 'success', message: 'Фото успешно загружено' });
    } catch {
      addToast({ type: 'error', message: 'Ошибка при загрузке фото' });
    } finally {
      setIsUploadingImg(false);
    }
  };

  // Populate form when editing
  useEffect(() => {
    if (!id) return;
    lawyersApi.getBySlug(id).then((lawyer: Lawyer) => {
      setForm({
        full_name: lawyer.full_name,
        slug: lawyer.slug,
        title: lawyer.title ?? '',
        bio: lawyer.bio ?? '',
        experience_years: lawyer.experience_years ?? undefined,
        education: lawyer.education ?? '',
        photo_url: lawyer.photo_url ?? '',
        phone: formatPhone(lawyer.phone),
        whatsapp_message: lawyer.whatsapp_message ?? '',
        is_active: lawyer.is_active,
        order: lawyer.order,
        service_ids: lawyer.services.map((s) => s.id),
      });
    });
  }, [id]);

  // Cascading dropdown logic
  const parentServices = services.filter((s) => s.parent_id === null);
  const childServices: Service[] = selectedParent !== null
    ? services.filter((s) => s.parent_id === selectedParent)
    : [];

  const toggleService = (svcId: number) => {
    setForm((prev) => ({
      ...prev,
      service_ids: prev.service_ids?.includes(svcId)
        ? prev.service_ids.filter((id) => id !== svcId)
        : [...(prev.service_ids ?? []), svcId],
    }));
  };

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      full_name: name,
      slug: isEdit ? prev.slug : toSlug(name),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isEdit && id) {
        const existingLawyer = await lawyersApi.getBySlug(id);
        await lawyersApi.update(existingLawyer.id, form);
        addToast({ type: 'success', message: 'Адвокат успешно обновлен' });
      } else {
        await lawyersApi.create(form);
        addToast({ type: 'success', message: 'Адвокат успешно создан' });
      }
      navigate('/admin/lawyers');
    } catch {
      addToast({ type: 'error', message: 'Ошибка сохранения. Проверьте поля.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/lawyers')}
          className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-gray-900 dark:hover:text-dark-50 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-3xl text-gray-900 dark:text-dark-50">
            {isEdit ? 'Редактировать адвоката' : 'Добавить нового адвоката'}
          </h1>
          <p className="text-gray-500 dark:text-dark-400 text-sm mt-0.5">
            {isEdit ? 'Обновить профиль адвоката' : 'Создать новый профиль адвоката'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-serif text-xl text-gray-900 dark:text-dark-50 border-b border-gray-200 dark:border-dark-700 pb-3">
            Основная информация
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="lawyer-name" className="label">Полное имя *</label>
              <input
                id="lawyer-name"
                type="text"
                value={form.full_name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                placeholder="напр. Александра Ривз"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="lawyer-slug" className="label">Слаг (URL) *</label>
              <input
                id="lawyer-slug"
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                placeholder="напр. alexandra-reeves"
                className="input-field font-mono text-xs"
              />
            </div>
            <div>
              <label htmlFor="lawyer-title" className="label">Должность</label>
              <input
                id="lawyer-title"
                type="text"
                value={form.title ?? ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="напр. Старший партнер"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="lawyer-experience" className="label">Опыт работы (лет)</label>
              <input
                id="lawyer-experience"
                type="number"
                min={0}
                max={60}
                value={form.experience_years ?? ''}
                onChange={(e) => setForm({ ...form, experience_years: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="напр. 15"
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-serif text-xl text-gray-900 dark:text-dark-50 border-b border-gray-200 dark:border-dark-700 pb-3">
            Контакты и медиа
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="lawyer-phone" className="label">
                Телефон WhatsApp * <span className="text-gray-500 dark:text-dark-500 font-normal">(без +)</span>
              </label>
              <input
                id="lawyer-phone"
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })}
                required
                placeholder="79001234567"
                className="input-field font-mono"
              />
            </div>
            <div>
              <label className="label">Фотография</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-dark-800 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200 dark:border-dark-700">
                  {form.photo_url ? (
                    <img
                      src={getFileUrl(form.photo_url)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlus className="w-6 h-6 text-gray-400 dark:text-dark-500" />
                  )}
                </div>
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    disabled={isUploadingImg}
                    className="block w-full text-sm text-gray-500 dark:text-dark-400
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-gold-500/10 file:text-gold-600 dark:file:text-gold-400
                      hover:file:bg-gold-500/20 cursor-pointer transition-colors"
                  />
                  {isUploadingImg && <p className="text-xs text-gold-500 mt-2 flex items-center gap-2"><Spinner size="sm" /> Загрузка...</p>}
                </div>
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="lawyer-wa-msg" className="label">Сообщение WhatsApp по умолчанию</label>
              <textarea
                id="lawyer-wa-msg"
                rows={2}
                value={form.whatsapp_message ?? ''}
                onChange={(e) => setForm({ ...form, whatsapp_message: e.target.value })}
                placeholder="Здравствуйте, я хотел бы записаться на консультацию."
                className="input-field resize-none"
              />
            </div>
          </div>
        </div>

        {/* Bio & Образование */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-serif text-xl text-gray-900 dark:text-dark-50 border-b border-gray-200 dark:border-dark-700 pb-3">
            Профиль
          </h2>
          <div>
            <label htmlFor="lawyer-bio" className="label">Биография</label>
            <textarea
              id="lawyer-bio"
              rows={5}
              value={form.bio ?? ''}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              placeholder="Напишите подробную биографию..."
              className="input-field resize-y"
            />
          </div>
          <div>
            <label htmlFor="lawyer-education" className="label">Образование</label>
            <input
              id="lawyer-education"
              type="text"
              value={form.education ?? ''}
              onChange={(e) => setForm({ ...form, education: e.target.value })}
              placeholder="напр. МГУ"
              className="input-field"
            />
          </div>
        </div>

        {/* Service Assignment — Cascading Dropdown */}
        <div className="glass-card p-6 space-y-5">
          <h2 className="font-serif text-xl text-gray-900 dark:text-dark-50 border-b border-gray-200 dark:border-dark-700 pb-3">
            Специализация
          </h2>
          <p className="text-gray-500 dark:text-dark-400 text-sm">
            Сначала выберите категорию, затем выберите услуги.
          </p>

          {/* Step 1: Parent category */}
          <div>
            <label htmlFor="parent-service-select" className="label">1. Основная категория</label>
            <div className="relative">
              <select
                id="parent-service-select"
                value={selectedParent ?? ''}
                onChange={(e) => setSelectedParent(e.target.value ? Number(e.target.value) : null)}
                className="input-field appearance-none pr-10"
              >
                <option value="">— Выберите категорию —</option>
                {parentServices.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-dark-400 pointer-events-none" />
            </div>
          </div>

          {/* Step 2: Sub-services */}
          {selectedParent !== null && (
            <div>
              <label className="label">
                2. Подуслуги{' '}
                <span className="text-gray-500 dark:text-dark-500 font-normal">(выберите все подходящие)</span>
              </label>
              {childServices.length === 0 ? (
                <div className="flex flex-wrap gap-2 mt-2">
                  {/* If no children, allow selecting the parent itself */}
                  {parentServices
                    .filter((s) => s.id === selectedParent)
                    .map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                          form.service_ids?.includes(s.id)
                            ? 'bg-gold-500/20 border-gold-500/50 text-gold-400'
                            : 'bg-white dark:bg-dark-800 border-gray-200 dark:border-dark-700 text-gray-500 dark:text-dark-400 hover:border-dark-500'
                        }`}
                      >
                        {s.name}
                      </button>
                    ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 mt-2">
                  {childServices.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                        form.service_ids?.includes(s.id)
                          ? 'bg-gold-500/20 border-gold-500/50 text-gold-400'
                          : 'bg-white dark:bg-dark-800 border-gray-200 dark:border-dark-700 text-gray-500 dark:text-dark-400 hover:border-dark-500'
                      }`}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Summary of selected services */}
          {(form.service_ids?.length ?? 0) > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-dark-700/50">
              <p className="text-gray-500 dark:text-dark-500 text-xs mb-2">
                {form.service_ids?.length} service{(form.service_ids?.length ?? 0) > 1 ? 's' : ''} assigned:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {form.service_ids?.map((sid) => {
                  const svc = services.find((s) => s.id === sid);
                  return svc ? (
                    <span
                      key={sid}
                      className="badge text-[10px] cursor-pointer hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 transition-colors"
                      onClick={() => toggleService(sid)}
                      title="Нажмите, чтобы удалить"
                    >
                      {svc.name} ×
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="glass-card p-6 flex items-center justify-between">
          <div>
            <label className="font-medium text-gray-800 dark:text-dark-100 text-sm">Активный профиль</label>
            <p className="text-gray-500 dark:text-dark-500 text-xs mt-0.5">
              Неактивные адвокаты скрыты с сайта
            </p>
          </div>
          <button
            type="button"
            onClick={() => setForm({ ...form, is_active: !form.is_active })}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              form.is_active ? 'bg-gold-500' : 'bg-gray-100 dark:bg-dark-700'
            }`}
            id="lawyer-active-toggle"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                form.is_active ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" isLoading={isLoading} id="lawyer-form-submit">
            {isEdit ? 'Обновить адвоката' : 'Создать адвоката'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate('/admin/lawyers')}
          >
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
