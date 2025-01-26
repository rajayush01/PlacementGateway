import React, { useState } from "react";
import { Plus, Trash2, Edit } from 'lucide-react';

const JobPostings = () => {
  const [jobs, setJobs] = useState([]);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    skills: "",
    ctc: "",
  });
  const [editingJobId, setEditingJobId] = useState(null);

  const addJob = () => {
    if (!newJob.title || !newJob.description) return;

    const jobToAdd = {
      ...newJob,
      id: Date.now(),
      skills: newJob.skills.split(',').map(skill => skill.trim()),
      createdAt: new Date()
    };

    setJobs([...jobs, jobToAdd]);
    setNewJob({ title: "", description: "", skills: "", ctc: "" });
  };

  const deleteJob = (id) => {
    setJobs(jobs.filter(job => job.id !== id));
  };

  const startEditJob = (job) => {
    setEditingJobId(job.id);
    setNewJob({
      title: job.title,
      description: job.description,
      skills: job.skills.join(', '),
      ctc: job.ctc
    });
  };

  const updateJob = () => {
    setJobs(jobs.map(job => 
      job.id === editingJobId 
        ? { 
            ...job, 
            ...newJob, 
            skills: newJob.skills.split(',').map(skill => skill.trim()) 
          } 
        : job
    ));
    setEditingJobId(null);
    setNewJob({ title: "", description: "", skills: "", ctc: "" });
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Job Management</h2>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-2xl font-semibold mb-4">
            {editingJobId ? 'Edit Job Posting' : 'Create a New Job'}
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Job Title"
              value={newJob.title}
              onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              className="w-full p-3 border rounded-lg min-h-[120px] focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="Skills Required (comma-separated)"
              value={newJob.skills}
              onChange={(e) => setNewJob({ ...newJob, skills: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="text"
              placeholder="CTC Per Annum (e.g., ₹10,00,000)"
              value={newJob.ctc}
              onChange={(e) => setNewJob({ ...newJob, ctc: e.target.value })}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={editingJobId ? updateJob : addJob}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
            >
              <Plus className="mr-2" /> {editingJobId ? 'Update Job' : 'Add Job'}
            </button>
          </div>
        </div>

        <h3 className="text-3xl font-semibold mb-6">Active Job Postings</h3>
        {jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-lg shadow-md p-6 flex justify-between items-start hover:shadow-lg transition"
              >
                <div>
                  <h4 className="text-xl font-bold text-gray-800">{job.title}</h4>
                  <p className="text-gray-600 mb-2">{job.description}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      CTC: {job.ctc}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => startEditJob(job)}
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded-full"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => deleteJob(job.id)}
                    className="text-red-500 hover:bg-red-100 p-2 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No job postings yet. Create your first job!</p>
        )}
      </div>
    </div>
  );
};

export default JobPostings;