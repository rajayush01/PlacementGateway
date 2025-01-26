import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Signup/Signup";
import { Navbar } from "./Components/Navbar";
import DashboardStudent_Login from "./Pages/DashboardStudent/DashboardStudentLogin";
import DashboardStudent_Signup from "./Pages/DashboardStudent/DashboardStudentSignup";
import DashboardRecruiter_Login from "./Pages/DashboardRecruiter/DashboardRecruiter";
import ApplicationsSection from "./Components/Student/ApplicationsSection";
import ProfileSection from "./Components/Student/ProfileSection";
import ManageResume from "./Components/Student/ManageResume";
import InterviewPrep from "./Components/Student/InterviewPrep";
import Deadlines from "./Components/Student/Deadline";
import { Landing } from "./Pages/Landing/Landing";
import AdminDashboard from "./Pages/DashboardAdmin/DashboardAdmin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/navbar" element={<Navbar />} />
        
        {/* Student Routes */}
        <Route path="/student" element={<DashboardStudent_Login />} />
        <Route path="/student-form" element={<DashboardStudent_Signup />} />
        
        {/* Recruiter Routes */}
        <Route path="/recruiter" element={<DashboardRecruiter_Login />} />
        
        {/* Default Route */}
        <Route path="/" element={<Landing />} />

        <Route path="/application" element={<ApplicationsSection />} />
        <Route path="/profile-student" element={<ProfileSection />} />
        <Route path="/manage-resume" element={<ManageResume />} />
        <Route path="/interview-prep" element={<InterviewPrep />} />
        <Route path="/deadlines" element={<Deadlines />} />
        <Route path="/admin" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;