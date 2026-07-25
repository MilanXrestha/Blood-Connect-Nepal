import { MapPin, CheckCircle, XCircle } from 'lucide-react';

const DonorCard = ({ donor }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5 flex items-start gap-4">
                <div className="bg-red-50 text-red-600 rounded-full h-14 w-14 flex-shrink-0 flex items-center justify-center font-bold text-2xl shadow-sm border border-red-100">
                    {donor.blood_group || '?'}
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{donor.username}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600 mt-1 mb-3">
                        <MapPin className="h-3.5 w-3.5" />
                        <span>{donor.district || 'Not specified'}</span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                        {donor.is_available ? (
                            <span className="flex items-center gap-1.5 text-green-700 font-medium bg-green-50 px-2.5 py-1 rounded-full border border-green-100">
                                <CheckCircle className="h-4 w-4" /> Available Now
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-gray-500 font-medium bg-gray-50 px-2.5 py-1 rounded-full border border-gray-200">
                                <XCircle className="h-4 w-4" /> Unavailable
                            </span>
                        )}
                    </div>
                </div>
            </div>
            
            {donor.is_available && donor.phone_number && (
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-end">
                    <a href={`tel:${donor.phone_number}`} className="inline-flex items-center justify-center px-4 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Contact Donor
                    </a>
                </div>
            )}
        </div>
    );
};

export default DonorCard;
