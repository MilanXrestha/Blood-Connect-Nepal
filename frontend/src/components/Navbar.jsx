import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Droplet, Menu, X, User as UserIcon, Sun, Moon, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { lang, toggleLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/donors', label: t.nav.findDonors },
        { path: '/requests', label: t.nav.urgentRequests },
        { path: '/eligibility-check', label: lang === 'ne' ? 'योग्यता जाँच' : 'Health Quiz' },
        { path: '/blood-banks', label: lang === 'ne' ? 'रक्त केन्द्र' : 'Blood Banks' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-200/80 dark:border-gray-800/80 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    
                    {/* Brand Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="p-2 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-100 dark:border-red-900/50 text-red-600 dark:text-red-500 group-hover:scale-105 transition-transform duration-200 shadow-sm">
                                <Droplet className="h-5 w-5 fill-current" />
                            </div>
                            <span className="font-bold text-lg tracking-tight text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                                {t.nav.title}
                            </span>
                        </Link>
                    </div>
                    
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                    isActive(link.path)
                                        ? 'text-red-600 dark:text-red-400 bg-red-50/80 dark:bg-red-950/40 font-semibold'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800/50'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Controls (Theme, Language, Auth) */}
                    <div className="hidden md:flex items-center space-x-3">
                        
                        {/* Theme Toggle Button */}
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                            aria-label="Toggle Dark Mode"
                            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        >
                            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>

                        {/* Language Switcher Button */}
                        <button 
                            onClick={toggleLanguage} 
                            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200/60 dark:border-gray-700/60 transition-all"
                            title="Switch Language"
                        >
                            {lang === 'en' ? (
                                <>
                                    <span className="text-sm leading-none" role="img" aria-label="Nepal Flag">🇳🇵</span>
                                    <span>NE</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-sm leading-none" role="img" aria-label="US Flag">🇺🇸</span>
                                    <span>EN</span>
                                </>
                            )}
                        </button>

                        <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>

                        {/* User Authentication Actions */}
                        {user ? (
                            <div className="flex items-center space-x-2">
                                <Link 
                                    to="/profile" 
                                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <UserIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                    <span>{t.nav.profile}</span>
                                </Link>
                                <button 
                                    onClick={logout} 
                                    className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors"
                                    title={t.nav.logout}
                                >
                                    <LogOut className="h-4 w-4" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2.5">
                                <Link 
                                    to="/login" 
                                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    {t.nav.login}
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:shadow transition-all duration-150"
                                >
                                    {t.nav.register}
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* Mobile Menu Button & Controls */}
                    <div className="md:hidden flex items-center gap-1.5">
                        <button 
                            onClick={toggleTheme} 
                            className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
                            aria-label="Toggle Dark Mode"
                        >
                            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </button>
                        
                        <button 
                            onClick={toggleLanguage} 
                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                        >
                            {lang === 'en' ? (
                                <>
                                    <span className="text-sm leading-none" role="img" aria-label="Nepal Flag">🇳🇵</span>
                                    <span>NE</span>
                                </>
                            ) : (
                                <>
                                    <span className="text-sm leading-none" role="img" aria-label="US Flag">🇺🇸</span>
                                    <span>EN</span>
                                </>
                            )}
                        </button>

                        <button 
                            onClick={() => setIsOpen(!isOpen)} 
                            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-1"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Frosted Glass Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden bg-white/95 dark:bg-gray-950/95 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800 px-4 pt-2 pb-6 space-y-2 animate-fade-in-up">
                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                                    isActive(link.path)
                                        ? 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 font-semibold'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800">
                        {user ? (
                            <div className="space-y-2">
                                <Link 
                                    to="/profile" 
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    <UserIcon className="h-4 w-4" />
                                    <span>{t.nav.profile}</span>
                                </Link>
                                <button 
                                    onClick={() => { logout(); setIsOpen(false); }} 
                                    className="flex items-center gap-2 w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>{t.nav.logout}</span>
                                </button>
                            </div>
                        ) : (
                            <div className="flex flex-col gap-2 pt-1">
                                <Link 
                                    to="/login" 
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                >
                                    {t.nav.login}
                                </Link>
                                <Link 
                                    to="/register" 
                                    onClick={() => setIsOpen(false)}
                                    className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all"
                                >
                                    {t.nav.register}
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
