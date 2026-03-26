import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminLogin = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('neev_admin_token')) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        setError('');
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || '';
            const res = await fetch(`${apiUrl}/api/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
            const data = await res.json();

            if (res.ok && data.token) {
                localStorage.setItem('neev_admin_token', data.token);
                navigate('/admin');
            } else {
                setError(data.error || 'Invalid credentials');
            }
        } catch (err) {
            setError('Server connection failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="admin-login-brand">
                    <div className="logo-box"><h1>N</h1></div>
                    <h2>NEEV</h2>
                    <p className="font-space font-bold text-[10px] tracking-[5px] uppercase text-[#6B7B8D] mt-2">Thread of Wisdom</p>
                </div>

                <div className="login-card">
                    <div className="flex flex-col mb-8">
                        <h3 className="font-anton text-2xl uppercase tracking-[1px] text-[#0A1628]">Admin Panel</h3>
                        <p className="subtitle">Sign in to manage your academy</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-center gap-3 animate-fadeUp">
                            <i className="fa-solid fa-circle-exclamation"></i>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div className="admin-form-group">
                            <label>Username</label>
                            <div className="input-icon-wrap">
                                <i className="fa-solid fa-user"></i>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Enter username"
                                    value={credentials.username}
                                    onChange={handleChange}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        <div className="admin-form-group">
                            <label>Password</label>
                            <div className="input-icon-wrap">
                                <i className="fa-solid fa-lock"></i>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={credentials.password}
                                    onChange={handleChange}
                                    required
                                    autoComplete="current-password"
                                />
                            </div>
                        </div>

                        <button type="submit" className="admin-login-btn" disabled={loading}>
                            {loading ? (
                                <i className="fa-solid fa-circle-notch animate-spin"></i>
                            ) : (
                                <div className="flex items-center justify-center gap-3">
                                    <span>Sign In</span>
                                    <i className="fa-solid fa-arrow-right"></i>
                                </div>
                            )}
                        </button>
                    </form>
                </div>
                <p className="text-center text-[#9AABB8] text-[10px] font-space font-bold uppercase tracking-[2px] mt-10">
                    NEEV Academy © 2026 — SECURED ACCESS
                </p>
            </div>
        </div>
    );
};

export default AdminLogin;
