import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardNavbar from './DashboardNavbar';

const Layout = () => {
  return (
    <div className='flex w-full h-screen bg-[#020617] text-white overflow-hidden'>
      {/* --- FIXED SIDEBAR --- */}
      <aside className='h-screen sticky top-0 border-r border-white/5'>
        <Sidebar />
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className='flex-1 flex flex-col h-screen overflow-hidden'>
        
        {/* --- TOP NAVBAR --- */}
        <header className='z-20 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md'>
          <DashboardNavbar />
        </header>

        {/* --- SCROLLABLE CONTENT --- */}
        <main className='flex-1 overflow-y-auto custom-scrollbar bg-[#020617]'>
          <div className='p-6 lg:p-10 max-w-[1600px] mx-auto animate-in fade-in duration-500'>
            {/* This is where your Dashboard, Task Board, or Settings pages will render */}
            <Outlet />
          </div>
        </main>
        
      </div>
    </div>
  );
};

export default Layout;