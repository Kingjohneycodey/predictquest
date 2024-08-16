"use client"
import { getUser } from "@/utils/config";
import React from "react";
import {
  FaCheckCircle,
  FaChartLine,
  FaCalendarAlt,
  FaLightbulb,
} from "react-icons/fa";

const DashboardCard: React.FC<{
  icon: JSX.Element;
  title: string;
  value: string;
  color: string;
}> = ({ icon, title, value, color }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 relative overflow-hidden">
      <div className="flex items-center space-x-4 z-10 relative">
        <div className="text-4xl text-blue-500">{icon}</div>
        <div className="text-right">
          <h3 className="text-xl font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {

  const user = getUser()


  return (
    <div>
      <div className="prose">
      <h1>Welcome, {user && user.username}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        <DashboardCard
          icon={<FaCheckCircle />}
          title="Total Predictions"
          value="0"
          color="red"
        />
        <DashboardCard
          icon={<FaLightbulb />}
          title="Correct Predictions"
          value="0"
          color="green"
        />
        <DashboardCard
          icon={<FaChartLine />}
          title="Prediction Accuracy"
          value="100%"
          color="blue"
        />
        <DashboardCard
          icon={<FaCalendarAlt />}
          title="Upcoming Events"
          value="10"
          color="orange"
        />
      </div>

      <section></section>
    </div>
  );
};

export default Dashboard;
