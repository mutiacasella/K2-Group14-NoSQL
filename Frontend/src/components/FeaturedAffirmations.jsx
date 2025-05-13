import React, { useEffect, useRef } from 'react';
import Product1 from '../assets/image17.jpg';
import Product2 from '../assets/image18.jpg';
import Product3 from '../assets/image19.jpg';
import Product4 from '../assets/image20.jpg';
import 'animate.css';

export default function FeaturedAffirmations({searchTerm}) {
    const containerRef = useRef(null);

    const affirmations = [
        {
            title: 'You Are Enough',
            description: 'Believe in yourself, you are stronger than you think!',
            image: Product1
        },
        {
            title: 'Every Day is a Fresh Start',
            description: 'Embrace each new day as a new opportunity to grow.',
            image: Product3
        },
        {
            title: 'You Deserve the Best',
            description: 'You are worthy of happiness, success, and love.',
            image: Product2
        },
        {
            title: 'Be Your Own Motivation',
            description: 'Start from within and let your inner strength shine.',
            image: Product4
        }
    ];

    const filteredAffirmations = affirmations.filter(affirmation =>
        affirmation.title.toLowerCase().includes(searchTerm) ||
        affirmation.description.toLowerCase().includes(searchTerm)
    );

    const highlightText = (text, term) => {
        if (!term) return text;
        const parts = text.split(new RegExp(`(${term})`, 'gi'));
        return parts.map((part, index) =>
            part.toLowerCase() === term.toLowerCase()
                ? <span key={index} className="bg-yellow-200">{part}</span>
                : part
        );
    };

    useEffect(() => {
        if (searchTerm && filteredAffirmations.length > 0) {
            // Hapus semua highlight sebelumnya
            const allCards = document.querySelectorAll('.affirmation-card');
            allCards.forEach(card => card.classList.remove('bg-yellow-100'));
    
            // Scroll & highlight card pertama yang cocok
            const firstMatch = allCards[0];
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstMatch.classList.add('bg-yellow-100');
            }
        }
    }, [searchTerm, filteredAffirmations]);    

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    entry.target.classList.remove('opacity-0');
                }
            });
        }, {
            threshold: 0.2
        });

        const cards = containerRef.current?.querySelectorAll('.affirmation-card');
        cards?.forEach(card => observer.observe(card));

        return () => {
            cards?.forEach(card => observer.unobserve(card));
        };
    }, []);


    return (
        <section
            id="featured"
            className="bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 w-full py-20 px-6 text-gray-900 flex flex-col items-center"
        >
            <div className="max-w-7xl w-full flex flex-col items-center">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-900 drop-shadow-md">
                    Featured Affirmations
                </h2>

                <div
                    ref={containerRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
                >
                    {filteredAffirmations.map((affirmation, index) => (
                        <div
                            key={index}
                            className="affirmation-card opacity-0 bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                            style={{ animationDelay: `${index * 0.2}s` }}
                            data-title={affirmation.title}
                        >
                            <img
                                src={affirmation.image}
                                alt={affirmation.title}
                                className="w-full max-h-48 object-contain rounded-md mb-4"
                            />
                            <h3 className="text-lg font-semibold text-purple-700">{highlightText(affirmation.title, searchTerm)}</h3>
                            <p className="text-sm text-gray-600 mt-2 mb-4">{highlightText(affirmation.description, searchTerm)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
