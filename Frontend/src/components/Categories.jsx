import React, { useState, useEffect } from 'react';
import 'animate.css';
import Image1 from '../assets/image1.jpg';
import Image2 from '../assets/image2.jpg';
import Image3 from '../assets/image3.jpg';
import Image4 from '../assets/image4.jpg';
import Image5 from '../assets/image5.jpg';
import Image6 from '../assets/image6.jpg';
import Image7 from '../assets/image7.jpg';
import Image8 from '../assets/image8.jpg';
import Image9 from '../assets/image9.jpg';
import Image10 from '../assets/image10.jpg';
import Image11 from '../assets/image11.jpg';
import Image12 from '../assets/image12.jpg';
import Image13 from '../assets/image13.jpg';
import Image14 from '../assets/image14.jpg';
import Image15 from '../assets/image15.jpg';
import Image16 from '../assets/image16.avif';

const Categories = () => {
    const [selectedCategory, setSelectedCategory] = useState('Self-Love');
    const [searchQuery, setSearchQuery] = useState('');

    const products = {
        'Self-Love': [
            { title: 'You Are Enough', description: 'Embrace who you are and your worth. You are more than enough.', image: Image1 },
            { title: 'Embrace Your Journey', description: 'Your path is unique, and every step counts towards your growth.', image: Image2 },
            { title: 'Believe in Yourself', description: 'The first step to success is believing you are capable of achieving it.', image: Image3 },
            { title: 'Self-Care is Essential', description: 'Take time to care for yourself, mind, body, and soul.', image: Image4 },
        ],
        'Positivity': [
            { title: 'Every Day is a Fresh Start', description: 'Each day brings a new opportunity to grow and shine.', image: Image5 },
            { title: 'Radiate Kindness', description: 'Spread kindness wherever you go; it creates a ripple effect.', image: Image6 },
            { title: 'Focus on the Good', description: 'Look for the beauty in everything around you.', image: Image7 },
            { title: 'Good Things are Coming', description: 'Trust that the universe has great things in store for you.', image: Image8 },
        ],
        'Gratitude': [
            { title: 'Be Thankful', description: 'Gratitude turns ordinary moments into blessings.', image: Image9 },
            { title: 'Appreciate the Little Things', description: 'Happiness lies in the small moments of life.', image: Image10 },
            { title: 'Gratitude is the Key to Joy', description: 'Gratitude opens the door to a life full of joy and abundance.', image: Image11 },
            { title: 'Appreciate Yourself', description: 'Thank yourself for all the effort and strength you put into life.', image: Image12 },
        ],
        'Mindfulness': [
            { title: 'Be Present', description: 'Live in the moment and embrace what is happening right now.', image: Image13 },
            { title: 'Calm Your Mind', description: 'Peace comes from within, take time to find it.', image: Image14 },
            { title: 'Let Go of Worries', description: 'Release what you cannot control and focus on peace.', image: Image15 },
            { title: 'Live with Intention', description: 'Set clear intentions for what you want to manifest in your life.', image: Image16 },
        ],
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = products[selectedCategory].filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    useEffect(() => {
        const firstMatch = document.querySelector(`[data-title*="${searchQuery.toLowerCase()}"]`);
        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstMatch.classList.add('bg-yellow-100');
        
            // Remove highlight after 3s
            const timeout = setTimeout(() => {
                firstMatch.classList.remove('bg-yellow-100');
            }, 3000);
        
            return () => clearTimeout(timeout);
            }
        }, [searchQuery, filteredProducts]);
        

    return (
        <section className="w-full py-20 px-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <div className="max-w-7xl mx-auto">
                {/* Search Bar */}
                <div className="mb-8 text-center">
                    <input
                        type="text"
                        placeholder="Search affirmations..."
                        className="p-3 rounded-lg w-1/2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Category Section */}
                <div className="flex justify-center space-x-6 mb-8">
                    {['Self-Love', 'Positivity', 'Gratitude', 'Mindfulness'].map(category => (
                        <button
                            key={category}
                            className={`text-lg font-bold p-3 rounded-md transition-colors duration-300 ${selectedCategory === category ? 'bg-purple-700 text-white' : 'text-purple-800'}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-900 drop-shadow-md">
                    {selectedCategory} Affirmations
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {filteredProducts.map((product, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-lg p-6 text-center transition duration-300 hover:shadow-2xl hover:-translate-y-1 animate__animated animate__fadeInUp"
                            style={{ animationDelay: `${index * 0.2}s` }}
                            data-title={product.title.toLowerCase()}
                        >
                            <img
                                src={product.image}
                                alt={product.title}
                                className="w-full max-h-48 object-contain rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold text-purple-700">{product.title}</h3>
                            <p className="text-sm text-gray-600 mt-2 mb-4">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
