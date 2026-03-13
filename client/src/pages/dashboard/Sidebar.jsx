import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  Calendar, 
  Settings, 
  PlusCircle,
  Hash
} from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { name: 'Overview', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'My Tasks', path: '/tasks', icon: <CheckSquare size={20} /> },
    { name: 'Team', path: '/team', icon: <Users size={20} /> },
    { name: 'Calendar', path: '/calendar', icon: <Calendar size={20} /> },
  ];

  return (
    <div className="w-64 h-full bg-[#020617] flex flex-col px-4 py-6 border-r border-white/5">
      {/* --- LOGO --- */}
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
          <PlusCircle size={20} className="text-white" />
        </div>
        <span className="font-black text-xl tracking-tighter">PLANNER.io</span>
      </div>

      {/* --- MAIN NAVIGATION --- */}
      <nav className="flex-1 space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Menu</p>
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
              ${isActive 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
            `}
          >
            {item.icon}
            <span className="font-semibold text-sm">{item.name}</span>
          </NavLink>
        ))}

        {/* --- PROJECTS SECTION --- */}
        <div className="mt-10">
          <div className="flex items-center justify-between px-2 mb-4">
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Active Projects</p>
            <button className="text-slate-500 hover:text-indigo-400"><PlusCircle size={14}/></button>
          </div>
          <div className="space-y-1">
            <ProjectLink name="Marketing Web" color="text-blue-400" />
            <ProjectLink name="Mobile App" color="text-purple-400" />
            <ProjectLink name="Q3 Strategy" color="text-emerald-400" />
          </div>
        </div>
      </nav>

      {/* --- BOTTOM SECTION --- */}
      <div className="pt-6 border-t border-white/5">
        <NavLink to="/settings" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white transition-colors">
          <Settings size={20} />
          <span className="font-semibold text-sm">Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

const ProjectLink = ({ name, color }) => (
  <button className="flex items-center gap-3 w-full px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all text-sm group">
    <Hash size={16} className={`${color} opacity-70 group-hover:opacity-100`} />
    <span className="truncate">{name}</span>
  </button>
);

export default Sidebar;