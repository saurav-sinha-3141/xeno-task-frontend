import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ViewHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const uid = localStorage.getItem("userId");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          `http://192.168.153.139:5000/api/campaign/viewcampaign?uid=${uid}`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          toast.error(`HTTP error! Status: ${response.error}`);
        }

        const result = await response.json();

        if (result.success) {
          toast.success(`${result.status}` || "Fetched prior campaigns");
          setCampaigns(result.campaigns);
        } else {
          toast.error(`Failed to fetch campaigns. ${result.error}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [uid]);

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r 
    from-purple-500 to-blue-500 p-6"
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 text-center border-b-4 border-purple-500 py-4">
          View Campaign History
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 py-6">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-6">Error: {error}</p>
        ) : campaigns.length === 0 ? (
          <p className="text-center text-gray-600 py-6">No campaigns found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-200 mt-4">
              <thead>
                <tr className="bg-purple-600 text-white">
                  <th className="py-3 px-4 text-left font-medium">Date</th>
                  <th className="py-3 px-4 text-left font-medium">Message</th>
                  <th className="py-3 px-4 text-left font-medium">
                    Audience Size
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {campaigns.map((campaign) => (
                  <tr
                    key={campaign._id}
                    className="hover:bg-purple-100 transition"
                  >
                    <td className="py-3 px-4">
                      {new Date(campaign.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">{campaign.message}</td>
                    <td className="py-3 px-4">{campaign.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewHistory;
