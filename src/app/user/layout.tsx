"use client";
import NavLink from "@/components/UI/NavLink";
import React, { ReactNode, useState } from "react";
import { BiTrendingUp } from "react-icons/bi";
import { BsCash } from "react-icons/bs";
import { FaCog, FaDashcube, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdDashboard, MdEvent } from "react-icons/md";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col ">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5 flex items-center gap-3">
            <img className="h-8 w-auto" src="/football.png" alt="" />

            <span className="text-xl">Predict Quest</span>
          </a>
        </div>
        <div>User Profile</div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block bg-gray-700 text-white w-64 space-y-6 py-7 px-2 lg:relative fixed inset-y-0 lg:translate-x-0 transition duration-300 transform lg:transform-none lg:z-auto z-50`}
        >
          <button
            className="lg:hidden absolute top-4 right-4"
            onClick={() => setSidebarOpen(false)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <nav>
            <NavLink href="/user/dashboard">
            <MdDashboard /> Dashboard
            </NavLink>
            <NavLink href="/user/events">
             <MdEvent/> Events
            </NavLink>
            <NavLink href="/user/predictions">
             <BiTrendingUp/> Predictions
            </NavLink>
            <NavLink href="/user/rewards">
             <BsCash /> Rewards
            </NavLink>
            <NavLink href="/user/profile">
             <FaUser /> Profile
            </NavLink>
            <NavLink href="/user/settings">
             <FaCog/> Settings
            </NavLink>

            <a
              href="#"
              className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600 flex items-center gap-2 fixed bottom-5"
            >
              <FaSignOutAlt/> Logout
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6">
          <div className="min-h-[90vh]">{children}</div>

          <footer className="text-gray-800 text-center">
            © 2024 Predict Quest
          </footer>
        </main>
      </div>

      {/* Footer */}
    </div>
  );
};

export default UserLayout;
