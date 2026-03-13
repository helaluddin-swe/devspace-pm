import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Paperclip, Clock } from 'lucide-react';

const TaskCard = ({ id, title, priority, comments }) => (
  /* The Link is the top-level wrapper for the card */
  <Link 
    to={`/dashboard/${id}`} 
    className="block no-underline group"
  >
    <div className="bg-[#05070a] border-2 border-white/10 p-5 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] group-hover:border-indigo-500/50 group-hover:shadow-[4px_4px_0px_0px_rgba(79,70,229,0.2)] group-hover:-translate-y-1 group-active:translate-y-1 group-active:shadow-none relative overflow-hidden">
      
      {/* Priority Badge */}
      <div className="flex justify-between items-start mb-4">
        <div className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-1 border ${
          priority === 'CRITICAL' ? 'border-rose-500 text-rose-500' : 'border-indigo-500/50 text-indigo-400'
        }`}>
          {priority}_PRIORITY
        </div>
      </div>

      {/* Task Title */}
      <h4 className="font-black text-xs text-slate-300 group-hover:text-white uppercase tracking-tighter mb-6 leading-relaxed">
        {title}
      </h4>

      {/* Card Footer / Metadata */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5 font-bold">
        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1.5 text-[9px] group-hover:text-indigo-400 transition-colors">
            <MessageSquare size={12} /> {comments}
          </div>
          <div className="flex items-center gap-1.5 text-[9px]">
            <Paperclip size={12} /> 1
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-slate-600 text-[9px]">
          <Clock size={12} /> 2D_REMAINING
        </div>
      </div>

      {/* Retro scanline detail (visible on hover) */}
      <div className="absolute inset-0 bg-indigo-500 opacity-0 group-hover:opacity-[0.02] pointer-events-none" />
    </div>
  </Link>
);

export default TaskCard;