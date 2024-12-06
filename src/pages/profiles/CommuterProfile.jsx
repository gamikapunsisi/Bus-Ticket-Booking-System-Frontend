import React, { useState } from "react";
import axios from "axios";

const CommuterProfile = () => {
  const [commuter, setCommuter] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommuter((prev) => ({ ...prev, [name]: value }));
  };

  // Create new commuter profile
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setSuccess("");
      await axios.post(
        "https://api.ntc.lk/commuters/profile",
        commuter,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Commuter profile created successfully!");
      setCommuter({ id: "", name: "", email: "", phone: "" }); // Reset form
    } catch (err) {
      setError("Failed to create commuter profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg p-6 mx-auto mt-10 bg-white rounded-lg shadow-md">
      <h1 className="mb-6 text-2xl font-semibold text-center text-gray-800">
        Add Commuter Profile
      </h1>
      {success && (
        <p className="mb-4 text-center text-green-600">{success}</p>
      )}
      {error && <p className="mb-4 text-center text-red-600">{error}</p>}
      <form onSubmit={handleCreate} className="space-y-4">
        <div>
          <label
            htmlFor="id"
            className="block text-sm font-medium text-gray-600"
          >
            Commuter ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            value={commuter.id}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-600"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={commuter.name}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={commuter.email}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-600"
          >
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={commuter.phone}
            onChange={handleChange}
            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          disabled={loading}
        >
          {loading ? "Creating..." : "Add Commuter"}
        </button>
      </form>
    </div>
  );
};

export default CommuterProfile;
