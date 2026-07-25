import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Droplet, Menu, X, User as UserIcon, Languages, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useState } from 'react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { lang, toggleLanguage, t } = useLanguage();
    const { theme, toggleTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-red-600 text-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                            <Droplet className="h-6 w-6 text-white fill-current" />
                            <span>{t.nav.title}</span>
                        </Link>
                    </div>
                    
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            <Link to="/donors" className="hover:bg-red-700 px-3 py-2 rounded-md font-medium">{t.nav.findDonors}</Link>
                            <Link to="/requests" className="hover:bg-red-700 px-3 py-2 rounded-md font-medium">{t.nav.urgentRequests}</Link>
                            
                            {user ? (
                                <div className="flex items-center space-x-4 ml-4">
                                    <Link to="/profile" className="flex items-center gap-1 hover:bg-red-700 px-3 py-2 rounded-md font-medium">
                                        <UserIcon className="h-4 w-4" />
                                        {t.nav.profile}
                                    </Link>
                                    <button onClick={logout} className="bg-red-700 hover:bg-red-800 px-3 py-2 rounded-md font-medium">
                                        {t.nav.logout}
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4 ml-4">
                                    <Link to="/login" className="hover:bg-red-700 px-3 py-2 rounded-md font-medium">{t.nav.login}</Link>
                                    <Link to="/register" className="bg-white text-red-600 hover:bg-gray-100 px-4 py-2 rounded-md font-medium shadow-sm">{t.nav.register}</Link>
                                </div>
                            )}
                            <button onClick={toggleTheme} className="ml-4 hover:bg-red-700 p-2 rounded-md transition-colors border border-transparent" aria-label="Toggle Dark Mode">
                                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>

                            <button onClick={toggleLanguage} className="ml-2 flex items-center gap-2 hover:bg-red-700 px-3 py-2 rounded-md font-medium border border-red-400 transition-colors">
                                {lang === 'en' ? (
                                    <>
                                        <span className="text-3xl leading-none" role="img" aria-label="Nepal Flag">🇳🇵</span>
                                        <span>NE</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-3xl leading-none" role="img" aria-label="US Flag">🇺🇸</span>
                                        <span>EN</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                    
                    <div className="md:hidden flex items-center gap-2">
                        <button onClick={toggleTheme} className="hover:bg-red-700 p-1.5 rounded-md transition-colors" aria-label="Toggle Dark Mode">
                            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                        </button>
                        <button onClick={toggleLanguage} className="hover:bg-red-700 px-3 py-1.5 rounded-md border border-red-400 text-sm flex items-center gap-1.5 transition-colors">
                                {lang === 'en' ? (
                                    <>
                                        <span className="text-3xl leading-none" role="img" aria-label="Nepal Flag">🇳🇵</span>
                                        <span>NE</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-3xl leading-none" role="img" aria-label="US Flag">🇺🇸</span>
                                        <span>EN</span>
                                    </>
                                )}
                        </button>
                        <button onClick={() => setIsOpen(!isOpen)} className="hover:bg-red-700 p-2 rounded-md">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/donors" className="hover:bg-red-700 block px-3 py-2 rounded-md font-medium">{t.nav.findDonors}</Link>
                        <Link to="/requests" className="hover:bg-red-700 block px-3 py-2 rounded-md font-medium">{t.nav.urgentRequests}</Link>
                        {user ? (
                            <>
                                <Link to="/profile" className="hover:bg-red-700 block px-3 py-2 rounded-md font-medium">{t.nav.profile}</Link>
                                <button onClick={logout} className="hover:bg-red-700 block w-full text-left px-3 py-2 rounded-md font-medium">{t.nav.logout}</button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hover:bg-red-700 block px-3 py-2 rounded-md font-medium">{t.nav.login}</Link>
                                <Link to="/register" className="bg-white text-red-600 block px-3 py-2 rounded-md font-medium mt-2 text-center">{t.nav.register}</Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
