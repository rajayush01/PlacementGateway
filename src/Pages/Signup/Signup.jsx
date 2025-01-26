import React, { useState } from "react";
import admin from "../../assets/admin.png";
import recruiter from "../../assets/recruiter.png";
import student from "../../assets/student.png";
import { Navbar } from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";


const SignupPage = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        id: "",
        companyName: "",
        college: "",
    });

    const [showRolePopup, setShowRolePopup] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRoleSelection = (selectedRole) => {
        setRole(selectedRole);
        setShowRolePopup(false);
        console.log(`Role selected: ${selectedRole}`);
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Signup Details:", {
            ...formData,
            role: role,
            passwordLength: formData.password.length,
            timestamp: new Date().toISOString()
        });

        switch (role) {
            case "Student":
                navigate("/student-form", { 
                    state: { 
                        name: formData.name, 
                        email: formData.email, 
                        phone: formData.phone,
                        college: formData.college,
                        id: formData.id
                    } 
                });
                break;
            case "Recruiter":
                navigate("/recruiter");
                break;
            case "Admin":
                navigate("/admin");
            break;
            default:
                alert("Please select a role");
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#E5F4FE]">
            <Navbar />
            <div className="flex-grow flex items-center justify-center p-4 pt-24">
                <form
                    onSubmit={handleSignup}
                    className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-lg space-y-4 transform transition-all hover:scale-[1.01]"
                >
                    <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
                        Create Your Account
                    </h2>

                    {/* Input Fields */}
                    {["name", "email", "phone"].map((field) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                            >
                                {field.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                id={field}
                                name={field}
                                type={field === "email" ? "email" : "text"}
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    ))}

                    <div>
                        <label htmlFor="college" className="block text-sm font-medium text-gray-700 mb-1">
                            College Name
                        </label>
                        <input
                            id="college"
                            name="college"
                            type="text"
                            value={formData.college}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                            required
                        />
                    </div>

                    {/* Role-Specific Fields */}
                    {role === "Admin" && (
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                                Admin ID
                            </label>
                            <input
                                id="id"
                                name="id"
                                type="text"
                                value={formData.id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    )}
                    {role === "Student" && (
                        <div>
                            <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                                Student ID
                            </label>
                            <input
                                id="id"
                                name="id"
                                type="text"
                                value={formData.id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    )}
                    {role === "Recruiter" && (
                        <>
                            <div>
                                <label htmlFor="id" className="block text-sm font-medium text-gray-700 mb-1">
                                    Recruiter ID
                                </label>
                                <input
                                    id="id"
                                    name="id"
                                    type="text"
                                    value={formData.id}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                </label>
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Password Fields */}
                    {["password", "confirmPassword"].map((field) => (
                        <div key={field}>
                            <label
                                htmlFor={field}
                                className="block text-sm font-medium text-gray-700 mb-1 capitalize"
                            >
                                {field.replace(/([A-Z])/g, " $1")}
                            </label>
                            <input
                                id={field}
                                name={field}
                                type="password"
                                value={formData[field]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                                required
                            />
                        </div>
                    ))}

                    {/* Role Selection */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setShowRolePopup(true)}
                            className="w-full bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-[#D1D5DB] transition-colors"
                        >
                            {role ? `Role: ${role}` : "Choose Role"}
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        Sign Up
                    </button>
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

export default SignupPage;