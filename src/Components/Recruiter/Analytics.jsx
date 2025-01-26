import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  UserCheck, 
  UserX, 
  Users, 
  Clock 
} from 'lucide-react';

const Analytics = () => {
  const applicationData = [
    { status: 'Total', count: 120, icon: Users, color: 'text-blue-500' },
    { status: 'Shortlisted', count: 30, icon: UserCheck, color: 'text-green-500' },
    { status: 'Rejected', count: 50, icon: UserX, color: 'text-red-500' },
    { status: 'Pending', count: 40, icon: Clock, color: 'text-yellow-500' }
  ];

  const chartData = [
    { name: 'Jan', Shortlisted: 25, Rejected: 45, Pending: 30 },
    { name: 'Feb', Shortlisted: 30, Rejected: 50, Pending: 40 },
    { name: 'Mar', Shortlisted: 35, Rejected: 55, Pending: 35 }
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Recruitment Analytics</h2>
        
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {applicationData.map((data, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-700">{data.status}</h3>
                <p className="text-3xl font-bold text-gray-800">{data.count}</p>
              </div>
              <data.icon className={`${data.color} w-12 h-12`} />
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold mb-4">Monthly Application Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Shortlisted" stackId="a" fill="#10B981" />
              <Bar dataKey="Rejected" stackId="a" fill="#EF4444" />
              <Bar dataKey="Pending" stackId="a" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;