import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      setSuccessMessage(location.state.successMessage);

      // Clear the success message after 5 seconds
      const timerId = setTimeout(() => {
        setSuccessMessage('');
      }, 5000);

      // Clear the timer when the component unmounts
      return () => clearTimeout(timerId);
    }
  }, [location.state]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loginData.email && loginData.password) {
      try {
        const response = await axios.post('http://localhost:3001/api/login', loginData);

        // Assuming the response contains a property like 'success' indicating successful login
        if (response.data.success) {
          // Redirect to '/' after successful login
          navigate('/', { state: { successMessage: 'User logged in successfully' } });
        } else {
          setLoginError('User not registered or incorrect credentials');
          setSuccessMessage(''); // Clear any existing success message
        }
      } catch (error) {
        console.error('Error during login:', error.response.data);
        setLoginError('Error during login');
        setSuccessMessage(''); // Clear any existing success message
      }
    } else {
      setLoginError('Please enter email & password.');
      setSuccessMessage(''); // Clear any existing success message
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-8 bg-white shadow-lg rounded-lg">
      {successMessage && (
        <p style={{ color: 'green', marginBottom: '10px' }}>{successMessage}</p>
      )}

      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Email:</span>
          <input
            type="email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
            className="mt-1 p-2 border border-gray-300 w-full"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
            className="mt-1 p-2 border border-gray-300 w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
        >
          Login
        </button>
        {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
        <p className="mt-4">
          Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
