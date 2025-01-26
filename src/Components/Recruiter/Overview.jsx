import React from "react";
import { 
  BriefcaseIcon, 
  UsersIcon, 
  CheckCircle2, 
  ClockIcon, 
  TrendingUpIcon, 
  BookOpenIcon 
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const Overview = () => {
  const analyticsData = [
    {
      icon: <BriefcaseIcon className="text-indigo-500 w-10 h-10" />,
      title: "Active Jobs",
      value: "5 Active Listings",
      description: "Currently open job positions",
      trend: "+2 from last week",
      bgColor: "bg-indigo-50"
    },
    {
      icon: <UsersIcon className="text-emerald-500 w-10 h-10" />,
      title: "Total Applications",
      value: "120 Applicants",
      description: "Candidates applied across jobs",
      trend: "+25 from last month",
      bgColor: "bg-emerald-50"
    },
    {
      icon: <CheckCircle2 className="text-violet-500 w-10 h-10" />,
      title: "Shortlisted Candidates",
      value: "45 Candidates",
      description: "Potential hires in pipeline",
      trend: "+15 from last week",
      bgColor: "bg-violet-50"
    },
    {
      icon: <ClockIcon className="text-amber-500 w-10 h-10" />,
      title: "Interviews Scheduled",
      value: "15 Upcoming",
      description: "Interviews in next 7 days",
      trend: "+5 from last week",
      bgColor: "bg-amber-50"
    }
  ];

  const performanceMetrics = [
    {
      icon: <TrendingUpIcon className="text-green-500 w-8 h-8" />,
      title: "Hiring Conversion Rate",
      value: "22%",
      description: "Ratio of offers to applications"
    },
    {
      icon: <BookOpenIcon className="text-blue-500 w-8 h-8" />,
      title: "Average Interview Rounds",
      value: "2.5",
      description: "Per candidate selection process"
    }
  ];

  const applicationsData = [
    { month: 'Jan', applications: 80 },
    { month: 'Feb', applications: 120 },
    { month: 'Mar', applications: 95 },
    { month: 'Apr', applications: 140 },
    { month: 'May', applications: 180 },
    { month: 'Jun', applications: 220 }
  ];

  const hiringData = [
    { month: 'Jan', hired: 10 },
    { month: 'Feb', hired: 15 },
    { month: 'Mar', hired: 12 },
    { month: 'Apr', hired: 20 },
    { month: 'May', hired: 25 },
    { month: 'Jun', hired: 30 }
  ];

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsData.map((item, index) => (
            <div 
              key={index} 
              className={`${item.bgColor} p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border-2 border-transparent hover:border-opacity-50 hover:border-current`}
            >
              <div className="flex items-center justify-between mb-4">
                {item.icon}
                <span className="text-xs font-medium text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
                  {item.trend}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-2xl font-bold text-gray-800 mb-1">{item.value}</p>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
              Monthly Applications
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={applicationsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8f8f8', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="applications" 
                  stroke="url(#gradientLine)" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#5b21b6', stroke: 'white', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="gradientLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6366f1"/>
                    <stop offset="100%" stopColor="#8b5cf6"/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-between mb-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="flex items-center">
                  {metric.icon}
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                      {metric.title}
                    </h3>
                    <p className="text-3xl font-bold text-gray-800 mb-1">{metric.value}</p>
                    <p className="text-sm text-gray-600">{metric.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={hiringData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8f8f8', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hired" 
                  stroke="url(#gradientGreenLine)" 
                  strokeWidth={3}
                  dot={{ r: 6, fill: '#10b981', stroke: 'white', strokeWidth: 2 }}
                />
                <defs>
                  <linearGradient id="gradientGreenLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981"/>
                    <stop offset="100%" stopColor="#34d399"/>
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;