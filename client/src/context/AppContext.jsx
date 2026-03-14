import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const navigate = useNavigate();
    const backendUrl = (import.meta.env.VITE_API_URL || "http://localhost:5174").replace(/\/$/, "");

    const [userData, setUserData] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const login = useCallback((user, token) => {
        localStorage.setItem('token', token);
        setUserData(user);
        setIsLoggedIn(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setUserData(null);
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setIsLoading(false);
                return;
            }

            try {
                const { data } = await axios.get(`${backendUrl}/api/user/me`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (data.success) {
                    setUserData(data.user);
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Auth initialization failed", error);
                localStorage.removeItem('token'); // Clear corrupt token
            } finally {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [backendUrl]);

    const contextValue = {
        backendUrl, userData, setUserData, 
        isLoggedIn, setIsLoggedIn, 
        isLoading, logout, login, navigate
    };

    if (isLoading) {
        return (
            <div className="h-screen bg-[#020617] flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] animate-pulse">Initializing System</p>
            </div>
        );
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;