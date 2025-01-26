import React, { useState } from "react";
import admin from "../../assets/admin.png";
import recruiter from "../../assets/recruiter.png";
import student from "../../assets/student.png";
import { Navbar } from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showRolePopup, setShowRolePopup] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);
    const [college, setCollege] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        if (!selectedRole) {
            setShowRolePopup(true);
            return;
        }

        console.log("Login Details:", {
            email: email,
            passwordLength: password.length,
            role: selectedRole,
            college: college,
            timestamp: new Date().toISOString()
        });

        switch (selectedRole) {
            case "Student":
                navigate("/student");
                break;
            case "Recruiter":
                navigate("/recruiter");
                break;
            case "Admin":
                navigate("/admin");
                break;
            default:
                alert("Invalid role selected");
        }
    };

    const handleRoleSelection = (role) => {
        setSelectedRole(role);
        setShowRolePopup(false);
        console.log(`Role selected: ${role}`);
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#E5F4FE]">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-4 pt-24">
                <form
                    onSubmit={handleLogin}
                    className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md space-y-6 transform transition-all hover:scale-[1.01]"
                >
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                        Welcome Back
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                            College Name
                        </label>
                        <input
                            id="college"
                            type="text"
                            value={college}
                            onChange={(e) => setCollege(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                            required
                        />
                    </div>

                    {selectedRole && (
                        <div className="text-center">
                            <span className="font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
                                Role: {selectedRole}
                            </span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={() => setShowRolePopup(true)}
                            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            {selectedRole ? "Change Role" : "Choose Role"}
                        </button>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Login
                        </button>
                    </div>

                    <p className="text-sm text-center">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-indigo-600 hover:underline">
                            Sign up
                        </a>
                    </p>
                </form>

                {/* Role Selection Popup */}
                {showRolePopup && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                        <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
                            <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">
                                Choose Your Role
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                {[
                                    { role: "Admin", image: admin },
                                    { role: "Student", image: student },
                                    { role: "Recruiter", image: recruiter },
                                ].map((option) => (
                                    <button
                                        key={option.role}
                                        type="button"
                                        onClick={() => handleRoleSelection(option.role)}
                                        className="flex items-center bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200 transition-colors"
                                    >
                                        <img
                                            src={option.image}
                                            alt={option.role}
                                            className="w-12 h-12 mr-4"
                                        />
                                        <span className="text-xl font-semibold">{option.role}</span>
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => setShowRolePopup(false)}
                                className="mt-6 w-full text-center text-indigo-600 hover:underline"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
