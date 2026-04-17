import React from 'react';
import { Workshop, WorkshopStatus } from '../types';
import { Calendar, MapPin, ArrowRight, Heart, Timer } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WorkshopCardProps {
  workshop: Workshop;
}

const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop }) => {
  const isPast = workshop.status === WorkshopStatus.PAST;
  const isValentine = workshop.slug === 'smart-love-lab';
  const isSoon = workshop.slug === 'street-lab-march' || workshop.slug === 'contemp-lab-march';
  
  const primaryCategory = workshop.categories[0];

  const getBgClass = () => {
    if (isValentine) {
      return 'bg-gradient-to-br from-amber-50/80 via-pink-50/80 to-sky-50/80';
    }
    const name = primaryCategory?.name.toLowerCase() || '';
    const title = workshop.title.toLowerCase();
    if (name.includes('стрит') || name.includes('хип-хоп') || title.includes('стрит')) return 'bg-amber-50/50';
    if (name.includes('современная') || name.includes('контемп') || title.includes('контемп')) return 'bg-pink-50/50';
    if (name.includes('классический')) return 'bg-blue-50/50';
    if (name.includes('jazz-funk')) return 'bg-red-50/50';
    return 'bg-zinc-50/50';
  };

  const getTitleHoverClass = () => {
    if (isSoon) return 'text-zinc-950'; 
    if (isValentine) {
      return 'group-hover:text-pink-500';
    }
    if (!primaryCategory) return 'group-hover:text-zinc-900';
    return `group-hover:${primaryCategory.color.replace('bg-', 'text-')}`;
  };

  const getButtonHoverClass = () => {
    if (isSoon) return 'bg-zinc-100 text-zinc-400 cursor-not-allowed border-zinc-200';
    if (isValentine) {
      return 'group-hover:bg-pink-500 group-hover:text-white group-hover:border-transparent';
    }
    const name = primaryCategory?.name.toLowerCase() || '';
    if (name.includes('стрит') || name.includes('хип-хоп')) return 'group-hover:bg-yellow-400';
    if (name.includes('современная') || name.includes('контемп')) return 'group-hover:bg-pink-400';
    if (name.includes('классический')) return 'group-hover:bg-blue-400';
    if (name.includes('jazz-funk')) return 'group-hover:bg-red-400';
    return 'group-hover:bg-[#fdcc00]';
  };

  const bgClass = getBgClass();
  const buttonHoverBg = getButtonHoverClass();
  const titleHoverClass = getTitleHoverClass();

  // Handle long titles like "КОНТЕМПОРАРИ ЛАБ"
  const titleSize = workshop.title.length > 15 
    ? 'text-2xl sm:text-3xl md:text-4xl' 
    : workshop.title.length > 10 
      ? 'text-3xl sm:text-4xl md:text-5xl' 
      : 'text-4xl sm:text-5xl';

  const cardContent = (
    <div className={`group relative rounded-[2.5rem] overflow-hidden border border-zinc-100 transition-all duration-500 ${!isSoon ? 'hover:shadow-2xl hover:-translate-y-2' : ''} flex flex-col h-full ${bgClass} ${isPast ? 'opacity-80 grayscale-[0.3]' : 'shadow-sm'}`}>
      
      {/* Visual Enhancements for LABA COLLABA */}
      {isValentine && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0">
          <Heart size={16} fill="#f472b6" className="absolute top-1/4 left-1/4 text-pink-300 animate-float-heart" style={{ animationDelay: '0s' }} />
          <Heart size={12} fill="#f472b6" className="absolute top-1/2 right-1/4 text-pink-300 animate-float-heart" style={{ animationDelay: '1.5s' }} />
          <Heart size={14} fill="#f472b6" className="absolute bottom-1/3 left-1/2 text-pink-300 animate-float-heart" style={{ animationDelay: '0.8s' }} />
          <Heart size={10} fill="#f472b6" className="absolute top-1/3 right-1/2 text-pink-300 animate-float-heart" style={{ animationDelay: '2.2s' }} />
          <div className="confetti bg-pink-400/60" style={{ left: '15%', top: '-10px', animationDelay: '0.2s', width: '8px', height: '8px' }} />
          <div className="confetti bg-yellow-400/60" style={{ left: '85%', top: '-10px', animationDelay: '0.8s', width: '6px', height: '6px' }} />
          <div className="confetti bg-blue-400/60" style={{ left: '45%', top: '-10px', animationDelay: '1.4s', width: '7px', height: '7px' }} />
          <div className="confetti bg-pink-300/60" style={{ left: '65%', top: '-10px', animationDelay: '2.1s', width: '5px', height: '5px' }} />
        </div>
      )}

      {/* Image Header */}
      {workshop.imageUrl && (
        <div className="relative h-60 sm:h-64 overflow-hidden z-10">
          <img 
            src={workshop.imageUrl} 
            alt={workshop.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
          <div className="absolute bottom-4 left-6 inline-flex items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/20 transform -rotate-1 group-hover:rotate-0 transition-transform">
            <Calendar size={12} className={`mr-2.5 ${isValentine ? "text-pink-500" : (primaryCategory?.color.replace('bg-', 'text-') || "text-[#fdcc00]")}`} />
            <span className="text-[11px] font-black text-zinc-950 uppercase tracking-[0.1em]">{workshop.date}</span>
          </div>
        </div>
      )}

      <div className={`absolute top-0 left-0 w-full h-2 z-20 ${isValentine ? 'bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400' : (primaryCategory?.color || 'bg-zinc-200')}`} />
      
      <div className="absolute -right-4 -bottom-8 select-none pointer-events-none opacity-[0.04] transition-transform duration-700 group-hover:scale-125 group-hover:-rotate-12">
        <span className="text-[12rem] font-black tracking-tighter uppercase italic leading-none">
          LAB
        </span>
      </div>

      <div className={`p-8 sm:p-10 flex flex-col flex-grow relative z-10 ${!workshop.imageUrl ? 'pt-16' : ''}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-2">
            {workshop.categories.map((cat, idx) => (
              <span key={idx} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${cat.color} text-zinc-950 shadow-sm`}>
                {cat.name}
              </span>
            ))}
          </div>
          {isPast && <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-zinc-200/50 text-zinc-400">Архив</span>}
          {isSoon && !isPast && (
            <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-zinc-950 text-white shadow-sm flex items-center gap-1.5">
              <Timer size={10} /> Подробности скоро!
            </span>
          )}
        </div>

        <div className="flex-grow flex flex-col relative">
          <div className="mb-4 flex flex-col justify-start">
             <h3 className={`${titleSize} font-black mb-4 tracking-tighter text-zinc-950 transition-all duration-300 uppercase italic leading-[0.9] flex items-center gap-3 ${titleHoverClass}`}>
               {workshop.title}
             </h3>
             {isSoon && <div className="text-[10px] font-black uppercase tracking-[0.2em] text-[#fdcc00] mb-2">{workshop.date}</div>}
          </div>
          <div className="min-h-[80px]">
            <p className="text-zinc-500 text-sm sm:text-base mb-6 line-clamp-3 leading-relaxed font-medium italic">
              {workshop.shortDescription}
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-200/50 space-y-6 mt-auto">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <MapPin size={14} className={isValentine ? "text-pink-400" : "text-[#fdcc00]"} />
              <span className="truncate max-w-[150px]">{workshop.location}</span>
            </div>
          </div>
          
          {isSoon ? (
            <div className={`flex items-center justify-center w-full py-5 px-6 rounded-2xl font-black transition-all text-xs uppercase tracking-[0.2em] border-2 ${buttonHoverBg}`}>
              Скоро
            </div>
          ) : (
            <Link to={`/workshop/${workshop.slug}`} className={`flex items-center justify-between w-full py-5 px-6 rounded-2xl font-black transition-all text-xs uppercase tracking-[0.2em] shadow-lg bg-zinc-950 text-white ${buttonHoverBg}`}>
              {isPast ? 'Как это было' : 'Подробнее'}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return cardContent;
};

export default WorkshopCard;