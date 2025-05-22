import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBook, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import 'animate.css';

export default function Statistics() {
    const [stats, setStats] = useState({
        total: 0,
        active: 0,
        overdue: 0,
    });

    useEffect(() => {
    async function fetchStats() {
        try {
        const response = await axios.get("http://localhost:8080/borrowing/stats");
        console.log("Stats response:", response.data);
        setStats({
            total: response.data.data.totalBorrowedRecords,
            active: response.data.data.currentlyBorrowed,
            overdue: response.data.data.overdueCount
        });
        } catch (error) {
        console.error("Failed to fetch stats:", error);
        }
    }

    fetchStats();
    }, []);

    const statItems = [
        {
        label: 'Total Borrowed',
        value: stats.total,
        icon: <FaBook className="text-pink-400" />,
        bg: 'from-pink-100 to-pink-200',
        border: 'border-pink-300'
        },
        {
        label: 'Currently Borrowed',
        value: stats.active,
        icon: <FaClock className="text-blue-400" />,
        bg: 'from-blue-100 to-blue-200',
        border: 'border-blue-300'
        },
        {
        label: 'Overdue Borrowings',
        value: stats.overdue,
        icon: <FaExclamationTriangle className="text-purple-400" />,
        bg: 'from-purple-100 to-purple-200',
        border: 'border-purple-300'
        }
    ];

    return (
        <section
        className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 w-full py-20 px-6 text-gray-900 flex flex-col items-center"
        >
        <div className="max-w-6xl w-full flex flex-col items-center">
            <h2 className="text-4xl font-extrabold text-center mb-12 text-purple-900 drop-shadow-md">
            Borrowing Statistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full">
            {statItems.map((item, index) => (
                <div
                key={index}
                className={`animate__animated animate__fadeInUp shadow-md rounded-xl p-8 text-center bg-gradient-to-br ${item.bg} border ${item.border} transition-all hover:scale-105`}
                style={{ animationDelay: `${index * 0.2}s` }}
                >
                <div className="text-5xl mb-4">{item.icon}</div>
                <div className="text-3xl font-bold text-gray-800">{item.value}</div>
                <div className="text-lg text-gray-600 mt-2">{item.label}</div>
                </div>
            ))}
            </div>
        </div>
        </section>
    );
}
