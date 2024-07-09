import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './pages/Navbar';
import ForgotPassword from './pages/ForgotPassword';
import Menu from './pages/Menu';
import { useState, useEffect } from 'react';
import AdminPage from './pages/AdminPage.jsx';
import UserPage from './pages/UserPage';
import TicketPage from './pages/TicketPage.jsx';


const App = () => {
  const [isMenuPage, setIsMenuPage] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    // Update state based on the current path
    if (location.pathname === '/menu') {
      setIsMenuPage(true);
    } else {
      setIsMenuPage(false);
    }
  }, [location.pathname]);

  const shouldShowNavbar = () => {
    return location.pathname !== '/adminpage' && location.pathname !== '/userpage' && location.pathname !== '/mytickets' && !isMenuPage;
  };

  return (
    <main className="overflow-hidden">
      {shouldShowNavbar() && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/adminpage" element={<AdminPage />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/mytickets" element={<TicketPage />} />
      </Routes>
    </main>
  );
};

export default App;