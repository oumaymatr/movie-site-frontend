"use client";
import React, { useState } from "react";
import axios from "axios";
import { FaEnvelope } from "react-icons/fa";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email }
      );
      setMessage("Reset link has been sent to your email");
    } catch (err) {
      setError("User not found");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-9">Forgot Password</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <div className="flex items-center border rounded-full p-3 shadow-md">
          <FaEnvelope className="text-gray-500 ml-3 mr-3 text-xl" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 outline-none dark:bg-transparent bg-transparent"
            required
          />
        </div>
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="mt-6 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md transform hover:scale-105"
          >
            Send Reset Link
          </button>
        </div>
      </form>
      {message && <p className="text-green-500 mt-4">{message}</p>}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
