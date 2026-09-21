import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { profile } = useUser();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/login", { replace: true }); };
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} userName={user?.name} onLogout={handleLogout} />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col lg:ml-[270px]">
          {/* Dashboard Navbar */}
          <DashboardNavbar onMenuClick={() => setSidebarOpen(true)} userName={user?.name} notificationCount={0} onLogout={handleLogout} />

          {/* Page Content */}
          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
