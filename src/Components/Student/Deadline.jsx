import React, { useState } from 'react';

const Deadlines = () => {
  const [deadlines, setDeadlines] = useState([
    { id: 1, name: 'Job Application Deadline', date: '2024-02-01' },
  ]);
  const [newDeadline, setNewDeadline] = useState('');

  const addDeadline = () => {
    if (newDeadline) {
      setDeadlines([...deadlines, { id: deadlines.length + 1, name: newDeadline, date: 'TBD' }]);
      setNewDeadline('');
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-2xl font-bold mb-4">Deadlines</h2>
      <ul className="list-disc ml-5 space-y-2">
        {deadlines.map((deadline) => (
          <li key={deadline.id} className="text-gray-700">
            {deadline.name} - {deadline.date}
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <input 
          type="text" 
          placeholder="Add new deadline" 
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          className="border rounded-lg p-2 mr-2"
        />
        <button 
          onClick={addDeadline} 
          className="bg-primary-600 text-white px-4 py-2 rounded-lg"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Deadlines;
