'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      nom_d_utilisateur: username,
      email,
      mot_de_passe: password,
      photo_de_profil: '', // Optional: Add a default profile picture URL if needed
      date_de_creation: new Date().toISOString(), // Use the current date and time
      role: 'user', // Default role
    };

    try {
      const response = await axios.post('http://localhost:3000/auth/signup', userData);
      console.log('User registered:', response.data);
      router.push('/login');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message); 
      } else {
        setError('An unknown error occurred'); // Fallback error message
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-9">Create Your Account</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div className="flex items-center border rounded-full p-3 shadow-md">
          <FaUser className="text-gray-500 ml-3 mr-3 text-xl" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            required
          />
        </div>
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className='flex justify-center mt-6'>
        <button type="submit" className="mt-6 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md transform hover:scale-105">
          Sign Up
        </button>
        </div>
      </form>
      <p className="mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default Signup;
