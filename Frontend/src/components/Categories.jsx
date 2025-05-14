import React, { useState, useEffect } from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';
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
  const [selectedCategory, setSelectedCategory] = useState('Fiction');
  const [searchQuery, setSearchQuery] = useState('');

  const books = {
    'Fiction': [
      { bookId: '68248f5101e942aee0146e0b', title: 'The Great Gatsby', description: 'A story of wealth, love, and the American Dream.', image: Image1 },
      { bookId: '68248f4601e942aee0146e09', title: 'To Kill a Mockingbird', description: 'A powerful novel about racial injustice.', image: Image2 },
      { bookId: '68248f3d01e942aee0146e07', title: '1984', description: 'A dystopian future under surveillance and control.', image: Image3 },
      { bookId: '68248f3001e942aee0146e05', title: 'Pride and Prejudice', description: 'Classic romance and social commentary.', image: Image4 },
    ],
    'Non-Fiction': [
      { bookId: '68248f1f01e942aee0146e03', title: 'Sapiens', description: 'A brief history of humankind.', image: Image5 },
      { bookId: '68248f1401e942aee0146e01', title: 'Atomic Habits', description: 'Tiny changes, remarkable results.', image: Image6 },
      { bookId: '68248f0a01e942aee0146dff', title: 'Educated', description: 'A memoir of transformation through education.', image: Image7 },
      { bookId: '68248f0001e942aee0146dfd', title: 'Thinking, Fast and Slow', description: 'Explore how we think and make decisions.', image: Image8 },
    ],
    'Biography': [
      { bookId: '68248ef501e942aee0146dfb', title: 'Steve Jobs', description: 'The life of Apple’s visionary founder.', image: Image9 },
      { bookId: '68248ee101e942aee0146df9', title: 'Becoming', description: 'Michelle Obama’s inspiring journey.', image: Image10 },
      { bookId: '68248ed501e942aee0146df7', title: 'The Diary of a Young Girl', description: 'Anne Frank’s words during the Holocaust.', image: Image11 },
      { bookId: '68248ecb01e942aee0146df5', title: 'Long Walk to Freedom', description: 'Nelson Mandela’s autobiography.', image: Image12 },
    ],
    'Self-Help': [
      { bookId: '68248eb801e942aee0146df3', title: 'The Power of Now', description: 'Spiritual enlightenment through presence.', image: Image13 },
      { bookId: '68248eae01e942aee0146df1', title: 'The 7 Habits of Highly Effective People', description: 'Principles for personal and professional success.', image: Image14 },
      { bookId: '68248ea101e942aee0146def', title: 'Can’t Hurt Me', description: 'Master your mind and defy the odds.', image: Image15 },
      { bookId: '68248e8601e942aee0146ded', title: 'Daring Greatly', description: 'The courage to be vulnerable.', image: Image16 },
    ],
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredBooks = books[selectedCategory].filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const firstMatch = document.querySelector(`[data-title*="${searchQuery.toLowerCase()}"]`);
    if (firstMatch) {
      firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
      firstMatch.classList.add('bg-yellow-100');

      const timeout = setTimeout(() => {
        firstMatch.classList.remove('bg-yellow-100');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [searchQuery, filteredBooks]);

  return (
    <section className="w-full py-20 px-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar */}
        <div className="mb-8 text-center">
          <input
            type="text"
            placeholder="Search books..."
            className="p-3 rounded-lg w-1/2 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Buttons */}
        <div className="flex justify-center space-x-6 mb-8">
          {['Fiction', 'Non-Fiction', 'Biography', 'Self-Help'].map(category => (
            <button
              key={category}
              className={`text-lg font-bold p-3 rounded-md transition-colors duration-300 ${
                selectedCategory === category ? 'bg-purple-700 text-white' : 'text-purple-800'
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-900 drop-shadow-md">
          {selectedCategory} Books
        </h2>

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book, index) => (
            <div
              key={book.bookId}
              className="bg-white rounded-xl shadow-lg p-6 text-center transition duration-300 hover:shadow-2xl hover:-translate-y-1 animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
              data-title={book.title.toLowerCase()}
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
                {book.title}
              </Link>
              <p className="text-sm text-gray-600 mt-2 mb-4">{book.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
