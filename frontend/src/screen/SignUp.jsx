// src/screen/SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate and handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation for now
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage('All fields are required.');
      return;
    }

    // Here you would send data to the backend API for registration
    // For now, let's mock the registration process:
    console.log('SignUp successful!', formData);

    // Clear error message
    setErrorMessage('');

    // Redirect to the login page or home page after successful sign up
    navigate('/login');
  };

  return (
    <Container className="my-5">
      <h2 className="text-center">Sign Up</h2>
      <Form onSubmit={handleSubmit}>
        {/* Username Field */}
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Email Field */}
        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Password Field */}
        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Confirm Password Field */}
        <Form.Group controlId="formConfirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Error Message */}
        {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

        {/* Submit Button */}
        <Button variant="primary" type="submit" className="w-100">
          Sign Up
        </Button>
      </Form>

      <div className="text-center mt-3">
        <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </Container>
  );
};

export default SignUp;
