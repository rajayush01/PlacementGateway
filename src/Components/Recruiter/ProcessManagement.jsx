import React, { useState } from "react";
import {  Menu, X } from "lucide-react";

const ProcessManagement = () => {
    const [processes, setProcesses] = useState([
        {
            id: 1,
            name: "Application Screening",
            description: "Review resumes and filter qualified candidates.",
            status: "In Progress",
        },
        {
            id: 2,
            name: "Technical Interview",
            description: "Schedule and conduct technical interviews for candidates.",
            status: "Pending",
        },
        {
            id: 3,
            name: "HR Interview",
            description: "Evaluate candidates for cultural fit and finalize offers.",
            status: "Completed",
        },
    ]);

    const [expandedProcess, setExpandedProcess] = useState(null);

    const updateStatus = (id, newStatus) => {
        setProcesses((prevProcesses) =>
            prevProcesses.map((process) =>
                process.id === id ? { ...process, status: newStatus } : process
            )
        );
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
                Recruitment Process Management
            </h2>
            <div className="space-y-4">
                {processes.map((process) => (
                    <div
                        key={process.id}
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                        <div className="mb-3 sm:mb-0 w-full sm:w-auto">
                            <div className="flex justify-between items-center w-full">
                                <h3 className="text-base sm:text-lg font-bold text-gray-800">
                                    {process.name}
                                </h3>
                                <button 
                                    className="sm:hidden"
                                    onClick={() => setExpandedProcess(
                                        expandedProcess === process.id ? null : process.id
                                    )}
                                >
                                    {expandedProcess === process.id ? <X size={20} /> : <Menu size={20} />}
                                </button>
                            </div>
                            <p className={`text-sm text-gray-600 ${
                                expandedProcess === process.id || window.innerWidth >= 640 
                                    ? 'block' 
                                    : 'hidden'
                            }`}>
                                {process.description}
                            </p>
                        </div>
                        <div className={`flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto ${
                            expandedProcess === process.id || window.innerWidth >= 640 
                                ? 'block' 
                                : 'hidden'
                        }`}>
                            <span
                                className={`px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                                    process.status === "Completed"
                                        ? "bg-green-100 text-green-700"
                                        : process.status === "In Progress"
                                        ? "bg-blue-100 text-blue-700"
                                        : "bg-yellow-100 text-yellow-700"
                                }`}
                            >
                                {process.status}
                            </span>
                            {process.status !== "Completed" && (
                                <button
                                    onClick={() =>
                                        updateStatus(
                                            process.id,
                                            process.status === "Pending"
                                                ? "In Progress"
                                                : "Completed"
                                        )
                                    }
                                    className="px-3 py-2 bg-blue-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:bg-blue-700 transition w-full sm:w-auto"
                                >
                                    {process.status === "Pending"
                                        ? "Start"
                                        : "Complete"}
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessManagement;