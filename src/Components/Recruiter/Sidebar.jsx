import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { HomeIcon, BriefcaseIcon, FileTextIcon, BarChartIcon, LogOutIcon } from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/login");
  };

  const menuItems = [
    { 
      path: "/dashboard/overview", 
      icon: HomeIcon, 
      label: "Overview" 
    },
    { 
      path: "/dashboard/job-postings", 
      icon: BriefcaseIcon, 
      label: "Job Postings" 
    },
    { 
      path: "/dashboard/applications", 
      icon: FileTextIcon, 
      label: "Applications" 
    },
    { 
      path: "/dashboard/analytics", 
      icon: BarChartIcon, 
      label: "Analytics" 
    }
  ];

  return (
    <div className="md:w-64 w-20 bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 h-screen transition-all duration-300">
      <h2 className="text-2xl font-bold mb-8 text-center">
        <span className="md:inline hidden">Recruiter Hub</span>
        <span className="md:hidden">RH</span>
      </h2>
      <nav className="space-y-4">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`flex items-center p-3 rounded-lg transition-all duration-200 
              ${location.pathname === item.path 
                ? 'bg-blue-600 text-white' 
                : 'hover:bg-gray-700 text-gray-300'}`}
          >
            <item.icon className="mr-3 w-5 h-5" />
            <span className="md:inline hidden">{item.label}</span>
          </Link>
        ))}
        <button 
          onClick={handleLogout} 
          className="flex items-center w-full p-3 rounded-lg hover:bg-red-600 text-gray-300 hover:text-white transition-all duration-200"
        >
          <LogOutIcon className="mr-3 w-5 h-5" />
          <span className="md:inline hidden">Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;