import { useState } from 'react';
import { AlertCircle, MapPin, Phone, Hospital, Calendar, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import EmergencyShareModal from './EmergencyShareModal';

const BloodRequestCard = ({ request }) => {
    const { t, lang } = useLanguage();
    const [isShareOpen, setIsShareOpen] = useState(false);

    // Determine badge color based on urgency
    const urgencyColors = {
        'High': 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-300 dark:border-red-800',
        'Medium': 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-800',
        'Low': 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800'
    };
    
    const badgeColor = urgencyColors[request.urgency_level] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border-l-4 overflow-hidden transition-colors duration-200 ${request.is_fulfilled ? 'border-green-500 opacity-75' : 'border-red-500'}`}>
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl shadow-sm border border-red-100 dark:border-red-800/50 transition-colors duration-200">
                            {request.blood_group}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white transition-colors duration-200">{request.patient_name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeColor}`}>
                                {request.urgency_level} {t.requests.urgency}
                            </span>
                        </div>
                    </div>
                    {request.is_fulfilled && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">{t.requests.fulfilled}</span>
                    )}
                </div>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-200">
                    <div className="flex items-center gap-2">
                        <Hospital className="h-4 w-4 text-gray-400" />
                        <span>{request.hospital_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{request.district}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-800 dark:text-gray-200 transition-colors duration-200">{request.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                        <Calendar className="h-3 w-3" />
                        <span>{t.requests.posted}: {new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            
            {!request.is_fulfilled && (
                <div className="bg-gray-50 dark:bg-gray-700/50 px-5 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center transition-colors duration-200">
                    <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 transition-colors duration-200">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        {t.requests.bloodNeededUrgently}
                    </span>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={() => setIsShareOpen(true)}
                            className="text-xs bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 px-3 py-1.5 rounded-lg font-bold hover:bg-red-200 dark:hover:bg-red-900 transition-all flex items-center gap-1 shadow-sm"
                        >
                            <Share2 className="w-3.5 h-3.5" />
                            {lang === 'ne' ? 'सेयर' : 'Viral Alert'}
                        </button>
                        <a href={`tel:${request.phone_number}`} className="text-red-600 font-medium text-sm hover:text-red-800 hover:underline">
                            {t.requests.contactFamily}
                        </a>
                    </div>
                </div>
            )}

            <EmergencyShareModal
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                request={request}
            />
        </div>
    );
};

export default BloodRequestCard;

