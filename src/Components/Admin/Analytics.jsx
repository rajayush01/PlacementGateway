import React from 'react';
import { 
  BarChart2, 
  TrendingUp, 
  PieChart, 
  CheckCircle2, 
  XCircle,  
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell 
} from 'recharts';

const placementTrends = [
  { month: "Jan", placed: 30, unplaced: 70 },
  { month: "Feb", placed: 45, unplaced: 55 },
  { month: "Mar", placed: 60, unplaced: 40 },
  { month: "Apr", placed: 75, unplaced: 25 },
  { month: "May", placed: 90, unplaced: 10 },
];

const sectorBreakdown = [
  { name: "Tech", value: 40, color: "#3B82F6" },
  { name: "Finance", value: 30, color: "#10B981" },
  { name: "Consulting", value: 20, color: "#8B5CF6" },
  { name: "Others", value: 10, color: "#F43F5E" }
];

const performanceMetrics = [
  { 
    metric: "Placement Rate", 
    value: "80%", 
    icon: <CheckCircle2 className="text-green-500 w-8 h-8" />,
    trend: "↑ 5% from last year"
  },
  { 
    metric: "Unplaced Students", 
    value: "90", 
    icon: <XCircle className="text-red-500 w-8 h-8" />,
    trend: "↓ 15% from last year"
  },
  { 
    metric: "Average Package", 
    value: "₹8.5 LPA", 
    icon: <TrendingUp className="text-blue-500 w-8 h-8" />,
    trend: "↑ 12% from last year"
  }
];

const Analytics = () => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Performance Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {performanceMetrics.map((metric, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg p-5 flex items-center space-x-4 transform transition-all hover:scale-105"
            >
              <div className="p-3 bg-blue-50 rounded-full">{metric.icon}</div>
              <div>
                <p className="text-gray-600 text-sm">{metric.metric}</p>
                <p className="text-2xl font-bold">{metric.value}</p>
                <p className="text-xs text-gray-500">{metric.trend}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Placement Trends */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Placement Trends
              </h2>
              <BarChart2 className="text-blue-500 w-6 h-6" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={placementTrends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8f8f8', 
                    border: 'none', 
                    borderRadius: '12px' 
                  }}
                />
                <Legend />
                <Bar dataKey="placed" stackId="a" fill="#10B981" />
                <Bar dataKey="unplaced" stackId="a" fill="#F43F5E" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sector Distribution */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Sector Distribution
              </h2>
              <PieChart className="text-purple-500 w-6 h-6" />
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPieChart>
                <Pie
                  data={sectorBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {sectorBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#f8f8f8', 
                    border: 'none', 
                    borderRadius: '12px' 
                  }}
                />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Recruiters */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Top Recruiters
            </h2>
            {[
              { name: "Google", placements: 45 },
              { name: "Amazon", placements: 38 },
              { name: "Microsoft", placements: 32 },
              { name: "Facebook", placements: 25 },
            ].map((recruiter, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{recruiter.name}</span>
                <span className="text-gray-600">{recruiter.placements} placements</span>
              </div>
            ))}
          </div>

          {/* Skill Demand */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Skill Demand
            </h2>
            {[
              { skill: "Software Development", demand: "High" },
              { skill: "Data Science", demand: "Very High" },
              { skill: "Cloud Computing", demand: "High" },
              { skill: "Cybersecurity", demand: "Medium" },
            ].map((skill, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center py-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium">{skill.skill}</span>
                <span className={`
                  px-2 py-1 rounded-full text-xs
                  ${skill.demand === "Very High" ? "bg-red-100 text-red-800" : 
                    skill.demand === "High" ? "bg-yellow-100 text-yellow-800" : 
                    "bg-green-100 text-green-800"}
                `}>
                  {skill.demand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;