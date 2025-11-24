// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import AuthPage from "./pages/Authpage";    
import StudentDashboard from "./pages/StudentDashboard";
import AdminPanel from "./pages/AdminPanel";
import Adminlogin from "./pages/Adminlogin";
import AddAdmin from "./pages/AddAdmin";
import ProjectsSubmissions from "./pages/ProjectsSubmissions";
import ReviewProjects from "./pages/ReviewProjects";
import ManageUsers from "./pages/ManageUsers";
import Analytics from "./pages/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/admin/login" element={<Adminlogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/add-admin" element={<AddAdmin />} />
        <Route path="/admin-panel" element={<AdminPanel />} />
         <Route path="/projects-submissions" element={<ProjectsSubmissions />} />
        <Route path="/review-projects" element={<ReviewProjects />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
