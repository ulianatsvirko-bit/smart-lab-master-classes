import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Workshop, WorkshopStatus } from '../../types';
import { getWorkshops, deleteWorkshop, archiveWorkshop, restoreWorkshop, seedWorkshops } from '../../lib/workshops';
import { logout } from '../../lib/auth';
import {
  Plus, Edit3, Trash2, Archive, RotateCcw,
  LogOut, Filter, Database, AlertCircle, CheckCircle
} from 'lucide-react';

type StatusFilter = 'all' | WorkshopStatus;

const AdminDashboard: React.FC = () => {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const navigate = useNavigate();

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadWorkshops = async () => {
    try {
      setLoading(true);
      const data = await getWorkshops();
      setWorkshops(data);
    } catch {
      showToast('Ошибка загрузки данных. Проверьте настройки Firebase.', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWorkshops();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Удалить "${title}"? Это действие нельзя отменить.`)) return;
    try {
      await deleteWorkshop(id);
      showToast(`"${title}" удалён`);
      loadWorkshops();
    } catch {
      showToast('Ошибка при удалении', 'error');
    }
  };

  const handleArchive = async (id: string, title: string) => {
    try {
      await archiveWorkshop(id);
      showToast(`"${title}" перенесён в архив`);
      loadWorkshops();
    } catch {
      showToast('Ошибка при архивации', 'error');
    }
  };

  const handleRestore = async (id: string, title: string) => {
    try {
      await restoreWorkshop(id);
      showToast(`"${title}" восстановлен`);
      loadWorkshops();
    } catch {
      showToast('Ошибка при восстановлении', 'error');
    }
  };

  const handleSeed = async () => {
    if (!window.confirm('Загрузить начальные данные из constants.tsx в Firestore? Это перезапишет существующие записи с теми же ID.')) return;
    try {
      await seedWorkshops();
      showToast('Данные успешно загружены в Firestore');
      loadWorkshops();
    } catch {
      showToast('Ошибка при загрузке данных', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const filtered = filter === 'all'
    ? workshops
    : workshops.filter(w => w.status === filter);

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
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 bg-[#fdcc00] rounded-lg flex items-center justify-center">
              <span className="text-zinc-900 font-black text-xs">SL</span>
            </div>
            <h1 className="text-lg font-black uppercase tracking-tight">Админ-панель</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleSeed}
              className="px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-zinc-700 transition-colors flex items-center gap-2"
            >
              <Database size={14} />
              Загрузить данные
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-zinc-800 text-zinc-400 rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-red-500/20 hover:text-red-400 transition-colors flex items-center gap-2"
            >
              <LogOut size={14} />
              Выйти
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-zinc-500" />
            <div className="flex gap-1">
              {(['all', WorkshopStatus.UPCOMING, WorkshopStatus.PAST] as StatusFilter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                    filter === f
                      ? 'bg-[#fdcc00] text-zinc-900'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
                >
                  {f === 'all' ? 'Все' : f === WorkshopStatus.UPCOMING ? 'Предстоящие' : 'Архив'}
                </button>
              ))}
            </div>
          </div>

          <Link
            to="/admin/workshop/new"
            className="px-6 py-3 bg-[#fdcc00] text-zinc-900 rounded-xl font-black uppercase tracking-wider text-xs hover:bg-yellow-300 transition-colors flex items-center gap-2"
          >
            <Plus size={16} />
            Добавить мастер-класс
          </Link>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-zinc-700 border-t-[#fdcc00] rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 bg-zinc-900 rounded-3xl border border-zinc-800">
            <p className="text-zinc-500 font-bold text-sm">Мастер-классов пока нет</p>
            <p className="text-zinc-600 text-xs mt-2">Нажмите "Загрузить данные" чтобы перенести данные из constants.tsx</p>
          </div>
        ) : (
          <div className="bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Название</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 hidden sm:table-cell">Дата</th>
                  <th className="text-left px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 hidden md:table-cell">Статус</th>
                  <th className="text-right px-6 py-4 text-[10px] font-black uppercase tracking-widest text-zinc-500">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(workshop => (
                  <tr key={workshop.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-white">{workshop.title}</div>
                      <div className="text-zinc-500 text-xs mt-1 sm:hidden">{workshop.date}</div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm hidden sm:table-cell">{workshop.date}</td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        workshop.status === WorkshopStatus.UPCOMING
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-zinc-700/50 text-zinc-400'
                      }`}>
                        {workshop.status === WorkshopStatus.UPCOMING ? 'Предстоящий' : 'Архив'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/workshop/${workshop.id}`}
                          className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-[#fdcc00] hover:bg-zinc-700 transition-colors"
                          title="Редактировать"
                        >
                          <Edit3 size={16} />
                        </Link>
                        {workshop.status === WorkshopStatus.UPCOMING ? (
                          <button
                            onClick={() => handleArchive(workshop.id, workshop.title)}
                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-orange-400 hover:bg-zinc-700 transition-colors"
                            title="В архив"
                          >
                            <Archive size={16} />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleRestore(workshop.id, workshop.title)}
                            className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-700 transition-colors"
                            title="Восстановить"
                          >
                            <RotateCcw size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(workshop.id, workshop.title)}
                          className="p-2 rounded-lg bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Удалить"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
