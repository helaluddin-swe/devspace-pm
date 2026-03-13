import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  X, Cpu, Save, Trash2, History, Clock, MessageSquare, ArrowLeft, ShieldAlert 
} from 'lucide-react';

const TaskDetails = ({ tasks = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you'd fetch from MongoDB here. 
  // For now, we find the task from your mock data array.
  const task = tasks.find(t => t.id === id) || {
    id: id || "ERR_NULL",
    title: "UNKNOWN_PROTOCOL",
    priority: "STABLE",
    comments: 0,
    description: "No data found in local sector."
  };

  const logs = [
    { time: '10:04:22', msg: `ACCESS_GRANTED_BY_USER_ID_${id.slice(-4)}`, user: 'ROOT' },
    { time: '11:15:40', msg: 'HEARTBEAT_STABLE', user: 'SYSTEM' },
  ];

  return (
    <div className="font-mono text-slate-300 p-4 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* BACK BUTTON / BREADCRUMB */}
      <button 
        onClick={() => navigate('/dashboard')}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-indigo-400 transition-colors text-[10px] font-black uppercase tracking-widest group"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
        Return_to_Control_Center
      </button>

      {/* --- MAIN WINDOW --- */}
      <div className="bg-[#0f172a] border-2 border-indigo-500 shadow-[12px_12px_0px_0px_rgba(79,70,229,0.2)] overflow-hidden">
        
        {/* TITLE BAR */}
        <div className="bg-indigo-600 p-3 flex items-center justify-between border-b-2 border-indigo-400">
          <div className="flex items-center gap-3">
            <Cpu size={18} className="text-white animate-pulse" />
            <span className="text-xs font-black text-white tracking-[0.2em] uppercase">
              Sector_Inspector_v3.1 // 0x{task.id.slice(-6).toUpperCase()}
            </span>
          </div>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 bg-indigo-400 opacity-50" />
            <div className="w-3 h-3 bg-indigo-400 opacity-80" />
            <button onClick={() => navigate('/dashboard')} className="ml-2 bg-rose-500 border border-rose-300 p-0.5 hover:bg-rose-400">
              <X size={14} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-10">
          {/* HEADER INFO */}
          <section className="relative">
            <div className="flex items-center gap-4 mb-4">
               <div className={`px-3 py-1 border-2 font-black text-[10px] tracking-tighter ${
                  task.priority === 'CRITICAL' 
                  ? 'border-rose-500 text-rose-500 bg-rose-500/10' 
                  : 'border-indigo-500 text-indigo-400 bg-indigo-500/10'
                }`}>
                  {task.priority}_PATH
                </div>
                <div className="text-[10px] font-bold text-slate-600 uppercase">
                  Checksum: <span className="text-slate-400 underline">Valid</span>
                </div>
            </div>
            <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-2 break-words">
              {task.title}
            </h2>
            <div className="h-1 w-24 bg-indigo-500/30" />
          </section>

          {/* GRID CONFIG */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* COLUMN 1: SYSTEM STATS */}
            <div className="lg:col-span-1 space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                  <ShieldAlert size={12}/> Security_Parameters
                </p>
                <div className="bg-black/40 border border-white/10 p-4 space-y-4">
                  <StatRow label="Network_ID" value={`NODE-${task.id.slice(0,4)}`} />
                  <StatRow label="Comments" value={task.comments || '0'} color="text-indigo-400" />
                  <StatRow label="Load_Time" value="2.4ms" />
                  <div className="pt-2">
                    <p className="text-[9px] font-bold text-slate-600 mb-2 uppercase">Integrity_Bar</p>
                    <div className="h-1.5 w-full bg-slate-800">
                      <div className="h-full bg-indigo-500 w-3/4 shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLUMN 2 & 3: CONTENT & LOGS */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                   Directives_Input
                </p>
                <textarea 
                  className="w-full h-40 bg-black/80 border-2 border-white/5 p-4 text-xs text-slate-300 focus:outline-none focus:border-indigo-500/50 leading-relaxed font-mono resize-none shadow-inner group"
                  defaultValue={task.description || "Default operational parameters engaged. Monitoring heartbeat for anomalies."}
                />
              </div>

              {/* LOG READOUT */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                   <p className="text-[10px] font-black text-slate-500 uppercase flex items-center gap-2">
                      <History size={14} /> System_Log_Stack
                   </p>
                   <span className="text-[8px] text-emerald-500 font-bold animate-pulse">LIVE_CONNECTION</span>
                </div>
                <div className="bg-black border-2 border-white/5 p-4 font-mono text-[10px] space-y-2 max-h-40 overflow-y-auto">
                  {logs.map((log, i) => (
                    <div key={i} className="flex gap-4 border-l border-white/10 pl-3">
                      <span className="text-slate-600">{log.time}</span>
                      <span className="text-indigo-400 font-black tracking-tight">{log.msg}</span>
                      <span className="ml-auto text-slate-800">{log.user}</span>
                    </div>
                  ))}
                  <div className="text-indigo-500 animate-pulse">_ EXEC_COMPLETE</div>
                </div>
              </div>
            </div>
          </div>

          {/* ACTION FOOTER */}
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
            <button className="flex items-center gap-2 text-slate-600 hover:text-rose-500 text-[10px] font-black uppercase transition-all">
              <Trash2 size={16} /> Purge_from_Database
            </button>
            <div className="flex gap-4 w-full sm:w-auto">
              <button onClick={() => navigate('/dashboard')} className="flex-1 sm:flex-none px-8 py-3 border-2 border-white/10 text-[10px] font-black hover:bg-white/5 transition-all uppercase italic">
                Decline
              </button>
              <button className="flex-1 sm:flex-none px-8 py-3 bg-indigo-600 border-2 border-indigo-400 text-[10px] font-black text-white hover:bg-indigo-500 shadow-[6px_6px_0px_0px_rgba(79,70,229,0.3)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 uppercase italic">
                <Save size={16} /> Commit_Changes
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-component for cleaner Stat Rows
const StatRow = ({ label, value, color = "text-white" }) => (
  <div className="flex justify-between items-center text-[10px] border-b border-white/5 pb-2">
    <span className="font-bold text-slate-500 uppercase">{label}:</span>
    <span className={`font-black tracking-tight ${color}`}>{value}</span>
  </div>
);

export default TaskDetails;