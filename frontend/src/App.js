// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './screen/Main';
import Login from './screen/Login';
import SignUp from './screen/SignUp'; // Add the SignUp import
import Profile from './components/Profile/Profile'; // Import the Profile component
import UploadScreen from './screen/UploadScreen';
import { ArtProvider } from './ArtContext'; // Import the ArtProvider
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ArtDetails from './screen/ArtDetails'; // Import the ArtDetails component

function App() {
  return (
    <ArtProvider> {/* Wrap the entire application with ArtProvider */}
      <Router>
        <div className="app-container">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} /> {/* Main screen */}
            <Route path="/login" element={<Login />} /> {/* Login screen */}
            <Route path="/signup" element={<SignUp />} /> {/* SignUp screen */}
            <Route path="/profile" element={<Profile />} /> {/* Profile screen */}
            <Route path="/upload" element={<UploadScreen />} /> {/* Upload screen */}
            <Route path="/art/:id" element={<ArtDetails />} /> {/* Art details screen */}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ArtProvider>
  );
}

export default App;