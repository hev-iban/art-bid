import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './screen/Main';
import Profile from './components/Profile/Profile';
import UploadScreen from './screen/UploadScreen';
import { ArtProvider } from './ArtContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import ArtDetails from './screen/ArtDetails';
import About from './components/About';
import Contact from './components/Contact';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import AuthScreen from './screen/AuthScreen'; // Import the combined AuthScreen

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is authenticated (e.g., by checking localStorage for a token)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <ArtProvider>
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            {/* Redirect to AuthScreen if not authenticated */}
            <Route
              path="/"
              element={isAuthenticated ? <Main /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={<AuthScreen setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/upload" element={<UploadScreen />} />
            <Route path="/art/:art_id" element={<ArtDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ArtProvider>
  );
}

export default App;