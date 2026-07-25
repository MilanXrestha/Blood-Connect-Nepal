import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import { User, Activity, Edit2 } from 'lucide-react';
import BloodRequestCard from '../components/BloodRequestCard';

const Profile = () => {
    const { user, setUser } = useAuth();
    const [myRequests, setMyRequests] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [loadingReqs, setLoadingReqs] = useState(true);

    useEffect(() => {
        if (user) {
            fetchMyRequests();
        }
    }, [user]);

    const fetchMyRequests = async () => {
        try {
            // Wait, the backend doesn't have a specific endpoint for MY requests,
            // but we can just fetch all and filter client side for simplicity,
            // or if the backend filters by requester (it doesn't out of the box unless we added it).
            // Let's just fetch all and filter client side since it's a small app.
            const response = await api.get('/requests/');
            // The requester field in the response is likely an ID. We need to match it.
            // Assuming the serializer returns the requester's ID or username.
            const userReqs = response.data.filter(req => req.requester === user.id);
            setMyRequests(userReqs);
        } catch (error) {
            console.error('Failed to fetch requests:', error);
        } finally {
            setLoadingReqs(false);
        }
    };

    const toggleAvailability = async () => {
        setUpdating(true);
        try {
            const response = await api.patch('/donors/me/', {
                is_available: !user.is_available
            });
            setUser(response.data);
        } catch (error) {
            console.error('Failed to update status', error);
        } finally {
            setUpdating(false);
        }
    };

    const markFulfilled = async (requestId) => {
        try {
            await api.patch(`/requests/${requestId}/`, { is_fulfilled: true });
            fetchMyRequests();
        } catch (error) {
            console.error('Failed to mark fulfilled', error);
        }
    };

    if (!user) return null; // Or redirect

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8 border border-gray-200">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center gap-2">
                            <User className="h-5 w-5 text-gray-400" />
                            Donor Profile
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage your availability and information.
                        </p>
                    </div>
                    <div>
                        <div className="bg-red-100 text-red-800 text-xl font-bold px-4 py-2 rounded-full border border-red-200 shadow-sm">
                            {user.blood_group || '?'}
                        </div>
                    </div>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Username</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.username}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">District</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.district || 'Not provided'}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">Phone number</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user.phone_number || 'Not provided'}</dd>
                        </div>
                        <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 bg-gray-50 items-center">
                            <dt className="text-sm font-medium text-gray-500 flex items-center gap-2">
                                <Activity className="h-4 w-4" /> Status
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 flex items-center justify-between">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                    {user.is_available ? 'Available to Donate' : 'Currently Unavailable'}
                                </span>
                                <button 
                                    onClick={toggleAvailability}
                                    disabled={updating}
                                    className="text-sm text-red-600 hover:text-red-800 font-medium"
                                >
                                    {updating ? 'Updating...' : `Change to ${user.is_available ? 'Unavailable' : 'Available'}`}
                                </button>
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>

            {/* My Requests Section */}
            <div className="mb-4 flex items-center gap-2">
                <Edit2 className="h-5 w-5 text-gray-500" />
                <h2 className="text-xl font-bold text-gray-900">My Requests</h2>
            </div>
            
            {loadingReqs ? (
                <div className="animate-pulse flex space-x-4 bg-white p-6 rounded-lg border">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            ) : myRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myRequests.map((request) => (
                        <div key={request.id} className="relative">
                            <BloodRequestCard request={request} />
                            {!request.is_fulfilled && (
                                <div className="absolute top-4 right-4 bg-white rounded-md shadow p-2">
                                    <button 
                                        onClick={() => markFulfilled(request.id)}
                                        className="text-xs font-bold text-green-600 hover:text-green-800 border border-green-200 bg-green-50 px-2 py-1 rounded"
                                    >
                                        Mark Fulfilled
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 text-center text-gray-500">
                    You haven't posted any blood requests yet.
                </div>
            )}
        </div>
    );
};

export default Profile;
