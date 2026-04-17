import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../lib/auth';
import { Lock, ArrowRight } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin/dashboard');
    } else {
      setError('Неверный пароль');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#fdcc00] mb-6">
            <Lock size={28} className="text-zinc-900" />
          </div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-2">
            Админ-панель
          </h1>
          <p className="text-zinc-500 text-sm font-medium">Smart Lab Master Classes</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="w-full px-6 py-4 bg-zinc-900 border border-zinc-800 rounded-2xl text-white placeholder-zinc-600 focus:outline-none focus:border-[#fdcc00] transition-colors font-medium"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm font-bold text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full px-6 py-4 bg-[#fdcc00] text-zinc-900 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-yellow-300 transition-colors flex items-center justify-center gap-3"
          >
            Войти
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
