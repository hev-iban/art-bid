import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './screen/Main';
import Login from './screen/Login';
import SignUp from './screen/SignUp';  // Add the SignUp import
import Profile from './components/Profile/Profile'; // Import the Profile component



function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} /> {/* Add the Profile route */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
