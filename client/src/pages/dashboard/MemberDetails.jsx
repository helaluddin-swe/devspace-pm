import React from 'react';
import { X, Shield, Cpu, Activity, Mail, Calendar, Phone } from 'lucide-react';

const MemberDetails = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="font-mono text-slate-300 p-1">
      {/* --- EXTERNAL FRAME --- */}
      <div className="bg-[#0f172a] border-2 border-indigo-500 shadow-[8px_8px_0px_0px_rgba(79,70,229,0.3)] overflow-hidden">
        
        {/* ACCESS BAR */}
        <div className="bg-indigo-600 p-2 flex items-center justify-between border-b-2 border-indigo-400">
          <div className="flex items-center gap-2">
            <Shield size={16} className="text-white" />
            <span className="text-xs font-black text-white tracking-widest uppercase">
              Personnel_Dossier_v4.0
            </span>
          </div>
          <button onClick={onClose} className="bg-rose-500 border border-rose-300 p-1 hover:bg-rose-400">
            <X size={14} className="text-white" />
          </button>
        </div>

        <div className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* --- LEFT: ID CARD --- */}
            <div className="w-full md:w-48">
              <div className="border-2 border-white/10 p-2 bg-black/40">
                <div className={`aspect-square ${member.color} flex items-center justify-center text-5xl font-black shadow-inner mb-2`}>
                  {member.name[0]}
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/30 p-2 text-center">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-tighter">Clearance_Level</p>
                  <p className="text-xs font-bold text-white">{member.role === 'Admin' ? 'LVL_01_SECURE' : 'LVL_04_MEMBER'}</p>
                </div>
              </div>
            </div>

            {/* --- RIGHT: DATA READOUT --- */}
            <div className="flex-1 space-y-6">
              <section>
                <h2 className="text-4xl font-black text-white italic tracking-tighter mb-1 uppercase">
                  {member.name}
                </h2>
                <div className="flex items-center gap-2">
                  <Activity size={14} className="text-emerald-500" />
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{member.status}</span>
                </div>
              </section>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <DataField label="Designation" value={member.role} />
                <DataField label="Network_Address" value={member.email} />
                <DataField label="Joined_Date" value="2024.11.12" />
                <DataField label="Terminal_ID" value={`NODE-${member.id}092`} />
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">System_Permissions</p>
                <div className="flex flex-wrap gap-2">
                  <PermissionBadge label="READ_ENCRYPTED" active />
                  <PermissionBadge label="WRITE_ACCESS" active={member.role === 'Admin'} />
                  <PermissionBadge label="EXECUTE_CMD" active={member.role === 'Admin'} />
                  <PermissionBadge label="NETWORK_BYPASS" active={false} />
                </div>
              </div>
            </div>
          </div>

          {/* --- FOOTER ACTIONS --- */}
          <div className="mt-10 flex justify-end gap-3">
             <button className="px-6 py-2 border-2 border-white/10 text-[10px] font-black hover:bg-white/5 uppercase">Deactivate_Node</button>
             <button className="px-6 py-2 bg-indigo-600 border-2 border-indigo-400 text-[10px] font-black hover:bg-indigo-500 shadow-[4px_4px_0px_0px_rgba(79,70,229,0.3)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2 text-white uppercase">
               Modify_Credentials
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Internal Sub-components
const DataField = ({ label, value }) => (
  <div className="bg-white/5 border border-white/5 p-3">
    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</p>
    <p className="text-sm font-bold text-slate-200 mt-1">{value}</p>
  </div>
);

const PermissionBadge = ({ label, active }) => (
  <span className={`text-[8px] px-2 py-1 font-black border ${active ? 'border-indigo-500 text-indigo-400 bg-indigo-500/10' : 'border-slate-800 text-slate-700 bg-transparent'}`}>
    {label}
  </span>
);

export default MemberDetails;