import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  CheckCircle, 
  XCircle, 
  Clock,
  Building,
  DollarSign,
  X
} from 'lucide-react';

const mockApplicationsService = {
  getApplications: () => ([
    {
      id: 1,
      company: 'TechCorp',
      position: 'Software Engineer',
      status: 'In Progress',
      appliedDate: '2024-01-15',
      rounds: [
        { name: 'Online Assessment', status: 'Completed' },
        { name: 'Technical Interview', status: 'Pending' },
        { name: 'HR Interview', status: 'Not Started' }
      ],
      companyDetails: {
        description: 'TechCorp is a leading software development company specializing in enterprise solutions.',
        ctc: '₹12-15 LPA',
        location: 'Bangalore, India',
        websiteUrl: 'https://techcorp.com'
      }
    },
    {
      id: 2,
      company: 'InnoSoft',
      position: 'Data Analyst',
      status: 'Shortlisted',
      appliedDate: '2024-01-20',
      rounds: [
        { name: 'Resume Screening', status: 'Completed' },
        { name: 'Technical Round', status: 'Scheduled' },
        { name: 'Final Interview', status: 'Not Started' }
      ],
      companyDetails: {
        description: 'InnoSoft is a data-driven tech company focusing on advanced analytics and AI solutions.',
        ctc: '₹8-10 LPA',
        location: 'Hyderabad, India',
        websiteUrl: 'https://innosoft.com'
      }
    }
  ])
};

const ApplicationsSection = () => {
  const [applications, setApplications] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      const data = mockApplicationsService.getApplications();
      setApplications(data);
    };

    fetchApplications();
  }, []);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed':
        return <CheckCircle className="text-green-500" />;
      case 'Pending':
        return <Clock className="text-yellow-500" />;
      case 'Not Started':
        return <XCircle className="text-gray-500" />;
      default:
        return null;
    }
  };

  const CompanyDetailsModal = ({ company, onClose }) => {
    if (!company) return null;

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-white rounded-2xl p-6 max-w-md w-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          <div className="flex items-center mb-4">
            <Building className="mr-3 text-primary-600" size={32} />
            <h2 className="text-2xl font-bold">{company.company}</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">About Company</h3>
              <p className="text-gray-600">{company.companyDetails.description}</p>
            </div>
            
            <div className="flex items-center">
              <DollarSign className="mr-2 text-green-600" />
              <span className="font-semibold">CTC/Stipend: {company.companyDetails.ctc}</span>
            </div>
            
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-gray-600">{company.companyDetails.location}</p>
            </div>
            
            <a 
              href={company.companyDetails.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:underline"
            >
              Visit Company Website
            </a>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto"
      >
        <h1 className="text-3xl font-bold mb-6 text-primary-600 flex items-center">
          <Briefcase className="mr-3" /> My Applications
        </h1>

        <div className="grid gap-6">
          {applications.map((app) => (
            <motion.div
              key={app.id}
              whileHover={{ scale: 1.02 }}
              className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer"
              onClick={() => setSelectedCompany(app)}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">{app.position}</h2>
                  <p className="text-gray-600">{app.company}</p>
                  <p className="text-sm text-gray-500">Applied on {app.appliedDate}</p>
                </div>
                <span 
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    app.status === 'In Progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {app.status}
                </span>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Recruitment Stages</h3>
                <div className="space-y-2">
                  {app.rounds.map((round) => (
                    <div 
                      key={round.name} 
                      className="flex items-center justify-between bg-primary-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(round.status)}
                        <span>{round.name}</span>
                      </div>
                      <span className="text-sm text-gray-600">{round.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {selectedCompany && (
        <CompanyDetailsModal 
          company={selectedCompany} 
          onClose={() => setSelectedCompany(null)} 
        />
      )}
    </>
  );
};

export default ApplicationsSection;