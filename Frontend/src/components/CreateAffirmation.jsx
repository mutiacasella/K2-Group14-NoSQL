import { useState } from "react";
import { createAffirmation } from "../actions/Affirmations.actions";

export default function CreateAffirmationPage({ onSuccess }) {
    const [message, setMessage] = useState("");
    const [userName, setUserName] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSuccessMsg("");

        if (message.trim().length < 5) {
            setErrorMsg("Tolong tulis affirmation yang lebih panjang ✨");
            setLoading(false);
            return;
        }

        const input = {
            message,
            user_name: userName || "Anonim",
        };

        const result = await createAffirmation(input);

        if (result.success) {
            setMessage("");
            setUserName("");
            setSuccessMsg("Berhasil disimpan! 🌈");
            if (onSuccess) onSuccess();
            setTimeout(() => setSuccessMsg(""), 3000);
        } else {
            setErrorMsg("Gagal menambahkan affirmation 😢");
        }

        setLoading(false);
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-100 px-4 py-16">
            <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-center text-purple-700 mb-6 drop-shadow-sm">
                    Create Your Affirmations ✨
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your name (optional)"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-300"
                        rows="5"
                        placeholder="Write your affirmations here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    />
                    {errorMsg && <p className="text-red-600 text-sm">{errorMsg}</p>}
                    {successMsg && <p className="text-green-600 text-sm">{successMsg}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-3 px-6 text-white font-medium rounded-lg transition-colors duration-300 ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-purple-600 hover:bg-purple-700"
                        }`}
                    >
                        {loading ? "Menyimpan..." : "Submit"}
                    </button>
                </form>
            </div>
        </section>
    );
}
