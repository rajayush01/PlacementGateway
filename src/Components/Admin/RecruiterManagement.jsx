import React, { useState } from "react";

const RecruiterManagement = () => {
  const [recruiters, setRecruiters] = useState([
    { id: 1, name: "ABC Corp", email: "hr@abccorp.com", phone: "9876543210" },
    { id: 2, name: "XYZ Ltd", email: "recruit@xyz.com", phone: "8765432109" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Add or update a recruiter
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setRecruiters((prev) =>
        prev.map((recruiter) =>
          recruiter.id === formData.id ? formData : recruiter
        )
      );
      setIsEditing(false);
    } else {
      const newRecruiter = {
        ...formData,
        id: Date.now(),
      };
      setRecruiters((prev) => [...prev, newRecruiter]);
    }

    setFormData({ id: null, name: "", email: "", phone: "" });
  };

  // Edit a recruiter
  const handleEdit = (recruiter) => {
    setFormData(recruiter);
    setIsEditing(true);
  };

  // Delete a recruiter
  const handleDelete = (id) => {
    setRecruiters((prev) => prev.filter((recruiter) => recruiter.id !== id));
  };

  // Filter recruiters by search term
  const filteredRecruiters = recruiters.filter((recruiter) =>
    recruiter.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" min-h-screen py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl mx-auto p-6 space-y-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Recruiter Management
        </h2>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
            placeholder="Search recruiters..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Recruiter Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Recruiter Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition"
          >
            {isEditing ? "Update Recruiter" : "Add Recruiter"}
          </button>
        </form>

        {/* Recruiters Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-3 border-b text-gray-600">Name</th>
                <th className="px-4 py-3 border-b text-gray-600">Email</th>
                <th className="px-4 py-3 border-b text-gray-600">Phone</th>
                <th className="px-4 py-3 border-b text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecruiters.map((recruiter) => (
                <tr
                  key={recruiter.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 border-b text-gray-700">
                    {recruiter.name}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    {recruiter.email}
                  </td>
                  <td className="px-4 py-3 border-b text-gray-700">
                    {recruiter.phone}
                  </td>
                  <td className="px-4 py-3 border-b space-x-2">
                    <button
                      onClick={() => handleEdit(recruiter)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(recruiter.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRecruiters.length === 0 && (
            <p className="text-center py-4 text-gray-600">No recruiters found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecruiterManagement;
