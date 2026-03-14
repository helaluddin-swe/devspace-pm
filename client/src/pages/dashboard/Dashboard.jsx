import React, { useEffect } from 'react';
import { Plus, Terminal } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import TaskCard from './TaskCard';

const Dashboard = () => {
  const { isLoggedIn, navigate, isLoading } = useAppContext();

  // PROTECT ROUTE: If not logged in and not loading, kick to login
  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate('/login');
    }
  }, [isLoggedIn, isLoading, navigate]);

  const boardData = [
    { id: 'todo', title: 'QUEUE_STACK', color: 'border-slate-500', tasks: 3 },
    { id: 'progress', title: 'PROCESSING', color: 'border-indigo-500', tasks: 2 },
    { id: 'review', title: 'VERIFICATION', color: 'border-amber-500', tasks: 1 },
    { id: 'done', title: 'COMPLETED', color: 'border-emerald-500', tasks: 5 },
  ];

  if (isLoading) return null; // Let AppContext handle the global loader

  return (
    <div className="p-6 space-y-10 font-mono text-white">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b-2 border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Terminal size={20} className="text-indigo-400" />
            <h1 className="text-4xl font-black tracking-tighter uppercase italic">Board<span className="animate-pulse">_</span></h1>
          </div>
        </div>
        <button className="h-10 w-10 flex items-center justify-center bg-indigo-600 border-2 border-indigo-400 shadow-lg">
          <Plus size={20} />
        </button>
      </div>

      <div className="flex gap-8 overflow-x-auto pb-10 custom-scrollbar">
        {boardData.map((column) => (
          <div key={column.id} className="w-80 flex-shrink-0">
            <div className={`border-2 ${column.color} bg-black p-3 mb-4`}>
              <div className="flex justify-between items-center">
                <h2 className="font-black text-xs tracking-widest">{column.title}</h2>
                <span className="text-[10px] text-slate-500">[{column.tasks}]</span>
              </div>
            </div>
            <div className="space-y-4">
                <TaskCard title="SYS_UPDATE" priority="CRITICAL" color={column.color} />
                <button className="w-full py-4 border-2 border-dashed border-white/10 text-slate-600 text-[10px] font-black hover:text-indigo-400 transition-all">
                  + NEW_TASK
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;