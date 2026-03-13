import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // Recommended for smooth PM dashboard transitions
import { useAppContext } from '../../context/AppContext';
import { 
  Layers, 
  LayoutDashboard, 
  ArrowRight, 
  Zap,
  CheckCircle2,
  Clock,
  Users,
  Target,
  TrendingUp
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { userData, isLoggedIn } = useAppContext();

  const getInitials = (name) => name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : '??';

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-indigo-500/30">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 pb-20 px-4 overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/5 blur-[100px] rounded-full" />

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-8">
            <Zap size={14} className="fill-current" /> Next-Gen Project Management
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent">
            Execute Fast. <br /> 
            <span className="text-indigo-500">Scale Faster.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl mb-12 leading-relaxed font-medium">
            Stop juggling spreadsheets. Centralize your team's workflow, 
            monitor real-time velocity, and hit milestones with surgical precision.
          </p>

          {!isLoggedIn ? (
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <button 
                onClick={() => navigate('/signup')}
                className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3 group shadow-lg shadow-indigo-600/20"
              >
                Get Started Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black uppercase tracking-widest transition-all backdrop-blur-sm"
              >
                Member Portal
              </button>
            </div>
          ) : (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
               <div className="flex items-center gap-5 p-2 pr-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl hover:border-indigo-500/30 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center font-bold text-lg shadow-inner">
                    {getInitials(userData?.name)}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-500 font-black uppercase tracking-tighter">Welcome back</p>
                    <p className="text-lg font-black leading-none">{userData?.name}</p>
                  </div>
                  <button 
                    onClick={() => navigate(userData?.role === 'admin' ? '/admin' : '/dashboard')}
                    className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all hover:rotate-12"
                    title="Go to Dashboard"
                  >
                    <LayoutDashboard size={20} />
                  </button>
               </div>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* --- FEATURES --- */}
      <section className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={<Layers className="text-blue-400" />}
          title="Agile Workflows"
          desc="Customizable boards to manage sprints, backlogs, and daily tasks with seamless drag-and-drop simplicity."
          delay={0.2}
        />
        <FeatureCard 
          icon={<Users className="text-amber-400" />}
          title="Team Sync"
          desc="Allocate members effectively. Visual workloads help identify bottlenecks before they impact your deadline."
          delay={0.4}
        />
        <FeatureCard 
          icon={<Target className="text-emerald-400" />}
          title="Milestone Focus"
          desc="Connect individual tasks to high-level KPIs, ensuring every effort contributes to the bigger picture."
          delay={0.6}
        />
      </section>

      {/* --- STATS SECTION --- */}
      {isLoggedIn && (
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-4 pb-24"
        >
          <div className="bg-gradient-to-b from-[#0b0f1a] to-[#020617] border border-white/10 rounded-[3rem] p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <TrendingUp size={120} />
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
               <div>
                  <h3 className="text-3xl font-black tracking-tight flex items-center gap-3">
                    <Clock size={28} className="text-indigo-500"/> Project Snapshot
                  </h3>
                  <p className="text-slate-400 text-lg mt-2">Real-time performance metrics for your workspace.</p>
               </div>
               <div className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-2xl text-slate-300 text-sm font-bold backdrop-blur-md">
                 <span className="text-indigo-400 mr-2">●</span>
                 Last Update: {userData.stats?.lastActivityDate ? new Date(userData.stats.lastActivityDate).toLocaleDateString() : 'Just now'}
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              <StatBox label="Live Projects" value={userData.stats?.activeProjects || 0} />
              <StatBox label="Current Load" value={userData.stats?.totalTasksAssigned || 0} />
              <StatBox label="Closed Tasks" value={userData.stats?.completedTasks || 0} />
              <StatBox 
                label="Overall Efficiency" 
                value={`${userData.stats?.efficiencyScore || 0}%`} 
                highlight 
              />
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
};

// Sub-components
const FeatureCard = ({ icon, title, desc, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-[#0b0f1a] border border-white/5 p-10 rounded-[2.5rem] hover:border-indigo-500/40 transition-all group cursor-default"
  >
    <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600/10 group-hover:scale-110 transition-all duration-300">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-indigo-400 transition-colors">{title}</h3>
    <p className="text-slate-400 leading-relaxed font-medium">{desc}</p>
  </motion.div>
);

const StatBox = ({ label, value, highlight }) => (
  <div className={`p-7 rounded-[2rem] border transition-all duration-500 hover:translate-y-[-4px] ${
    highlight 
      ? 'bg-indigo-600/20 border-indigo-500/40 shadow-[0_0_20px_rgba(79,70,229,0.1)]' 
      : 'bg-white/5 border-white/5 hover:border-white/20'
  }`}>
    <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.15em] mb-2">{label}</p>
    <p className={`text-4xl font-black tracking-tighter ${highlight ? 'text-indigo-400' : 'text-white'}`}>
      {value}
    </p>
  </div>
);

export default Home;