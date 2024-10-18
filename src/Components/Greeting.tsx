'use client';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Greeting = () => {
  const [email, setEmail] = useState<string | null>(null); // State to store the email

  useEffect(() => {
    const token = localStorage.getItem('token'); // Access localStorage

    if (token) {
      const decoded: any = jwtDecode(token); // Decode the token
      setEmail(decoded.email); // Update state with email
    }
  }, []); // Run effect only once when the component mounts

  const getUsernameFromEmail = (email: string) => {
    const username = email.split('@')[0]; // Get part before '@'
    return username.charAt(0).toUpperCase() + username.slice(1); // Capitalize first letter
  };

  return (
    <div className="flex justify-center items-center py-4"> {/* Centered and responsive */}
      {email ? (
        <h1 className="text-lg sm:text-2xl font-bold text-center"> {/* Responsive font size */}
          Hello, {getUsernameFromEmail(email)}! Feel free to bookmark your movies. 🍿
        </h1>
      ) : null}
    </div>
  );
};

export default Greeting;
