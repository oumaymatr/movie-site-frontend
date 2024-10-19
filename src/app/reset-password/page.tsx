"use client"; // Ensure client-side rendering 
import { useRouter } from "next/navigation"; // 'next/navigation' for Next.js 13+
import { useState, useEffect } from "react";
import axios from "axios";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for showing/hiding password

const ResetPassword = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null); // State for token
  const [message, setMessage] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility

  useEffect(() => {
    const queryToken = new URLSearchParams(window.location.search).get("token");
    if (queryToken) {
      setToken(queryToken);
      verifyToken(queryToken);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      await axios.get(`http://localhost:3000/auth/reset-password?token=${token}`);
      setIsTokenValid(true);
    } catch (error) {
      setMessage("Invalid or expired token");
    }
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // Send the new password and token to your backend API
      await axios.post("http://localhost:3000/auth/reset-password", {
        token,
        newPassword,
      });
      setMessage("Password reset successfully!");
      router.push("/login"); // Redirect to login or any other page
    } catch (error) {
      setMessage("Error resetting password");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-9">Reset Your Password</h1>
      {message && <p className="text-red-500">{message}</p>}
      {isTokenValid && (
        <form onSubmit={handlePasswordReset} className="space-y-4 w-full max-w-md">
          <div className="flex items-center border rounded-full p-3 shadow-md">
            <FaLock className="text-gray-500 ml-3 mr-3 text-xl" />
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
          <div className="flex items-center border rounded-full p-3 shadow-md">
            <FaLock className="text-gray-500 ml-3 mr-3 text-xl" />
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          <div className='flex justify-center mt-6'>
            <button type="submit" className="mt-6 px-6 py-2 rounded-full bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300 shadow-md transform hover:scale-105">
              Reset Password
            </button>
          </div>
        </form>
      )}
      <p className="mt-4">
        Remembered your password?{' '}
        <a href="/login" className="text-blue-500 hover:underline">
          Log in
        </a>
      </p>
    </div>
  );
};

export default ResetPassword;
