import React from 'react';
import { Search, Bell, Menu, SearchCheck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const DashboardNavbar = () => {
  const { userData } = useAppContext();

  return (
    <div className="h-16 flex items-center justify-between px-6 lg:px-10">
      {/* --- SEARCH BAR --- */}
      <div className="flex-1 max-w-md relative group">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={18} className="text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Search tasks, projects, or team..."
          className="w-full bg-white/5 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:bg-white/10 transition-all"
        />
      </div>

      {/* --- RIGHT ACTIONS --- */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 text-slate-400 hover:bg-white/5 rounded-full transition-all">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[#020617]"></span>
        </button>

        <div className="h-6 w-[1px] bg-white/10 mx-2"></div>

        {/* User Profile */}
        <div className="flex items-center gap-3 pl-2 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold leading-none group-hover:text-indigo-400 transition-colors">
              {userData?.name || "User"}
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase mt-1 tracking-tighter">
              {userData?.role || "Member"}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center font-black text-xs border-2 border-white/10 shadow-lg group-hover:scale-105 transition-transform">
             {userData?.name ? userData.name[0].toUpperCase() : "?"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;