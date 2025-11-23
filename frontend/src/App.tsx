import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BookingPage } from './pages/BookingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { MarketingPage } from './pages/MarketingPage';
import { ClientDashboard } from './pages/ClientDashboard';

import { LandingPage } from './pages/LandingPage';

import { LoginPage } from './pages/LoginPage';
import { RequireAuth } from './components/RequireAuth';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="login" element={<LoginPage />} />

          <Route path="admin" element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          } />

          <Route path="marketing" element={
            <RequireAuth>
              <MarketingPage />
            </RequireAuth>
          } />

          <Route path="client-dashboard" element={
            <RequireAuth>
              <ClientDashboard />
            </RequireAuth>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
