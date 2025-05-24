import { useState } from 'react';
import axios from 'axios';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Email and password are required');
            return;
        }

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/borrower/login`,
                {
                    email,
                    password
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            alert('Successfully login!');
            localStorage.setItem('isLoggedIn', 'true'); // <== Tambahkan ini
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Failed to login: ' + err.response?.data?.message || 'Unknown error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-blue-100 to-purple-200">
            <div className="max-w-xl w-full p-8 bg-white shadow-lg rounded-2xl">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-pink-600">
                    Login
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-pink-300"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-pink-500 focus:outline-none"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-md transition-all duration-200"
                    >
                        Submit
                    </button>
                    <p className="text-sm text-center text-gray-600 mt-4">
                        Don't have any account?{' '}
                        <Link to="/register" className="text-pink-500 font-semibold hover:underline">
                            Register here.
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
