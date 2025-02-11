import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screen/Home'; // Import the Home component
import Main from './screen/Main';
import Login from './screen/Login';
import SignUp from './screen/SignUp';
import Profile from './components/Profile/Profile';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/home" element={<Home />} /> {/* Add Home route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
