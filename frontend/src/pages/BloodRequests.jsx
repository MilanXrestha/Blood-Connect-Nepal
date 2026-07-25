import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import BloodRequestCard from '../components/BloodRequestCard';
import { Plus } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const URGENCY_LEVELS = ['High', 'Medium', 'Low'];
const DISTRICTS = [
    'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 
    'Biratnagar', 'Birgunj', 'Dharan', 'Butwal', 'Nepalgunj', 'Other'
];

const BloodRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const { user } = useAuth();
    
    // Form state
    const [formData, setFormData] = useState({
        patient_name: '',
        blood_group: '',
        hospital_name: '',
        district: '',
        phone_number: '',
        urgency_level: 'High'
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const response = await api.get('/requests/?is_fulfilled=false'); // Fetch unfulfilled by default
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setFormLoading(true);
        setFormError('');
        
        try {
            await api.post('/requests/', formData);
            setShowForm(false);
            setFormData({
                patient_name: '', blood_group: '', hospital_name: '', 
                district: '', phone_number: '', urgency_level: 'High'
            });
            fetchRequests(); // Refresh list
        } catch (error) {
            setFormError('Failed to post request. Please try again.');
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Urgent Blood Requests
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Help save a life by responding to these urgent appeals.
                    </p>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    {user ? (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none"
                        >
                            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                            {showForm ? 'Cancel Request' : 'Post Request'}
                        </button>
                    ) : (
                        <span className="text-sm text-gray-500">
                            Log in to post a blood request
                        </span>
                    )}
                </div>
            </div>

            {/* Create Request Form */}
            {showForm && user && (
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-8">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Post a New Request</h3>
                    
                    {formError && (
                        <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-4 text-sm text-red-700">
                            {formError}
                        </div>
                    )}

                    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Patient Name</label>
                            <input required name="patient_name" value={formData.patient_name} onChange={handleInputChange} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm border px-3 py-2" />
                        </div>
                        
                        <div className="col-span-2 md:col-span-1">
                            <label className="block text-sm font-medium text-gray-700">Hospital Name</label>
                            <input required name="hospital_name" value={formData.hospital_name} onChange={handleInputChange} type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm border px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Blood Group Needed</label>
                            <select required name="blood_group" value={formData.blood_group} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm border px-3 py-2 bg-white">
                                <option value="">Select...</option>
                                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">District</label>
                            <select required name="district" value={formData.district} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm border px-3 py-2 bg-white">
                                <option value="">Select...</option>
                                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Contact Phone Number</label>
                            <input required name="phone_number" value={formData.phone_number} onChange={handleInputChange} type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm border px-3 py-2" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Urgency Level</label>
                            <select name="urgency_level" value={formData.urgency_level} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm border px-3 py-2 bg-white">
                                {URGENCY_LEVELS.map(u => <option key={u} value={u}>{u}</option>)}
                            </select>
                        </div>

                        <div className="col-span-2 flex justify-end mt-2">
                            <button type="submit" disabled={formLoading} className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50">
                                {formLoading ? 'Posting...' : 'Submit Request'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List of Requests */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
            ) : requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {requests.map((request) => (
                        <BloodRequestCard key={request.id} request={request} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No active requests</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        There are currently no urgent blood requests. 
                    </p>
                </div>
            )}
        </div>
    );
};

export default BloodRequests;
