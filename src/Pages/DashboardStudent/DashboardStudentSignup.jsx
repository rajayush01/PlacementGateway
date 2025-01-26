import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardStudent_Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    phoneNumber: '',
    email: '',
    course: '',
    graduationYear: '',
    cgpa: '',
    experience: '',
    resume: null,
    projects: '',
    skills: [], 
    skillInput: '',
    college: ''
  });



  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Prefill form data from signup page state
    if (location.state) {
      const { name, email, phone, college, id } = location.state;
      setFormData(prevData => ({
        ...prevData,
        name: name || '',
        email: email || '',
        phoneNumber: phone || '',
        college: college || '',
        studentId: id || ''
      }));
    }
  }, [location.state]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      resume: file,
    }));
  };

  const handleSkillInputChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      skillInput: e.target.value,
    }));
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === 'Enter' && formData.skillInput.trim() !== '') {
      e.preventDefault();
      setFormData((prevData) => ({
        ...prevData,
        skills: [...prevData.skills, prevData.skillInput.trim()],
        skillInput: '', 
      }));
    }
  };

  const handleSkillRemove = (skillToRemove) => {
    setFormData((prevData) => ({
      ...prevData,
      skills: prevData.skills.filter((skill) => skill !== skillToRemove),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form Data Submission Details:');
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'resume') {
        console.log(`${key}: ${value ? value.name : 'No file uploaded'}`);
      } else if (key === 'skills') {
        console.log(`${key}: ${value.length > 0 ? value.join(', ') : 'No skills selected'}`);
      } else {
        console.log(`${key}: ${value || 'Not provided'}`);
      }
    });
  };

  const handleSubmitApplication = () => {
    navigate("/student")
  }

  return (
    <div className="min-h-screen bg-[#E5F4FE] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        <form 
          className="p-8 space-y-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Student Registration
          </h2>
          
          {[
            { label: 'Name', type: 'text', name: 'name' },
            { label: 'Student ID', type: 'text', name: 'studentId' },
            { label: 'Phone Number', type: 'tel', name: 'phoneNumber' },
            { label: 'Email ID', type: 'email', name: 'email' },
            { label: 'College', type: 'text', name: 'college' },
            { label: 'Course', type: 'text', name: 'course' },
            { label: 'Graduation Year', type: 'text', name: 'graduationYear' },
            { label: 'CGPA', type: 'text', name: 'cgpa' }
          ].map(({ label, type, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor={name}>
                {label}
              </label>
              <input
                type={type}
                id={name}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="experience">
              Experience (optional)
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows="4"
              placeholder="Describe your work experience, internships, or relevant professional background"
            />
          </div>

          {/* Skills Input Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="skills">
              Skills
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="skills"
                name="skillInput"
                value={formData.skillInput}
                onChange={handleSkillInputChange}
                onKeyDown={handleSkillKeyDown}
                placeholder="Type a skill and press Enter"
                className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg flex items-center space-x-2"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleSkillRemove(skill)}
                    className="text-red-500 hover:text-red-700 focus:outline-none"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="resume">
              Upload Resume
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="projects">
              Previous Projects (optional)
            </label>
            <textarea
              id="projects"
              name="projects"
              value={formData.projects}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              rows="3"
            />
          </div>

          <button
            onClick={handleSubmitApplication}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default DashboardStudent_Signup;