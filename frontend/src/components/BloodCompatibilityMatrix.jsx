import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HeartPulse, Check, Sparkles, Activity, Clock, Droplet } from 'lucide-react';

const compatibilityData = [
    {
        group: 'O-',
        donateTo: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
        receiveFrom: ['O-'],
        tagEn: 'Universal Donor',
        tagNe: 'सर्वमान्य रक्तदाता',
        descEn: 'Can be transfused to almost any patient in trauma or emergency situations.',
        descNe: 'आपतकालीन वा दुर्घटनाको अवस्थामा जोसुकै बिरामीलाई दिन सकिन्छ।'
    },
    {
        group: 'O+',
        donateTo: ['O+', 'A+', 'B+', 'AB+'],
        receiveFrom: ['O-', 'O+'],
        tagEn: 'Most Common',
        tagNe: 'सबैभन्दा सामान्य',
        descEn: 'In high demand due to being the most common blood group in the general population.',
        descNe: 'जनसंख्यामा सबैभन्दा धेरै पाइने भएकोले अत्यधिक माग हुने गर्दछ।'
    },
    {
        group: 'A-',
        donateTo: ['A-', 'A+', 'AB-', 'AB+'],
        receiveFrom: ['O-', 'A-'],
        tagEn: 'Rare & Vital',
        tagNe: 'दुर्लभ र महत्त्वपूर्ण',
        descEn: 'Can donate to any A or AB blood type regardless of Rh factor.',
        descNe: 'Rh तत्वको पर्वाह नगरी कुनै पनि A वा AB समूहलाई दिन सकिन्छ।'
    },
    {
        group: 'A+',
        donateTo: ['A+', 'AB+'],
        receiveFrom: ['O-', 'O+', 'A-', 'A+'],
        tagEn: 'High Demand',
        tagNe: 'उच्च माग',
        descEn: 'Second most common blood type; critical for routine surgeries and oncology.',
        descNe: 'दोस्रो सबैभन्दा सामान्य रक्त समूह; नियमित शल्यक्रियाहरूका लागि अति आवश्यक।'
    },
    {
        group: 'B-',
        donateTo: ['B-', 'B+', 'AB-', 'AB+'],
        receiveFrom: ['O-', 'B-'],
        tagEn: 'Rare Type',
        tagNe: 'दुर्लभ समूह',
        descEn: 'Found in less than 2% of the population, making steady donors essential.',
        descNe: '२% भन्दा कम जनसंख्यामा पाइने भएकोले नियमित दाताहरू अत्यन्त आवश्यक।'
    },
    {
        group: 'B+',
        donateTo: ['B+', 'AB+'],
        receiveFrom: ['O-', 'O+', 'B-', 'B+'],
        tagEn: 'Common in Asia',
        tagNe: 'नेपालमा प्रचलित',
        descEn: 'One of the most widespread blood groups across South Asia and Nepal.',
        descNe: 'नेपाल र दक्षिण एसियामा सबैभन्दा बढी पाइने रक्त समूहहरू मध्ये एक।'
    },
    {
        group: 'AB-',
        donateTo: ['AB-', 'AB+'],
        receiveFrom: ['O-', 'A-', 'B-', 'AB-'],
        tagEn: 'Rarest Group',
        tagNe: 'सबैभन्दा दुर्लभ',
        descEn: 'Universal plasma donor; plasma can be given to anyone regardless of blood type.',
        descNe: 'सर्वमान्य प्लाज्मा दाता; यसको प्लाज्मा जोसुकैलाई पनि दिन सकिन्छ।'
    },
    {
        group: 'AB+',
        donateTo: ['AB+'],
        receiveFrom: ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'],
        tagEn: 'Universal Recipient',
        tagNe: 'सर्वमान्य प्राप्तकर्ता',
        descEn: 'Can safely receive red blood cells from any of the 8 major blood groups.',
        descNe: '८ वटै मुख्य रक्त समूहहरूबाट सुरक्षित रूपमा रातो रक्त कोष प्राप्त गर्न सक्छ।'
    },
];

const funFactsEn = [
    {
        title: "1 Donation = 3 Lives Saved",
        desc: "A single 450ml donation can be separated into red blood cells, plasma, and platelets, treating up to three different patients in intensive care.",
        icon: HeartPulse,
        badge: "Clinical Impact"
    },
    {
        title: "Every 2 Seconds",
        desc: "Someone in hospital care requires blood or platelets every two seconds. In Nepal, childbirth complications and trauma care rely heavily on rapid supply.",
        icon: Clock,
        badge: "Critical Need"
    },
    {
        title: "120-Day Cellular Lifecycle",
        desc: "Red blood cells naturally live for approximately 120 days in your circulatory system. Regular donation stimulates bone marrow to produce fresh, energetic cells.",
        icon: Activity,
        badge: "Human Biology"
    },
    {
        title: "7-8% of Body Weight",
        desc: "Blood accounts for roughly 7-8% of your total body weight. After donating, your body replenishes the donated fluid volume within just 24 to 48 hours!",
        icon: Droplet,
        badge: "Fast Recovery"
    }
];

