import { AlertCircle, MapPin, Phone, Hospital, Calendar } from 'lucide-react';

const BloodRequestCard = ({ request }) => {
    // Determine badge color based on urgency
    const urgencyColors = {
        'High': 'bg-red-100 text-red-800 border-red-200',
        'Medium': 'bg-orange-100 text-orange-800 border-orange-200',
        'Low': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    const badgeColor = urgencyColors[request.urgency_level] || 'bg-gray-100 text-gray-800';

    return (
        <div className={`bg-white rounded-lg shadow-md border-l-4 overflow-hidden ${request.is_fulfilled ? 'border-green-500 opacity-75' : 'border-red-500'}`}>
            <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-red-50 text-red-600 rounded-full h-12 w-12 flex items-center justify-center font-bold text-xl shadow-sm border border-red-100">
                            {request.blood_group}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{request.patient_name}</h3>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${badgeColor}`}>
                                {request.urgency_level} Urgency
                            </span>
                        </div>
                    </div>
                    {request.is_fulfilled && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-semibold">Fulfilled</span>
                    )}
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
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
                        <span className="font-medium text-gray-800">{request.phone_number}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                        <Calendar className="h-3 w-3" />
                        <span>Posted: {new Date(request.created_at).toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
            
            {!request.is_fulfilled && (
                <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3 text-red-500" />
                        Blood needed urgently
                    </span>
                    <a href={`tel:${request.phone_number}`} className="text-red-600 font-medium text-sm hover:text-red-800 hover:underline">
                        Contact Family
                    </a>
                </div>
            )}
        </div>
    );
};

export default BloodRequestCard;
