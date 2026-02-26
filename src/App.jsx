// App.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import { ProtectedRoute, PublicRoute } from "./components/ProtectedRoute";

// Lazy loading page components
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Service = lazy(() => import("./pages/Service"));
const IoTDevelopment = lazy(() => import("./pages/IoTDevelopment"));
const SoftwareDevelopment = lazy(() => import("./pages/SoftwareDevelopment"));
const MobileAppDevelopment = lazy(() => import("./pages/MobileAppDevelopment"));
const SupportAndMaintenance = lazy(() => import("./pages/SupportAndMaintenance"));

const SignIn = lazy(() => import("./admin/SignIn"));
const ResetPassword = lazy(() => import("./admin/ResetPassword"));

const Dashboard = lazy(() => import("./admin/Dashboard"));
const DashboardFeedbacks = lazy(() => import("./admin/Feedbacks"));
const DashboardContacts = lazy(() => import("./admin/Contacts"));
const EditContact = lazy(() => import("./admin/EditContact"));
const DashboardProjects = lazy(() => import("./admin/Projects"));
const DashboardProjectsForm = lazy(() => import("./admin/ProjectsForm"));
const DashboardFeedbacksForm = lazy(() => import("./admin/FeedbacksForm"));
const DashboardContactsForm = lazy(() => import("./admin/ContactsForm"));
const DashboardProjectsEdit = lazy(() => import("./admin/ProjectsEdit"));
const DashboardLogos = lazy(() => import("./admin/Logos"));
const DashboardLogosForm = lazy(() => import("./admin/LogosForm"));
const AddUser = lazy(() => import("./admin/AddUser"));
const EditUser = lazy(() => import("./admin/EditUser"));
const ViewUser = lazy(() => import("./admin/ViewUser"));

// Simple loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-black">
    <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <MainLayout>
      <title>Sky Smart Technology | Industrial IoT & Automation Solutions</title>
      <meta name="description" content="Sky Smart Technology specializes in advanced industrial automation, IoT ecosystems, and precision software solutions for a connected future." />
      <meta name="keywords" content="Industrial Automation, IoT Solutions, Smart Technology, Precision Software, Eco Investment, Edge Computing" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content="Sky Smart Technology | Industrial IoT & Automation" />
      <meta property="og:description" content="Leading the future of industrial automation through integrated IoT ecosystems in Sri Lanka." />
      <meta property="og:image" content="/og-image.jpg" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Sky Smart Technology" />
      <meta name="twitter:description" content="Advanced IoT and Automation solutions for modern industries." />
      
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<PublicRoute><Home /></PublicRoute>} />
          <Route path="/about" element={<PublicRoute><About /></PublicRoute>} />
          <Route path="/projects" element={<PublicRoute><Projects /></PublicRoute>} />
          <Route path="/services" element={<PublicRoute><Service /></PublicRoute>} />
          <Route path="/mobile-app-development" element={<PublicRoute><MobileAppDevelopment /></PublicRoute>} />
          <Route path="/support-maintenance" element={<PublicRoute><SupportAndMaintenance /></PublicRoute>} />
          <Route path="/iot-development" element={<PublicRoute><IoTDevelopment /></PublicRoute>} />
          <Route path="/software-development" element={<PublicRoute><SoftwareDevelopment /></PublicRoute>} />
          <Route path="/contact" element={<PublicRoute><Contact /></PublicRoute>} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/projects" element={<ProtectedRoute><DashboardProjects /></ProtectedRoute>} />
          <Route path="/dashboard/projects/new" element={<ProtectedRoute><DashboardProjectsForm /></ProtectedRoute>} />
          <Route path="/dashboard/projects/:id/edit" element={<ProtectedRoute><DashboardProjectsEdit /></ProtectedRoute>} />
          <Route path="/dashboard/feedbacks" element={<ProtectedRoute><DashboardFeedbacks /></ProtectedRoute>} />
          <Route path="/dashboard/feedbacks/new" element={<ProtectedRoute><DashboardFeedbacksForm /></ProtectedRoute>} />
          <Route path="/dashboard/logos" element={<ProtectedRoute><DashboardLogos /></ProtectedRoute>} />
          <Route path="/dashboard/logos/new" element={<ProtectedRoute><DashboardLogosForm /></ProtectedRoute>} />
          <Route path="/dashboard/contacts" element={<ProtectedRoute><DashboardContacts /></ProtectedRoute>} />
          <Route path="/dashboard/contacts/new" element={<ProtectedRoute><DashboardContactsForm /></ProtectedRoute>} />
          <Route path="/dashboard/contacts/:id/edit" element={<ProtectedRoute><EditContact /></ProtectedRoute>} />
          <Route path="/dashboard/users" element={<ProtectedRoute><ViewUser /></ProtectedRoute>} />
          <Route path="/dashboard/users/new" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
          <Route path="/dashboard/users/:id/edit" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
        </Routes>
      </Suspense>
    </MainLayout>
  );
}

export default App;
