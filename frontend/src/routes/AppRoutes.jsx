import React from "react";
import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

/* Public Pages */
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Services from "../pages/public/Services";
import Projects from "../pages/public/Projects";
import ProjectDetails from "../pages/public/ProjectDetails";
import Careers from "../pages/public/Careers";
import JobDetails from "../pages/public/JobDetails";
import Contact from "../pages/public/Contact";
import NotFound from "../pages/public/NotFound";

/* Auth */
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import VerifyEmail from "../pages/auth/VerifyEmail";

/* User */
import UserDashboard from "../pages/user/UserDashboard";
import MyProfile from "../pages/user/MyProfile";
import MyProjects from "../pages/user/MyProjects";
import UserProjectDetails from "../pages/user/ProjectDetails";
import UserServiceRequests from "../pages/user/ServiceRequests";
import CreateServiceRequest from "../pages/user/CreateServiceRequest";
import LabourRequests from "../pages/user/LabourRequests";
import UserJobApplications from "../pages/user/JobApplications";
import Notifications from "../pages/user/Notifications";
import UserSettings from "../pages/user/Settings";

/* Admin */
import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import AdminProjects from "../pages/admin/Projects";
import AddProject from "../pages/admin/AddProject";
import EditProject from "../pages/admin/EditProject";
import AdminServiceRequests from "../pages/admin/ServiceRequests";
import Labour from "../pages/admin/Labour";
import Jobs from "../pages/admin/Jobs";
import JobApplications from "../pages/admin/JobApplications";
import ContactMessages from "../pages/admin/ContactMessages";
import AdminSettings from "../pages/admin/Settings";
import ProtectedRoute from "../components/common/ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ========================================
          PUBLIC WEBSITE
      ======================================== */}

      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/projects"
          element={<Projects />}
        />

        <Route
          path="/projects/:id"
          element={<ProjectDetails />}
        />

        <Route
          path="/careers"
          element={<Careers />}
        />

        <Route
          path="/jobs/:id"
          element={<JobDetails />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />
      </Route>

      {/* ========================================
          AUTHENTICATION
      ======================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      <Route path="/verify-email" element={<VerifyEmail />} />

      {/* ========================================
          USER DASHBOARD
      ======================================== */}

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<UserLayout />}>
        <Route
          index
          element={<UserDashboard />}
        />

        <Route
          path="profile"
          element={<MyProfile />}
        />

        <Route
          path="projects"
          element={<MyProjects />}
        />

        <Route
          path="projects/:id"
          element={<UserProjectDetails />}
        />

        <Route
          path="service-requests"
          element={<UserServiceRequests />}
        />

        <Route
          path="service-requests/create"
          element={<CreateServiceRequest />}
        />

        <Route
          path="labour-requests"
          element={<LabourRequests />}
        />

        <Route
          path="job-applications"
          element={<UserJobApplications />}
        />

        <Route
          path="notifications"
          element={<Notifications />}
        />

        <Route
          path="settings"
          element={<UserSettings />}
        />
        </Route>
      </Route>

      {/* ========================================
          ADMIN DASHBOARD
      ======================================== */}

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route path="/admin" element={<AdminLayout />}>
        <Route
          index
          element={<AdminDashboard />}
        />

        <Route
          path="users"
          element={<Users />}
        />

        <Route
          path="projects"
          element={<AdminProjects />}
        />

        <Route
          path="projects/add"
          element={<AddProject />}
        />

        <Route
          path="projects/edit/:id"
          element={<EditProject />}
        />

        <Route
          path="service-requests"
          element={<AdminServiceRequests />}
        />

        <Route
          path="labour"
          element={<Labour />}
        />

        <Route
          path="jobs"
          element={<Jobs />}
        />

        <Route
          path="job-applications"
          element={<JobApplications />}
        />

        <Route
          path="contact-messages"
          element={<ContactMessages />}
        />

        <Route
          path="messages"
          element={<ContactMessages />}
        />

        <Route
          path="settings"
          element={<AdminSettings />}
        />
        </Route>
      </Route>

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default AppRoutes;