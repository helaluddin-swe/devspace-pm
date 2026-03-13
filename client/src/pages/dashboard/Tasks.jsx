import React, { useState } from 'react';
import { Plus, Check, Square, Terminal, X } from 'lucide-react';
import TaskDetails from './TaskDetails'; // Import your details component

const Tasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const taskList = [
    { id: '001', title: 'INITIALIZE_DB_SCHEMA', priority: 'CRITICAL', status: 'done', description: 'Core database setup.' },
    { id: '002', title: 'REFRESH_ASSET_PIPELINE', priority: 'HIGH', status: 'pending', description: 'Asset sync logic.' },
    { id: '003', title: 'DEBUG_UI_RETRO_GLITCH', priority: 'LOW', status: 'pending', description: 'Fixing scanline rendering.' },
  ];

  return (
    <div className="p-2 font-mono relative">
      {/* --- OVERLAY MODAL --- */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="w-full max-w-3xl">
            <TaskDetails 
              task={selectedTask} 
              onClose={() => setSelectedTask(null)} 
            />
          </div>
        </div>
      )}

      {/* --- HEADER --- */}
      <div className="bg-[#1e293b] border-2 border-white/20 p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)]">
        <div className="flex items-center gap-2 mb-4">
          <Terminal size={18} className="text-indigo-400" />
          <h1 className="text-xl font-bold tracking-widest text-white uppercase">Task_Manager_v1.0</h1>
        </div>
        
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="C:\> ENTER NEW COMMAND..." 
            className="flex-1 bg-black border border-white/20 p-3 text-indigo-400 focus:outline-none focus:border-indigo-500 transition-all placeholder:opacity-30"
          />
          <button className="bg-indigo-600 border-2 border-indigo-400 px-6 py-2 font-black hover:bg-indigo-500 active:translate-y-1 transition-all">
            EXECUTE
          </button>
        </div>
      </div>

      {/* --- TASK LIST TABLE --- */}
      <div className="border-2 border-white/10 bg-[#0f172a] overflow-hidden">
        <div className="grid grid-cols-12 bg-white/5 p-2 border-b border-white/10 text-[10px] font-black tracking-widest text-slate-500 uppercase">
          <div className="col-span-1">ID</div>
          <div className="col-span-7">DESCRIPTION</div>
          <div className="col-span-2">PRIORITY</div>
          <div className="col-span-2 text-right">ACTION</div>
        </div>

        {taskList.map((task) => (
          <div 
            key={task.id} 
            onClick={() => setSelectedTask(task)} // TRIGGER: Open details on click
            className="grid grid-cols-12 p-4 border-b border-white/5 items-center hover:bg-indigo-600/10 cursor-pointer transition-all group"
          >
            <div className="col-span-1 text-xs text-indigo-500 group-hover:text-indigo-300">#{task.id}</div>
            <div className={`col-span-7 font-bold text-sm tracking-tight ${task.status === 'done' ? 'line-through text-slate-600' : 'text-slate-300 group-hover:text-white'}`}>
              {task.title}
            </div>
            <div className="col-span-2">
               <span className={`text-[9px] px-2 py-0.5 border ${task.priority === 'CRITICAL' ? 'border-rose-500 text-rose-500' : 'border-slate-500 text-slate-500'} group-hover:border-white/40`}>
                 {task.priority}
               </span>
            </div>
            <div className="col-span-2 text-right">
              {/* StopPropagation prevents the modal from opening when just clicking the checkbox */}
              <button 
                onClick={(e) => e.stopPropagation()} 
                className="p-1 border border-white/20 hover:bg-white/10 active:scale-90 transition-transform"
              >
                {task.status === 'done' ? <Check size={14} className="text-emerald-500" /> : <Square size={14} />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-[10px] text-slate-600 font-bold uppercase tracking-[0.2em]">
        Total_Records: {taskList.length} | System_Status: Stable
      </div>
    </div>
  );
};

export default Tasks;