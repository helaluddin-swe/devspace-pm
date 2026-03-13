import React from 'react';
import { Plus, Check, Square, AlertCircle, Terminal } from 'lucide-react';

const Tasks = () => {
  const taskList = [
    { id: '001', title: 'INITIALIZE_DB_SCHEMA', priority: 'CRITICAL', status: 'done' },
    { id: '002', title: 'REFRESH_ASSET_PIPELINE', priority: 'HIGH', status: 'pending' },
    { id: '003', title: 'DEBUG_UI_RETRO_GLITCH', priority: 'LOW', status: 'pending' },
  ];

  return (
    <div className="p-2 font-mono">
      {/* Header with Retro "Window" Feel */}
      <div className="bg-[#1e293b] border-2 border-white/20 p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={18} className="text-indigo-400" />
          <h1 className="text-xl font-bold tracking-widest text-white uppercase">Task_Manager_v1.0</h1>
        </div>
        
        {/* Retro Input Bar */}
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="C:\> ENTER NEW COMMAND..." 
            className="flex-1 bg-black border border-white/20 p-3 text-indigo-400 focus:outline-none focus:border-indigo-500 transition-all"
          />
          <button className="bg-indigo-600 border-2 border-indigo-400 px-6 py-2 font-black hover:bg-indigo-500 active:translate-y-1 transition-all">
            EXECUTE
          </button>
        </div>
      </div>

      {/* Task List Table */}
      <div className="border-2 border-white/10 bg-[#0f172a] overflow-hidden">
        <div className="grid grid-cols-12 bg-white/5 p-2 border-b border-white/10 text-[10px] font-black tracking-widest text-slate-500">
          <div className="col-span-1">ID</div>
          <div className="col-span-7">DESCRIPTION</div>
          <div className="col-span-2">PRIORITY</div>
          <div className="col-span-2 text-right">ACTION</div>
        </div>

        {taskList.map((task) => (
          <div key={task.id} className="grid grid-cols-12 p-4 border-b border-white/5 items-center hover:bg-white/5 transition-colors">
            <div className="col-span-1 text-xs text-indigo-500">#{task.id}</div>
            <div className={`col-span-7 font-bold text-sm ${task.status === 'done' ? 'line-through text-slate-600' : 'text-slate-300'}`}>
              {task.title}
            </div>
            <div className="col-span-2">
               <span className={`text-[9px] px-2 py-0.5 border ${task.priority === 'CRITICAL' ? 'border-rose-500 text-rose-500' : 'border-slate-500 text-slate-500'}`}>
                 {task.priority}
               </span>
            </div>
            <div className="col-span-2 text-right">
              <button className="p-1 border border-white/20 hover:bg-white/10">
                {task.status === 'done' ? <Check size={14} className="text-emerald-500" /> : <Square size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;