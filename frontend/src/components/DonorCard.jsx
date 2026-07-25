import { MapPin, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const DonorCard = ({ donor }) => {
    const { t } = useLanguage();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow duration-200">
            <div className="p-5 flex items-start gap-4">
                <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full h-14 w-14 flex-shrink-0 flex items-center justify-center font-bold text-2xl shadow-sm border border-red-100 dark:border-red-800/50 transition-colors duration-200">
                    {donor.blood_group || '?'}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white transition-colors duration-200">{donor.username}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3 transition-colors duration-200">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{donor.district || t.donors.notSpecified}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                        {donor.is_available ? (
                            <span className="flex items-center gap-1.5 text-green-700 dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/30 px-2.5 py-1 rounded-full border border-green-100 dark:border-green-800 transition-colors duration-200">
                                <CheckCircle className="h-4 w-4" /> {t.donors.availableNow}
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-700 px-2.5 py-1 rounded-full border border-gray-200 dark:border-gray-600 transition-colors duration-200">
                                <XCircle className="h-4 w-4" /> {t.donors.unavailable}
                            </span>
                        )}
                    </div>
                </div>
            </div>
            
            {donor.is_available && donor.phone_number && (
                <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-end transition-colors duration-200">
                    <a href={`tel:${donor.phone_number}`} className="inline-flex items-center justify-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        {t.donors.contactDonor}
                    </a>
                </div>
            )}
        </div>
    );
};

export default DonorCard;
