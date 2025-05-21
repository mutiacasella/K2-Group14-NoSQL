import React, { useState, useEffect } from 'react';
import 'animate.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('Fiction');
  const [searchQuery, setSearchQuery] = useState('');
  const [booksData, setBooksData] = useState([]);
  const [groupedBooks, setGroupedBooks] = useState({});

  // Mapping kategori ID ke nama kategori (bisa dari backend nanti)
  const categoryMap = {
    '682d7dbe3f79a198cb27241d': 'Non-Fiction',
    '682d7d573f79a198cb272418': 'Biography',
    '682d7dc93f79a198cb27241f': 'Self-Help',
    '682d7db33f79a198cb27241b': 'Fiction',
  };

  // Ambil data dari backend
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get('http://localhost:8080/book'); // Ganti URL sesuai backend kamu
        const books = res.data.data;

        // Kelompokkan buku berdasarkan kategori
        const grouped = {};
        books.forEach(book => {
          const categoryName = categoryMap[book.category_id] || 'Others';
          if (!grouped[categoryName]) grouped[categoryName] = [];
          grouped[categoryName].push(book);
        });

        setBooksData(books);
        setGroupedBooks(grouped);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredBooks = (groupedBooks[selectedCategory] || []).filter(book =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
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
      <h2 className="text-5xl font-extrabold text-center mb-10 text-purple-900 drop-shadow-md">
        Categories
      </h2>
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
          {Object.keys(groupedBooks).map(category => (
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

        {/* Books Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBooks.map((book, index) => (
            <div
              key={book._id}
              className="bg-white rounded-xl shadow-lg p-6 text-center transition duration-300 hover:shadow-2xl hover:-translate-y-1 animate__animated animate__fadeInUp"
              style={{ animationDelay: `${index * 0.2}s` }}
              data-title={book.title.toLowerCase()}
            >
              <img
                src={book.cover_image}
                alt={book.title}
                className="w-full max-h-48 object-contain rounded-md mb-4"
              />
              <Link
                to={`/book/${book._id}`}
                className="text-lg font-semibold text-purple-700 hover:underline"
              >
                {book.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
