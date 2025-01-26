import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Building,
  FileText,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Calendar,
  PieChart,
  BarChart2,
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
import { useNavigate } from "react-router-dom";
import StudentManagement from "../../Components/Admin/StudentManagement";
import PlacementPolicies from "../../Components/Admin/PlacementPolicies";
import RecruiterManagement from "../../Components/Admin/RecruiterManagement";
import EventCalendar from "../../Components/Admin/EventCalendar";
import Analytics from "../../Components/Admin/Analytics";
import logo from "../../assets/logo.png";

// Mock Data (unchanged)
const placementData = [
  { month: "Jan", students: 30 },
  { month: "Feb", students: 45 },
  { month: "Mar", students: 60 },
  { month: "Apr", students: 75 },
  { month: "May", students: 90 },
];

const recruitmentStats = [
  { name: "Tech", value: 40 },
  { name: "Finance", value: 30 },
  { name: "Consulting", value: 20 },
  { name: "Others", value: 10 },
];

const AdminDashboard = () => {
  const [stats] = useState({
    totalRecruiters: 24,
    registeredStudents: 450,
    placedStudents: 180,
    pendingApplications: 75,
  });

  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [activeSidebar, setActiveSidebar] = useState("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeComponent) {
      case "studentManagement":
        return <StudentManagement />;
      case "recruiterManagement":
        return <RecruiterManagement />;
      case "placementPolicies":
        return <PlacementPolicies />;
      case "eventCalendar":
        return <EventCalendar />;
      case "analytics":
        return <Analytics />;
      default:
        return (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <StatCard
                icon={<Users className="text-blue-500" />}
                title="Total Recruiters"
                value={stats.totalRecruiters}
                color="bg-blue-100"
              />
              <StatCard
                icon={<Building className="text-green-500" />}
                title="Registered Students"
                value={stats.registeredStudents}
                color="bg-green-100"
              />
              <StatCard
                icon={<CheckCircle2 className="text-purple-500" />}
                title="Placed Students"
                value={stats.placedStudents}
                color="bg-purple-100"
              />
              <StatCard
                icon={<AlertCircle className="text-red-500" />}
                title="Pending Applications"
                value={stats.pendingApplications}
                color="bg-red-100"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Placement Trend Line Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Placement Trends
                  </h2>
                  <TrendingUp className="text-green-500" />
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#3B82F6"
                      strokeWidth={3}
                      dot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Recruitment Sector Distribution */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Recruitment Sectors
                  </h2>
                  <PieChart className="text-purple-500" />
                </div>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={recruitmentStats}>
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
              <UpcomingEvents />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-6">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Mobile Hamburger Menu */}
        <div className="lg:hidden flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <h2 className="text-xl font-bold text-gray-800">Placement Portal</h2>
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
          {/* Header */}
          <Header />
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
      {/* Mobile Sidebar (Overlay) */}
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
            <LayoutDashboard className="mr-3 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Placement Portal</h2>
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
            icon={<Users />}
            label="Student Management"
            isActive={activeSidebar === "studentManagement"}
            onClick={() => handleItemClick("studentManagement")}
          />
          <NavItem
            icon={<Building />}
            label="Recruiter Management"
            isActive={activeSidebar === "recruiterManagement"}
            onClick={() => handleItemClick("recruiterManagement")}
          />
          <NavItem
            icon={<FileText />}
            label="Placement Policies"
            isActive={activeSidebar === "placementPolicies"}
            onClick={() => handleItemClick("placementPolicies")}
          />
          <NavItem
            icon={<Calendar />}
            label="Event Calendar"
            isActive={activeSidebar === "eventCalendar"}
            onClick={() => handleItemClick("eventCalendar")}
          />
          <NavItem
            icon={<BarChart2 />}
            label="Analytics"
            isActive={activeSidebar === "analytics"}
            onClick={() => handleItemClick("analytics")}
          />
        </div>
      </div>
    </>
  );
};

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center bg-white rounded-xl shadow-md p-4 mb-6">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Admin Dashboard</h1>
      <div className="flex items-center space-x-4">
        <span className="text-gray-600 hidden sm:block">Welcome, Admin</span>
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
          A
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors duration-300 p-2 rounded-md hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-xs sm:text-sm">Logout</span>
        </button>
      </div>
    </header>
  );
};

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
    <span className="text-sm sm:text-base">{label}</span>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
    {[
      { icon: <Users />, name: "New Student Registration", time: "2h ago" },
      { icon: <Building />, name: "Google Job Posting", time: "4h ago" },
      { icon: <CheckCircle2 />, name: "Placement Drive Complete", time: "1d ago" },
    ].map((activity, index) => (
      <div
        key={index}
        className="flex justify-between items-center py-2 sm:py-3 border-b last:border-b-0 hover:bg-blue-50 rounded-lg px-2 transition"
      >
        <div className="flex items-center space-x-2 sm:space-x-4">
          {React.cloneElement(activity.icon, { className: "text-blue-500 w-4 h-4 sm:w-5 sm:h-5" })}
          <p className="text-xs sm:text-base text-gray-700">{activity.name}</p>
        </div>
        <span className="text-xs sm:text-sm text-gray-500">{activity.time}</span>
      </div>
    ))}
  </div>
);

const UpcomingEvents = () => (
  <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
    <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">Upcoming Events</h2>
    {[
      { date: "15 Jun", title: "Amazon Recruitment Drive", type: "Tech" },
      { date: "22 Jun", title: "Goldman Sachs Interview", type: "Finance" },
      { date: "30 Jun", title: "Mock Interview Session", type: "Training" },
    ].map((event, index) => (
      <div
        key={index}
        className="flex justify-between items-center py-2 sm:py-3 border-b last:border-b-0 hover:bg-blue-50 rounded-lg px-2 transition"
        >
          <div>
            <p className="text-xs sm:text-sm text-gray-500">{event.date}</p>
            <p className="text-xs sm:text-base text-gray-700">{event.title}</p>
          </div>
          <span className="text-xs sm:text-sm text-gray-600">{event.type}</span>
        </div>
      ))}
    </div>
  );
  
  export default AdminDashboard;