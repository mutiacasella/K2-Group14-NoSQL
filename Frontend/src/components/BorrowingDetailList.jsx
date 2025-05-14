import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const BorrowingDetailList = () => {
    const [borrowedList, setBorrowedList] = useState([]);
    const [overdueList, setOverdueList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBorrowings = async () => {
            try {
                const res = await fetch('http://localhost:8080/borrowing'); // Ganti ke endpoint yang bener
                const json = await res.json();

                const allData = json.data || [];

                // Ambil yang statusnya 'borrowed' dan return_date masih null
                const borrowed = allData.filter(item => item.status === 'borrowed' && item.return_date === null);

                // Ambil yang statusnya 'borrowed' dan due_date udah lewat
                const overdue = allData.filter(item =>
                    item.status === 'borrowed' &&
                    item.return_date === null &&
                    new Date(item.due_date) < new Date()
                );

                setBorrowedList(borrowed);
                setOverdueList(overdue);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching borrowings:", error);
                setLoading(false);
            }
        };

        fetchBorrowings();
    }, []);


    const handleClick = (id) => {
        navigate(`/borrowing/${id}`);
    };

    return (
        <section className="min-h-screen w-full py-16 px-6 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-900">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-900 drop-shadow-md animate__animated animate__fadeInDown">
                    Borrowing Details
                </h2>

                {loading ? (
                    <p className="text-gray-600 text-lg">Loading borrowings...</p>
                ) : (
                    <>
                        {/* Borrowed List */}
                        <div className="w-full mb-10">
                            <h3 className="text-2xl font-bold text-purple-800 mb-4">📚 Currently Borrowed</h3>
                            {borrowedList.length === 0 ? (
                                <p className="text-gray-600">No active borrowings found.</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full animate__animated animate__fadeInUp">
                                    {borrowedList.map((item) => (
                                        <div
                                            key={item._id}
                                            className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
                                            onClick={() => handleClick(item._id)}
                                        >
                                            <p className="text-lg font-medium text-gray-800 mb-2">
                                                📖 {item.book_id?.title || 'Unknown Title'}
                                            </p>
                                            <p className="text-sm text-gray-600 mb-1">👤 Borrower: {item.borrower_id?.name || 'Anonim'}</p>
                                            <p className="text-sm text-gray-500">Due: {new Date(item.due_date).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Overdue List */}
                        <div className="w-full">
                            <h3 className="text-2xl font-bold text-red-700 mb-4">⏰ Overdue Borrowings</h3>
                            {overdueList.length === 0 ? (
                                <p className="text-gray-600">No overdue borrowings 🥳</p>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full animate__animated animate__fadeInUp">
                                    {overdueList.map((item) => (
                                        <div
                                            key={item._id}
                                            className="bg-red-50 rounded-xl shadow-md p-6 border border-red-300 hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
                                            onClick={() => handleClick(item._id)}
                                        >
                                            <p className="text-lg font-medium text-red-900 mb-2">
                                                📖 {item.book_id?.title || 'Unknown Title'}
                                            </p>
                                            <p className="text-sm text-red-700 mb-1">👤 Borrower: {item.borrower_id?.name || 'Anonim'}</p>
                                            <p className="text-sm text-red-600">Due: {new Date(item.due_date).toLocaleDateString()}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default BorrowingDetailList;
