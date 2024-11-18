import React, { useState } from "react";
import { toast } from "react-toastify";

const CustomerForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    lastVisit: "",
    totalVisits: "",
    latestPurchase: "",
    totalPurchase: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://192.168.153.139:5000/api/customer/addcustomer`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            uid: localStorage.getItem("userId"),
            name: formData.name,
            email: formData.email,
            age: formData.age ? Number(formData.age) : null,
            gender: formData.gender.toLowerCase(),
            lastVisit: formData.lastVisit,
            totalVisits: formData.totalVisits
              ? Number(formData.totalVisits)
              : null,
            latestPurchase: formData.latestPurchase
              ? Number(formData.latestPurchase)
              : null,
            totalPurchase: formData.totalPurchase
              ? Number(formData.totalPurchase)
              : null,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        // Handle validation errors
        if (result.errors && Array.isArray(result.errors)) {
          result.errors.forEach((err) =>
            toast.error(`${err.path}: ${err.msg}`)
          );
        }

        // Handle general errors
        if (result.error) {
          toast.error(result.error);
        }
      } else {
        setFormData({
          name: "",
          email: "",
          age: "",
          gender: "",
          lastVisit: "",
          totalVisits: "",
          latestPurchase: "",
          totalPurchase: "",
        });
        toast.success(result.status || "Customer added successfully!");
      }
    } catch (error) {
      toast.error(error+" : There was a problem reaching the server");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r 
    from-purple-500 to-blue-500 p-6"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Customer Details Form
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              <i className="fas fa-user text-purple-500 mr-2"></i>
              Name
            </label>
            <input
              value={formData.name}
              onChange={handleChange}
              type="text"
              id="name"
              placeholder="Enter your full name"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              <i className="fas fa-envelope text-purple-500 mr-2"></i> Email
            </label>
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              placeholder="Enter your email"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-700"
            >
              <i className="fas fa-calendar-alt text-purple-500 mr-2"></i> Age
            </label>
            <input
              value={formData.age}
              onChange={handleChange}
              type="number"
              id="age"
              placeholder="Enter your age"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              <i className="fas fa-venus-mars text-purple-500 mr-2"></i> Gender
            </label>
            <select
              value={formData.gender}
              onChange={handleChange}
              id="gender"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="lastVisit"
              className="block text-sm font-medium text-gray-700"
            >
              <i className="fas fa-clock text-purple-500 mr-2"></i> Last Visit
            </label>
            <input
              value={formData.lastVisit}
              onChange={handleChange}
              type="date"
              id="lastVisit"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="totalVisits"
              className="block text-sm font-medium text-gray-700"
            >
              <i className="fas fa-users text-purple-500 mr-2"></i> Total Visits
            </label>
            <input
              value={formData.totalVisits}
              onChange={handleChange}
              type="number"
              id="totalVisits"
              placeholder="Enter total visits"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="latestPurchase"
              className="block text-sm font-medium text-gray-700"
            >
              <i className="fas fa-shopping-cart text-purple-500 mr-2"></i>{" "}
              Latest Purchase
            </label>
            <input
              value={formData.latestPurchase}
              onChange={handleChange}
              type="text"
              id="latestPurchase"
              placeholder="Enter latest purchase"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="totalPurchase"
              className="block text-sm font-medium text-gray-700"
            >
              <i className="fas fa-dollar-sign text-purple-500 mr-2"></i> Total
              Purchase
            </label>
            <input
              value={formData.totalPurchase}
              onChange={handleChange}
              type="number"
              id="totalPurchase"
              placeholder="Enter total purchase amount"
              className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition text-sm font-medium uppercase"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
