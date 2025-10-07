import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import ProtectedRoute from './components/ui/ProtectedRoute';

// Публичные страницы
import HomePage from './pages/public/HomePage';
import ServicesPage from './pages/public/ServicesPage';
import ServiceDetailsPage from './pages/public/ServiceDetailsPage';
import ProductsPage from './pages/public/ProductsPage';
import ProductDetailsPage from './pages/public/ProductDetailsPage';
import ReviewsPage from './pages/public/ReviewsPage';
import LoginPage from './pages/public/LoginPage';
import RegisterPage from './pages/public/RegisterPage';

// Пользовательские страницы
import ProfilePage from './pages/user/ProfilePage';
import MyAppointmentsPage from './pages/user/MyAppointmentsPage';
import AppointmentFormPage from './pages/user/AppointmentFormPage';
import AddReviewPage from './pages/user/AddReviewPage';

// Админ-панель
import AdminDashboard from './pages/admin/AdminDashboard';
import ServicesAdminPage from './pages/admin/ServicesAdminPage';
import ServiceFormPage from './pages/admin/ServiceFormPage';
import ProductsAdminPage from './pages/admin/ProductsAdminPage';
import ProductFormPage from './pages/admin/ProductFormPage';
import ScheduleAdminPage from './pages/admin/ScheduleAdminPage';
import AppointmentsAdminPage from './pages/admin/AppointmentsAdminPage';
import ReviewsAdminPage from './pages/admin/ReviewsAdminPage';
import StatisticsPage from './pages/admin/StatisticsPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Публичные маршруты */}
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/:id" element={<ServiceDetailsPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Пользовательские маршруты (требуется авторизация) */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        } />
        <Route path="/my-appointments" element={
          <ProtectedRoute>
            <MyAppointmentsPage />
          </ProtectedRoute>
        } />
        <Route path="/appointment/new" element={
          <ProtectedRoute>
            <AppointmentFormPage />
          </ProtectedRoute>
        } />
        <Route path="/reviews/add/:id" element={
          <ProtectedRoute>
            <AddReviewPage />
          </ProtectedRoute>
        } />

        {/* Админские маршруты (требуется роль admin) */}
        <Route path="/admin" element={
          <ProtectedRoute adminOnly>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/services" element={
          <ProtectedRoute adminOnly>
            <ServicesAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/services/new" element={
          <ProtectedRoute adminOnly>
            <ServiceFormPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/services/edit/:id" element={
          <ProtectedRoute adminOnly>
            <ServiceFormPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/products" element={
          <ProtectedRoute adminOnly>
            <ProductsAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/new" element={
          <ProtectedRoute adminOnly>
            <ProductFormPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/products/edit/:id" element={
          <ProtectedRoute adminOnly>
            <ProductFormPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/schedule" element={
          <ProtectedRoute adminOnly>
            <ScheduleAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/appointments" element={
          <ProtectedRoute adminOnly>
            <AppointmentsAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/reviews" element={
          <ProtectedRoute adminOnly>
            <ReviewsAdminPage />
          </ProtectedRoute>
        } />
        <Route path="/admin/statistics" element={
          <ProtectedRoute adminOnly>
            <StatisticsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