const funFactsNe = [
    {
        title: "१ रक्तदान = ३ जीवन रक्षा",
        desc: "एक पटक गरिएको ४५० मिलीलिटर रक्तदानलाई रातो रक्तकोष, प्लाज्मा र प्लेटलेट्समा छुट्याएर ३ फरक-फरक बिरामीको ज्यान बचाउन प्रयोग गर्न सकिन्छ।",
        icon: HeartPulse,
        badge: "चिकित्सकीय प्रभाव"
    },
    {
        title: "हरेक २ सेकेन्डमा आवश्यकता",
        desc: "अस्पतालमा हरेक दुई सेकेन्डमा कसैलाई रगत वा प्लेटलेट्सको आवश्यकता पर्दछ। नेपालमा प्रसूति तथा दुर्घटनाका घाइतेहरूलाई यसको अत्यधिक खाँचो हुन्छ।",
        icon: Clock,
        badge: "अत्यावश्यक स्थिति"
    },
    {
        title: "१२० दिनको जीवन चक्र",
        desc: "रातो रक्तकोषहरूको आयु हाम्रो शरीरमा करिब १२० दिनको हुन्छ। नियमित रक्तदानले हड्डीको मज्जालाई नयाँ र स्वस्थ कोषहरू उत्पादन गर्न प्रेरित गर्दछ।",
        icon: Activity,
        badge: "मानव जीवविज्ञान"
    },
    {
        title: "शरीरको तौलको ७-८%",
        desc: "रगतले हाम्रो शरीरको कुल तौलको करिब ७ देखि ८ प्रतिशत भाग ओगट्छ। रक्तदान गरेको २४ देखि ४८ घण्टाभित्रै शरीरले तरल पदार्थको मात्रा पुनः पूर्ति गर्दछ!",
        icon: Droplet,
        badge: "शीघ्र पुनरुत्थान"
    }
];

