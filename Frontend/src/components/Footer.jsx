// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = ({ onCreateClick }) => {
    return (
        <footer className="footer bg-gray-900 text-white py-12">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* About App */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Twinkly</h3>
                    <p className="text-sm">
                        This app helps you save and organize positive affirmations 
                        to stay motivated and focused throughout your day.
                    </p>
                </div>

                {/* Navigation */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Navigation</h3>
                    <ul className="text-sm">
                        <li><a href="/" className="hover:text-blue-400">Home</a></li>
                        <li>
                            {/* Ganti href dengan button agar tidak pindah halaman */}
                            <button
                                onClick={onCreateClick}
                                className="hover:text-blue-400 underline"
                            >
                                Create Affirmation
                            </button>
                        </li>                      
                        <li><Link to="/user/about" className="hover:text-blue-400">About</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="font-semibold text-lg mb-4">Contact</h3>
                    <ul className="text-sm">
                        <li>Email: <a href="https://www.linkedin.com/in/siti-amalia-nurfaidah/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">support@twinkly.app</a></li>
                        <li>Instagram: <a href="https://instagram.com/amaliaaanrf" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">@affirmations.app</a></li>
                    </ul>
                </div>
            </div>

            <div className="text-center text-sm mt-12">
                <p>&copy; 2025 Twinkly App. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
