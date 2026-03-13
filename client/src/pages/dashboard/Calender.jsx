import React, { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  eachDayOfInterval 
} from 'date-fns';
import { ChevronLeft, ChevronRight, Monitor, Cpu, Plus } from 'lucide-react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mock events - in a real app, these would come from your DB
  const events = [
    { date: new Date(2026, 2, 13), title: 'RELEASE_PATCH_V2', type: 'system' },
    { date: new Date(2026, 2, 15), title: 'TEAM_SYNC', type: 'user' }
  ];

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, -1));

  // Generate Calendar Grid
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <div className="p-4 font-mono">
      <div className="max-w-5xl mx-auto border-4 border-indigo-900/40 bg-[#0f172a] p-6 shadow-[8px_8px_0px_0px_rgba(79,70,229,0.2)]">
        
        {/* --- HEADER NAVIGATION --- */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 border-b-2 border-white/5 pb-6 gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-600 border-2 border-indigo-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
              <Monitor size={24} className="text-white animate-pulse" />
            </div>
            <div>
              <h2 className="text-3xl font-black italic tracking-tighter text-white uppercase">
                {format(currentMonth, 'MMMM_yyyy')}
              </h2>
              <p className="text-[10px] text-indigo-400 font-bold tracking-[0.3em]">LOCAL_TIME_SYNC: ACTIVE</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="p-2 border-2 border-white/20 hover:bg-white/10 active:translate-y-1 transition-all text-slate-400 hover:text-white"
            >
              <ChevronLeft size={20}/>
            </button>
            <button 
              onClick={() => setCurrentMonth(new Date())}
              className="px-4 py-2 border-2 border-indigo-500/50 text-[10px] font-black text-indigo-400 hover:bg-indigo-500/10"
            >
              GOTO_TODAY
            </button>
            <button 
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="p-2 border-2 border-white/20 hover:bg-white/10 active:translate-y-1 transition-all text-slate-400 hover:text-white"
            >
              <ChevronRight size={20}/>
            </button>
          </div>
        </div>

        {/* --- CALENDAR GRID --- */}
        <div className="grid grid-cols-7 border-l-2 border-t-2 border-white/10 bg-black/20">
          {/* Day Names */}
          {daysOfWeek.map(day => (
            <div key={day} className="p-3 border-r-2 border-b-2 border-white/10 bg-white/5 text-center text-[10px] font-black text-indigo-400 tracking-widest">
              {day}
            </div>
          ))}
          
          {/* Date Cells */}
          {calendarDays.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, monthStart);
            const isToday = isSameDay(day, new Date());
            const dayEvents = events.filter(e => isSameDay(e.date, day));

            return (
              <div 
                key={idx}
                onClick={() => setSelectedDate(day)}
                className={`
                  h-32 p-2 border-r-2 border-b-2 border-white/10 transition-all cursor-pointer relative group
                  ${!isCurrentMonth ? 'bg-black/40 opacity-30' : 'bg-transparent'}
                  ${isToday ? 'bg-indigo-600/5' : ''}
                  hover:bg-indigo-600/20
                `}
              >
                <div className="flex justify-between items-start">
                  <span className={`
                    text-sm font-black 
                    ${isToday ? 'bg-indigo-600 text-white px-1' : 'text-slate-500'}
                    ${isCurrentMonth && !isToday ? 'group-hover:text-indigo-400' : ''}
                  `}>
                    {format(day, 'dd')}
                  </span>
                  {isCurrentMonth && (
                    <Plus size={12} className="text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                  )}
                </div>

                {/* Event Display */}
                <div className="mt-2 space-y-1">
                  {dayEvents.map((event, i) => (
                    <div 
                      key={i} 
                      className={`
                        text-[8px] font-black p-1 truncate border
                        ${event.type === 'system' 
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]' 
                          : 'border-emerald-500 text-emerald-500 bg-emerald-500/10'}
                      `}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>

                {/* Bottom Status bar for today */}
                {isToday && (
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-500 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>

        {/* --- SYSTEM FOOTER --- */}
        <div className="mt-6 flex items-center justify-between font-mono text-[10px] text-slate-600">
          <div className="flex gap-4 uppercase font-black">
            <span className="flex items-center gap-1"><Cpu size={12}/> CPU_LOAD: 12%</span>
            <span className="flex items-center gap-1 text-emerald-600"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping"/> DB_CONNECTED</span>
          </div>
          <p className="italic">SELECTED_SECTOR: {format(selectedDate, 'yyyy.MM.dd')}</p>
        </div>
      </div>
    </div>
  );
};

export default Calendar;