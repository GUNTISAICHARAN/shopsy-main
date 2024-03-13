import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // State to manage the success message
  const [successMessage, setSuccessMessage] = useState('');

  // State to manage validation error messages
  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // State to manage the login message
  const [loginMessage, setLoginMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate form fields
    const errors = {};
    let formIsValid = true;

    // Check if required fields are filled in
    for (const key in signupData) {
      if (signupData[key].trim() === '') {
        errors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        formIsValid = false;
      } else {
        errors[key] = '';
      }
    }

    if (!formIsValid) {
      setValidationErrors(errors);
      return;
    }

    try {
      // Check if the user already exists
      const checkUserResponse = await axios.post('http://localhost:3001/api/checkuser', { email: signupData.email });

      if (checkUserResponse.data.exists) {
        // User already exists
        setValidationErrors({
          ...validationErrors,
          email: 'User already exists',
        });
        setLoginMessage('User already exists, please login');
      } else {
        // User does not exist, proceed with registration
        const registerUserResponse = await axios.post('http://localhost:3001/api/signup', signupData);

        if (registerUserResponse.data.success) {
          // Registration successful
          setSuccessMessage('User registered successfully');
          // Clear the form fields and validation errors
          setSignupData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });
          setValidationErrors({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
          });

          // Redirect to login page
          navigate('/login', { state: { successMessage: 'User registered successfully' } });
        } else {
          // Registration failed
          console.log('Registration failed:', registerUserResponse.data.error);
        }
      }
    } catch (error) {
      console.error('Error during signup:', error.response.data);
      // Handle registration error...
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            value={signupData.firstName}
            onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
            required
            className="mt-1 p-2 border border-gray-300 w-full"
          />
          {validationErrors.firstName && (
            <p style={{ color: 'red' }}>{validationErrors.firstName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            value={signupData.lastName}
            onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
            required
            className="mt-1 p-2 border border-gray-300 w-full"
          />
          {validationErrors.lastName && (
            <p style={{ color: 'red' }}>{validationErrors.lastName}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={signupData.email}
            onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            required
            className="mt-1 p-2 border border-gray-300 w-full"
          />
          {validationErrors.email && (
            <p style={{ color: 'red' }}>{validationErrors.email}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={signupData.password}
            onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            required
            className="mt-1 p-2 border border-gray-300 w-full"
          />
          {validationErrors.password && (
            <p style={{ color: 'red' }}>{validationErrors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Signup
        </button>
        {successMessage && (
          <p style={{ color: 'green' }}>{successMessage}</p>
        )}

        <p className="mt-4">
          Click to Login <Link to="/login" className="text-blue-500">Login in here</Link>.
        </p>

        {/* Display login message */}
        {loginMessage && (
          <p style={{ color: 'red' }}>{loginMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Signup;
