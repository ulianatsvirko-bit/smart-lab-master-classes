
import React from 'react';
import { Instagram, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-zinc-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <img 
                src="https://i.ibb.co/qFsWwZfT/IMG-5343-removebg-preview-1.png" 
                alt="Smart Dance Logo" 
                className="h-10 w-auto opacity-80"
              />
              <h4 className="text-xl font-black italic uppercase tracking-tighter text-zinc-900">Smart Lab</h4>
            </div>
            <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-xs">
              Танцуй больше и ярче вместе с нами. SMART LAB — это серия уникальных мастер-классов для тех, кто хочет расти.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-black uppercase mb-8 text-zinc-400 tracking-[0.3em]">Контакты</h4>
            <ul className="space-y-4 text-sm text-zinc-600 font-bold">
              <li className="flex items-center gap-4 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-[#fdcc00] transition-colors">
                  <MapPin size={16} />
                </div>
                ул. Саперов, 5, 3 этаж (ФОК «Атлант»)
              </li>
              <li className="flex items-center gap-4 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-[#fdcc00] transition-colors">
                  <Instagram size={16} />
                </div>
                @smartdance.by
              </li>
              <li className="flex items-center gap-4 group cursor-default">
                <div className="w-8 h-8 rounded-lg bg-zinc-50 flex items-center justify-center text-zinc-400 group-hover:text-[#fdcc00] transition-colors">
                  <Phone size={16} />
                </div>
                +375 (29) 123-45-67
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-black uppercase mb-8 text-zinc-400 tracking-[0.3em]">Мы в соцсетях</h4>
            <a 
              href="https://instagram.com/smartdance.by" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#fdcc00] rounded-2xl font-black text-zinc-900 transition-all hover:scale-105 shadow-lg shadow-[#fdcc00]/20 text-xs uppercase tracking-widest"
            >
              <Instagram size={18} />
              Написать в Директ
            </a>
          </div>
        </div>
        
        <div className="mt-20 pt-10 border-t border-zinc-100 text-center text-[9px] text-zinc-400 font-black tracking-[0.4em] uppercase">
          © 2024 Smart Dance Lab. Designed for growth.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
