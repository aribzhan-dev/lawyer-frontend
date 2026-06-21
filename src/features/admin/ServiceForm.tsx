import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import type { ServiceCreate } from '@/types/service';
import { servicesApi } from '@/api/servicesApi';
import { useServicesFlat } from '@/hooks/useServices';
import { useUIStore } from '@/store/uiStore';
import Button from '@/components/common/Button';

const EMPTY: ServiceCreate = {
  name: '',
  slug: '',
  description: '',
  icon: '',
  order: 0,
  parent_id: null,
};

function toSlug(name: string) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default function ServiceForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const { addToast } = useUIStore();
  const { services } = useServicesFlat();

  const [form, setForm] = useState<ServiceCreate>(EMPTY);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    servicesApi.getById(Number(id)).then((svc) => {
      setForm({
        name: svc.name,
        slug: svc.slug,
        description: svc.description ?? '',
        icon: svc.icon ?? '',
        order: svc.order,
        parent_id: svc.parent_id,
      });
    });
  }, [id]);

  const handleNameChange = (name: string) => {
    setForm((prev) => ({
      ...prev,
      name,
      slug: isEdit ? prev.slug : toSlug(name),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...form,
        parent_id: form.parent_id || null,
      };
      if (isEdit && id) {
        await servicesApi.update(Number(id), payload);
        addToast({ type: 'success', message: 'Service updated' });
      } else {
        await servicesApi.create(payload);
        addToast({ type: 'success', message: 'Service created' });
      }
      navigate('/admin/services');
    } catch {
      addToast({ type: 'error', message: 'Failed to save service' });
    } finally {
      setIsLoading(false);
    }
  };

  // Only show root services as potential parents (avoid infinite depth UI confusion)
  const parentOptions = services.filter((s) => s.parent_id === null);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/admin/services')}
          className="p-2 rounded-lg text-gray-500 dark:text-dark-400 hover:text-gray-900 dark:hover:text-dark-50 hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-3xl text-gray-900 dark:text-dark-50">
            {isEdit ? 'Редактировать услугу' : 'Добавить новую услугу'}
          </h1>
          <p className="text-gray-500 dark:text-dark-400 text-sm mt-0.5">
            {isEdit ? 'Update practice area details' : 'Create a new practice area or sub-category'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass-card p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="service-name" className="label">Название услуги *</label>
              <input
                id="service-name"
                type="text"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                placeholder="e.g. Corporate Law"
                className="input-field"
              />
            </div>
            <div>
              <label htmlFor="service-slug" className="label">Slug *</label>
              <input
                id="service-slug"
                type="text"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                required
                placeholder="e.g. corporate-law"
                className="input-field font-mono text-xs"
              />
            </div>
          </div>

          <div>
            <label htmlFor="service-description" className="label">Описание</label>
            <textarea
              id="service-description"
              rows={3}
              value={form.description ?? ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Briefly describe this practice area…"
              className="input-field resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="service-parent" className="label">
                Parent Category{' '}
                <span className="text-gray-500 dark:text-dark-500 font-normal">(leave blank for root)</span>
              </label>
              <div className="relative">
                <select
                  id="service-parent"
                  value={form.parent_id ?? ''}
                  onChange={(e) => setForm({ ...form, parent_id: e.target.value ? Number(e.target.value) : null })}
                  className="input-field appearance-none pr-10"
                >
                  <option value="">— Root category —</option>
                  {parentOptions
                    .filter((s) => !isEdit || s.id !== Number(id))
                    .map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 dark:text-dark-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label htmlFor="service-order" className="label">Порядок отображения</label>
              <input
                id="service-order"
                type="number"
                min={0}
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Button type="submit" isLoading={isLoading} id="service-form-submit">
            {isEdit ? 'Обновить услугу' : 'Создать услугу'}
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/admin/services')}>
            Отмена
          </Button>
        </div>
      </form>
    </div>
  );
}
