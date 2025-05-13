import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import profilePic from "../../assets/profile-pic.jpg";

const Profile = () => {
    const user = {
        name: "Siti Amalia Nurfaidah",
        email: "sitiamalianurfaidah@gmail.com",
        instagram: "https://instagram.com/amaliaaanrf",
        linkedin: "https://linkedin.com/in/siti-amalia-nurfaidah",
        profilePicture: profilePic,
        appName: "Twinkly",
        appDescription:
        "Twinkly is a platform designed to bring positivity into your life through personalized affirmations. Whether you need a quick boost of motivation or a reminder to stay positive, Twinkly helps you discover the power of words and their impact on mental well-being.",
        mission:
        "To inspire and spread positivity through affirmations that encourage self-love, confidence, and resilience.",
        vision:
        "To create a supportive community where everyone can access tools to uplift themselves and others through the power of words.",
        bio: "A creative soul passionate about mental wellness & digital design 💫",
        hobbies: ["🌸 Self-Love", "🎨 Design", "🧘 Mindfulness"],
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-pink-100 via-purple-200 to-indigo-200 py-8 flex justify-center">
        <div className="flex max-w-4xl w-full space-x-8">
            {/* Left Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 w-1/3 space-y-5 border-2 border-pink-300">
            <div className="flex justify-center">
                <img
                src={user.profilePicture}
                alt="Profile"
                className="w-44 h-44 rounded-full border-4 border-pink-400 shadow-md"
                />
            </div>
            <h1 className="text-2xl font-extrabold text-center text-purple-700">
                {user.name}
            </h1>
            <p className="text-center text-sm text-gray-600 italic">{user.bio}</p>

            <div className="flex flex-wrap justify-center gap-2 text-sm text-white">
                {user.hobbies.map((hobby, idx) => (
                <span
                    key={idx}
                    className={`px-3 py-1 rounded-full ${
                    idx === 0
                        ? "bg-pink-400"
                        : idx === 1
                        ? "bg-purple-400"
                        : "bg-indigo-400"
                    }`}
                >
                    {hobby}
                </span>
                ))}
            </div>

            <div className="flex justify-center space-x-4 pt-2 text-purple-600">
                <a
                href={`mailto:${user.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-purple-800"
                >
                <FaEnvelope />
                </a>
                <a
                href={user.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-purple-800"
                >
                <FaInstagram />
                </a>
                <a
                href={user.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl hover:text-purple-800"
                >
                <FaLinkedin />
                </a>
            </div>
            </div>

            {/* Right Section */}
            <div className="w-2/3 space-y-6">
            {/* About Box */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-300">
                <p className="text-2xl font-extrabold text-purple-700 mb-2">
                About {user.appName}
                </p>
                <p className="text-gray-600">{user.appDescription}</p>
            </div>

            {/* Mission Box */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-300">
                <p className="text-2xl font-extrabold text-purple-700 mb-2">
                Mission
                </p>
                <p className="text-gray-600">{user.mission}</p>
            </div>

            {/* Vision Box */}
            <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-pink-300">
                <p className="text-2xl font-extrabold text-purple-700 mb-2">
                Vision
                </p>
                <p className="text-gray-600">{user.vision}</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
