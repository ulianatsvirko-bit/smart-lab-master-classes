import React from 'react';
import { WorkshopStatus } from '../types';
import { useWorkshops } from '../hooks/useWorkshops';
import WorkshopCard from '../components/WorkshopCard';

const ArchivePage: React.FC = () => {
  const { workshops: pastWorkshops, loading } = useWorkshops(WorkshopStatus.PAST);

  return (
    <div className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white animate-fadeIn min-h-screen">
      <div className="mb-20">
        <h1 className="text-6xl sm:text-8xl font-black uppercase italic tracking-tighter mb-6 text-zinc-950">Архив <span className="text-zinc-300">мастер-классов</span></h1>
        <p className="text-zinc-500 max-w-xl text-lg font-medium leading-relaxed">
          Здесь хранятся моменты, когда мы создавали историю. Пересмотри любимые моменты и вдохновись на новые свершения.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-zinc-200 border-t-[#fdcc00] rounded-full animate-spin" />
        </div>
      ) : pastWorkshops.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {pastWorkshops.map(workshop => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      ) : (
        <div className="py-32 text-center bg-zinc-50 rounded-[3rem] border-2 border-zinc-100 border-dashed">
          <p className="text-zinc-400 font-black uppercase tracking-[0.3em] italic text-xs">Архив пока пуст. Все только начинается!</p>
        </div>
      )}
    </div>
  );
};

export default ArchivePage;
