import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { LanguageProvider } from './contexts/LanguageContext';
import { Home } from './pages/Home';

const AdminLogin = lazy(() => import('./pages/AdminLogin').then((module) => ({ default: module.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then((module) => ({ default: module.AdminDashboard })));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute').then((module) => ({ default: module.ProtectedRoute })));

function RouteFallback() {
  return <div className="min-h-screen bg-[#04060b]" aria-hidden="true" />;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-login" element={<Suspense fallback={<RouteFallback />}><AdminLogin /></Suspense>} />
          <Route 
            path="/admin/dashboard" 
            element={
              <Suspense fallback={<RouteFallback />}>
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              </Suspense>
            } 
          />
        </Routes>
      </Router>
      <Toaster position="bottom-right" toastOptions={{
        style: {
          background: '#04060b',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        }
      }} />
    </LanguageProvider>
  );
}
