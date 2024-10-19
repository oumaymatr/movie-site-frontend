"use client"; // Ensure client-side rendering
import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // 'next/navigation' for Next.js 13+
import axios from 'axios';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for showing/hiding password

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const router = useRouter(); // Use Next.js router for redirection

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('Login initiated');

    try {
      // Log request details
      console.log('Sending login request with:', { email, password });

      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        mot_de_passe: password, // Ensure the backend expects this field name
      });

      // Log the full response to see if token is there
      console.log('Login response:', response);

      const token = response.data.access_token; // Check if token exists
      if (token) {
        console.log('Token received:', token);

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect to home page
        router.push('/');
      } else {
        console.log('No token in response:', response.data);
        setError('Login failed: Token not received');
      }
    } catch (err) {
      // Log the error for debugging
      console.error('Login error:', err);

      if (axios.isAxiosError(err) && err.response) {
        console.error('Axios error response:', err.response);
      
        // Handle different status codes
        if (err.response.status === 401) {
          setError('Incorrect password. Please try again.'); 
        } else if (err.response.status === 404) {
          setError('User does not exist. Please check your email.');
        } else {
          setError(err.response.data.message || 'An error occurred.');
        }
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-9">Login to Your Account</h1>
      <form onSubmit={handleLogin} className="space-y-4 w-full max-w-md">
        <div className="flex items-center border rounded-full p-3 shadow-md">
          <FaEnvelope className="text-gray-500 ml-3 mr-3 text-xl" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            required
          />
        </div>
        <div className="flex items-center border rounded-full p-3 shadow-md">
          <FaLock className="text-gray-500 ml-3 mr-3 text-xl" />
          <input
            type={showPassword ? "text" : "password"} // Toggle between text and password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            className="text-gray-500"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Show/hide icon */}
          </button>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        
        {/* Add Forgot Password Link */}
        <div className="text-right">
          <a href="/forget-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </div>

        <div className='flex justify-center mt-6'>
          <button type="submit" className="mt-6 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md transform hover:scale-105">
            Login
          </button>
        </div>
      </form>
      
      {/* Link to Sign Up */}
      <p className="mt-4">
        Don&apos;t have an account?{' '}
        <a href="/signup" className="text-blue-500 hover:underline">
          Sign Up
        </a>
      </p>
    </div>
  );
};

export default Login;
