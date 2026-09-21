import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";
import { useAuth } from "../hooks/useAuth";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); navigate("/login", { replace: true }); };
  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="flex min-h-screen">
        {/* Admin Sidebar */}
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col lg:ml-[270px]">
          {/* Admin Navbar */}
          <AdminNavbar onMenuClick={() => setSidebarOpen(true)} adminName={user?.name} onLogout={handleLogout} />

          {/* Admin Content */}
          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
