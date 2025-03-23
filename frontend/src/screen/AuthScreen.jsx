import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthScreen = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(''); // State to store error messages
  const navigate = useNavigate();

  const handleAuth = async () => {
    // Validate required fields
    if (!username || !password || (!isLogin && !email)) {
      setError('Please fill in all fields');
      return;
    }

    try {
      let response;
      if (isLogin) {
        // Handle Login
        response = await axios.post('http://127.0.0.1:8000/api/login/', {
          username,
          password,
        });
      } else {
        // Handle Register
        response = await axios.post('http://127.0.0.1:8000/api/register/', {
          username,
          password,
          email,
        });
      }
      console.log(`${isLogin ? 'Login' : 'Registration'} successful:`, response.data);
      localStorage.setItem('token', response.data.token); // Save token to localStorage
      setIsAuthenticated(true); // Set authenticated state to true
      navigate('/'); // Redirect to Main screen
    } catch (error) {
      console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error.response.data);
      setError(error.response.data.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAuth();
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setError(''); // Clear error message when toggling
          }}
          style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}
        >
          {isLogin ? 'Register here' : 'Login here'}
        </button>
      </p>
    </div>
  );
};

export default AuthScreen;