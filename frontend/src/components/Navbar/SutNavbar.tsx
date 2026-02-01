import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Bell, ChevronDown, Search, Globe, User, Menu, X, LogOut } from 'lucide-react';
import { authService } from '../../services/authService';

const SutNavbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check login status on mount
        const token = authService.getToken();
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        authService.logout();
        setIsLoggedIn(false);
        setIsUserMenuOpen(false);
        navigate('/login');
    };

    const navLinks = [
        { to: '/', label: 'หน้าแรก' },
        { to: '/items', label: 'สินค้า' },
        { to: '/articles', label: 'บทความ' },
        { to: '/about', label: 'เกี่ยวกับเรา' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 md:px-8 py-4">
            <div className="max-w-[1440px] mx-auto flex items-center justify-between">
                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-gray-500 hover:text-black transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <div className="flex flex-col">
                        <span className="text-xl font-black text-black tracking-widest leading-none">LOTS</span>
                        <span className="text-[8px] font-bold text-gray-400 tracking-[0.3em] mt-0.5">THAILAND</span>
                    </div>
                </Link>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `text-[13px] font-bold transition-all hover:text-black ${isActive ? 'text-black underline underline-offset-8 decoration-2' : 'text-gray-500'
                                }`
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Actions & Search & Language */}
                <div className="flex items-center space-x-3 md:space-x-6">
                    {/* Search Bar Placeholder - Hidden on mobile, shown on desktop */}
                    <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-full px-4 py-1.5 focus-within:border-black transition-colors group">
                        <Search size={16} className="text-gray-400 group-focus-within:text-black" />
                        <input
                            type="text"
                            placeholder="ค้นหา..."
                            className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-32 lg:w-48 text-black placeholder:text-gray-400"
                        />
                    </div>

                    {/* Mobile Search Icon Only */}
                    <button className="md:hidden text-gray-500">
                        <Search size={20} />
                    </button>

                    <div className="flex items-center space-x-2 md:space-x-4">
                        {/* Language Toggle - Hidden on small mobile */}
                        <button className="hidden sm:flex items-center space-x-1 text-gray-500 hover:text-black transition-colors group">
                            <Globe size={18} strokeWidth={2} />
                            <span className="text-xs font-bold uppercase">TH</span>
                            <ChevronDown size={14} className="text-gray-400 group-hover:text-black" />
                        </button>

                        <div className="hidden sm:block w-[1px] h-4 bg-gray-200"></div>

                        {isLoggedIn ? (
                            <div className="flex items-center space-x-2 md:space-x-4 relative">
                                <button className="relative text-gray-500 hover:text-black transition-colors">
                                    <Bell size={20} strokeWidth={2} />
                                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                </button>
                                <div
                                    className="flex items-center space-x-2 cursor-pointer group"
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                >
                                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                                        <User size={18} className="text-gray-700" />
                                    </div>
                                    <ChevronDown size={14} className={`text-gray-400 group-hover:text-black transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </div>

                                {/* User Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <Link
                                            to="/profile"
                                            className="flex items-center px-4 py-2.5 text-[13px] font-bold text-gray-600 hover:bg-gray-50 hover:text-black transition-colors"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <User size={16} className="mr-3" />
                                            โปรไฟล์
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center px-4 py-2.5 text-[13px] font-bold text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors border-t border-gray-50 mt-1"
                                        >
                                            <LogOut size={16} className="mr-3" />
                                            ออกจากระบบ
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2 md:space-x-4">
                                <Link to="/login" className="text-[10px] md:text-[11px] font-black tracking-widest text-gray-500 hover:text-black transition-colors uppercase whitespace-nowrap">
                                    เข้าสู่ระบบ
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-black text-white px-4 md:px-6 py-2 rounded-sm text-[10px] md:text-[11px] font-black tracking-widest hover:bg-gray-800 transition-all uppercase whitespace-nowrap"
                                >
                                    สมัครสมาชิก
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 py-6 px-4 space-y-4 animate-in slide-in-from-top duration-300">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className="block text-sm font-bold text-gray-600 hover:text-black transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <button className="flex items-center space-x-2 text-gray-500">
                            <Globe size={18} />
                            <span className="text-xs font-bold uppercase">Thailand (TH)</span>
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default SutNavbar;

