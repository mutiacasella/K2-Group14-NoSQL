import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Return() {
    const [borrowingId, setBorrowingId] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/borrowing/return`, {
                borrowing_id: borrowingId, // sesuai backend
            });
            alert('Buku berhasil dikembalikan!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Gagal mengembalikan buku.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div className="max-w-xl w-full p-6 bg-white shadow-lg rounded-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">Return Book Form</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-medium text-gray-700">Borrowing ID</label>
                        <input
                            type="text"
                            value={borrowingId}
                            onChange={(e) => setBorrowingId(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
