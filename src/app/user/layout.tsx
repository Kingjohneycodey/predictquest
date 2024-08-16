"use client"
import React, { ReactNode, useState } from 'react';

interface UserLayoutProps {
    children: ReactNode;
  }

  const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
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
        <h1 className="text-2xl font-bold">Dashboard</h1>
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
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600">
              Dashboard
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600">
              Settings
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600">
              Profile
            </a>
            <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600">
              Logout
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-100 p-6 lg:ml-64">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4">
        © 2024 Your Company
      </footer>
    </div>
  );
};

export default UserLayout;
