import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BorrowerDetail = () => {
    const { borrowerId } = useParams();
    const [borrowerData, setBorrowerData] = useState(null);
    const [borrowings, setBorrowings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8080/borrowing/borrower/${borrowerId}`)
        .then(response => {
            setBorrowings(response.data.data || []);
            if (response.data.data.length > 0) {
            setBorrowerData(response.data.data[0].borrower_id);
            }
            setLoading(false);
        })
        .catch(error => {
            console.error('Failed to fetch borrower details:', error);
            setLoading(false);
        });
    }, [borrowerId]);

    if (loading) {
        return (
        <p className="text-center mt-10 text-purple-600 text-xl">
            Loading borrower details...
        </p>
        );
    }

    if (!borrowerData) {
        return (
        <p className="text-center mt-10 text-red-600 text-xl">
            No borrower data found.
        </p>
        );
    }

    const categoryMap = {
        '682d7db33f79a198cb27241b': 'Fiction',
        '682d7dbe3f79a198cb27241d': 'Non-Fiction',
        '682d7d573f79a198cb272418': 'Biography',
        '682d7dc93f79a198cb27241f': 'Self Help',
    };

    const getCategoryName = (categoryId) => categoryMap[categoryId] || 'Unknown';

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-200 p-6">
        <div className="max-w-6xl mx-auto bg-white bg-opacity-80 rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl font-bold text-purple-800 mb-6 text-center">
            👤 Borrower Detail
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
                <p><strong>Name:</strong> {borrowerData.name}</p>
                <p><strong>Email:</strong> {borrowerData.email}</p>
                <p><strong>Phone:</strong> {borrowerData.phone_number}</p>
                <p><strong>Address:</strong> {borrowerData.address}</p>
            </div>
            <div>
                <p><strong>Borrower ID:</strong> {borrowerData._id}</p>
                <p><strong>Account Created:</strong> {new Date(borrowerData.createdAt).toLocaleDateString()}</p>
            </div>
            </div>

            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">📚 Books Borrowed</h2>
            {borrowings.length === 0 ? (
            <p className="text-gray-600">No books borrowed by this user.</p>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {borrowings.map((borrow) => (
                <div
                    key={borrow._id}
                    className={`rounded-xl shadow-md p-6 border transition-transform hover:shadow-xl hover:-translate-y-1
                    ${borrow.status === 'overdue' ? 'bg-red-50 border-red-300' : 'bg-white border-gray-200'}
                    `}
                >
                    <div className="flex items-center space-x-4">
                    <img
                        src={borrow.book_id?.cover_image}
                        alt={borrow.book_id?.title}
                        className="w-24 h-32 object-contain rounded-md shadow-sm"
                    />
                    <div className="text-sm space-y-1">
                        <p className="text-lg font-bold text-gray-800">{borrow.book_id?.title || 'Untitled Book'}</p>
                        <p className="text-gray-600">🖋 Author: {borrow.book_id?.author}</p>
                        <p className="text-gray-500">📅 Borrowed: {new Date(borrow.borrow_date).toLocaleDateString()}</p>
                        <p className="text-gray-500">📆 Due: {new Date(borrow.due_date).toLocaleDateString()}</p>
                        <p className="text-gray-500">📚 Category: {getCategoryName(borrow.book_id?.category_id)}</p>
                        <p className={`font-semibold ${borrow.status === 'overdue' ? 'text-red-600' : 'text-green-700'}`}>
                        Status: {borrow.status}
                        </p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>
        </div>
    );
};

export default BorrowerDetail;
