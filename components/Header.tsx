
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="https://i.ibb.co/qFsWwZfT/IMG-5343-removebg-preview-1.png" 
              alt="Smart Dance Logo" 
              className="h-10 sm:h-12 w-auto object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tighter uppercase italic text-zinc-900">Smart Lab</span>
              <span className="text-[10px] font-bold tracking-widest uppercase text-zinc-400">by Smart Dance</span>
            </div>
          </Link>

          <nav className="flex items-center gap-6 sm:gap-8">
            <Link 
              to="/" 
              className={`text-xs sm:text-sm font-black uppercase tracking-widest hover:text-[#fdcc00] transition-colors ${location.pathname === '/' ? 'text-[#fdcc00]' : 'text-zinc-500'}`}
            >
              Главная
            </Link>
            <Link 
              to="/archive" 
              className={`text-xs sm:text-sm font-black uppercase tracking-widest hover:text-[#fdcc00] transition-colors ${location.pathname === '/archive' ? 'text-[#fdcc00]' : 'text-zinc-500'}`}
            >
              Архив
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
