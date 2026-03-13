import React from 'react';
import { Plus, MoreHorizontal, MessageSquare, Paperclip, Clock } from 'lucide-react';

const Dashboard = () => {
  // Mock data for your project tasks
  const boardData = [
    { id: 'todo', title: 'To Do', color: 'bg-slate-500', tasks: 3 },
    { id: 'progress', title: 'In Progress', color: 'bg-indigo-500', tasks: 2 },
    { id: 'review', title: 'In Review', color: 'bg-amber-500', tasks: 1 },
    { id: 'done', title: 'Completed', color: 'bg-emerald-500', tasks: 5 },
  ];

  return (
    <div className="space-y-8">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Project Board</h1>
          <p className="text-slate-400 font-medium">Marketing Campaign 2026 • v1.2</p>
        </div>
        <div className="flex -space-x-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full border-4 border-[#020617] bg-slate-800 flex items-center justify-center text-xs font-bold">
              U{i}
            </div>
          ))}
          <button className="w-10 h-10 rounded-full border-4 border-[#020617] bg-indigo-600 flex items-center justify-center hover:bg-indigo-500 transition-colors">
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* --- KANBAN GRID --- */}
      <div className="flex gap-6 overflow-x-auto pb-6 custom-scrollbar">
        {boardData.map((column) => (
          <div key={column.id} className="w-80 flex-shrink-0 flex flex-col gap-4">
            {/* Column Header */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${column.color}`} />
                <h2 className="font-bold text-slate-300">{column.title}</h2>
                <span className="text-[10px] font-black bg-white/5 px-2 py-0.5 rounded text-slate-500">
                  {column.tasks}
                </span>
              </div>
              <button className="text-slate-500 hover:text-white"><MoreHorizontal size={18}/></button>
            </div>

            {/* Column Tasks */}
            <div className="space-y-4">
              <TaskCard title="Update Brand Guidelines" priority="High" comments={4} />
              <TaskCard title="API Integration for Auth" priority="Medium" comments={2} />
              
              <button className="w-full py-3 border border-dashed border-white/10 rounded-2xl text-slate-500 text-sm font-bold hover:bg-white/5 hover:text-indigo-400 transition-all">
                + Add New Task
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const TaskCard = ({ title, priority, comments }) => (
  <div className="bg-[#0b0f1a] border border-white/5 p-5 rounded-[1.5rem] hover:border-indigo-500/30 transition-all group cursor-grab active:cursor-grabbing">
    <div className={`text-[9px] font-black uppercase tracking-widest mb-3 px-2 py-1 rounded-md inline-block ${
      priority === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-indigo-500/10 text-indigo-500'
    }`}>
      {priority} Priority
    </div>
    <h4 className="font-bold text-sm mb-5 group-hover:text-indigo-400 transition-colors">{title}</h4>
    
    <div className="flex items-center justify-between pt-4 border-t border-white/5">
      <div className="flex items-center gap-3 text-slate-500">
        <div className="flex items-center gap-1 text-[10px] font-bold">
          <MessageSquare size={14} /> {comments}
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold">
          <Paperclip size={14} /> 1
        </div>
      </div>
      <div className="flex items-center gap-1 text-slate-500 text-[10px] font-bold">
        <Clock size={14} /> 2 days
      </div>
    </div>
  </div>
);

export default Dashboard;