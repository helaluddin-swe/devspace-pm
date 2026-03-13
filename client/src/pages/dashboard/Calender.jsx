import React from 'react';
import { ChevronLeft, ChevronRight, Monitor } from 'lucide-react';

const Calendar = () => {
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <div className="p-4 bg-[#020617]">
      <div className="max-w-4xl mx-auto border-4 border-indigo-900/40 bg-[#0f172a] p-6 shadow-[8px_8px_0px_0px_rgba(79,70,229,0.2)]">
        
        {/* Calendar Navigation */}
        <div className="flex items-center justify-between mb-8 border-b-2 border-white/5 pb-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 border-2 border-indigo-400">
              <Monitor size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black italic tracking-tighter">MARCH_2026</h2>
              <p className="text-[10px] text-indigo-400 font-bold tracking-[0.3em]">SYSTEM_UPTIME: 100%</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 border-2 border-white/20 hover:bg-white/10 active:translate-y-1"><ChevronLeft /></button>
            <button className="p-2 border-2 border-white/20 hover:bg-white/10 active:translate-y-1"><ChevronRight /></button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 border-l border-t border-white/10">
          {days.map(day => (
            <div key={day} className="p-3 border-r border-b border-white/10 bg-white/5 text-center text-xs font-black text-indigo-400">
              {day}
            </div>
          ))}
          
          {/* Empty cells for padding if month doesn't start on Sunday */}
          <div className="border-r border-b border-white/10 p-4 opacity-20">26</div>
          <div className="border-r border-b border-white/10 p-4 opacity-20">27</div>

          {dates.map(date => (
            <div key={date} className={`h-24 p-2 border-r border-b border-white/10 transition-all hover:bg-indigo-600/10 cursor-pointer group ${date === 13 ? 'bg-indigo-600/20' : ''}`}>
              <span className={`text-sm font-black ${date === 13 ? 'text-indigo-400' : 'text-slate-500'}`}>
                {date.toString().padStart(2, '0')}
              </span>
              
              {date === 13 && (
                <div className="mt-2 p-1 bg-indigo-600 text-[8px] font-bold leading-tight">
                  RELEASE_PATCH_V2
                </div>
              )}
              {date === 15 && (
                <div className="mt-2 p-1 border border-emerald-500 text-emerald-500 text-[8px] font-bold leading-tight">
                  TEAM_SYNC
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar