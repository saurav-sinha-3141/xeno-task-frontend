import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const features = [
    {
      icon: "fas fa-user-plus",
      title: "Add Customer",
      description: "Click to add a new customer to the system.",
      buttonText: "Add Customer",
    },
    {
      icon: "fas fa-bullhorn",
      title: "Add Campaign",
      description: "Click to start a new marketing campaign.",
      buttonText: "Add Campaign",
    },
    {
      icon: "fas fa-history",
      title: "View History",
      description: "Click to view historical record of customer actions.",
      buttonText: "Campaign History",
    },
  ];

  const navigate = useNavigate();

  const handleClick = (feature) => {
    const routes = {
      [features[0].buttonText]: "/customerform",
      [features[1].buttonText]: "/campaignform",
      [features[2].buttonText]: "/history",
    };

    const route = routes[feature];
    if (route) {
      navigate(route);
    } else {
      console.error("Invalid feature or route not found:", feature);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-blue-500">
      <div className="flex gap-8 flex-wrap justify-center max-w-5xl">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 w-72 flex flex-col items-center text-center transition transform hover:-translate-y-3 hover:shadow-2xl"
          >
            <i className={`${feature.icon} text-4xl text-purple-500 mb-4`}></i>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <button
              onClick={() => handleClick(feature.buttonText)}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition"
            >
              {feature.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
