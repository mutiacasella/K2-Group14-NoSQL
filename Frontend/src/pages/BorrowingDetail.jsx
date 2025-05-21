import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import 'animate.css';

const BorrowingDetail = () => {
    const { borrowingId } = useParams();
    const navigate = useNavigate();
    const [borrowing, setBorrowing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBorrowing = async () => {
            try {
                const res = await fetch(`http://localhost:8080/borrowing/${borrowingId}`);
                const data = await res.json();

                if (data.success) {
                    setBorrowing(data.data);
                } else {
                    console.error(data.message);
                }
            } catch (err) {
                console.error("Error fetching borrowing detail:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBorrowing();
    }, [borrowingId]);

    if (loading) {
        return (
            <section className="min-h-screen flex justify-center items-center bg-gray-100">
                <p className="text-lg text-gray-600">Loading borrowing detail...</p>
            </section>
        );
    }

    if (!borrowing) {
        return (
            <section className="min-h-screen flex justify-center items-center bg-gray-100">
                <p className="text-lg text-red-500">Borrowing not found.</p>
            </section>
        );
    }

    return (
        <section className="min-h-screen px-6 py-16 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-100">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 animate__animated animate__fadeIn">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 text-sm text-blue-600 hover:underline"
                >
                    ← Back to Borrowing List
                </button>

                <h2 className="text-3xl font-bold text-purple-900 mb-6">📘 Borrowing Detail</h2>

                <div className="space-y-4 text-gray-800">
                    <p><span className="font-semibold">Book Title:</span> {borrowing.book_id?.title || 'Unknown'}</p>
                    <p><span className="font-semibold">Author:</span> {borrowing.book_id?.author || 'Unknown'}</p>
                    <p><span className="font-semibold">Borrower Name:</span> {borrowing.borrower_id?.name || 'Anonim'}</p>
                    <p><span className="font-semibold">Borrower Email:</span> {borrowing.borrower_id?.email || '-'}</p>
                    <p><span className="font-semibold">Borrowing ID:</span> {borrowing._id || 'Unknown'}</p>
                    <p><span className="font-semibold">Borrowed Date:</span> {new Date(borrowing.borrow_date).toLocaleDateString()}</p>
                    <p><span className="font-semibold">Due Date:</span> {new Date(borrowing.due_date).toLocaleDateString()}</p>
                    <p>
                        <span className="font-semibold">Status:</span>{" "}
                        <span className={`font-bold px-2 py-1 rounded-md ${borrowing.status === "overdue" ? "bg-red-200 text-red-800" : borrowing.status === "returned" ? "bg-green-200 text-green-800" : "bg-blue-100 text-blue-800"}`}>
                            {borrowing.status}
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BorrowingDetail;