export default function BloodCompatibilityMatrix() {
    const { lang } = useLanguage();
    const [selectedGroup, setSelectedGroup] = useState('O-');

    const activeInfo = compatibilityData.find((d) => d.group === selectedGroup) || compatibilityData[0];
    const facts = lang === 'ne' ? funFactsNe : funFactsEn;

    return (
        <section className="py-20 bg-gray-50/50 dark:bg-gray-900/30 border-t border-b border-gray-200 dark:border-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Header */}
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50 mb-3">
                        <HeartPulse className="h-3.5 w-3.5" />
                        <span>{lang === 'ne' ? 'चिकित्सकीय मार्गदर्शन' : 'Clinical Reference Guide'}</span>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        {lang === 'ne' ? 'कसले कसलाई रगत दिन सक्छ?' : 'Blood Group Compatibility Matrix'}
                    </h2>
                    <p className="mt-3 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {lang === 'ne' 
                            ? 'सुरक्षित रक्त सञ्चारका लागि सही रक्त समूह मिलान अनिवार्य हुन्छ। तल आफ्नो रक्त समूह छान्नुहोस् र अनुकूलता हेर्नुहोस्।'
                            : 'Matching blood types precisely is critical for safe transfusions. Select a blood group below to explore immediate donor and recipient compatibility.'}
                    </p>
                </div>

                {/* Interactive Compatibility Selector */}
                <div className="bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 lg:p-8 shadow-xs mb-16">
                    <div className="flex flex-col lg:flex-row gap-8 items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-8 mb-8">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 block mb-2">
                                {lang === 'ne' ? '१. आफ्नो रक्त समूह छान्नुहोस्:' : '1. Select Blood Type to Inspect:'}
                            </span>
                            <div className="flex flex-wrap gap-2 sm:gap-2.5">
                                {compatibilityData.map((item) => {
                                    const isSelected = selectedGroup === item.group;
                                    return (
                                        <button
                                            key={item.group}
                                            onClick={() => setSelectedGroup(item.group)}
                                            className={`px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-1.5 ${
                                                isSelected
                                                    ? 'bg-red-600 text-white shadow-md shadow-red-500/20 scale-105'
                                                    : 'bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 border border-transparent'
                                            }`}
                                        >
                                            <span>{item.group}</span>
                                            {isSelected && <Check className="h-4 w-4 stroke-[3]" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="w-full lg:w-auto bg-gray-50 dark:bg-gray-900/80 px-6 py-4 rounded-xl border border-gray-200/80 dark:border-gray-800 flex items-center gap-4 min-w-[280px]">
                            <div className="h-12 w-12 rounded-full bg-red-100 dark:bg-red-950 flex items-center justify-center text-red-600 dark:text-red-400 font-black text-xl flex-shrink-0">
                                {activeInfo.group}
                            </div>
                            <div>
                                <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide">
                                    {lang === 'ne' ? activeInfo.tagNe : activeInfo.tagEn}
                                </div>
                                <div className="text-sm text-gray-700 dark:text-gray-300 mt-0.5 font-medium">
                                    {lang === 'ne' ? activeInfo.descNe : activeInfo.descEn}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Compatibility Visualizer Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Can Donate To Card */}
                        <div className="p-6 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-200/60 dark:border-emerald-900/30">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                    {lang === 'ne' ? 'रगत दिन मिल्ने समूहहरू (Can Donate To):' : 'Can Donate To (Recipients):'}
                                </h4>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                                    {activeInfo.donateTo.length} {lang === 'ne' ? 'समूह' : 'Groups'}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {activeInfo.donateTo.map((grp) => (
                                    <span 
                                        key={grp} 
                                        className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-sm border border-emerald-300 dark:border-emerald-800/80 shadow-2xs"
                                    >
                                        {grp}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                                {lang === 'ne'
                                    ? `समूह ${activeInfo.group} को रातो रक्तकोष माथि उल्लेखित समूहका बिरामीहरूलाई सुरक्षित रूपमा चढाउन सकिन्छ।`
                                    : `Patients with the above blood types can safely receive red blood cells from a ${activeInfo.group} donor.`}
                            </p>
                        </div>

                        {/* Can Receive From Card */}
                        <div className="p-6 rounded-xl bg-blue-50/40 dark:bg-blue-950/10 border border-blue-200/60 dark:border-blue-900/30">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                    {lang === 'ne' ? 'रगत लिन मिल्ने समूहहरू (Can Receive From):' : 'Can Receive From (Donors):'}
                                </h4>
                                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                                    {activeInfo.receiveFrom.length} {lang === 'ne' ? 'समूह' : 'Groups'}
                                </span>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {activeInfo.receiveFrom.map((grp) => (
                                    <span 
                                        key={grp} 
                                        className="px-3.5 py-1.5 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold text-sm border border-blue-300 dark:border-blue-800/80 shadow-2xs"
                                    >
                                        {grp}
                                    </span>
                                ))}
                            </div>
                            <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                                {lang === 'ne'
                                    ? `यदि तपाईंको रक्त समूह ${activeInfo.group} हो भने, आपतकालमा माथि उल्लेखित समूहबाट मात्र रगत लिन सकिन्छ।`
                                    : `If your blood group is ${activeInfo.group}, you can safely receive red blood cell transfusions exclusively from these donors.`}
                            </p>
                        </div>

                    </div>

                    {/* Complete Table Summary Toggle / Overview */}
                    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 overflow-x-auto">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4">
                            {lang === 'ne' ? 'सम्पूर्ण रक्त समूह अनुकूलता तालिका (Full Compatibility Reference Table)' : 'Full Complete Compatibility Matrix Table'}
                        </h4>
                        <table className="w-full text-left border-collapse min-w-[600px]">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-800 text-xs font-bold uppercase text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-900/50">
                                    <th className="py-2.5 px-4 rounded-l-lg">{lang === 'ne' ? 'रक्त समूह' : 'Blood Group'}</th>
                                    <th className="py-2.5 px-4">{lang === 'ne' ? 'दिन मिल्ने (Donate To)' : 'Can Donate Red Cells To'}</th>
                                    <th className="py-2.5 px-4 rounded-r-lg">{lang === 'ne' ? 'लिन मिल्ने (Receive From)' : 'Can Receive Red Cells From'}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60 text-sm">
                                {compatibilityData.map((row) => (
                                    <tr 
                                        key={row.group} 
                                        onClick={() => setSelectedGroup(row.group)}
                                        className={`cursor-pointer transition-colors ${
                                            selectedGroup === row.group 
                                                ? 'bg-red-50/60 dark:bg-red-950/30 font-semibold text-gray-900 dark:text-white' 
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-900/50 text-gray-700 dark:text-gray-300'
                                        }`}
                                    >
                                        <td className="py-3 px-4">
                                            <span className="font-black text-red-600 dark:text-red-400">{row.group}</span>
                                            <span className="ml-2 text-xs text-gray-400 font-normal">({lang === 'ne' ? row.tagNe : row.tagEn})</span>
                                        </td>
                                        <td className="py-3 px-4 font-mono text-xs">{row.donateTo.join(', ')}</td>
                                        <td className="py-3 px-4 font-mono text-xs">{row.receiveFrom.join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Section 2: Clinical Fun Facts */}
                <div className="mt-20">
                    <div className="text-center max-w-2xl mx-auto mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 mb-3">
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>{lang === 'ne' ? 'रोचक तथ्यहरू' : 'Medical Insights & Facts'}</span>
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
                            {lang === 'ne' ? 'रक्तदानका बारेमा जान्नैपर्ने रोचक तथ्यहरू' : 'Did You Know? Fascinating Facts About Blood'}
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {facts.map((fact, index) => {
                            const Icon = fact.icon;
                            return (
                                <div 
                                    key={index} 
                                    className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400">
                                                <Icon className="h-6 w-6 stroke-[1.75]" />
                                            </div>
                                            <span className="text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                                                {fact.badge}
                                            </span>
                                        </div>
                                        <h4 className="text-base font-bold text-gray-900 dark:text-white mb-2 leading-snug">
                                            {fact.title}
                                        </h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                            {fact.desc}
                                        </p>
                                    </div>
                                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-900 text-2xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
                                        Blood Connect Nepal Reference #0{index + 1}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
}
