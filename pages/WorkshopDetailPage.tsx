import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWorkshop } from '../hooks/useWorkshops';
import {
  ArrowLeft, Star, Zap, Calendar,
  ChevronDown, ArrowRight, MapPin, Send,
  Users, Heart, Mail, Camera, Check
} from 'lucide-react';

const WorkshopDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { workshop, loading } = useWorkshop(slug);
  const [activeTab, setActiveTab] = useState(0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-10 h-10 border-4 border-zinc-200 border-t-[#fdcc00] rounded-full animate-spin" />
      </div>
    );
  }

  if (!workshop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
        <h2 className="text-xl font-black uppercase tracking-tighter text-zinc-900 mb-4">Мастер-класс не найден</h2>
        <Link to="/" className="text-zinc-400 font-bold uppercase tracking-widest hover:text-zinc-900 transition-colors flex items-center gap-2">
          <ArrowLeft size={16} /> На главную
        </Link>
      </div>
    );
  }

  const isValentine = slug === 'smart-love-lab';

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isValentine) {
    return (
      <div className="animate-fadeIn bg-white min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-6 left-6 z-50">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-zinc-100 text-zinc-900 hover:scale-110 transition-transform shadow-lg">
            <ArrowLeft size={20} />
          </Link>
        </nav>

        {/* 1. HERO SECTION */}
        <header className="relative h-[95vh] flex flex-col justify-end items-center overflow-hidden bg-zinc-900 pb-12">
          <div className="absolute inset-0">
              <img 
                src={workshop.imageUrl} 
                alt={workshop.title} 
                className="w-full h-full object-cover opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-zinc-950/80" />
          </div>
          
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4">
            <div className="flex flex-col items-center gap-5 reveal-on-scroll">
              
              {/* Registration Button */}
              <button 
                onClick={() => scrollToSection('register')}
                className="w-full sm:w-auto px-10 py-5 bg-rose-500 sm:bg-[#fdcc00] rounded-2xl font-black uppercase tracking-widest text-white sm:text-zinc-900 shadow-2xl shadow-rose-500/30 sm:shadow-[#fdcc00]/20 hover:scale-105 transition-transform flex items-center justify-center gap-3 text-sm"
              >
                Записаться сейчас
                <Send size={18} />
              </button>
              
              {/* Address */}
              <div className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-black uppercase tracking-widest text-white flex items-center justify-center gap-3 text-sm hover:bg-white/20 transition-all cursor-default">
                <MapPin size={18} className="text-rose-400" />
                Саперов, 5
              </div>

              {/* Arrow */}
              <button 
                onClick={() => scrollToSection('concept')}
                className="mt-6 animate-bounce text-white/50 hover:text-white transition-colors cursor-pointer flex flex-col items-center gap-2"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-60">Узнать больше</span>
                <ChevronDown size={40} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </header>

        {/* 2. ABOUT SECTION */}
        <section id="concept" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center mb-16 reveal-on-scroll">
            <div className="max-w-3xl mx-auto">
              <p className="text-2xl sm:text-4xl font-black text-zinc-900 mb-8 leading-tight uppercase italic">
                Один мастер-класс – <span className="text-rose-500 border-b-4 border-rose-400">два педагога</span>
              </p>
              <p className="text-zinc-500 text-lg sm:text-xl font-medium leading-relaxed italic">
                Это не просто мастер-класс, это коллаборация опыта, техники и вдохновения. Мы подготовили программу, которая заставит вас посмотреть на привычные стили под другим углом.
              </p>
            </div>
          </div>

          {/* Highlights Row */}
          <div className="flex flex-wrap justify-center items-center gap-y-8 gap-x-6 sm:gap-x-12 mb-20 py-12 border-y border-zinc-100 reveal-on-scroll">
             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center shrink-0">
                  <Zap fill="currentColor" size={20} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl sm:text-2xl font-black italic uppercase text-zinc-900">4 мастеркласса</span>
                </div>
             </div>

             <div className="hidden sm:block w-px h-10 bg-zinc-100" />

             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center shrink-0">
                  <Star fill="currentColor" size={20} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl sm:text-2xl font-black italic uppercase text-zinc-900">1.5 часа</span>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">длительность</span>
                </div>
             </div>

             <div className="hidden sm:block w-px h-10 bg-zinc-100" />

             <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                  <Users size={20} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-xl sm:text-2xl font-black italic uppercase text-zinc-900">2 педагога</span>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest mt-1">на классе</span>
                </div>
             </div>
          </div>

          {/* Directions Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
             <div className="p-8 rounded-[2rem] bg-white border-2 border-yellow-50 hover:border-yellow-400 transition-colors">
                <div className="text-xs font-black uppercase tracking-[0.3em] text-yellow-500 mb-2">Направление</div>
                <div className="text-2xl font-black italic uppercase mb-4 text-zinc-900 border-b-2 border-yellow-400 inline-block">Стрит</div>
                <p className="text-zinc-500 text-sm font-bold leading-relaxed italic">Хип-хоп, Джаз-фанк и работа с энергией</p>
             </div>
             <div className="p-8 rounded-[2rem] bg-white border-2 border-rose-50 hover:border-rose-400 transition-colors">
                <div className="text-xs font-black uppercase tracking-[0.3em] text-rose-500 mb-2">Направление</div>
                <div className="text-2xl font-black italic uppercase mb-4 text-zinc-900 border-b-2 border-rose-400 inline-block">Контемпорари</div>
                <p className="text-zinc-500 text-sm font-bold leading-relaxed italic">Импровизация и <span className="text-rose-500">современная хореография</span></p>
             </div>
             <div className="p-8 rounded-[2rem] bg-white border-2 border-blue-50 hover:border-blue-400 transition-colors">
                <div className="text-xs font-black uppercase tracking-[0.3em] text-blue-500 mb-2">Направление</div>
                <div className="text-2xl font-black italic uppercase mb-4 text-zinc-900 border-b-2 border-blue-400 inline-block">Классический танец</div>
                <p className="text-zinc-500 text-sm font-bold leading-relaxed italic">Техника, основы и <span className="text-blue-500">классический танец</span></p>
             </div>
          </div>
        </section>

        {/* 3. SCHEDULE SECTION */}
        <section className="py-24 bg-zinc-50">
          <div className="max-w-4xl mx-auto text-center px-4">
             <div className="px-4">
               <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter mb-12 text-zinc-900 leading-none">Расписание</h2>
               
               <div className="flex gap-4 justify-center mb-10">
                  <button 
                    onClick={() => setActiveTab(0)}
                    className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 0 ? 'bg-zinc-900 text-white shadow-xl' : 'bg-white text-zinc-400'}`}
                  >
                     До 11 лет
                  </button>
                  <button 
                    onClick={() => setActiveTab(1)}
                    className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === 1 ? 'bg-zinc-900 text-white shadow-xl' : 'bg-white text-zinc-400'}`}
                  >
                     12+ лет
                  </button>
               </div>
             </div>

             {/* Schedule Image */}
             <div className="w-full sm:max-w-2xl sm:mx-auto sm:rounded-[3rem] sm:overflow-hidden sm:shadow-2xl sm:border sm:border-zinc-100 sm:bg-white sm:p-4 mb-4">
                {activeTab === 0 ? (
                  <div className="w-full">
                    <img 
                      src="https://i.ibb.co/DfTNDf3N/photo-2026-02-06-10-20-58.jpg" 
                      alt="Schedule Kids" 
                      className="w-full h-auto block"
                    />
                  </div>
                ) : (
                  <div className="w-full">
                    <img 
                      src="https://i.ibb.co/k2b0bHCV/photo-2026-02-04-10-55-50.jpg" 
                      alt="Schedule Adults" 
                      className="w-full h-auto block"
                    />
                  </div>
                )}
             </div>

             {/* Screenshot hint */}
             <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400 text-[10px] font-black uppercase tracking-widest animate-pulse">
               <Camera size={14} />
               <span>Сохраняй скриншот, чтобы не потерять</span>
             </div>

             {/* Intermediate CTA */}
             <div className="mt-12">
               <h3 className="text-xl font-black italic uppercase tracking-tighter text-zinc-900 mb-6">Ждем тебя!</h3>
               <button
                  onClick={() => scrollToSection('register')}
                  className="px-10 py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#fdcc00] hover:text-zinc-900 transition-all shadow-lg hover:shadow-[#fdcc00]/20 text-xs"
               >
                  Занять место в зале
               </button>
             </div>
          </div>
        </section>

        {/* VALENTINE MAIL SECTION */}
        <section className="py-20 bg-rose-50 border-y border-rose-100 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                <div className="inline-block p-4 rounded-full bg-white shadow-xl text-rose-500 mb-6 rotate-3">
                    <Mail size={40} />
                </div>
                <h2 className="text-4xl sm:text-5xl font-black uppercase italic tracking-tighter text-zinc-900 mb-6">
                    Танцевальная <span className="text-rose-500">Почта</span>
                </h2>
                <p className="text-zinc-600 text-lg font-medium mb-8 max-w-xl mx-auto">
                    Готовь валентинки! Весь день будет работать специальная почта — отличный шанс признаться в любви педагогам или найти новых друзей.
                </p>
                <button 
                    onClick={() => scrollToSection('register')}
                    className="inline-flex items-center gap-3 px-10 py-5 bg-rose-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-rose-600 hover:scale-105 transition-all shadow-xl shadow-rose-500/20"
                >
                    Записаться
                    <Heart size={20} fill="currentColor" />
                </button>
            </div>
            
            {/* Background Decor */}
            <div className="absolute top-10 left-10 text-rose-200 animate-bounce delay-100"><Heart size={60} fill="currentColor" /></div>
            <div className="absolute bottom-10 right-10 text-rose-200 animate-bounce delay-700"><Heart size={80} fill="currentColor" /></div>
            <div className="absolute top-1/2 left-10 text-rose-200/50 rotate-45"><Heart size={30} fill="currentColor" /></div>
            <div className="absolute top-1/3 right-20 text-rose-200/50 -rotate-12"><Heart size={40} fill="currentColor" /></div>
        </section>

        {/* 4. PRICING & REGISTRATION */}
        <section id="register" className="py-24 bg-white text-center">
            <div className="max-w-3xl mx-auto px-4">
                <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter mb-16 text-zinc-900 leading-none">Стоимость</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
                    {workshop.pricing.map((price, idx) => (
                        <div key={idx} className="p-8 rounded-[2rem] border border-zinc-100 bg-zinc-50 hover:bg-white hover:shadow-xl transition-all duration-300 group flex flex-col items-center relative overflow-hidden">
                            <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4 h-10 flex items-center justify-center text-center">{price.label}</div>
                            <div className="text-5xl font-black text-zinc-900 mb-2 group-hover:scale-110 transition-transform inline-block">{price.amount}</div>
                            <div className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-6">В день: {price.onDayAmount}</div>
                            
                            <a 
                                href={workshop.registrationLink} 
                                target="_blank" 
                                rel="noreferrer"
                                className="group/btn relative w-full py-4 mb-2 bg-rose-500 text-white rounded-xl font-black uppercase tracking-[0.2em] transition-all duration-300 hover:bg-rose-600 hover:shadow-xl hover:shadow-rose-500/40 hover:-translate-y-1 text-[10px] flex items-center justify-center gap-2 overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Записаться 
                                    <Heart size={12} fill="currentColor" className="animate-pulse" />
                                </span>
                                {/* Shine effect */}
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                            </a>

                            <div className="mt-auto pt-6 w-full border-t border-zinc-100 flex flex-col items-center gap-2">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-[10px] font-black uppercase tracking-widest text-rose-500">
                                   <Camera size={14} strokeWidth={2.5} />
                                   Фото и видеоотчет
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-zinc-900 rounded-[3rem] p-8 sm:p-16 text-white relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <h3 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter mb-6 relative z-10">Готов танцевать?</h3>
                    <p className="text-zinc-400 text-lg font-medium mb-8 max-w-lg mx-auto relative z-10">
                        Количество мест ограничено. Занимайте свое место прямо сейчас через форму регистрации.
                    </p>

                    {/* What to bring section */}
                    <div className="mb-12 relative z-10 inline-block text-left bg-white/5 rounded-2xl p-6 border border-white/10 backdrop-blur-sm mx-auto max-w-xl w-full">
                        <div className="flex flex-col gap-3 text-center">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">С собой</span>
                            <p className="text-zinc-300 font-medium text-sm sm:text-lg leading-relaxed">
                               Сменная обувь, вода, удобная форма и боевой настрой. <br/>
                               <span className="text-rose-400 font-bold">Валентинка по желанию.</span>
                            </p>
                        </div>
                    </div>
                    
                    <div className="relative z-10">
                        <a 
                            href={workshop.registrationLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="inline-flex items-center gap-3 px-12 py-6 bg-white text-zinc-900 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#fdcc00] hover:scale-105 transition-all shadow-xl"
                        >
                            Записаться
                            <ArrowRight size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </section>
      </div>
    );
  }

  // Generic Layout for other workshops
  const primaryColor = workshop.categories[0]?.color || 'bg-[#fdcc00]';
  const accentColor = workshop.categories[1]?.color || primaryColor;

  return (
    <div className="min-h-screen bg-white animate-fadeIn">
      {/* Navigation */}
      <nav className="fixed top-6 left-6 z-50">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/90 backdrop-blur-md border border-zinc-100 text-zinc-900 hover:scale-110 transition-transform shadow-lg">
            <ArrowLeft size={20} />
          </Link>
      </nav>

      {/* Hero with image */}
      {workshop.imageUrl ? (
        <header className="relative h-[95vh] flex flex-col justify-end items-center overflow-hidden bg-zinc-900 pb-12">
          <div className="absolute inset-0">
            <img src={workshop.imageUrl} alt={workshop.title} className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-zinc-950/90" />
          </div>
          <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center">
            {workshop.categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {workshop.categories.map((cat, idx) => (
                  <span key={idx} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${cat.color} text-zinc-950 shadow-lg`}>
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-6 leading-[0.85]">
              {workshop.title}
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {workshop.registrationLink && (
                <a
                  href={workshop.registrationLink}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-full sm:w-auto px-10 py-5 ${primaryColor} rounded-2xl font-black uppercase tracking-widest text-zinc-900 shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-3 text-sm`}
                >
                  Записаться сейчас
                  <Send size={18} />
                </a>
              )}
              <div className="w-full sm:w-auto px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl font-black uppercase tracking-widest text-white flex items-center justify-center gap-3 text-sm">
                <MapPin size={18} className={primaryColor.replace('bg-', 'text-')} />
                {workshop.location}
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="relative pt-32 pb-20 px-4 overflow-hidden bg-mesh">
          <div className="max-w-5xl mx-auto text-center relative z-10">
            {workshop.categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {workshop.categories.map((cat, idx) => (
                  <span key={idx} className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${cat.color} text-zinc-950`}>
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase italic tracking-tighter text-zinc-900 mb-6 leading-[0.85]">
              {workshop.title}
            </h1>
            <p className="text-zinc-400 text-lg font-medium mb-8">{workshop.date} &bull; {workshop.location}</p>
            {workshop.registrationLink && (
              <a
                href={workshop.registrationLink}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-3 px-10 py-5 ${primaryColor} rounded-2xl font-black uppercase tracking-widest text-zinc-900 shadow-2xl hover:scale-105 transition-transform text-sm`}
              >
                Записаться
                <Send size={18} />
              </a>
            )}
          </div>
        </header>
      )}

      {/* Highlights bar */}
      <section className="py-12 border-b border-zinc-100">
        <div className="max-w-5xl mx-auto px-4 flex flex-wrap justify-center items-center gap-y-8 gap-x-6 sm:gap-x-12">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${primaryColor} rounded-2xl flex items-center justify-center shadow-lg`}>
              <Calendar size={22} className="text-zinc-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black italic uppercase text-zinc-900">{workshop.date}</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Дата</span>
            </div>
          </div>

          <div className="hidden sm:block w-px h-10 bg-zinc-200" />

          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 ${accentColor} rounded-2xl flex items-center justify-center shadow-lg`}>
              <MapPin size={22} className="text-zinc-900" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-black italic uppercase text-zinc-900">{workshop.location}</span>
              <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Адрес</span>
            </div>
          </div>

          {workshop.features.length > 0 && (
            <>
              <div className="hidden sm:block w-px h-10 bg-zinc-200" />
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-zinc-900 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap size={22} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black italic uppercase text-zinc-900">{workshop.features.length} фичей</span>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Включено</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* About */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 mb-4">
              <span className="text-pink-500">О мероприятии</span>
            </h2>
          </div>
          <div className="text-lg sm:text-xl text-zinc-500 font-medium leading-relaxed space-y-6">
            {workshop.fullDescription.split('\n').filter(p => p.trim()).map((paragraph, i) => (
              <p key={i} className={i === 0 ? 'text-zinc-700 text-xl sm:text-2xl font-bold italic' : ''}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      {workshop.features.length > 0 && (
        <section className="py-20 bg-zinc-50 border-y border-zinc-100">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 mb-12 text-center">
              Что <span className={primaryColor.replace('bg-', 'text-')}>включено</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {workshop.features.map((feature, i) => (
                <div key={i} className="group p-8 rounded-[2rem] bg-white border border-zinc-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className={`w-10 h-10 ${i % 2 === 0 ? primaryColor : accentColor} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform`}>
                    <Check size={20} className="text-zinc-900" />
                  </div>
                  <p className="text-sm font-bold text-zinc-700">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Schedule */}
      {workshop.schedules.length > 0 && (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 mb-12 text-center">Расписание</h2>

            {workshop.schedules.length > 1 && (
              <div className="flex gap-4 justify-center mb-10">
                {workshop.schedules.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${activeTab === i ? 'bg-zinc-900 text-white shadow-xl' : 'bg-white text-zinc-400 border border-zinc-100'}`}
                  >
                    {s.ageLabel}
                  </button>
                ))}
              </div>
            )}

            {workshop.schedules[activeTab] && (
              <div>
                {workshop.schedules.length === 1 && (
                  <div className="text-center mb-8 text-sm font-bold text-zinc-400 uppercase tracking-widest">{workshop.schedules[0].ageLabel}</div>
                )}

                {workshop.schedules[activeTab].imageUrl ? (
                  <div className="w-full sm:max-w-2xl sm:mx-auto sm:rounded-[3rem] sm:overflow-hidden sm:shadow-2xl sm:border sm:border-zinc-100 sm:bg-white sm:p-4">
                    <img
                      src={workshop.schedules[activeTab].imageUrl}
                      alt={`Расписание — ${workshop.schedules[activeTab].ageLabel}`}
                      className="w-full h-auto block"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    {workshop.schedules[activeTab].items.map((item, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-zinc-100 hover:shadow-lg hover:border-zinc-200 transition-all group">
                        <div className={`w-14 h-14 ${i % 2 === 0 ? primaryColor : accentColor} rounded-2xl flex items-center justify-center shadow-md shrink-0 group-hover:scale-110 transition-transform`}>
                          <span className="text-xs font-black text-zinc-900">{String(i + 1).padStart(2, '0')}</span>
                        </div>
                        <div>
                          <span className="text-sm font-black text-zinc-900 block">{item.time}</span>
                          <span className="text-sm font-medium text-zinc-500">{item.activity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Pricing */}
      {workshop.pricing.length > 0 && (
        <section id="register" className="py-20 bg-zinc-50 border-y border-zinc-100">
          <div className="max-w-3xl mx-auto text-center px-4">
            <h2 className="text-4xl sm:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 mb-16">Стоимость</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {workshop.pricing.map((price, idx) => (
                <div key={idx} className="p-10 rounded-[2rem] border border-zinc-100 bg-white hover:shadow-2xl transition-all duration-300 flex flex-col items-center group">
                  <div className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6 text-center h-10 flex items-center">{price.label}</div>
                  <div className="text-3xl sm:text-4xl font-black text-zinc-900 mb-2 group-hover:scale-105 transition-transform">{price.amount}</div>
                  {price.onDayAmount && (
                    <div className={`text-xs font-bold ${primaryColor.replace('bg-', 'text-')} uppercase tracking-widest mb-8`}>В день: {price.onDayAmount}</div>
                  )}
                  {workshop.registrationLink && (
                    <a
                      href={workshop.registrationLink}
                      target="_blank"
                      rel="noreferrer"
                      className={`w-full py-5 ${primaryColor} text-zinc-900 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-2 hover:shadow-lg hover:-translate-y-1 transition-all`}
                    >
                      Записаться
                      <ArrowRight size={14} />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Registration CTA */}
      {workshop.registrationLink && (
        <section className="py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-zinc-900 rounded-[3rem] p-8 sm:p-16 text-white text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h3 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tighter mb-6 relative z-10">Готов танцевать?</h3>
              <p className="text-zinc-400 text-lg font-medium mb-8 max-w-lg mx-auto relative z-10">
                Количество мест ограничено. Занимайте свое место прямо сейчас.
              </p>
              <a
                href={workshop.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-3 px-12 py-6 bg-white text-zinc-900 rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-[#fdcc00] hover:scale-105 transition-all shadow-xl"
              >
                Записаться
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default WorkshopDetailPage;