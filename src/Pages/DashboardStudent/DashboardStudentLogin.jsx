import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Briefcase, FileText, Clock, 
  BookOpen, Bell, LogOut, Menu, X 
} from 'lucide-react';
import Deadlines from '../../Components/Student/Deadline';
import ManageResume from '../../Components/Student/ManageResume';
import InterviewPrep from '../../Components/Student/InterviewPrep';
import ProfileSection from '../../Components/Student/ProfileSection';
import ApplicationsSection from '../../Components/Student/ApplicationsSection';
import { useNavigate } from 'react-router-dom';

const mockDataService = {
  getStudentProfile: () => ({
    name: 'Ayush',
    email: 'ayush@example.com',
    college: 'Tech University',
    department: 'Computer Science',
    graduationYear: 2024,
    profileCompleteness: 75,
    appliedJobs: [
      { 
        id: 1, 
        company: 'TechCorp', 
        position: 'Software Engineer', 
        status: 'Application Submitted',
        appliedDate: '2024-01-20',
        location: 'Remote',
        applicationLink: '#'
      },
      { 
        id: 2, 
        company: 'InnoSoft', 
        position: 'Data Analyst', 
        status: 'Interview Scheduled',
        appliedDate: '2024-01-15',
        location: 'Bangalore',
        applicationLink: '#'
      }
    ],
    notifications: [
      { 
        id: 1, 
        message: 'Interview invitation from TechCorp', 
        date: '2024-01-25',
        type: 'success'
      },
      { 
        id: 2, 
        message: 'Resume review pending', 
        date: '2024-01-22',
        type: 'warning'
      }
    ]
  })
};

const StudentDashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeQuickAction, setActiveQuickAction] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Fetch student data on component mount
  useEffect(() => {
    const fetchStudentData = async () => {
      const data = mockDataService.getStudentProfile();
      setStudentData(data);
    };

    fetchStudentData();
  }, []);

  const handleNameChange = (newName) => {
    setStudentData(prevData => ({
      ...prevData,
      name: newName
    }));
  };

  // Greeting logic
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userProfile');
    navigate('/login');
  };

  const renderQuickAction = () => {
    if (activeQuickAction === 'manageResume') 
      return <ManageResume goBack={() => setActiveQuickAction(null)} />;
    if (activeQuickAction === 'interviewPrep') 
      return <InterviewPrep goBack={() => setActiveQuickAction(null)} />;
    if (activeQuickAction === 'deadlines') 
      return <Deadlines goBack={() => setActiveQuickAction(null)} />;
    return null;
  };

  // Quick actions configuration
  const quickActions = [
    { 
      icon: <FileText className="text-purple-600" />, 
      title: 'Manage Resume', 
      description: 'Upload or update your resume',
      action: () => setActiveQuickAction('manageResume'),
    },
    { 
      icon: <BookOpen className="text-blue-600" />, 
      title: 'Interview Prep', 
      description: 'Access interview resources',
      action: () => setActiveQuickAction('interviewPrep'),
    },
    { 
      icon: <Clock className="text-green-600" />, 
      title: 'Deadlines', 
      description: 'Track upcoming dates',
      action: () => setActiveQuickAction('deadlines'),
    }
  ];

  const renderContent = () => {
    if (activeQuickAction) {
      return (
        <div>
          <button
            onClick={() => setActiveQuickAction(null)}
            className="mb-4 px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700"
          >
            Back to Dashboard
          </button>
          {renderQuickAction()}
        </div>
      );
    }

    if (activeTab === 'dashboard') return renderDashboardContent();
    if (activeTab === 'applications') return <ApplicationsSection />;
    if (activeTab === 'profile') return <ProfileSection onNameChange={handleNameChange} />;

    return null;
  };

  const renderDashboardContent = () => {
    if (!studentData) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-blue-500"></div>
        </div>
      );
    }

    return (
      <>
        {/* Notifications Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {studentData.notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`p-4 rounded-xl flex items-center space-x-4 ${
                notification.type === 'success' 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-yellow-50 text-yellow-800'
              }`}
            >
              <Bell className="shrink-0" />
              <div>
                <p className="font-semibold">{notification.message}</p>
                <p className="text-sm opacity-70">{notification.date}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white shadow-lg rounded-2xl p-6 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 mb-6">
              <div className="w-20 h-20 mb-4 sm:mb-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                <User className="text-white" size={40} />
              </div>
              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-bold text-gray-800">{studentData.name}</h2>
                <p className="text-primary-600">{studentData.college}</p>
                <p className="text-sm text-gray-500">{studentData.department} | Class of {studentData.graduationYear}</p>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span>Profile Completeness</span>
                <span>{studentData.profileCompleteness}%</span>
              </div>
              <div className="w-full bg-primary-100 rounded-full h-2.5">
                <div 
                  className="bg-primary-600 h-2.5 rounded-full" 
                  style={{width: `${studentData.profileCompleteness}%`}}
                ></div>
              </div>
            </div>
          </motion.div>

          {/* Job Applications */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
            className="md:col-span-2 bg-white shadow-lg rounded-2xl p-6 w-full"
          >
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Briefcase className="mr-2 text-primary-600" />
              My Job Applications
            </h2>
            
            {studentData.appliedJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-primary-50 rounded-xl p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div className="mb-2 sm:mb-0">
                  <h3 className="font-bold text-lg">{job.position}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <div className="text-sm text-gray-500 flex items-center space-x-2">
                    <span>Applied on {job.appliedDate}</span>
                    <span>•</span>
                    <span>{job.location}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span 
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      job.status === 'Application Submitted' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {job.status}
                  </span>
                  <a 
                    href={job.applicationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline text-sm"
                  >
                    View Details
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Quick Actions Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6"
        >
          {quickActions.map((action, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              onClick={action.action}
              className="bg-white shadow-lg rounded-2xl p-6 flex items-center space-x-4 hover:shadow-xl transition cursor-pointer"
            >
              {React.cloneElement(action.icon, { size: 32 })}
              <div>
                <h3 className="font-semibold text-gray-800">{action.title}</h3>
                <p className="text-gray-500 text-sm">{action.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 p-4 sm:p-6"
    >
      <div className="container mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white shadow-xl rounded-2xl p-4 sm:p-6 mb-6 relative"
        >
          {/* Mobile Menu Toggle */}
          <div className="md:hidden absolute top-4 right-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-primary-600 hover:bg-primary-100 p-2 rounded-full"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600 mb-2">
                {getGreeting()}, {studentData?.name || 'Student'}!
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">Welcome to your placement dashboard</p>
            </div>
          
            {/* Responsive Tab Navigation */}
            <div className={`
              ${isMobileMenuOpen ? 'block' : 'hidden'} 
              md:block absolute md:relative top-full left-0 right-0 md:top-auto md:left-auto 
              bg-white md:bg-transparent shadow-lg md:shadow-none p-4 md:p-0 z-20
            `}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 xl:ml-[600px]">
                {['Dashboard', 'Applications', 'Profile'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab.toLowerCase());
                      setActiveQuickAction(null);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full md:w-auto px-4 py-2 rounded-full capitalize transition-all ${
                      activeTab === tab.toLowerCase()
                        ? 'bg-primary-600 text-white' 
                        : 'bg-primary-100 text-primary-600 hover:bg-primary-200'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center justify-center w-10 h-10 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors group"
              title="Logout"
            >
              <LogOut className="group-hover:scale-110 transition-transform" size={20} />
            </button>
          </div>
        </motion.div>

        {/* Dynamic Content Rendering */}
        {renderContent()}
      </div>
    </motion.div>
  );
};

export default StudentDashboard;