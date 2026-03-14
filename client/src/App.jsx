import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';

import Home from './pages/home/Home';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AdminDashboard from './pages/admin/AdminDashboard';
import Dashboard from './pages/dashboard/Dashboard';
import Team from './pages/dashboard/Team';
import Layout from './pages/dashboard/Layout';
import Tasks from './pages/dashboard/Tasks';
import Calendar from './pages/dashboard/Calender';
import TaskDetails from './pages/dashboard/TaskDetails';
import MemberDetails from './pages/dashboard/MemberDetails';

const App = () => {
  const { isLoggedIn, userData } = useAppContext();

  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <Navbar /> */}

      <div className=''>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage /> } />
          <Route path="/signup" element={<SignUpPage /> } />

          {/* PROTECTED USER ROUTES */}
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/team" element={<Team />} />
            
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/dashboard/:id" element={<TaskDetails />} />
            {/* Any other page added here will automatically have the sidebar/navbar */}
          </Route>
          {/* <Route path="/dashboard/projects" element={<Projects />} />
          <Route path="/dashboard/projectsDetail" element={<ProjectDetails />} />
          

          {/* PROTECTED ADMIN ROUTES */}
          <Route
            path="/admin"
            element={isLoggedIn && userData?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
          />

          {/* CATCH ALL */}

        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;