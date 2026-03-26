import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminDashboard = () => {
    const [activePage, setActivePage] = useState('dashboard');
    const [stats, setStats] = useState({
        totalEnquiries: 0, totalRegistrations: 0,
        newEnquiries: 0, newRegistrations: 0,
        todayEnquiries: 0, todayRegistrations: 0
    });
    const [enquiries, setEnquiries] = useState([]);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    
    // Search & Filter
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    // Modal
    const [selectedItem, setSelectedItem] = useState(null);
    const [modalType, setModalType] = useState(null); // 'enquiry' or 'registration'
    const [notes, setNotes] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('neev_admin_token');

    const fetchWithAuth = useCallback(async (url, options = {}) => {
        const apiUrl = import.meta.env.VITE_API_URL || '';
        const res = await fetch(`${apiUrl}${url}`, {
            ...options,
            headers: {
                ...options.headers,
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (res.status === 401) {
            localStorage.removeItem('neev_admin_token');
            navigate('/admin/login');
            return null;
        }
        return res.json();
    }, [token, navigate]);

    const loadData = useCallback(async () => {
        if (!token) {
            navigate('/admin/login');
            return;
        }
        setLoading(true);
        const [statsData, enqData, regData] = await Promise.all([
            fetchWithAuth('/api/admin/stats'),
            fetchWithAuth('/api/admin/enquiries'),
            fetchWithAuth('/api/admin/registrations')
        ]);

        if (statsData) setStats(statsData);
        if (enqData) setEnquiries(enqData);
        if (regData) setRegistrations(regData);
        setLoading(false);
    }, [token, navigate, fetchWithAuth]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await loadData();
        setIsRefreshing(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('neev_admin_token');
        navigate('/admin/login');
    };

    const updateStatus = async (type, id, newStatus) => {
        const endpoint = type === 'enquiry' ? 'enquiries' : 'registrations';
        await fetchWithAuth(`/api/admin/${endpoint}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status: newStatus })
        });
        setSelectedItem(prev => ({ ...prev, status: newStatus }));
        loadData();
    };

    const saveNotes = async (type, id) => {
        const endpoint = type === 'enquiry' ? 'enquiries' : 'registrations';
        await fetchWithAuth(`/api/admin/${endpoint}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ notes })
        });
        loadData();
    };

    const deleteItem = async (type, id) => {
        if (!window.confirm(`Are you sure you want to delete this ${type}?`)) return;
        const endpoint = type === 'enquiry' ? 'enquiries' : 'registrations';
        await fetchWithAuth(`/api/admin/${endpoint}/${id}`, { method: 'DELETE' });
        setSelectedItem(null);
        loadData();
    };

    const formatDate = (iso) => {
        if (!iso) return 'N/A';
        return new Date(iso).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    const filteredEnquiries = enquiries.filter(e => {
        const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) || e.phone.includes(searchQuery);
        const matchesFilter = statusFilter === 'all' || e.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    const filteredRegistrations = registrations.filter(r => {
        const matchesSearch = r.studentName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = statusFilter === 'all' || r.status === statusFilter;
        return matchesSearch && matchesFilter;
    });

    if (loading && !isRefreshing) return (
        <div className="admin-layout flex flex-col md:flex-row min-h-screen bg-[#F0F3F9]">
            {/* Loading Sidebar */}
            <aside className="admin-sidebar hidden lg:flex">
                <div className="admin-sidebar-brand">
                    <div className="w-24 h-8 bg-white/10 rounded-md animate-pulse"></div>
                </div>
                <div className="p-4 space-y-4">
                    {[1, 2, 3].map(i => <div key={i} className="w-full h-12 bg-white/5 rounded-xl animate-pulse"></div>)}
                </div>
            </aside>
            <main className="admin-main-content flex-1 p-8 lg:p-12">
                <div className="w-64 h-12 bg-gray-200 rounded-2xl animate-pulse mb-10"></div>
                <div className="admin-stats-grid mb-10">
                    {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-white rounded-[24px] border border-black/5 animate-pulse"></div>)}
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                    {[1, 2].map(i => <div key={i} className="h-80 bg-white rounded-[32px] border border-black/5 animate-pulse"></div>)}
                </div>
            </main>
        </div>
    );

    return (
        <div className="admin-layout">
            {/* Sidebar Overlay */}
            {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-[90] lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>}

            {/* Sidebar */}
            <aside className={`admin-sidebar ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
                <div className="admin-sidebar-brand">
                    <h1>NEEV</h1>
                    <p className="text-[10px] text-white/30 tracking-[4px] uppercase font-bold mt-1">Admin Panel</p>
                </div>
                <nav className="admin-sidebar-nav">
                    <div className={`admin-nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => {setActivePage('dashboard'); setSidebarOpen(false)}}>
                        <i className="fa-solid fa-house"></i>
                        <span>Dashboard</span>
                    </div>
                    <div className={`admin-nav-item ${activePage === 'enquiries' ? 'active' : ''}`} onClick={() => {setActivePage('enquiries'); setSidebarOpen(false)}}>
                        <i className="fa-solid fa-message"></i>
                        <span>Enquiries</span>
                    </div>
                    <div className={`admin-nav-item ${activePage === 'registrations' ? 'active' : ''}`} onClick={() => {setActivePage('registrations'); setSidebarOpen(false)}}>
                        <i className="fa-solid fa-user-plus"></i>
                        <span>Registrations</span>
                    </div>
                </nav>
                <div className="p-4 border-t border-white/5">
                    <button className="logout-btn w-full" onClick={handleLogout}>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main-content">
                {/* Mobile Header */}
                <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0A1628] flex items-center justify-between px-4 z-40 border-b border-white/5">
                    <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center text-white"><i className="fa-solid fa-bars"></i></button>
                    <div className="flex items-center gap-2"><h1 className="text-white font-bold tracking-widest">NEEV</h1><span className="text-white/40 text-[10px] font-bold uppercase">Admin</span></div>
                    <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center text-red-400"><i className="fa-solid fa-right-from-bracket"></i></button>
                </div>

                <div className="admin-page-header flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2>{activePage.charAt(0).toUpperCase() + activePage.slice(1)}</h2>
                        <p className="text-[#6B7B8D] mt-1 font-space text-sm">Welcome back, Academy Administrator</p>
                    </div>
                    <button onClick={handleRefresh} disabled={isRefreshing} className="refresh-btn">
                        <i className={`fa-solid fa-arrows-rotate ${isRefreshing ? 'animate-spin' : ''}`}></i>
                        {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                    </button>
                </div>

                {activePage === 'dashboard' && (
                    <>
                        <div className="admin-stats-grid">
                            <StatCard icon="fa-message" label="Total Enquiries" value={stats.totalEnquiries} color="blue" />
                            <StatCard icon="fa-user-plus" label="Total Registrations" value={stats.totalRegistrations} color="gold" />
                            <StatCard icon="fa-bell" label="New Enquiries" value={stats.newEnquiries} color="green" />
                            <StatCard icon="fa-clock" label="New Registrations" value={stats.newRegistrations} color="purple" />
                        </div>
                        
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            <SummaryTable 
                                title="Recent Enquiries" 
                                icon="fa-message" 
                                data={enquiries.slice(0, 5)} 
                                type="enquiry"
                                onView={(item) => {setSelectedItem(item); setModalType('enquiry'); setNotes(item.notes || '')}}
                            />
                            <SummaryTable 
                                title="Recent Registrations" 
                                icon="fa-user-plus" 
                                data={registrations.slice(0, 5)} 
                                type="registration"
                                onView={(item) => {setSelectedItem(item); setModalType('registration'); setNotes(item.notes || '')}}
                            />
                        </div>
                    </>
                )}

                {(activePage === 'enquiries' || activePage === 'registrations') && (
                    <div className="admin-container bg-white rounded-[24px] border border-black/5 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-black/5 bg-[#F8F9FC] flex flex-col md:flex-row gap-4 justify-between">
                            <div className="flex items-center gap-4 flex-1">
                                <div className="relative flex-1 max-w-md">
                                    <i className="fa-solid fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
                                    <input 
                                        type="text" 
                                        placeholder={`Search ${activePage}...`} 
                                        className="w-full pl-11 pr-4 py-3 bg-white border border-black/5 rounded-xl focus:ring-2 focus:ring-[#1A3A7A]/10 outline-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <select 
                                    className="px-4 py-3 bg-white border border-black/5 rounded-xl outline-none"
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                >
                                    <option value="all">All Status</option>
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    {activePage === 'enquiries' ? (
                                        <option value="resolved">Resolved</option>
                                    ) : (
                                        <>
                                            <option value="enrolled">Enrolled</option>
                                            <option value="rejected">Rejected</option>
                                        </>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#f8f9fc] border-b border-black/5">
                                    <tr>
                                        <th className="px-6 py-4 font-space text-[10px] font-bold uppercase tracking-widest text-[#1A3A7A]">Name / Details</th>
                                        <th className="px-6 py-4 font-space text-[10px] font-bold uppercase tracking-widest text-[#1A3A7A]">Contact Info</th>
                                        <th className="px-6 py-4 font-space text-[10px] font-bold uppercase tracking-widest text-[#1A3A7A]">Status</th>
                                        <th className="px-6 py-4 font-space text-[10px] font-bold uppercase tracking-widest text-[#1A3A7A]">Date</th>
                                        <th className="px-6 py-4 font-space text-[10px] font-bold uppercase tracking-widest text-[#1A3A7A] text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    {(activePage === 'enquiries' ? filteredEnquiries : filteredRegistrations).map(item => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-[#0A1628]">{activePage === 'enquiries' ? item.name : item.studentName}</div>
                                                <div className="text-xs text-[#6B7B8D]">{activePage === 'enquiries' ? item.exam : item.studentClass}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm">{activePage === 'enquiries' ? item.phone : (item.fathersContact || item.applicantPhone)}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`status-badge ${item.status}`}>{item.status}</span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#6B7B8D]">
                                                {new Date(item.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button onClick={() => {setSelectedItem(item); setModalType(activePage === 'enquiries' ? 'enquiry' : 'registration'); setNotes(item.notes || '')}} className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/5 hover:bg-white hover:shadow-md transition-all text-[#6B7B8D] hover:text-[#1A3A7A]"><i className="fa-solid fa-eye text-xs"></i></button>
                                                    <button onClick={() => deleteItem(activePage === 'enquiries' ? 'enquiry' : 'registration', item.id)} className="w-9 h-9 flex items-center justify-center rounded-lg border border-black/5 hover:bg-red-50 transition-all text-[#6B7B8D] hover:text-red-500"><i className="fa-solid fa-trash text-xs"></i></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>

            {/* Modal */}
            {selectedItem && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-[#0A1628]/40 backdrop-blur-md" onClick={() => setSelectedItem(null)}></div>
                    <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col relative z-10 shadow-2xl animate-modalIn">
                        <div className="p-8 border-b border-black/5 flex items-center justify-between">
                            <h3 className="font-anton text-xl uppercase tracking-wider text-[#0A1628]">Details Viewer</h3>
                            <button onClick={() => setSelectedItem(null)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"><i className="fa-solid fa-xmark"></i></button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-8">
                            <div className="space-y-4">
                                {Object.entries(selectedItem).map(([key, value]) => {
                                    if (['id', '_id', '__v', 'updatedAt', 'notes'].includes(key)) return null;
                                    return (
                                        <div key={key} className="flex justify-between border-b border-black/5 pb-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7B8D]">{key.replace(/([A-Z])/g, ' $1')}</span>
                                            <span className="text-sm font-medium text-[#0A1628] text-right max-w-[60%] overflow-hidden">{key === 'createdAt' ? formatDate(value) : value || '—'}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            
                            <div className="mt-8">
                                <h4 className="font-space text-[11px] font-bold uppercase tracking-widest text-[#1A3A7A] mb-4">Update Status</h4>
                                <div className="flex flex-wrap gap-2">
                                    {(modalType === 'enquiry' ? ['new', 'contacted', 'resolved'] : ['new', 'contacted', 'enrolled', 'rejected']).map(s => (
                                        <button 
                                            key={s}
                                            onClick={() => updateStatus(modalType, selectedItem.id, s)}
                                            className={`status-action-btn ${selectedItem.status === s ? 'active-status' : ''}`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8">
                                <h4 className="font-space text-[11px] font-bold uppercase tracking-widest text-[#1A3A7A] mb-4">Internal Notes</h4>
                                <textarea 
                                    className="notes-textarea" 
                                    placeholder="Write any follow-up notes here..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                ></textarea>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t border-black/5 flex justify-end gap-3">
                            <button onClick={() => saveNotes(modalType, selectedItem.id)} className="px-6 py-3 bg-[#1A3A7A] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#1A3A7A]/20">Save Notes</button>
                            <button onClick={() => deleteItem(modalType, selectedItem.id)} className="px-6 py-3 bg-red-50 text-red-500 rounded-xl font-bold text-sm">Delete Forever</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => {
    const colorMap = {
        blue: { bg: 'bg-blue-50', text: 'text-blue-600' },
        gold: { bg: 'bg-yellow-50', text: 'text-yellow-600' },
        green: { bg: 'bg-emerald-50', text: 'text-emerald-600' },
        purple: { bg: 'bg-purple-50', text: 'text-purple-600' }
    };
    return (
        <div className="admin-stat-card">
            <div className={`stat-icon-box ${colorMap[color].bg} ${colorMap[color].text}`}>
                <i className={`fa-solid ${icon}`}></i>
            </div>
            <div className="stat-info-text">
                <h3>{value}</h3>
                <p className="text-[10px] font-bold uppercase tracking-[2px] text-[#6B7B8D] mt-1">{label}</p>
            </div>
        </div>
    );
};

const SummaryTable = ({ title, icon, data, type, onView }) => (
    <div className="admin-container bg-white p-6 md:p-8 rounded-[32px]">
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#1A3A7A]/5 flex items-center justify-center text-[#1A3A7A]"><i className={`fa-solid ${icon}`}></i></div>
                <h3 className="font-anton text-lg uppercase tracking-wider">{title}</h3>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <tbody>
                    {data.length === 0 ? (
                        <tr><td className="text-center py-8 text-[#9AABB8] italic">No recent activity found</td></tr>
                    ) : (
                        data.map(item => (
                            <tr key={item.id} className="border-b border-black/5 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => onView(item)}>
                                <td className="py-4">
                                    <div className="font-bold text-sm">{type === 'enquiry' ? item.name : item.studentName}</div>
                                    <div className="text-[10px] font-bold uppercase text-[#6B7B8D]">{new Date(item.createdAt).toLocaleDateString()}</div>
                                </td>
                                <td className="py-4 text-right">
                                    <span className={`status-badge ${item.status}`}>{item.status}</span>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default AdminDashboard;
