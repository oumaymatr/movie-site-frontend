'use client';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const Greeting = () => {
  const [email, setEmail] = useState<string | null>(null); // State to store the email

  useEffect(() => {
    // This code runs only on the client side
    const token = localStorage.getItem('token'); // Access localStorage

    // Log token for debugging
    console.log('Token:', token);

    if (token) {
      // Decode the token
      const decoded: any = jwtDecode(token); // Use 'any' type for simplicity

      // Log the decoded token
      console.log('Decoded Token:', decoded);

      // Get the email from the decoded token
      setEmail(decoded.email); // Update state with email
    }
  }, []); // Run effect only once when the component mounts

  // Function to extract username from email
  const getUsernameFromEmail = (email: string) => {
    const username = email.split('@')[0]; // Get part before '@'
    return username.charAt(0).toUpperCase() + username.slice(1); // Capitalize first letter
  };

  return (
    <div className="ml-60"> {/* Flexbox for centering */}
      {email ? (
        <>
          <h1 className="text-2xl font-bold">Hello, {getUsernameFromEmail(email)} ! Feel free to bookmark your movies. 🍿</h1> {/* Bigger font size */}
        </>
      ) : null} {/* Render greeting if email exists */}
    </div>
  );
};

export default Greeting;
