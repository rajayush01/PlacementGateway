import React, { useState } from "react";
import {
  LayoutDashboard,
  BriefcaseIcon,
  Users,
  FileText,
  TrendingUp,
  PieChart,
  CheckCircle2,
  AlertCircle,
  LogOut,
  Menu,
  X
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  CartesianGrid,
} from "recharts";
import JobPostings from "../../Components/Recruiter/JobPosting";
import Applications from "../../Components/Recruiter/Applications";
import ProcessManagement from "../../Components/Recruiter/ProcessManagement";
import logo from "../../assets/logo.png";
import Overview from "../../Components/Recruiter/Overview";

// Mock Data
const applicationsData = [
  { month: "Jan", applications: 30 },
  { month: "Feb", applications: 45 },
  { month: "Mar", applications: 60 },
  { month: "Apr", applications: 75 },
  { month: "May", applications: 90 },
];

const sectorData = [
  { name: "Tech", value: 40 },
  { name: "Finance", value: 30 },
  { name: "Consulting", value: 20 },
  { name: "Others", value: 10 },
];

const DashboardRecruiter_Login = () => {
  const [stats] = useState({
    totalApplications: 120,
    shortlistedCandidates: 45,
    rejectedCandidates: 30,
    pendingReview: 45,
  });

  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [activeSidebar, setActiveSidebar] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    window.location.href = '/login';
  };

  const renderContent = () => {
    switch (activeComponent) {
      case "jobPostings":
        return <JobPostings />;
      case "applications":
        return <Applications />;
      case "processManagement":
        return <ProcessManagement />;
      case "analytics":
        return <Overview />;
      default:
        return (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <StatCard
                icon={<BriefcaseIcon className="text-blue-500" />}
                title="Total Applications"
                value={stats.totalApplications}
                color="bg-blue-100"
              />
              <StatCard
                icon={<CheckCircle2 className="text-green-500" />}
                title="Shortlisted"
                value={stats.shortlistedCandidates}
                color="bg-green-100"
              />
              <StatCard
                icon={<AlertCircle className="text-red-500" />}
                title="Rejected"
                value={stats.rejectedCandidates}
                color="bg-red-100"
              />
              <StatCard
                icon={<Users className="text-purple-500" />}
                title="Pending Review"
                value={stats.pendingReview}
                color="bg-purple-100"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Application Trend Line Chart */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Application Trends
                  </h2>
                  <TrendingUp className="text-green-500" />
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={applicationsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="applications"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recruitment Sector Distribution */}
              <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    Job Sector Distribution
                  </h2>
                  <PieChart className="text-purple-500" />
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={sectorData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activity & Upcoming Events */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <RecentActivity />
              <UpcomingInterviews />
            </div>
          </div>
        );
    }
  };

  // If not logged in, you could render a login redirect or component
  if (!isLoggedIn) {
    return null; // Or redirect logic
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <h2 className="text-xl font-bold text-gray-800">Placement Gateway</h2>
          </div>
          <button 
            onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMobileSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <Sidebar
          setActiveComponent={setActiveComponent}
          activeSidebar={activeSidebar}
          setActiveSidebar={setActiveSidebar}
          isMobileSidebarOpen={isMobileSidebarOpen}
          setIsMobileSidebarOpen={setIsMobileSidebarOpen}
        />

        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Header with logout functionality */}
          <Header onLogout={handleLogout} />
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

const Sidebar = ({ 
  setActiveComponent, 
  activeSidebar, 
  setActiveSidebar, 
  isMobileSidebarOpen, 
  setIsMobileSidebarOpen 
}) => {
  const handleItemClick = (componentName) => {
    setActiveComponent(componentName);
    setActiveSidebar(componentName);
    setIsMobileSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}
      
      <div 
        className={`
          fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300
          lg:static lg:block lg:col-span-1 lg:w-full lg:h-screen
          ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col items-center p-6">
          <div className="h-24 w-24 mb-4">
            <img src={logo} alt="logo" />
          </div>
          <div className="flex items-center mb-6">
            <BriefcaseIcon className="mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Placement Gateway</h2>
          </div>
        </div>
        <div className="space-y-2 px-4">
          <NavItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            isActive={activeSidebar === "dashboard"}
            onClick={() => handleItemClick("dashboard")}
          />
          <NavItem
            icon={<BriefcaseIcon />}
            label="Job Postings"
            isActive={activeSidebar === "jobPostings"}
            onClick={() => handleItemClick("jobPostings")}
          />
          <NavItem
            icon={<Users />}
            label="Applications"
            isActive={activeSidebar === "applications"}
            onClick={() => handleItemClick("applications")}
          />
          <NavItem
            icon={<FileText />}
            label="Process Management"
            isActive={activeSidebar === "processManagement"}
            onClick={() => handleItemClick("processManagement")}
          />
          <NavItem
            icon={<PieChart />}
            label="Analytics"
            isActive={activeSidebar === "analytics"}
            onClick={() => handleItemClick("analytics")}
          />
        </div>
      </div>
    </>
  );
};

const Header = ({ onLogout }) => (
  <header className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-xl shadow-md p-4 mb-6">
    <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Recruiter Dashboard</h1>
    <div className="flex items-center space-x-4">
      <span className="text-gray-600 hidden sm:block">Welcome, Recruiter</span>
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
        R
      </div>
      <button
        onClick={onLogout}
        className="flex items-center bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        <LogOut className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm">Logout</span>
      </button>
    </div>
  </header>
);

const StatCard = ({ icon, title, value, color }) => (
  <div
    className={`${color} p-4 sm:p-5 rounded-xl shadow-md flex items-center space-x-4 transform transition hover:scale-105`}
  >
    <div className="p-2 sm:p-3 bg-white rounded-full">{icon}</div>
    <div>
      <p className="text-xs sm:text-sm text-gray-600">{title}</p>
      <p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

const NavItem = ({ icon, label, isActive, onClick }) => (
  <div
    onClick={onClick}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition group ${
      isActive ? "bg-blue-100 text-blue-600" : "hover:bg-blue-50 text-gray-700"
    }`}
  >
    {React.cloneElement(icon, {
      className: `mr-3 ${
        isActive ? "text-blue-600" : "text-gray-600 group-hover:text-blue-600"
      } transition`,
    })}
    <span>{label}</span>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
    {[
      { icon: <Users />, name: "New Application Received", time: "2h ago" },
      { icon: <BriefcaseIcon />, name: "New Job Posting Published", time: "5h ago" },
      { icon: <CheckCircle2 />, name: "Candidate Shortlisted", time: "1d ago" },
    ].map((activity, index) => (
      <div key={index} className="flex items-center space-x-3 mb-4">
        <div className="p-3 bg-blue-100 rounded-full text-blue-500">
          {activity.icon}
        </div>
        <div>
          <p className="text-gray-800 font-medium text-sm sm:text-base">{activity.name}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{activity.time}</p>
        </div>
      </div>
    ))}
  </div>
);

const UpcomingInterviews = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Upcoming Interviews</h2>
    {[
      { candidate: "John Doe", position: "Software Engineer", date: "Jan 28, 10:00 AM" },
      { candidate: "Jane Smith", position: "UI/UX Designer", date: "Jan 29, 2:00 PM" },
    ].map((interview, index) => (
      <div key={index} className="flex justify-between items-center mb-4">
        <div>
          <p className="text-gray-800 font-medium text-sm sm:text-base">{interview.candidate}</p>
          <p className="text-gray-500 text-xs sm:text-sm">{interview.position}</p>
        </div>
        <p className="text-gray-600 text-xs sm:text-sm">{interview.date}</p>
      </div>
    ))}
  </div>
);



export default DashboardRecruiter_Login;
