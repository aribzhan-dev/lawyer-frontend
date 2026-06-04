import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import HomePage from '@/pages/HomePage';
import ServicesPage from '@/pages/ServicesPage';
import LawyersPage from '@/pages/LawyersPage';
import NotFoundPage from '@/pages/NotFoundPage';
import LawyerProfilePage from '@/features/lawyers/LawyerProfilePage';
import AdminLoginPage from '@/features/admin/AdminLoginPage';
import AdminLayout from '@/features/admin/AdminLayout';
import LawyerList from '@/features/admin/LawyerList';
import LawyerForm from '@/features/admin/LawyerForm';
import ServiceList from '@/features/admin/ServiceList';
import ServiceForm from '@/features/admin/ServiceForm';
import RequireAuth from './RequireAuth';
import ToastContainer from '@/components/common/ToastContainer';

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="lawyers" element={<LawyersPage />} />
        <Route path="lawyers/:slug" element={<LawyerProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Admin public: login */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin protected: dashboard */}
        <Route element={<RequireAuth />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/lawyers" replace />} />
            <Route path="lawyers" element={<LawyerList />} />
            <Route path="lawyers/new" element={<LawyerForm />} />
            <Route path="lawyers/:id/edit" element={<LawyerForm />} />
            <Route path="services" element={<ServiceList />} />
            <Route path="services/new" element={<ServiceForm />} />
            <Route path="services/:id/edit" element={<ServiceForm />} />
          </Route>
        </Route>

        {/* Public site */}
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
