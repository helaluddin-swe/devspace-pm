import React from 'react';
import {
  Plus,
  MoreHorizontal,
  MessageSquare,
  Paperclip,
  Clock,
  Terminal,
  Cpu,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';

const Dashboard = () => {
  const boardData = [
    { id: 'todo', title: 'QUEUE_STACK', color: 'border-slate-500', glow: 'shadow-slate-500/20', tasks: 3 },
    { id: 'progress', title: 'PROCESSING', color: 'border-indigo-500', glow: 'shadow-indigo-500/20', tasks: 2 },
    { id: 'review', title: 'VERIFICATION', color: 'border-amber-500', glow: 'shadow-amber-500/20', tasks: 1 },
    { id: 'done', title: 'COMPLETED', color: 'border-emerald-500', glow: 'shadow-emerald-500/20', tasks: 5 },
  ];

  return (
    <div className="space-y-10 font-mono">
      {/* --- HEADER: SYSTEM OVERVIEW --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Terminal size={20} className="text-indigo-400" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">
              Project_Board<span className="animate-pulse">_</span>
            </h1>
          </div>
          <p className="text-slate-500 text-xs font-bold tracking-[0.3em] uppercase">
            Kernel_Ver: 1.2 // Marketing_Campaign_2026
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-10 h-10 border-2 border-indigo-500 bg-black flex items-center justify-center text-[10px] font-black shadow-[3px_3px_0px_0px_rgba(79,70,229,0.4)]">
                U_0{i}
              </div>
            ))}
          </div>
          <button className="h-10 w-10 flex items-center justify-center bg-indigo-600 border-2 border-indigo-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:translate-y-1 hover:shadow-none transition-all">
            <Plus size={20} />
          </button>
        </div>
      </div>

      {/* --- KANBAN GRID --- */}
      <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar">
        {boardData.map((column) => (
          <div key={column.id} className="w-80 flex-shrink-0 flex flex-col">
            {/* Retro Column Window Header */}
            <div className={`border-2 ${column.color} bg-black p-3 mb-4 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.05)]`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 ${column.color.replace('border', 'bg')} animate-pulse`} />
                  <h2 className="font-black text-xs tracking-widest text-white">{column.title}</h2>
                </div>
                <span className="text-[10px] font-black text-slate-500">[{column.tasks}]</span>
              </div>
            </div>

            {/* Tasks Container */}
            <div className="space-y-6">
              <TaskCard
                title="SYS_UPDATE: BRAND_GUIDE"
                priority="CRITICAL"
                comments={4}
                color={column.color}
              />
              <TaskCard
                title="INTEGRATE_AUTH_MODULE"
                priority="STABLE"
                comments={2}
                color={column.color}
              />

              <button className="w-full py-4 border-2 border-dashed border-white/10 text-slate-600 text-[10px] font-black tracking-widest uppercase hover:bg-white/5 hover:border-indigo-500/50 hover:text-indigo-400 transition-all">
                + INITIALIZE_NEW_TASK
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};






export default Dashboard;