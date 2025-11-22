import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { BookingPage } from './pages/BookingPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { MarketingPage } from './pages/MarketingPage';

import { LandingPage } from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="booking" element={<BookingPage />} />
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="marketing" element={<MarketingPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
