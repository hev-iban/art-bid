// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './screen/Main';
import Login from './screen/Login';
import SignUp from './screen/SignUp';  // Add the SignUp import
import Profile from './components/Profile/Profile'; // Import the Profile component
import UploadScreen from './screen/UploadScreen';
import { ArtProvider } from './ArtContext'; // Import the ArtProvider from './actions/productActions'; // Import the ArtProvider
import 'bootstrap/dist/css/bootstrap.min.css';
import './bootstrap.min.css'; // Ensure this path is correct
function App() {
  return (
    <ArtProvider> {/* Wrap the entire application with ArtProvider */}
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
            <Route path="/upload" element={<UploadScreen />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </ArtProvider>
  );
}

export default App;