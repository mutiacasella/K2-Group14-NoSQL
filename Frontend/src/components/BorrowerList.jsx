import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'animate.css';

const BorrowerList = () => {
    const [borrowers, setBorrowers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBorrowers = async () => {
            try {
                const res = await fetch('http://localhost:8080/borrower');
                const json = await res.json();
                setBorrowers(json.data || []);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching borrowers:", error);
                setLoading(false);
            }
        };

        fetchBorrowers();
    }, []);

    const handleClick = (id) => {
        navigate(`/borrower/${id}`);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBorrowers = borrowers.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(borrowers.length / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const goToPrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <section className="min-h-screen w-full py-16 px-6 bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 text-gray-900">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-pink-600 drop-shadow-md animate__animated animate__fadeInDown">
                    Borrower List
                </h2>

                {loading ? (
                    <p className="text-gray-600 text-lg">Loading borrowers...</p>
                ) : borrowers.length === 0 ? (
                    <p className="text-gray-600 text-lg">No borrowers found.</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full animate__animated animate__fadeInUp">
                            {currentBorrowers.map((borrower) => (
                                <div
                                    key={borrower._id}
                                    className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-transform hover:-translate-y-1 cursor-pointer"
                                    onClick={() => handleClick(borrower._id)}
                                >
                                    <p className="text-lg font-medium text-gray-800">
                                        👤 {borrower.name}
                                    </p>
                                    <p className="text-sm text-gray-600">
                                        📧 {borrower.email || 'No email'}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8 gap-2">
                            <button
                                onClick={goToPrevPage}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                            >
                                &lt;
                            </button>

                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToPage(index + 1)}
                                    className={`px-4 py-2 rounded ${
                                        currentPage === index + 1
                                            ? 'bg-pink-400 text-white'
                                            : 'bg-gray-200 hover:bg-gray-300'
                                    }`}
                                >
                                    {index + 1}
                                </button>
                            ))}

                            <button
                                onClick={goToNextPage}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 disabled:opacity-50"
                            >
                                &gt;
                            </button>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default BorrowerList;