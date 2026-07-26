import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, HeartPulse, ShieldCheck, Activity, Users, MapPin, HandHeart, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import BloodStockChart from '../components/BloodStockChart';
import Leaderboard from '../components/Leaderboard';
import BloodCompatibilityMatrix from '../components/BloodCompatibilityMatrix';


const RevealOnScroll = ({ children, delay = 0 }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
                rootMargin: "50px",
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
    const { lang } = useLanguage();
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }, [isVisible, end, duration]);

    const toNepaliDigits = (numStr) => {
        const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
        return numStr.replace(/\d/g, (d) => nepaliDigits[d]);
    };

    let displayStr = count.toLocaleString('en-US');
    if (lang === 'ne') {
        displayStr = toNepaliDigits(displayStr);
    }

    return <span ref={ref}>{displayStr}{suffix}</span>;
};

const BloodInfoSection = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState('guidelines');

    return (
        <div className="py-20 bg-gray-50/50 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-800 transition-colors">
            <RevealOnScroll>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                            {t.home.bloodInfo.title}
                        </h2>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden transition-colors">
                        <div className="flex border-b border-gray-100 dark:border-gray-800 flex-wrap">
                            {['guidelines', 'compatibility', 'benefits'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-4 px-6 text-center font-medium text-sm transition-colors ${
                                        activeTab === tab 
                                            ? 'text-red-600 dark:text-red-400 border-b-2 border-red-600 dark:border-red-400 bg-gray-50 dark:bg-gray-800/50 font-semibold' 
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50/50 dark:hover:bg-gray-800/30'
                                    }`}
                                >
                                    {t.home.bloodInfo.tabs[tab]}
                                </button>
                            ))}
                        </div>
                        
                        <div className="p-8 min-h-[220px] flex items-center justify-center">
                            {activeTab === 'guidelines' && (
                                <ul className="space-y-4 animate-fade-in-up w-full">
                                    {t.home.bloodInfo.content.guidelines.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <ShieldCheck className="h-5 w-5 text-emerald-500 mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            
                            {activeTab === 'compatibility' && (
                                <div className="text-center animate-fade-in-up max-w-xl mx-auto py-4">
                                    <p className="text-base font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {t.home.bloodInfo.content.compatibility}
                                    </p>
                                </div>
                            )}

                            {activeTab === 'benefits' && (
                                <ul className="space-y-4 animate-fade-in-up w-full">
                                    {t.home.bloodInfo.content.benefits.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <Activity className="h-5 w-5 text-red-500 mr-3 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </RevealOnScroll>
        </div>
    );
};

const Home = () => {
    const { t } = useLanguage();
    const [stats, setStats] = useState({
        total_donors: 5000,
        lives_impacted: 10000,
        districts_covered: 77
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/analytics/');
                if (res.data && res.data.overview) {
                    setStats({
                        total_donors: res.data.overview.total_donors || 5000,
                        lives_impacted: res.data.overview.lives_impacted || 10000,
                        districts_covered: res.data.overview.districts_covered || 77
                    });
                }
            } catch (err) {
                console.error("Error fetching homepage stats:", err);
            }
        };
        fetchStats();
    }, []);

    
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-950 transition-colors">
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800/80 transition-colors">
                    {/* Background Medical Illustration with Gradient Fade */}
                    <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <img 
                            src="/hero_bg.png" 
                            alt="Medical & Blood Donation Background" 
                            className="w-full h-full object-cover object-right lg:object-center opacity-35 dark:opacity-20 scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent dark:from-gray-950 dark:via-gray-950/85 dark:to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-gray-950 dark:via-transparent dark:to-transparent" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-32">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-tight">
                                <span className="block">{t.home.hero.line1}</span>
                                <span className="block text-red-600 dark:text-red-500 mt-1">{t.home.hero.line2}</span>
                            </h1>
                            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                                {t.home.hero.desc}
                            </p>
                            
                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Link 
                                    to="/requests" 
                                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-semibold rounded-lg text-white bg-red-600 hover:bg-red-700 transition-colors shadow-sm"
                                >
                                    <Activity className="w-4 h-4 mr-2" />
                                    {t.home.hero.viewRequests}
                                </Link>
                                <Link 
                                    to="/donors" 
                                    className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-700 text-sm font-semibold rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                >
                                    <Search className="w-4 h-4 mr-2" />
                                    {t.home.hero.findDonor}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/40 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-200 dark:divide-gray-800 text-left">
                            <div className="md:pr-8 pt-4 md:pt-0 first:pt-0">
                                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-gray-900 dark:text-white">
                                    <CountUp end={stats.total_donors} suffix="+" />
                                </div>
                                <div className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{t.home.stats.donors}</div>
                            </div>
                            <div className="md:px-8 pt-4 md:pt-0">
                                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-gray-900 dark:text-white">
                                    <CountUp end={stats.lives_impacted} suffix="+" />
                                </div>
                                <div className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{t.home.stats.lives}</div>
                            </div>
                            <div className="md:pl-8 pt-4 md:pt-0">
                                <div className="text-3xl sm:text-4xl font-bold font-mono tracking-tight text-gray-900 dark:text-white">
                                    <CountUp end={stats.districts_covered} />
                                </div>
                                <div className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{t.home.stats.districts}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Live Blood Inventory Feed */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <BloodStockChart />
                </div>

                {/* Top Donors Leaderboard */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <Leaderboard />
                </div>

                {/* Features Section */}
                <div className="py-20 bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-xl mb-12">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                                {t.home.features.title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center mb-4">
                                    <MapPin className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.home.features.districtTitle}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.home.features.districtDesc}
                                </p>
                            </div>

                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl transition-colors">
                                <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex items-center justify-center mb-4">
                                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{t.home.features.contactTitle}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {t.home.features.contactDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* How it Works Section */}
                <div className="py-20 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="max-w-xl mb-12">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                                {t.home.process.title}
                            </h2>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
                                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                                    01
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{t.home.process.step1Title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t.home.process.step1Desc}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
                                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                                    02
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{t.home.process.step2Title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t.home.process.step2Desc}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 rounded-xl">
                                <div className="w-8 h-8 rounded bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-mono font-bold text-sm flex items-center justify-center mb-4">
                                    03
                                </div>
                                <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{t.home.process.step3Title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t.home.process.step3Desc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Interactive Blood Information Section */}
                <BloodInfoSection />

                {/* Blood Compatibility Matrix & Medical Fun Facts */}
                <BloodCompatibilityMatrix />

                {/* Community / Image Section */}
                <div className="bg-white dark:bg-gray-950 py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800 transition-colors">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl mb-4">
                                    {t.home.community.title}
                                </h2>
                                <p className="text-base text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                                    {t.home.community.desc}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link to="/register" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 transition-colors">
                                        <Users className="w-4 h-4 mr-2" />
                                        {t.home.community.joinBtn}
                                    </Link>
                                    <Link to="/donors" className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg text-sm font-semibold border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 hover:bg-gray-50 transition-colors">
                                        <HandHeart className="w-4 h-4 mr-2" />
                                        {t.home.community.seeDonorsBtn}
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-10 lg:mt-0">
                                <img
                                    className="rounded-xl border border-gray-200 dark:border-gray-800 w-full object-cover shadow-sm"
                                    src="/illustration.png"
                                    alt="Community coming together"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};


export default Home;
