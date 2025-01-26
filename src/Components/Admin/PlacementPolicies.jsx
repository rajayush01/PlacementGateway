import React, { useState } from "react";

const PlacementPolicies = () => {
  const [policies, setPolicies] = useState([
    { id: 1, title: "Policy 1", content: "Details about Policy 1." },
    { id: 2, title: "Policy 2", content: "Details about Policy 2." },
  ]);
  const [searchTerm, setSearchTerm] = useState("");
  const [formData, setFormData] = useState({ id: null, title: "", content: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setPolicies((prev) =>
        prev.map((policy) => (policy.id === formData.id ? formData : policy))
      );
      setIsEditing(false);
    } else {
      const newPolicy = {
        ...formData,
        id: Date.now(),
      };
      setPolicies((prev) => [...prev, newPolicy]);
    }

    setFormData({ id: null, title: "", content: "" });
  };

  // Edit policy
  const handleEdit = (policy) => {
    setFormData(policy);
    setIsEditing(true);
  };

  // Delete policy
  const handleDelete = (id) => {
    setPolicies((prev) => prev.filter((policy) => policy.id !== id));
  };

  // Filter policies based on search
  const filteredPolicies = policies.filter((policy) =>
    policy.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">Placement Policies</h2>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          placeholder="Search policies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Policy Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Policy Title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
            required
          />
        </div>
        <textarea
          name="content"
          placeholder="Policy Content"
          value={formData.content}
          onChange={handleInputChange}
          rows="6"
          className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-500 transition"
        >
          {isEditing ? "Update Policy" : "Add Policy"}
        </button>
      </form>

      {/* Policies List */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border-b">Policy Title</th>
              <th className="px-4 py-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPolicies.map((policy) => (
              <tr key={policy.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{policy.title}</td>
                <td className="px-4 py-2 border-b space-x-2">
                  <button
                    onClick={() => handleEdit(policy)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(policy.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredPolicies.length === 0 && (
          <p className="text-center py-4 text-gray-600">No policies found.</p>
        )}
      </div>
    </div>
  );
};

export default PlacementPolicies;
