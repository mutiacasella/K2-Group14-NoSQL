import { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        onSearch(e.target.value);
    };

    const handleHomeClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    const navItems = [
        { label: 'Home', to: '/', onClick: handleHomeClick },
        { label: 'Daftar', to: '/daftar' },
        { label: 'Pengembalian', to: '/pengembalian' },
    ];

    return (
        <nav className="bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300 text-white shadow-md sticky top-0 z-50 px-6 py-4 font-Poppins">
            <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-between gap-4">

                {/* Logo or Brand */}
                <div className="text-lg font-bold text-white-600 tracking-wide">
                    <Link to="/" onClick={handleHomeClick}>
                        BiblioHaven 
                    </Link>
                </div>

                {/* Nav Items */}
                <ul className="flex flex-wrap md:flex-nowrap justify-center gap-6 font-semibold text-sm md:text-base list-none w-full md:w-auto">
                    {navItems.map(item => (
                        <li key={item.label}>
                            <Link
                                to={item.to}
                                onClick={item.onClick} // Menambahkan handler onClick ke Home
                                className="text-white hover:text-pink-800 transition-all duration-300 ease-in-out transform hover:scale-[1.05] hover:brightness-110"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={handleSearch}
                        placeholder="Search All..."
                        className="bg-[#fef4f9] border border-pink-200 rounded-full pl-10 pr-4 py-2 text-sm w-full placeholder-pink-400 text-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-300 shadow-sm transition-all duration-200"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400 w-4 h-4" />
                </div>
            </div>
        </nav>
    );
}
