import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Workshop, WorkshopStatus, WorkshopCategory, AgeGroupSchedule } from '../../types';
import { getWorkshopById, createWorkshop, updateWorkshop } from '../../lib/workshops';
import { ArrowLeft, Save, Plus, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FormData {
  slug: string;
  title: string;
  date: string;
  status: WorkshopStatus;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  location: string;
  registrationLink: string;
  categories: WorkshopCategory[];
  pricing: Workshop['pricing'];
  features: string[];
  schedules: AgeGroupSchedule[];
}

const emptyForm: FormData = {
  slug: '',
  title: '',
  date: '',
  status: WorkshopStatus.UPCOMING,
  shortDescription: '',
  fullDescription: '',
  imageUrl: '',
  location: 'ул. Саперов, 5',
  registrationLink: '',
  categories: [],
  pricing: [],
  features: [],
  schedules: [],
};

const AdminWorkshopForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== 'new';
  const navigate = useNavigate();

  const [form, setForm] = useState<FormData>(emptyForm);
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (isEditing && id) {
      getWorkshopById(id).then(workshop => {
        if (workshop) {
          const { id: _id, ...data } = workshop;
          setForm(data);
        }
        setLoading(false);
      }).catch(() => {
        showToast('Ошибка загрузки', 'error');
        setLoading(false);
      });
    }
  }, [id, isEditing]);

  const updateField = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.slug || !form.date) {
      showToast('Заполните обязательные поля: название, slug, дата', 'error');
      return;
    }

    setSaving(true);
    try {
      if (isEditing && id) {
        await updateWorkshop(id, form);
        showToast('Мастер-класс обновлён');
      } else {
        await createWorkshop(form);
        showToast('Мастер-класс создан');
      }
      setTimeout(() => navigate('/admin/dashboard'), 1000);
    } catch {
      showToast('Ошибка сохранения', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Category helpers
  const addCategory = () => {
    updateField('categories', [...form.categories, { name: '', color: 'bg-yellow-400', glow: '' }]);
  };
  const removeCategory = (index: number) => {
    updateField('categories', form.categories.filter((_, i) => i !== index));
  };
  const updateCategory = (index: number, field: keyof WorkshopCategory, value: string) => {
    const updated = form.categories.map((cat, i) =>
      i === index ? { ...cat, [field]: value } : cat
    );
    updateField('categories', updated);
  };

  // Pricing helpers
  const addPricing = () => {
    updateField('pricing', [...form.pricing, { label: '', amount: '', onDayAmount: '' }]);
  };
  const removePricing = (index: number) => {
    updateField('pricing', form.pricing.filter((_, i) => i !== index));
  };
  const updatePricing = (index: number, field: string, value: string) => {
    const updated = form.pricing.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    updateField('pricing', updated);
  };

  // Features helpers
  const addFeature = () => {
    updateField('features', [...form.features, '']);
  };
  const removeFeature = (index: number) => {
    updateField('features', form.features.filter((_, i) => i !== index));
  };
  const updateFeature = (index: number, value: string) => {
    const updated = form.features.map((f, i) => i === index ? value : f);
    updateField('features', updated);
  };

  // Schedule helpers
  const addSchedule = () => {
    updateField('schedules', [...form.schedules, { ageLabel: '', items: [] }]);
  };
  const removeSchedule = (index: number) => {
    updateField('schedules', form.schedules.filter((_, i) => i !== index));
  };
  const updateScheduleLabel = (index: number, value: string) => {
    const updated = form.schedules.map((s, i) =>
      i === index ? { ...s, ageLabel: value } : s
    );
    updateField('schedules', updated);
  };
  const updateScheduleImageUrl = (index: number, value: string) => {
    const updated = form.schedules.map((s, i) =>
      i === index ? { ...s, imageUrl: value } : s
    );
    updateField('schedules', updated);
  };
  const addScheduleItem = (scheduleIndex: number) => {
    const updated = form.schedules.map((s, i) =>
      i === scheduleIndex ? { ...s, items: [...s.items, { time: '', activity: '' }] } : s
    );
    updateField('schedules', updated);
  };
  const removeScheduleItem = (scheduleIndex: number, itemIndex: number) => {
    const updated = form.schedules.map((s, i) =>
      i === scheduleIndex ? { ...s, items: s.items.filter((_, j) => j !== itemIndex) } : s
    );
    updateField('schedules', updated);
  };
  const updateScheduleItem = (scheduleIndex: number, itemIndex: number, field: string, value: string) => {
    const updated = form.schedules.map((s, i) =>
      i === scheduleIndex
        ? { ...s, items: s.items.map((item, j) => j === itemIndex ? { ...item, [field]: value } : item) }
        : s
    );
    updateField('schedules', updated);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-700 border-t-[#fdcc00] rounded-full animate-spin" />
      </div>
    );
  }

  const inputClass = "w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-[#fdcc00] transition-colors text-sm";
  const labelClass = "block text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-2";

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl font-bold text-sm animate-fadeIn ${
          toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        }`}>
          {toast.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {toast.message}
        </div>
      )}

      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold"
          >
            <ArrowLeft size={18} />
            Назад
          </button>
          <h1 className="text-lg font-black uppercase tracking-tight">
            {isEditing ? 'Редактирование' : 'Новый мастер-класс'}
          </h1>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-8 space-y-8">
        {/* Basic Info */}
        <section className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6 space-y-4">
          <h2 className="text-sm font-black uppercase tracking-wider text-[#fdcc00] mb-4">Основная информация</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Название *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => updateField('title', e.target.value)}
                className={inputClass}
                placeholder="LABA COLLABA"
              />
            </div>
            <div>
              <label className={labelClass}>Slug (URL) *</label>
              <input
                type="text"
                value={form.slug}
                onChange={e => updateField('slug', e.target.value)}
                className={inputClass}
                placeholder="smart-love-lab"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Дата *</label>
              <input
                type="text"
                value={form.date}
                onChange={e => updateField('date', e.target.value)}
                className={inputClass}
                placeholder="14 февраля 2024"
              />
            </div>
            <div>
              <label className={labelClass}>Статус</label>
              <select
                value={form.status}
                onChange={e => updateField('status', e.target.value as WorkshopStatus)}
                className={inputClass}
              >
                <option value={WorkshopStatus.UPCOMING}>Предстоящий</option>
                <option value={WorkshopStatus.PAST}>Архив</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Краткое описание</label>
            <input
              type="text"
              value={form.shortDescription}
              onChange={e => updateField('shortDescription', e.target.value)}
              className={inputClass}
              placeholder="Краткое описание для карточки"
            />
          </div>

          <div>
            <label className={labelClass}>Полное описание</label>
            <textarea
              value={form.fullDescription}
              onChange={e => updateField('fullDescription', e.target.value)}
              className={`${inputClass} min-h-[120px] resize-y`}
              placeholder="Подробное описание мастер-класса"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>URL изображения</label>
              <input
                type="text"
                value={form.imageUrl}
                onChange={e => updateField('imageUrl', e.target.value)}
                className={inputClass}
                placeholder="https://..."
              />
            </div>
            <div>
              <label className={labelClass}>Локация</label>
              <input
                type="text"
                value={form.location}
                onChange={e => updateField('location', e.target.value)}
                className={inputClass}
                placeholder="ул. Саперов, 5"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Ссылка на регистрацию</label>
            <input
              type="text"
              value={form.registrationLink}
              onChange={e => updateField('registrationLink', e.target.value)}
              className={inputClass}
              placeholder="https://forms.gle/..."
            />
          </div>
        </section>

        {/* Categories */}
        <section className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#fdcc00]">Категории</h2>
            <button type="button" onClick={addCategory} className="p-2 rounded-lg bg-zinc-800 text-[#fdcc00] hover:bg-zinc-700 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {form.categories.map((cat, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  value={cat.name}
                  onChange={e => updateCategory(i, 'name', e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="Название категории"
                />
                <input
                  type="text"
                  value={cat.color}
                  onChange={e => updateCategory(i, 'color', e.target.value)}
                  className={`${inputClass} w-40`}
                  placeholder="bg-yellow-400"
                />
                <button type="button" onClick={() => removeCategory(i)} className="p-2 text-zinc-500 hover:text-red-400">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#fdcc00]">Цены</h2>
            <button type="button" onClick={addPricing} className="p-2 rounded-lg bg-zinc-800 text-[#fdcc00] hover:bg-zinc-700 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {form.pricing.map((price, i) => (
              <div key={i} className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                <input
                  type="text"
                  value={price.label}
                  onChange={e => updatePricing(i, 'label', e.target.value)}
                  className={`${inputClass} flex-1 min-w-[200px]`}
                  placeholder="Описание тарифа"
                />
                <input
                  type="text"
                  value={price.amount}
                  onChange={e => updatePricing(i, 'amount', e.target.value)}
                  className={`${inputClass} w-28`}
                  placeholder="80 руб"
                />
                <input
                  type="text"
                  value={price.onDayAmount}
                  onChange={e => updatePricing(i, 'onDayAmount', e.target.value)}
                  className={`${inputClass} w-28`}
                  placeholder="90 руб"
                />
                <button type="button" onClick={() => removePricing(i)} className="p-2 text-zinc-500 hover:text-red-400">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#fdcc00]">Что включено</h2>
            <button type="button" onClick={addFeature} className="p-2 rounded-lg bg-zinc-800 text-[#fdcc00] hover:bg-zinc-700 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-3">
            {form.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <input
                  type="text"
                  value={feature}
                  onChange={e => updateFeature(i, e.target.value)}
                  className={`${inputClass} flex-1`}
                  placeholder="1.5 часа класс"
                />
                <button type="button" onClick={() => removeFeature(i)} className="p-2 text-zinc-500 hover:text-red-400">
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Schedules */}
        <section className="bg-zinc-900 rounded-3xl border border-zinc-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#fdcc00]">Расписание</h2>
            <button type="button" onClick={addSchedule} className="p-2 rounded-lg bg-zinc-800 text-[#fdcc00] hover:bg-zinc-700 transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="space-y-6">
            {form.schedules.map((schedule, si) => (
              <div key={si} className="bg-zinc-800/50 rounded-2xl p-4 space-y-3">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={schedule.ageLabel}
                    onChange={e => updateScheduleLabel(si, e.target.value)}
                    className={`${inputClass} flex-1`}
                    placeholder="Возрастная группа (напр. Младшие до 11)"
                  />
                  <button type="button" onClick={() => removeSchedule(si)} className="p-2 text-zinc-500 hover:text-red-400">
                    <X size={16} />
                  </button>
                </div>
                <div className="pl-4">
                  <label className="block text-[9px] font-bold uppercase tracking-widest text-zinc-500 mb-1">Фото расписания (URL)</label>
                  <input
                    type="text"
                    value={schedule.imageUrl || ''}
                    onChange={e => updateScheduleImageUrl(si, e.target.value)}
                    className={inputClass}
                    placeholder="https://i.ibb.co/... (прямая ссылка на картинку)"
                  />
                </div>

                {schedule.items.map((item, ii) => (
                  <div key={ii} className="flex items-center gap-3 pl-4">
                    <input
                      type="text"
                      value={item.time}
                      onChange={e => updateScheduleItem(si, ii, 'time', e.target.value)}
                      className={`${inputClass} w-36`}
                      placeholder="14:00 - 15:30"
                    />
                    <input
                      type="text"
                      value={item.activity}
                      onChange={e => updateScheduleItem(si, ii, 'activity', e.target.value)}
                      className={`${inputClass} flex-1`}
                      placeholder="Хип-хоп (Педагог)"
                    />
                    <button type="button" onClick={() => removeScheduleItem(si, ii)} className="p-2 text-zinc-500 hover:text-red-400">
                      <X size={16} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => addScheduleItem(si)}
                  className="ml-4 px-4 py-2 bg-zinc-700 text-zinc-300 rounded-lg text-xs font-bold hover:bg-zinc-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={12} />
                  Добавить занятие
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Submit */}
        <div className="flex gap-4 justify-end pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin/dashboard')}
            className="px-8 py-4 bg-zinc-800 text-zinc-400 rounded-2xl font-black uppercase tracking-wider text-xs hover:bg-zinc-700 transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-4 bg-[#fdcc00] text-zinc-900 rounded-2xl font-black uppercase tracking-wider text-xs hover:bg-yellow-300 transition-colors flex items-center gap-3 disabled:opacity-50"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
            ) : (
              <Save size={16} />
            )}
            {isEditing ? 'Сохранить' : 'Создать'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminWorkshopForm;
