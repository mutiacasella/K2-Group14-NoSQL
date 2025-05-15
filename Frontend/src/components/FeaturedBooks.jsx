import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Image1 from '../assets/image1.jpg';
import Image2 from '../assets/image6.jpg';
import Image3 from '../assets/image9.jpg';
import Image4 from '../assets/image14.jpg';
import 'animate.css';

export default function FeaturedBooks({ searchTerm }) {
  const containerRef = useRef(null);

  // Featured Books (Use the same books as in Categories component)
  const featuredBooks = [
    {
      bookId: '68248f5101e942aee0146e0b',
      title: 'The Great Gatsby',
      description: 'A story of wealth, love, and the American Dream.',
      image: Image1
    },
    {
      bookId: '68248f1401e942aee0146e01',
      title: 'Atomic Habits',
      description: 'Tiny changes, remarkable results.',
      image: Image2
    },
    {
      bookId: '68248ef501e942aee0146dfb',
      title: 'Steve Jobs',
      description: 'The life of Apple’s visionary founder.',
      image: Image3
    },
    {
      bookId: '68248eae01e942aee0146df1',
      title: 'The 7 Habits of Highly Effective People',
      description: 'Principles for personal and professional success.',
      image: Image4
    }
  ];

  // Filtered featured books based on the search term
  const filteredBooks = featuredBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.description.toLowerCase().includes(searchTerm)
  );

  // Highlight the search term within the text
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
    if (searchTerm && filteredBooks.length > 0) {
      // Remove previous highlights
      const allCards = document.querySelectorAll('.book-card');
      allCards.forEach(card => card.classList.remove('bg-yellow-100'));

      // Scroll & highlight the first matching book
      const firstMatch = allCards[0];
      if (firstMatch) {
        firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstMatch.classList.add('bg-yellow-100');
      }
    }
  }, [searchTerm, filteredBooks]);

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

    const cards = containerRef.current?.querySelectorAll('.book-card');
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
          Featured Books
        </h2>

        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {filteredBooks.map((book, index) => (
            <div
              key={book.bookId}
              className="book-card opacity-0 bg-white rounded-xl shadow-lg p-6 text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.2}s` }}
              data-title={book.title}
            >
              <img
                src={book.image}
                alt={book.title}
                className="w-full max-h-48 object-contain rounded-md mb-4"
              />
              <Link
                to={`/book/${book.bookId}`}
                className="text-lg font-semibold text-purple-700 hover:underline"
              >
                {highlightText(book.title, searchTerm)}
              </Link>
              <p className="text-sm text-gray-600 mt-2 mb-4">
                {highlightText(book.description, searchTerm)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
