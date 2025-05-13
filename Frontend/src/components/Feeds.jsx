import { useEffect } from 'react';
import 'animate.css';

const AffirmationList = ({ affirmations, loading, onDelete, searchTerm }) => {
    const filteredAffirmations = affirmations.filter(item =>
        item.message.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (searchTerm && filteredAffirmations.length > 0) {
            const firstMatch = document.querySelector(`[data-title*="${searchTerm.toLowerCase()}"]`);
            if (firstMatch) {
                firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [searchTerm, filteredAffirmations]);

    return (
        <section className="min-h-screen w-full py-16 px-6 bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 text-gray-900">
            <div className="max-w-5xl mx-auto flex flex-col items-center">
                <h2 className="text-4xl font-extrabold text-center mb-10 text-purple-900 drop-shadow-md animate__animated animate__fadeInDown">
                    Affirmations List 
                </h2>

                {loading ? (
                    <p className="text-gray-600 text-lg">Loading affirmations...</p>
                ) : filteredAffirmations.length === 0 ? (
                    <p className="text-gray-600 text-lg">No matching affirmations found 😔. Why not create your own affirmation?</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full animate__animated animate__fadeInUp">
                        {filteredAffirmations.map((item) => (
                            <div
                                key={item.id}
                                data-title={item.message.toLowerCase()}
                                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition-transform hover:-translate-y-1"
                            >
                                <p className="text-lg font-medium text-gray-800 leading-relaxed mb-2">"{item.message}"</p>
                                <p className="text-sm text-gray-500">📝 From: <span className="italic">{item.user_name || "Anonim"}</span></p>
                                <button
                                    onClick={() => onDelete(item.id)}
                                    className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default AffirmationList;
