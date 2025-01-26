import React from 'react';

const InterviewPrep = () => {
  const tips = [
    'Research the company thoroughly.',
    'Practice common interview questions.',
    'Dress appropriately and arrive on time.',
  ];

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Interview Prep</h2>
      <ul className="list-disc ml-5 space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="text-gray-700">{tip}</li>
        ))}
      </ul>
      <a 
        href="https://www.interviewprep.com" 
        target="_blank" 
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg"
      >
        Access Resources
      </a>
    </div>
  );
};

export default InterviewPrep;
