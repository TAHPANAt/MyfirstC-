import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SutNavbar from '../components/Navbar/SutNavbar';
import LandingPage from '../pages/LandingPage';
import Dashboard from '../pages/Dashboard';
import ArticlesPage from '../pages/Item/ArticlesPage';
import AboutUs from '../pages/AboutUs';
import AuthRoutes from './AuthRoutes';
import ItemRoutes from './ItemRoutes';

const AppRoutes: React.FC = () => {
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

    if (isAuthPage) {
        return (
            <div key={location.pathname} className="page-transition-container">
                <Routes>
                    {AuthRoutes}
                </Routes>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50 text-slate-900 font-sans">
            <SutNavbar />
            <main key={location.pathname} className="flex-1 page-transition-container">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/articles" element={<ArticlesPage />} />
                    <Route path="/about" element={<AboutUs />} />

                    {/* Item Category Routes */}
                    {ItemRoutes}

                    <Route path="*" element={<LandingPage />} />
                </Routes>
            </main>

            <footer className="bg-white border-t border-gray-100 py-12">
                <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
                    <p className="text-gray-400 text-sm font-medium">© 2024 SUT-ReShare • Suranaree University of Technology</p>
                </div>
            </footer>
        </div>
    );
};

export default AppRoutes;
