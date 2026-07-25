import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, HeartPulse, ShieldCheck, Activity, Users, MapPin, HandHeart, Quote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

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
        <div className="py-24 bg-red-50 dark:bg-gray-900 border-t border-red-100 dark:border-gray-800 transition-colors duration-200">
            <RevealOnScroll>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-sm text-red-600 font-bold tracking-wider uppercase mb-3">{t.home.bloodInfo.subTitle}</h2>
                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                            {t.home.bloodInfo.title}
                        </p>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-200">
                        <div className="flex border-b border-gray-100 dark:border-gray-700 flex-wrap">
                            {['guidelines', 'compatibility', 'benefits'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                                        activeTab === tab 
                                            ? 'text-red-600 border-b-2 border-red-600 bg-red-50/50 dark:bg-red-900/20' 
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    {t.home.bloodInfo.tabs[tab]}
                                </button>
                            ))}
                        </div>
                        
                        <div className="p-8 min-h-[250px] flex items-center justify-center">
                            {activeTab === 'guidelines' && (
                                <ul className="space-y-4 animate-fade-in-up w-full">
                                    {t.home.bloodInfo.content.guidelines.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <ShieldCheck className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                            
                            {activeTab === 'compatibility' && (
                                <div className="text-center animate-fade-in-up">
                                    <HeartPulse className="h-16 w-16 text-red-500 mx-auto mb-6" />
                                    <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
                                        {t.home.bloodInfo.content.compatibility}
                                    </p>
                                </div>
                            )}

                            {activeTab === 'benefits' && (
                                <ul className="space-y-4 animate-fade-in-up w-full">
                                    {t.home.bloodInfo.content.benefits.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <Activity className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300 text-lg">{item}</span>
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
    
    return (
        <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 transition-colors duration-200">
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-b from-red-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-200">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-red-100 dark:bg-red-900/20 opacity-50 blur-3xl transition-colors duration-200"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 mb-20 w-64 h-64 rounded-full bg-red-100 dark:bg-red-900/20 opacity-50 blur-3xl transition-colors duration-200"></div>
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pt-32 lg:pb-36 relative z-10">
                        <div className="text-center max-w-3xl mx-auto">
                            <div className="flex justify-center mb-6 animate-fade-in-up">
                                <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl transition-colors duration-200">
                                    <HeartPulse className="h-12 w-12 text-red-600 animate-heartbeat" />
                                </div>
                            </div>
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl animate-fade-in-up-delay transition-colors duration-200">
                                <span className="block mb-2">{t.home.hero.line1}</span>
                                <span className="block text-red-600">{t.home.hero.line2}</span>
                            </h1>
                            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 sm:text-xl max-w-2xl mx-auto animate-fade-in-up-delay-2 transition-colors duration-200">
                                {t.home.hero.desc}
                            </p>
                            
                            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up-delay-2">
                                <Link 
                                    to="/requests" 
                                    className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-xl text-white bg-red-600 hover:bg-red-700 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <Activity className="w-5 h-5 mr-2" />
                                    {t.home.hero.viewRequests}
                                </Link>
                                <Link 
                                    to="/donors" 
                                    className="inline-flex items-center justify-center px-8 py-3.5 border-2 border-red-100 text-base font-semibold rounded-xl text-red-700 bg-white hover:bg-red-50 hover:border-red-200 transition-all duration-200 hover:-translate-y-0.5"
                                >
                                    <Search className="w-5 h-5 mr-2" />
                                    {t.home.hero.findDonor}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <RevealOnScroll>
                    <div className="relative py-20 overflow-hidden">
                        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')" }}></div>
                        <div className="absolute inset-0 bg-red-900/5 mix-blend-multiply"></div>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-red-200">
                                <div className="p-4">
                                    <div className="text-5xl font-extrabold text-red-600 mb-2">
                                        <CountUp end={5000} suffix="+" />
                                    </div>
                                    <div className="text-lg font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200">{t.home.stats.donors}</div>
                                </div>
                                <div className="p-4">
                                    <div className="text-5xl font-extrabold text-red-600 mb-2">
                                        <CountUp end={10000} suffix="+" />
                                    </div>
                                    <div className="text-lg font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200">{t.home.stats.lives}</div>
                                </div>
                                <div className="p-4">
                                    <div className="text-5xl font-extrabold text-red-600 mb-2">
                                        <CountUp end={77} />
                                    </div>
                                    <div className="text-lg font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200">{t.home.stats.districts}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </RevealOnScroll>

                {/* Features Section */}
                <div className="py-24 bg-white dark:bg-gray-900 transition-colors duration-200">
                    <RevealOnScroll>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-2xl mx-auto mb-16">
                                <h2 className="text-sm text-red-600 font-bold tracking-wider uppercase mb-3">{t.home.features.subTitle}</h2>
                                <p className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-200">
                                    {t.home.features.title}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                                <RevealOnScroll delay={100}>
                                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 h-full">
                                        <div className="h-14 w-14 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                            <MapPin className="h-7 w-7" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-200">{t.home.features.districtTitle}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                                            {t.home.features.districtDesc}
                                        </p>
                                    </div>
                                </RevealOnScroll>

                                <RevealOnScroll delay={300}>
                                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 h-full">
                                        <div className="h-14 w-14 rounded-xl bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                                            <ShieldCheck className="h-7 w-7" aria-hidden="true" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 transition-colors duration-200">{t.home.features.contactTitle}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-200">
                                            {t.home.features.contactDesc}
                                        </p>
                                    </div>
                                </RevealOnScroll>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* How it Works Section */}
                <div className="py-24 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-200">
                    <RevealOnScroll>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-center max-w-2xl mx-auto mb-16">
                                <h2 className="text-sm text-red-600 font-bold tracking-wider uppercase mb-3">{t.home.process.subTitle}</h2>
                                <p className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl transition-colors duration-200">
                                    {t.home.process.title}
                                </p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                <RevealOnScroll delay={100}>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/50 rounded-full text-red-600 dark:text-red-400 font-bold text-xl mb-6 shadow-sm transition-colors duration-200">
                                            1
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{t.home.process.step1Title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">{t.home.process.step1Desc}</p>
                                    </div>
                                </RevealOnScroll>
                                <RevealOnScroll delay={300}>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/50 rounded-full text-red-600 dark:text-red-400 font-bold text-xl mb-6 shadow-sm transition-colors duration-200">
                                            2
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{t.home.process.step2Title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">{t.home.process.step2Desc}</p>
                                    </div>
                                </RevealOnScroll>
                                <RevealOnScroll delay={500}>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white dark:bg-gray-800 border-2 border-red-100 dark:border-red-900/50 rounded-full text-red-600 dark:text-red-400 font-bold text-xl mb-6 shadow-sm transition-colors duration-200">
                                            3
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-200">{t.home.process.step3Title}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 transition-colors duration-200">{t.home.process.step3Desc}</p>
                                    </div>
                                </RevealOnScroll>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

                {/* Interactive Blood Information Section */}
                <BloodInfoSection />

                {/* Community / Image Section */}
                <div className="bg-white dark:bg-gray-900 overflow-hidden pb-20 transition-colors duration-200">
                    <RevealOnScroll>
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 border-t border-gray-100 dark:border-gray-800 transition-colors duration-200">
                            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                                <div>
                                    <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl mb-4 transition-colors duration-200">
                                        {t.home.community.title}
                                    </h2>
                                    <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 transition-colors duration-200">
                                        {t.home.community.desc}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link to="/register" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
                                            <Users className="w-5 h-5 mr-2" />
                                            {t.home.community.joinBtn}
                                        </Link>
                                        <Link to="/donors" className="inline-flex items-center justify-center px-6 py-3 border border-gray-200 dark:border-gray-700 text-base font-medium rounded-xl text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                            <HandHeart className="w-5 h-5 mr-2" />
                                            {t.home.community.seeDonorsBtn}
                                        </Link>
                                    </div>
                                </div>
                                <div className="mt-12 lg:mt-0 relative">
                                    <div className="absolute -inset-4 bg-red-50 dark:bg-gray-800 rounded-3xl transform rotate-3 transition-colors duration-200"></div>
                                    <img
                                        className="relative rounded-2xl shadow-xl w-full object-cover"
                                        src="/illustration.png"
                                        alt="Community coming together to help each other"
                                    />
                                </div>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>
            </main>
        </div>
    );
};

export default Home;
