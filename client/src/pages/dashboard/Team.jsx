import React from 'react';
import { Mail, MoreVertical, UserPlus, ShieldCheck } from 'lucide-react';

const Team = () => {
  const members = [
    { id: 1, name: 'Alex Rivera', role: 'Admin', email: 'alex@company.com', status: 'Active', color: 'bg-indigo-500' },
    { id: 2, name: 'Sarah Chen', role: 'Designer', email: 'sarah@company.com', status: 'In Meeting', color: 'bg-emerald-500' },
    { id: 3, name: 'Mike Ross', role: 'Developer', email: 'mike@company.com', status: 'Away', color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Team Members</h1>
          <p className="text-slate-400 mt-1">Manage your workspace collaborators and roles.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/20">
          <UserPlus size={18} /> Invite Member
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div key={member.id} className="bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:border-white/10 transition-all group relative overflow-hidden">
            <div className="flex items-start justify-between relative z-10">
              <div className={`w-14 h-14 rounded-2xl ${member.color} flex items-center justify-center text-xl font-black shadow-lg`}>
                {member.name[0]}
              </div>
              <button className="text-slate-500 hover:text-white p-1">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="mt-4 relative z-10">
              <h3 className="text-lg font-bold">{member.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{member.role}</span>
                {member.role === 'Admin' && <ShieldCheck size={12} className="text-indigo-400" />}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${member.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                <span className="text-xs text-slate-400 font-medium">{member.status}</span>
              </div>
              <button className="p-2 bg-white/5 hover:bg-indigo-600/20 rounded-lg text-slate-400 hover:text-indigo-400 transition-all">
                <Mail size={16} />
              </button>
            </div>
            
            {/* Subtle background glow on hover */}
            <div className={`absolute -bottom-10 -right-10 w-32 h-32 ${member.color} opacity-0 group-hover:opacity-5 blur-[50px] transition-opacity`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;