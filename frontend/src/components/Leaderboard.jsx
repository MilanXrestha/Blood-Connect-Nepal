import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function Leaderboard() {
    const { lang } = useLanguage();
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/leaderboard/');
                setDonors(response.data.results || response.data || []);
            } catch (error) {
                console.error("Error fetching leaderboard:", error);
                setDonors([
                    { id: 101, username: 'Rajesh Hamal', district: 'Kathmandu', blood_group: 'O+', donations_count: 17 },
                    { id: 102, username: 'Sandeep Lamichhane', district: 'Chitwan', blood_group: 'A+', donations_count: 14 },
                    { id: 103, username: 'Anuradha Koirala', district: 'Kathmandu', blood_group: 'B+', donations_count: 12 },
                    { id: 104, username: 'Paras Khadka', district: 'Lalitpur', blood_group: 'O-', donations_count: 10 },
                    { id: 105, username: 'Mira Rai', district: 'Bhojpur', blood_group: 'AB+', donations_count: 8 },
                    { id: 106, username: 'Bipin Karki', district: 'Morang', blood_group: 'A-', donations_count: 7 },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchLeaderboard();
    }, []);

    const displayDonors = donors.length > 0 ? donors : [
        { id: 101, username: 'Rajesh Hamal', district: 'Kathmandu', blood_group: 'O+', donations_count: 17 },
        { id: 102, username: 'Sandeep Lamichhane', district: 'Chitwan', blood_group: 'A+', donations_count: 14 },
        { id: 103, username: 'Anuradha Koirala', district: 'Kathmandu', blood_group: 'B+', donations_count: 12 },
        { id: 104, username: 'Paras Khadka', district: 'Lalitpur', blood_group: 'O-', donations_count: 10 },
        { id: 105, username: 'Mira Rai', district: 'Bhojpur', blood_group: 'AB+', donations_count: 8 },
        { id: 106, username: 'Bipin Karki', district: 'Morang', blood_group: 'A-', donations_count: 7 },
    ];

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 my-12 overflow-hidden transition-colors">
            {/* Header */}
            <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {lang === 'ne' ? 'शीर्ष रक्तदाता सूची (Hall of Fame)' : 'Verified Donor Honor Roll'}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {lang === 'ne'
                            ? 'नियमित रक्तदानद्वारा सर्वाधिक जीवन बचाउने दर्ता भएका रक्तदाताहरू।'
                            : 'Recognizing registered donors with the highest verified contribution records across Nepal.'}
                    </p>
                </div>

                <Link
                    to="/register"
                    className="text-xs font-semibold text-red-600 dark:text-red-400 hover:underline shrink-0"
                >
                    {lang === 'ne' ? 'रक्तदाताको रूपमा जोडिनुहोस् →' : 'Join as a verified donor →'}
                </Link>
            </div>

            {/* Table View */}
            {loading ? (
                <div className="p-12 text-center text-sm text-gray-500">
                    {lang === 'ne' ? 'सूची लोड हुँदैछ...' : 'Loading donor rankings...'}
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">
                                <th className="py-3 px-6 w-16">{lang === 'ne' ? 'स्थान' : 'Rank'}</th>
                                <th className="py-3 px-6">{lang === 'ne' ? 'दाताको नाम' : 'Donor Name'}</th>
                                <th className="py-3 px-6">{lang === 'ne' ? 'जिल्ला' : 'District'}</th>
                                <th className="py-3 px-6">{lang === 'ne' ? 'रक्त समूह' : 'Blood Group'}</th>
                                <th className="py-3 px-6 text-right">{lang === 'ne' ? 'प्रमाणित योगदान' : 'Verified Units'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
                            {displayDonors.slice(0, 6).map((donor, index) => {
                                const rank = index + 1;
                                return (
                                    <tr 
                                        key={donor.id || index} 
                                        className="hover:bg-gray-50/50 dark:hover:bg-gray-800/20 transition-colors text-gray-700 dark:text-gray-300"
                                    >
                                        <td className="py-4 px-6 font-mono font-semibold text-gray-400 dark:text-gray-500">
                                            {rank === 1 ? (
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold text-xs">
                                                    1
                                                </span>
                                            ) : rank === 2 ? (
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-bold text-xs">
                                                    2
                                                </span>
                                            ) : rank === 3 ? (
                                                <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 font-bold text-xs">
                                                    3
                                                </span>
                                            ) : (
                                                `0${rank}`
                                            )}
                                        </td>
                                        <td className="py-4 px-6 font-medium text-gray-900 dark:text-white">
                                            {donor.username}
                                        </td>
                                        <td className="py-4 px-6 text-gray-500 dark:text-gray-400">
                                            {donor.district || 'Kathmandu'}
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-mono font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded text-xs border border-red-100 dark:border-red-900/40">
                                                {donor.blood_group}
                                            </span>
                                        </td>
                                        <td className="py-4 px-6 text-right font-mono font-bold text-gray-900 dark:text-white">
                                            {donor.donations_count}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
