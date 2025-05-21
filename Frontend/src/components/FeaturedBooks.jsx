import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'animate.css';

export default function FeaturedBooks({ searchTerm }) {
  const containerRef = useRef(null);
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    async function fetchTopBooks() {
      try {
        const response = await axios.get("http://localhost:8080/borrowing/topborrowed");
        const books = response.data.data.map(item => ({
          bookId: item.book._id,
          title: item.book.title,
          image: item.book.cover_image || "https://via.placeholder.com/150" // default if missing
        }));
        setFeaturedBooks(books);
      } catch (err) {
        console.error("Failed to fetch top borrowed books:", err);
      }
    }

    fetchTopBooks();
  }, []);

  const filteredBooks = featuredBooks.filter(book =>
    book.title.toLowerCase().includes(searchTerm) ||
    book.description.toLowerCase().includes(searchTerm)
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
    if (searchTerm && filteredBooks.length > 0) {
      const allCards = document.querySelectorAll('.book-card');
      allCards.forEach(card => card.classList.remove('bg-yellow-100'));

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
  }, [featuredBooks]);

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
