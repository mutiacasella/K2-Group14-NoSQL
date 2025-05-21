// src/components/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* About App */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">BiblioHaven</h3>
                    <p className="text-sm text-gray-300">
                        BiblioHaven is a simple and elegant library management platform designed to streamline book borrowing and returning. 
                        Easily track your loan history, overdue status, and manage your transactions — all in one place.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Navigation</h3>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li><a href="#hero" className="hover:text-blue-400">Home</a></li>
                        <li><Link to="/" className="hover:text-blue-400">Home</Link></li>
                        <li><Link to="/register" className="hover:text-blue-400">Borrow</Link></li>
                        <li><Link to="/return" className="hover:text-blue-400">Return</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
                    <ul className="text-sm text-gray-300 space-y-2">
                        <li>
                            Email:{" "}
                            <a
                                href="mailto:support@bibliohaven.app"
                                className="hover:text-blue-400"
                            >
                                support@bibliohaven.app
                            </a>
                        </li>
                        <li>
                            Instagram:{" "}
                            <a
                                href="https://instagram.com/amaliaaanrf"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                @bibliohaven.app
                            </a>
                        </li>
                        <li>
                            LinkedIn:{" "}
                            <a
                                href="https://www.linkedin.com/in/siti-amalia-nurfaidah/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-blue-400"
                            >
                                Biblio Haven
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-sm mt-12 text-gray-400">
                <p>&copy; 2025 BiblioHaven. All rights reserved. Crafted with care and creativity 💫</p>
            </div>
        </footer>
    );
};

export default Footer;
