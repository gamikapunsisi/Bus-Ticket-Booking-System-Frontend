import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import BusRouteFinder from './components/BusRouteFinder';
import SeatSelection from './components/SeatSelection';
import Payment from './components/Payment';
import { useAuth } from './context/AuthContext';
import TripCreator from './components/TripCreator';
import AdminDashboard from './components/AdminDashboard';
import BookingConfirmation from './components/BookingConfirmation';
import RouteCreator from './components/RouteCreator';

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, userType } = useAuth();
  return isAuthenticated && userType === 'ADMIN' ? children : <Navigate to="/login" />;
};

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/trips/create"
            element={
              <AdminRoute>
                <TripCreator />
              </AdminRoute>
            }
          />
          <Route
            path="/routes/create"
            element={
              <AdminRoute>
                <RouteCreator />
              </AdminRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <BusRouteFinder />
              </PrivateRoute>
            }
          />
          <Route
            path="/seat-selection"
            element={
              <PrivateRoute>
                <SeatSelection />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <Payment />
              </PrivateRoute>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <PrivateRoute>
                <BookingConfirmation />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
