import React, { useState } from 'react';
import { Upload, Trash2, Eye } from 'lucide-react';

const ManageResume = () => {
  const [resumes, setResumes] = useState([]);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file && !resumes.some(r => r.name === file.name)) {
      setResumes(prevResumes => [...prevResumes, { 
        name: file.name, 
        file: file 
      }]);
    }
  };

  const handleDelete = (resumeToDelete) => {
    setResumes(prevResumes => 
      prevResumes.filter(resume => resume.name !== resumeToDelete.name)
    );
  };

  const handleViewResume = (resume) => {
    const fileURL = URL.createObjectURL(resume.file);
    window.open(fileURL, '_blank');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Manage Resumes</h2>
      
      <div className="mb-4">
        <label 
          htmlFor="resume-upload" 
          className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition"
        >
          <Upload className="mr-2" />
          <span>Upload Resume</span>
          <input 
            type="file" 
            id="resume-upload"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      </div>

      {resumes.length > 0 && (
        <div className="space-y-2">
          {resumes.map((resume, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
            >
              <span className="truncate max-w-[50%]">{resume.name}</span>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleViewResume(resume)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Eye size={20} />
                </button>
                <button 
                  onClick={() => handleDelete(resume)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageResume;