import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building2, MapPin, Phone, Clock, Search, ShieldCheck, Navigation, ExternalLink, Filter } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BloodBanks() {
    const { lang } = useLanguage();
    const [bloodBanks, setBloodBanks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [only24Hours, setOnly24Hours] = useState(false);

    const districts = [
        'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 
        'Dharan', 'Biratnagar', 'Butwal', 'Nepalgunj', 'Birgunj'
    ];

    useEffect(() => {
        const fetchBloodBanks = async () => {
            setLoading(true);
            try {
                let url = 'http://127.0.0.1:8000/api/blood-banks/';
                const params = new URLSearchParams();
                if (searchTerm) params.append('search', searchTerm);
                if (selectedDistrict) params.append('district', selectedDistrict);
                if (only24Hours) params.append('is_24_hours', 'true');

                if (params.toString()) {
                    url += `?${params.toString()}`;
                }

                const response = await axios.get(url);
                setBloodBanks(response.data.results || response.data || []);
            } catch (error) {
                console.error("Error fetching blood banks:", error);
                // Fallback static demo data if server offline
                setBloodBanks([
                    {
                        id: 1,
                        name: "Nepal Red Cross Society Central Blood Transfusion Service",
                        district: "Kathmandu",
                        address: "Exhibition Road, Bhrikutimandap, Kathmandu",
                        phone: "01-4225344",
                        emergency_contact: "9801025344",
                        operating_hours: "24/7 Emergency Service",
                        is_24_hours: true
                    },
                    {
                        id: 2,
                        name: "Tribhuvan University Teaching Hospital (TUTH) Blood Bank",
                        district: "Kathmandu",
                        address: "Maharajgunj, Kathmandu",
                        phone: "01-4412404",
                        emergency_contact: "01-4412404 (Ext: 125)",
                        operating_hours: "24/7 Emergency Service",
                        is_24_hours: true
                    },
                    {
                        id: 3,
                        name: "Patan Hospital Blood Bank (Red Cross)",
                        district: "Lalitpur",
                        address: "Lagankhel, Lalitpur",
                        phone: "01-5522266",
                        emergency_contact: "9841234567",
                        operating_hours: "24/7 Emergency Service",
                        is_24_hours: true
                    },
                    {
                        id: 4,
                        name: "Pokhara Regional Red Cross Blood Transfusion Service",
                        district: "Pokhara",
                        address: "Ramghat, Pokhara",
                        phone: "061-521091",
                        emergency_contact: "061-521091",
                        operating_hours: "24/7 Emergency Service",
                        is_24_hours: true
                    },
                    {
                        id: 5,
                        name: "Chitwan Red Cross Blood Bank",
                        district: "Chitwan",
                        address: "Bharatpur-10, Chitwan",
                        phone: "056-521199",
                        emergency_contact: "056-521199",
                        operating_hours: "24/7 Emergency Service",
                        is_24_hours: true
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchBloodBanks();
    }, [searchTerm, selectedDistrict, only24Hours]);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wider mb-3">
                        <Building2 className="w-4 h-4" />
                        {lang === 'ne' ? 'प्रमाणित केन्द्रहरू' : 'Verified Transfusion Centers'}
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
                        {lang === 'ne' ? 'नेपालका रक्तसञ्चार केन्द्रहरू (Blood Banks)' : 'National Directory of Blood Banks in Nepal'}
                    </h1>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                        {lang === 'ne'
                            ? 'नेपाल रेडक्रस सोसाइटी र प्रमुख अस्पतालद्वारा सञ्चालित २४/७ आपत्कालीन रक्त केन्द्रहरूको सम्पर्क फोन नम्बर र ठेगाना।'
                            : 'Direct contact numbers, operating hours, and locations for Nepal Red Cross Society and major hospital transfusion centers.'}
                    </p>
                </div>

                {/* Search and Filters Bar */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md border border-gray-100 dark:border-gray-700 p-4 sm:p-6 mb-10 transition-all">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        {/* Search Input */}
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder={lang === 'ne' ? 'केन्द्रको नाम वा ठेगाना खोज्नुहोस्...' : 'Search blood bank by name or address...'}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
                            />
                        </div>

                        {/* District Dropdown */}
                        <div>
                            <select
                                value={selectedDistrict}
                                onChange={(e) => setSelectedDistrict(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm font-medium"
                            >
                                <option value="">{lang === 'ne' ? 'सबै जिल्लाहरू (All Districts)' : 'All Districts'}</option>
                                {districts.map((dist) => (
                                    <option key={dist} value={dist}>{dist}</option>
                                ))}
                            </select>
                        </div>

                        {/* 24/7 Filter */}
                        <div className="flex items-center justify-between md:justify-end gap-3 px-2">
                            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <input
                                    type="checkbox"
                                    checked={only24Hours}
                                    onChange={(e) => setOnly24Hours(e.target.checked)}
                                    className="w-5 h-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4 text-green-500" />
                                    {lang === 'ne' ? '२४ घण्टा खुला मात्र' : '24/7 Emergency Service Only'}
                                </span>
                            </label>

                            {(searchTerm || selectedDistrict || only24Hours) && (
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedDistrict(''); setOnly24Hours(false); }}
                                    className="text-xs text-red-600 dark:text-red-400 font-bold hover:underline"
                                >
                                    {lang === 'ne' ? 'फिल्टर हटाउनुहोस्' : 'Reset'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Blood Banks Grid */}
                {loading ? (
                    <div className="h-64 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                    </div>
                ) : bloodBanks.length === 0 ? (
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-md border border-gray-100 dark:border-gray-700">
                        <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-bounce" />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {lang === 'ne' ? 'कुनै रक्त केन्द्र फेला परेन' : 'No Blood Banks Found'}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-md mx-auto">
                            {lang === 'ne' ? 'कृपया अन्य जिल्ला वा खोजी शब्द प्रयास गर्नुहोस्।' : 'We could not find any transfusion center matching your filter criteria. Try resetting filters.'}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {bloodBanks.map((bank) => (
                            <div
                                key={bank.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl border border-gray-100 dark:border-gray-700/80 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
                            >
                                <div>
                                    {/* Badges */}
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-bold">
                                            <ShieldCheck className="w-3.5 h-3.5" />
                                            {lang === 'ne' ? 'नेपाल रेडक्रस / प्रमाणित' : 'Verified Center'}
                                        </span>
                                        <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-semibold">
                                            📍 {bank.district}
                                        </span>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-lg font-extrabold text-gray-900 dark:text-white leading-snug mb-3">
                                        {bank.name}
                                    </h3>

                                    {/* Details */}
                                    <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300 mb-6">
                                        <div className="flex items-start gap-2.5">
                                            <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                                            <span>{bank.address}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5 font-semibold text-gray-900 dark:text-white">
                                            <Phone className="w-4 h-4 text-red-500 shrink-0" />
                                            <span>{bank.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2.5">
                                            <Clock className="w-4 h-4 text-green-500 shrink-0" />
                                            <span className="font-medium text-green-600 dark:text-green-400">{bank.operating_hours}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/80">
                                    <a
                                        href={`tel:${bank.emergency_contact || bank.phone}`}
                                        className="py-2.5 px-4 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm hover:shadow"
                                    >
                                        <Phone className="w-3.5 h-3.5 fill-current" />
                                        {lang === 'ne' ? 'फोन गर्नुहोस्' : 'Call Now'}
                                    </a>
                                    <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bank.name + " " + bank.address)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="py-2.5 px-4 rounded-xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all text-xs flex items-center justify-center gap-1.5"
                                    >
                                        <Navigation className="w-3.5 h-3.5" />
                                        {lang === 'ne' ? 'म्याप हेर्नुहोस्' : 'Google Maps'}
                                        <ExternalLink className="w-3 h-3 ml-0.5 opacity-70" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
