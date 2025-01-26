import React, { useState } from "react";
import { Search, Filter, FileText, X } from 'lucide-react';

const Applications = () => {
  const [applications, setApplications] = useState([
    { 
      id: 1, 
      name: "John Doe", 
      position: "Software Engineer", 
      gpa: 8.5, 
      status: "pending" 
    },
    { 
      id: 2, 
      name: "Jane Smith", 
      position: "Data Analyst", 
      gpa: 9.0, 
      status: "pending" 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleStatusChange = (id, status) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, status } : app
    ));
  };

  const filteredApplications = applications.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter === "all" || app.status === filter)
  );

  return (
    <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-6">Candidate Applications</h2>
        
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button 
            onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            className="w-full flex items-center justify-center py-2 bg-primary-100 text-primary-600 rounded-lg"
          >
            {isMobileFilterOpen ? <X className="mr-2" /> : <Filter className="mr-2" />}
            {isMobileFilterOpen ? 'Close Filters' : 'Open Filters'}
          </button>
        </div>

        {/* Filter Container - Responsive Layout */}
        <div className={`
          ${isMobileFilterOpen ? 'block' : 'hidden'} 
          md:block mb-6 space-y-4 md:space-y-0 md:flex md:space-x-4
        `}>
          <div className="relative flex-grow mb-2 md:mb-0">
            <input 
              type="text" 
              placeholder="Search candidates" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-auto px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="space-y-4">
          {filteredApplications.map(app => (
            <div 
              key={app.id} 
              className="bg-white rounded-lg shadow-md p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between hover:shadow-lg transition"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{app.name}</h3>
                <p className="text-gray-600">{app.position}</p>
                <p className="text-gray-500">GPA: {app.gpa}</p>
              </div>
              <div className="flex flex-wrap justify-end gap-2 sm:gap-3 w-full sm:w-auto">
                <button 
                  onClick={() => handleStatusChange(app.id, "shortlisted")}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition ${
                    app.status === 'shortlisted' 
                      ? 'bg-green-500 text-white' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  Shortlist
                </button>
                <button 
                  onClick={() => handleStatusChange(app.id, "rejected")}
                  className={`flex items-center px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base transition ${
                    app.status === 'rejected' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                  }`}
                >
                  Reject
                </button>
                <button className="bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 sm:px-4 py-2 rounded-md flex items-center text-sm sm:text-base">
                  <FileText size={18} className="mr-2" /> Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Applications;