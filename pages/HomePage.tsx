import React from 'react';
import { WorkshopStatus } from '../types';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopCard from '../components/WorkshopCard';
import { Sparkles, ArrowRight, ChevronDown, Send, Calendar, Users, Zap, Layers, Compass, Camera, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { workshops: upcomingWorkshops, loading, error } = useWorkshops(WorkshopStatus.UPCOMING);

  const scrollToSchedule = () => {
    const element = document.getElementById('upcoming-workshops');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      title: 'Топовые педагоги',
      desc: 'Неожиданные коллаборации и опыт от лучших мастеров своего дела.',
      icon: <Users size={32} />,
      color: 'bg-yellow-400',
      shadow: 'shadow-yellow-200'
    },
    {
      title: 'Возрастные группы',
      desc: 'Разделение по возрастам для максимально комфортного и эффективного обучения.',
      icon: <Layers size={32} />,
      color: 'bg-pink-400',
      shadow: 'shadow-pink-200'
    },
    {
      title: 'Уникальные форматы',
      desc: 'От коллабораций педагогов до глубоких творческих лабораторий.',
      icon: <Compass size={32} />,
      color: 'bg-blue-400',
      shadow: 'shadow-blue-200'
    },
    {
      title: 'Мощный заряд',
      desc: 'Новые знакомства, море вдохновения и мотивация танцевать ярче.',
      icon: <Zap size={32} />,
      color: 'bg-zinc-950',
      shadow: 'shadow-zinc-200',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center py-24 overflow-hidden bg-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
            <div className="reveal-on-scroll inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-100 text-[#fdcc00] text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-sm">
              <span className="animate-pulse"><Sparkles size={14} /></span>
              Лаборатория танца
            </div>
            
            <h1 className="reveal-on-scroll delay-100 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase mb-6 leading-[0.85] text-zinc-950">
              Smart Lab <br className="hidden sm:block" />
              <span className="text-[#fdcc00] text-glow-yellow">Мастер-классы</span>
            </h1>
            <p className="reveal-on-scroll delay-200 max-w-2xl mx-auto text-zinc-500 text-lg sm:text-xl font-medium mb-12 leading-relaxed">
              Уникальная серия мастер-классов от педагогов Smart Dance и приглашенных гостей. Прокачай свой танец, найди новых друзей и получи море вдохновения.
            </p>

            {/* Action Buttons */}
            <div className="reveal-on-scroll delay-300 flex flex-col sm:flex-row items-center justify-center gap-6 relative">
              <Link 
                to="/workshop/smart-love-lab#register"
                className="group relative w-full sm:w-auto px-12 py-6 bg-[#fdcc00] overflow-hidden rounded-2xl font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-[#fdcc00]/30 text-zinc-900 text-xs sm:text-sm flex items-center justify-center gap-3"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative z-10 text-center">Записаться на ближайший мастер-класс</span>
                <Send size={18} className="relative z-10 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0" />
              </Link>
              
              <button 
                onClick={scrollToSchedule}
                className="group w-full sm:w-auto px-12 py-6 bg-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all hover:border-[#fdcc00] hover:text-[#fdcc00] text-zinc-900 text-xs sm:text-sm border-2 border-zinc-100 text-center shadow-md flex items-center justify-center gap-3"
              >
                <span>Расписание</span>
                <Calendar size={18} className="transition-transform group-hover:rotate-12 shrink-0" />
              </button>
            </div>
        </div>

        {/* Animated Down Arrow */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20 reveal-on-scroll delay-500">
          <button 
            onClick={scrollToSchedule}
            className="text-zinc-400 hover:text-[#fdcc00] transition-colors flex flex-col items-center gap-1 cursor-pointer group"
          >
            <span className="text-[9px] font-black uppercase tracking-[0.4em] mb-1 opacity-60 group-hover:opacity-100 transition-opacity">Листай ниже</span>
            <div className="animate-bounce">
              <ChevronDown size={36} strokeWidth={3} className="drop-shadow-sm" />
            </div>
          </button>
        </div>
      </section>

      {/* Features Section (Moved Up) */}
      <section className="py-24 bg-amber-50 border-t border-zinc-100 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-20 reveal-on-scroll">
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 mb-6">
              Что делает SMART LAB <span className="text-[#fdcc00]">особенным</span>?
            </h2>
            <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-medium leading-relaxed">
              Мы проводим мастер-классы с 2018 года — уже 8 лет создаем пространство, где каждый танцор может выйти за рамки привычного, найти свой стиль и получить уникальный опыт.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className={`group relative p-10 rounded-[3rem] border border-zinc-100/50 bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 text-left reveal-on-scroll delay-${(i + 1) * 100}`}
              >
                <div className={`w-16 h-16 ${feature.color} ${feature.textColor || 'text-zinc-950'} rounded-3xl flex items-center justify-center mb-8 shadow-xl ${feature.shadow} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black uppercase italic tracking-tight text-zinc-900 mb-4">{feature.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed text-sm">
                  {feature.desc}
                </p>
                {/* Decorative Element */}
                <div className="absolute -bottom-4 -right-4 text-6xl font-black text-zinc-200/50 select-none group-hover:text-[#fdcc00]/10 transition-colors italic">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Section (Moved Down) */}
      <section id="upcoming-workshops" className="py-16 sm:py-24 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 relative reveal-on-scroll">
          <div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter mb-4 text-zinc-900 leading-none">Ближайшие события</h2>
            <div className="h-1.5 w-24 bg-[#fdcc00] rounded-full" />
          </div>
          <Link to="/archive" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors font-black uppercase tracking-widest text-xs border-b border-transparent hover:border-zinc-900 pb-1">
            Архив мастер-классов <ArrowRight size={16} />
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
            Firestore error: {error} — Showing {upcomingWorkshops.length} workshops
          </div>
        )}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-zinc-200 border-t-[#fdcc00] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {upcomingWorkshops.map((workshop, i) => (
              <div key={workshop.id} className={`reveal-on-scroll delay-${(i + 1) * 100}`}>
                 <WorkshopCard workshop={workshop} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Gallery Section - Polaroid Style */}
      <section className="py-24 bg-zinc-50 relative overflow-hidden border-t border-zinc-100">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ 
               backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
               backgroundSize: '24px 24px' 
             }} 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
           {/* Header removed as requested */}

           <div className="flex flex-col lg:flex-row justify-center items-center gap-16 lg:gap-32 py-6 sm:py-10">
              
              {/* Instagram Section */}
              <div className="order-2 lg:order-1 reveal-on-scroll flex flex-col items-center lg:items-end text-center lg:text-right">
                  <a 
                    href="https://www.instagram.com/smartdancelab/" 
                    target="_blank" 
                    rel="noreferrer"
                    className="group relative inline-block mb-6"
                  >
                     <div className="absolute inset-0 bg-[#fdcc00] rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform opacity-20 blur-lg"></div>
                     <div className="relative w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-xl border border-zinc-100 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300">
                        <Instagram size={40} className="text-zinc-900 group-hover:text-[#fdcc00] transition-colors" strokeWidth={1.5} />
                     </div>
                  </a>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter text-zinc-900 mb-2">Наш Instagram</h3>
                  <a href="https://www.instagram.com/smartdancelab/" target="_blank" rel="noreferrer" className="text-zinc-400 font-bold hover:text-[#fdcc00] transition-colors mb-4">@smartdancelab</a>
                  <p className="text-zinc-500 text-sm font-medium leading-relaxed max-w-[200px] hidden lg:block">
                    Подписывайся, отмечай нас в сторис и лови атмосферу!
                  </p>
              </div>

              {/* Photo Container */}
              <div className="relative group reveal-on-scroll scale-on-scroll order-1 lg:order-2">
                 
                 {/* Decorative Elements around */}
                 <div className="absolute -top-12 -left-12 text-[#fdcc00] animate-pulse hidden sm:block">
                    <Sparkles size={48} fill="currentColor" />
                 </div>
                 <div className="absolute top-1/2 -right-12 sm:-right-24 transform translate-x-1/2 -translate-y-1/2 rotate-90 text-zinc-200 text-6xl sm:text-8xl font-black uppercase tracking-tighter opacity-50 select-none pointer-events-none whitespace-nowrap">
                    VIBE CHECK
                 </div>

                 {/* The Card - Polaroid Style */}
                 <div className="relative bg-white p-3 sm:p-5 pb-12 sm:pb-20 shadow-xl shadow-zinc-200/60 transform -rotate-2 group-hover:rotate-0 transition-all duration-500 ease-out max-w-[280px] sm:max-w-[400px] mx-auto hover:shadow-2xl hover:scale-105">
                    
                    {/* Tape Effect */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-8 sm:h-10 bg-rose-200/60 rotate-1 shadow-sm backdrop-blur-sm z-20" />
                    
                    {/* Image */}
                    <div className="aspect-[3/4] overflow-hidden bg-zinc-100 relative">
                       <img 
                         src="https://i.ibb.co/RT2jV3qj/20250316-130316.jpg" 
                         alt="Smart Lab Atmosphere" 
                         className="w-full h-full object-cover filter contrast-[1.05] brightness-105"
                       />
                       {/* Subtle inner shadow for depth */}
                       <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />
                    </div>

                    {/* Handwriting Caption */}
                    <div className="absolute bottom-4 sm:bottom-6 left-0 right-0 text-center px-4">
                       <span className="font-handwriting text-2xl sm:text-4xl text-zinc-800 rotate-1 inline-block opacity-90">
                          Наша Smart Lab семья
                       </span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;