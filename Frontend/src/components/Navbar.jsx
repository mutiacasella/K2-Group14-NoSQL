import { Link } from 'react-router-dom';

export default function Navbar() {

    const handleHomeClick = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    };

    const navItems = [
        { label: 'Home', to: '/', onClick: handleHomeClick },
        { label: 'Register', to: '/register' },
        { label: 'Return', to: '/return' },
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
            </div>
        </nav>
    );
}
