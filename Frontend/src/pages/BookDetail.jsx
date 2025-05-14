import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

// Mapping manual bookId ke image
const imageMap = {
  '68248f5101e942aee0146e0b': Image1,
  '68248f4601e942aee0146e09': Image2,
  '68248f3d01e942aee0146e07': Image3,
  '68248f3001e942aee0146e05': Image4,
  '68248f1f01e942aee0146e03': Image5,
  '68248f1401e942aee0146e01': Image6,
  '68248f0a01e942aee0146dff': Image7,
  '68248f0001e942aee0146dfd': Image8,
  '68248ef501e942aee0146dfb': Image9,
  '68248ee101e942aee0146df9': Image10,
  '68248ed501e942aee0146df7': Image11,
  '68248ecb01e942aee0146df5': Image12,
  '68248eb801e942aee0146df3': Image13,
  '68248eae01e942aee0146df1': Image14,
  '68248ea101e942aee0146def': Image15,
  '68248e8601e942aee0146ded': Image16,
};

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

    const selectedImage = imageMap[book._id] || Image16;

    const categoryMap = {
        '68248d1d01e942aee0146dea': 'Self Help',
        '68248d1101e942aee0146de8': 'Biography',
        '68248d0601e942aee0146de6': 'Non-Fiction',
        '68248cf801e942aee0146de4': 'Fiction',
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
              src={selectedImage}
              alt={book.title}
              className="w-full max-w-md object-cover rounded-lg shadow-md"
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
