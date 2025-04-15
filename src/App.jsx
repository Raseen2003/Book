import Auth from './pages/Auth';
import Home from './pages/Home';
import Footer from './components/Footer';
import Header from './components/Header';
import Book from './components/Book';
import Profile from './components/Profile';
import Bookings from './components/Bookings';
import Booked from './assets/admin/Booked';
import { Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom'; // Import Navigate

// Protected Route Component
const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');
  const isAdmin = user && user.email === 'admin'; // Adjust based on your logic
  return isAdmin ? children : <Navigate to="/home" />;
};

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <Booked />
            </ProtectedAdminRoute>
          }
        /> {/* Protected admin route */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;