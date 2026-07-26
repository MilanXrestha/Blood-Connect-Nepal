import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, CheckCircle2, XCircle, AlertCircle, Calendar, ArrowRight, RotateCcw, ShieldCheck, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function EligibilityCheck() {
    const { lang } = useLanguage();
    const [step, setStep] = useState(1);
    
    // Form State
    const [formData, setFormData] = useState({
        age: '',
        weight: '',
        donatedRecently: 'no',
        lastDonationDate: '',
        recentTattoo: 'no',
        chronicIllness: 'no',
        antibiotics: 'no',
        bloodGroup: 'O+',
    });

    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const calculateEligibility = (e) => {
        e.preventDefault();
        const reasons = [];
        let isEligible = true;
        let nextEligibleDate = null;

        const ageNum = parseInt(formData.age, 10);
        const weightNum = parseInt(formData.weight, 10);

        if (isNaN(ageNum) || ageNum < 18 || ageNum > 65) {
            isEligible = false;
            reasons.push(lang === 'ne' 
                ? 'रक्तदान गर्न उमेर १८ देखि ६५ वर्षको बीचमा हुनुपर्छ।' 
                : 'Donors must be between 18 and 65 years old.');
        }

        if (isNaN(weightNum) || weightNum < 50) {
            isEligible = false;
            reasons.push(lang === 'ne' 
                ? 'न्यूनतम तौल ५० किलो (kg) हुनु अनिवार्य छ।' 
                : 'Minimum weight requirement is 50 kg (110 lbs).');
        }

        if (formData.donatedRecently === 'yes' && formData.lastDonationDate) {
            const lastDate = new Date(formData.lastDonationDate);
            const today = new Date();
            const diffTime = Math.abs(today - lastDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays < 90) {
                isEligible = false;
                const nextDateObj = new Date(lastDate);
                nextDateObj.setDate(lastDate.getDate() + 90);
                nextEligibleDate = nextDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
                reasons.push(lang === 'ne'
                    ? `दुई रक्तदानको बीचमा कम्तीमा ९० दिनको अन्तर हुनुपर्छ। तपाईंको अर्को योग्य मिति ${nextEligibleDate} हो।`
                    : `Mandatory 90-day gap required between whole blood donations. You will be eligible on ${nextEligibleDate}.`);
            }
        }

        if (formData.recentTattoo === 'yes') {
            isEligible = false;
            reasons.push(lang === 'ne'
                ? 'टाटु खोपेको वा सर्जरी गरेको ६ महिनासम्म रक्तदान गर्न मिल्दैन।'
                : 'Must wait 6 months after getting a tattoo, piercing, or major surgery.');
        }

        if (formData.chronicIllness === 'yes' || formData.antibiotics === 'yes') {
            isEligible = false;
            reasons.push(lang === 'ne'
                ? 'एन्टिबायोटिक सेवन वा गम्भीर संक्रमण भएको अवस्थामा रक्तदान गर्न निषेध छ।'
                : 'Cannot donate while taking antibiotics or experiencing chronic infectious symptoms.');
        }

        setResult({ isEligible, reasons, nextEligibleDate });
        setStep(4);
    };

    const resetQuiz = () => {
        setFormData({
            age: '',
            weight: '',
            donatedRecently: 'no',
            lastDonationDate: '',
            recentTattoo: 'no',
            chronicIllness: 'no',
            antibiotics: 'no',
            bloodGroup: 'O+',
        });
        setResult(null);
        setStep(1);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/40 rounded-2xl text-red-600 dark:text-red-400 mb-4 shadow-sm">
                        <HeartPulse className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl transition-colors">
                        {lang === 'ne' ? 'रक्तदान योग्यता जाँच (Health Quiz)' : 'Donation Eligibility Calculator'}
                    </h1>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                        {lang === 'ne'
                            ? 'के तपाईं आज रक्तदान गर्न योग्य हुनुहुन्छ? १ मिनेटमा आफ्नो स्वास्थ्य मापदण्ड जाँच गर्नुहोस्।'
                            : 'Check if you meet Nepal Red Cross Society medical guidelines to donate blood today.'}
                    </p>
                </div>

                {/* Progress Bar */}
                {step < 4 && (
                    <div className="mb-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                            <span>{lang === 'ne' ? `चरण ${step} / ३` : `Step ${step} of 3`}</span>
                            <span>{step === 1 ? 'Basic Info' : step === 2 ? 'Donation History' : 'Medical Check'}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-700 h-2.5 rounded-full overflow-hidden">
                            <div 
                                className="bg-red-600 h-full rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${(step / 3) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                )}

                {/* Quiz Card */}
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700/80 p-6 sm:p-10 transition-all duration-300">
                    <form onSubmit={calculateEligibility}>
                        {/* Step 1: Basic Info */}
                        {step === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-4 border-gray-100 dark:border-gray-700">
                                    <ShieldCheck className="w-5 h-5 text-red-600" />
                                    {lang === 'ne' ? 'आधारभूत विवरण' : 'Step 1: Basic Physical Requirements'}
                                </h2>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        {lang === 'ne' ? 'तपाईंको उमेर (वर्षमा)' : 'Your Age (in Years)'}
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        required
                                        min="1"
                                        max="100"
                                        placeholder="e.g. 24"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                                        {lang === 'ne' ? 'नेपाल रेडक्रस मापदण्ड अनुसार १८ देखि ६५ वर्ष' : 'Must be between 18 and 65 years'}
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        {lang === 'ne' ? 'तपाईंको तौल (किलो - Kg मा)' : 'Your Weight (in kg)'}
                                    </label>
                                    <input
                                        type="number"
                                        name="weight"
                                        required
                                        min="1"
                                        max="250"
                                        placeholder="e.g. 62"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all"
                                    />
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                                        {lang === 'ne' ? 'कम्तीमा ५० किलो हुनु आवश्यक' : 'Minimum requirement is 50 kg (110 lbs)'}
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                        {lang === 'ne' ? 'रक्त समूह' : 'Your Blood Group'}
                                    </label>
                                    <select
                                        name="bloodGroup"
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-red-500 outline-none transition-all"
                                    >
                                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                                            <option key={bg} value={bg}>{bg}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="button"
                                    disabled={!formData.age || !formData.weight}
                                    onClick={() => setStep(2)}
                                    className="w-full mt-6 py-3.5 px-6 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                                >
                                    {lang === 'ne' ? 'अर्को चरण' : 'Next Step'} <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        )}

                        {/* Step 2: Donation History */}
                        {step === 2 && (
                            <div className="space-y-6 animate-fadeIn">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-4 border-gray-100 dark:border-gray-700">
                                    <Calendar className="w-5 h-5 text-red-600" />
                                    {lang === 'ne' ? 'रक्तदान इतिहास' : 'Step 2: Recent Donation History'}
                                </h2>

                                <div>
                                    <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                        {lang === 'ne' 
                                            ? 'के तपाईंले पछिल्लो ९० दिन (३ महिना) भित्र रक्तदान गर्नुभएको छ?' 
                                            : 'Have you donated whole blood in the past 90 days (3 months)?'}
                                    </label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, donatedRecently: 'no' }))}
                                            className={`p-4 rounded-2xl border-2 font-bold transition-all ${
                                                formData.donatedRecently === 'no'
                                                    ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 shadow-md'
                                                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400'
                                            }`}
                                        >
                                            {lang === 'ne' ? 'छैन (No)' : 'No, I have not'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setFormData(p => ({ ...p, donatedRecently: 'yes' }))}
                                            className={`p-4 rounded-2xl border-2 font-bold transition-all ${
                                                formData.donatedRecently === 'yes'
                                                    ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 shadow-md'
                                                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400'
                                            }`}
                                        >
                                            {lang === 'ne' ? 'गरेको छु (Yes)' : 'Yes, I donated recently'}
                                        </button>
                                    </div>
                                </div>

                                {formData.donatedRecently === 'yes' && (
                                    <div className="p-4 rounded-2xl bg-red-50/50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
                                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                            {lang === 'ne' ? 'पछिल्लो पटक रक्तदान गरेको मिति' : 'Select exact date of last donation:'}
                                        </label>
                                        <input
                                            type="date"
                                            name="lastDonationDate"
                                            required
                                            value={formData.lastDonationDate}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none"
                                        />
                                    </div>
                                )}

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-1/3 py-3.5 px-4 rounded-xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all"
                                    >
                                        {lang === 'ne' ? 'पछाडि' : 'Back'}
                                    </button>
                                    <button
                                        type="button"
                                        disabled={formData.donatedRecently === 'yes' && !formData.lastDonationDate}
                                        onClick={() => setStep(3)}
                                        className="w-2/3 py-3.5 px-6 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 disabled:opacity-50 transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                                    >
                                        {lang === 'ne' ? 'अर्को चरण' : 'Next Step'} <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Medical Check */}
                        {step === 3 && (
                            <div className="space-y-6 animate-fadeIn">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 border-b pb-4 border-gray-100 dark:border-gray-700">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    {lang === 'ne' ? 'चिकित्सा सुरक्षा जाँच' : 'Step 3: Medical & Health Screening'}
                                </h2>

                                <div className="space-y-5">
                                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                            {lang === 'ne' 
                                                ? '१. पछिल्लो ६ महिनाभित्र टाटु खोपेको, पियर्सिङ गरेको वा ठूलो शल्यक्रिया भएको छ?' 
                                                : '1. Have you had a tattoo, skin piercing, or major surgery in the last 6 months?'}
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['no', 'yes'].map((val) => (
                                                <button
                                                    key={val}
                                                    type="button"
                                                    onClick={() => setFormData(p => ({ ...p, recentTattoo: val }))}
                                                    className={`py-2.5 rounded-xl border font-bold text-sm transition-all ${
                                                        formData.recentTattoo === val
                                                            ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                                                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                                    }`}
                                                >
                                                    {val === 'no' ? (lang === 'ne' ? 'छैन (No)' : 'No') : (lang === 'ne' ? 'छ (Yes)' : 'Yes')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700">
                                        <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
                                            {lang === 'ne' 
                                                ? '२. के तपाईं हाल कुनै गम्भीर संक्रमण वा एन्टिबायोटिक औषधि सेवन गर्दै हुनुहुन्छ?' 
                                                : '2. Are you currently taking antibiotics or experiencing infectious illness symptoms?'}
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {['no', 'yes'].map((val) => (
                                                <button
                                                    key={val}
                                                    type="button"
                                                    onClick={() => setFormData(p => ({ ...p, antibiotics: val }))}
                                                    className={`py-2.5 rounded-xl border font-bold text-sm transition-all ${
                                                        formData.antibiotics === val
                                                            ? 'border-red-600 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400'
                                                            : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                                                    }`}
                                                >
                                                    {val === 'no' ? (lang === 'ne' ? 'छैन (No)' : 'No') : (lang === 'ne' ? 'छ (Yes)' : 'Yes')}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setStep(2)}
                                        className="w-1/3 py-3.5 px-4 rounded-xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all"
                                    >
                                        {lang === 'ne' ? 'पछाडि' : 'Back'}
                                    </button>
                                    <button
                                        type="submit"
                                        className="w-2/3 py-3.5 px-6 rounded-xl text-white font-bold bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                                    >
                                        <Award className="w-5 h-5" />
                                        {lang === 'ne' ? 'योग्यता नतिजा हेर्नुहोस्' : 'Check Eligibility Result'}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Step 4: Results */}
                        {step === 4 && result && (
                            <div className="text-center space-y-6 animate-fadeIn py-4">
                                {result.isEligible ? (
                                    <div className="space-y-6">
                                        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <div>
                                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {lang === 'ne' ? 'प्रमाणित योग्य' : 'Certified Eligible'}
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-3">
                                                {lang === 'ne' ? 'बधाई छ! तपाईं आज रक्तदान गर्न योग्य हुनुहुन्छ।' : 'Congratulations! You Are Eligible to Donate Today!'}
                                            </h2>
                                            <p className="text-gray-600 dark:text-gray-300 mt-2 max-w-lg mx-auto">
                                                {lang === 'ne'
                                                    ? `तपाईंको रक्त समूह (${formData.bloodGroup}) नेपालका विभिन्न अस्पतालहरूमा आवश्यक हुन सक्छ। आजै कसैको जीवन बचाउनुहोस्!`
                                                    : `Your blood group (${formData.bloodGroup}) is high in demand across hospital emergency rooms in Nepal. Your 1 unit can save up to 3 lives!`}
                                            </p>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-100 dark:border-gray-700 text-left space-y-3">
                                            <h4 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4 text-green-500" />
                                                {lang === 'ne' ? 'रक्तदान पूर्व तयारी सुझावहरू:' : 'Pre-Donation Preparation Tips:'}
                                            </h4>
                                            <ul className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 space-y-1.5 list-disc pl-5">
                                                <li>{lang === 'ne' ? 'रक्तदान गर्नुअघि प्रशस्त पानी वा झोल पदार्थ पिउनुहोस्।' : 'Drink an extra 500ml of water before donating.'}</li>
                                                <li>{lang === 'ne' ? 'आइरन युक्त पौष्टिक खाना खानुहोस् (खाली पेट नजानुहोस्)।' : 'Eat a healthy meal high in iron; never donate on an empty stomach.'}</li>
                                                <li>{lang === 'ne' ? 'राम्रोसँग निन्द्रा पूरा भएको हुनुपर्छ।' : 'Ensure you had at least 6-8 hours of good sleep.'}</li>
                                            </ul>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <Link
                                                to={`/requests?blood_group=${encodeURIComponent(formData.bloodGroup)}`}
                                                className="flex-1 py-4 px-6 rounded-xl text-white font-extrabold bg-red-600 hover:bg-red-700 transition-all shadow-lg shadow-red-500/25 flex items-center justify-center gap-2"
                                            >
                                                <HeartPulse className="w-5 h-5" />
                                                {lang === 'ne' ? `${formData.bloodGroup} का आपत्कालीन अनुरोधहरू हेर्नुहोस्` : `View Urgent ${formData.bloodGroup} Requests`}
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={resetQuiz}
                                                className="py-4 px-6 rounded-xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                                {lang === 'ne' ? 'पुनः जाँच गर्नुहोस्' : 'Check Another'}
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="w-20 h-20 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                                            <XCircle className="w-12 h-12" />
                                        </div>
                                        <div>
                                            <span className="px-3 py-1 bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 rounded-full text-xs font-bold uppercase tracking-wider">
                                                {lang === 'ne' ? 'हाल अयोग्य' : 'Currently Ineligible'}
                                            </span>
                                            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mt-3">
                                                {lang === 'ne' ? 'तपाईं हाल रक्तदान गर्न अयोग्य हुनुहुन्छ' : 'You Are Temporarily Ineligible to Donate'}
                                            </h2>
                                            {result.nextEligibleDate && (
                                                <p className="text-base font-bold text-amber-600 dark:text-amber-400 mt-2">
                                                    📅 Next Eligible Date: {result.nextEligibleDate}
                                                </p>
                                            )}
                                        </div>

                                        <div className="p-6 rounded-2xl bg-red-50/50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 text-left space-y-3">
                                            <h4 className="font-bold text-red-800 dark:text-red-300 text-sm flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" />
                                                {lang === 'ne' ? 'अयोग्य हुनुका कारणहरू:' : 'Medical Reasons for Ineligibility:'}
                                            </h4>
                                            <ul className="text-xs sm:text-sm text-red-700 dark:text-red-300 space-y-2 list-disc pl-5 font-medium">
                                                {result.reasons.map((reason, idx) => (
                                                    <li key={idx}>{reason}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            {lang === 'ne'
                                                ? 'रक्तदान गर्न नमिल्ने भए पनि तपाईं आपत्कालीन सन्देश सेयर गरेर अरूको ज्यान बचाउन सहयोग गर्न सक्नुहुन्छ!'
                                                : "Even if you can't donate today, you can still save lives by sharing urgent requests on social media!"}
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                            <Link
                                                to="/requests"
                                                className="flex-1 py-4 px-6 rounded-xl text-white font-extrabold bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 transition-all shadow-md flex items-center justify-center gap-2"
                                            >
                                                {lang === 'ne' ? 'अनुरोधहरू सेयर गरेर सहयोग गर्नुहोस्' : 'Share Urgent Requests Instead'}
                                            </Link>
                                            <button
                                                type="button"
                                                onClick={resetQuiz}
                                                className="py-4 px-6 rounded-xl font-bold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                                {lang === 'ne' ? 'पुनः जाँच गर्नुहोस्' : 'Check Another'}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}
