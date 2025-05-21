import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/book/${bookId}`)
      .then(response => {
        setBook(response.data.data);
      })
      .catch(error => {
        console.error('Failed to fetch book data:', error);
      });
  }, [bookId]);

  if (!book) {
    return (
      <p className="text-center mt-10 text-purple-600 text-xl">
        Loading book details...
      </p>
    );
  }

  const categoryMap = {
    '682d7db33f79a198cb27241b': 'Fiction',
    '682d7dbe3f79a198cb27241d': 'Non-Fiction',
    '682d7d573f79a198cb272418': 'Biography',
    '682d7dc93f79a198cb27241f': 'Self Help',
  };

  const getCategoryName = (categoryId) => {
    return categoryMap[categoryId] || 'Unknown Category';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-6">
      <div className="bg-white bg-opacity-80 shadow-xl rounded-2xl p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* KIRI: Gambar & Judul */}
          <div className="flex flex-col items-center">
            <img
              src={book.cover_image}
              alt={book.title}
              className="w-full max-w-xs h-64 object-contain rounded-lg shadow-md"
            />
          </div>

          {/* KANAN: Detail Buku */}
          <div className="text-lg text-gray-800 space-y-3 pt-5">
            <h1 className="text-3xl font-bold text-purple-800 mb-4">{book.title}</h1>
            <div><strong>ID:</strong> {book._id}</div>
            <div><strong>Author:</strong> {book.author}</div>
            <div><strong>Publication Year:</strong> {book.publication_year}</div>
            <div><strong>Total Quantity:</strong> {book.total_quantity}</div>
            <div><strong>Category:</strong> {getCategoryName(book.category_id)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
