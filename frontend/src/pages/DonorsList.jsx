import { useState, useEffect } from 'react';
import api from '../api/axios';
import DonorCard from '../components/DonorCard';
import { Search } from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
const DISTRICTS = [
    'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Chitwan', 
    'Biratnagar', 'Birgunj', 'Dharan', 'Butwal', 'Nepalgunj'
];

const DonorsList = () => {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        blood_group: '',
        district: '',
        search: ''
    });

    const fetchDonors = async () => {
        setLoading(true);
        try {
            // Build query params
            const params = new URLSearchParams();
            if (filters.blood_group) params.append('blood_group', filters.blood_group);
            if (filters.district) params.append('district', filters.district);
            if (filters.search) params.append('search', filters.search);

            const response = await api.get(`/donors/?${params.toString()}`);
            setDonors(response.data);
        } catch (error) {
            console.error('Error fetching donors:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, [filters.blood_group, filters.district]); // Re-fetch when filters change

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchDonors();
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="md:flex md:items-center md:justify-between mb-8">
                <div className="flex-1 min-w-0">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                        Find Blood Donors
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Search and contact available donors directly.
                    </p>
                </div>
            </div>

            {/* Filters Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-8">
                <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="focus:ring-red-500 focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                placeholder="Search by name..."
                                value={filters.search}
                                onChange={(e) => setFilters({...filters, search: e.target.value})}
                            />
                        </div>
                    </div>
                    <div>
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md border bg-white"
                            value={filters.blood_group}
                            onChange={(e) => setFilters({...filters, blood_group: e.target.value})}
                        >
                            <option value="">Any Blood Group</option>
                            {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                    </div>
                    <div>
                        <select
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md border bg-white"
                            value={filters.district}
                            onChange={(e) => setFilters({...filters, district: e.target.value})}
                        >
                            <option value="">Any District</option>
                            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                    </div>
                </form>
            </div>

            {/* Results */}
            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
            ) : donors.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {donors.map((donor) => (
                        <DonorCard key={donor.id} donor={donor} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No donors found</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Try adjusting your search or filters to find more donors.
                    </p>
                </div>
            )}
        </div>
    );
};

export default DonorsList;
