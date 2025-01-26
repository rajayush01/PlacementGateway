import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Map, 
  Briefcase, 
  FileText, 
  Edit 
} from 'lucide-react';

const ProfileSection = ({ onNameChange }) => {
  const [profileData, setProfileData] = useState(() => {
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile 
      ? JSON.parse(savedProfile) 
      : {
          personalInfo: {
            fullName: 'Ayush',
            email: 'ayush@example.com',
            phone: '+91 9876543210',
            address: 'Tech City, Innovation Street',
          },
          academicInfo: {
            college: 'Tech University',
            degree: 'Bachelor of Technology',
            major: 'Computer Science',
            graduationYear: 2024,
            cgpa: 8.5
          },
          skills: [
            'Python', 'React', 'Node.js', 'Machine Learning', 
            'Data Analysis', 'SQL', 'Git'
          ],
          resume: null
        };
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(profileData));
  }, [profileData]);

  const handleInputChange = (section, field, value) => {
    const updatedProfileData = {
      ...profileData,
      [section]: {
        ...profileData[section],
        [field]: value,
      },
    };
    
    setProfileData(updatedProfileData);
    
    // If name is being changed, notify parent component
    if (section === 'personalInfo' && field === 'fullName') {
      onNameChange(value);
    }
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    setProfileData((prev) => ({
      ...prev,
      resume: file,
    }));
  };

  const handleSave = () => {
    console.log('Updated Profile Data:', profileData);
    setIsEditing(false);
  };
  

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto"
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary-600 flex items-center">
          <User className="mr-3" /> My Profile
        </h1>
        <button 
          onClick={() => {
            if (isEditing) handleSave();
            else setIsEditing(true);
          }}
          className="flex items-center bg-primary-600 text-white px-4 py-2 rounded-full hover:bg-primary-700 transition"
        >
          <Edit className="mr-2" size={20} />
          {isEditing ? 'Save' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 text-primary-600" /> Personal Information
          </h2>
          <div className="space-y-4">
            {[ 
              { icon: <User />, label: 'Full Name', field: 'fullName', value: profileData.personalInfo.fullName },
              { icon: <Mail />, label: 'Email', field: 'email', value: profileData.personalInfo.email },
              { icon: <Phone />, label: 'Phone', field: 'phone', value: profileData.personalInfo.phone },
              { icon: <Map />, label: 'Address', field: 'address', value: profileData.personalInfo.address },
            ].map((item) => (
              <div key={item.label} className="flex items-center space-x-3">
                {React.cloneElement(item.icon, { className: "text-primary-600" })}
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  {isEditing ? (
                    <input 
                      type="text"
                      value={item.value}
                      onChange={(e) => handleInputChange('personalInfo', item.field, e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-2 py-1 text-gray-700"
                    />
                  ) : (
                    <p className="font-semibold">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Academic Information */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Briefcase className="mr-2 text-primary-600" /> Academic Details
          </h2>
          <div className="space-y-4">
            {[ 
              { label: 'College', field: 'college', value: profileData.academicInfo.college },
              { label: 'Degree', field: 'degree', value: profileData.academicInfo.degree },
              { label: 'Major', field: 'major', value: profileData.academicInfo.major },
              { label: 'Graduation Year', field: 'graduationYear', value: profileData.academicInfo.graduationYear },
              { label: 'CGPA', field: 'cgpa', value: profileData.academicInfo.cgpa },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center">
                <p className="text-gray-500">{item.label}</p>
                {isEditing ? (
                  <input 
                    type="text"
                    value={item.value}
                    onChange={(e) => handleInputChange('academicInfo', item.field, e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-gray-700"
                  />
                ) : (
                  <p className="font-semibold">{item.value}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills and Resume */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="bg-white shadow-lg rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 text-primary-600" /> Skills & Resume
          </h2>
          <div>
            <h3 className="mb-2 text-gray-600">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-gray-600 mb-2">Upload Resume</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                onChange={handleResumeUpload}
                className="w-full text-sm text-gray-500 
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-primary-100 file:text-primary-600
                  hover:file:bg-primary-200"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
