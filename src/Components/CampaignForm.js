import React, { useState } from "react";
import { toast } from "react-toastify";

const CampaignForm = () => {
  const [formData, setFormData] = useState({
    minAge: null,
    maxAge: null,
    gender: "",
    lastVisitBefore: "",
    lastVisitAfter: "",
    minTotalVisits: null,
    maxTotalVisits: null,
    minLatestPurchase: null,
    maxLatestPurchase: null,
    message: "",
  });
  const [customerCount, setCustomerCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilter = async () => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("userId");

      const queryParams = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(
        `http://192.168.153.139:5000/api/customer/filter?uid=${uid}&${queryParams.toString()}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
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
        toast.success(result.status || `Customers found: ${result.count}`);
      }

      setCustomerCount(result.count || 0);
    } catch (error) {
      toast.error(
        `Error fetching customer count: ${error.message}. Couldn't reach the server. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      const uid = localStorage.getItem("userId");

      const response = await fetch(
        "http://192.168.153.139:5000/api/campaign/addcampaign",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid,
            message: formData.message,
            query: {
              minAge: formData.minAge,
              maxAge: formData.maxAge,
              gender: formData.gender.toLowerCase(),
              lastVisitBefore: formData.lastVisitBefore,
              lastVisitAfter: formData.lastVisitAfter,
              minTotalVisits: formData.minTotalVisits,
              maxTotalVisits: formData.maxTotalVisits,
              minLatestPurchase: formData.minLatestPurchase,
              maxLatestPurchase: formData.maxLatestPurchase,
            },
            size: customerCount,
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
        toast.success(result.status || "Campaign added successfully!");
      }
    } catch (error) {
      toast.error(`An unexpected error occurred. Please try again. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r 
    from-purple-500 to-blue-500 p-6"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add New Campaign
        </h1>
        <div className="mb-4 text-center">
          Customer Count: {loading ? "Loading..." : customerCount}
        </div>
        <button
          type="button"
          onClick={handleFilter}
          className="block bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition mb-4 mx-auto"
        >
          Filter
        </button>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Minimum Age", name: "minAge", type: "number" },
              { label: "Maximum Age", name: "maxAge", type: "number" },
              {
                label: "Gender",
                name: "gender",
                type: "select",
                options: ["", "male", "female", "other"],
              },
              {
                label: "Last Visit Before",
                name: "lastVisitBefore",
                type: "date",
              },
              {
                label: "Last Visit After",
                name: "lastVisitAfter",
                type: "date",
              },
              {
                label: "Minimum Total Visits",
                name: "minTotalVisits",
                type: "number",
              },
              {
                label: "Maximum Total Visits",
                name: "maxTotalVisits",
                type: "number",
              },
              {
                label: "Minimum Latest Purchase",
                name: "minLatestPurchase",
                type: "number",
              },
              {
                label: "Maximum Latest Purchase",
                name: "maxLatestPurchase",
                type: "number",
              },
            ].map(({ label, name, type, options }) => (
              <div key={name}>
                <label
                  htmlFor={name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {label}
                </label>
                {type === "select" ? (
                  <select
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    {options.map((option) => (
                      <option key={option} value={option}>
                        {option || "Select gender"}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                )}
              </div>
            ))}

            <div className="sm:col-span-2 lg:col-span-3">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Enter additional details..."
                className="mt-2 w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-purple-500 text-white py-3 px-4 rounded-lg hover:bg-purple-600 transition text-sm font-medium uppercase"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampaignForm;
