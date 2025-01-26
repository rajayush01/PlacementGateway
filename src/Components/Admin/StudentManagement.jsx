import React, { useState } from 'react';
import { 
  Users, Search, Edit, Trash2, 
  FileSpreadsheet, UserPlus, Menu, X 
} from 'lucide-react';
import * as XLSX from 'xlsx';

const StudentManagement = () => {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', department: 'Computer Science', email: 'john@example.com', status: 'Active' },
    { id: 2, name: 'Jane Smith', department: 'Electrical Engineering', email: 'jane@example.com', status: 'Placed' },
    { id: 3, name: 'Mike Johnson', department: 'Mechanical Engineering', email: 'mike@example.com', status: 'Pending' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: '', 
    department: '', 
    email: '', 
    status: 'Pending'
  });

  const filteredStudents = students.filter(student => 
    (filterStatus === 'All' || student.status === filterStatus) &&
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  const handleAddStudent = () => {
    const newId = students.length > 0 
      ? Math.max(...students.map(s => s.id)) + 1 
      : 1;
    
    setStudents([...students, { 
      id: newId, 
      ...newStudent 
    }]);
    
    setNewStudent({ name: '', department: '', email: '', status: 'Pending' });
    setIsAddModalOpen(false);
  };

  const handleEditStudent = () => {
    setStudents(students.map(student => 
      student.id === editStudent.id 
        ? { ...editStudent } 
        : student
    ));
    setEditStudent(null);
  };

  const handleExportStudents = () => {
    const worksheet = XLSX.utils.json_to_sheet(students);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    XLSX.writeFile(workbook, "student_list.xlsx");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-7xl mx-auto">
      {/* Mobile Header with Hamburger Menu */}
      <div className="md:hidden flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold text-gray-800 flex items-center">
          <Users className="mr-2 text-blue-600" /> Student Management
        </h1>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-600 hover:text-blue-600"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col space-y-3 mb-4">
          <button 
            onClick={() => {
              setIsAddModalOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-blue-600 transition"
          >
            <UserPlus className="mr-2" /> Add Student
          </button>
          <button 
            onClick={() => {
              handleExportStudents();
              setIsMobileMenuOpen(false);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center justify-center hover:bg-green-600 transition"
          >
            <FileSpreadsheet className="mr-2" /> Export
          </button>
        </div>
      )}

      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center">
          <Users className="mr-3 text-blue-600" /> Student Management
        </h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition"
          >
            <UserPlus className="mr-2" /> Add Student
          </button>
          <button 
            onClick={handleExportStudents}
            className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition"
          >
            <FileSpreadsheet className="mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row mb-4 space-y-3 md:space-y-0 md:space-x-4">
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search students..." 
            className="w-full p-2 pl-8 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-3 text-gray-400" />
        </div>
        <select 
          className="w-full md:w-auto p-2 border rounded-lg"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Placed">Placed</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-50 text-gray-700">
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id} className="border-b hover:bg-blue-50 transition">
                <td className="p-3">{student.name}</td>
                <td className="p-3">{student.department}</td>
                <td className="p-3">{student.email}</td>
                <td className="p-3">
                  <span className={`
                    px-3 py-1 rounded-full text-xs 
                    ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 
                      student.status === 'Placed' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}
                  `}>
                    {student.status}
                  </span>
                </td>
                <td className="p-3 flex justify-center space-x-2">
                  <button 
                    className="text-blue-500 hover:bg-blue-100 p-2 rounded-lg transition"
                    title="Edit"
                    onClick={() => setEditStudent(student)}
                  >
                    <Edit size={18} />
                  </button>
                  <button 
                    className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
                    title="Delete"
                    onClick={() => handleDeleteStudent(student.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {filteredStudents.map(student => (
          <div 
            key={student.id} 
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold">{student.name}</h3>
              <span className={`
                px-3 py-1 rounded-full text-xs 
                ${student.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  student.status === 'Placed' ? 'bg-blue-100 text-blue-800' : 
                  'bg-yellow-100 text-yellow-800'}
              `}>
                {student.status}
              </span>
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <p>{student.department}</p>
              <p>{student.email}</p>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                className="text-blue-500 hover:bg-blue-100 p-2 rounded-lg transition"
                title="Edit"
                onClick={() => setEditStudent(student)}
              >
                <Edit size={18} />
              </button>
              <button 
                className="text-red-500 hover:bg-red-100 p-2 rounded-lg transition"
                title="Delete"
                onClick={() => handleDeleteStudent(student.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Student Modal - Responsive */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Add New Student</h2>
            <input 
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded mb-3"
              value={newStudent.name}
              onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
            />
            <input 
              type="text"
              placeholder="Department"
              className="w-full p-2 border rounded mb-3"
              value={newStudent.department}
              onChange={(e) => setNewStudent({...newStudent, department: e.target.value})}
            />
            <input 
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
              value={newStudent.email}
              onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
            />
            <select 
              className="w-full p-2 border rounded mb-3"
              value={newStudent.status}
              onChange={(e) => setNewStudent({...newStudent, status: e.target.value})}
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Placed">Placed</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddStudent}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Student Modal - Responsive */}
      {editStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Edit Student</h2>
            <input 
              type="text"
              placeholder="Name"
              className="w-full p-2 border rounded mb-3"
              value={editStudent.name}
              onChange={(e) => setEditStudent({...editStudent, name: e.target.value})}
            />
            <input 
              type="text"
              placeholder="Department"
              className="w-full p-2 border rounded mb-3"
              value={editStudent.department}
              onChange={(e) => setEditStudent({...editStudent, department: e.target.value})}
            />
            <input 
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-3"
              value={editStudent.email}
              onChange={(e) => setEditStudent({...editStudent, email: e.target.value})}
            />
            <select 
              className="w-full p-2 border rounded mb-3"
              value={editStudent.status}
              onChange={(e) => setEditStudent({...editStudent, status: e.target.value})}
            >
              <option value="Pending">Pending</option>
              <option value="Active">Active</option>
              <option value="Placed">Placed</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => setEditStudent(null)}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button 
                onClick={handleEditStudent}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentManagement;