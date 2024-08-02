import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import AboutPage from './pages/AboutPage';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Navbar from './components/Navbar';
import PrivateRoute from './auth/PrivateRoute';
import PublicRoute from './auth/PublicRoute';
import ProtectedPage from './pages/ProtectedPage';

function App() {
  return (
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/registration" 
            element={
              <PublicRoute>
                <Registration />
              </PublicRoute>
            } 
          />
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/protected" 
            element={
              <PrivateRoute>
                <ProtectedPage />
              </PrivateRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
