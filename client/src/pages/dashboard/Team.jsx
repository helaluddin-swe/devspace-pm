import React, { useState } from 'react';
import { Mail, MoreVertical, UserPlus, ShieldCheck, Search, Terminal } from 'lucide-react';
import MemberDetails from './MemberDetails';

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const members = [
    { id: 1, name: 'Alex Rivera', role: 'Admin', email: 'alex@company.com', status: 'Active', color: 'bg-indigo-500' },
    { id: 2, name: 'Sarah Chen', role: 'Designer', email: 'sarah@company.com', status: 'In Meeting', color: 'bg-emerald-500' },
    { id: 3, name: 'Mike Ross', role: 'Developer', email: 'mike@company.com', status: 'Away', color: 'bg-amber-500' },
  ];

  // Filtering Logic
  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 relative font-mono">
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in zoom-in duration-300">
          <div className="w-full max-w-4xl">
            <MemberDetails 
              member={selectedMember} 
              onClose={() => setSelectedMember(null)} 
            />
          </div>
        </div>
      )}

      {/* --- HEADER & SEARCH --- */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b-2 border-white/5 pb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase italic text-white flex items-center gap-3">
            <Terminal className="text-indigo-500" /> Directory_Root
          </h1>
          <p className="text-slate-500 mt-1 text-xs tracking-[0.2em]">CONNECTED_NODES: {members.length} | ACTIVE_SESSIONS: {members.filter(m => m.status === 'Active').length}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
            <input 
              type="text"
              placeholder="QUERY_USER_DATABASE..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-black border-2 border-white/10 px-10 py-2.5 text-xs text-indigo-400 focus:outline-none focus:border-indigo-500 transition-all w-full sm:w-64 uppercase"
            />
          </div>
          <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 border-2 border-indigo-400 text-white font-black text-xs uppercase transition-all shadow-[4px_4px_0px_0px_rgba(79,70,229,0.3)] active:translate-y-1 active:shadow-none">
            <UserPlus size={16} /> New_Grant
          </button>
        </div>
      </div>

      {/* --- GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMembers.map((member) => (
          <div 
            key={member.id} 
            onClick={() => setSelectedMember(member)}
            className="bg-[#0f172a] border-2 border-white/5 p-6 hover:border-indigo-500 transition-all group relative cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,0.02)] hover:shadow-[8px_8px_0px_0px_rgba(79,70,229,0.1)]"
          >
            <div className="flex items-start justify-between relative z-10">
              <div className={`w-14 h-14 ${member.color} flex items-center justify-center text-xl font-black border-2 border-white/20 group-hover:scale-110 transition-transform`}>
                {member.name[0]}
              </div>
              <button onClick={(e) => e.stopPropagation()} className="text-slate-600 hover:text-white transition-colors">
                <MoreVertical size={20} />
              </button>
            </div>

            <div className="mt-6 relative z-10">
              <h3 className="text-xl font-black tracking-tight text-white uppercase italic">{member.name}</h3>
              <p className="text-[10px] font-bold text-indigo-400 tracking-[0.3em] mt-1">{member.role}</p>
            </div>

            <div className="mt-8 flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 ${member.status === 'Active' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-700'}`} />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{member.status}</span>
              </div>
              <Mail size={16} className="text-slate-700 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;