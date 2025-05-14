import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function FormDaftarBorrower() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/borrower/add', {
                name,
                email,
                address,
                phone_number: phoneNumber
            });
            alert('Berhasil daftar!');
            navigate('/');
        } catch (err) {
            console.error(err);
            alert('Gagal daftar.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 via-blue-100 to-purple-200">
            <div className="max-w-xl w-full p-8 bg-white shadow-lg rounded-2xl">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-pink-600">
                    Daftar Peminjam
                </h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 font-semibold">Nama</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            required
                        />
                    </div>
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
                        <label className="block mb-1 font-semibold">Alamat</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">Nomor Telepon</label>
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 rounded-md transition-all duration-200"
                    >
                        Daftar
                    </button>
                </form>
            </div>
        </div>
    );
}
